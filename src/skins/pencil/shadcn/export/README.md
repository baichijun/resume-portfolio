# Pencil export output

Place `export_html` MCP output here (not committed; regenerate on re-export):

- `desktop.html` — Desktop frame export (`nodeId: yc9zJ`)
- `mobile.html` — Mobile frame export (optional)

## Layer bindings

See [`../layer-map.ts`](../layer-map.ts) for content path mapping. Summary:

| Layer | Site content binding |
|-------|---------------------|
| `Hero/Headline` | `blocks.hero.headline` |
| `Hero/Tagline` | `blocks.hero.tagline` |
| `Hero/CTA` | `blocks.hero.ctas[0]` |
| `Section/About` | `blocks.about.title` |
| `Card/About` | `blocks.about.summaryBullets[]` |
| `Section/Projects` | `blocks.projects.title` |
| `Card/Project` | `blocks.projects.items[]` |
| `Section/Contact` | `blocks.contact.title` |
| `Card/Contact/Email` | `blocks.contact.email` |
| `Card/Contact/Phone` | `blocks.contact.phone` |

## Re-export workflow

1. Open `design/UI-Pencil-Shadcn.pen` ONLY in Pencil
2. Edit layout in Pencil → Ctrl+S
3. `batch_get` → confirm Desktop id (`yc9zJ`)
4. `export_html` with **absolute** `outputPath`:

   `c:/Users/47090/Desktop/personal/resume/src/skins/pencil/shadcn/export/desktop.html`

5. Update **LAYOUT** classes in `components/Shadcn*.tsx`; keep **BINDINGS** per `layer-map.ts`

## Content hydrate

```bash
npm run pen:hydrate:shadcn
```

Run helper: `node scripts/pen-export-theme.mjs shadcn`

Last export: **2026-06-28** · Live page: [`../ShadcnPencilPage.tsx`](../ShadcnPencilPage.tsx)
