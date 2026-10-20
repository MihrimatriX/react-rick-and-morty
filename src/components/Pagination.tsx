import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../lib/cn";
import { pageWindow } from "../lib/pagination";
import { buttonClasses } from "./ui/button-classes";

interface PaginationProps {
	page: number;
	pages: number;
	onPageChange: (page: number) => void;
}

export default function Pagination({ page, pages, onPageChange }: PaginationProps) {
	if (pages <= 1) return null;

	return (
		<nav
			aria-label="Sayfalama"
			className="mt-12 flex items-center justify-center gap-1.5"
		>
			<button
				type="button"
				className={cn(buttonClasses("secondary", "sm"), "px-2.5")}
				disabled={page <= 1}
				onClick={() => onPageChange(page - 1)}
				aria-label="Önceki sayfa"
			>
				<ChevronLeft className="size-4" aria-hidden="true" />
				<span className="hidden sm:inline">Önceki</span>
			</button>

			<ol className="flex items-center gap-1">
				{pageWindow(page, pages).map((n, i) =>
					n === null ? (
						<li
							key={`gap-${i}`}
							className="w-6 text-center text-muted"
							aria-hidden="true"
						>
							…
						</li>
					) : (
						<li
							key={n}
							className={cn(
								Math.abs(n - page) > 1 &&
									n !== 1 &&
									n !== pages &&
									"max-sm:hidden",
							)}
						>
							<button
								type="button"
								onClick={() => onPageChange(n)}
								aria-current={n === page ? "page" : undefined}
								aria-label={`Sayfa ${n}`}
								className={cn(
									"grid h-9 min-w-9 cursor-pointer place-items-center rounded-lg px-2 text-sm font-semibold tabular-nums transition-colors",
									n === page
										? "bg-portal text-on-portal"
										: "text-muted hover:bg-surface-2 hover:text-fg",
								)}
							>
								{n}
							</button>
						</li>
					),
				)}
			</ol>

			<button
				type="button"
				className={cn(buttonClasses("secondary", "sm"), "px-2.5")}
				disabled={page >= pages}
				onClick={() => onPageChange(page + 1)}
				aria-label="Sonraki sayfa"
			>
				<span className="hidden sm:inline">Sonraki</span>
				<ChevronRight className="size-4" aria-hidden="true" />
			</button>
		</nav>
	);
}
