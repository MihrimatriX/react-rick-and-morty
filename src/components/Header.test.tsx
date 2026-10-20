import { fireEvent, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";
import { clearFavorites, toggleFavorite } from "../hooks/useFavorites";
import { renderWithProviders } from "../test/utils";
import Header from "./Header";

describe("Header", () => {
	beforeEach(() => clearFavorites());

	it("links to every section and marks the active one", () => {
		renderWithProviders(<Header />, "/episodes");
		const nav = screen.getByRole("navigation", { name: "Ana menü" });
		expect(within(nav).getByRole("link", { name: "Bölümler" })).toHaveAttribute(
			"aria-current",
			"page",
		);
		expect(within(nav).getByRole("link", { name: "Karakterler" })).toHaveAttribute(
			"href",
			"/",
		);
		expect(screen.getByRole("link", { name: "Ana sayfa" })).toHaveAttribute(
			"href",
			"/",
		);
	});

	it("shows the number of favorites", () => {
		toggleFavorite(1);
		toggleFavorite(2);
		renderWithProviders(<Header />);
		const nav = screen.getByRole("navigation", { name: "Ana menü" });
		expect(within(nav).getByRole("link", { name: /Favoriler/ })).toHaveTextContent(
			"2",
		);
	});

	it("opens the mobile menu", () => {
		renderWithProviders(<Header />);
		fireEvent.click(screen.getByRole("button", { name: "Menüyü aç" }));
		const dialog = screen.getByRole("dialog", { name: "Menü" });
		expect(within(dialog).getByRole("link", { name: "Konumlar" })).toHaveAttribute(
			"href",
			"/locations",
		);
	});
});
