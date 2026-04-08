<!--
  @component Card

  A generic clickable card with optional image, title, and description.
  Supports either a link (href) or click handler.

  @example
  ```svelte
  <Card
    title="Engine"
    description="Main engine components"
    href="/catalog/engine"
    image="/thumbnails/engine.jpg"
  />
  ```
-->
<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Card title */
		title: string;
		/** Optional subtitle or description */
		description?: string;
		/** Image URL for the card thumbnail */
		image?: string | null;
		/** Alt text for the image */
		imageAlt?: string;
		/** Navigation URL (renders as <a>) */
		href?: string;
		/** Click handler (renders as <button> if no href) */
		onclick?: (e: MouseEvent) => void;
		/** Additional CSS classes for the outer element */
		class?: string;
		/** Optional slot content rendered below title/description */
		children?: Snippet;
	}

	let {
		title,
		description,
		image,
		imageAlt = '',
		href,
		onclick,
		class: className = '',
		children
	}: Props = $props();

	const interactive = $derived(!!href || !!onclick);
</script>

{#snippet cardContent()}
	{#if image}
		<div class="aspect-video w-full overflow-hidden rounded-t-lg bg-surface-raised">
			<img
				src={image}
				alt={imageAlt || title}
				class="h-full w-full object-cover"
				loading="lazy"
			/>
		</div>
	{/if}
	<div class="p-4">
		<h3 class="font-semibold text-on-surface">{title}</h3>
		{#if description}
			<p class="mt-1 text-sm text-muted">{description}</p>
		{/if}
		{#if children}
			<div class="mt-2">
				{@render children()}
			</div>
		{/if}
	</div>
{/snippet}

{#if href}
	<a
		{href}
		class="block rounded-lg border border-border bg-surface-alt shadow-ui-sm overflow-hidden transition-all {interactive ? 'hover:-translate-y-0.5 hover:shadow-ui-md' : ''} {className}"
	>
		{@render cardContent()}
	</a>
{:else if onclick}
	<button
		type="button"
		{onclick}
		class="block w-full text-left rounded-lg border border-border bg-surface-alt shadow-ui-sm overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-ui-md {className}"
	>
		{@render cardContent()}
	</button>
{:else}
	<div
		class="rounded-lg border border-border bg-surface-alt shadow-ui-sm overflow-hidden {className}"
	>
		{@render cardContent()}
	</div>
{/if}
