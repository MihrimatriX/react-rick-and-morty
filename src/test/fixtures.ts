import type { Character, Episode, Location, Paginated } from "../lib/api";

const API = "https://rickandmortyapi.com/api";

export function makeCharacter(overrides: Partial<Character> = {}): Character {
	const id = overrides.id ?? 1;
	return {
		id,
		name: "Rick Sanchez",
		status: "Alive",
		species: "Human",
		type: "",
		gender: "Male",
		origin: { name: "Earth (C-137)", url: `${API}/location/1` },
		location: { name: "Citadel of Ricks", url: `${API}/location/3` },
		image: `${API}/character/avatar/${id}.jpeg`,
		episode: [`${API}/episode/1`, `${API}/episode/2`],
		url: `${API}/character/${id}`,
		created: "2017-11-04T18:48:46.250Z",
		...overrides,
	};
}

export function makeEpisode(overrides: Partial<Episode> = {}): Episode {
	const id = overrides.id ?? 1;
	return {
		id,
		name: "Pilot",
		air_date: "December 2, 2013",
		episode: "S01E01",
		characters: [`${API}/character/1`, `${API}/character/2`],
		url: `${API}/episode/${id}`,
		created: "2017-11-10T12:56:33.798Z",
		...overrides,
	};
}

export function makeLocation(overrides: Partial<Location> = {}): Location {
	const id = overrides.id ?? 3;
	return {
		id,
		name: "Citadel of Ricks",
		type: "Space station",
		dimension: "unknown",
		residents: [`${API}/character/1`],
		url: `${API}/location/${id}`,
		created: "2017-11-10T13:08:13.191Z",
		...overrides,
	};
}

export function page<T>(results: T[], pages = 1): Paginated<T> {
	return { info: { count: results.length, pages, next: null, prev: null }, results };
}
