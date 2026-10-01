import { QueryClient, keepPreviousData, useQuery } from "@tanstack/react-query";
import {
	ApiError,
	getAllEpisodes,
	getCharacter,
	getCharacters,
	getCharactersByIds,
	getEpisode,
	getEpisodesByIds,
	getLocation,
	getLocations,
	type CharacterFilters,
	type LocationFilters,
} from "./api";

export function createQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 10,
				gcTime: 1000 * 60 * 30,
				refetchOnWindowFocus: false,
				// A missing resource will not appear on a retry.
				retry: (failureCount, error) =>
					!(error instanceof ApiError && error.status === 404) &&
					failureCount < 2,
			},
		},
	});
}

const isValidId = (id: number) => Number.isInteger(id) && id > 0;

/** Drops empty filters so equivalent requests share one cache entry. */
function compact<T extends object>(filters: T): Partial<T> {
	return Object.fromEntries(
		Object.entries(filters).filter(
			([, v]) => v !== undefined && v !== "" && v !== "all",
		),
	) as Partial<T>;
}

export function useCharacters(input: CharacterFilters) {
	const filters = compact(input);
	return useQuery({
		queryKey: ["characters", filters],
		queryFn: ({ signal }) => getCharacters(filters, signal),
		placeholderData: keepPreviousData,
	});
}

export function useCharacter(id: number) {
	return useQuery({
		queryKey: ["character", id],
		queryFn: ({ signal }) => getCharacter(id, signal),
		enabled: isValidId(id),
	});
}

export function useCharactersByIds(ids: number[]) {
	return useQuery({
		queryKey: ["characters", "byIds", ids],
		queryFn: ({ signal }) => getCharactersByIds(ids, signal),
		enabled: ids.length > 0,
		placeholderData: keepPreviousData,
	});
}

export function useAllEpisodes() {
	return useQuery({
		queryKey: ["episodes", "all"],
		queryFn: ({ signal }) => getAllEpisodes(signal),
		staleTime: Infinity,
	});
}

export function useEpisode(id: number) {
	return useQuery({
		queryKey: ["episode", id],
		queryFn: ({ signal }) => getEpisode(id, signal),
		enabled: isValidId(id),
	});
}

export function useEpisodesByIds(ids: number[]) {
	return useQuery({
		queryKey: ["episodes", "byIds", ids],
		queryFn: ({ signal }) => getEpisodesByIds(ids, signal),
		enabled: ids.length > 0,
	});
}

export function useLocations(input: LocationFilters) {
	const filters = compact(input);
	return useQuery({
		queryKey: ["locations", filters],
		queryFn: ({ signal }) => getLocations(filters, signal),
		placeholderData: keepPreviousData,
	});
}

export function useLocation(id: number) {
	return useQuery({
		queryKey: ["location", id],
		queryFn: ({ signal }) => getLocation(id, signal),
		enabled: isValidId(id),
	});
}

/** Totals shown in the hero, sharing cache entries with the list pages. */
export function useUniverseStats() {
	const characters = useCharacters({ page: 1 });
	const locations = useLocations({ page: 1 });
	const episodes = useAllEpisodes();
	return {
		characters: characters.data?.info.count,
		locations: locations.data?.info.count,
		episodes: episodes.data?.length,
	};
}
