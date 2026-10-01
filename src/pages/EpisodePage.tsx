import { CalendarDays, ChevronLeft, ChevronRight, Hash, Tv, Users } from "lucide-react";
import { Link, useParams } from "react-router";
import Breadcrumbs from "../components/Breadcrumbs";
import CastSection from "../components/CastSection";
import InfoTile from "../components/InfoTile";
import NotFound from "../components/NotFound";
import { ErrorState, Spinner } from "../components/States";
import { buttonClasses } from "../components/ui/button-classes";
import { ApiError, type Episode } from "../lib/api";
import { formatAirDate, formatEpisodeCode } from "../lib/labels";
import { useEpisode } from "../lib/queries";
import { absUrl, useSeo } from "../seo";

function EpisodeView({ episode }: { episode: Episode }) {
	const { id, name, air_date, characters } = episode;
	const description = `${episode.episode} "${name}" — ${formatAirDate(air_date)}. Bu Rick and Morty bölümünde rol alan ${characters.length} karakteri keşfet.`;

	useSeo({
		title: `${episode.episode} ${name} | Rick & Morty`,
		description,
		path: `/episodes/${id}`,
		type: "article",
		jsonLd: {
			"@context": "https://schema.org",
			"@type": "TVEpisode",
			name,
			episodeNumber: episode.episode,
			datePublished: air_date,
			url: absUrl(`/episodes/${id}`),
			partOfSeries: { "@type": "TVSeries", name: "Rick and Morty" },
		},
	});

	return (
		<>
			<Breadcrumbs
				items={[{ label: "Bölümler", to: "/episodes" }, { label: name }]}
			/>

			<header className="relative mt-6 overflow-hidden rounded-3xl border border-line bg-surface/80 p-6 shadow-sm backdrop-blur sm:p-10">
				<div
					className="absolute -top-24 -right-24 size-72 rounded-full bg-portal/25 blur-3xl"
					aria-hidden="true"
				/>
				<span className="relative inline-flex items-center gap-2 rounded-full bg-rick/15 px-3 py-1 font-mono text-sm font-bold text-rick-ink">
					<Tv className="size-4" aria-hidden="true" />
					{episode.episode}
				</span>
				<h1 className="relative mt-4 text-4xl font-bold sm:text-5xl">{name}</h1>
				<dl className="relative mt-8 grid gap-3 sm:grid-cols-3">
					<InfoTile icon={Hash} label="Sezon / bölüm">
						{formatEpisodeCode(episode.episode)}
					</InfoTile>
					<InfoTile icon={CalendarDays} label="Yayın tarihi">
						{formatAirDate(air_date)}
					</InfoTile>
					<InfoTile icon={Users} label="Karakter sayısı">
						{characters.length}
					</InfoTile>
				</dl>
			</header>

			<CastSection
				title="Bölümdeki karakterler"
				urls={characters}
				emptyText="Bu bölüm için karakter kaydı yok."
			/>

			<nav
				aria-label="Bölümler arası gezinme"
				className="mt-12 flex justify-between gap-3"
			>
				{id > 1 ? (
					<Link
						to={`/episodes/${id - 1}`}
						className={buttonClasses("secondary")}
					>
						<ChevronLeft className="size-4" aria-hidden="true" />
						Önceki bölüm
					</Link>
				) : (
					<span />
				)}
				<Link to={`/episodes/${id + 1}`} className={buttonClasses("secondary")}>
					Sonraki bölüm
					<ChevronRight className="size-4" aria-hidden="true" />
				</Link>
			</nav>
		</>
	);
}

export default function EpisodePage() {
	const id = Number(useParams().id);
	const { data, isPending, isError, error, refetch } = useEpisode(id);

	if (
		!Number.isInteger(id) ||
		id <= 0 ||
		(error instanceof ApiError && error.status === 404)
	) {
		return (
			<NotFound
				title="Bu bölüm bulunamadı"
				description="Bu bölüm henüz hiçbir evrende yayınlanmadı."
			/>
		);
	}
	if (isError) {
		return (
			<div className="py-12">
				<ErrorState error={error} onRetry={() => refetch()} />
			</div>
		);
	}
	if (isPending) return <Spinner label="Bölüm yükleniyor" />;

	return <EpisodeView episode={data} />;
}
