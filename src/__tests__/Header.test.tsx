import { render, screen } from "@testing-library/react";
import Header from "../components/Header";
import { ThemeProvider } from "../ThemeContext";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
	test("renders logo and menu buttons", () => {
		render(
			<ThemeProvider>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</ThemeProvider>
		);
		const logo = screen.getByAltText(/Rick and Morty Logo/i);
		expect(logo).toBeInTheDocument();
		expect(screen.getByLabelText("Select theme")).toBeInTheDocument();
		expect(screen.getByLabelText("Menu")).toBeInTheDocument();
	});

	test("logo is a link to home", () => {
		render(
			<ThemeProvider>
				<BrowserRouter>
					<Header />
				</BrowserRouter>
			</ThemeProvider>
		);
		const logoLink = screen.getByLabelText("Home page");
		expect(logoLink).toHaveAttribute("href", "/");
	});
});
