/**
 * A node in the tree. `id` and `name` are required structural fields.
 * `children` makes it a branch; absence makes it a leaf.
 * `data` carries arbitrary domain-specific payload.
 */
export type TreeNode<D = unknown> = {
	id: string;
	name: string;
	children?: TreeNode<D>[];
	data?: D;
};

/**
 * Context passed to the `node` render snippet for each tree node.
 */
export type TreeNodeContext<D = unknown> = {
	/** The node being rendered */
	node: TreeNode<D>;
	/** Current nesting depth (0-indexed) */
	depth: number;
	/** Whether this node is currently expanded */
	isExpanded: boolean;
	/** Whether this node has children */
	hasChildren: boolean;
	/** Convenience function to toggle this node's expanded state */
	toggle: () => void;
};
