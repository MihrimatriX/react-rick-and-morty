import { Heart } from "lucide-react";
import { useFavorites } from "../hooks/useFavorites";
import { cn } from "../lib/cn";

interface FavoriteButtonProps {
	id: number;
	name: string;
	className?: string;
	withLabel?: boolean;
}

export default function FavoriteButton({
	id,
	name,
	className,
	withLabel,
}: FavoriteButtonProps) {
	const { isFavorite, toggleFavorite } = useFavorites();
	const active = isFavorite(id);

	return (
		<button
			type="button"
			aria-pressed={active}
			aria-label={active ? `${name} favorilerden çıkar` : `${name} favorilere ekle`}
			onClick={(e) => {
				// Cards wrap the button in a link.
				e.preventDefault();
				e.stopPropagation();
				toggleFavorite(id);
			}}
			className={cn(
				"inline-flex cursor-pointer items-center justify-center gap-2 transition-all duration-200 active:scale-90",
				className,
			)}
		>
			<Heart
				className={cn(
					"size-[1.15em] transition-colors",
					active ? "fill-danger text-danger" : "fill-transparent",
				)}
				aria-hidden="true"
			/>
			{withLabel && (active ? "Favorilerde" : "Favorilere ekle")}
		</button>
	);
}
