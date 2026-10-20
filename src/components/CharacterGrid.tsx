import type { Character } from "../lib/api";
import { cn } from "../lib/cn";
import CharacterCard, { CharacterCardSkeleton } from "./CharacterCard";

const GRID =
	"grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";

interface CharacterGridProps {
	characters: Character[];
	dimmed?: boolean;
}

export default function CharacterGrid({ characters, dimmed }: CharacterGridProps) {
	return (
		<ul
			className={cn(
				GRID,
				"transition-opacity duration-300",
				dimmed && "opacity-60",
			)}
			aria-busy={dimmed || undefined}
		>
			{characters.map((character) => (
				<li key={character.id}>
					<CharacterCard character={character} />
				</li>
			))}
		</ul>
	);
}

export function CharacterGridSkeleton({ count = 10 }: { count?: number }) {
	return (
		<div className={GRID} role="status" aria-label="Karakterler yükleniyor">
			{Array.from({ length: count }, (_, i) => (
				<CharacterCardSkeleton key={i} />
			))}
		</div>
	);
}
