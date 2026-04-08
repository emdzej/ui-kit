<script lang="ts">
	import { TreeView } from '@emdzej/ui-kit';
	import type { TreeNode } from '@emdzej/ui-kit';

	// -- File system example --
	type FileData = { kind: 'folder' | 'file' | 'image'; size?: string };

	const fileTree: TreeNode<FileData>[] = [
		{
			id: 'src',
			name: 'src',
			data: { kind: 'folder' },
			children: [
				{
					id: 'src/lib',
					name: 'lib',
					data: { kind: 'folder' },
					children: [
						{ id: 'src/lib/index.ts', name: 'index.ts', data: { kind: 'file', size: '2.1 kB' } },
						{ id: 'src/lib/utils.ts', name: 'utils.ts', data: { kind: 'file', size: '850 B' } }
					]
				},
				{
					id: 'src/routes',
					name: 'routes',
					data: { kind: 'folder' },
					children: [
						{ id: 'src/routes/+page.svelte', name: '+page.svelte', data: { kind: 'file', size: '1.4 kB' } },
						{ id: 'src/routes/+layout.svelte', name: '+layout.svelte', data: { kind: 'file', size: '3.2 kB' } }
					]
				},
				{ id: 'src/app.html', name: 'app.html', data: { kind: 'file', size: '400 B' } }
			]
		},
		{
			id: 'static',
			name: 'static',
			data: { kind: 'folder' },
			children: [
				{ id: 'static/favicon.png', name: 'favicon.png', data: { kind: 'image', size: '4.2 kB' } },
				{ id: 'static/logo.svg', name: 'logo.svg', data: { kind: 'image', size: '1.8 kB' } }
			]
		},
		{ id: 'package.json', name: 'package.json', data: { kind: 'file', size: '1.1 kB' } },
		{ id: 'README.md', name: 'README.md', data: { kind: 'file', size: '3.5 kB' } }
	];

	let fileExpanded = $state(new Set<string>(['src']));

	function toggleFile(id: string) {
		const next = new Set(fileExpanded);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		fileExpanded = next;
	}

	// -- Selectable tree example --
	type CategoryData = { count: number };

	const categoryTree: TreeNode<CategoryData>[] = [
		{
			id: 'electronics',
			name: 'Electronics',
			data: { count: 142 },
			children: [
				{
					id: 'phones',
					name: 'Phones',
					data: { count: 56 },
					children: [
						{ id: 'smartphones', name: 'Smartphones', data: { count: 43 } },
						{ id: 'feature-phones', name: 'Feature Phones', data: { count: 13 } }
					]
				},
				{
					id: 'computers',
					name: 'Computers',
					data: { count: 86 },
					children: [
						{ id: 'laptops', name: 'Laptops', data: { count: 52 } },
						{ id: 'desktops', name: 'Desktops', data: { count: 34 } }
					]
				}
			]
		},
		{
			id: 'clothing',
			name: 'Clothing',
			data: { count: 230 },
			children: [
				{ id: 'shirts', name: 'Shirts', data: { count: 98 } },
				{ id: 'pants', name: 'Pants', data: { count: 72 } },
				{ id: 'shoes', name: 'Shoes', data: { count: 60 } }
			]
		},
		{ id: 'books', name: 'Books', data: { count: 315 } }
	];

	let catExpanded = $state(new Set<string>(['electronics']));
	let selectedId = $state<string | null>(null);

	function toggleCat(id: string) {
		const next = new Set(catExpanded);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		catExpanded = next;
	}

	const fileIcon = '📄';
	const folderIcon = '📁';
	const imageIcon = '🖼️';

	function getIcon(data?: FileData) {
		if (!data) return fileIcon;
		switch (data.kind) {
			case 'folder': return folderIcon;
			case 'image': return imageIcon;
			default: return fileIcon;
		}
	}
</script>

<h1 class="text-2xl font-bold mb-2">TreeView</h1>
<p class="text-muted mb-8">
	Recursive tree with expand/collapse, depth indentation, and ARIA tree roles.
	Rendering is fully controlled via the <code class="text-xs bg-surface-raised px-1 py-0.5 rounded">node</code> snippet.
</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">File explorer</h2>
	<div class="border border-border rounded-lg bg-surface-alt p-3 max-w-md">
		<TreeView nodes={fileTree} expanded={fileExpanded} onToggle={toggleFile}>
			{#snippet node({ node, isExpanded, hasChildren, toggle })}
				{#if hasChildren}
					<button
						type="button"
						onclick={toggle}
						class="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-on-surface hover:bg-surface-raised transition-colors"
					>
						<span class="w-4 text-center text-xs text-muted transition-transform {isExpanded ? 'rotate-90' : ''}">▶</span>
						<span>{getIcon(node.data)}</span>
						<span class="font-medium">{node.name}</span>
					</button>
				{:else}
					<div class="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-on-surface">
						<span class="w-4"></span>
						<span>{getIcon(node.data)}</span>
						<span>{node.name}</span>
						{#if node.data?.size}
							<span class="ml-auto text-xs text-muted">{node.data.size}</span>
						{/if}
					</div>
				{/if}
			{/snippet}
		</TreeView>
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Selectable categories</h2>
	<div class="border border-border rounded-lg bg-surface-alt p-3 max-w-md">
		<TreeView nodes={categoryTree} expanded={catExpanded} onToggle={toggleCat} {selectedId}>
			{#snippet node({ node, isExpanded, hasChildren, toggle })}
				<div class="flex items-center gap-1">
					{#if hasChildren}
						<button
							type="button"
							onclick={toggle}
							class="flex h-6 w-6 shrink-0 items-center justify-center rounded text-muted hover:text-on-surface transition-colors"
							aria-label={isExpanded ? 'Collapse' : 'Expand'}
						>
							<span class="text-xs transition-transform {isExpanded ? 'rotate-90' : ''}">▶</span>
						</button>
					{:else}
						<span class="w-6 shrink-0"></span>
					{/if}
					<button
						type="button"
						onclick={() => (selectedId = node.id)}
						class="flex-1 flex items-center justify-between rounded-md px-2 py-1 text-sm transition-colors
							{selectedId === node.id
								? 'bg-primary/10 text-primary font-medium'
								: 'text-on-surface hover:bg-surface-raised'}"
					>
						<span>{node.name}</span>
						{#if node.data?.count}
							<span class="text-xs text-muted">{node.data.count}</span>
						{/if}
					</button>
				</div>
			{/snippet}
		</TreeView>
	</div>
	{#if selectedId}
		<p class="mt-3 text-sm text-muted">Selected: <strong class="text-on-surface">{selectedId}</strong></p>
	{/if}
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Custom indent</h2>
	<p class="text-sm text-muted mb-3">Use the <code class="text-xs bg-surface-raised px-1 py-0.5 rounded">indent</code> prop to control spacing per depth level (default 1.25rem).</p>
	<div class="border border-border rounded-lg bg-surface-alt p-3 max-w-md">
		<TreeView nodes={fileTree} expanded={fileExpanded} onToggle={toggleFile} indent={2}>
			{#snippet node({ node, isExpanded, hasChildren, toggle })}
				{#if hasChildren}
					<button
						type="button"
						onclick={toggle}
						class="flex w-full items-center gap-2 px-2 py-1 text-sm text-on-surface hover:bg-surface-raised rounded transition-colors"
					>
						<span class="text-xs text-muted {isExpanded ? 'rotate-90' : ''} transition-transform">▶</span>
						<span class="font-medium">{node.name}/</span>
					</button>
				{:else}
					<div class="flex items-center gap-2 px-2 py-1 text-sm text-muted">
						<span>{node.name}</span>
					</div>
				{/if}
			{/snippet}
		</TreeView>
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
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">nodes</td><td class="p-2 text-muted">TreeNode&lt;T&gt;[]</td><td class="p-2 text-muted">—</td><td class="p-2">Root-level tree nodes</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">expanded</td><td class="p-2 text-muted">Set&lt;string&gt;</td><td class="p-2 text-muted">—</td><td class="p-2">Set of expanded node IDs</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onToggle</td><td class="p-2 text-muted">(id: string) =&gt; void</td><td class="p-2 text-muted">—</td><td class="p-2">Called when a node should expand/collapse</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">node</td><td class="p-2 text-muted">Snippet&lt;[TreeNodeContext&lt;T&gt;]&gt;</td><td class="p-2 text-muted">—</td><td class="p-2">Render snippet for each node (required)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">selectedId</td><td class="p-2 text-muted">string | null</td><td class="p-2 text-muted">null</td><td class="p-2">Selected node ID (drives aria-selected)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">indent</td><td class="p-2 text-muted">number</td><td class="p-2 text-muted">1.25</td><td class="p-2">Indent per depth level in rem</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">class</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Additional CSS classes on root &lt;ul&gt;</td></tr>
			</tbody>
		</table>
	</div>

	<h2 class="text-lg font-semibold mt-8 mb-4">TreeNode&lt;T&gt; type</h2>
	<div class="overflow-x-auto">
		<table class="w-full text-sm border border-border rounded-lg overflow-hidden">
			<thead class="bg-surface-raised">
				<tr>
					<th class="text-left p-2 font-medium">Field</th>
					<th class="text-left p-2 font-medium">Type</th>
					<th class="text-left p-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">id</td><td class="p-2 text-muted">string</td><td class="p-2">Unique identifier</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">name</td><td class="p-2 text-muted">string</td><td class="p-2">Display label</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">children</td><td class="p-2 text-muted">TreeNode&lt;T&gt;[]</td><td class="p-2">Child nodes (makes it a branch)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">data</td><td class="p-2 text-muted">T</td><td class="p-2">Domain-specific payload</td></tr>
			</tbody>
		</table>
	</div>

	<h2 class="text-lg font-semibold mt-8 mb-4">TreeNodeContext&lt;T&gt; (snippet parameter)</h2>
	<div class="overflow-x-auto">
		<table class="w-full text-sm border border-border rounded-lg overflow-hidden">
			<thead class="bg-surface-raised">
				<tr>
					<th class="text-left p-2 font-medium">Field</th>
					<th class="text-left p-2 font-medium">Type</th>
					<th class="text-left p-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">node</td><td class="p-2 text-muted">TreeNode&lt;T&gt;</td><td class="p-2">The current node</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">depth</td><td class="p-2 text-muted">number</td><td class="p-2">Nesting depth (0-indexed)</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">isExpanded</td><td class="p-2 text-muted">boolean</td><td class="p-2">Whether this node is expanded</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">hasChildren</td><td class="p-2 text-muted">boolean</td><td class="p-2">Whether this node has children</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">toggle</td><td class="p-2 text-muted">() =&gt; void</td><td class="p-2">Toggles this node's expanded state</td></tr>
			</tbody>
		</table>
	</div>
</section>
