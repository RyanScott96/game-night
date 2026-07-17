declare module '$lib/games.json' {
	import type { Game } from './games';
	const value: Game[];
	export default value;
}

declare module '$lib/reward_menu.json' {
	import type { Prize } from './prizes';
	const value: Prize[];
	export default value;
}
