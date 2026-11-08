# Hamsan (همسان)

**English** · **فارسی:** [README.fa.md](README.fa.md)

A local-only web app that browses a folder on your computer and finds duplicate media files across all of its subfolders. The interface is Persian and right-to-left.

Nothing is uploaded anywhere. The server binds to `127.0.0.1` and reads only the folder you pick. Write actions are limited to moving a duplicate to the system trash and renaming a file or folder, and only happen when you explicitly confirm them.

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
- Moves a duplicate copy to the system trash from the duplicates view, after a confirmation dialog.
- Renames a file or folder in place from any row, including every copy in the duplicates view: press the pencil button, type the new name, and confirm with Enter. For files the editor shows only the name without the extension, and the extension is always preserved.

## Safe by design

The app never modifies file contents and never deletes anything permanently.

- The only write actions are an explicit, confirmed move of a duplicate to the system trash, and an explicit inline rename of a file or folder. There is no permanent-delete endpoint.
- Before moving, the server re-checks that the file is still the exact file seen during the scan: it is a regular file, not a symlink, still inside the scanned folder, with the same size, inode, device, and modification time.
- The last remaining copy of a duplicate group is never moved, so the app cannot wipe out every copy in a group.
- Rename never overwrites: if the new name already exists, the request is rejected. The source is re-checked the same way as for trash, names with path separators or control characters are rejected, and both write endpoints only accept requests from this computer (loopback).
- Everything else uses read-only filesystem calls (`stat`, `readdir`, `realpath`, `open(..., 'r')`, and streamed responses).
- Duplicates are still only reported by default; cleanup only happens when you press the trash button and confirm.

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
5. In the duplicates view, use the trash button on a copy and confirm to move it to the system trash. At least one copy of each group must remain.
6. To rename a file or folder, press the pencil button on its row (also next to each copy in the duplicates view), edit the name in place, and press Enter (Esc cancels). For files only the name without the extension is editable; the extension is kept.

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

The repository includes a Dockerfile and Compose file, but Docker is not required for local development. The container serves the same local-only app; the host folder is mounted read-only at `/data` and is the only path the container may browse. Because the mount is read-only, trash and rename do not work in the container; use it for browsing only.

```bash
MEDIA_PATH=/absolute/path/to/your/folder docker compose up --build
```

Then open <http://127.0.0.1:4870>. The Compose port is bound to `127.0.0.1`, so it is not exposed to your network.

## How duplicate detection works

Files are grouped by lowercase extension plus exact byte size. The extension is mapped to one of four categories: image, video, audio, or document. A group is reported only when it contains at least two files. This is intentionally a fast metadata check, not a content hash, so different files with the same extension and size would be reported together.

## Notes and limitations

- Scanned indexes live in memory. Restarting the server requires scanning again.
- Moving to trash uses the desktop trash through `gio trash`; it needs a normal desktop session. The app itself never permanently deletes files.
- A moved file disappears from the scan immediately. The rest of the index is updated in place, including duplicate groups, folder counts, and reclaimable space.
- Renaming updates the index in place too. The editor never changes a file's extension, so categories and duplicate groups stay intact; renaming a folder updates the paths of everything inside it.
- Only regular files are indexed. Symlinks and common system/junk folders (`node_modules`, `.git`, `.Trash`, `$RECYCLE.BIN`, etc.) are skipped.
- Video and audio metadata depend on what the browser can decode.

## Project layout

```text
server/index.js    Express server, APIs, file streaming
server/scanner.js  Recursive scan, duplicate grouping, image dimensions
server/media.js    Extension-to-category mapping
public/            Persian RTL single-page frontend (no build step)
```
