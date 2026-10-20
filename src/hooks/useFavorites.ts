import { useCallback, useSyncExternalStore } from "react";
import { readStorage, writeStorage } from "../lib/storage";

const STORAGE_KEY = "favorites";
const EMPTY: readonly number[] = [];
const listeners = new Set<() => void>();

function parse(raw: string | null): readonly number[] {
	if (!raw) return EMPTY;
	try {
		const value: unknown = JSON.parse(raw);
		return Array.isArray(value)
			? value.filter((id): id is number => Number.isInteger(id) && id > 0)
			: EMPTY;
	} catch {
		return EMPTY;
	}
}

let favorites: readonly number[] =
	typeof window !== "undefined" ? parse(readStorage(STORAGE_KEY)) : EMPTY;

function emit() {
	listeners.forEach((listener) => listener());
}

// Keep other tabs in sync.
if (typeof window !== "undefined") {
	window.addEventListener("storage", (event) => {
		if (event.key !== STORAGE_KEY) return;
		favorites = parse(event.newValue);
		emit();
	});
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export function toggleFavorite(id: number) {
	favorites = favorites.includes(id)
		? favorites.filter((fav) => fav !== id)
		: [...favorites, id];
	writeStorage(STORAGE_KEY, JSON.stringify(favorites));
	emit();
}

export function clearFavorites() {
	favorites = EMPTY;
	writeStorage(STORAGE_KEY, "[]");
	emit();
}

export function useFavorites() {
	const ids = useSyncExternalStore(
		subscribe,
		() => favorites,
		() => EMPTY,
	);
	const isFavorite = useCallback((id: number) => ids.includes(id), [ids]);
	return { ids, isFavorite, toggleFavorite, clearFavorites };
}
