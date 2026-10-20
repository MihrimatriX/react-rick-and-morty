import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

export interface Crumb {
	label: string;
	to?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
	return (
		<nav aria-label="Konumunuz" className="pt-8 text-sm">
			<ol className="flex flex-wrap items-center gap-1.5 text-muted">
				{items.map((item, i) => (
					<li
						key={`${item.label}-${i}`}
						className="flex min-w-0 items-center gap-1.5"
					>
						{i > 0 && (
							<ChevronRight
								className="size-3.5 shrink-0"
								aria-hidden="true"
							/>
						)}
						{item.to ? (
							<Link
								to={item.to}
								className="hover:text-fg hover:underline underline-offset-4"
							>
								{item.label}
							</Link>
						) : (
							<span
								aria-current="page"
								className="truncate font-medium text-fg"
							>
								{item.label}
							</span>
						)}
					</li>
				))}
			</ol>
		</nav>
	);
}
