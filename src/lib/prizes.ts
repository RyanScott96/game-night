export interface Prize {
	id: string;
	name: string;
	description: string;
}

import prizesData from '$lib/reward_menu.json';

export function loadPrizes(): Prize[] {
	return prizesData;
}
