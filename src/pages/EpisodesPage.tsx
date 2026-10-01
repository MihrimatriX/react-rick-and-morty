import { CalendarDays, Clapperboard, Users } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import SearchField from "../components/SearchField";
import { EmptyState, ErrorState, Spinner } from "../components/States";
import { Button } from "../components/ui/Button";
import { useListParams } from "../hooks/useListParams";
import type { Episode } from "../lib/api";
import { cn } from "../lib/cn";
import { formatAirDate, parseEpisodeCode } from "../lib/labels";
import { useAllEpisodes } from "../lib/queries";
import { Seo } from "../seo";

const DEFAULTS = { q: "", season: "all" };

function EpisodeCard({ episode }: { episode: Episode }) {
	const { episode: number } = parseEpisodeCode(episode.episode);
	return (
		<Link
			to={`/episodes/${episode.id}`}
			className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-portal/60 hover:shadow-[0_18px_40px_-20px_var(--portal)]"
		>
			<span
				className="absolute -top-3 right-3 font-display text-7xl font-bold text-surface-2 transition-colors select-none group-hover:text-portal/15"
				aria-hidden="true"
			>
				{String(number).padStart(2, "0")}
			</span>
			<span className="relative w-fit rounded-md bg-rick/15 px-2 py-0.5 font-mono text-xs font-bold text-rick-ink">
				{episode.episode}
			</span>
			<h3 className="relative mt-3 text-lg leading-snug font-semibold group-hover:text-portal-ink">
				{episode.name}
			</h3>
			<div className="relative mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-4 text-xs text-muted">
				<span className="flex items-center gap-1.5">
					<CalendarDays className="size-3.5" aria-hidden="true" />
					{formatAirDate(episode.air_date)}
				</span>
				<span className="flex items-center gap-1.5">
					<Users className="size-3.5" aria-hidden="true" />
					{episode.characters.length} karakter
				</span>
			</div>
		</Link>
	);
}

export default function EpisodesPage() {
	const { values, setValue, reset } = useListParams(DEFAULTS);
	const { data, isPending, isError, error, refetch } = useAllEpisodes();

	const seasons = [
		...new Set((data ?? []).map((ep) => parseEpisodeCode(ep.episode).season)),
	].sort((a, b) => a - b);
	const query = values.q.toLocaleLowerCase("tr");
	const filtered = (data ?? []).filter(
		(ep) =>
			(values.season === "all" ||
				parseEpisodeCode(ep.episode).season === Number(values.season)) &&
			(!query ||
				ep.name.toLocaleLowerCase("tr").includes(query) ||
				ep.episode.toLowerCase().includes(query)),
	);

	return (
		<>
			<Seo
				title="Bölümler | Rick & Morty"
				description="Rick and Morty'nin tüm bölümleri sezon sezon: yayın tarihleri, bölüm kodları ve rol alan karakterler."
				path="/episodes"
			/>
			<PageHeader
				eyebrow="Bölüm rehberi"
				title="Bütün bölümler"
				description="Sezonlara göre göz at, isim ya da bölüm koduyla (ör. S03E07) ara."
			>
				<SearchField
					label="Bölüm ara"
					placeholder="İsim veya kod…"
					value={values.q}
					onChange={(v) => setValue("q", v)}
					className="w-full lg:w-80"
				/>
			</PageHeader>

			{isPending ? (
				<Spinner label="Bölümler yükleniyor" />
			) : isError ? (
				<ErrorState error={error} onRetry={() => refetch()} />
			) : (
				<>
					<div
						role="group"
						aria-label="Sezon seç"
						className="-mx-4 mb-8 flex gap-2 overflow-x-auto px-4 pb-1"
					>
						{["all", ...seasons.map(String)].map((season) => {
							const active = values.season === season;
							return (
								<button
									key={season}
									type="button"
									aria-pressed={active}
									onClick={() => setValue("season", season)}
									className={cn(
										"shrink-0 cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
										active
											? "border-portal bg-portal text-on-portal"
											: "border-line bg-surface text-muted hover:border-portal/60 hover:text-fg",
									)}
								>
									{season === "all"
										? "Tüm sezonlar"
										: `Sezon ${season}`}
								</button>
							);
						})}
					</div>

					<p
						className="mb-4 flex items-center gap-2 text-sm text-muted"
						aria-live="polite"
					>
						<Clapperboard className="size-4" aria-hidden="true" />
						{filtered.length} bölüm listeleniyor
					</p>

					{filtered.length === 0 ? (
						<EmptyState
							title="Bölüm bulunamadı"
							description="Bu aramaya uyan bir bölüm yok. Farklı bir isim ya da kod dene."
							action={
								<Button variant="primary" onClick={reset}>
									Aramayı temizle
								</Button>
							}
						/>
					) : (
						<ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
							{filtered.map((episode) => (
								<li key={episode.id}>
									<EpisodeCard episode={episode} />
								</li>
							))}
						</ul>
					)}
				</>
			)}
		</>
	);
}
