import { cn } from "../lib/cn";
import { statusLabel } from "../lib/labels";

const DOT: Record<string, string> = {
	Alive: "bg-emerald-500 ring-3 ring-emerald-500/25",
	Dead: "bg-danger ring-3 ring-danger/25",
};

interface StatusBadgeProps {
	status: string;
	className?: string;
}

export function StatusDot({ status }: { status: string }) {
	return (
		<span
			aria-hidden="true"
			className={cn(
				"size-2 rounded-full",
				DOT[status] ?? "bg-muted ring-3 ring-muted/20",
			)}
		/>
	);
}

export default function StatusBadge({ status, className }: StatusBadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md",
				className,
			)}
		>
			<StatusDot status={status} />
			{statusLabel(status)}
		</span>
	);
}
