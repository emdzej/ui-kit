# @emdzej/ui-kit

Shared Svelte 5 UI toolkit with semantic theming, headless primitives, and reusable components.

Built to eliminate UI duplication across multiple SvelteKit apps that share the same visual language — a common color palette (slate/sky/rose/amber/emerald), dark mode, and interaction patterns.

## Status

**Pre-release** — `0.1.x`. API may change.

## Stack

- **Svelte 5** with runes (`$props`, `$state`, `$derived`)
- **Tailwind CSS v4** with `@theme` block registration
- **Bits UI** for complex interactive primitives (dropdowns, modals, selects)
- **pnpm + Turborepo** monorepo

## Packages

| Path | Package | Description |
|------|---------|-------------|
| `packages/ui` | `@emdzej/ui-kit` | The library — components, theme, actions, stores |
| `apps/docs` | — | Demo site with per-component routes |

## Install

```bash
pnpm add @emdzej/ui-kit
```

Peer dependency: `svelte ^5.0.0`.

## Setup

### 1. Import the theme tokens

In your app's CSS entry point:

```css
@import "tailwindcss";
@import "@emdzej/ui-kit/theme/tokens.css";
```

This registers CSS custom properties (`--ui-color-*`) and exposes semantic Tailwind classes like `bg-surface`, `text-on-surface`, `border-border`.

### 2. Initialize the theme store

```svelte
<script>
  import { createTheme } from '@emdzej/ui-kit/theme';

  const theme = createTheme(); // reads localStorage, falls back to prefers-color-scheme
</script>

<button onclick={theme.toggle}>Toggle theme</button>
```

### 3. Use components

```svelte
<script>
  import { SearchInput, Card, Modal, Breadcrumb } from '@emdzej/ui-kit';
</script>

<SearchInput placeholder="Search..." onsubmit={(q) => search(q)} />
```

## Exports

| Entry point | What it provides |
|-------------|------------------|
| `@emdzej/ui-kit` | All components, types, theme, actions |
| `@emdzej/ui-kit/theme` | `createTheme()`, `Theme`, `ThemeOptions` |
| `@emdzej/ui-kit/theme/tokens.css` | CSS custom properties + Tailwind `@theme` |
| `@emdzej/ui-kit/actions` | `clickOutside`, `imageMagnify` |
| `@emdzej/ui-kit/stores` | Re-exports from theme |

## Components

| Component | Type | Foundation |
|-----------|------|------------|
| `SearchInput` | Hand-rolled | Cmd+K shortcut, debounced input |
| `Breadcrumb` | Hand-rolled | `<nav>` with configurable separator |
| `Card` | Hand-rolled | `<a>`, `<button>`, or `<div>` variants |
| `ImageViewer` | Hand-rolled | Lightbox with ARIA dialog, keyboard nav |
| `Modal` | Bits UI wrapper | Dialog with portal, close on escape/overlay |
| `CascadingSelect` | Bits UI wrapper | Linked select dropdowns |
| `Dropdown` | Bits UI wrapper | Dropdown menu with items, separators, icons |
| `TreeView` | Hand-rolled | Generic recursive tree, snippet-based rendering, ARIA tree pattern |

## Actions

| Action | Description |
|--------|-------------|
| `clickOutside` | Fires callback when clicking outside the element |
| `imageMagnify` | Magnifying lens overlay on images (Alt/Option key) |

## Theme System

Two-layer design:

- **Layer 1** — Light/dark mode via `.dark` class on `<html>`, toggled by `createTheme()` store with localStorage persistence.
- **Layer 2** — Semantic design tokens as CSS custom properties. Apps override `--ui-color-*` variables to brand themselves.

Colors use oklch values mapped to the Tailwind slate/sky/rose/amber/emerald palette.

## Development

```bash
pnpm install          # install deps
pnpm build            # build all packages (Turborepo)
pnpm dev              # dev server for docs app
pnpm check            # svelte-check type checking
```

## Project Structure

```
packages/ui/src/lib/
├── theme/          # CSS tokens + theme store
├── components/     # Svelte components
├── actions/        # Svelte actions
└── stores/         # Re-exports from theme
apps/docs/src/routes/
├── +layout.svelte  # Sidebar nav layout
├── +page.svelte    # Overview
├── theme/          # Token demo
├── search-input/   # Component demos...
├── breadcrumb/
├── card/
├── modal/
├── cascading-select/
├── dropdown/
├── tree-view/
├── image-viewer/
└── actions/
    ├── click-outside/
    └── image-magnify/
```

## Support

If you find this project useful, consider [buying me a coffee](https://buymeacoffee.com/emdzej) ☕ or [sponsoring on GitHub](https://github.com/sponsors/emdzej) or if it's your thing: via PayPal

[![Donate with PayPal](https://www.paypalobjects.com/en_US/PL/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/donate/?business=TDBR3A97PLQRQ&no_recurring=0&item_name=%28emdzej%29&currency_code=PLN)

## License

MIT
