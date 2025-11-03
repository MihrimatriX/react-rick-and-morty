export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
}

const getEpisodesFromAPI = async (): Promise<Episode[]> => {
	let episodes: Episode[] = [];
	let url = "https://rickandmortyapi.com/api/episode";
	while (url) {
		const res = await fetch(url);
		const data = await res.json();
		episodes = episodes.concat(data.results);
		url = data.info.next;
	}
	return episodes;
};

export default getEpisodesFromAPI;
