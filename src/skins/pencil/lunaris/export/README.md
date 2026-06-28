# Pencil export output

Place `export_html` MCP output here (not committed; regenerate on re-export):

- `desktop.html` — Desktop frame export (`nodeId: HwWCW`)
- `mobile.html` — Mobile frame export (optional)

## Layer bindings

See [`../layer-map.ts`](../layer-map.ts) for the full mapping. Summary:

| Layer | React binding |
|-------|----------------|
| `Hero/Headline` | `useResumeData().name` |
| `Hero/Tagline` | `useResumeData().tagline` |
| `Shell/AccentBar` | decorative |
| `Hero/CTA` | anchor `#projects` |
| `Section/About` | static title (accent color) |
| `Card/About` | `summary[]` |
| `Section/Projects` | static title |
| `Card/Project` | `projects[]` |
| `Section/Contact` | static title |
| `Card/Contact/Email` | `email` |
| `Card/Contact/Phone` | `phone` |

## Re-export workflow

1. Open `design/UI-Pencil-Lunaris.pen` ONLY in Pencil
2. Edit layout in Pencil → Ctrl+S
3. `batch_get` → confirm Desktop id (`HwWCW`)
4. `export_html` with **absolute** `outputPath`:

   `c:/Users/47090/Desktop/personal/resume/src/skins/pencil/lunaris/export/desktop.html`

5. Update **LAYOUT** classes in `components/Lunaris*.tsx`; keep **BINDINGS** per `layer-map.ts`

Run helper: `node scripts/pen-export-theme.mjs lunaris`

Last export: **2026-06-28** · Live page: [`../LunarisPencilPage.tsx`](../LunarisPencilPage.tsx)
