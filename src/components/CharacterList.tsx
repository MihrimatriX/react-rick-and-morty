import type { Character } from "../types/character";
import CharacterCard from "./CharacterCard";
import SearchError from "./SearchError";

interface CharacterListProps {
  filteredChars: Character[];
}

const CharacterList = ({ filteredChars }: CharacterListProps) => {
  if (filteredChars.length === 0) {
    return <SearchError />;
  }
  return (
    <ul className="flex flex-row flex-wrap justify-center p-0">
      {filteredChars.map((char) => (
        <CharacterCard
          key={char.id}
          id={char.id}
          name={char.name}
          img={char.img}
          species={char.species}
        />
      ))}
    </ul>
  );
};

export default CharacterList;
