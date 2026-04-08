<!--
  @component TreeView

  A recursive tree component that handles expand/collapse, depth-based
  indentation, and keyed child rendering. Consumers control how each node
  looks via the `node` snippet.

  Works with any data that conforms to the `TreeNode<T>` shape — the
  generic `data` field carries domain-specific payload (diagram links,
  symptom details, etc.) while the tree handles the structural concerns.

  @example
  ```svelte
  <script lang="ts">
    import { TreeView, type TreeNode } from '@emdzej/ui-kit';

    type Folder = { icon: string };
    let nodes: TreeNode<Folder>[] = [...];
    let expanded = $state(new Set<string>());

    function toggle(id: string) {
      expanded = expanded.has(id)
        ? (expanded.delete(id), new Set(expanded))
        : new Set(expanded.add(id));
    }
  </script>

  <TreeView {nodes} {expanded} {onToggle}>
    {#snippet node({ node, depth, isExpanded, hasChildren, toggle })}
      <button onclick={toggle} class="flex items-center gap-2">
        {#if hasChildren}
          <span class:rotate-90={isExpanded}>▶</span>
        {/if}
        <span>{node.name}</span>
      </button>
    {/snippet}
  </TreeView>
  ```
-->
<script lang="ts" generics="T = unknown">
	import type { Snippet } from 'svelte';
	import type { TreeNode, TreeNodeContext } from './tree-types.js';
	import Self from './TreeView.svelte';

	interface Props {
		/** Array of root-level tree nodes */
		nodes: TreeNode<T>[];
		/** Set of expanded node IDs */
		expanded: Set<string>;
		/** Called when a node's expanded state should change */
		onToggle: (id: string) => void;
		/** Current depth level (used internally for recursion, start at 0) */
		depth?: number;
		/** Indent size per depth level in rem */
		indent?: number;
		/** ID of the currently selected node (for aria-selected) */
		selectedId?: string | null;
		/** Render snippet for each node — receives TreeNodeContext */
		node: Snippet<[TreeNodeContext<T>]>;
		/** Additional CSS classes on the root `<ul>` */
		class?: string;
	}

	let {
		nodes,
		expanded,
		onToggle,
		depth = 0,
		indent = 1.25,
		selectedId = null,
		node: nodeSnippet,
		class: className = ''
	}: Props = $props();

	function hasChildren(node: TreeNode<T>): boolean {
		return (node.children?.length ?? 0) > 0;
	}
</script>

<ul class="space-y-0.5 {className}" role={depth === 0 ? 'tree' : 'group'} aria-label={depth === 0 ? 'Tree navigation' : undefined}>
	{#each nodes as treeNode (treeNode.id)}
		<li
			role="treeitem"
			aria-expanded={hasChildren(treeNode) ? expanded.has(treeNode.id) : undefined}
			aria-selected={selectedId != null ? treeNode.id === selectedId : false}
		>
			<div style:padding-left="{depth * indent}rem">
				{@render nodeSnippet({
					node: treeNode,
					depth,
					isExpanded: expanded.has(treeNode.id),
					hasChildren: hasChildren(treeNode),
					toggle: () => onToggle(treeNode.id)
				})}
			</div>

			{#if hasChildren(treeNode) && expanded.has(treeNode.id)}
				<Self
					nodes={treeNode.children ?? []}
					{expanded}
					{onToggle}
					depth={depth + 1}
					{indent}
					{selectedId}
					node={nodeSnippet}
				/>
			{/if}
		</li>
	{/each}
</ul>
