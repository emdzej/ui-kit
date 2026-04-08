<!--
  @component Breadcrumb

  Renders a breadcrumb trail from an array of crumbs.

  @example
  ```svelte
  <Breadcrumb crumbs={[
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Engine' }
  ]} />
  ```
-->
<script lang="ts">
	export interface BreadcrumbItem {
		/** Display text */
		label: string;
		/** URL to link to. If omitted, rendered as plain text (current page). */
		href?: string;
	}

	interface Props {
		/** Ordered breadcrumb items, last item is the current page */
		crumbs: BreadcrumbItem[];
		/** Additional CSS classes */
		class?: string;
	}

	let { crumbs, class: className = '' }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="text-sm {className}">
	<ol class="flex items-center gap-1.5 text-muted">
		{#each crumbs as crumb, i (i)}
			{#if i > 0}
				<li aria-hidden="true" class="select-none">/</li>
			{/if}
			<li>
				{#if crumb.href && i < crumbs.length - 1}
					<a
						href={crumb.href}
						class="hover:text-primary transition-colors"
					>
						{crumb.label}
					</a>
				{:else}
					<span class="font-medium text-on-surface">{crumb.label}</span>
				{/if}
			</li>
		{/each}
	</ol>
</nav>
