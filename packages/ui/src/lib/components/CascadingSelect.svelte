<!--
  @component CascadingSelect

  A styled select input built on Bits UI Select for accessibility
  (keyboard navigation, typeahead, ARIA). Designed as a building block
  for cascading/multi-level selection flows — the cascade orchestration
  logic lives in the parent component.

  @example Basic usage:
  ```svelte
  <CascadingSelect
    label="Series"
    options={seriesOptions}
    bind:value={selectedSeries}
    placeholder="Choose series..."
    onchange={(v) => loadModels(v)}
  />
  ```

  @example Cascading pair:
  ```svelte
  <CascadingSelect label="Make" options={makes} bind:value={make}
    onchange={(v) => { model = ''; loadModels(v); }} />
  <CascadingSelect label="Model" options={models} bind:value={model}
    disabled={!make} loading={loadingModels}
    placeholder={make ? 'Choose model...' : 'Select make first'} />
  ```
-->
<script lang="ts" module>
	export interface SelectOption {
		/** Unique option value */
		value: string;
		/** Display label */
		label: string;
		/** Whether this option is disabled */
		disabled?: boolean;
	}
</script>

<script lang="ts">
	import { Select } from 'bits-ui';
	import { ChevronDown, ChevronUp, Check } from '@lucide/svelte';

	interface Props {
		/** Label text above the select */
		label: string;
		/** Available options */
		options?: SelectOption[];
		/** Currently selected value (bindable) */
		value?: string;
		/** Whether the select is disabled */
		disabled?: boolean;
		/** Whether options are currently loading */
		loading?: boolean;
		/** Placeholder text when no value is selected */
		placeholder?: string;
		/** Called when the selected value changes */
		onchange?: (value: string) => void;
		/** Additional CSS classes for the wrapper */
		class?: string;
	}

	let {
		label,
		options = [],
		value = $bindable(''),
		disabled = false,
		loading = false,
		placeholder = 'Select...',
		onchange,
		class: className = ''
	}: Props = $props();

	const selectedLabel = $derived(
		options.find((opt) => opt.value === value)?.label
	);

	const displayText = $derived(
		selectedLabel ?? (loading ? 'Loading...' : placeholder)
	);

	const id = $derived(`select-${label.toLowerCase().replace(/\s+/g, '-')}`);

	function handleValueChange(newValue: string) {
		value = newValue;
		onchange?.(newValue);
	}
</script>

<div class="flex flex-col gap-1.5 {className}">
	<label for={id} class="text-sm font-medium text-on-surface">
		{label}
	</label>

	<Select.Root
		type="single"
		value={value || undefined}
		onValueChange={handleValueChange}
		disabled={disabled || loading}
	>
		<Select.Trigger
			{id}
			class="flex w-full items-center justify-between rounded-lg border border-border bg-surface-alt px-3 py-2 text-sm text-on-surface shadow-ui-sm transition-colors
				hover:bg-surface-hover
				focus:outline-none focus:ring-2 focus:ring-ring
				disabled:cursor-not-allowed disabled:opacity-50
				{!selectedLabel ? 'text-muted' : ''}"
		>
			<span class="truncate">{displayText}</span>
			<ChevronDown class="ml-2 size-4 shrink-0 text-muted" aria-hidden="true" />
		</Select.Trigger>

		<Select.Portal>
			<Select.Content
				class="z-50 max-h-60 overflow-hidden rounded-lg border border-border bg-surface-alt shadow-ui-lg"
				sideOffset={4}
			>
				<Select.ScrollUpButton
					class="flex h-6 items-center justify-center bg-surface-alt text-muted"
				>
					<ChevronUp class="size-4" aria-hidden="true" />
				</Select.ScrollUpButton>

				<Select.Viewport class="p-1">
					{#each options as opt (opt.value)}
						<Select.Item
							value={opt.value}
							label={opt.label}
							disabled={opt.disabled}
							class="relative flex w-full cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm text-on-surface outline-none
								data-[highlighted]:bg-surface-hover data-[highlighted]:text-on-surface
								data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
						>
							{#snippet children({ selected })}
								<span class="flex-1 truncate">{opt.label}</span>
								{#if selected}
									<Check class="ml-2 size-4 shrink-0 text-primary" aria-hidden="true" />
								{/if}
							{/snippet}
						</Select.Item>
					{/each}
				</Select.Viewport>

				<Select.ScrollDownButton
					class="flex h-6 items-center justify-center bg-surface-alt text-muted"
				>
					<ChevronDown class="size-4" aria-hidden="true" />
				</Select.ScrollDownButton>
			</Select.Content>
		</Select.Portal>
	</Select.Root>
</div>
