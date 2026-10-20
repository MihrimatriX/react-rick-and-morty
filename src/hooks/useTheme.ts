import { useSyncExternalStore } from "react";
import { readStorage, writeStorage } from "../lib/storage";

export type Theme = "light" | "dark" | "system";

const STORAGE_KEY = "theme";
const listeners = new Set<() => void>();
const media =
	typeof window !== "undefined" && typeof window.matchMedia === "function"
		? window.matchMedia("(prefers-color-scheme: dark)")
		: null;

function readTheme(): Theme {
	const stored = readStorage(STORAGE_KEY);
	if (stored === "light" || stored === "dark") return stored;
	return "system";
}

let current: Theme = typeof window !== "undefined" ? readTheme() : "system";

export function resolveTheme(theme: Theme): "light" | "dark" {
	if (theme !== "system") return theme;
	return media?.matches ? "dark" : "light";
}

function applyTheme() {
	const resolved = resolveTheme(current);
	const root = document.documentElement;
	root.classList.toggle("dark", resolved === "dark");
	root.style.colorScheme = resolved;
}

function emit() {
	applyTheme();
	listeners.forEach((listener) => listener());
}

media?.addEventListener("change", () => {
	if (current === "system") emit();
});

export function setTheme(theme: Theme) {
	current = theme;
	writeStorage(STORAGE_KEY, theme);
	emit();
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

export function initTheme() {
	applyTheme();
}

export function useTheme() {
	const theme = useSyncExternalStore(
		subscribe,
		() => current,
		() => "system" as Theme,
	);
	return { theme, resolved: resolveTheme(theme), setTheme };
}
