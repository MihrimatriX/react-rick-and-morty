import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { clearFavorites, toggleFavorite } from "../hooks/useFavorites";
import { makeCharacter, makeEpisode, makeLocation, page } from "../test/fixtures";
import { mockApi, renderRoute } from "../test/utils";

const rick = makeCharacter();
const morty = makeCharacter({ id: 2, name: "Morty Smith" });
const pilot = makeEpisode();
const lawnmower = makeEpisode({ id: 2, name: "Lawnmower Dog", episode: "S01E02" });
const rickle = makeEpisode({ id: 12, name: "A Rickle in Time", episode: "S02E01" });

function mockUniverse() {
	return mockApi({
		"/character": (url) => {
			const name = url.searchParams.get("name");
			const all = [rick, morty];
			const results = name
				? all.filter((c) => c.name.toLowerCase().includes(name))
				: all;
			return results.length
				? {
						...page(results, 3),
						info: { ...page(results).info, count: 826, pages: 42 },
					}
				: undefined;
		},
		"/character/1": () => rick,
		"/character/1,2": () => [rick, morty],
		"/episode": () => page([pilot, lawnmower, rickle]),
		"/episode/1": () => pilot,
		"/episode/1,2": () => [pilot, lawnmower],
		"/location": () => page([makeLocation()]),
		"/location/3": () => makeLocation(),
	});
}

describe("characters page", () => {
	beforeEach(() => clearFavorites());

	it("lists characters with the universe totals", async () => {
		mockUniverse();
		renderRoute("/");

		expect(
			await screen.findByRole("link", { name: "Rick Sanchez" }),
		).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Morty Smith" })).toBeInTheDocument();
		expect(screen.getByText("826 karakter bulundu")).toBeInTheDocument();
		expect(screen.getByRole("navigation", { name: "Sayfalama" })).toBeInTheDocument();
	});

	it("reads filters from the url and sends them to the API", async () => {
		const fetchMock = mockUniverse();
		renderRoute("/?name=morty&status=Alive&page=2");

		expect(
			await screen.findByRole("link", { name: "Morty Smith" }),
		).toBeInTheDocument();
		expect(screen.getByLabelText("İsim")).toHaveValue("morty");
		expect(screen.getByLabelText("Durum")).toHaveValue("Alive");
		const urls = fetchMock.mock.calls.map(([url]) => String(url));
		expect(urls).toContain(
			"https://rickandmortyapi.com/api/character?page=2&name=morty&status=Alive",
		);
	});

	it("updates the url when a filter changes and can reset it", async () => {
		mockUniverse();
		const { router } = renderRoute("/?page=3");
		await screen.findByRole("link", { name: "Rick Sanchez" });

		fireEvent.change(screen.getByLabelText("Cinsiyet"), {
			target: { value: "Female" },
		});
		expect(router.state.location.search).toBe("?gender=Female");

		fireEvent.click(screen.getByRole("button", { name: "Sıfırla" }));
		expect(router.state.location.search).toBe("");
	});

	it("shows an empty state when nothing matches", async () => {
		mockUniverse();
		renderRoute("/?name=zzz");
		expect(await screen.findByText("Bu boyutta kimse yok")).toBeInTheDocument();
	});

	it("shows an error state with a retry button", async () => {
		mockApi({
			"/character": () => {
				throw new Error("offline");
			},
		});
		renderRoute("/");
		expect(await screen.findByRole("alert")).toHaveTextContent("Portal açılamadı");
		expect(screen.getByRole("button", { name: "Tekrar dene" })).toBeInTheDocument();
	});
});

describe("character page", () => {
	it("shows details, locations and episodes", async () => {
		mockUniverse();
		renderRoute("/character/1");

		expect(
			await screen.findByRole("heading", { level: 1, name: "Rick Sanchez" }),
		).toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Earth (C-137)" })).toHaveAttribute(
			"href",
			"/locations/1",
		);
		expect(await screen.findByText("İlk görünüm")).toBeInTheDocument();
		const episodes = screen.getByRole("region", { name: /Göründüğü bölümler/ });
		expect(
			within(episodes).getAllByRole("link", { name: /Lawnmower Dog/ }).length,
		).toBeGreaterThan(0);
		expect(document.title).toBe("Rick Sanchez | Rick & Morty");
	});

	it("shows not found for unknown characters", async () => {
		mockUniverse();
		renderRoute("/character/99999");
		expect(await screen.findByText("Bu karakter bulunamadı")).toBeInTheDocument();
	});

	it("redirects legacy /char/:id links", async () => {
		mockUniverse();
		const { router } = renderRoute("/char/1");
		await waitFor(() => expect(router.state.location.pathname).toBe("/character/1"));
	});
});

describe("episodes", () => {
	it("filters episodes by season and search", async () => {
		mockUniverse();
		renderRoute("/episodes");

		expect(await screen.findByText("Pilot")).toBeInTheDocument();
		expect(screen.getByText("3 bölüm listeleniyor")).toBeInTheDocument();

		fireEvent.click(screen.getByRole("button", { name: "Sezon 2" }));
		expect(screen.getByText("1 bölüm listeleniyor")).toBeInTheDocument();
		expect(screen.queryByText("Pilot")).not.toBeInTheDocument();
	});

	it("shows an episode with its cast", async () => {
		mockUniverse();
		renderRoute("/episodes/1");

		expect(
			await screen.findByRole("heading", { level: 1, name: "Pilot" }),
		).toBeInTheDocument();
		expect(screen.getByText("2 Aralık 2013")).toBeInTheDocument();
		expect(
			await screen.findByRole("link", { name: "Morty Smith" }),
		).toBeInTheDocument();
	});
});

describe("locations", () => {
	it("lists locations and shows residents", async () => {
		mockUniverse();
		renderRoute("/locations");
		fireEvent.click(await screen.findByRole("link", { name: /Citadel of Ricks/ }));

		expect(
			await screen.findByRole("heading", { level: 1, name: "Citadel of Ricks" }),
		).toBeInTheDocument();
		expect(
			await screen.findByRole("link", { name: "Rick Sanchez" }),
		).toBeInTheDocument();
	});
});

describe("favorites", () => {
	beforeEach(() => clearFavorites());

	it("explains how to add favorites when empty", async () => {
		mockUniverse();
		renderRoute("/favorites");
		expect(await screen.findByText("Henüz favorin yok")).toBeInTheDocument();
	});

	it("lists saved characters and removes them", async () => {
		mockUniverse();
		toggleFavorite(1);
		toggleFavorite(2);
		renderRoute("/favorites");

		expect(
			await screen.findByRole("link", { name: "Morty Smith" }),
		).toBeInTheDocument();
		fireEvent.click(
			screen.getByRole("button", { name: "Morty Smith favorilerden çıkar" }),
		);
		expect(
			screen.queryByRole("link", { name: "Morty Smith" }),
		).not.toBeInTheDocument();
		expect(screen.getByRole("link", { name: "Rick Sanchez" })).toBeInTheDocument();
	});
});

it("renders a 404 page for unknown routes", async () => {
	mockUniverse();
	renderRoute("/does-not-exist");
	expect(await screen.findByText("Başka bir evrende kayboldun!")).toBeInTheDocument();
	expect(screen.getByRole("link", { name: "Ana sayfaya dön" })).toHaveAttribute(
		"href",
		"/",
	);
});
