<script lang="ts">
	import { ImageViewer } from '@emdzej/ui-kit';

	let lightboxSrc: string | null = $state(null);
</script>

<h1 class="text-2xl font-bold mb-2">ImageViewer</h1>
<p class="text-muted mb-8">Full-screen image lightbox with backdrop blur, close button, and escape-key dismissal.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Default</h2>
	<div class="flex gap-3">
		<button
			onclick={() => (lightboxSrc = 'https://picsum.photos/seed/viewer1/1200/800')}
			class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
		>
			Open lightbox
		</button>
		<button
			onclick={() => (lightboxSrc = 'https://picsum.photos/seed/viewer2/800/1200')}
			class="px-4 py-2 rounded-md border border-border bg-surface-alt hover:bg-surface-raised transition-colors"
		>
			Portrait image
		</button>
	</div>
	<ImageViewer src={lightboxSrc} alt="Sample photograph" onclose={() => (lightboxSrc = null)} />
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Click thumbnails</h2>
	<div class="flex gap-3">
		{#each ['seed/a', 'seed/b', 'seed/c'] as seed}
			<button
				onclick={() => (lightboxSrc = `https://picsum.photos/${seed}/800/600`)}
				class="overflow-hidden rounded-lg border border-border hover:ring-2 hover:ring-ring transition-shadow"
			>
				<img src="https://picsum.photos/{seed}/160/120" alt="Thumbnail" class="block" />
			</button>
		{/each}
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
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">src</td><td class="p-2 text-muted">string | null</td><td class="p-2 text-muted">—</td><td class="p-2">Image URL. null = closed.</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">alt</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">''</td><td class="p-2">Alt text for the image</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onclose</td><td class="p-2 text-muted">() => void</td><td class="p-2 text-muted">—</td><td class="p-2">Called to close (required)</td></tr>
			</tbody>
		</table>
	</div>
</section>
