import {
	ChevronLeft,
	ChevronRight,
	Clapperboard,
	Dna,
	Earth,
	Hash,
	MapPin,
	Sparkles,
	Venus,
} from "lucide-react";
import { Link, useParams } from "react-router";
import Breadcrumbs from "../components/Breadcrumbs";
import EpisodeChip from "../components/EpisodeChip";
import FavoriteButton from "../components/FavoriteButton";
import InfoTile from "../components/InfoTile";
import LocationLink from "../components/LocationLink";
import NotFound from "../components/NotFound";
import { StatusDot } from "../components/StatusBadge";
import { ErrorState, Spinner } from "../components/States";
import { buttonClasses } from "../components/ui/button-classes";
import { ApiError, idsFromUrls, type Character, type Episode } from "../lib/api";
import { cn } from "../lib/cn";
import {
	formatAirDate,
	genderLabel,
	orUnknown,
	parseEpisodeCode,
	speciesLabel,
	statusLabel,
} from "../lib/labels";
import { useCharacter, useEpisodesByIds } from "../lib/queries";
import { absUrl, useSeo } from "../seo";

function groupBySeason(episodes: Episode[]) {
	const seasons = new Map<number, Episode[]>();
	for (const episode of episodes) {
		const { season } = parseEpisodeCode(episode.episode);
		seasons.set(season, [...(seasons.get(season) ?? []), episode]);
	}
	return [...seasons.entries()].sort(([a], [b]) => a - b);
}

function AppearanceCard({ label, episode }: { label: string; episode: Episode }) {
	return (
		<Link
			to={`/episodes/${episode.id}`}
			className="group flex flex-col rounded-2xl border border-line bg-surface p-4 transition-colors hover:border-portal/60"
		>
			<span className="text-xs font-medium text-muted">{label}</span>
			<span className="mt-1 font-semibold group-hover:text-portal-ink">
				{episode.name}
			</span>
			<span className="mt-1 text-xs text-muted">
				{episode.episode} · {formatAirDate(episode.air_date)}
			</span>
		</Link>
	);
}

function CharacterEpisodes({ character }: { character: Character }) {
	const ids = idsFromUrls(character.episode);
	const { data: episodes, isPending, isError, refetch } = useEpisodesByIds(ids);

	if (ids.length === 0) return null;

	return (
		<section aria-labelledby="episodes-title" className="mt-12">
			<h2
				id="episodes-title"
				className="flex items-center gap-2 text-2xl font-bold"
			>
				<Clapperboard className="size-6 text-portal-ink" aria-hidden="true" />
				Göründüğü bölümler
				<span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-sm font-semibold text-muted">
					{ids.length}
				</span>
			</h2>

			{isPending ? (
				<Spinner label="Bölümler yükleniyor" />
			) : isError ? (
				<div className="mt-6">
					<ErrorState onRetry={() => refetch()} />
				</div>
			) : (
				<>
					<div className="mt-6 grid gap-3 sm:grid-cols-2">
						<AppearanceCard label="İlk görünüm" episode={episodes[0]} />
						<AppearanceCard
							label="Son görünüm"
							episode={episodes[episodes.length - 1]}
						/>
					</div>
					<div className="mt-8 space-y-6">
						{groupBySeason(episodes).map(([season, list]) => (
							<div key={season}>
								<h3 className="mb-3 text-sm font-semibold text-muted">
									{season ? `Sezon ${season}` : "Diğer"}
								</h3>
								<ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
									{list.map((episode) => (
										<li key={episode.id} className="min-w-0">
											<EpisodeChip episode={episode} />
										</li>
									))}
								</ul>
							</div>
						))}
					</div>
				</>
			)}
		</section>
	);
}

function CharacterView({ character }: { character: Character }) {
	const { id, name, image, status, species, type, gender, origin, location } =
		character;
	const description = `${name}: ${statusLabel(status)}, ${speciesLabel(species)}, ${genderLabel(gender)}. Köken: ${orUnknown(origin.name)}. Son konum: ${orUnknown(location.name)}.`;

	useSeo({
		title: `${name} | Rick & Morty`,
		description,
		path: `/character/${id}`,
		image,
		imageAlt: name,
		type: "profile",
		jsonLd: {
			"@context": "https://schema.org",
			"@type": "Person",
			name,
			image,
			url: absUrl(`/character/${id}`),
			description,
			gender,
			homeLocation: location.name,
		},
	});

	return (
		<>
			<Breadcrumbs items={[{ label: "Karakterler", to: "/" }, { label: name }]} />

			<article className="mt-6 grid gap-8 rounded-3xl border border-line bg-surface/80 p-5 shadow-sm backdrop-blur sm:p-8 md:grid-cols-[minmax(0,300px)_1fr] lg:gap-12">
				<div className="relative mx-auto w-full max-w-[300px] self-start">
					<div
						className="absolute -inset-2 rounded-[2rem] bg-linear-to-br from-portal via-rick to-morty opacity-40 blur-xl dark:opacity-50"
						aria-hidden="true"
					/>
					<img
						src={image}
						alt={name}
						width={300}
						height={300}
						className="relative aspect-square w-full rounded-3xl border border-line object-cover shadow-xl"
					/>
				</div>

				<div className="min-w-0">
					<span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2 px-3 py-1 text-sm font-semibold">
						<StatusDot status={status} />
						{statusLabel(status)}
					</span>
					<h1 className="mt-4 text-4xl font-bold sm:text-5xl">{name}</h1>
					<p className="mt-2 text-lg text-muted">
						{speciesLabel(species)}
						{type && ` · ${type}`}
					</p>

					<FavoriteButton
						id={id}
						name={name}
						withLabel
						className={cn(buttonClasses("secondary"), "mt-6")}
					/>

					<dl className="mt-8 grid gap-3 sm:grid-cols-2">
						<InfoTile icon={Venus} label="Cinsiyet">
							{genderLabel(gender)}
						</InfoTile>
						<InfoTile icon={Dna} label="Tür">
							{speciesLabel(species)}
						</InfoTile>
						<InfoTile icon={Earth} label="Köken">
							<LocationLink location={origin} />
						</InfoTile>
						<InfoTile icon={MapPin} label="Son bilinen konum">
							<LocationLink location={location} />
						</InfoTile>
						<InfoTile icon={Clapperboard} label="Bölüm sayısı">
							{character.episode.length}
						</InfoTile>
						<InfoTile
							icon={type ? Sparkles : Hash}
							label={type ? "Alt tür" : "Kimlik"}
						>
							{type || `#${id}`}
						</InfoTile>
					</dl>
				</div>
			</article>

			<CharacterEpisodes character={character} />

			<nav
				aria-label="Karakterler arası gezinme"
				className="mt-12 flex justify-between gap-3"
			>
				{id > 1 ? (
					<Link
						to={`/character/${id - 1}`}
						className={buttonClasses("secondary")}
					>
						<ChevronLeft className="size-4" aria-hidden="true" />
						Önceki karakter
					</Link>
				) : (
					<span />
				)}
				<Link to={`/character/${id + 1}`} className={buttonClasses("secondary")}>
					Sonraki karakter
					<ChevronRight className="size-4" aria-hidden="true" />
				</Link>
			</nav>
		</>
	);
}

export default function CharacterPage() {
	const id = Number(useParams().id);
	const { data, isPending, isError, error, refetch } = useCharacter(id);

	if (
		!Number.isInteger(id) ||
		id <= 0 ||
		(error instanceof ApiError && error.status === 404)
	) {
		return (
			<NotFound
				title="Bu karakter bulunamadı"
				description="Bu karakter hiçbir evrende kayıtlı değil."
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
	if (isPending) return <Spinner label="Karakter yükleniyor" />;

	return <CharacterView character={data} />;
}
