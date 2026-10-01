export const API_BASE = "https://rickandmortyapi.com/api";

export type CharacterStatus = "Alive" | "Dead" | "unknown";
export type CharacterGender = "Female" | "Male" | "Genderless" | "unknown";

export interface ResourceRef {
	name: string;
	url: string;
}

export interface Character {
	id: number;
	name: string;
	status: CharacterStatus;
	species: string;
	type: string;
	gender: CharacterGender;
	origin: ResourceRef;
	location: ResourceRef;
	image: string;
	episode: string[];
	url: string;
	created: string;
}

export interface Episode {
	id: number;
	name: string;
	air_date: string;
	episode: string;
	characters: string[];
	url: string;
	created: string;
}

export interface Location {
	id: number;
	name: string;
	type: string;
	dimension: string;
	residents: string[];
	url: string;
	created: string;
}

export interface PageInfo {
	count: number;
	pages: number;
	next: string | null;
	prev: string | null;
}

export interface Paginated<T> {
	info: PageInfo;
	results: T[];
}

export class ApiError extends Error {
	readonly status: number;

	constructor(status: number, message: string) {
		super(message);
		this.name = "ApiError";
		this.status = status;
	}
}

const EMPTY_PAGE: Paginated<never> = {
	info: { count: 0, pages: 0, next: null, prev: null },
	results: [],
};

async function request<T>(path: string, signal?: AbortSignal): Promise<T> {
	const res = await fetch(`${API_BASE}${path}`, { signal });
	if (!res.ok) {
		throw new ApiError(res.status, `İstek başarısız oldu (${res.status})`);
	}
	return (await res.json()) as T;
}

function toQuery(params: Record<string, string | number | undefined>): string {
	const search = new URLSearchParams();
	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== "" && value !== "all") {
			search.set(key, String(value));
		}
	}
	const str = search.toString();
	return str ? `?${str}` : "";
}

/**
 * The API answers a filter without matches with a 404, which for a list view
 * simply means "no results".
 */
async function requestPage<T>(path: string, signal?: AbortSignal): Promise<Paginated<T>> {
	try {
		return await request<Paginated<T>>(path, signal);
	} catch (error) {
		if (error instanceof ApiError && error.status === 404) return EMPTY_PAGE;
		throw error;
	}
}

/** Extracts the numeric id at the end of an API resource url. */
export function idFromUrl(url: string): number | null {
	const match = /\/(\d+)\/?$/.exec(url);
	return match ? Number(match[1]) : null;
}

export function idsFromUrls(urls: string[]): number[] {
	return urls.map(idFromUrl).filter((id): id is number => id !== null);
}

/** Multi-id endpoints return an object for a single id and an array otherwise. */
async function requestMany<T>(
	resource: string,
	ids: number[],
	signal?: AbortSignal,
): Promise<T[]> {
	if (ids.length === 0) return [];
	const data = await request<T | T[]>(`/${resource}/${ids.join(",")}`, signal);
	return Array.isArray(data) ? data : [data];
}

export interface CharacterFilters {
	page?: number;
	name?: string;
	status?: string;
	gender?: string;
	species?: string;
}

export const getCharacters = (filters: CharacterFilters, signal?: AbortSignal) =>
	requestPage<Character>(`/character${toQuery({ ...filters })}`, signal);

export const getCharacter = (id: number, signal?: AbortSignal) =>
	request<Character>(`/character/${id}`, signal);

export const getCharactersByIds = (ids: number[], signal?: AbortSignal) =>
	requestMany<Character>("character", ids, signal);

export interface EpisodeFilters {
	page?: number;
	name?: string;
	episode?: string;
}

export const getEpisodes = (filters: EpisodeFilters, signal?: AbortSignal) =>
	requestPage<Episode>(`/episode${toQuery({ ...filters })}`, signal);

/** The whole show is only a few pages long, so episodes are loaded at once. */
export async function getAllEpisodes(signal?: AbortSignal): Promise<Episode[]> {
	const first = await getEpisodes({ page: 1 }, signal);
	const rest = await Promise.all(
		Array.from({ length: Math.max(first.info.pages - 1, 0) }, (_, i) =>
			getEpisodes({ page: i + 2 }, signal),
		),
	);
	return [first, ...rest].flatMap((page) => page.results);
}

export const getEpisode = (id: number, signal?: AbortSignal) =>
	request<Episode>(`/episode/${id}`, signal);

export const getEpisodesByIds = (ids: number[], signal?: AbortSignal) =>
	requestMany<Episode>("episode", ids, signal);

export interface LocationFilters {
	page?: number;
	name?: string;
	type?: string;
	dimension?: string;
}

export const getLocations = (filters: LocationFilters, signal?: AbortSignal) =>
	requestPage<Location>(`/location${toQuery({ ...filters })}`, signal);

export const getLocation = (id: number, signal?: AbortSignal) =>
	request<Location>(`/location/${id}`, signal);
