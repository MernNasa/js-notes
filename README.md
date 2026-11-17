# JS Notes

React + Vite + Tailwind notes site generated from `content/notes.md`.

    npm install
    npm run dev

- Edit `content/notes.md` and update the `CHAPTERS` list in `scripts/md-to-json.js` to change how it is split into topics. `npm run dev` / `npm run build` regenerate `src/data/notes.json` automatically.
- "+ Add topic" saves new topics in your browser (localStorage). Use "Export notes.json" to download the merged file.
