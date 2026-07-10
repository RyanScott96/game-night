<script lang="ts">
	import type { Game } from '$lib/games';
	import { loadGames, filterGames, filterGamesByPlayers, filterGamesByNSFW } from '$lib/games';

	let { onselect }: { onselect?: (game: Game) => void } = $props();

	let games: Game[] = $state(loadGames());
	let maxPlayTime: number = $state(90);
	let playerCount: number = $state(2);
	let sfw: boolean = $state(true);
	let nsfw: boolean = $state(false);
	let selectedGame: Game | null = $state(null);
	let spinning: boolean = $state(false);

	function getFilteredGames(): Game[] {
		if (nsfw && sfw) {
			return filterGamesByPlayers(filterGames(games, maxPlayTime), playerCount);
		}
		else {
			return filterGamesByNSFW(filterGamesByPlayers(filterGames(games, maxPlayTime), playerCount), !sfw);
		}
	}

	function roll() {
		const filtered = getFilteredGames();
		if (filtered.length === 0 || spinning) return;

		spinning = true;
		const duration = 400;
		const baseInterval = 50;
		const totalSteps = Math.floor(duration / baseInterval);
		let step = 0;

		function tick() {
			if (step >= totalSteps) {
				const final = filtered[Math.floor(Math.random() * filtered.length)];
				selectedGame = final;
				spinning = false;
				onselect?.(final);
				return;
			}

			selectedGame = filtered[step % filtered.length];
			step++;
			const eased = Math.min(step / totalSteps, 1);
			const delay = baseInterval + eased * 150;
			setTimeout(tick, delay);
		}

		tick();
	}
</script>

<div class="mx-auto w-full max-w-md">
	<label class="mb-4 block text-sm font-medium text-gray-700">
		Max play time
		<input
			type="number"
			bind:value={maxPlayTime}
			min="10"
			max="300"
			step="5"
			class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
		/>
	</label>

	<label class="mb-4 block text-sm font-medium text-gray-700">
		Number of players
		<input
			type="number"
			bind:value={playerCount}
			min="1"
			max="99"
			class="mt-1 block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 sm:text-sm"
		/>
	</label>

	<label class="mb-4 block text-sm font-medium text-gray-700">
		SFW Games
		<input 
			type="checkbox"
			bind:checked={sfw}
		/>
	</label>

		<label class="mb-4 block text-sm font-medium text-gray-700">
		NSFW Games
		<input 
			type="checkbox"
			bind:checked={nsfw}
		/>
	</label>

	<div class="mb-6 text-sm text-gray-500">
		{getFilteredGames().length} game{getFilteredGames().length === 1 ? '' : 's'} available
	</div>

	{#if selectedGame}
		<div class="flex items-center justify-center min-h-48">
			<div
				class="relative rounded-xl border-2 border-emerald-300 bg-emerald-50 px-8 py-8 text-center shadow-sm ring-2 ring-emerald-100 transition-shadow hover:shadow-md"
			>
				<div
					class="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-sm font-bold text-white"
				>
					✓
				</div>
				{#if spinning}
					<h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900">
						<span class="inline-block animate-[shuffle_0.15s_linear_infinite]"
							>{selectedGame.name}</span
						>
					</h3>
				{:else}
					<h3 class="mb-1 text-2xl font-bold tracking-tight text-gray-900">{selectedGame.name}</h3>
				{/if}
				<span class="text-base text-gray-600"
					>~{selectedGame.playTime} · {selectedGame.minPlayers}–{selectedGame.maxPlayers} players</span
				>
			</div>
		</div>
	{:else}
		<div class="flex items-center justify-center min-h-48">
			<div
				class="rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 px-8 py-8 text-center text-gray-400"
			>
				Press Roll to pick a game
			</div>
		</div>
	{/if}

	{#if getFilteredGames().length === 0}
		<p class="mt-4 text-center text-sm text-gray-400">No games match the current filter.</p>
	{:else}
		<button
			onclick={roll}
			disabled={spinning}
			class="mt-4 w-full rounded-lg bg-emerald-600 px-4 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
		>
			{spinning ? 'Picking...' : 'Roll'}
		</button>
	{/if}
</div>
