<script lang="ts">
</script>

<h1 class="text-2xl font-bold mb-2">Theme & Tokens</h1>
<p class="text-muted mb-8">Semantic design tokens via CSS custom properties. Light/dark mode with Tailwind v4 utility classes.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Surfaces</h2>
	<div class="grid grid-cols-3 gap-4">
		<div class="rounded-lg p-4 bg-surface border border-border">
			<div class="text-xs text-muted font-mono">surface</div>
		</div>
		<div class="rounded-lg p-4 bg-surface-alt border border-border">
			<div class="text-xs text-muted font-mono">surface-alt</div>
		</div>
		<div class="rounded-lg p-4 bg-surface-raised border border-border">
			<div class="text-xs text-muted font-mono">surface-raised</div>
		</div>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Text</h2>
	<div class="grid grid-cols-2 gap-4">
		<div class="rounded-lg p-4 border border-border">
			<span class="text-on-surface font-mono text-sm">on-surface</span>
		</div>
		<div class="rounded-lg p-4 border border-border">
			<span class="text-muted font-mono text-sm">muted</span>
		</div>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Accent & Semantic</h2>
	<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
		<div class="rounded-lg p-4 bg-primary text-on-primary">
			<div class="text-xs font-mono">primary</div>
		</div>
		<div class="rounded-lg p-4 bg-error text-white">
			<div class="text-xs font-mono">error</div>
		</div>
		<div class="rounded-lg p-4 bg-warning text-black">
			<div class="text-xs font-mono">warning</div>
		</div>
		<div class="rounded-lg p-4 bg-success text-white">
			<div class="text-xs font-mono">success</div>
		</div>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Borders & Focus Ring</h2>
	<div class="grid grid-cols-2 gap-4">
		<div class="rounded-lg p-4 border-2 border-border">
			<div class="text-xs text-muted font-mono">border</div>
		</div>
		<div class="rounded-lg p-4 ring-2 ring-ring">
			<div class="text-xs text-muted font-mono">ring</div>
		</div>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Shadows</h2>
	<div class="grid grid-cols-3 gap-4">
		<div class="rounded-lg p-4 bg-surface-alt shadow-ui-sm">
			<div class="text-xs text-muted font-mono">shadow-ui-sm</div>
		</div>
		<div class="rounded-lg p-4 bg-surface-alt shadow-ui-md">
			<div class="text-xs text-muted font-mono">shadow-ui-md</div>
		</div>
		<div class="rounded-lg p-4 bg-surface-alt shadow-ui-lg">
			<div class="text-xs text-muted font-mono">shadow-ui-lg</div>
		</div>
	</div>
</section>

<section>
	<h2 class="text-lg font-semibold mb-4">Overriding tokens</h2>
	<div class="prose dark:prose-invert max-w-none">
		<p>Import the tokens CSS, then override any <code>--ui-color-*</code> variable:</p>
		<pre><code>@import '@emdzej/ui-kit/theme/tokens.css';

:root &#123;
  --ui-color-primary: oklch(0.65 0.25 300); /* purple accent */
  --ui-color-primary-hover: oklch(0.55 0.25 300);
&#125;</code></pre>
	</div>
</section>
