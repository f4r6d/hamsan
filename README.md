# Hamsan (همسان)

A local-only web app that browses a folder on your computer and finds duplicate media files across all of its subfolders. The interface is Persian and right-to-left.

Nothing is uploaded anywhere. The server binds to `127.0.0.1` and only reads the folder you pick.

## What it does

- Browses a folder you choose directly from the UI (no upload, no folder picker limitations).
- Shows only images, videos, audio, and documents. Everything else is ignored.
- Lists files with name, dimensions/duration, size, type, duplicate status, and the location of duplicate copies.
- Treats two files as duplicates when they have the **same extension and exactly the same byte size**.
- Navigates into folders like a list-style file manager, with breadcrumbs, back navigation, and search.
- Searches the current folder or the entire scanned tree (Persian/Arabic letter normalization included).
- Previews images, video, audio, PDF, and plain-text files in place, with range requests for seeking and a download button.
- Shows image dimensions on demand and reads video/audio dimensions and duration in the browser.
- Offers a "duplicates only" filter, duplicate groups by category, and reclaimable-space totals.

## Requirements

- Node.js 20 or newer (tested with Node 24).
- No database, no Docker, no build step.

## Run locally

```bash
npm install
npm start
```

Open <http://127.0.0.1:4870>.

For development with automatic restart:

```bash
npm run dev
```

## Usage

1. Enter an absolute folder path or click **مرور** (Browse) to pick a folder.
2. Click **بررسی این پوشه** (Scan this folder) and wait for the scan to finish.
3. Browse folders and files, open the **فایل‌های تکراری** tab, or search across all folders.
4. Click a file to preview it, or the duplicate button to see every copy and jump to its folder.

## Configuration

| Variable | Default | Purpose |
| --- | --- | --- |
| `PORT` | `4870` | HTTP port |
| `HOST` | `127.0.0.1` | Bind address; keep it on loopback for local-only use |
| `ALLOWED_ROOTS` | *(empty)* | Comma-separated folder allowlist. Empty means any path the process can read |

Example:

```bash
PORT=5000 npm start
```

## Docker (optional)

The repository includes a Dockerfile and Compose file, but Docker is not required for local development. The container serves the same local-only app; the host folder is mounted read-only at `/data` and is the only path the container may browse.

```bash
MEDIA_PATH=/absolute/path/to/your/folder docker compose up --build
```

Then open <http://127.0.0.1:4870>. The Compose port is bound to `127.0.0.1`, so it is not exposed to your network.

## How duplicate detection works

Files are grouped by lowercase extension plus exact byte size. The extension is mapped to one of four categories: image, video, audio, or document. A group is reported only when it contains at least two files. This is intentionally a fast metadata check, not a content hash, so different files with the same extension and size would be reported together.

## Notes and limitations

- Scanned indexes live in memory. Restarting the server requires scanning again.
- The app never deletes files; it only reports duplicates.
- Only regular files are indexed. Symlinks and common system/junk folders (`node_modules`, `.git`, `.Trash`, `$RECYCLE.BIN`, etc.) are skipped.
- Video and audio metadata depend on what the browser can decode.

## Project layout

```text
server/index.js    Express server, APIs, file streaming
server/scanner.js  Recursive scan, duplicate grouping, image dimensions
server/media.js    Extension-to-category mapping
public/            Persian RTL single-page frontend (no build step)
```
