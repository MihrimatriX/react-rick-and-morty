import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CharacterCard from "../components/CharacterCard";
import Filter from "../components/Filter";
import RouteError from "../components/RouteError";
import { BrowserRouter } from "react-router-dom";

describe("Snapshot Tests", () => {
	test("CharacterCard matches snapshot", () => {
		const { container } = render(
			<MemoryRouter>
				<CharacterCard
					id={1}
					img="rick.jpg"
					name="Rick Sanchez"
					species="Human"
					status="Alive"
				/>
			</MemoryRouter>
		);
		expect(container).toMatchSnapshot();
	});

	test("Filter matches snapshot", () => {
		const { container } = render(
			<Filter handleFilter={jest.fn()} onResetFilters={jest.fn()} />
		);
		expect(container).toMatchSnapshot();
	});

	test("RouteError matches snapshot", () => {
		const { container } = render(
			<BrowserRouter>
				<RouteError />
			</BrowserRouter>
		);
		expect(container).toMatchSnapshot();
	});
});
