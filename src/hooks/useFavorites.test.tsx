import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { clearFavorites, useFavorites } from "./useFavorites";

describe("useFavorites", () => {
	beforeEach(() => clearFavorites());

	it("toggles ids and persists them", () => {
		const { result } = renderHook(() => useFavorites());
		expect(result.current.ids).toEqual([]);

		act(() => result.current.toggleFavorite(1));
		act(() => result.current.toggleFavorite(5));
		expect(result.current.ids).toEqual([1, 5]);
		expect(result.current.isFavorite(5)).toBe(true);
		expect(JSON.parse(localStorage.getItem("favorites")!)).toEqual([1, 5]);

		act(() => result.current.toggleFavorite(1));
		expect(result.current.ids).toEqual([5]);
	});

	it("picks up changes made in another tab", () => {
		const { result } = renderHook(() => useFavorites());
		act(() => {
			window.dispatchEvent(
				new StorageEvent("storage", {
					key: "favorites",
					newValue: '[3, "x", 4]',
				}),
			);
		});
		expect(result.current.ids).toEqual([3, 4]);
	});
});
