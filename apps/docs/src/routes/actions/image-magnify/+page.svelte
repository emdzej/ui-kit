<script lang="ts">
	import { imageMagnify, ImageViewer } from '@emdzej/ui-kit';

	let lightboxSrc: string | null = $state(null);
	let lensSize = $state(180);
</script>

<h1 class="text-2xl font-bold mb-2">imageMagnify</h1>
<p class="text-muted mb-8">Svelte action that adds a magnifying-glass lens on image hover. Hold Alt/Option and hover over an image to activate.</p>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Default (Alt + hover)</h2>
	<p class="text-sm text-muted mb-4">Hold the <kbd class="px-1.5 py-0.5 rounded border border-border bg-surface-raised text-xs">Alt</kbd> / <kbd class="px-1.5 py-0.5 rounded border border-border bg-surface-raised text-xs">Option</kbd> key and move your cursor over the photo.</p>
	<div
		use:imageMagnify={{ zoom: 5, lensSize, onclick: (src) => (lightboxSrc = src) }}
		class="inline-block"
	>
		<img
			src="https://picsum.photos/seed/magnify-demo/600/400"
			alt="Photograph for magnification demo"
			class="rounded-lg border border-border max-w-md"
		/>
	</div>
	<ImageViewer src={lightboxSrc} onclose={() => (lightboxSrc = null)} />
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Lens size control</h2>
	<p class="text-sm text-muted mb-3">The action supports reactive options via its <code>update()</code> method.</p>
	<div class="flex items-center gap-3 mb-4">
		{#each [{ label: 'S', px: 120 }, { label: 'M', px: 180 }, { label: 'L', px: 260 }, { label: 'XL', px: 360 }] as size}
			<button
				onclick={() => (lensSize = size.px)}
				class="px-3 py-1 rounded-lg text-sm transition-colors
					{lensSize === size.px
						? 'bg-primary text-on-primary'
						: 'border border-border bg-surface-alt hover:bg-surface-hover'}"
			>
				{size.label} ({size.px}px)
			</button>
		{/each}
	</div>
</section>

<section class="mb-10">
	<h2 class="text-lg font-semibold mb-4">Usage</h2>
	<div class="prose dark:prose-invert max-w-none">
		<pre><code>&lt;div use:imageMagnify=&#123;&#123; zoom: 5, lensSize: 180 &#125;&#125;&gt;
  &lt;img src="/diagram.png" alt="Diagram" /&gt;
&lt;/div&gt;</code></pre>

		<p>With click callback for lightbox:</p>
		<pre><code>&lt;div use:imageMagnify=&#123;&#123;
  onclick: (src) =&gt; (lightboxSrc = src)
&#125;&#125;&gt;</code></pre>
	</div>
</section>

<section>
	<h2 class="text-lg font-semibold mb-4">Options</h2>
	<div class="overflow-x-auto">
		<table class="w-full text-sm border border-border rounded-lg overflow-hidden">
			<thead class="bg-surface-raised">
				<tr>
					<th class="text-left p-2 font-medium">Option</th>
					<th class="text-left p-2 font-medium">Type</th>
					<th class="text-left p-2 font-medium">Default</th>
					<th class="text-left p-2 font-medium">Description</th>
				</tr>
			</thead>
			<tbody>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">zoom</td><td class="p-2 text-muted">number</td><td class="p-2 text-muted">5</td><td class="p-2">Magnification factor</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">lensSize</td><td class="p-2 text-muted">number</td><td class="p-2 text-muted">180</td><td class="p-2">Lens diameter in px</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">selector</td><td class="p-2 text-muted">string</td><td class="p-2 text-muted">'img'</td><td class="p-2">CSS selector for target images</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">activation</td><td class="p-2 text-muted">'alt' | 'always'</td><td class="p-2 text-muted">'alt'</td><td class="p-2">Activation method</td></tr>
				<tr class="border-t border-border"><td class="p-2 font-mono text-xs">onclick</td><td class="p-2 text-muted">(src: string) => void</td><td class="p-2 text-muted">—</td><td class="p-2">Called when image is clicked</td></tr>
			</tbody>
		</table>
	</div>
</section>
