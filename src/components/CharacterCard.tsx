import type { Character } from "../types/character";
import { Link } from "react-router-dom";
import { FaUser, FaGlobe } from "react-icons/fa";

interface CharacterCardProps
	extends Pick<Character, "id" | "img" | "name" | "species" | "status"> {}

const statusColors: Record<string, string> = {
	Alive: "bg-green-500",
	Dead: "bg-red-500",
	unknown: "bg-gray-400",
};

const speciesColors: Record<string, string> = {
	Human: "bg-blue-500",
	Alien: "bg-purple-500",
	unknown: "bg-gray-400",
};

const CharacterCard = ({
	id,
	img,
	name,
	species,
	status,
}: CharacterCardProps) => {
	return (
		<Link
			to={`/char/${id}`}
			tabIndex={0}
			aria-label={`${name} detayına git`}
			className="block focus:outline-none focus:ring-2 focus:ring-cyan-400"
		>
			<div className="w-64 flex flex-col text-left m-2 p-0 rounded-2xl bg-card-light dark:bg-card-dark shadow-xl border-2 border-transparent hover:border-accent-light dark:hover:border-accent-dark transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-md group cursor-pointer overflow-hidden relative">
				<div className="relative w-full aspect-square overflow-hidden">
					<img
						src={img}
						alt={name}
						className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 group-hover:blur-[1px] rounded-t-2xl"
						loading="lazy"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-500 group-hover:opacity-80" />
					<span
						className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full text-white font-bold shadow ${status === "Alive" ? "bg-rick" : status === "Dead" ? "bg-evil" : "bg-portal"}`}
					>
						{status}
					</span>
					<span
						className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full text-white font-bold shadow ${species === "Human" ? "bg-morty" : species === "Alien" ? "bg-evil" : "bg-portal"}`}
					>
						{species}
					</span>
				</div>
				<main className="flex-1 flex flex-col justify-end bg-white/80 dark:bg-bg-dark/80 p-4 rounded-b-2xl transition-colors duration-300 group-hover:bg-rick/20 dark:group-hover:bg-morty/20">
					<h3 className="font-bold text-lg mb-1 truncate flex items-center gap-2 text-slate-900 dark:text-white">
						<FaUser className="text-rick" /> {name}
					</h3>
					<div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
						<FaGlobe className="text-morty" />
						<span>{species}</span>
					</div>
				</main>
			</div>
		</Link>
	);
};

export default CharacterCard;
