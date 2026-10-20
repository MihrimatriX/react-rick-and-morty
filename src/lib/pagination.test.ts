import { describe, expect, it } from "vitest";
import { pageWindow } from "./pagination";

describe("pageWindow", () => {
	it("lists every page when there are few", () => {
		expect(pageWindow(1, 5)).toEqual([1, 2, 3, 4, 5]);
	});

	it("collapses distant pages into gaps", () => {
		expect(pageWindow(1, 42)).toEqual([1, 2, 3, 4, null, 42]);
		expect(pageWindow(20, 42)).toEqual([1, null, 19, 20, 21, null, 42]);
		expect(pageWindow(42, 42)).toEqual([1, null, 39, 40, 41, 42]);
	});
});
