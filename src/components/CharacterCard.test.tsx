import { fireEvent, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { clearFavorites } from "../hooks/useFavorites";
import { makeCharacter } from "../test/fixtures";
import { renderWithProviders } from "../test/utils";
import CharacterCard from "./CharacterCard";

describe("CharacterCard", () => {
	beforeEach(() => clearFavorites());

	it("shows the character with translated details", () => {
		renderWithProviders(
			<CharacterCard
				character={makeCharacter({
					status: "Dead",
					species: "Alien",
					gender: "Female",
				})}
			/>,
		);
		expect(screen.getByRole("link", { name: "Rick Sanchez" })).toHaveAttribute(
			"href",
			"/character/1",
		);
		expect(screen.getByAltText("Rick Sanchez")).toBeInTheDocument();
		expect(screen.getByText("Ölü")).toBeInTheDocument();
		expect(screen.getByText("Uzaylı · Kadın")).toBeInTheDocument();
		expect(screen.getByText("Citadel of Ricks")).toBeInTheDocument();
	});

	it("toggles the favorite state", () => {
		renderWithProviders(<CharacterCard character={makeCharacter()} />);
		const button = screen.getByRole("button", { name: /favorilere ekle/i });
		expect(button).toHaveAttribute("aria-pressed", "false");

		fireEvent.click(button);
		expect(
			screen.getByRole("button", { name: /favorilerden çıkar/i }),
		).toHaveAttribute("aria-pressed", "true");
	});
});
