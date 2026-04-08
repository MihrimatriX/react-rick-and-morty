import { render, screen } from "@testing-library/react";
import App from "../App";

beforeAll(() => {
	global.fetch = jest.fn(() =>
		Promise.resolve({
			json: () => Promise.resolve({ results: [] }),
		})
	) as jest.Mock;
});

test("renders loading spinner initially", () => {
	render(<App />);
	const loading = screen.getByLabelText(/loading/i);
	expect(loading).toBeInTheDocument();
});
