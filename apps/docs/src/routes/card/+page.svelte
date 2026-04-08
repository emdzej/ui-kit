<script lang="ts">
	import { Card } from '@emdzej/ui-kit';
</script>

<h1 class="text-2xl font-bold mb-2">Card</h1>
<p class="text-muted mb-8">Generic clickable card with optional image, title, and description. Renders as &lt;a&gt;, &lt;button&gt;, or &lt;div&gt; depending on props.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Link card</h2>
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		<Card title="Engine" description="Main engine components and assemblies" href="#engine" />
		<Card title="Transmission" description="Gearbox and drivetrain parts" href="#transmission" />
		<Card title="Suspension" description="Shock absorbers and springs" href="#suspension" />
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">With image</h2>
	<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
		<Card
			title="Diagram A"
			description="Front axle assembly"
			image="https://picsum.photos/seed/card1/400/225"
			href="#a"
		/>
		<Card
			title="Diagram B"
			description="Rear differential"
			image="https://picsum.photos/seed/card2/400/225"
			href="#b"
		/>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Button card</h2>
	<div class="max-w-xs">
		<Card
			title="Clickable"
			description="Using onclick handler"
			onclick={() => alert('Clicked!')}
		/>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Static card with children</h2>
	<div class="max-w-xs">
		<Card title="Part #12345">
			<span class="inline-block rounded-full bg-success/10 text-success text-xs px-2 py-0.5">In stock</span>
		</Card>
	</div>
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
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">title</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">—</td><td class="p-2">Card title (required)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">description</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">—</td><td class="p-2">Subtitle text</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">image</td><td class="p-2 text-muted">string | null</td><td class="p-2 text-muted">—</td><td class="p-2">Thumbnail URL</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">imageAlt</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Alt text for image</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">href</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">—</td><td class="p-2">Renders as &lt;a&gt;</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onclick</td><td class="p-2 text-muted">(e: MouseEvent) => void</td><td class="p-2 text-muted">—</td><td class="p-2">Renders as &lt;button&gt;</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">children</td><td class="p-2 text-muted">Snippet</td><td class="p-2 text-muted">—</td><td class="p-2">Content below title</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes</td></tr>
			</tbody>
		</table>
	</div>
</section>
