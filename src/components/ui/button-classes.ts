import { cn } from "../../lib/cn";

export type Variant = "primary" | "secondary" | "ghost";
export type Size = "sm" | "md" | "icon";

const VARIANTS: Record<Variant, string> = {
	primary:
		"bg-portal text-on-portal shadow-[0_8px_30px_-10px_var(--portal)] hover:brightness-105 active:brightness-95",
	secondary:
		"border border-line bg-surface text-fg hover:border-portal/60 hover:bg-surface-2",
	ghost: "text-muted hover:bg-surface-2 hover:text-fg",
};

const SIZES: Record<Size, string> = {
	sm: "h-9 gap-1.5 rounded-lg px-3 text-sm",
	md: "h-11 gap-2 rounded-xl px-4 text-sm",
	icon: "size-10 rounded-xl",
};

export function buttonClasses(variant: Variant = "secondary", size: Size = "md") {
	return cn(
		"inline-flex shrink-0 cursor-pointer items-center justify-center font-semibold transition-all duration-200 disabled:pointer-events-none disabled:opacity-40",
		VARIANTS[variant],
		SIZES[size],
	);
}
