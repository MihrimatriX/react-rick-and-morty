import { useCallback } from "react";
import { useSearchParams } from "react-router";

/**
 * Reads list filters and the page number from the URL so that every result
 * set is shareable and survives the back button.
 */
export function useListParams<K extends string>(defaults: Record<K, string>) {
	const [searchParams, setSearchParams] = useSearchParams();

	const values = Object.fromEntries(
		Object.entries<string>(defaults).map(([key, fallback]) => [
			key,
			searchParams.get(key) ?? fallback,
		]),
	) as Record<K, string>;

	const rawPage = Number(searchParams.get("page"));
	const page = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

	const setValue = useCallback(
		(key: K, value: string) => {
			setSearchParams(
				(prev) => {
					const next = new URLSearchParams(prev);
					if (!value || value === defaults[key]) next.delete(key);
					else next.set(key, value);
					// A new filter starts from the first page.
					next.delete("page");
					return next;
				},
				{ replace: true },
			);
		},
		[defaults, setSearchParams],
	);

	const setPage = useCallback(
		(nextPage: number) => {
			setSearchParams((prev) => {
				const next = new URLSearchParams(prev);
				if (nextPage <= 1) next.delete("page");
				else next.set("page", String(nextPage));
				return next;
			});
			window.scrollTo({ top: 0, behavior: "smooth" });
		},
		[setSearchParams],
	);

	const reset = useCallback(
		() => setSearchParams({}, { replace: true }),
		[setSearchParams],
	);

	const isFiltered = Object.entries<string>(defaults).some(
		([key, fallback]) => (searchParams.get(key) ?? fallback) !== fallback,
	);

	return { values, page, setValue, setPage, reset, isFiltered };
}
