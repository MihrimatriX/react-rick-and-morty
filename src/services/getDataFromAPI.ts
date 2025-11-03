import type { Character } from "../types/character";

export interface CharacterAPI {
	id: number;
	name: string;
	image: string;
	status: string;
	species: string;
	gender: string;
	origin: { name: string; url: string };
	location: { name: string; url: string };
	episode: string[];
}

const getDataFromAPI = async (): Promise<Character[]> => {
	const res = await fetch("https://rickandmortyapi.com/api/character");
	const data = await res.json();
	return data.results.map((character: CharacterAPI) => ({
		id: character.id,
		name: character.name,
		img: character.image,
		status: character.status,
		species: character.species,
		gender: character.gender,
		origin: character.origin.name,
		originUrl: character.origin.url,
		location: character.location.name,
		locationUrl: character.location.url,
		episodes: character.episode.length,
		episodeUrls: character.episode,
	}));
};

export default getDataFromAPI;
