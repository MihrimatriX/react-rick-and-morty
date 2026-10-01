import { Earth, Orbit, Users } from "lucide-react";
import { Link } from "react-router";
import PageHeader from "../components/PageHeader";
import Pagination from "../components/Pagination";
import SearchField from "../components/SearchField";
import { EmptyState, ErrorState } from "../components/States";
import { Button } from "../components/ui/Button";
import { useListParams } from "../hooks/useListParams";
import type { Location } from "../lib/api";
import { cn } from "../lib/cn";
import { formatNumber, orUnknown } from "../lib/labels";
import { useLocations } from "../lib/queries";
import { Seo } from "../seo";

const DEFAULTS = { name: "", type: "", dimension: "" };

function LocationCard({ location }: { location: Location }) {
	return (
		<Link
			to={`/locations/${location.id}`}
			className="group flex h-full flex-col rounded-2xl border border-line bg-surface p-5 transition-all duration-300 hover:-translate-y-1 hover:border-portal/60 hover:shadow-[0_18px_40px_-20px_var(--portal)]"
		>
			<div className="flex items-start justify-between gap-3">
				<span className="grid size-11 shrink-0 place-items-center rounded-xl bg-portal/15 text-portal-ink transition-transform group-hover:rotate-12">
					<Earth className="size-5" aria-hidden="true" />
				</span>
				<span className="rounded-full border border-line px-2.5 py-0.5 text-xs font-medium text-muted">
					{orUnknown(location.type)}
				</span>
			</div>
			<h3 className="mt-4 text-lg leading-snug font-semibold group-hover:text-portal-ink">
				{location.name}
			</h3>
			<div className="mt-auto space-y-1.5 pt-4 text-xs text-muted">
				<p className="flex items-center gap-1.5">
					<Orbit className="size-3.5 shrink-0" aria-hidden="true" />
					<span className="truncate">{orUnknown(location.dimension)}</span>
				</p>
				<p className="flex items-center gap-1.5">
					<Users className="size-3.5 shrink-0" aria-hidden="true" />
					{location.residents.length} sakin
				</p>
			</div>
		</Link>
	);
}

function LocationGridSkeleton() {
	return (
		<div
			className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			role="status"
			aria-label="Konumlar yükleniyor"
		>
			{Array.from({ length: 8 }, (_, i) => (
				<div
					key={i}
					className="space-y-3 rounded-2xl border border-line bg-surface p-5"
					aria-hidden="true"
				>
					<div className="skeleton size-11 rounded-xl" />
					<div className="skeleton h-5 w-2/3 rounded-md" />
					<div className="skeleton h-3 w-1/2 rounded-md" />
				</div>
			))}
		</div>
	);
}

export default function LocationsPage() {
	const { values, page, setValue, setPage, reset } = useListParams(DEFAULTS);
	const { data, isPending, isError, error, refetch, isPlaceholderData } = useLocations({
		page,
		...values,
	});

	return (
		<>
			<Seo
				title="Konumlar | Rick & Morty"
				description="Rick and Morty evrenindeki gezegenler, istasyonlar ve boyutlar: tüm konumlar ve sakinleri."
				path="/locations"
			/>
			<PageHeader
				eyebrow="Boyutlar arası atlas"
				title="Konumlar"
				description={
					data
						? `${formatNumber(data.info.count)} gezegen, istasyon ve boyut. Sakinlerini görmek için birini seç.`
						: "Gezegenler, istasyonlar ve boyutlar."
				}
			>
				<div className="grid w-full gap-3 sm:grid-cols-2 lg:w-auto">
					<SearchField
						label="Konum adı"
						placeholder="Örn. Citadel, Earth…"
						value={values.name}
						onChange={(v) => setValue("name", v)}
						className="lg:w-64"
					/>
					<SearchField
						label="Tür"
						placeholder="Örn. Planet…"
						value={values.type}
						onChange={(v) => setValue("type", v)}
						className="lg:w-56"
					/>
				</div>
			</PageHeader>

			{isPending ? (
				<LocationGridSkeleton />
			) : isError ? (
				<ErrorState error={error} onRetry={() => refetch()} />
			) : data.results.length === 0 ? (
				<EmptyState
					title="Haritada böyle bir yer yok"
					description="Aramana uyan konum bulunamadı."
					action={
						<Button variant="primary" onClick={reset}>
							Aramayı temizle
						</Button>
					}
				/>
			) : (
				<>
					<ul
						className={cn(
							"grid gap-4 transition-opacity sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
							isPlaceholderData && "opacity-60",
						)}
					>
						{data.results.map((location) => (
							<li key={location.id}>
								<LocationCard location={location} />
							</li>
						))}
					</ul>
					<Pagination
						page={page}
						pages={data.info.pages}
						onPageChange={setPage}
					/>
				</>
			)}
		</>
	);
}
