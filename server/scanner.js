import { createHash } from 'node:crypto'
import fs from 'node:fs/promises'
import path from 'node:path'
import { imageSize } from 'image-size'
import { categoryOf, extensionOf } from './media.js'

export const SKIPPED_DIRECTORIES = new Set([
  'node_modules',
  '.git',
  '.svn',
  '.hg',
  '.Trash',
  '.Trashes',
  '.cache',
  '.thumbnails',
  'System Volume Information',
  '$RECYCLE.BIN',
  '#recycle',
  '#snapshot',
  '@eaDir',
  'lost+found'
])

const DIRECTORY_CONCURRENCY = 6
const STAT_CONCURRENCY = 12
const DIMENSION_HEADER_BYTES = 1024 * 1024

const collator = new Intl.Collator('fa', { numeric: true, sensitivity: 'base' })

function stableId(prefix, value) {
  return prefix + createHash('sha1').update(value).digest('hex').slice(0, 20)
}

function makeDirectory(rel, name, abs) {
  return {
    rel,
    name,
    abs,
    subdirs: [],
    files: [],
    mediaCount: 0,
    dupFileCount: 0,
    totalSize: 0
  }
}

function depthOf(rel) {
  return rel ? rel.split('/').length : 0
}

async function mapLimit(items, limit, worker) {
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      await worker(items[index], index)
    }
  })
  await Promise.all(runners)
}

export async function scanFolder(rootPath, onProgress) {
  const startedAt = Date.now()
  const realRoot = await fs.realpath(rootPath)
  const rootStat = await fs.stat(realRoot)
  if (!rootStat.isDirectory()) {
    throw Object.assign(new Error('مسیر انتخاب‌شده یک پوشه نیست.'), { statusCode: 400 })
  }

  const rootId = 'r' + createHash('sha1').update(realRoot).digest('hex').slice(0, 16)
  const root = makeDirectory('', path.basename(realRoot) || realRoot, realRoot)
  const directories = new Map([['', root]])
  const files = []
  const filesById = new Map()
  const queue = [root]

  let scannedEntries = 0
  let skippedEntries = 0
  let errors = 0
  let lastProgressAt = 0

  const reportProgress = (force = false) => {
    const now = Date.now()
    if (!force && now - lastProgressAt < 220) return
    lastProgressAt = now
    onProgress?.({
      scanned: scannedEntries,
      files: files.length,
      directories: directories.size - 1
    })
  }

  const processDirectory = async (node) => {
    let entries
    try {
      entries = await fs.readdir(node.abs, { withFileTypes: true })
    } catch {
      errors += 1
      return
    }

    scannedEntries += entries.length
    const candidates = []

    for (const entry of entries) {
      if (entry.isSymbolicLink()) continue
      const name = entry.name
      const abs = path.join(node.abs, name)
      const rel = node.rel ? `${node.rel}/${name}` : name

      if (entry.isDirectory()) {
        if (SKIPPED_DIRECTORIES.has(name)) {
          skippedEntries += 1
          continue
        }
        const child = makeDirectory(rel, name, abs)
        directories.set(rel, child)
        node.subdirs.push(child)
        queue.push(child)
        continue
      }

      if (!entry.isFile()) continue
      const ext = extensionOf(name)
      const category = categoryOf(ext)
      if (!category) continue
      candidates.push({ name, abs, rel, ext, category })
    }

    await mapLimit(candidates, STAT_CONCURRENCY, async (candidate) => {
      let stat
      try {
        stat = await fs.stat(candidate.abs)
      } catch {
        errors += 1
        return
      }

      const file = {
        id: stableId('f', candidate.rel),
        name: candidate.name,
        rel: candidate.rel,
        dirRel: node.rel,
        abs: candidate.abs,
        ext: candidate.ext,
        category: candidate.category,
        size: stat.size,
        mtimeMs: stat.mtimeMs,
        dev: stat.dev,
        ino: stat.ino,
        group: null,
        dims: undefined
      }

      if (filesById.has(file.id)) {
        let suffix = 1
        let nextId = `${file.id}-${suffix}`
        while (filesById.has(nextId)) {
          suffix += 1
          nextId = `${file.id}-${suffix}`
        }
        file.id = nextId
      }
      filesById.set(file.id, file)
      node.files.push(file)
      files.push(file)
    })

    reportProgress()
  }

  await new Promise((resolve) => {
    let active = 0
    const pump = () => {
      while (active < DIRECTORY_CONCURRENCY && queue.length > 0) {
        const node = queue.shift()
        active += 1
        processDirectory(node)
          .catch(() => {
            errors += 1
          })
          .finally(() => {
            active -= 1
            pump()
          })
      }
      if (active === 0 && queue.length === 0) resolve()
    }
    pump()
  })

  root.subdirs.sort((a, b) => collator.compare(a.name, b.name))
  for (const node of directories.values()) {
    node.files.sort((a, b) => collator.compare(a.name, b.name))
    if (node !== root) node.subdirs.sort((a, b) => collator.compare(a.name, b.name))
  }

  const index = {
    root,
    directories,
    files,
    groups: [],
    filesById
  }
  const derived = rebuildDerived(index)

  reportProgress(true)

  return {
    rootId,
    realRoot,
    name: root.name,
    scannedAt: Date.now(),
    durationMs: Date.now() - startedAt,
    stats: {
      files: files.length,
      directories: directories.size - 1,
      duplicateGroups: derived.groups.length,
      duplicateFiles: derived.duplicateFiles,
      wastedBytes: derived.wastedBytes,
      categoryCounts: derived.categoryCounts,
      scannedEntries,
      skippedEntries,
      errors
    },
    index
  }
}

export function rebuildDerived(index) {
  const { directories, files } = index

  for (const file of files) file.group = null

  const groupsByKey = new Map()
  for (const file of files) {
    const key = `${file.ext}\u0000${file.size}`
    let group = groupsByKey.get(key)
    if (!group) {
      group = {
        id: 'g' + createHash('sha1').update(key).digest('hex').slice(0, 16),
        ext: file.ext,
        category: file.category,
        size: file.size,
        files: []
      }
      groupsByKey.set(key, group)
    }
    group.files.push(file)
  }

  const groups = []
  for (const group of groupsByKey.values()) {
    if (group.files.length < 2) continue
    for (const file of group.files) file.group = group
    group.wasted = group.size * (group.files.length - 1)
    group.files.sort((a, b) => collator.compare(a.rel, b.rel))
    groups.push(group)
  }
  groups.sort((a, b) => b.wasted - a.wasted || b.files.length - a.files.length)
  index.groups = groups

  const byDepth = [...directories.values()].sort((a, b) => depthOf(b.rel) - depthOf(a.rel))
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
  for (const file of files) categoryCounts[file.category] += 1

  return {
    groups,
    categoryCounts,
    duplicateFiles: groups.reduce((sum, group) => sum + group.files.length, 0),
    wastedBytes: groups.reduce((sum, group) => sum + group.wasted, 0)
  }
}

export async function readImageDimensions(file) {
  if (file.dims !== undefined) return file.dims
  if (file.category !== 'image' || file.size === 0) {
    file.dims = null
    return null
  }

  try {
    const handle = await fs.open(file.abs, 'r')
    try {
      const length = Math.min(file.size, DIMENSION_HEADER_BYTES)
      const buffer = Buffer.alloc(length)
      const { bytesRead } = await handle.read(buffer, 0, length, 0)
      const result = imageSize(buffer.subarray(0, bytesRead))
      file.dims = result?.width && result?.height
        ? { width: result.width, height: result.height }
        : null
    } finally {
      await handle.close()
    }
  } catch {
    file.dims = null
  }

  return file.dims
}
