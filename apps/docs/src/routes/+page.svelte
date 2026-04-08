<script lang="ts">
</script>

<h1 class="text-3xl font-bold mb-2">@emdzej/ui-kit</h1>
<p class="text-muted mb-8">Shared Svelte UI toolkit with theming, headless primitives, and reusable components.</p>

<div class="prose dark:prose-invert max-w-none">
	<h2>What's included</h2>

	<h3>Foundation</h3>
	<ul>
		<li><strong>Theme system</strong> — CSS custom properties with semantic tokens, light/dark mode, Tailwind v4 registration</li>
		<li><strong>createTheme()</strong> — Store with localStorage persistence and prefers-color-scheme fallback</li>
	</ul>

	<h3>Components</h3>
	<table>
		<thead>
			<tr><th>Component</th><th>Foundation</th><th>Description</th></tr>
		</thead>
		<tbody>
			<tr><td>SearchInput</td><td>Hand-rolled</td><td>Search input with Cmd+K shortcut</td></tr>
			<tr><td>Breadcrumb</td><td>Hand-rolled</td><td>Navigation breadcrumb trail</td></tr>
			<tr><td>Card</td><td>Hand-rolled</td><td>Clickable card with image, title, description</td></tr>
			<tr><td>Modal</td><td>Bits UI Dialog</td><td>Dialog with focus trapping, portal, a11y</td></tr>
			<tr><td>CascadingSelect</td><td>Bits UI Select</td><td>Styled select for cascading flows</td></tr>
			<tr><td>Dropdown</td><td>Bits UI DropdownMenu</td><td>Action menu with composable content</td></tr>
			<tr><td>TreeView</td><td>Hand-rolled</td><td>Recursive tree with snippet-based node rendering</td></tr>
			<tr><td>ImageViewer</td><td>Hand-rolled</td><td>Full-screen image lightbox</td></tr>
		</tbody>
	</table>

	<h3>Actions</h3>
	<ul>
		<li><strong>clickOutside</strong> — Detect clicks outside an element</li>
		<li><strong>imageMagnify</strong> — Magnifying-glass lens on image hover</li>
	</ul>

	<h2>Installation</h2>

	<pre><code>pnpm add @emdzej/ui-kit</code></pre>

	<p>In your app's CSS:</p>
	<pre><code>@import 'tailwindcss';
@import '@emdzej/ui-kit/theme/tokens.css';</code></pre>

	<p>Override brand colors:</p>
	<pre><code>:root &#123;
  --ui-color-primary: oklch(0.55 0.2 250);
&#125;</code></pre>
</div>
