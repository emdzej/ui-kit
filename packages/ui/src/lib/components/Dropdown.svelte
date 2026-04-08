<!--
  @component Dropdown

  A styled dropdown menu built on Bits UI DropdownMenu. Re-exports the
  composable Bits UI parts with the toolkit's design tokens applied.
  Use this for action menus, settings dropdowns, and context menus.

  The component provides both a quick-use `items` prop for simple menus
  and a `children` snippet for fully custom content (groups, separators,
  checkbox items, sub-menus).

  @example Simple items list:
  ```svelte
  <Dropdown
    items={[
      { label: 'Edit', onclick: handleEdit },
      { label: 'Delete', onclick: handleDelete, variant: 'danger' },
    ]}
  >
    {#snippet trigger()}
      <button>Actions</button>
    {/snippet}
  </Dropdown>
  ```

  @example Custom content with groups:
  ```svelte
  <Dropdown>
    {#snippet trigger()}
      <button>Menu</button>
    {/snippet}
    <Dropdown.Group heading="File">
      <Dropdown.Item onclick={handleNew}>New</Dropdown.Item>
      <Dropdown.Item onclick={handleOpen}>Open</Dropdown.Item>
    </Dropdown.Group>
    <Dropdown.Separator />
    <Dropdown.Item onclick={handleQuit} variant="danger">Quit</Dropdown.Item>
  </Dropdown>
  ```
-->
<script lang="ts" module>
	export interface DropdownItem {
		/** Display label */
		label: string;
		/** Click handler */
		onclick?: () => void;
		/** Visual variant */
		variant?: 'default' | 'danger';
		/** Whether this item is disabled */
		disabled?: boolean;
	}

	// Re-export Bits UI parts for advanced composition
	export { DropdownMenu as DropdownParts } from 'bits-ui';
</script>

<script lang="ts">
	import type { Snippet } from 'svelte';
	import { DropdownMenu } from 'bits-ui';

	interface Props {
		/** Quick-use items list for simple menus */
		items?: DropdownItem[];
		/** Whether the dropdown is open (bindable) */
		open?: boolean;
		/** Trigger button content (required) */
		trigger: Snippet;
		/** Custom menu content (overrides items) */
		children?: Snippet;
		/** Alignment relative to trigger */
		align?: 'start' | 'center' | 'end';
		/** Side offset in pixels */
		sideOffset?: number;
		/** Additional CSS classes for the content panel */
		class?: string;
	}

	let {
		items,
		open = $bindable(false),
		trigger,
		children,
		align = 'end',
		sideOffset = 4,
		class: className = ''
	}: Props = $props();

	const itemBaseClass =
		'relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors data-[highlighted]:bg-surface-hover data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger>
		{@render trigger()}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{align}
			{sideOffset}
			class="z-50 min-w-[12rem] overflow-hidden rounded-lg border border-border bg-surface-alt p-1 shadow-ui-lg {className}"
		>
			{#if children}
				{@render children()}
			{:else if items}
				{#each items as item (item.label)}
					<DropdownMenu.Item
						disabled={item.disabled}
						class="{itemBaseClass} {item.variant === 'danger' ? 'text-error data-[highlighted]:text-error' : 'text-on-surface'}"
						onclick={item.onclick}
					>
						{item.label}
					</DropdownMenu.Item>
				{/each}
			{/if}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
