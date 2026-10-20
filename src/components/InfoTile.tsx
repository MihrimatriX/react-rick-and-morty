import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface InfoTileProps {
	icon: LucideIcon;
	label: string;
	children: ReactNode;
}

export default function InfoTile({ icon: Icon, label, children }: InfoTileProps) {
	return (
		<div className="flex items-start gap-3 rounded-2xl border border-line bg-surface-2/60 p-4">
			<span className="grid size-9 shrink-0 place-items-center rounded-xl bg-surface text-rick-ink shadow-sm">
				<Icon className="size-4.5" aria-hidden="true" />
			</span>
			<div className="min-w-0">
				<dt className="text-xs font-medium text-muted">{label}</dt>
				<dd className="mt-0.5 font-semibold break-words">{children}</dd>
			</div>
		</div>
	);
}
