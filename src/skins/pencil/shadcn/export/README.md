# Pencil export output

Place `export_html` MCP output here:

- `desktop.html` — Desktop frame export
- `mobile.html` — Mobile frame export (optional)

Layer names map to resume data:

| Layer | React binding |
|-------|----------------|
| `Hero/Headline` | `useResumeData().name` |
| `Hero/Tagline` | `useResumeData().tagline` |
| `Section/About` | About section title |
| `Card/About` | summary list |

Run: `node scripts/pen-export-theme.mjs shadcn`

Current live page: [`../ShadcnPencilPage.tsx`](../ShadcnPencilPage.tsx) (CSS-aligned until export replaces it).
