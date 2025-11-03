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
		<ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-0 animate-fadeIn">
			{filteredChars.map((char, i) => (
				<li
					key={char.id}
					className="animate-slideUp"
					style={{ animationDelay: `${i * 40}ms` }}
				>
					<CharacterCard
						id={char.id}
						name={char.name}
						img={char.img}
						species={char.species}
						status={char.status}
					/>
				</li>
			))}
		</ul>
	);
};

export default CharacterList;
