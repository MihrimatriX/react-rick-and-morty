import { Link } from "react-router";
import type { Episode } from "../lib/api";

export default function EpisodeChip({ episode }: { episode: Episode }) {
	return (
		<Link
			to={`/episodes/${episode.id}`}
			title={episode.name}
			className="group flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2 text-sm transition-colors hover:border-portal/60 hover:bg-surface-2"
		>
			<span className="shrink-0 rounded-md bg-rick/15 px-1.5 py-0.5 font-mono text-[0.7rem] font-bold text-rick-ink">
				{episode.episode}
			</span>
			<span className="truncate font-medium group-hover:text-portal-ink">
				{episode.name}
			</span>
		</Link>
	);
}
