import { describe, expect, it } from "vitest";
import {
	formatAirDate,
	formatEpisodeCode,
	genderLabel,
	orUnknown,
	parseEpisodeCode,
	speciesLabel,
	statusLabel,
} from "./labels";

describe("labels", () => {
	it("translates known API values and passes others through", () => {
		expect(statusLabel("Alive")).toBe("Hayatta");
		expect(genderLabel("Female")).toBe("Kadın");
		expect(speciesLabel("Alien")).toBe("Uzaylı");
		expect(speciesLabel("Vampire")).toBe("Vampire");
	});

	it("maps missing values to 'Bilinmiyor'", () => {
		expect(orUnknown("unknown")).toBe("Bilinmiyor");
		expect(orUnknown("")).toBe("Bilinmiyor");
		expect(orUnknown("Earth")).toBe("Earth");
	});

	it("parses episode codes", () => {
		expect(parseEpisodeCode("S03E07")).toEqual({ season: 3, episode: 7 });
		expect(parseEpisodeCode("bad")).toEqual({ season: 0, episode: 0 });
		expect(formatEpisodeCode("S03E07")).toBe("Sezon 3 · Bölüm 7");
	});

	it("formats air dates in Turkish", () => {
		expect(formatAirDate("December 2, 2013")).toBe("2 Aralık 2013");
		expect(formatAirDate("not a date")).toBe("not a date");
	});
});
