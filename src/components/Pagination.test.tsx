import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Pagination from "./Pagination";

describe("Pagination", () => {
	it("renders nothing for a single page", () => {
		const { container } = render(
			<Pagination page={1} pages={1} onPageChange={vi.fn()} />,
		);
		expect(container).toBeEmptyDOMElement();
	});

	it("marks the current page and navigates", () => {
		const onPageChange = vi.fn();
		render(<Pagination page={1} pages={42} onPageChange={onPageChange} />);

		expect(screen.getByRole("button", { name: "Sayfa 1" })).toHaveAttribute(
			"aria-current",
			"page",
		);
		expect(screen.getByRole("button", { name: "Önceki sayfa" })).toBeDisabled();

		fireEvent.click(screen.getByRole("button", { name: "Sonraki sayfa" }));
		fireEvent.click(screen.getByRole("button", { name: "Sayfa 42" }));
		expect(onPageChange.mock.calls).toEqual([[2], [42]]);
	});
});
