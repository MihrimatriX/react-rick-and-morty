import { Clapperboard, Earth, Users } from "lucide-react";
import { Link } from "react-router";
import portalFaces from "../assets/portal-faces.webp";
import { formatNumber } from "../lib/labels";
import { useUniverseStats } from "../lib/queries";

function Stat({
	icon: Icon,
	value,
	label,
	to,
}: {
	icon: typeof Users;
	value: number | undefined;
	label: string;
	to: string;
}) {
	return (
		<Link
			to={to}
			className="group flex flex-col gap-2 rounded-2xl border border-line bg-surface/70 p-3 backdrop-blur transition-colors hover:border-portal/60 sm:flex-row sm:items-center sm:gap-3 sm:px-4"
		>
			<span className="grid size-9 shrink-0 place-items-center rounded-xl sm:size-10 bg-portal/15 text-portal-ink transition-transform group-hover:scale-110">
				<Icon className="size-5" aria-hidden="true" />
			</span>
			<span>
				<span className="block font-display text-xl leading-tight font-bold tabular-nums">
					{value === undefined ? (
						<span className="skeleton inline-block h-5 w-12 rounded align-middle" />
					) : (
						formatNumber(value)
					)}
				</span>
				<span className="text-xs text-muted">{label}</span>
			</span>
		</Link>
	);
}

export default function Hero() {
	const stats = useUniverseStats();

	return (
		<section className="relative isolate overflow-hidden pt-12 pb-6 sm:pt-16">
			<div className="bg-grid absolute inset-0 -z-10" aria-hidden="true" />
			<div className="grid items-center gap-10 lg:grid-cols-[1.25fr_1fr]">
				<div>
					<p className="inline-flex items-center gap-2 rounded-full border border-portal/40 bg-portal/10 px-3 py-1 text-xs font-semibold text-portal-ink">
						<span className="size-1.5 animate-pulse rounded-full bg-portal" />
						Çoklu evren rehberi
					</p>
					<h1 className="mt-5 text-4xl leading-[1.05] font-bold sm:text-5xl lg:text-6xl">
						Rick & Morty evrenini{" "}
						<span className="text-gradient">keşfet</span>
					</h1>
					<p className="mt-5 max-w-xl text-base text-muted sm:text-lg">
						Yüzlerce karakteri, tüm bölümleri ve boyutlar arası konumları tek
						yerde incele. Filtrele, favorilerini kaydet ve portaldan geç.
					</p>
					<div className="mt-8 grid max-w-xl grid-cols-3 gap-2 sm:gap-3">
						<Stat
							icon={Users}
							value={stats.characters}
							label="Karakter"
							to="/"
						/>
						<Stat
							icon={Clapperboard}
							value={stats.episodes}
							label="Bölüm"
							to="/episodes"
						/>
						<Stat
							icon={Earth}
							value={stats.locations}
							label="Konum"
							to="/locations"
						/>
					</div>
				</div>

				<div
					className="relative mx-auto hidden aspect-square w-full max-w-sm lg:block"
					aria-hidden="true"
				>
					<div className="absolute inset-6 animate-portal-spin rounded-full bg-[conic-gradient(from_0deg,var(--portal),var(--rick),var(--morty),var(--portal))] opacity-70 blur-2xl" />
					<div className="absolute inset-10 rounded-full bg-[radial-gradient(circle,color-mix(in_oklab,var(--portal)_55%,transparent),transparent_70%)]" />
					<img
						src={portalFaces}
						alt=""
						width={560}
						height={425}
						className="relative top-1/2 w-full -translate-y-1/2 animate-float drop-shadow-2xl select-none"
						draggable={false}
					/>
				</div>
			</div>
		</section>
	);
}
