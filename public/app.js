const ICONS = {
  logo: `<svg viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="9" width="28" height="38" rx="8" fill="currentColor"/><rect x="27" y="18" width="27" height="37" rx="8" fill="currentColor" opacity=".5"/></svg>`,
  folder: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 7.5a2 2 0 0 1 2-2h4l2 2h7a2 2 0 0 1 2 2v7.5a2 2 0 0 1-2 2h-13a2 2 0 0 1-2-2z"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="m5 17 4.5-4.5 3.5 3.5 2.5-2.5 3.5 3.5"/></svg>`,
  video: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="5.5" width="13" height="13" rx="2.5"/><path d="m16.5 10 4-2.4v8.8l-4-2.4z"/></svg>`,
  audio: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18V6.5l9-2v11"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="15.5" cy="15.5" r="2.5"/></svg>`,
  document: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4M9 12h6M9 15.5h6"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3.5h8l4 4v13H6z"/><path d="M14 3.5v4h4"/></svg>`,
  duplicate: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="8.5" y="8.5" width="11" height="11" rx="2.5"/><path d="M15.5 5.5h-8a2 2 0 0 0-2 2v8"/></svg>`,
  search: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/></svg>`,
  chevronDown: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`,
  chevronLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m14.5 5-7 7 7 7"/></svg>`,
  refresh: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/></svg>`,
  close: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>`,
  external: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-8.5 8.5"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/></svg>`,
  download: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 4v11M7.5 10.5 12 15l4.5-4.5"/><path d="M5 19.5h14"/></svg>`,
  arrowUp: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M6.5 10.5 12 5l5.5 5.5"/></svg>`,
  home: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m4 11 8-7 8 7"/><path d="M6.5 9.5V20h11V9.5"/></svg>`,
  alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5M12 16.2h.01"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7"/></svg>`,
  eye: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 12s3-6.5 8.5-6.5S20.5 12 20.5 12s-3 6.5-8.5 6.5S3.5 12 3.5 12z"/><circle cx="12" cy="12" r="2.5"/></svg>`,
  info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 11v5M12 7.8h.01"/></svg>`
}

const state = {
  config: { home: '', defaultPath: '', allowedRoots: [] },
  view: 'welcome',
  root: null,
  tree: null,
  path: '',
  search: '',
  searchScope: 'folder',
  dupOnly: false,
  globalSearch: null,
  globalSearchLoading: false,
  globalSearchError: null,
  duplicates: null,
  duplicatesLoading: false,
  duplicatesError: null,
  dupFilter: 'all',
  dupSearch: '',
  welcomePath: '',
  scanToken: 0,
  highlightId: null,
  pendingGroupId: null,
  pendingFileId: null
}

const LAST_ROOT_KEY = 'hamsan.lastRoot'
const RECENTS_KEY = 'hamsan.recentRoots'
const numberFormatter = new Intl.NumberFormat('en-US')
const dateFormatter = new Intl.DateTimeFormat('fa-IR', { dateStyle: 'medium', timeStyle: 'short' })

let dimsObserver = null
let dimsBindings = new WeakMap()
let dimsCache = new Map()
let dimsRequests = new Map()
let dimsQueue = []
let dimsActive = 0
let activeOverlayClose = null
let searchDebounceTimer = null
let globalSearchToken = 0
let navigationToken = 0

function h(tag, props = {}, ...children) {
  const element = document.createElement(tag)
  for (const [key, value] of Object.entries(props || {})) {
    if (value === null || value === undefined || value === false) continue
    if (key === 'class') element.className = value
    else if (key === 'html') element.innerHTML = value
    else if (key === 'value') element.value = value
    else if (key === 'dataset') Object.assign(element.dataset, value)
    else if (key === 'style' && typeof value === 'object') Object.assign(element.style, value)
    else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.slice(2).toLowerCase(), value)
    } else if (value === true) {
      element.setAttribute(key, '')
    } else {
      element.setAttribute(key, value)
    }
  }

  const append = (child) => {
    if (child === null || child === undefined || child === false) return
    if (Array.isArray(child)) {
      child.forEach(append)
      return
    }
    element.append(child instanceof Node ? child : document.createTextNode(String(child)))
  }

  children.forEach(append)
  return element
}

function icon(name, extraClass = '') {
  return h('span', {
    class: `icon${extraClass ? ` ${extraClass}` : ''}`,
    html: ICONS[name] || ICONS.file,
    'aria-hidden': 'true'
  })
}

function fileIcon(category, isFolder = false) {
  const iconName = isFolder ? 'folder' : (category || 'file')
  const className = isFolder ? 'folder' : (category || 'file')
  return h('span', {
    class: `file-icon ${className}`,
    html: ICONS[iconName] || ICONS.file,
    'aria-hidden': 'true'
  })
}

function categoryLabel(category) {
  return {
    image: 'تصویر',
    video: 'ویدیو',
    audio: 'صدا',
    document: 'سند'
  }[category] || 'فایل'
}

function formatBytes(bytes) {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024
    unit += 1
  }
  const digits = value >= 100 ? 0 : value >= 10 ? 1 : 2
  return `${new Intl.NumberFormat('en-US', { maximumFractionDigits: digits }).format(value)} ${units[unit]}`
}

function formatCount(value) {
  return numberFormatter.format(Number(value) || 0)
}

function formatDuration(totalSeconds) {
  if (!Number.isFinite(totalSeconds) || totalSeconds <= 0) return ''
  const seconds = Math.round(totalSeconds)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const rest = seconds % 60
  const pad = (value) => String(value).padStart(2, '0')
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(rest)}` : `${minutes}:${pad(rest)}`
}

function formatDate(timestamp) {
  try {
    return dateFormatter.format(new Date(timestamp))
  } catch {
    return ''
  }
}

function normalizeFa(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[أإآ]/g, 'ا')
    .replace(/[ۀة]/g, 'ه')
    .replace(/[\u064B-\u065F\u0670\u200c]/g, '')
    .trim()
}

function basenameOf(filePath) {
  const parts = String(filePath || '').split(/[\\/]/).filter(Boolean)
  return parts[parts.length - 1] || filePath
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function readJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Local storage can be unavailable in private contexts.
  }
}

function getRecents() {
  const value = readJSON(RECENTS_KEY, [])
  return Array.isArray(value) ? value.filter((item) => item && item.path) : []
}

function addRecent(root) {
  if (!root?.path) return
  const recents = getRecents().filter((item) => item.path !== root.path)
  recents.unshift({ path: root.path, name: root.name, at: Date.now() })
  writeJSON(RECENTS_KEY, recents.slice(0, 6))
}

function saveLastRoot(root) {
  if (!root) return
  writeJSON(LAST_ROOT_KEY, { rootId: root.id, path: root.path, name: root.name })
}

async function request(url, options = {}) {
  let response
  try {
    response = await fetch(url, options)
  } catch {
    throw new Error('ارتباط با سرور برنامه برقرار نشد.')
  }

  let data = null
  const contentType = response.headers.get('content-type') || ''
  if (contentType.includes('application/json')) {
    try {
      data = await response.json()
    } catch {
      data = null
    }
  }

  if (!response.ok) {
    throw new Error(data?.error || `خطای سرور (${response.status})`)
  }

  return data
}

function postJSON(url, body) {
  return request(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
}

function rawUrl(rootId, fileId) {
  return `/api/file/${encodeURIComponent(rootId)}/${encodeURIComponent(fileId)}/raw`
}

function showToast(message, type = 'info', duration = 4200) {
  const root = document.getElementById('toast-root')
  const toast = h('div', { class: `toast${type === 'error' ? ' error' : ''}` }, message)
  root.append(toast)
  setTimeout(() => {
    toast.style.transition = 'opacity .2s ease, transform .2s ease'
    toast.style.opacity = '0'
    toast.style.transform = 'translateY(6px)'
    setTimeout(() => toast.remove(), 220)
  }, duration)
}

function closeActiveOverlay() {
  if (!activeOverlayClose) return
  const close = activeOverlayClose
  activeOverlayClose = null
  close()
}

function mountOverlay(overlay, { closeOnBackdrop = true, onClose = null, escape = true } = {}) {
  closeActiveOverlay()
  const root = document.getElementById('overlay-root')
  root.replaceChildren(overlay)
  document.body.classList.add('modal-open')

  let closed = false
  const onKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      close()
    }
  }

  const close = () => {
    if (closed) return
    closed = true
    document.removeEventListener('keydown', onKeyDown)
    if (activeOverlayClose === close) activeOverlayClose = null
    root.replaceChildren()
    document.body.classList.remove('modal-open')
    onClose?.()
  }

  if (escape) document.addEventListener('keydown', onKeyDown)
  if (closeOnBackdrop) {
    overlay.addEventListener('click', (event) => {
      if (event.target === overlay) close()
    })
  }

  activeOverlayClose = close
  return { overlay, close }
}

function renderApp() {
  disconnectDimsObserver()
  const app = document.getElementById('app')
  app.replaceChildren()

  if (state.view !== 'explorer' && state.view !== 'duplicates') {
    state.view = 'welcome'
  }

  app.append(buildHeader())

  if (state.view === 'explorer' && state.tree) {
    app.append(renderExplorerMain())
    renderExplorerResults()
    if (state.highlightId) {
      requestAnimationFrame(() => {
        const row = document.querySelector(`tr[data-file-id="${CSS.escape(state.highlightId)}"]`)
        state.highlightId = null
        if (!row) return
        row.classList.add('highlighted')
        row.scrollIntoView({ block: 'center' })
      })
    }
  } else if (state.view === 'duplicates' && state.tree) {
    app.append(renderDuplicatesMain())
    renderDupList()
    if (!state.duplicates && !state.duplicatesLoading && !state.duplicatesError) {
      loadDuplicates()
    }
    requestAnimationFrame(applyPendingDuplicatesFocus)
  } else {
    state.view = 'welcome'
    app.append(renderWelcomeMain())
  }
}

function buildHeader() {
  const brand = h(
    'button',
    {
      class: 'brand',
      type: 'button',
      title: 'صفحه اول همسان',
      onClick: () => {
        if (state.view !== 'welcome') {
          state.welcomePath = state.root?.path || state.welcomePath
          state.view = 'welcome'
          renderApp()
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }
    },
    h('span', { class: 'brand-mark', html: ICONS.logo, 'aria-hidden': 'true' }),
    h(
      'span',
      {},
      h('span', { class: 'brand-name' }, 'همسان'),
      h('br'),
      h('span', { class: 'brand-sub' }, 'یابندهٔ فایل‌های تکراری')
    )
  )

  const inner = h('div', { class: 'appbar-inner' }, brand)

  if (state.root) {
    const changeButton = h(
      'button',
      {
        class: 'button button-ghost button-small',
        type: 'button',
        onClick: () => openBrowse(state.root.path, (selected) => startScan(selected))
      },
      'تغییر'
    )
    inner.append(
      h(
        'div',
        { class: 'root-chip', title: state.root.path },
        icon('folder'),
        h('span', { class: 'root-path' }, state.root.path),
        changeButton
      )
    )
  } else {
    inner.append(h('div', { class: 'spacer' }))
  }

  const actions = h('div', { class: 'appbar-actions' })

  if (state.view === 'welcome' && state.tree && state.root) {
    actions.append(
      h(
        'button',
        {
          class: 'button button-secondary button-small',
          type: 'button',
          onClick: () => {
            state.view = 'explorer'
            renderApp()
          }
        },
        icon('folder', 'icon-sm'),
        'بازگشت به مرور'
      )
    )
  }

  if (state.root) {
    actions.append(
      h(
        'button',
        {
          class: 'icon-button',
          type: 'button',
          title: 'بررسی مجدد پوشه',
          'aria-label': 'بررسی مجدد پوشه',
          onClick: () => startScan(state.root.path, { reloadPath: state.path })
        },
        icon('refresh')
      )
    )
  }

  actions.append(
    h(
      'span',
      { class: 'type-badge', title: 'فایل‌ها فقط روی همین کامپیوتر خوانده می‌شوند' },
      icon('check', 'icon-sm'),
      'کاملاً محلی'
    )
  )

  inner.append(actions)
  return h('header', { class: 'appbar' }, inner)
}

function renderWelcomeMain() {
  const pathInput = h('input', {
    class: 'path-input',
    type: 'text',
    dir: 'ltr',
    spellcheck: 'false',
    autocomplete: 'off',
    value: state.welcomePath || state.root?.path || '',
    placeholder: state.config.defaultPath || state.config.home || '/home/user/Pictures',
    'aria-label': 'مسیر پوشه',
    onInput: (event) => {
      state.welcomePath = event.target.value
      errorBox.classList.add('hidden')
    },
    onKeyDown: (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        startScan(pathInput.value)
      }
    }
  })

  const errorBox = h('div', { class: 'error-text hidden' })

  const browseButton = h(
    'button',
    {
      class: 'button button-secondary',
      type: 'button',
      onClick: () => {
        openBrowse(pathInput.value || state.config.defaultPath || state.config.home || '', (selected) => {
          pathInput.value = selected
          state.welcomePath = selected
          errorBox.classList.add('hidden')
          pathInput.focus()
        })
      }
    },
    icon('folder', 'icon-sm'),
    'مرور'
  )

  const scanButton = h(
    'button',
    {
      class: 'button button-primary',
      type: 'button',
      onClick: () => startScan(pathInput.value)
    },
    icon('search', 'icon-sm'),
    'بررسی این پوشه'
  )

  const picker = h(
    'section',
    { class: 'picker-card' },
    h('label', { class: 'field-label' }, 'مسیر پوشه‌ای که می‌خواهی بررسی شود'),
    h('div', { class: 'path-row' }, pathInput, browseButton),
    h('div', { class: 'picker-actions' }, scanButton),
    errorBox,
    h(
      'div',
      { class: 'hint' },
      'فقط ',
      h('strong', {}, 'تصویرها، ویدیوها، فایل‌های صوتی و سندها'),
      ' بررسی می‌شوند؛ بقیهٔ فایل‌ها نادیده گرفته می‌شوند. برای انتخاب پوشه می‌توانی مسیر را مستقیم بنویسی یا از دکمهٔ «مرور» استفاده کنی.'
    )
  )

  const features = h(
    'div',
    { class: 'feature-stack' },
    featureCard('folder', 'مرور لیستی پوشه‌ها', 'مثل فایل‌منیجر بین پوشه‌ها جابه‌جا شو؛ همه‌چیز داخل همین صفحه.'),
    featureCard('duplicate', 'تشخیص ساده و شفاف', 'فایل‌هایی با پسوند یکسان و حجم دقیقاً یکسان، تکراری حساب می‌شوند.'),
    featureCard('image', 'پیش‌نمایش بدون آپلود', 'عکس، ویدیو، صدا و PDF را همان‌جا ببین؛ هیچ فایلی از سیستم خارج نمی‌شود.')
  )

  const recents = getRecents()
  const recentSection = recents.length
    ? h(
        'section',
        { class: 'recent-section' },
        h('div', { class: 'section-heading' }, icon('refresh', 'icon-sm'), 'پوشه‌های اخیر'),
        h(
          'div',
          { class: 'chip-list' },
          recents.map((recent) =>
            h(
              'button',
              {
                class: 'recent-chip',
                type: 'button',
                title: recent.path,
                onClick: () => {
                  state.welcomePath = recent.path
                  startScan(recent.path)
                }
              },
              icon('folder', 'icon-sm'),
              h('span', { class: 'chip-name' }, recent.name || basenameOf(recent.path)),
              h('span', { class: 'chip-path' }, recent.path)
            )
          )
        )
      )
    : null

  return h(
    'main',
    { class: 'welcome' },
    h(
      'section',
      { class: 'hero' },
      h('div', { class: 'hero-mark', html: ICONS.logo, 'aria-hidden': 'true' }),
      h('h1', {}, 'همسان'),
      h('p', {}, 'یک پوشه از کامپیوترت را انتخاب کن تا فایل‌های تکراری تصویر، ویدیو، صدا و سند را داخل آن و زیرپوشه‌هایش پیدا کنیم.'),
      state.root?.scannedAt
        ? h('p', { class: 'muted', style: { marginTop: '10px', fontSize: '11px' } }, `آخرین بررسی: ${formatDate(state.root.scannedAt)}`)
        : null
    ),
    h('div', { class: 'welcome-grid' }, picker, features),
    recentSection,
    h(
      'footer',
      { class: 'welcome-foot' },
      'همسان نسخه 1.0 · بدون آپلود، بدون حساب کاربری · همهٔ پردازش‌ها روی همین کامپیوتر انجام می‌شود'
    )
  )
}

function featureCard(iconName, title, text) {
  return h(
    'div',
    { class: 'feature-card' },
    h('div', { class: 'feature-icon' }, icon(iconName)),
    h('div', {}, h('h3', {}, title), h('p', {}, text))
  )
}

function buildStats() {
  const stats = state.root?.stats
  if (!stats) return h('div')

  const categoryTitle = [
    `${categoryLabel('image')}: ${formatCount(stats.categoryCounts?.image || 0)}`,
    `${categoryLabel('video')}: ${formatCount(stats.categoryCounts?.video || 0)}`,
    `${categoryLabel('audio')}: ${formatCount(stats.categoryCounts?.audio || 0)}`,
    `${categoryLabel('document')}: ${formatCount(stats.categoryCounts?.document || 0)}`
  ].join(' · ')

  return h(
    'div',
    { class: 'summary-strip' },
    statCard('file', formatCount(stats.files), 'فایل رسانه‌ای', '', categoryTitle),
    statCard('folder', formatCount(stats.directories), 'پوشه', '', 'تعداد پوشه‌های داخل مسیر بررسی‌شده'),
    statCard('duplicate', formatCount(stats.duplicateGroups), 'گروه تکراری', 'warn', `${formatCount(stats.duplicateFiles)} فایل در این گروه‌ها قرار دارند`),
    statCard('duplicate', formatBytes(stats.wastedBytes), 'فضای قابل آزادسازی', 'accent', 'اگر فقط یک نسخه از هر گروه را نگه داری، این حجم آزاد می‌شود')
  )
}

function statCard(iconName, value, label, modifier = '', title = '') {
  return h(
    'div',
    { class: `stat-card${modifier ? ` ${modifier}` : ''}`, title },
    h('div', { class: 'stat-icon' }, icon(iconName)),
    h('div', { class: 'stat-body' }, h('div', { class: 'stat-value' }, value), h('div', { class: 'stat-label' }, label))
  )
}

function renderExplorerMain() {
  const searchInput = h('input', {
    type: 'search',
    value: state.search,
    placeholder: 'جستجوی نام فایل یا پوشه…',
    'aria-label': 'جستجو در فایل‌ها',
    onInput: (event) => {
      state.search = event.target.value
      handleSearchChange()
    }
  })

  const scopeFolder = h(
    'button',
    {
      class: `scope-button${state.searchScope === 'folder' ? ' active' : ''}`,
      type: 'button',
      'aria-pressed': state.searchScope === 'folder' ? 'true' : 'false',
      onClick: () => setSearchScope('folder')
    },
    'این پوشه'
  )

  const scopeAll = h(
    'button',
    {
      class: `scope-button${state.searchScope === 'all' ? ' active' : ''}`,
      type: 'button',
      'aria-pressed': state.searchScope === 'all' ? 'true' : 'false',
      onClick: () => setSearchScope('all')
    },
    'همه پوشه‌ها'
  )

  const dupToggle = h('input', {
    type: 'checkbox',
    checked: state.dupOnly,
    onChange: (event) => {
      state.dupOnly = event.target.checked
      renderExplorerResults()
    }
  })

  const tabs = h(
    'div',
    { class: 'tabs' },
    h(
      'button',
      { class: 'tab active', type: 'button' },
      icon('folder', 'icon-sm'),
      'مرور فایل‌ها'
    ),
    h(
      'button',
      { class: 'tab', type: 'button', onClick: () => openDuplicatesView() },
      icon('duplicate', 'icon-sm'),
      'فایل‌های تکراری',
      h('span', { class: 'tab-badge' }, formatCount(state.root.stats.duplicateGroups))
    )
  )

  const toolbar = h(
    'div',
    { class: 'toolbar' },
    tabs,
    h('div', { class: 'toolbar-spacer' }),
    h('div', { class: 'search-box' }, icon('search', 'icon-sm'), searchInput),
    h('div', { class: 'scope-toggle' }, scopeFolder, scopeAll),
    h('label', { class: 'switch', title: 'فقط فایل‌هایی که نسخه تکراری دارند' }, dupToggle, h('span', { class: 'switch-track' }), h('span', {}, 'فقط تکراری‌ها')),
    h(
      'button',
      {
        class: 'button button-secondary button-small',
        type: 'button',
        title: 'پوشه را از نو بررسی کن',
        onClick: () => startScan(state.root.path, { reloadPath: state.path })
      },
      icon('refresh', 'icon-sm'),
      'بررسی مجدد'
    )
  )

  const crumbs = h('nav', { class: 'breadcrumbs', 'aria-label': 'مسیر پوشه' })
  const breadcrumbs = state.tree.breadcrumbs || []
  breadcrumbs.forEach((crumb, index) => {
    if (index > 0) crumbs.append(h('span', { class: 'crumb-sep', html: ICONS.chevronLeft, 'aria-hidden': 'true' }))
    crumbs.append(
      h(
        'button',
        {
          class: `crumb${index === breadcrumbs.length - 1 ? ' current' : ''}`,
          type: 'button',
          title: crumb.name,
          onClick: () => navigate(crumb.rel)
        },
        icon('folder', 'icon-sm'),
        h('span', {}, crumb.name)
      )
    )
  })

  const panel = h(
    'section',
    { class: 'panel' },
    toolbar,
    h('div', { class: 'breadcrumb-bar' }, crumbs, h('span', { class: 'result-count', id: 'result-count' }, '')),
    h('div', { class: 'table-scroll', id: 'results' })
  )

  return h(
    'main',
    { class: 'page' },
    buildStats(),
    panel,
    h(
      'footer',
      { class: 'app-footer' },
      `بررسی‌شده در ${formatDate(state.root.scannedAt)} · ${formatCount(state.root.stats.scannedEntries)} مورد اسکن شد · ${formatCount(state.root.stats.errors)} خطای دسترسی`
    )
  )
}

function setSearchScope(scope) {
  globalSearchToken += 1
  clearTimeout(searchDebounceTimer)
  state.searchScope = scope
  state.globalSearch = null
  state.globalSearchError = null
  state.globalSearchLoading = false
  renderApp()
  if (scope === 'all' && state.search.trim().length >= 2) {
    runGlobalSearch()
  }
}

function handleSearchChange() {
  globalSearchToken += 1
  clearTimeout(searchDebounceTimer)
  state.globalSearchError = null

  if (state.searchScope !== 'all') {
    state.globalSearch = null
    state.globalSearchLoading = false
    renderExplorerResults()
    return
  }

  const query = state.search.trim()
  if (query.length < 2) {
    state.globalSearch = null
    state.globalSearchLoading = false
    renderExplorerResults()
    return
  }

  state.globalSearch = null
  state.globalSearchLoading = true
  renderExplorerResults()
  searchDebounceTimer = setTimeout(() => runGlobalSearch(), 280)
}

async function runGlobalSearch() {
  if (!state.root || state.searchScope !== 'all') return
  const query = state.search.trim()
  if (query.length < 2) return

  const token = ++globalSearchToken
  state.globalSearchLoading = true
  state.globalSearchError = null
  renderExplorerResults()

  try {
    const data = await request(`/api/search/${state.root.id}?q=${encodeURIComponent(query)}`)
    if (token !== globalSearchToken || state.searchScope !== 'all') return
    state.globalSearch = data
  } catch (error) {
    if (token !== globalSearchToken) return
    state.globalSearchError = error.message
  } finally {
    if (token === globalSearchToken) {
      state.globalSearchLoading = false
      renderExplorerResults()
    }
  }
}

function renderExplorerResults() {
  const container = document.getElementById('results')
  if (!container || state.view !== 'explorer') return

  const countElement = document.getElementById('result-count')
  const isGlobal = state.searchScope === 'all'
  const rawQuery = state.search.trim()

  if (isGlobal && rawQuery.length < 2) {
    container.replaceChildren(
      emptyState('search', 'جستجو در همه پوشه‌ها', 'برای جستجوی کل پوشه، حداقل دو حرف از نام فایل یا پوشه را وارد کنید.')
    )
    if (countElement) countElement.textContent = ''
    return
  }

  if (isGlobal && state.globalSearchError) {
    container.replaceChildren(
      emptyState('alert', 'جستجو انجام نشد', state.globalSearchError)
    )
    if (countElement) countElement.textContent = ''
    return
  }

  if (isGlobal && state.globalSearchLoading) {
    container.replaceChildren(loadingState('در حال جستجو در همه پوشه‌ها…'))
    if (countElement) countElement.textContent = ''
    return
  }

  let folders = []
  let files = []
  let message = null

  if (isGlobal) {
    if (!state.globalSearch) {
      container.replaceChildren(loadingState('در حال جستجو…'))
      return
    }
    folders = state.globalSearch.folders || []
    files = state.globalSearch.files || []
  } else {
    folders = state.tree.folders || []
    files = state.tree.files || []

    if (rawQuery) {
      const query = normalizeFa(rawQuery)
      folders = folders.filter((folder) => normalizeFa(folder.name).includes(query))
      files = files.filter((file) => normalizeFa(`${file.name} ${file.rel}`).includes(query))
    }
  }

  if (state.dupOnly) {
    folders = []
    files = files.filter((file) => file.dupCount > 1)
  }

  if (countElement) {
    countElement.textContent = `${formatCount(folders.length)} پوشه · ${formatCount(files.length)} فایل`
  }

  if (folders.length === 0 && files.length === 0) {
    if (state.dupOnly) {
      message = emptyState('check', 'فایل تکراری‌ای این‌جا نیست', 'در لیست فعلی، فایلی با پسوند و حجم یکسان پیدا نشد. فیلتر «فقط تکراری‌ها» را بردار یا پوشه را دوباره بررسی کن.')
    } else if (rawQuery) {
      message = emptyState('search', 'نتیجه‌ای پیدا نشد', 'عبارت جستجو را کوتاه‌تر یا متفاوت وارد کن.')
    } else {
      message = emptyState('image', 'این پوشه فایل رسانه‌ای ندارد', 'فقط تصویر، ویدیو، صدا و سند نمایش داده می‌شوند. سایر فایل‌ها بررسی نمی‌شوند.')
    }
    container.replaceChildren(message)
    return
  }

  const dimsTargets = []
  const table = buildFileTable(folders, files, { global: isGlobal, dimsTargets })
  container.replaceChildren(table)
  setupDimsTargets(dimsTargets)

  if (state.highlightId) {
    const id = state.highlightId
    state.highlightId = null
    requestAnimationFrame(() => {
      const row = container.querySelector(`tr[data-file-id="${CSS.escape(id)}"]`)
      if (!row) return
      row.classList.add('highlighted')
      row.scrollIntoView({ block: 'center' })
    })
  }
}

function buildFileTable(folders, files, { global, dimsTargets }) {
  const head = h(
    'thead',
    {},
    h(
      'tr',
      {},
      h('th', { scope: 'col' }, 'نام'),
      h('th', { scope: 'col', class: 'col-dims' }, 'ابعاد / مدت'),
      h('th', { scope: 'col', class: 'col-size' }, 'حجم'),
      h('th', { scope: 'col', class: 'col-type' }, 'نوع'),
      h('th', { scope: 'col', class: 'col-dup' }, 'وضعیت تکراری'),
      h('th', { scope: 'col', class: 'col-peer' }, 'فایل تکراری')
    )
  )

  const body = h('tbody')
  for (const folder of folders) body.append(folderRow(folder, global))
  for (const file of files) body.append(fileRow(file, global, dimsTargets))

  return h('table', { class: 'file-table' }, head, body)
}

function folderRow(folder, global) {
  const row = h(
    'tr',
    {
      class: 'folder-row',
      dataset: { clickable: 'true' },
      tabindex: '0',
      title: `باز کردن پوشه ${folder.name}`
    },
    h(
      'td',
      {},
      h(
        'div',
        { class: 'file-cell' },
        fileIcon(null, true),
        h(
          'div',
          { class: 'file-text' },
          h('span', { class: 'file-name', title: folder.name, dir: 'auto' }, folder.name),
          global
            ? h('span', { class: 'subpath', title: folder.rel }, `/${folder.rel}`)
            : h('span', { class: 'count-sub' }, folder.fileCount ? `${formatCount(folder.fileCount)} فایل رسانه‌ای` : 'خالی')
        )
      )
    ),
    h('td', { class: 'dims-cell' }, h('span', { class: 'dash' }, '—')),
    h('td', { class: 'size-cell' }, folder.size ? formatBytes(folder.size) : '—'),
    h('td', {}, h('span', { class: 'type-badge' }, 'پوشه')),
    h(
      'td',
      {},
      folder.dupFileCount
        ? h(
            'span',
            {
              class: 'dup-pill soft',
              title: `${formatCount(folder.dupFileCount)} فایل تکراری در این پوشه و زیرپوشه‌هایش`
            },
            icon('duplicate'),
            `${formatCount(folder.dupFileCount)} فایل`
          )
        : h('span', { class: 'dash' }, '—')
    ),
    h('td', {}, h('span', { class: 'dash' }, '—'))
  )

  row.addEventListener('click', () => navigate(folder.rel))
  row.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (event.target !== row) return
      event.preventDefault()
      navigate(folder.rel)
    }
  })

  return row
}

function fileRow(file, global, dimsTargets) {
  const dimsCell = h('td', { class: 'dims-cell' })
  const cachedDims = getCachedDims(state.root.id, file.id)

  if (file.dims && file.dims.width && file.dims.height) {
    setDimsCell(dimsCell, file, { dims: file.dims, duration: null })
  } else if (cachedDims) {
    setDimsCell(dimsCell, file, cachedDims)
  } else if (['image', 'video', 'audio'].includes(file.category)) {
    dimsCell.textContent = '…'
    dimsCell.title = 'در حال خواندن اطلاعات فایل'
    dimsTargets.push({ el: dimsCell, file, rootId: state.root.id })
  } else {
    dimsCell.textContent = '—'
  }

  const typeBadge = h(
    'span',
    { class: 'type-badge' },
    categoryLabel(file.category),
    file.ext ? h('span', { class: 'ext' }, file.ext.toUpperCase()) : null
  )

  const row = h(
    'tr',
    {
      dataset: { fileId: file.id, clickable: 'true' },
      tabindex: '0',
      title: file.name
    },
    h(
      'td',
      {},
      h(
        'div',
        { class: 'file-cell' },
        fileIcon(file.category),
        h(
          'div',
          { class: 'file-text' },
          h('span', { class: 'file-name', title: file.name, dir: 'auto' }, file.name),
          global ? h('span', { class: 'subpath', title: file.dirRel }, file.dirRel ? `/${file.dirRel}` : '/') : null
        )
      )
    ),
    dimsCell,
    h('td', { class: 'size-cell', title: `${formatCount(file.size)} بایت` }, formatBytes(file.size)),
    h('td', {}, typeBadge),
    duplicateStatusCell(file),
    duplicatePeerCell(file)
  )

  row.addEventListener('click', (event) => {
    if (event.target.closest('button, a')) return
    openPreview(file)
  })
  row.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || event.target !== row) return
    event.preventDefault()
    openPreview(file)
  })

  return row
}

function duplicateStatusCell(file) {
  if (!file.dupCount || file.dupCount < 2) return h('td', {}, h('span', { class: 'dash' }, '—'))
  const otherCount = file.dupCount - 1
  return h(
    'td',
    {},
    h(
      'span',
      {
        class: 'dup-pill warn',
        title: `این فایل با ${formatCount(otherCount)} فایل دیگر پسوند و حجم یکسان دارد`
      },
      icon('alert'),
      `تکراری · ${formatCount(file.dupCount)}`
    )
  )
}

function duplicatePeerCell(file) {
  if (!file.duplicates || file.duplicates.length === 0) return h('td', {}, h('span', { class: 'dash' }, '—'))
  const first = file.duplicates[0]
  const others = Math.max(0, (file.peerTotal || 0) - 1)
  const allPaths = file.duplicates.map((peer) => peer.rel).join('\n')

  const button = h(
    'button',
    {
      class: 'peer-link',
      type: 'button',
      title: allPaths,
      'aria-label': `نمایش نسخه‌های تکراری ${file.name}`,
      onClick: (event) => {
        event.stopPropagation()
        openDuplicatesDrawer(file)
      }
    },
    icon('duplicate', 'icon-sm'),
    h('span', { class: 'peer-path' }, first.rel),
    others > 0 ? h('span', { class: 'peer-more' }, `+${formatCount(others)}`) : null
  )

  return h('td', { class: 'peer-cell' }, button)
}

function emptyState(iconName, title, description) {
  return h(
    'div',
    { class: 'empty-state' },
    h(
      'div',
      { class: 'empty-inner' },
      h('div', { class: 'empty-icon' }, icon(iconName)),
      h('h3', {}, title),
      h('p', {}, description)
    )
  )
}

function loadingState(message) {
  return h(
    'div',
    { class: 'loading-state' },
    h('div', {}, h('div', { class: 'spinner' }), h('div', { class: 'muted', style: { fontSize: '12px' } }, message))
  )
}

function disconnectDimsObserver() {
  if (dimsObserver) {
    dimsObserver.disconnect()
    dimsObserver = null
  }
  dimsBindings = new WeakMap()
}

function setupDimsTargets(targets) {
  disconnectDimsObserver()
  if (!targets.length) return

  dimsObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        dimsObserver?.unobserve(entry.target)
        const binding = dimsBindings.get(entry.target)
        if (!binding) continue
        loadDims(binding.file, binding.rootId)
          .then((meta) => {
            if (!entry.target.isConnected) return
            setDimsCell(entry.target, binding.file, meta)
          })
          .catch(() => {
            if (entry.target.isConnected) entry.target.textContent = '—'
          })
      }
    },
    { rootMargin: '180px' }
  )

  for (const target of targets) {
    dimsBindings.set(target.el, target)
    dimsObserver.observe(target.el)
  }
}

function dimsKey(rootId, fileId) {
  return `${rootId}:${fileId}`
}

function getCachedDims(rootId, fileId) {
  return dimsCache.get(dimsKey(rootId, fileId)) || null
}

function loadDims(file, rootId) {
  const key = dimsKey(rootId, file.id)
  if (dimsCache.has(key)) return Promise.resolve(dimsCache.get(key))
  if (dimsRequests.has(key)) return dimsRequests.get(key)

  const promise = new Promise((resolve) => {
    dimsQueue.push(async () => {
      try {
        resolve(await fetchDims(file, rootId))
      } catch {
        resolve(null)
      }
    })
    pumpDimsQueue()
  })
    .then((meta) => {
      dimsCache.set(key, meta)
      return meta
    })
    .finally(() => {
      dimsRequests.delete(key)
    })

  dimsRequests.set(key, promise)
  return promise
}

function pumpDimsQueue() {
  while (dimsActive < 3 && dimsQueue.length > 0) {
    const task = dimsQueue.shift()
    dimsActive += 1
    Promise.resolve()
      .then(task)
      .finally(() => {
        dimsActive -= 1
        pumpDimsQueue()
      })
  }
}

async function fetchDims(file, rootId) {
  if (file.category === 'image') {
    if (file.dims?.width && file.dims?.height) return { dims: file.dims, duration: null }
    const data = await request(`/api/dims/${encodeURIComponent(rootId)}/${encodeURIComponent(file.id)}`)
    return { dims: data?.dims || null, duration: null }
  }

  if (file.category === 'video' || file.category === 'audio') {
    return readMediaMetadata(file, rootId)
  }

  return null
}

function readMediaMetadata(file, rootId) {
  return new Promise((resolve) => {
    const element = document.createElement(file.category === 'video' ? 'video' : 'audio')
    element.preload = 'metadata'
    if (file.category === 'video') {
      element.muted = true
      element.playsInline = true
    }

    let settled = false
    let timer = null

    const finish = (result) => {
      if (settled) return
      settled = true
      if (timer) clearTimeout(timer)
      element.removeAttribute('src')
      try {
        element.load()
      } catch {
        // Ignore cleanup failures.
      }
      resolve(result)
    }

    element.addEventListener(
      'loadedmetadata',
      () => {
        const dims = element.videoWidth && element.videoHeight
          ? { width: element.videoWidth, height: element.videoHeight }
          : null
        const duration = Number.isFinite(element.duration) && element.duration > 0 ? element.duration : null
        finish(dims || duration ? { dims, duration } : null)
      },
      { once: true }
    )
    element.addEventListener('error', () => finish(null), { once: true })

    timer = setTimeout(() => finish(null), 12000)
    element.src = rawUrl(rootId, file.id)
  })
}

function setDimsCell(element, file, meta) {
  if (!meta) {
    element.textContent = '—'
    element.title = ''
    return
  }

  const parts = []
  if (meta.dims?.width && meta.dims?.height) {
    parts.push(`${meta.dims.width}×${meta.dims.height}`)
  }
  if (meta.duration && file.category !== 'image') {
    parts.push(formatDuration(meta.duration))
  }

  element.textContent = parts.length ? parts.join(' · ') : '—'
  element.title = [
    meta.dims?.width ? `${formatCount(meta.dims.width)} × ${formatCount(meta.dims.height)} پیکسل` : '',
    meta.duration ? `مدت: ${formatDuration(meta.duration)}` : ''
  ].filter(Boolean).join(' · ')
}

function openDuplicatesView({ groupId = null, fileId = null } = {}) {
  closeActiveOverlay()
  state.view = 'duplicates'
  state.dupFilter = 'all'
  state.dupSearch = ''
  state.pendingGroupId = groupId
  state.pendingFileId = fileId
  renderApp()
}

function renderDuplicatesMain() {
  const groups = state.duplicates?.groups || []
  const header = h(
    'div',
    { class: 'dup-head' },
    h(
      'div',
      {},
      h('h2', {}, 'فایل‌های تکراری'),
      h(
        'p',
        {},
        state.duplicates
          ? `${formatCount(groups.length)} گروه تکراری · ${formatCount(state.duplicates.root.stats.duplicateFiles)} فایل · ${formatBytes(state.duplicates.root.stats.wastedBytes)} قابل آزادسازی`
          : 'در حال آماده‌سازی گزارش…'
      )
    ),
    h(
      'button',
      {
        class: 'button button-secondary button-small',
        type: 'button',
        onClick: () => {
          state.view = 'explorer'
          renderApp()
        }
      },
      icon('folder', 'icon-sm'),
      'بازگشت به مرور'
    )
  )

  const searchInput = h('input', {
    type: 'search',
    value: state.dupSearch,
    placeholder: 'جستجو در نام یا مسیر فایل‌های تکراری…',
    'aria-label': 'جستجو در فایل‌های تکراری',
    onInput: (event) => {
      state.dupSearch = event.target.value
      renderDupList()
    }
  })

  const controls = h(
    'div',
    { class: 'dup-controls' },
    h('div', { class: 'search-box' }, icon('search', 'icon-sm'), searchInput),
    state.duplicates ? buildFilterChips(groups) : null,
    h('span', { class: 'result-count', id: 'dup-count' }, '')
  )

  const panel = h(
    'section',
    { class: 'panel' },
    header,
    controls,
    h('div', { class: 'dup-list', id: 'dup-list' })
  )

  return h(
    'main',
    { class: 'page' },
    buildStats(),
    panel,
    h('footer', { class: 'app-footer' }, 'قاعدهٔ تشخیص: پسوند یکسان + حجم بایت‌به‌بایت یکسان')
  )
}

function buildFilterChips(groups) {
  const counts = { all: groups.length, image: 0, video: 0, audio: 0, document: 0 }
  for (const group of groups) counts[group.category] = (counts[group.category] || 0) + 1

  const filters = [
    ['all', 'همه'],
    ['image', categoryLabel('image')],
    ['video', categoryLabel('video')],
    ['audio', categoryLabel('audio')],
    ['document', categoryLabel('document')]
  ]

  return h(
    'div',
    { class: 'filter-chips' },
    filters.map(([key, label]) =>
      h(
        'button',
        {
          class: `filter-chip${state.dupFilter === key ? ' active' : ''}`,
          type: 'button',
          dataset: { filter: key },
          onClick: () => {
            state.dupFilter = key
            document.querySelectorAll('.filter-chip').forEach((chip) => {
              chip.classList.toggle('active', chip.dataset.filter === key)
            })
            renderDupList()
          }
        },
        `${label} ${formatCount(counts[key] || 0)}`
      )
    )
  )
}

function renderDupList() {
  const container = document.getElementById('dup-list')
  if (!container) return

  const countElement = document.getElementById('dup-count')

  if (!state.duplicates) {
    if (state.duplicatesError) {
      const retry = h(
        'button',
        {
          class: 'button button-secondary button-small',
          type: 'button',
          style: { marginTop: '12px' },
          onClick: () => {
            state.duplicatesError = null
            state.duplicates = null
            state.duplicatesLoading = false
            renderApp()
          }
        },
        icon('refresh', 'icon-sm'),
        'تلاش دوباره'
      )
      const box = emptyState('alert', 'گزارش تکراری‌ها بارگذاری نشد', state.duplicatesError)
      box.querySelector('.empty-inner').append(retry)
      container.replaceChildren(box)
    } else {
      container.replaceChildren(loadingState('در حال پیدا کردن فایل‌های تکراری…'))
    }
    if (countElement) countElement.textContent = ''
    return
  }

  const allGroups = state.duplicates.groups || []
  const query = normalizeFa(state.dupSearch)
  let groups = allGroups

  if (state.dupFilter !== 'all') {
    groups = groups.filter((group) => group.category === state.dupFilter)
  }
  if (query) {
    groups = groups.filter((group) =>
      group.files.some((file) => normalizeFa(`${file.name} ${file.rel}`).includes(query))
    )
  }

  const totalFiles = groups.reduce((sum, group) => sum + group.count, 0)
  if (countElement) {
    countElement.textContent = `${formatCount(groups.length)} گروه · ${formatCount(totalFiles)} فایل`
  }

  if (groups.length === 0) {
    if (allGroups.length === 0) {
      container.replaceChildren(
        emptyState('check', 'هیچ فایل تکراری پیدا نشد', 'در این پوشه و زیرپوشه‌هایش، دو فایل با پسوند و حجم یکسان وجود ندارد.')
      )
    } else {
      container.replaceChildren(
        emptyState('search', 'با این فیلتر چیزی پیدا نشد', 'فیلتر دسته یا عبارت جستجو را تغییر بده.')
      )
    }
    return
  }

  const openAll = groups.length <= 20
  const fragment = document.createDocumentFragment()
  groups.forEach((group, index) => {
    fragment.append(buildDupGroup(group, openAll || group.id === state.pendingGroupId))
  })
  container.replaceChildren(fragment)
}

function buildDupGroup(group, open) {
  const filesBox = h('div', { class: 'dup-files' })

  for (const file of group.files) {
    const previewButton = h(
      'button',
      {
        class: 'dup-file-name',
        type: 'button',
        title: file.name,
        dir: 'auto',
        onClick: () => openPreview(file)
      },
      file.name
    )

    const actions = h(
      'div',
      { class: 'dup-file-actions' },
      h(
        'button',
        {
          class: 'button button-ghost button-small',
          type: 'button',
          title: 'پیش‌نمایش فایل',
          'aria-label': `پیش‌نمایش ${file.name}`,
          onClick: () => openPreview(file)
        },
        icon('eye', 'icon-sm'),
        h('span', {}, 'نمایش')
      ),
      h(
        'button',
        {
          class: 'button button-ghost button-small',
          type: 'button',
          title: 'رفتن به پوشهٔ این فایل',
          'aria-label': `رفتن به پوشهٔ ${file.name}`,
          onClick: () => navigate(file.dirRel || '', file.id)
        },
        icon('folder', 'icon-sm'),
        h('span', {}, 'پوشه')
      )
    )

    filesBox.append(
      h(
        'div',
        { class: 'dup-file-row', dataset: { fileId: file.id } },
        fileIcon(file.category),
        h(
          'div',
          { class: 'dup-file-info' },
          previewButton,
          h('span', { class: 'subpath', title: file.rel }, file.dirRel ? `/${file.dirRel}` : '/')
        ),
        actions
      )
    )
  }

  return h(
    'details',
    { class: 'dup-group', open, dataset: { groupId: group.id } },
    h(
      'summary',
      {},
      fileIcon(group.category),
      h(
        'div',
        { class: 'dup-summary-main' },
        h(
          'div',
          { class: 'dup-summary-title' },
          h('span', { class: 'ext-badge' }, group.ext),
          `${formatCount(group.count)} نسخهٔ یکسان`,
          h('span', { class: 'muted', style: { fontWeight: '500' } }, `· ${group.categoryLabel || categoryLabel(group.category)}`)
        ),
        h(
          'div',
          { class: 'dup-summary-meta' },
          h('span', {}, `${formatBytes(group.size)} برای هر نسخه`),
          h('span', {}, '·'),
          h('span', { class: 'dup-wasted' }, `${formatBytes(group.wasted)} قابل آزادسازی`)
        )
      ),
      h('span', { class: 'icon dup-chevron', html: ICONS.chevronDown, 'aria-hidden': 'true' })
    ),
    filesBox
  )
}

function applyPendingDuplicatesFocus() {
  if (!state.pendingGroupId) return
  const groupId = state.pendingGroupId
  const fileId = state.pendingFileId
  state.pendingGroupId = null
  state.pendingFileId = null

  const groupElement = document.querySelector(`details[data-group-id="${CSS.escape(groupId)}"]`)
  if (!groupElement) return
  groupElement.open = true
  groupElement.classList.add('group-highlight')
  groupElement.scrollIntoView({ block: 'center' })
  setTimeout(() => groupElement.classList.remove('group-highlight'), 2300)

  if (fileId) {
    const row = groupElement.querySelector(`[data-file-id="${CSS.escape(fileId)}"]`)
    if (row) {
      row.classList.add('highlighted')
      row.scrollIntoView({ block: 'center' })
    }
  }
}

async function loadDuplicates() {
  if (!state.root || state.duplicatesLoading) return
  if (state.duplicates?.root?.id === state.root.id) return

  const rootId = state.root.id
  state.duplicatesLoading = true
  state.duplicatesError = null

  try {
    const data = await request(`/api/duplicates/${rootId}`)
    if (!state.root || state.root.id !== rootId) return
    state.duplicates = data
  } catch (error) {
    if (state.root?.id !== rootId) return
    state.duplicatesError = error.message
  } finally {
    if (state.root?.id === rootId) {
      state.duplicatesLoading = false
      if (state.view === 'duplicates') {
        renderApp()
        requestAnimationFrame(applyPendingDuplicatesFocus)
      }
    }
  }
}

function openDuplicatesDrawer(file) {
  if (!file.duplicates?.length) return
  closeActiveOverlay()

  const currentRow = h(
    'div',
    { class: 'drawer-row current' },
    fileIcon(file.category),
    h(
      'div',
      { class: 'file-info' },
      h('span', { class: 'file-title' }, file.name),
      h('span', { class: 'file-path', title: file.rel }, file.rel)
    )
  )

  const peerRows = file.duplicates.map((peer) => {
    return h(
      'div',
      { class: 'drawer-row' },
      fileIcon(peer.category || categoryFromExt(peer.ext)),
      h(
        'div',
        { class: 'file-info' },
        h('span', { class: 'file-title', title: peer.name }, peer.name),
        h('span', { class: 'file-path', title: peer.rel }, peer.dirRel ? `/${peer.dirRel}` : '/')
      ),
      h(
        'div',
        { class: 'drawer-actions' },
        h(
          'button',
          {
            class: 'icon-button',
            type: 'button',
            title: 'پیش‌نمایش',
            'aria-label': `پیش‌نمایش ${peer.name}`,
            onClick: () => {
              close()
              openPreview(peer)
            }
          },
          icon('eye', 'icon-sm')
        ),
        h(
          'button',
          {
            class: 'icon-button',
            type: 'button',
            title: 'رفتن به پوشه',
            'aria-label': `رفتن به پوشهٔ ${peer.name}`,
            onClick: () => {
              close()
              navigate(peer.dirRel || '', peer.id)
            }
          },
          icon('folder', 'icon-sm')
        )
      )
    )
  })

  const hiddenCount = Math.max(0, (file.peerTotal || 0) - file.duplicates.length)

  const body = h(
    'div',
    { class: 'drawer-body' },
    h('p', { class: 'drawer-section-label' }, 'این فایل'),
    currentRow,
    h(
      'p',
      { class: 'drawer-section-label', style: { marginTop: '16px' } },
      `${formatCount(file.peerTotal || file.duplicates.length)} نسخهٔ تکراری دیگر`
    ),
    peerRows,
    hiddenCount > 0
      ? h('div', { class: 'drawer-more' }, `و ${formatCount(hiddenCount)} فایل دیگر در همین گروه.`)
      : null
  )

  const footer = h(
    'div',
    { class: 'drawer-footer' },
    h(
      'button',
      {
        class: 'button button-primary',
        type: 'button',
        onClick: () => {
          close()
          openDuplicatesView({ groupId: file.groupId, fileId: file.id })
        }
      },
      icon('duplicate', 'icon-sm'),
      'مشاهده گروه کامل'
    ),
    h(
      'button',
      { class: 'button button-secondary', type: 'button', onClick: () => close() },
      'بستن'
    )
  )

  const drawer = h(
    'aside',
    { class: 'drawer', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'نسخه‌های تکراری' },
    h(
      'div',
      { class: 'drawer-header' },
      h('div', {}, h('h2', {}, 'نسخه‌های تکراری'), h('p', {}, file.name)),
      h(
        'button',
        { class: 'icon-button', type: 'button', title: 'بستن', 'aria-label': 'بستن', onClick: () => close() },
        icon('close')
      )
    ),
    body,
    footer
  )

  const overlay = h('div', { class: 'drawer-overlay' }, drawer)
  const { close } = mountOverlay(overlay, { closeOnBackdrop: true })
  requestAnimationFrame(() => drawer.querySelector('.icon-button')?.focus())
}

function categoryFromExt(ext) {
  const groups = {
    image: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'avif', 'tif', 'tiff', 'heic', 'heif', 'ico', 'jxl'],
    video: ['mp4', 'm4v', 'mkv', 'mov', 'avi', 'webm', 'mpg', 'mpeg', 'wmv', 'flv', '3gp', 'ogv', 'mts', 'm2ts'],
    audio: ['mp3', 'wav', 'flac', 'ogg', 'oga', 'm4a', 'aac', 'wma', 'opus', 'aif', 'aiff', 'amr', 'mid', 'midi'],
    document: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'txt', 'md', 'markdown', 'csv', 'tsv', 'rtf', 'odt', 'ods', 'odp', 'epub']
  }
  const normalized = String(ext || '').toLowerCase()
  for (const [category, extensionList] of Object.entries(groups)) {
    if (extensionList.includes(normalized)) return category
  }
  return 'document'
}

function openPreview(file) {
  closeActiveOverlay()
  const category = file.category || categoryFromExt(file.ext)

  const dimsSpan = h('span', {})
  const meta = h(
    'div',
    { class: 'preview-meta' },
    h('span', {}, `${categoryLabel(category)}${file.ext ? ` · ${file.ext.toUpperCase()}` : ''}`),
    h('span', { class: 'ltr' }, formatBytes(file.size || 0)),
    h('span', { class: 'ltr', title: file.rel }, file.rel || file.name),
    dimsSpan
  )

  const updatePreviewDims = (metaValue) => {
    if (!metaValue) {
      dimsSpan.textContent = ''
      return
    }
    const parts = []
    if (metaValue.dims?.width && metaValue.dims?.height) {
      parts.push(`${metaValue.dims.width}×${metaValue.dims.height}`)
    }
    if (metaValue.duration && category !== 'image') parts.push(formatDuration(metaValue.duration))
    dimsSpan.textContent = parts.join(' · ')
    if (state.root) dimsCache.set(dimsKey(state.root.id, file.id), metaValue)
  }

  const cached = state.root ? getCachedDims(state.root.id, file.id) : null
  if (cached) updatePreviewDims(cached)

  const body = h('div', { class: 'preview-body' })
  let close = () => {}

  const replaceBodyWithFallback = (message) => {
    body.replaceChildren(
      h(
        'div',
        { class: 'preview-fallback' },
        fileIcon(category),
        h('h3', {}, 'پیش‌نمایش در مرورگر ممکن نیست'),
        h('p', {}, message),
        h(
          'a',
          {
            class: 'button button-secondary',
            href: rawUrl(state.root.id, file.id),
            target: '_blank',
            rel: 'noopener'
          },
          icon('external', 'icon-sm'),
          'باز کردن فایل'
        )
      )
    )
  }

  const closeButton = h(
    'button',
    { class: 'icon-button', type: 'button', title: 'بستن', 'aria-label': 'بستن', onClick: () => close() },
    icon('close')
  )

  const goToFolderButton = h(
    'button',
    {
      class: 'button button-secondary',
      type: 'button',
      onClick: () => {
        const dir = file.dirRel || ''
        const id = file.id
        close()
        navigate(dir, id)
      }
    },
    icon('folder', 'icon-sm'),
    'نمایش در پوشه'
  )

  const footer = h(
    'div',
    { class: 'modal-footer' },
    goToFolderButton,
    h(
      'a',
      {
        class: 'button button-primary',
        href: rawUrl(state.root.id, file.id),
        target: '_blank',
        rel: 'noopener'
      },
      icon('external', 'icon-sm'),
      'باز کردن در تب جدید'
    ),
    h(
      'a',
      {
        class: 'button button-secondary',
        href: `${rawUrl(state.root.id, file.id)}?download=1`,
        download: file.name
      },
      icon('download', 'icon-sm'),
      'دانلود'
    )
  )

  const modal = h(
    'div',
    { class: 'modal preview-modal', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'preview-title' },
    h(
      'div',
      { class: 'modal-header' },
      fileIcon(category),
      h(
        'div',
        { style: { minWidth: '0', flex: '1' } },
        h('h2', { class: 'modal-title', id: 'preview-title', title: file.name }, file.name),
        h('p', { class: 'modal-subtitle', title: file.rel }, file.rel || file.name)
      ),
      closeButton
    ),
    meta,
    body,
    footer
  )

  const overlay = h('div', { class: 'overlay' }, modal)
  const mounted = mountOverlay(overlay, { closeOnBackdrop: true })
  close = mounted.close

  if (category === 'image') {
    const image = h('img', {
      class: 'preview-media',
      src: rawUrl(state.root.id, file.id),
      alt: file.name,
      onLoad: () => {
        const value = { dims: { width: image.naturalWidth, height: image.naturalHeight }, duration: null }
        updatePreviewDims(value)
      },
      onError: () => replaceBodyWithFallback('این تصویر توسط مرورگر پشتیبانی نمی‌شود یا خواندن آن ممکن نیست.')
    })
    body.append(image)
  } else if (category === 'video' || category === 'audio') {
    const media = h(category === 'video' ? 'video' : 'audio', {
      class: 'preview-media',
      src: rawUrl(state.root.id, file.id),
      controls: true,
      preload: 'metadata',
      onLoadedMetadata: () => {
        const dims = media.videoWidth && media.videoHeight
          ? { width: media.videoWidth, height: media.videoHeight }
          : null
        const duration = Number.isFinite(media.duration) && media.duration > 0 ? media.duration : null
        updatePreviewDims(dims || duration ? { dims, duration } : null)
      },
      onError: () => replaceBodyWithFallback('مرورگر نمی‌تواند این فایل صوتی یا تصویری را پخش کند. ممکن است کدک آن پشتیبانی نشود.')
    })
    if (category === 'video') {
      media.muted = false
      media.playsInline = true
    }
    body.append(media)
  } else if (file.ext === 'pdf') {
    body.append(
      h('iframe', {
        class: 'preview-pdf',
        src: rawUrl(state.root.id, file.id),
        title: `پیش‌نمایش ${file.name}`
      })
    )
  } else if (['txt', 'md', 'markdown', 'csv', 'tsv'].includes(String(file.ext).toLowerCase())) {
    body.append(loadingState('در حال خواندن فایل…'))
    request(`/api/file/${encodeURIComponent(state.root.id)}/${encodeURIComponent(file.id)}/text`)
      .then((data) => {
        const pre = h('pre', { class: 'preview-text' }, data.text || '')
        body.replaceChildren(pre)
        if (data.truncated) {
          body.append(
            h(
              'div',
              { class: 'muted', style: { padding: '8px 4px 0', fontSize: '11px' } },
              'فقط ابتدای فایل نمایش داده می‌شود؛ فایل بزرگ‌تر از ۵۱۲ کیلوبایت است.'
            )
          )
        }
      })
      .catch((error) => replaceBodyWithFallback(error.message))
  } else {
    replaceBodyWithFallback('برای این نوع سند پیش‌نمایش داخلی وجود ندارد. می‌توانی فایل را دانلود کنی یا در تب جدید باز کنی.')
  }

  requestAnimationFrame(() => closeButton.focus())
}

function openBrowse(initialPath, onSelect) {
  closeActiveOverlay()

  const pathInput = h('input', {
    class: 'path-input',
    type: 'text',
    dir: 'ltr',
    spellcheck: 'false',
    autocomplete: 'off',
    value: initialPath || state.config.defaultPath || state.config.home || '',
    'aria-label': 'مسیر پوشه',
    onKeyDown: (event) => {
      if (event.key === 'Enter') {
        event.preventDefault()
        load(pathInput.value)
      }
    }
  })

  const upButton = h(
    'button',
    {
      class: 'icon-button',
      type: 'button',
      title: 'پوشهٔ بالاتر',
      'aria-label': 'پوشهٔ بالاتر',
      onClick: () => {
        if (upButton.dataset.parent) load(upButton.dataset.parent)
      }
    },
    icon('arrowUp')
  )

  const goButton = h(
    'button',
    {
      class: 'button button-secondary button-small',
      type: 'button',
      onClick: () => load(pathInput.value)
    },
    'رفتن'
  )

  const shortcuts = h('div', { class: 'browse-shortcuts' })
  const list = h('div', { class: 'browse-list' })
  const selectButton = h(
    'button',
    {
      class: 'button button-primary',
      type: 'button',
      onClick: () => {
        const selected = pathInput.value
        close()
        onSelect(selected)
      }
    },
    icon('check', 'icon-sm'),
    'انتخاب این پوشه'
  )

  const closeButton = h(
    'button',
    { class: 'icon-button', type: 'button', title: 'بستن', 'aria-label': 'بستن', onClick: () => close() },
    icon('close')
  )

  const modal = h(
    'div',
    { class: 'modal browse-modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'انتخاب پوشه' },
    h(
      'div',
      { class: 'modal-header' },
      h('div', {}, h('h2', { class: 'modal-title' }, 'انتخاب پوشه'), h('p', { class: 'modal-subtitle' }, 'پوشه‌ای را که می‌خواهی بررسی شود انتخاب کن.')),
      closeButton
    ),
    h(
      'div',
      { class: 'modal-body' },
      h('div', { class: 'browse-pathbar' }, upButton, pathInput, goButton),
      shortcuts,
      list
    ),
    h(
      'div',
      { class: 'modal-footer' },
      h('span', { class: 'footer-note truncate', style: { flex: '1', direction: 'ltr', textAlign: 'right' } }, ''),
      h(
        'button',
        { class: 'button button-secondary', type: 'button', onClick: () => close() },
        'بستن'
      ),
      selectButton
    )
  )

  const overlay = h('div', { class: 'overlay' }, modal)
  const { close } = mountOverlay(overlay, { closeOnBackdrop: true })
  const footerPath = modal.querySelector('.footer-note')

  async function load(target) {
    list.replaceChildren(loadingState('در حال خواندن پوشه…'))
    try {
      const data = await request(`/api/browse?path=${encodeURIComponent(target || '')}`)
      pathInput.value = data.path
      footerPath.textContent = data.path
      upButton.dataset.parent = data.parent || ''
      upButton.disabled = !data.parent

      shortcuts.replaceChildren(
        ...(data.shortcuts || []).map((shortcut) =>
          h(
            'button',
            {
              class: 'shortcut-chip',
              type: 'button',
              title: shortcut.path,
              onClick: () => load(shortcut.path)
            },
            icon(shortcut.label === 'ریشه سیستم' ? 'home' : 'folder', 'icon-sm'),
            h('span', {}, shortcut.label)
          )
        )
      )

      if (!data.dirs.length) {
        list.replaceChildren(h('div', { class: 'browse-empty' }, 'این پوشه زیرپوشه ندارد.'))
      } else {
        list.replaceChildren(
          ...data.dirs.map((dir) =>
            h(
              'button',
              {
                class: `browse-row${dir.hidden ? ' hidden-dir' : ''}`,
                type: 'button',
                title: dir.path,
                onClick: () => load(dir.path)
              },
              icon('folder'),
              h('span', { class: 'browse-name', dir: 'auto' }, dir.name),
              h('span', { class: 'icon chevron', html: ICONS.chevronLeft, 'aria-hidden': 'true' })
            )
          )
        )
      }
    } catch (error) {
      list.replaceChildren(h('div', { class: 'browse-error' }, error.message))
    }
  }

  load(initialPath || '')
  requestAnimationFrame(() => closeButton.focus())
}

function buildScanOverlay(target) {
  const title = h('h2', { class: 'scan-title' }, 'در حال بررسی پوشه')
  const pathText = h('p', { class: 'scan-path' }, target)
  const scanned = h('strong', {}, '0')
  const files = h('strong', {}, '0')
  const dirs = h('strong', {}, '0')
  const errorBox = h('div', { class: 'scan-error hidden' })
  const progress = h('div', { class: 'scan-progress' }, h('span'))
  const actions = h('div', { class: 'scan-actions' })

  const card = h(
    'div',
    { class: 'scan-card' },
    h('div', { class: 'scan-orb', html: ICONS.logo, 'aria-hidden': 'true' }),
    title,
    pathText,
    progress,
    h(
      'div',
      { class: 'scan-stats' },
      h('div', { class: 'scan-stat' }, scanned, h('span', {}, 'مورد بررسی‌شده')),
      h('div', { class: 'scan-stat' }, files, h('span', {}, 'فایل رسانه‌ای')),
      h('div', { class: 'scan-stat' }, dirs, h('span', {}, 'پوشه'))
    ),
    errorBox,
    actions
  )

  const overlay = h('div', { class: 'overlay scan-overlay' }, card)
  return { overlay, title, pathText, scanned, files, dirs, errorBox, progress, actions, card }
}

async function startScan(rawPath, { reloadPath = null } = {}) {
  const target = String(rawPath || '').trim()
  if (!target) {
    showToast('مسیر پوشه را وارد کنید.', 'error')
    return
  }

  state.welcomePath = target
  closeActiveOverlay()
  const token = ++state.scanToken
  const ui = buildScanOverlay(target)
  const mount = mountOverlay(ui.overlay, {
    closeOnBackdrop: false,
    onClose: () => {
      if (state.scanToken === token) state.scanToken += 1
    }
  })

  const closeScan = () => mount.close()
  const showError = (message) => {
    ui.title.textContent = 'بررسی انجام نشد'
    ui.errorBox.textContent = message
    ui.errorBox.classList.remove('hidden')
    ui.progress.classList.add('hidden')
    ui.actions.replaceChildren(
      h(
        'button',
        {
          class: 'button button-secondary',
          type: 'button',
          onClick: () => startScan(target, { reloadPath })
        },
        icon('refresh', 'icon-sm'),
        'تلاش دوباره'
      ),
      h(
        'button',
        { class: 'button button-secondary', type: 'button', onClick: closeScan },
        'بستن'
      )
    )
  }

  ui.actions.append(
    h(
      'button',
      { class: 'button button-secondary', type: 'button', onClick: closeScan },
      'بستن'
    )
  )

  let job
  try {
    job = await postJSON('/api/scan', { path: target })
  } catch (error) {
    if (state.scanToken === token) showError(error.message)
    return
  }

  if (state.scanToken !== token) return

  while (state.scanToken === token) {
    let status
    try {
      status = await request(`/api/scan/${encodeURIComponent(job.jobId)}`)
    } catch (error) {
      if (state.scanToken === token) showError(error.message)
      return
    }

    if (state.scanToken !== token) return

    ui.scanned.textContent = formatCount(status.scanned || 0)
    ui.files.textContent = formatCount(status.files || 0)
    ui.dirs.textContent = formatCount(status.directories || 0)
    ui.pathText.textContent = status.path || target

    if (status.status === 'scanning') {
      await delay(420)
      continue
    }

    if (status.status === 'error') {
      showError(status.error || 'خطای نامشخص هنگام بررسی پوشه.')
      return
    }

    ui.title.textContent = 'بررسی کامل شد'
    await delay(180)
    if (state.scanToken !== token) return
    mount.close()
    await openRoot(status.rootId, reloadPath || '')
    return
  }
}

async function openRoot(rootId, targetPath = '') {
  try {
    let data
    try {
      data = await loadTree(rootId, targetPath)
    } catch (error) {
      if (!targetPath) throw error
      data = await loadTree(rootId, '')
    }

    state.root = data.root
    state.tree = data
    state.path = data.path
    state.view = 'explorer'
    state.search = ''
    state.searchScope = 'folder'
    state.dupOnly = false
    state.globalSearch = null
    state.globalSearchError = null
    state.duplicates = null
    state.duplicatesError = null
    state.dupFilter = 'all'
    state.dupSearch = ''
    state.welcomePath = data.root.path
    saveLastRoot(data.root)
    addRecent(data.root)
    renderApp()
  } catch (error) {
    showToast(error.message, 'error')
    state.view = 'welcome'
    renderApp()
  }
}

async function navigate(rel, highlightId = null) {
  if (!state.root) return
  const rootId = state.root.id
  const token = ++navigationToken

  try {
    const data = await loadTree(rootId, rel)
    if (token !== navigationToken || state.root?.id !== rootId) return
    closeActiveOverlay()
    state.tree = data
    state.path = data.path
    state.search = ''
    state.searchScope = 'folder'
    state.globalSearch = null
    state.globalSearchError = null
    state.dupSearch = ''
    state.dupFilter = 'all'
    state.highlightId = highlightId
    state.view = 'explorer'
    renderApp()
  } catch (error) {
    showToast(error.message, 'error')
  }
}

function loadTree(rootId, rel) {
  const query = rel ? `?path=${encodeURIComponent(rel)}` : ''
  return request(`/api/tree/${encodeURIComponent(rootId)}${query}`)
}

async function boot() {
  try {
    state.config = await request('/api/config')
  } catch {
    state.config = { home: '', defaultPath: '', allowedRoots: [] }
  }

  const last = readJSON(LAST_ROOT_KEY, null)
  state.welcomePath = last?.path || ''
  renderApp()

  if (last?.rootId) {
    try {
      const data = await loadTree(last.rootId, last.path || '')
      state.root = data.root
      state.tree = data
      state.path = data.path
      state.view = 'explorer'
      state.welcomePath = data.root.path
      saveLastRoot(data.root)
      addRecent(data.root)
      renderApp()
    } catch {
      // The server was restarted; show the welcome screen with the stored path.
    }
  }
}

boot()
