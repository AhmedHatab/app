# FlavorAtlas – Suggested Project Folder Structure

```text
flavor-atlas/
├─ prisma/
│  ├─ schema.prisma
│  └─ seed.ts
├─ public/
│  ├─ images/
│  │  ├─ recipes/
│  │  └─ countries/
│  └─ world-map.svg
├─ src/
│  ├─ app/
│  │  ├─ (marketing)/
│  │  │  ├─ page.tsx                  # Home page (hero + interactive world map)
│  │  │  └─ _components/
│  │  │     ├─ hero-map.tsx
│  │  │     └─ cuisine-pill-filters.tsx
│  │  ├─ recipes/
│  │  │  ├─ page.tsx                  # Recipe listing + search/filter UI
│  │  │  └─ [slug]/
│  │  │     ├─ page.tsx               # Route page for recipe details
│  │  │     ├─ loading.tsx
│  │  │     └─ RecipeDetailPage.tsx   # Client component (portion scaler + localize toggle)
│  │  ├─ api/
│  │  │  ├─ recipes/route.ts          # Server-side filtering endpoint
│  │  │  └─ countries/[code]/route.ts # Country-based recipe lookup for map
│  │  ├─ globals.css
│  │  └─ layout.tsx
│  ├─ components/
│  │  ├─ map/
│  │  │  └─ world-map-svg.tsx
│  │  ├─ recipe/
│  │  │  ├─ recipe-card.tsx
│  │  │  ├─ ingredient-list.tsx
│  │  │  ├─ portion-scaler.tsx
│  │  │  └─ origin-story-card.tsx
│  │  ├─ search/
│  │  │  ├─ cuisine-filter.tsx
│  │  │  ├─ dietary-filter.tsx
│  │  │  └─ fridge-ingredient-search.tsx
│  │  └─ ui/                          # shadcn/ui generated components
│  ├─ lib/
│  │  ├─ db.ts                        # Prisma client singleton
│  │  ├─ recipe-transforms.ts         # Portion scaling + substitute transform helpers
│  │  └─ constants.ts                 # Earthy color tokens and enums
│  ├─ types/
│  │  ├─ recipe.ts
│  │  └─ filters.ts
│  └─ hooks/
│     ├─ use-recipe-filters.ts
│     └─ use-country-recipes.ts
├─ tailwind.config.ts
├─ components.json                    # shadcn/ui config
├─ package.json
└─ tsconfig.json
```

## UI/UX Notes
- **Palette**: warm orange accents, muted terracotta backgrounds, deep green CTAs.
- **Typography**: clean sans + higher contrast headings.
- **Mobile-first**: sticky quick-actions (scale servings, localize toggle) on small screens.
- **Map Interaction**: country hover state + keyboard accessible focus state.
