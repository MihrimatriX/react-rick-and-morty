import type { Character } from "../types/character";

const getDataFromAPI = (): Promise<Character[]> => {
  return fetch("https://rickandmortyapi.com/api/character")
    .then((response) => response.json())
    .then((data) => {
      return data.results.map((character: any) => {
        return {
          name: character.name,
          id: character.id,
          img: character.image,
          status: character.status,
          species: character.species,
          gender: character.gender,
          origin: character.origin.name,
          episodes: character.episode.length,
        };
      });
    });
};

export default getDataFromAPI;