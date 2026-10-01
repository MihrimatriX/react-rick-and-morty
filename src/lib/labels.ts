import type { CharacterGender, CharacterStatus } from "./api";

export const STATUS_LABELS: Record<CharacterStatus, string> = {
	Alive: "Hayatta",
	Dead: "Ölü",
	unknown: "Bilinmiyor",
};

export const GENDER_LABELS: Record<CharacterGender, string> = {
	Female: "Kadın",
	Male: "Erkek",
	Genderless: "Cinsiyetsiz",
	unknown: "Bilinmiyor",
};

export const SPECIES_LABELS: Record<string, string> = {
	Human: "İnsan",
	Alien: "Uzaylı",
	Humanoid: "İnsansı",
	Robot: "Robot",
	Animal: "Hayvan",
	"Mythological Creature": "Mitolojik Yaratık",
	Poopybutthole: "Poopybutthole",
	Cronenberg: "Cronenberg",
	Disease: "Hastalık",
	unknown: "Bilinmiyor",
};

const UNKNOWN = "Bilinmiyor";

export const statusLabel = (status: string) =>
	STATUS_LABELS[status as CharacterStatus] ?? status;

export const genderLabel = (gender: string) =>
	GENDER_LABELS[gender as CharacterGender] ?? gender;

export const speciesLabel = (species: string) => SPECIES_LABELS[species] ?? species;

/** The API uses "unknown" or an empty string for missing values. */
export const orUnknown = (value: string | undefined) =>
	!value || value === "unknown" ? UNKNOWN : value;

export function parseEpisodeCode(code: string) {
	const match = /^S(\d+)E(\d+)$/i.exec(code);
	return match
		? { season: Number(match[1]), episode: Number(match[2]) }
		: { season: 0, episode: 0 };
}

export function formatEpisodeCode(code: string) {
	const { season, episode } = parseEpisodeCode(code);
	return season ? `Sezon ${season} · Bölüm ${episode}` : code;
}

const airDateFormatter = new Intl.DateTimeFormat("tr-TR", {
	day: "numeric",
	month: "long",
	year: "numeric",
});

/** Air dates come as e.g. "December 2, 2013". */
export function formatAirDate(airDate: string) {
	const date = new Date(airDate);
	return Number.isNaN(date.getTime()) ? airDate : airDateFormatter.format(date);
}

export const formatNumber = (value: number) => value.toLocaleString("tr-TR");
