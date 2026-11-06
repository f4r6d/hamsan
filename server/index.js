import express from 'express'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import mime from 'mime-types'
import { scanFolder, readImageDimensions } from './scanner.js'
import { CATEGORY_LABELS, isTextExtension } from './media.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const publicDir = path.resolve(__dirname, '..', 'public')
const port = Number(process.env.PORT) || 4870
const host = process.env.HOST || '127.0.0.1'
const version = '1.0.0'

const collator = new Intl.Collator('fa', { numeric: true, sensitivity: 'base' })
const jobs = new Map()
const roots = new Map()

function expandHome(input) {
  if (typeof input !== 'string') return ''
  const trimmed = input.trim()
  if (trimmed === '~') return os.homedir()
  if (trimmed.startsWith('~/') || trimmed.startsWith(`~${path.sep}`)) {
    return path.join(os.homedir(), trimmed.slice(2))
  }
  return trimmed
}

function resolveInputPath(input) {
  return path.resolve(expandHome(input))
}

function httpError(statusCode, message) {
  const error = new Error(message)
  error.statusCode = statusCode
  return error
}

function isInside(base, target) {
  const relative = path.relative(base, target)
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative))
}

const allowedRootInputs = (process.env.ALLOWED_ROOTS || '')
  .split(',')
  .map((entry) => entry.trim())
  .filter(Boolean)
  .map((entry) => path.resolve(expandHome(entry)))

let allowedRootsReal = []

async function refreshAllowedRootsReal() {
  allowedRootsReal = (
    await Promise.all(
      allowedRootInputs.map(async (entry) => {
        try {
          return await fs.realpath(entry)
        } catch {
          return null
        }
      })
    )
  ).filter(Boolean)
}

function isAllowedPath(realPath) {
  if (allowedRootsReal.length === 0) return true
  return allowedRootsReal.some((base) => isInside(base, realPath))
}

async function assertAllowedPath(realPath) {
  if (isAllowedPath(realPath)) return
  throw httpError(403, 'این مسیر خارج از پوشه‌های مجاز برنامه است.')
}

function normalizeRelative(value) {
  if (typeof value !== 'string') return ''
  return value.replaceAll('\\', '/').replace(/^\/+|\/+$/g, '')
}

function defaultBrowsePath() {
  return allowedRootsReal[0] || os.homedir()
}

const ID_PATTERN = /^[A-Za-z0-9_-]+$/

function getRoot(rootId) {
  if (!ID_PATTERN.test(rootId)) throw httpError(404, 'پوشه اسکن‌شده پیدا نشد.')
  const root = roots.get(rootId)
  if (!root) throw httpError(404, 'این اسکن منقضی شده است. پوشه را دوباره بررسی کنید.')
  return root
}

function getFile(root, fileId) {
  if (!ID_PATTERN.test(fileId)) throw httpError(404, 'فایل پیدا نشد.')
  const file = root.index.filesById.get(fileId)
  if (!file) throw httpError(404, 'فایل پیدا نشد.')
  if (!isInside(root.path, file.abs)) throw httpError(403, 'دسترسی به این فایل مجاز نیست.')
  return file
}

function rootPublic(root) {
  return {
    id: root.id,
    path: root.path,
    name: root.name,
    scannedAt: root.scannedAt,
    stats: root.stats
  }
}

function peerPublic(file) {
  return {
    id: file.id,
    name: file.name,
    rel: file.rel,
    dirRel: file.dirRel,
    ext: file.ext,
    category: file.category,
    categoryLabel: CATEGORY_LABELS[file.category],
    size: file.size,
    mtimeMs: file.mtimeMs
  }
}

function filePublic(file) {
  const group = file.group
  const count = group ? group.files.length : 0
  const duplicates = group
    ? group.files
        .filter((peer) => peer.id !== file.id)
        .slice(0, 30)
        .map(peerPublic)
    : []

  return {
    id: file.id,
    name: file.name,
    rel: file.rel,
    dirRel: file.dirRel,
    ext: file.ext,
    category: file.category,
    categoryLabel: CATEGORY_LABELS[file.category],
    size: file.size,
    mtimeMs: file.mtimeMs,
    dims: file.dims ?? null,
    dupCount: count > 1 ? count : 0,
    groupId: count > 1 ? group.id : null,
    peerTotal: Math.max(0, count - 1),
    duplicates
  }
}

function folderPublic(node) {
  return {
    name: node.name,
    rel: node.rel,
    fileCount: node.mediaCount,
    dupFileCount: node.dupFileCount,
    size: node.totalSize
  }
}

function makeBreadcrumbs(root, rel) {
  const crumbs = [{ name: root.name, rel: '' }]
  if (!rel) return crumbs
  let current = ''
  for (const segment of rel.split('/')) {
    current = current ? `${current}/${segment}` : segment
    crumbs.push({ name: segment, rel: current })
  }
  return crumbs
}

function normalizeSearch(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ۀة]/g, 'ه')
    .replace(/[\u064B-\u065F\u0670\u200c]/g, '')
    .trim()
}

function rememberRoot(root) {
  roots.set(root.id, root)
  if (roots.size > 8) {
    const oldest = [...roots.values()].sort((a, b) => a.scannedAt - b.scannedAt)[0]
    if (oldest && oldest.id !== root.id) roots.delete(oldest.id)
  }
}

async function buildShortcuts() {
  const candidates = [
    { label: 'پوشه خانه', path: os.homedir() },
    { label: 'ریشه سیستم', path: path.parse(os.homedir()).root }
  ]

  for (const base of allowedRootInputs) {
    candidates.push({ label: 'پوشه مجاز', path: base })
  }

  for (const base of ['/media', '/mnt']) {
    try {
      const entries = await fs.readdir(base, { withFileTypes: true })
      for (const entry of entries) {
        if (entry.isDirectory()) {
          candidates.push({ label: entry.name, path: path.join(base, entry.name) })
        }
      }
    } catch {
      // The directory does not exist on this platform.
    }
  }

  const seen = new Set()
  const shortcuts = []
  for (const candidate of candidates) {
    let real
    try {
      real = await fs.realpath(candidate.path)
      const stat = await fs.stat(real)
      if (!stat.isDirectory() || !isAllowedPath(real) || seen.has(real)) continue
    } catch {
      continue
    }
    seen.add(real)
    shortcuts.push({ label: candidate.label, path: real })
  }

  return shortcuts.slice(0, 8)
}

const app = express()
app.disable('x-powered-by')
app.use(express.json({ limit: '64kb' }))

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('Referrer-Policy', 'no-referrer')
  res.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res.setHeader(
    'Content-Security-Policy',
    [
      "default-src 'self'",
      "img-src 'self' data: blob:",
      "media-src 'self' blob:",
      "frame-src 'self'",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self'",
      "connect-src 'self'",
      "object-src 'none'",
      "base-uri 'none'",
      "form-action 'self'"
    ].join('; ')
  )
  next()
})

app.get('/api/health', (req, res) => {
  res.json({ ok: true, name: 'hamsan', version, platform: process.platform })
})

app.get('/api/config', (req, res) => {
  res.json({
    version,
    platform: process.platform,
    home: os.homedir(),
    defaultPath: defaultBrowsePath(),
    allowedRoots: allowedRootsReal,
    categories: CATEGORY_LABELS
  })
})

app.get('/api/browse', async (req, res, next) => {
  try {
    const requested = typeof req.query.path === 'string' && req.query.path.trim()
      ? resolveInputPath(req.query.path)
      : defaultBrowsePath()

    let real
    try {
      real = await fs.realpath(requested)
      const stat = await fs.stat(real)
      if (!stat.isDirectory()) throw httpError(400, 'این مسیر یک پوشه نیست.')
    } catch (error) {
      if (error.statusCode) throw error
      throw httpError(404, 'پوشه پیدا نشد یا قابل خواندن نیست.')
    }

    await assertAllowedPath(real)

    let entries = []
    try {
      entries = await fs.readdir(real, { withFileTypes: true })
    } catch {
      throw httpError(403, 'اجازه خواندن این پوشه وجود ندارد.')
    }

    const dirs = entries
      .filter((entry) => entry.isDirectory() && !entry.isSymbolicLink())
      .map((entry) => ({
        name: entry.name,
        path: path.join(real, entry.name),
        hidden: entry.name.startsWith('.')
      }))
      .sort((a, b) => collator.compare(a.name, b.name))

    const parentCandidate = path.dirname(real)
    const parent = parentCandidate !== real && isAllowedPath(parentCandidate) ? parentCandidate : null

    res.json({
      path: real,
      parent,
      dirs,
      shortcuts: await buildShortcuts()
    })
  } catch (error) {
    next(error)
  }
})

app.post('/api/scan', async (req, res, next) => {
  try {
    const rawPath = req.body?.path
    if (typeof rawPath !== 'string' || !rawPath.trim()) {
      throw httpError(400, 'مسیر پوشه را وارد کنید.')
    }

    let real
    try {
      real = await fs.realpath(resolveInputPath(rawPath))
      const stat = await fs.stat(real)
      if (!stat.isDirectory()) throw httpError(400, 'این مسیر یک پوشه نیست.')
    } catch (error) {
      if (error.statusCode) throw error
      throw httpError(404, 'پوشه پیدا نشد یا قابل خواندن نیست.')
    }

    await assertAllowedPath(real)

    const job = {
      id: randomUUID(),
      path: real,
      status: 'scanning',
      scanned: 0,
      files: 0,
      directories: 0,
      startedAt: Date.now()
    }
    jobs.set(job.id, job)

    scanFolder(real, (progress) => {
      job.scanned = progress.scanned
      job.files = progress.files
      job.directories = progress.directories
    })
      .then((result) => {
        for (const file of result.index.files) {
          file.searchText = normalizeSearch(`${file.name} ${file.rel}`)
        }
        for (const node of result.index.directories.values()) {
          node.searchText = normalizeSearch(`${node.name} ${node.rel}`)
        }
        const root = {
          id: result.rootId,
          path: result.realRoot,
          name: result.name,
          scannedAt: result.scannedAt,
          stats: result.stats,
          index: result.index
        }
        rememberRoot(root)
        job.status = 'done'
        job.rootId = root.id
        job.stats = result.stats
        job.scanned = result.stats.scannedEntries
        job.files = result.stats.files
        job.directories = result.stats.directories
        job.durationMs = result.durationMs
      })
      .catch((error) => {
        job.status = 'error'
        job.error = error?.message || 'خطا در بررسی پوشه.'
      })

    setTimeout(() => jobs.delete(job.id), 15 * 60 * 1000).unref()

    res.status(202).json({ jobId: job.id, path: real })
  } catch (error) {
    next(error)
  }
})

app.get('/api/scan/:jobId', (req, res, next) => {
  try {
    if (!ID_PATTERN.test(req.params.jobId)) throw httpError(404, 'درخواست بررسی پیدا نشد.')
    const job = jobs.get(req.params.jobId)
    if (!job) throw httpError(404, 'این بررسی منقضی شده است. دوباره تلاش کنید.')
    res.json({
      id: job.id,
      path: job.path,
      status: job.status,
      scanned: job.scanned,
      files: job.files,
      directories: job.directories,
      rootId: job.rootId || null,
      stats: job.stats || null,
      durationMs: job.durationMs || null,
      error: job.error || null
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/tree/:rootId', (req, res, next) => {
  try {
    const root = getRoot(req.params.rootId)
    const rel = normalizeRelative(req.query.path)
    const node = root.index.directories.get(rel)
    if (!node) throw httpError(404, 'این پوشه در اسکن فعلی پیدا نشد.')

    res.json({
      root: rootPublic(root),
      path: rel,
      breadcrumbs: makeBreadcrumbs(root, rel),
      folders: node.subdirs.map(folderPublic),
      files: node.files.map(filePublic)
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/duplicates/:rootId', (req, res, next) => {
  try {
    const root = getRoot(req.params.rootId)
    res.json({
      root: rootPublic(root),
      groups: root.index.groups.map((group) => ({
        id: group.id,
        ext: group.ext,
        category: group.category,
        categoryLabel: CATEGORY_LABELS[group.category],
        size: group.size,
        count: group.files.length,
        wasted: group.wasted,
        files: group.files.map((file) => ({
          id: file.id,
          name: file.name,
          rel: file.rel,
          dirRel: file.dirRel,
          ext: file.ext,
          category: file.category,
          categoryLabel: CATEGORY_LABELS[file.category],
          size: file.size,
          mtimeMs: file.mtimeMs,
          dims: file.dims ?? null
        }))
      }))
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/search/:rootId', (req, res, next) => {
  try {
    const root = getRoot(req.params.rootId)
    const query = normalizeSearch(req.query.q)
    if (!query) {
      return res.json({ q: '', folders: [], files: [], totalFolders: 0, totalFiles: 0 })
    }

    const folderMatches = []
    for (const node of root.index.directories.values()) {
      if (!node.rel) continue
      if (node.searchText.includes(query)) folderMatches.push(node)
    }

    const fileMatches = root.index.files.filter((file) => file.searchText.includes(query))

    const rank = (name) => {
      const normalized = normalizeSearch(name)
      if (normalized === query) return 0
      if (normalized.startsWith(query)) return 1
      return 2
    }

    folderMatches.sort((a, b) => rank(a.name) - rank(b.name) || collator.compare(a.name, b.name))
    fileMatches.sort((a, b) => rank(a.name) - rank(b.name) || collator.compare(a.name, b.name))

    res.json({
      q: String(req.query.q).slice(0, 200),
      folders: folderMatches.slice(0, 100).map(folderPublic),
      files: fileMatches.slice(0, 300).map(filePublic),
      totalFolders: folderMatches.length,
      totalFiles: fileMatches.length
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/dims/:rootId/:fileId', async (req, res, next) => {
  try {
    const root = getRoot(req.params.rootId)
    const file = getFile(root, req.params.fileId)
    if (file.category !== 'image') return res.json({ dims: null })
    const dims = await readImageDimensions(file)
    res.json({ dims })
  } catch (error) {
    next(error)
  }
})

app.get('/api/file/:rootId/:fileId/raw', (req, res, next) => {
  try {
    const root = getRoot(req.params.rootId)
    const file = getFile(root, req.params.fileId)
    const download = req.query.download === '1'
    const fallback = file.name.replace(/[^\x20-\x7E]/g, '_').replace(/["\\]/g, '_')

    res.setHeader('Content-Type', mime.lookup(file.name) || 'application/octet-stream')
    res.setHeader(
      'Content-Disposition',
      `${download ? 'attachment' : 'inline'}; filename="${fallback}"; filename*=UTF-8''${encodeURIComponent(file.name)}`
    )
    res.setHeader('Cache-Control', 'private, max-age=60')
    res.sendFile(file.abs, { dotfiles: 'allow' }, (error) => {
      if (error && !res.headersSent) next(error)
    })
  } catch (error) {
    next(error)
  }
})

app.get('/api/file/:rootId/:fileId/text', async (req, res, next) => {
  try {
    const root = getRoot(req.params.rootId)
    const file = getFile(root, req.params.fileId)
    if (!isTextExtension(file.ext)) throw httpError(400, 'پیش‌نمایش متنی برای این فایل وجود ندارد.')

    const maxBytes = 512 * 1024
    const handle = await fs.open(file.abs, 'r')
    let buffer
    try {
      const length = Math.min(file.size, maxBytes)
      buffer = Buffer.alloc(length)
      const { bytesRead } = await handle.read(buffer, 0, length, 0)
      buffer = buffer.subarray(0, bytesRead)
    } finally {
      await handle.close()
    }

    const text = buffer.toString('utf8').replace(/^\uFEFF/, '')
    res.json({ text, truncated: file.size > maxBytes, size: file.size })
  } catch (error) {
    next(error)
  }
})

app.use('/api', (req, res) => {
  res.status(404).json({ error: 'درخواست پیدا نشد.' })
})

app.use(express.static(publicDir, { etag: true, maxAge: 0 }))

app.use((req, res, next) => {
  if (req.method !== 'GET' || req.path.startsWith('/api/')) return next()
  res.sendFile(path.join(publicDir, 'index.html'))
})

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error)
  const statusCode = error.statusCode || 500
  if (statusCode >= 500) console.error(error)
  res.status(statusCode).json({
    error: statusCode >= 500 ? 'خطای داخلی سرور.' : error.message
  })
})

const loopbackHosts = new Set(['127.0.0.1', '::1', 'localhost'])

function lanUrls() {
  return Object.values(os.networkInterfaces())
    .flat()
    .filter((iface) => iface && iface.family === 'IPv4' && !iface.internal)
    .map((iface) => `http://${iface.address}:${port}`)
}

async function start() {
  await refreshAllowedRootsReal()
  app.listen(port, host, () => {
    console.log(`\n  همسان — یابنده فایل‌های تکراری`)
    console.log(`  http://${host === '0.0.0.0' ? 'localhost' : host}:${port}`)
    if (!loopbackHosts.has(host)) {
      for (const url of lanUrls()) console.log(`  ${url}`)
      console.log('  دسترسی از شبکهٔ خانگی فعال است؛ فقط به شبکهٔ مورد اعتماد وصل باشید.')
      if (!allowedRootInputs.length) {
        console.log('  هشدار: ALLOWED_ROOTS خالی است، پس هر پوشهٔ قابل‌خواندن قابل مرور است.')
      }
    }
    console.log('')
  })
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
