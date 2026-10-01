import { Trash2, Users } from "lucide-react";
import { Link } from "react-router";
import CharacterGrid, { CharacterGridSkeleton } from "../components/CharacterGrid";
import PageHeader from "../components/PageHeader";
import { EmptyState, ErrorState } from "../components/States";
import { Button } from "../components/ui/Button";
import { buttonClasses } from "../components/ui/button-classes";
import { useFavorites } from "../hooks/useFavorites";
import { useCharactersByIds } from "../lib/queries";
import { Seo } from "../seo";

export default function FavoritesPage() {
	const { ids, clearFavorites } = useFavorites();
	const sortedIds = [...ids].sort((a, b) => a - b);
	const { data, isPending, isError, error, refetch } = useCharactersByIds(sortedIds);
	// Removing a favorite should hide its card at once, before a refetch.
	const characters = (data ?? []).filter((character) => ids.includes(character.id));

	return (
		<>
			<Seo
				title="Favoriler | Rick & Morty"
				description="Favori Rick and Morty karakterlerin."
				path="/favorites"
				noindex
			/>
			<PageHeader
				eyebrow="Koleksiyonun"
				title="Favori karakterler"
				description="Kalp simgesine dokunarak eklediğin karakterler bu cihazda saklanır."
			>
				{ids.length > 0 && (
					<Button
						onClick={() => {
							if (window.confirm("Tüm favoriler silinsin mi?"))
								clearFavorites();
						}}
					>
						<Trash2 className="size-4" aria-hidden="true" />
						Tümünü temizle
					</Button>
				)}
			</PageHeader>

			{ids.length === 0 ? (
				<EmptyState
					title="Henüz favorin yok"
					description="Karakter kartlarındaki kalbe dokunarak favorilerini burada topla."
					action={
						<Link to="/" className={buttonClasses("primary")}>
							<Users className="size-4" aria-hidden="true" />
							Karakterlere göz at
						</Link>
					}
				/>
			) : isPending ? (
				<CharacterGridSkeleton count={Math.min(ids.length, 10)} />
			) : isError ? (
				<ErrorState error={error} onRetry={() => refetch()} />
			) : (
				<CharacterGrid characters={characters} />
			)}
		</>
	);
}
