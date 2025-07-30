import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import RouteError from "./RouteError";
import Breadcrumb from "./Breadcrumb";
import LoadingSpinner from "./LoadingSpinner";
import BackToListLink from "./BackToListLink";

interface CharacterRef {
	id: string;
	name: string;
	img?: string;
}

interface EpisodeApi {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
}

const fetchEpisode = async (id: string): Promise<EpisodeApi> => {
	const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
	if (!res.ok) throw new Error("Episode not found");
	return res.json();
};

const fetchCharacter = async (url: string): Promise<CharacterRef> => {
	const res = await fetch(url);
	if (!res.ok) return { id: url.split("/").pop() || "", name: "Unknown" };
	const data = await res.json();
	return { id: String(data.id), name: data.name, img: data.image };
};

const MAX_VISIBLE = 10;

const EpisodeDetail = () => {
	const { id } = useParams<{ id: string }>();
	const [episode, setEpisode] = useState<EpisodeApi | null>(null);
	const [characters, setCharacters] = useState<CharacterRef[]>([]);
	const [showAll, setShowAll] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (!id) {
			setError(true);
			setLoading(false);
			return;
		}
		setLoading(true);
		setError(false);
		fetchEpisode(id)
			.then(async (ep) => {
				setEpisode(ep);
				const charUrls = showAll
					? ep.characters
					: ep.characters.slice(0, MAX_VISIBLE);
				const charData = await Promise.all(
					charUrls.map(fetchCharacter),
				);
				setCharacters(charData);
			})
			.catch(() => setError(true))
			.finally(() => setLoading(false));
	}, [id, showAll]);

	if (loading) return <LoadingSpinner />;
	if (error || !episode) return <RouteError />;

	const hiddenCount = episode.characters.length - MAX_VISIBLE;

	return (
		<div className="flex flex-col items-center justify-center min-h-[60vh] px-4 animate-fadeIn">
			<div className="w-full max-w-xl mx-auto flex flex-col items-start mt-6">
				<Breadcrumb />
				<BackToListLink />
			</div>
			<div className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg p-8 max-w-xl w-full transition-colors duration-300">
				<h1 className="text-3xl font-bold text-accent-light dark:text-accent-dark mb-2">
					{episode.episode} - {episode.name}
				</h1>
				<p className="text-slate-700 dark:text-slate-200 mb-2">
					<span className="font-semibold">Air Date:</span>{" "}
					{episode.air_date}
				</p>
				<p className="text-slate-700 dark:text-slate-200 mb-4">
					<span className="font-semibold">Characters:</span>
				</p>
				<div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto scrollbar-thin scrollbar-thumb-rick dark:scrollbar-thumb-morty scrollbar-track-transparent rounded-md pr-1">
					{characters.map((char) => (
						<Link
							key={char.id}
							to={`/character/${char.id}`}
							className="flex items-center gap-1 px-2 py-1 rounded bg-rick/20 dark:bg-morty/20 text-rick dark:text-morty text-xs font-semibold shadow hover:bg-rick/40 dark:hover:bg-morty/40 transition-all duration-200 max-w-[180px] truncate whitespace-nowrap animate-fadeIn"
						>
							{char.img && (
								<img
									src={char.img}
									alt={char.name}
									className="w-5 h-5 rounded-full object-cover mr-1"
								/>
							)}
							{char.name}
						</Link>
					))}
					{!showAll && hiddenCount > 0 && (
						<button
							className="px-2 py-1 rounded bg-accent-light dark:bg-accent-dark text-white text-xs font-semibold shadow animate-fadeIn hover:bg-rick dark:hover:bg-morty transition"
							onClick={() => setShowAll(true)}
						>
							+{hiddenCount} more
						</button>
					)}
				</div>
				<Link
					to="/"
					className="mt-8 inline-block px-6 py-2 rounded-lg bg-gradient-to-r from-rick to-morty dark:from-morty dark:to-rick text-white font-semibold shadow hover:bg-accent-light dark:hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark transition text-base animate-fadeIn"
				>
					Return to Home Page
				</Link>
			</div>
		</div>
	);
};

export default EpisodeDetail;
