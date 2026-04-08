<script lang="ts">
	import { CascadingSelect } from '@emdzej/ui-kit';
	import type { SelectOption } from '@emdzej/ui-kit';

	// Demo cascade: Make -> Model -> Engine
	let selectedMake = $state('');
	let selectedModel = $state('');
	let selectedEngine = $state('');

	const makes: SelectOption[] = [
		{ value: 'bmw', label: 'BMW' },
		{ value: 'mercedes', label: 'Mercedes-Benz' },
		{ value: 'audi', label: 'Audi' },
		{ value: 'porsche', label: 'Porsche' }
	];

	const modelMap: Record<string, SelectOption[]> = {
		bmw: [
			{ value: '3', label: '3 Series' },
			{ value: '5', label: '5 Series' },
			{ value: 'x3', label: 'X3' },
			{ value: 'x5', label: 'X5' }
		],
		mercedes: [
			{ value: 'c', label: 'C-Class' },
			{ value: 'e', label: 'E-Class' },
			{ value: 'gle', label: 'GLE' }
		],
		audi: [
			{ value: 'a4', label: 'A4' },
			{ value: 'a6', label: 'A6' },
			{ value: 'q5', label: 'Q5' }
		],
		porsche: [
			{ value: '911', label: '911' },
			{ value: 'cayenne', label: 'Cayenne' },
			{ value: 'macan', label: 'Macan' }
		]
	};

	const engineMap: Record<string, SelectOption[]> = {
		'3': [{ value: 'b48', label: 'B48 2.0T' }, { value: 'b58', label: 'B58 3.0T' }],
		'5': [{ value: 'b48-5', label: 'B48 2.0T' }, { value: 'b58-5', label: 'B58 3.0T' }, { value: 's58', label: 'S58 3.0T (M5)' }],
		x3: [{ value: 'b48-x3', label: 'B48 2.0T' }],
		x5: [{ value: 'b58-x5', label: 'B58 3.0T' }, { value: 'n63', label: 'N63 4.4T V8' }],
		c: [{ value: 'm254', label: 'M254 2.0T' }, { value: 'm256', label: 'M256 3.0T' }],
		e: [{ value: 'm256-e', label: 'M256 3.0T' }],
		gle: [{ value: 'om656', label: 'OM656 3.0D' }],
		a4: [{ value: 'ea888', label: 'EA888 2.0T' }],
		a6: [{ value: 'ea888-6', label: 'EA888 2.0T' }, { value: 'ea839', label: 'EA839 3.0T' }],
		q5: [{ value: 'ea888-q5', label: 'EA888 2.0T' }],
		'911': [{ value: 'h6-30', label: '3.0 H6 Twin-Turbo' }, { value: 'h6-38', label: '3.8 H6 Twin-Turbo (Turbo S)' }],
		cayenne: [{ value: 'v6-30', label: '3.0 V6 Turbo' }, { value: 'v8-40', label: '4.0 V8 Twin-Turbo' }],
		macan: [{ value: 'i4-20', label: '2.0 I4 Turbo' }]
	};

	const models = $derived(selectedMake ? (modelMap[selectedMake] ?? []) : []);
	const engines = $derived(selectedModel ? (engineMap[selectedModel] ?? []) : []);

	// Standalone demo
	let standalone = $state('');
	const standaloneOptions: SelectOption[] = [
		{ value: 'a', label: 'Option A' },
		{ value: 'b', label: 'Option B' },
		{ value: 'c', label: 'Option C (disabled)', disabled: true },
		{ value: 'd', label: 'Option D' }
	];
</script>

<h1 class="text-2xl font-bold mb-2">CascadingSelect</h1>
<p class="text-muted mb-8">Styled select built on Bits UI Select. Keyboard navigation, typeahead, and ARIA. Designed as a building block for cascading/multi-level selection flows.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Standalone</h2>
	<div class="max-w-xs">
		<CascadingSelect
			label="Choose one"
			options={standaloneOptions}
			bind:value={standalone}
			placeholder="Pick an option..."
		/>
	</div>
	{#if standalone}
		<p class="mt-2 text-sm text-muted">Selected: {standalone}</p>
	{/if}
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">3-level cascade</h2>
	<p class="text-sm text-muted mb-4">Each level depends on the previous. Downstream selects are disabled until a parent value is chosen.</p>
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl">
		<CascadingSelect
			label="Make"
			options={makes}
			bind:value={selectedMake}
			placeholder="Choose make..."
			onchange={() => { selectedModel = ''; selectedEngine = ''; }}
		/>
		<CascadingSelect
			label="Model"
			options={models}
			bind:value={selectedModel}
			disabled={!selectedMake}
			placeholder={selectedMake ? 'Choose model...' : 'Select make first'}
			onchange={() => { selectedEngine = ''; }}
		/>
		<CascadingSelect
			label="Engine"
			options={engines}
			bind:value={selectedEngine}
			disabled={!selectedModel}
			placeholder={selectedModel ? 'Choose engine...' : 'Select model first'}
		/>
	</div>
	{#if selectedMake && selectedModel && selectedEngine}
		<div class="mt-4 rounded-lg border border-border bg-surface-alt p-4">
			<p class="text-sm font-medium text-on-surface">
				{makes.find(m => m.value === selectedMake)?.label}
				{models.find(m => m.value === selectedModel)?.label}
				&mdash; {engines.find(e => e.value === selectedEngine)?.label}
			</p>
		</div>
	{/if}
</section>

<section>
	<h2 class="text-lg font-semibold mb-4">Props</h2>
	<div class="overflow-x-auto">
		<table class="w-full text-sm border border-border rounded-lg overflow-hidden">
			<thead class="bg-surface-raised">
				<tr>
					<th class="text-left p-2 font-medium">Prop</th>
					<th class="text-left p-2 font-medium">Type</th>
					<th class="text-left p-2 font-medium">Default</th>
					<th class="text-left p-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">label</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">—</td><td class="p-2">Label text (required)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">options</td><td class="p-2 text-muted">SelectOption[]</td><td class="p-2 text-muted">[]</td><td class="p-2">&#123; value, label, disabled? &#125;</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">value</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Selected value (bindable)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">disabled</td><td class="p-2 text-muted">boolean</td><td class="p-2 text-muted">false</td><td class="p-2">Disable the select</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">loading</td><td class="p-2 text-muted">boolean</td><td class="p-2 text-muted">false</td><td class="p-2">Show loading placeholder</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">placeholder</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">'Select...'</td><td class="p-2">Placeholder text</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onchange</td><td class="p-2 text-muted">(value: string) => void</td><td class="p-2 text-muted">—</td><td class="p-2">Called on selection change</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes</td></tr>
			</tbody>
		</table>
	</div>
</section>
