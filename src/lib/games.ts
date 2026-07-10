export interface Game {
	name: string;
	playTime: number;
	minPlayers: number;
	maxPlayers: number;
}

import gamesData from '$lib/games.json';

export function loadGames(): Game[] {
	return gamesData;
}

export function filterGames(games: Game[], maxPlayTime: number): Game[] {
	return games.filter((game) => game.playTime <= maxPlayTime);
}

export function filterGamesByPlayers(games: Game[], playerCount: number): Game[] {
	return games.filter((game) => game.minPlayers <= playerCount && game.maxPlayers >= playerCount);
}
