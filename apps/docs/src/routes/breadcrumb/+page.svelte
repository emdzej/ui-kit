<script lang="ts">
	import { Breadcrumb } from '@emdzej/ui-kit';
</script>

<h1 class="text-2xl font-bold mb-2">Breadcrumb</h1>
<p class="text-muted mb-8">Navigation breadcrumb trail. Last item is rendered as plain text (current page).</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Default</h2>
	<Breadcrumb
		crumbs={[
			{ label: 'Home', href: '/' },
			{ label: 'Catalog', href: '/catalog' },
			{ label: 'Engine', href: '/catalog/engine' },
			{ label: 'Oil Filter' }
		]}
	/>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Two levels</h2>
	<Breadcrumb
		crumbs={[
			{ label: 'Home', href: '/' },
			{ label: 'Settings' }
		]}
	/>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Custom separator</h2>
	<Breadcrumb
		crumbs={[
			{ label: 'Home', href: '/' },
			{ label: 'Products', href: '/products' },
			{ label: 'Widget' }
		]}
		separator=">"
	/>
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
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">crumbs</td><td class="p-2 text-muted">BreadcrumbItem[]</td><td class="p-2 text-muted">—</td><td class="p-2">Array of &#123; label, href? &#125;</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">separator</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">'/'</td><td class="p-2">Separator character</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes</td></tr>
			</tbody>
		</table>
	</div>
</section>
