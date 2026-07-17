<script lang="ts">
	import type { Prize } from '$lib/prizes';
	import { loadPrizes } from '$lib/prizes';

	let { onselect }: { onselect?: (prize: Prize | null) => void } = $props();

	const prizes: Prize[] = $state(loadPrizes());
	let selectedId: string | null = $state(null);

	function toggle(id: string) {
		if (selectedId === id) {
			selectedId = null;
			onselect?.(null);
		} else {
			selectedId = id;
			const prize = prizes.find((p) => p.id === id);
			onselect?.(prize ?? null);
		}
	}

	function isSelected(id: string): boolean {
		return selectedId === id;
	}
</script>

<div class="mx-auto w-full max-w-3xl px-4 sm:px-0">
	<div class="mb-8 text-center">
		<h1 class="mb-2 text-center text-3xl font-bold tracking-tight text-amber-600">
			<i class="fa-solid fa-trophy mr-2 text-amber-500"></i>Prize Menu
		</h1>
		<p class="text-base text-gray-600">
			The winner may select a prize from the choices below. Click any prize to claim it.
		</p>
	</div>

	<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
		{#each prizes as prize (prize.id)}
			<button
				type="button"
				onclick={() => toggle(prize.id)}
				class="relative rounded-2xl border-2 p-6 text-left transition-all focus:outline-none cursor-pointer {isSelected(
					prize.id
				)
					? 'border-amber-400 bg-gradient-to-br from-amber-50 to-rose-50 shadow-lg hover:border-amber-500 hover:shadow-xl'
					: 'border-gray-200 bg-white shadow-sm hover:border-amber-400 hover:from-amber-100 hover:to-rose-100 hover:shadow-lg hover:bg-gradient-to-br'}"
			>
				{#if isSelected(prize.id)}
					<div
						class="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-rose-400 text-sm font-bold text-white shadow-md"
					>
						<i class="fa-solid fa-check"></i>
					</div>
				{/if}

				<div class="mb-2 flex items-center gap-2">
					<i
						class="fa-{isSelected(prize.id) ? 'solid' : 'regular'} fa-star text-{isSelected(
							prize.id
						)
							? 'amber-500'
							: 'amber-400'}"
					></i>
					<span
						class="text-lg font-{isSelected(prize.id) ? 'bold' : 'semibold'} text-{isSelected(
							prize.id
						)
							? 'amber-700'
							: 'gray-800'}">{prize.name}</span
					>
				</div>
				<span class="text-sm leading-relaxed text-{isSelected(prize.id) ? 'gray-700' : 'gray-600'}"
					>{prize.description}</span
				>
			</button>
		{/each}
	</div>
</div>
