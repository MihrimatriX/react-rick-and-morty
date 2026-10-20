import { House } from "lucide-react";
import { Link } from "react-router";
import { useSeo } from "../seo";
import { EmptyState } from "./States";
import { buttonClasses } from "./ui/button-classes";

interface NotFoundProps {
	title?: string;
	description?: string;
}

export default function NotFound({
	title = "Başka bir evrende kayboldun!",
	description = "Aradığın sayfa bu boyutta yok. Portalı kullanıp ana sayfaya dönebilirsin.",
}: NotFoundProps) {
	useSeo({ title: "Sayfa bulunamadı | Rick & Morty", description, noindex: true });

	return (
		<div className="py-16">
			<p className="mb-2 text-center font-display text-7xl font-bold text-gradient">
				404
			</p>
			<EmptyState
				title={title}
				description={description}
				className="border-none"
				action={
					<Link to="/" className={buttonClasses("primary")}>
						<House className="size-4" aria-hidden="true" />
						Ana sayfaya dön
					</Link>
				}
			/>
		</div>
	);
}
