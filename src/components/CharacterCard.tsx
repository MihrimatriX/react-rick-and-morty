import type { Character } from "../types/character";
import { Link } from "react-router-dom";

interface CharacterCardProps extends Pick<Character, 'id' | 'img' | 'name' | 'species'> {}

const CharacterCard = ({ id, img, name, species }: CharacterCardProps) => {
  return (
    <Link to={`/char/${id}`} tabIndex={0} aria-label={`${name} detayına git`} className="block focus:outline-none focus:ring-2 focus:ring-blue-500">
      <li className="w-64 flex flex-col text-left m-2 p-2 list-none border-4 border-lime-400 rounded-lg hover:scale-105 transition-transform bg-white dark:bg-gray-800">
        <img src={img} alt={name} className="w-full rounded-t-md" />
        <main className="min-h-[102px] bg-cyan-500 p-4 rounded-b-md">
          <h3 className="font-bold text-lg mb-1">{name}</h3>
          <p className="text-sm">{species}</p>
        </main>
      </li>
    </Link>
  );
};

export default CharacterCard;
