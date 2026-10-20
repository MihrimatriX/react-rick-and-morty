import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

interface BadgeProps {
	children: ReactNode;
	className?: string;
	icon?: ReactNode;
}

export function Badge({ children, className, icon }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/80 px-2.5 py-1 text-xs font-medium text-fg backdrop-blur",
				className,
			)}
		>
			{icon}
			{children}
		</span>
	);
}
