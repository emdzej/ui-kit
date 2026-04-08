# AGENTS.md - @emdzej/ui-kit

Guidelines for AI agents working on this codebase.

## Project Overview

Shared Svelte 5 UI toolkit extracted from three SvelteKit apps (wdsx, tisx, etkx) that share the same visual language. Provides semantic theming, reusable components, actions, and stores.

## Stack

- **Monorepo**: pnpm + Turborepo
- **Library**: Svelte 5 + `@sveltejs/package` (outputs to `dist/`)
- **Theme**: CSS custom properties + Tailwind v4 `@theme` block
- **Complex components**: Bits UI wrappers (Modal, CascadingSelect, Dropdown)
- **Simple components**: Hand-rolled (SearchInput, Breadcrumb, Card, ImageViewer, TreeView)
- **Build**: Vite 6 + `svelte-package`

---

## Package Structure

```
packages/ui/        @emdzej/ui-kit     The library
apps/docs/          (private)          Demo site with per-component routes
```

Library source layout:

```
packages/ui/src/lib/
├── theme/
│   ├── tokens.css      # CSS custom properties (light/dark) + @theme
│   └── index.ts        # createTheme() store
├── components/
│   ├── index.ts        # Barrel export
│   ├── SearchInput.svelte
│   ├── Breadcrumb.svelte
│   ├── Card.svelte
│   ├── ImageViewer.svelte
│   ├── Modal.svelte          # Bits UI Dialog wrapper
│   ├── CascadingSelect.svelte  # Bits UI Select wrapper
│   ├── Dropdown.svelte       # Bits UI DropdownMenu wrapper
│   ├── TreeView.svelte       # Recursive tree (self-import pattern)
│   ├── tree-types.ts         # TreeNode<D>, TreeNodeContext<D>
│   ├── AppHeader.svelte      # Sticky header with brand/nav/actions snippets
│   ├── ThemeToggle.svelte    # Sun/moon toggle (composable, takes theme prop)
│   └── SettingsButton.svelte # Gear icon with bindable open state
├── actions/
│   ├── index.ts
│   ├── clickOutside.ts
│   └── imageMagnify.ts
└── stores/
    └── index.ts        # Re-exports from theme
```

---

## Commands

```bash
pnpm install          # Install deps
pnpm build            # Build all packages (Turborepo)
pnpm dev              # Dev server (docs app)
pnpm check            # svelte-check type checking
pnpm package          # Build library dist only
```

Build must pass with zero errors and zero warnings after every change.

---

## Core Rules

### Language

- **All code, comments, and commit messages in English.**

### Git Workflow

**Commits (Conventional):**

```
<type>(<scope>): <description>

Types: feat, fix, docs, style, refactor, test, chore
Scopes: ui, docs, theme, actions, ci
```

---

## Architecture Rules

### Component Design

- **Simple presentational** components (Card, Breadcrumb, SearchInput) are hand-rolled. No Bits UI dependency for these.
- **Complex interactive** components (Modal, Dropdown, CascadingSelect) wrap Bits UI primitives. These get accessibility, keyboard nav, and focus management from Bits UI.
- **App Shell** components (AppHeader, ThemeToggle, SettingsButton) are composable building blocks. They don't create their own stores — consumers pass theme state and callbacks as props.
- **TreeView** is hand-rolled with a recursive self-import pattern (`import Self from './TreeView.svelte'`) because `<svelte:self>` is deprecated in Svelte 5.

### Svelte 5 Patterns

- Use `$props()` runes, not `export let`.
- Use `$state()`, `$derived()`, `$effect()` runes.
- Use Svelte 5 snippets (`{#snippet}` / `{@render}`) for render delegation, not slots.

### Theme System

Two layers:

1. **Mode** — Light/dark via `.dark` class on `<html>`, toggled by `createTheme()` store. Persisted to localStorage.
2. **Tokens** — Semantic CSS custom properties (`--ui-color-surface`, `--ui-color-primary`, etc.). Apps override these to brand themselves.

Colors use oklch values. The `@theme` block in `tokens.css` registers them as Tailwind utilities (`bg-surface`, `text-on-surface`, `border-border`).

### Environment Detection

Use `BROWSER` from `esm-env`, NOT `$app/environment`. The library must work outside SvelteKit.

### Tailwind v4

- Use `@plugin` for Tailwind plugins (not `@import`). This avoids pnpm strict hoisting issues.
- Theme tokens are registered via `@theme` block in `tokens.css`.

---

## Known Gotchas

| Issue | Fix |
|-------|-----|
| `$app/environment` in library code | Use `BROWSER` from `esm-env` |
| `svelte-ignore` comments in components | Don't rely on them — they don't survive `svelte-package`. Use proper ARIA attributes instead. |
| Types exported from `<script>` with `generics="T"` | Move types to a separate `.ts` file (e.g. `tree-types.ts`). `svelte-package` can't generate `.d.ts` otherwise. |
| `<svelte:self>` in Svelte 5 | Deprecated. Use `import Self from './Component.svelte'` self-import pattern. |
| `@import '@tailwindcss/typography'` with pnpm | Use `@plugin '@tailwindcss/typography'` instead. |
| Tailwind version mismatch in consuming apps | Library targets Tailwind v4. wdsx and etkx still use v3.4; tisx uses v4. |
| Bits UI Dialog.Root `bind:open` | Use simple `bind:open={stateVar}`. The function binding pattern `bind:open={get, set}` does NOT work — modals won't open. Handle `onclose` via a `$effect` tracking the open→closed transition. |
| Turbo cache staleness with docs app | The docs app resolves `@emdzej/ui-kit` via `workspace:*` but reads from `dist/`. After source changes, you MUST run `pnpm --filter @emdzej/ui-kit package` to rebuild dist. Otherwise the dev server serves stale output. |
| Tailwind v4 absolute positioning in inputs | `absolute inset-y-0` for positioning icons inside inputs doesn't work reliably in Tailwind v4. Use a **flexbox layout** instead: `flex items-center` wrapper with icon, input, and badge as siblings. |
| `relative` class on Bits UI Dialog.Content | Do NOT add `relative` to Dialog.Content's class — it conflicts with `fixed` in Tailwind v4 and pushes the dialog off-screen. Place close buttons as direct children of Dialog.Content with `absolute top-4 right-4`. |
| Icon library: `@lucide/svelte` | Use `@lucide/svelte` (Svelte 5 package), NOT `lucide-svelte` (Svelte 4 only). Tree-shakeable, consistent 24x24 grid. |

---

## Consuming Apps

| App | Repo | Svelte files | Tailwind |
|-----|------|-------------|----------|
| wdsx | `emdzej/wds` | 23 (in `packages/viewer/`) | v3.4 |
| tisx | `emdzej/tisx` | 10 (in `packages/web/`) | v4.1 |
| etkx | `emdzej/etkx` | 30 (in `frontend/`) | v3.4 |

---

## CI/CD

- **CI workflow** (`ci.yml`): Runs on push/PR to `main`. Installs deps, builds, and runs `svelte-check`.
- **Publish workflow** (`publish.yml`): Triggered manually or on version tags (`v*`). Publishes `@emdzej/ui-kit` to npmjs.com using OIDC trusted publishing (no NPM_TOKEN secret).

### npm Trusted Publishing

- Requires npm CLI >= 11.5.1 and Node >= 22.14.0
- The workflow must have `id-token: write` permission
- Provenance is automatic with trusted publishing — no `--provenance` flag
- The workflow filename configured on npmjs.com must match exactly: `publish.yml`
- Organization: `emdzej`, Repository: `ui-kit`, Workflow: `publish.yml`
