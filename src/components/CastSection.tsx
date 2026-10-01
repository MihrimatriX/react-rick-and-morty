import { Users } from "lucide-react";
import CharacterGrid, { CharacterGridSkeleton } from "./CharacterGrid";
import { ErrorState } from "./States";
import { idsFromUrls } from "../lib/api";
import { useCharactersByIds } from "../lib/queries";

interface CastSectionProps {
	title: string;
	urls: string[];
	emptyText: string;
}

/** Character grid for the people listed on an episode or a location. */
export default function CastSection({ title, urls, emptyText }: CastSectionProps) {
	const ids = idsFromUrls(urls);
	const { data, isPending, isError, error, refetch } = useCharactersByIds(ids);

	return (
		<section aria-labelledby="cast-title" className="mt-12">
			<h2
				id="cast-title"
				className="mb-6 flex items-center gap-2 text-2xl font-bold"
			>
				<Users className="size-6 text-portal-ink" aria-hidden="true" />
				{title}
				<span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-sm font-semibold text-muted">
					{ids.length}
				</span>
			</h2>
			{ids.length === 0 ? (
				<p className="rounded-2xl border border-dashed border-line p-8 text-center text-muted">
					{emptyText}
				</p>
			) : isPending ? (
				<CharacterGridSkeleton count={Math.min(ids.length, 10)} />
			) : isError ? (
				<ErrorState error={error} onRetry={() => refetch()} />
			) : (
				<CharacterGrid characters={data} />
			)}
		</section>
	);
}
