const EXTENSIONS = {
  image: [
    'jpg', 'jpeg', 'jpe', 'png', 'gif', 'webp', 'bmp', 'svg', 'avif',
    'tif', 'tiff', 'heic', 'heif', 'ico', 'jxl'
  ],
  video: [
    'mp4', 'm4v', 'mkv', 'mov', 'avi', 'webm', 'mpg', 'mpeg', 'wmv',
    'flv', '3gp', 'ogv', 'mts', 'm2ts'
  ],
  audio: [
    'mp3', 'wav', 'flac', 'ogg', 'oga', 'm4a', 'aac', 'wma', 'opus',
    'aif', 'aiff', 'amr', 'mid', 'midi'
  ],
  document: [
    'pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md',
    'markdown', 'csv', 'tsv', 'rtf', 'odt', 'ods', 'odp', 'epub', 'pages',
    'numbers', 'key'
  ]
}

export const CATEGORY_LABELS = {
  image: 'تصویر',
  video: 'ویدیو',
  audio: 'صدا',
  document: 'سند'
}

export const CATEGORY_ORDER = ['image', 'video', 'audio', 'document']

export const TEXT_EXTENSIONS = new Set(['txt', 'md', 'markdown', 'csv', 'tsv'])

const EXTENSION_CATEGORY = new Map()
for (const [category, extensions] of Object.entries(EXTENSIONS)) {
  for (const extension of extensions) {
    EXTENSION_CATEGORY.set(extension, category)
  }
}

export function extensionOf(name) {
  const dot = name.lastIndexOf('.')
  if (dot <= 0 || dot === name.length - 1) return ''
  return name.slice(dot + 1).toLowerCase()
}

export function categoryOf(extension) {
  return EXTENSION_CATEGORY.get(extension) || null
}

export function isTextExtension(extension) {
  return TEXT_EXTENSIONS.has(extension)
}
