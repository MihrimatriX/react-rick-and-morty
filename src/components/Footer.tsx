import { ExternalLink } from "lucide-react";

export default function Footer() {
	return (
		<footer className="mt-24 border-t border-line/70">
			<div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
				<p>
					Wubba lubba dub dub! Veriler{" "}
					<a
						href="https://rickandmortyapi.com/"
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center gap-1 font-medium text-fg underline-offset-4 hover:text-portal-ink hover:underline"
					>
						The Rick and Morty API
						<ExternalLink className="size-3.5" aria-hidden="true" />
					</a>{" "}
					üzerinden canlı olarak gelir.
				</p>
				<p>
					Rick and Morty, Adult Swim'in tescilli markasıdır. Bu bir hayran
					projesidir.
				</p>
			</div>
		</footer>
	);
}
