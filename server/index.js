import express from 'express'
import { execFile } from 'node:child_process'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'
import mime from 'mime-types'
import { scanFolder, readImageDimensions, rebuildDerived, SKIPPED_DIRECTORIES } from './scanner.js'
import { CATEGORY_LABELS, isTextExtension, categoryOf, extensionOf } from './media.js'

const execFileAsync = promisify(execFile)

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
const LOOPBACK_HOSTNAMES = /^(localhost|::1|\[::1\]|127(?:\.\d{1,3}){3})$/i

function assertLoopbackRequest(req) {
  if (LOOPBACK_HOSTNAMES.test(String(req.hostname || ''))) return
  throw httpError(403, 'این عمل فقط از روی همین کامپیوتر مجاز است.')
}

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

let mutationQueue = Promise.resolve()

function enqueueMutation(task) {
  const result = mutationQueue.then(task, task)
  mutationQueue = result.catch(() => {})
  return result
}

function depthOf(rel) {
  return rel ? rel.split('/').length : 0
}

async function verifyFileIdentity(root, file) {
  let stat
  try {
    stat = await fs.lstat(file.abs)
  } catch {
    return { ok: false, message: `«${file.name}» پیدا نشد؛ ممکن است قبلاً حذف یا جابه‌جا شده باشد.` }
  }

  if (stat.isSymbolicLink() || !stat.isFile()) {
    return { ok: false, message: `«${file.name}» دیگر یک فایل معمولی نیست.` }
  }

  let parentReal
  try {
    parentReal = await fs.realpath(path.dirname(file.abs))
  } catch {
    return { ok: false, message: `مسیر «${file.name}» قابل بررسی نیست.` }
  }

  if (!isInside(root.path, parentReal)) {
    return { ok: false, message: `مسیر «${file.name}» خارج از پوشهٔ بررسی‌شده است.` }
  }

  if (stat.size !== file.size) {
    return { ok: false, message: `حجم «${file.name}» بعد از بررسی تغییر کرده است؛ پوشه را دوباره بررسی کنید.` }
  }

  if (file.ino && stat.ino !== file.ino) {
    return { ok: false, message: `«${file.name}» بعد از بررسی جایگزین شده است؛ پوشه را دوباره بررسی کنید.` }
  }

  if (file.dev !== undefined && stat.dev !== file.dev) {
    return { ok: false, message: `«${file.name}» روی یک فایل‌سیستم دیگر قرار گرفته است؛ پوشه را دوباره بررسی کنید.` }
  }

  if (Math.abs(stat.mtimeMs - file.mtimeMs) > 1) {
    return { ok: false, message: `«${file.name}» بعد از بررسی تغییر کرده است؛ پوشه را دوباره بررسی کنید.` }
  }

  return { ok: true }
}

function removeFilesFromIndex(root, removedFiles) {
  const removedIds = new Set(removedFiles.map((file) => file.id))
  const affectedGroups = new Set(removedFiles.map((file) => file.group).filter(Boolean))

  for (const file of removedFiles) {
    const node = root.index.directories.get(file.dirRel)
    if (node) node.files = node.files.filter((candidate) => candidate.id !== file.id)
    root.index.filesById.delete(file.id)
  }
  root.index.files = root.index.files.filter((file) => !removedIds.has(file.id))

  for (const group of affectedGroups) {
    group.files = group.files.filter((file) => !removedIds.has(file.id))
    if (group.files.length < 2) {
      for (const file of group.files) file.group = null
      const index = root.index.groups.indexOf(group)
      if (index !== -1) root.index.groups.splice(index, 1)
    } else {
      group.wasted = group.size * (group.files.length - 1)
    }
  }
  root.index.groups.sort((a, b) => b.wasted - a.wasted || b.files.length - a.files.length)

  const byDepth = [...root.index.directories.values()].sort((a, b) => depthOf(b.rel) - depthOf(a.rel))
  for (const node of byDepth) {
    let mediaCount = node.files.length
    let totalSize = node.files.reduce((sum, file) => sum + file.size, 0)
    let dupFileCount = node.files.reduce((sum, file) => sum + (file.group ? 1 : 0), 0)
    for (const child of node.subdirs) {
      mediaCount += child.mediaCount
      totalSize += child.totalSize
      dupFileCount += child.dupFileCount
    }
    node.mediaCount = mediaCount
    node.totalSize = totalSize
    node.dupFileCount = dupFileCount
  }

  const categoryCounts = { image: 0, video: 0, audio: 0, document: 0 }
  for (const file of root.index.files) categoryCounts[file.category] += 1

  root.stats = {
    ...root.stats,
    files: root.index.files.length,
    duplicateGroups: root.index.groups.length,
    duplicateFiles: root.index.groups.reduce((sum, group) => sum + group.files.length, 0),
    wastedBytes: root.index.groups.reduce((sum, group) => sum + group.wasted, 0),
    categoryCounts
  }
}

async function trashFiles(root, rawFileIds) {
  if (!Array.isArray(rawFileIds)) throw httpError(400, 'فهرست فایل‌ها معتبر نیست.')
  const fileIds = [...new Set(rawFileIds.filter((id) => typeof id === 'string' && id))]
  if (fileIds.length === 0) throw httpError(400, 'حداقل یک فایل را انتخاب کنید.')
  if (fileIds.length > 100) throw httpError(400, 'حداکثر ۱۰۰ فایل در هر درخواست قابل انتقال است.')

  const files = fileIds.map((fileId) => getFile(root, fileId))

  const selectedPerGroup = new Map()
  for (const file of files) {
    if (!file.group) throw httpError(409, `«${file.name}» دیگر در گروه فایل‌های تکراری نیست.`)
    selectedPerGroup.set(file.group, (selectedPerGroup.get(file.group) || 0) + 1)
  }
  for (const [group, count] of selectedPerGroup) {
    if (count >= group.files.length) {
      throw httpError(409, 'حداقل یک نسخه از هر گروه تکراری باید باقی بماند.')
    }
  }

  for (const file of files) {
    const check = await verifyFileIdentity(root, file)
    if (!check.ok) throw httpError(409, check.message)
  }

  const moved = []
  const failed = []
  for (const file of files) {
    try {
      await execFileAsync('gio', ['trash', '--', file.abs], { timeout: 20000 })
      moved.push(file)
    } catch {
      failed.push({ id: file.id, name: file.name, error: 'انتقال این فایل به سطل زباله ممکن نشد.' })
    }
  }

  if (moved.length) removeFilesFromIndex(root, moved)

  return {
    moved: moved.map((file) => ({ id: file.id, name: file.name, rel: file.rel })),
    failed,
    root: rootPublic(root)
  }
}

function validateNewName(rawName) {
  if (typeof rawName !== 'string') throw httpError(400, 'نام جدید معتبر نیست.')
  const name = rawName.trim()
  if (!name) throw httpError(400, 'نام جدید نمی‌تواند خالی باشد.')
  if (name === '.' || name === '..') throw httpError(400, 'این نام مجاز نیست.')
  if (name.length > 255) throw httpError(400, 'نام جدید نباید بیش از ۲۵۵ نویسه باشد.')
  if (/[/\\\u0000-\u001f\u007f]/.test(name)) {
    throw httpError(400, 'نام جدید نباید شامل /، \\ یا نویسه‌های کنترلی باشد.')
  }
  return name
}

async function assertTargetFree(targetAbs, newName) {
  try {
    await fs.lstat(targetAbs)
  } catch (error) {
    if (error.code === 'ENOENT') return
    throw httpError(409, 'بررسی مقصد ممکن نشد؛ پوشه را دوباره بررسی کنید.')
  }
  throw httpError(409, `«${newName}» از قبل وجود دارد؛ نام دیگری انتخاب کنید.`)
}

function refreshDerivedStats(root) {
  const derived = rebuildDerived(root.index)
  root.stats = {
    ...root.stats,
    files: root.index.files.length,
    duplicateGroups: derived.groups.length,
    duplicateFiles: derived.duplicateFiles,
    wastedBytes: derived.wastedBytes,
    categoryCounts: derived.categoryCounts
  }
}

async function renameFileEntry(root, fileId, newName) {
  const file = getFile(root, fileId)
  if (file.name === newName) return { entry: filePublic(file), root: rootPublic(root) }

  const check = await verifyFileIdentity(root, file)
  if (!check.ok) throw httpError(409, check.message)

  const targetAbs = path.join(path.dirname(file.abs), newName)
  if (!isInside(root.path, targetAbs)) throw httpError(403, 'مقصد خارج از پوشهٔ بررسی‌شده است.')
  await assertTargetFree(targetAbs, newName)

  try {
    await fs.rename(file.abs, targetAbs)
  } catch {
    throw httpError(409, `تغییر نام «${file.name}» ممکن نشد؛ پوشه را دوباره بررسی کنید.`)
  }

  file.name = newName
  file.rel = file.dirRel ? `${file.dirRel}/${newName}` : newName
  file.abs = targetAbs
  file.ext = extensionOf(newName)
  file.category = categoryOf(file.ext)
  file.searchText = normalizeSearch(`${file.name} ${file.rel}`)

  if (!file.category) {
    file.group = null
    removeFilesFromIndex(root, [file])
    return { entry: filePublic(file), removedFromIndex: true, root: rootPublic(root) }
  }

  const node = root.index.directories.get(file.dirRel)
  if (node) node.files.sort((a, b) => collator.compare(a.name, b.name))
  refreshDerivedStats(root)
  return { entry: filePublic(file), root: rootPublic(root) }
}

async function renameFolderEntry(root, rawRel, newName) {
  const rel = normalizeRelative(rawRel)
  if (!rel) throw httpError(400, 'نام پوشهٔ ریشه قابل تغییر نیست.')
  if (SKIPPED_DIRECTORIES.has(newName)) throw httpError(400, 'این نام برای پوشه مجاز نیست.')

  const node = root.index.directories.get(rel)
  if (!node) throw httpError(404, 'این پوشه در اسکن فعلی پیدا نشد.')
  if (node.name === newName) return { entry: folderPublic(node), root: rootPublic(root) }
  if (!isInside(root.path, node.abs)) throw httpError(403, 'دسترسی به این پوشه مجاز نیست.')

  let stat
  try {
    stat = await fs.lstat(node.abs)
  } catch {
    throw httpError(409, `پوشه «${node.name}» پیدا نشد؛ ممکن است قبلاً جابه‌جا شده باشد.`)
  }
  if (stat.isSymbolicLink() || !stat.isDirectory()) {
    throw httpError(409, `«${node.name}» دیگر یک پوشهٔ معمولی نیست.`)
  }

  let real
  try {
    real = await fs.realpath(node.abs)
  } catch {
    throw httpError(409, `مسیر «${node.name}» قابل بررسی نیست.`)
  }
  if (real !== node.abs || !isInside(root.path, real)) {
    throw httpError(409, `مسیر «${node.name}» بعد از بررسی تغییر کرده است؛ پوشه را دوباره بررسی کنید.`)
  }

  const parentRel = rel.includes('/') ? rel.slice(0, rel.lastIndexOf('/')) : ''
  const parentNode = root.index.directories.get(parentRel)
  const newRel = parentRel ? `${parentRel}/${newName}` : newName
  const targetAbs = path.join(root.path, newRel)
  await assertTargetFree(targetAbs, newName)

  try {
    await fs.rename(node.abs, targetAbs)
  } catch {
    throw httpError(409, `تغییر نام «${node.name}» ممکن نشد؛ پوشه را دوباره بررسی کنید.`)
  }

  const prefix = `${rel}/`
  const affectedDirs = [node]
  for (const candidate of root.index.directories.values()) {
    if (candidate.rel.startsWith(prefix)) affectedDirs.push(candidate)
  }

  const remaps = affectedDirs.map((dir) => [
    dir.rel,
    dir === node ? newRel : newRel + dir.rel.slice(rel.length),
    dir
  ])
  for (const [oldRel] of remaps) root.index.directories.delete(oldRel)
  for (const [, updatedRel, dir] of remaps) {
    dir.rel = updatedRel
    dir.abs = path.join(root.path, updatedRel)
    root.index.directories.set(updatedRel, dir)
  }
  node.name = newName
  for (const dir of affectedDirs) {
    dir.searchText = normalizeSearch(`${dir.name} ${dir.rel}`)
  }

  for (const file of root.index.files) {
    if (file.dirRel !== rel && !file.dirRel.startsWith(prefix)) continue
    file.dirRel = newRel + file.dirRel.slice(rel.length)
    file.rel = file.dirRel ? `${file.dirRel}/${file.name}` : file.name
    file.abs = path.join(root.path, file.rel)
    file.searchText = normalizeSearch(`${file.name} ${file.rel}`)
  }

  if (parentNode) parentNode.subdirs.sort((a, b) => collator.compare(a.name, b.name))
  refreshDerivedStats(root)
  return { entry: folderPublic(node), root: rootPublic(root) }
}

async function renameEntry(root, body) {
  const newName = validateNewName(body?.newName)
  if (body?.kind === 'file') {
    if (typeof body.fileId !== 'string' || !body.fileId) throw httpError(400, 'شناسه فایل معتبر نیست.')
    return renameFileEntry(root, body.fileId, newName)
  }
  if (body?.kind === 'folder') {
    if (typeof body.rel !== 'string') throw httpError(400, 'مسیر پوشه معتبر نیست.')
    return renameFolderEntry(root, body.rel, newName)
  }
  throw httpError(400, 'نوع درخواست تغییر نام معتبر نیست.')
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

app.post('/api/trash/:rootId', async (req, res, next) => {
  try {
    assertLoopbackRequest(req)
    const root = getRoot(req.params.rootId)
    const result = await enqueueMutation(() => trashFiles(root, req.body?.fileIds))
    res.json(result)
  } catch (error) {
    next(error)
  }
})

app.post('/api/rename/:rootId', async (req, res, next) => {
  try {
    assertLoopbackRequest(req)
    const root = getRoot(req.params.rootId)
    const result = await enqueueMutation(() => renameEntry(root, req.body))
    res.json(result)
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

async function start() {
  await refreshAllowedRootsReal()
  app.listen(port, host, () => {
    console.log(`\n  همسان — یابنده فایل‌های تکراری`)
    console.log(`  http://${host === '0.0.0.0' ? 'localhost' : host}:${port}\n`)
  })
}

start().catch((error) => {
  console.error(error)
  process.exit(1)
})
