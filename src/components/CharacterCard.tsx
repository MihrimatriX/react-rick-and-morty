import { MapPin } from "lucide-react";
import { Link } from "react-router";
import type { Character } from "../lib/api";
import { cn } from "../lib/cn";
import { genderLabel, orUnknown, speciesLabel } from "../lib/labels";
import FavoriteButton from "./FavoriteButton";
import StatusBadge from "./StatusBadge";

interface CharacterCardProps {
	character: Character;
	className?: string;
}

export default function CharacterCard({ character, className }: CharacterCardProps) {
	const { id, name, image, status, species, gender, location } = character;

	return (
		<article
			className={cn(
				"group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-portal/60 hover:shadow-[0_18px_40px_-18px_var(--portal)]",
				className,
			)}
		>
			<div className="relative aspect-square overflow-hidden bg-surface-2">
				<img
					src={image}
					alt={name}
					width={300}
					height={300}
					loading="lazy"
					decoding="async"
					className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
				/>
				<div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent" />
				<StatusBadge status={status} className="absolute top-3 left-3" />
			</div>

			<div className="flex flex-1 flex-col gap-1.5 p-4">
				<h3 className="truncate text-lg leading-tight font-semibold">
					<Link
						to={`/character/${id}`}
						className="outline-none after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-portal"
					>
						{name}
					</Link>
				</h3>
				<p className="text-sm text-muted">
					{speciesLabel(species)} · {genderLabel(gender)}
				</p>
				<p className="mt-auto flex items-center gap-1.5 pt-2 text-xs text-muted">
					<MapPin
						className="size-3.5 shrink-0 text-rick-ink"
						aria-hidden="true"
					/>
					<span className="truncate">{orUnknown(location.name)}</span>
				</p>
			</div>

			<FavoriteButton
				id={id}
				name={name}
				className="absolute top-2.5 right-2.5 z-10 size-9 rounded-full border border-white/15 bg-black/45 text-white backdrop-blur-md hover:bg-black/65"
			/>
		</article>
	);
}

export function CharacterCardSkeleton() {
	return (
		<div
			className="overflow-hidden rounded-2xl border border-line bg-surface"
			aria-hidden="true"
		>
			<div className="skeleton aspect-square" />
			<div className="space-y-2.5 p-4">
				<div className="skeleton h-5 w-3/4 rounded-md" />
				<div className="skeleton h-4 w-1/2 rounded-md" />
				<div className="skeleton mt-4 h-3 w-2/3 rounded-md" />
			</div>
		</div>
	);
}
