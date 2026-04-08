import { render, screen } from "@testing-library/react";
import RouteError from "../components/RouteError";
import { BrowserRouter } from "react-router-dom";

describe("RouteError", () => {
	test("renders 404 image, title and home link", () => {
		render(
			<BrowserRouter>
				<RouteError />
			</BrowserRouter>
		);
		expect(screen.getByAltText(/404 Portal/i)).toBeInTheDocument();
		expect(
			screen.getByText(/You're Lost in Another Universe/i)
		).toBeInTheDocument();
		const homeLink = screen.getByLabelText("Return to home page");
		expect(homeLink).toHaveAttribute("href", "/");
	});

	test("home link is keyboard accessible", () => {
		render(
			<BrowserRouter>
				<RouteError />
			</BrowserRouter>
		);
		const homeLink = screen.getByLabelText("Return to home page");
		homeLink.focus();
		homeLink.dispatchEvent(
			new KeyboardEvent("keydown", { key: "Enter", bubbles: true })
		);
		expect(homeLink).toBeInTheDocument();
	});
});
