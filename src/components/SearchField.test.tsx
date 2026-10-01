import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import SearchField from "./SearchField";

describe("SearchField", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	it("commits the value once typing pauses", () => {
		const onChange = vi.fn();
		render(<SearchField label="İsim" value="" onChange={onChange} />);

		fireEvent.change(screen.getByLabelText("İsim"), { target: { value: "Ri" } });
		fireEvent.change(screen.getByLabelText("İsim"), { target: { value: "Rick " } });
		expect(onChange).not.toHaveBeenCalled();

		act(() => vi.advanceTimersByTime(400));
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange).toHaveBeenCalledWith("Rick");
	});

	it("follows outside changes to the committed value", () => {
		const onChange = vi.fn();
		const { rerender } = render(
			<SearchField label="İsim" value="Morty" onChange={onChange} />,
		);
		expect(screen.getByLabelText("İsim")).toHaveValue("Morty");

		rerender(<SearchField label="İsim" value="" onChange={onChange} />);
		expect(screen.getByLabelText("İsim")).toHaveValue("");
		act(() => vi.advanceTimersByTime(400));
		expect(onChange).not.toHaveBeenCalled();
	});

	it("clears instantly with the clear button", () => {
		const onChange = vi.fn();
		render(<SearchField label="İsim" value="Rick" onChange={onChange} />);
		fireEvent.click(screen.getByRole("button", { name: "Aramayı temizle" }));
		expect(onChange).toHaveBeenCalledWith("");
		expect(screen.getByLabelText("İsim")).toHaveValue("");
	});
});
