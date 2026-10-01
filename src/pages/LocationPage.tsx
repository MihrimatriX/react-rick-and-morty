import { Earth, Orbit, Users } from "lucide-react";
import { useParams } from "react-router";
import Breadcrumbs from "../components/Breadcrumbs";
import CastSection from "../components/CastSection";
import InfoTile from "../components/InfoTile";
import NotFound from "../components/NotFound";
import { ErrorState, Spinner } from "../components/States";
import { ApiError, type Location } from "../lib/api";
import { orUnknown } from "../lib/labels";
import { useLocation } from "../lib/queries";
import { absUrl, useSeo } from "../seo";

function LocationView({ location }: { location: Location }) {
	const { id, name, type, dimension, residents } = location;
	const description = `${name} (${orUnknown(type)}, ${orUnknown(dimension)}): Rick and Morty evrenindeki bu konumun ${residents.length} sakinini keşfet.`;

	useSeo({
		title: `${name} | Rick & Morty`,
		description,
		path: `/locations/${id}`,
		type: "article",
		jsonLd: {
			"@context": "https://schema.org",
			"@type": "Place",
			name,
			description,
			url: absUrl(`/locations/${id}`),
		},
	});

	return (
		<>
			<Breadcrumbs
				items={[{ label: "Konumlar", to: "/locations" }, { label: name }]}
			/>

			<header className="relative mt-6 overflow-hidden rounded-3xl border border-line bg-surface/80 p-6 shadow-sm backdrop-blur sm:p-10">
				<div
					className="absolute -top-24 -right-24 size-72 rounded-full bg-rick/25 blur-3xl"
					aria-hidden="true"
				/>
				<span className="relative inline-flex items-center gap-2 rounded-full bg-portal/15 px-3 py-1 text-sm font-semibold text-portal-ink">
					<Earth className="size-4" aria-hidden="true" />
					{orUnknown(type)}
				</span>
				<h1 className="relative mt-4 text-4xl font-bold sm:text-5xl">{name}</h1>
				<dl className="relative mt-8 grid gap-3 sm:grid-cols-3">
					<InfoTile icon={Earth} label="Tür">
						{orUnknown(type)}
					</InfoTile>
					<InfoTile icon={Orbit} label="Boyut">
						{orUnknown(dimension)}
					</InfoTile>
					<InfoTile icon={Users} label="Sakin sayısı">
						{residents.length}
					</InfoTile>
				</dl>
			</header>

			<CastSection
				title="Sakinler"
				urls={residents}
				emptyText="Bu konumda kayıtlı bir sakin yok."
			/>
		</>
	);
}

export default function LocationPage() {
	const id = Number(useParams().id);
	const { data, isPending, isError, error, refetch } = useLocation(id);

	if (
		!Number.isInteger(id) ||
		id <= 0 ||
		(error instanceof ApiError && error.status === 404)
	) {
		return (
			<NotFound title="Bu konum bulunamadı" description="Bu konum haritada yok." />
		);
	}
	if (isError) {
		return (
			<div className="py-12">
				<ErrorState error={error} onRetry={() => refetch()} />
			</div>
		);
	}
	if (isPending) return <Spinner label="Konum yükleniyor" />;

	return <LocationView location={data} />;
}
