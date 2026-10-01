import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useTheme } from "./useTheme";

describe("useTheme", () => {
	it("applies and remembers the chosen theme", () => {
		const { result } = renderHook(() => useTheme());

		act(() => result.current.setTheme("dark"));
		expect(result.current.resolved).toBe("dark");
		expect(document.documentElement).toHaveClass("dark");
		expect(localStorage.getItem("theme")).toBe("dark");

		act(() => result.current.setTheme("light"));
		expect(document.documentElement).not.toHaveClass("dark");

		// matchMedia is stubbed to "light" in tests.
		act(() => result.current.setTheme("system"));
		expect(result.current.resolved).toBe("light");
	});
});
