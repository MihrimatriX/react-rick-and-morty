import type { Character } from "../types/character";
import StatusIcon from "./StatusIcon";
import BackToListLink from "./BackToListLink";
import RouteError from "./RouteError";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/Button";
import { useState, useEffect } from "react";
import {
	FaUser,
	FaGlobe,
	FaListUl,
	FaMapMarkerAlt,
	FaTv,
	FaVenusMars,
} from "react-icons/fa";
import getEpisodesFromAPI, {
	type Episode,
} from "../services/getEpisodesFromAPI";
import { Link } from "react-router-dom";
import Breadcrumb from "./Breadcrumb";
import LoadingSpinner from "./LoadingSpinner";

const statusColors: Record<string, string> = {
	Alive: "bg-green-500",
	Dead: "bg-red-500",
	unknown: "bg-gray-400",
};
const speciesColors: Record<string, string> = {
	Human: "bg-blue-500",
	Alien: "bg-purple-500",
	unknown: "bg-gray-400",
};
const genderColors: Record<string, string> = {
	Male: "bg-cyan-500",
	Female: "bg-pink-500",
	Genderless: "bg-yellow-500",
	unknown: "bg-gray-400",
};

interface CharacterDetailProps {
	char?: Character;
}

const CharacterDetail = ({ char }: CharacterDetailProps) => {
	const [episodes, setEpisodes] = useState<Episode[]>([]);
	const [open, setOpen] = useState(false);
	const [firstEp, setFirstEp] = useState<Episode | null>(null);
	const [lastEp, setLastEp] = useState<Episode | null>(null);

	useEffect(() => {
		if (char?.episodeUrls) {
			getEpisodesFromAPI().then((allEpisodes) => {
				const eps = allEpisodes.filter((ep) =>
					char.episodeUrls.includes(
						`https://rickandmortyapi.com/api/episode/${ep.id}`,
					),
				);
				setEpisodes(eps);
				if (eps.length > 0) {
					setFirstEp(eps[0]);
					setLastEp(eps[eps.length - 1]);
				}
			});
		}
	}, [char]);

	if (!char) {
		return (
			<>
				<div className="w-full max-w-2xl mx-auto flex flex-col items-start mt-6">
					<Breadcrumb />
					<BackToListLink />
				</div>
				<RouteError />
			</>
		);
	}

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<div className="w-full max-w-2xl mx-auto flex flex-col items-start mt-8 mb-6">
				<Breadcrumb />
				<BackToListLink />
			</div>
			{/* BLUR/GRADIENT BACKGROUND */}
			<div className="fixed inset-0 -z-10 flex justify-center items-center">
				<img
					src={char.img}
					alt=""
					className="w-full h-full object-cover blur-2xl scale-110 opacity-30 select-none pointer-events-none"
					aria-hidden="true"
				/>
				<div className="absolute inset-0 bg-gradient-to-b from-rick/80 to-bg-dark dark:from-morty/90 dark:to-bg-dark/95" />
			</div>
			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" />
				<Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-card-light dark:bg-card-dark p-8 rounded-2xl shadow-2xl w-[90vw] max-w-lg animate-scaleIn transition-colors duration-300">
					<Dialog.Title className="text-2xl font-bold mb-4 flex items-center gap-2 text-rick dark:text-morty">
						<FaUser className="text-rick dark:text-morty" />{" "}
						{char.name}
					</Dialog.Title>
					<div className="relative w-full flex justify-center mb-4">
						<img
							src={char.img}
							alt={char.name}
							className="w-40 h-40 object-cover rounded-xl shadow-lg transition-transform duration-500 hover:scale-110"
							loading="lazy"
						/>
						<span
							className={`absolute top-2 left-2 px-2 py-1 text-xs rounded-full text-white font-bold shadow ${char.status === "Alive" ? "bg-rick" : char.status === "Dead" ? "bg-evil" : "bg-portal"}`}
						>
							{char.status}
						</span>
						<span
							className={`absolute top-2 right-2 px-2 py-1 text-xs rounded-full text-white font-bold shadow ${char.species === "Human" ? "bg-morty" : char.species === "Alien" ? "bg-evil" : "bg-portal"}`}
						>
							{char.species}
						</span>
					</div>
					<div className="text-slate-800 dark:text-white space-y-3">
						<p className="flex items-center gap-2">
							<FaUser className="text-rick dark:text-morty" />
							<span className="font-bold">Status:</span>{" "}
							<span
								className={`px-2 py-1 rounded ${char.status === "Alive" ? "bg-rick" : char.status === "Dead" ? "bg-evil" : "bg-portal"} text-white`}
							>
								{char.status}
							</span>{" "}
							<StatusIcon char={char} />
						</p>
						<p className="flex items-center gap-2">
							<FaGlobe className="text-morty" />
							<span className="font-bold">Species:</span>{" "}
							<span
								className={`px-2 py-1 rounded ${char.species === "Human" ? "bg-morty" : char.species === "Alien" ? "bg-evil" : "bg-portal"} text-white`}
							>
								{char.species}
							</span>
						</p>
						<p className="flex items-center gap-2">
							<FaVenusMars className="text-evil" />
							<span className="font-bold">Gender:</span>{" "}
							<span
								className={`px-2 py-1 rounded ${char.gender === "Male" ? "bg-rick" : char.gender === "Female" ? "bg-evil" : "bg-portal"} text-white`}
							>
								{char.gender}
							</span>
						</p>
						<p className="flex items-center gap-2">
							<FaMapMarkerAlt className="text-morty" />
							<span className="font-bold">Origin:</span>{" "}
							{char.originUrl ? (
								<a
									href={char.originUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-rick dark:hover:text-morty transition"
									aria-label={`Origin: ${char.origin}`}
								>
									{char.origin}
								</a>
							) : (
								char.origin
							)}
						</p>
						<p className="flex items-center gap-2">
							<FaMapMarkerAlt className="text-portal" />
							<span className="font-bold">Location:</span>{" "}
							{char.locationUrl ? (
								<a
									href={char.locationUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-rick dark:hover:text-morty transition"
									aria-label={`Location: ${char.location}`}
								>
									{char.location}
								</a>
							) : (
								char.location
							)}
						</p>
						<p className="flex items-center gap-2">
							<FaListUl className="text-accent-light dark:text-accent-dark" />
							<span className="font-bold">No. of episodes:</span>{" "}
							{char.episodes}
						</p>
						{firstEp && lastEp && (
							<div className="flex flex-col gap-1 mt-3">
								<span className="text-sm text-rick dark:text-morty">
									İlk göründüğü bölüm:{" "}
									<Link
										to={`/episodes/${firstEp.id}`}
										className="underline hover:text-accent-light dark:hover:text-accent-dark transition"
									>
										{firstEp.episode} - {firstEp.name}
									</Link>
								</span>
								<span className="text-sm text-rick dark:text-morty">
									Son göründüğü bölüm:{" "}
									<Link
										to={`/episodes/${lastEp.id}`}
										className="underline hover:text-accent-light dark:hover:text-accent-dark transition"
									>
										{lastEp.episode} - {lastEp.name}
									</Link>
								</span>
							</div>
						)}
						{episodes.length > 0 && (
							<div className="mt-4">
								<div className="font-bold flex items-center gap-2 mb-2 text-rick dark:text-morty">
									<FaTv /> Göründüğü Bölümler:
								</div>
								<div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto scrollbar-thin scrollbar-thumb-rick dark:scrollbar-thumb-morty scrollbar-track-transparent rounded-md pr-1">
									{episodes.map((ep) => (
										<Link
											key={ep.id}
											to={`/episodes/${ep.id}`}
											className="px-2 py-1 rounded bg-rick/20 dark:bg-morty/20 text-rick dark:text-morty text-xs font-semibold shadow hover:bg-rick/40 dark:hover:bg-morty/40 transition-all duration-200 max-w-[140px] truncate whitespace-nowrap animate-fadeIn"
											title={ep.name}
										>
											{ep.episode} - {ep.name}
										</Link>
									))}
								</div>
							</div>
						)}
					</div>
					<Dialog.Close asChild>
						<Button
							type="button"
							className="mt-6 w-full bg-gradient-to-r from-rick to-morty dark:from-morty dark:to-rick text-white font-bold transition-transform duration-200 hover:scale-105 hover:shadow-lg"
						>
							Kapat
						</Button>
					</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
			<article className="flex items-center w-full max-w-2xl mx-auto p-8 bg-card-light/90 dark:bg-card-dark/90 rounded-2xl shadow-2xl max-md:flex-col max-md:w-full max-md:p-6 animate-fadeIn relative z-10 transition-all duration-300 hover:shadow-3xl">
				<img
					src={char.img}
					alt={char.name}
					className="w-[230px] rounded-xl max-md:order-1 transition-transform duration-500 hover:scale-110 shadow-xl"
				/>
				<div className="ml-8 p-0 text-left max-md:ml-0 max-md:text-center w-full">
					<div className="flex items-center justify-between max-md:flex-col max-md:gap-4">
						<h3 className="mt-0 text-3xl font-bold flex items-center gap-3 text-slate-900 dark:text-white">
							<FaUser className="text-rick dark:text-morty text-2xl" />
							{char.name}
						</h3>
						<Dialog.Trigger asChild>
							<Button
								type="button"
								className="px-6 py-3 rounded-xl bg-gradient-to-r from-rick to-morty dark:from-morty dark:to-rick text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
							>
								More Info
							</Button>
						</Dialog.Trigger>
					</div>
					<div className="flex flex-wrap gap-2 my-4">
						<span
							className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${char.status === "Alive" ? "bg-rick" : char.status === "Dead" ? "bg-evil" : "bg-portal"}`}
						>
							{char.status}
						</span>
						<span
							className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${char.species === "Human" ? "bg-morty" : char.species === "Alien" ? "bg-evil" : "bg-portal"}`}
						>
							{char.species}
						</span>
						<span
							className={`px-3 py-1 rounded-full text-white font-semibold text-sm ${char.gender === "Male" ? "bg-rick" : char.gender === "Female" ? "bg-evil" : "bg-portal"}`}
						>
							{char.gender}
						</span>
					</div>
					<div className="space-y-3 text-slate-700 dark:text-slate-200">
						<p className="flex items-center gap-3">
							<FaMapMarkerAlt className="text-morty text-lg" />
							<span className="font-bold">Origin:</span>{" "}
							{char.originUrl ? (
								<a
									href={char.originUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-rick dark:hover:text-morty transition"
									aria-label={`Origin: ${char.origin}`}
								>
									{char.origin}
								</a>
							) : (
								char.origin
							)}
						</p>
						<p className="flex items-center gap-3">
							<FaMapMarkerAlt className="text-portal text-lg" />
							<span className="font-bold">Location:</span>{" "}
							{char.locationUrl ? (
								<a
									href={char.locationUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="underline hover:text-rick dark:hover:text-morty transition"
									aria-label={`Location: ${char.location}`}
								>
									{char.location}
								</a>
							) : (
								char.location
							)}
						</p>
						<p className="flex items-center gap-3">
							<FaListUl className="text-accent-light dark:text-accent-dark text-lg" />
							<span className="font-bold">No. of episodes:</span>{" "}
							{char.episodes}
						</p>
					</div>
					{firstEp && lastEp && (
						<div className="flex flex-col gap-2 mt-4 p-4 bg-rick/10 dark:bg-morty/10 rounded-xl">
							<span className="text-sm text-rick dark:text-morty font-semibold">
								First appearance:{" "}
								<Link
									to={`/episodes/${firstEp.id}`}
									className="underline hover:text-accent-light dark:hover:text-accent-dark transition"
								>
									{firstEp.episode} - {firstEp.name}
								</Link>
							</span>
							<span className="text-sm text-rick dark:text-morty font-semibold">
								Last appearance:{" "}
								<Link
									to={`/episodes/${lastEp.id}`}
									className="underline hover:text-accent-light dark:hover:text-accent-dark transition"
								>
									{lastEp.episode} - {lastEp.name}
								</Link>
							</span>
						</div>
					)}
					{char.episodeUrls && episodes.length === 0 ? (
						<div className="mt-6">
							<div className="font-bold flex items-center gap-2 mb-3 text-rick dark:text-morty text-lg">
								<FaTv /> Episodes:
							</div>
							<div className="flex items-center justify-center p-4">
								<LoadingSpinner />
							</div>
						</div>
					) : (
						episodes.length > 0 && (
							<div className="mt-6">
								<div className="font-bold flex items-center gap-2 mb-3 text-rick dark:text-morty text-lg">
									<FaTv /> Episodes:
								</div>
								<div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto scrollbar-thin scrollbar-thumb-rick dark:scrollbar-thumb-morty scrollbar-track-transparent rounded-md pr-1">
									{episodes.map((ep) => (
										<Link
											key={ep.id}
											to={`/episodes/${ep.id}`}
											className="px-3 py-2 rounded-lg bg-rick/20 dark:bg-morty/20 text-rick dark:text-morty text-sm font-semibold shadow hover:bg-rick/40 dark:hover:bg-morty/40 transition-all duration-200 max-w-[160px] truncate whitespace-nowrap animate-fadeIn hover:scale-105"
											title={ep.name}
										>
											{ep.episode} - {ep.name}
										</Link>
									))}
								</div>
							</div>
						)
					)}
				</div>
			</article>
		</Dialog.Root>
	);
};

export default CharacterDetail;
