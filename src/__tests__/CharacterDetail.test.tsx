import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterDetail from "../components/CharacterDetail";
import type { Character } from "../types/character";

// Mock getEpisodesFromAPI
jest.mock("../services/getEpisodesFromAPI", () => ({
	__esModule: true,
	default: jest.fn(() =>
		Promise.resolve([
			{ id: 1, name: "Pilot", episode: "S01E01", air_date: "2013-12-02" },
		])
	),
}));

describe("CharacterDetail", () => {
	const mockChar: Character = {
		id: 1,
		name: "Rick Sanchez",
		img: "rick.jpg",
		status: "Alive",
		species: "Human",
		gender: "Male",
		origin: "Earth",
		originUrl: "https://rickandmortyapi.com/api/location/1",
		location: "Earth",
		locationUrl: "https://rickandmortyapi.com/api/location/1",
		episodes: 5,
		episodeUrls: ["https://rickandmortyapi.com/api/episode/1"],
	};

	test("renders character information", () => {
		render(
			<MemoryRouter>
				<CharacterDetail char={mockChar} />
			</MemoryRouter>
		);
		expect(screen.getByText("Rick Sanchez")).toBeInTheDocument();
		expect(screen.getByText("Alive")).toBeInTheDocument();
		expect(screen.getByText("Human")).toBeInTheDocument();
		expect(screen.getByText("Male")).toBeInTheDocument();
	});

	test("renders dialog trigger button", () => {
		render(
			<MemoryRouter>
				<CharacterDetail char={mockChar} />
			</MemoryRouter>
		);
		expect(screen.getByText("More Info")).toBeInTheDocument();
	});

	test("shows loading spinner when episodes are loading", () => {
		render(
			<MemoryRouter>
				<CharacterDetail char={mockChar} />
			</MemoryRouter>
		);
		expect(screen.getByLabelText(/loading/i)).toBeInTheDocument();
	});

	test("renders RouteError when character is not found", () => {
		render(
			<MemoryRouter>
				<CharacterDetail char={undefined} />
			</MemoryRouter>
		);
		expect(
			screen.getByText(/You're Lost in Another Universe/i)
		).toBeInTheDocument();
	});
});
