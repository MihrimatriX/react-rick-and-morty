import { describe, expect, it, vi } from "vitest";
import { mockApi } from "../test/utils";
import { makeCharacter, page } from "../test/fixtures";
import {
	ApiError,
	getAllEpisodes,
	getCharacter,
	getCharacters,
	getCharactersByIds,
	idFromUrl,
	idsFromUrls,
} from "./api";

describe("idFromUrl", () => {
	it("reads the trailing numeric id", () => {
		expect(idFromUrl("https://rickandmortyapi.com/api/location/20")).toBe(20);
		expect(idFromUrl("https://rickandmortyapi.com/api/episode/7/")).toBe(7);
	});

	it("returns null for empty or id-less urls", () => {
		expect(idFromUrl("")).toBeNull();
		expect(idFromUrl("https://rickandmortyapi.com/api/location")).toBeNull();
	});

	it("drops urls without ids from a list", () => {
		expect(idsFromUrls(["", ".../character/2", ".../character/9"])).toEqual([2, 9]);
	});
});

describe("getCharacters", () => {
	it("sends only the filters that are set", async () => {
		const fetchMock = mockApi({ "/character": () => page([makeCharacter()]) });
		await getCharacters({ page: 2, name: "rick", status: "all", gender: "" });
		expect(String(fetchMock.mock.calls[0][0])).toBe(
			"https://rickandmortyapi.com/api/character?page=2&name=rick",
		);
	});

	it("treats a 404 as an empty result set", async () => {
		mockApi({});
		const result = await getCharacters({ name: "nobody" });
		expect(result.results).toEqual([]);
		expect(result.info.count).toBe(0);
	});

	it("throws an ApiError on server errors", async () => {
		vi.stubGlobal(
			"fetch",
			vi.fn(async () => new Response("", { status: 500 })),
		);
		await expect(getCharacters({})).rejects.toBeInstanceOf(ApiError);
	});
});

describe("getCharacter", () => {
	it("rejects with status 404 for unknown ids", async () => {
		mockApi({});
		await expect(getCharacter(99999)).rejects.toMatchObject({ status: 404 });
	});
});

describe("getCharactersByIds", () => {
	it("wraps the single-object response of one id in an array", async () => {
		mockApi({ "/character/1": () => makeCharacter() });
		await expect(getCharactersByIds([1])).resolves.toHaveLength(1);
	});

	it("requests several ids at once", async () => {
		const fetchMock = mockApi({
			"/character/1,2": () => [makeCharacter(), makeCharacter({ id: 2 })],
		});
		await expect(getCharactersByIds([1, 2])).resolves.toHaveLength(2);
		expect(fetchMock).toHaveBeenCalledTimes(1);
	});

	it("skips the request for an empty list", async () => {
		const fetchMock = mockApi({});
		await expect(getCharactersByIds([])).resolves.toEqual([]);
		expect(fetchMock).not.toHaveBeenCalled();
	});
});

describe("getAllEpisodes", () => {
	it("loads every page", async () => {
		const fetchMock = mockApi({
			"/episode": (url) => ({
				info: { count: 3, pages: 3, next: null, prev: null },
				results: [{ id: Number(url.searchParams.get("page")) }],
			}),
		});
		const episodes = await getAllEpisodes();
		expect(episodes.map((ep) => ep.id)).toEqual([1, 2, 3]);
		expect(fetchMock).toHaveBeenCalledTimes(3);
	});
});
