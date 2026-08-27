import { renderHook } from "@testing-library/react";
import { absUrl, useSeo } from "../seo";

test("absUrl prefixes origin for relative paths", () => {
	expect(absUrl("/character/1")).toMatch(/\/character\/1$/);
	expect(absUrl("https://rickandmortyapi.com/img.jpg")).toBe(
		"https://rickandmortyapi.com/img.jpg"
	);
});

test("useSeo writes title, description, canonical and og tags", () => {
	renderHook(() =>
		useSeo({
			title: "Rick Sanchez | Rick & Morty",
			description: "Rick Sanchez karakter detayı",
			path: "/character/1",
			image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
			jsonLd: { "@type": "Person", name: "Rick Sanchez" },
		})
	);

	expect(document.title).toBe("Rick Sanchez | Rick & Morty");
	expect(
		document.querySelector('meta[name="description"]')?.getAttribute("content")
	).toBe("Rick Sanchez karakter detayı");
	expect(
		document.querySelector('link[rel="canonical"]')?.getAttribute("href")
	).toMatch(/\/character\/1$/);
	expect(
		document.querySelector('meta[property="og:title"]')?.getAttribute("content")
	).toBe("Rick Sanchez | Rick & Morty");
	expect(
		document.querySelector('meta[property="og:image"]')?.getAttribute("content")
	).toBe("https://rickandmortyapi.com/api/character/avatar/1.jpeg");
	expect(document.getElementById("seo-jsonld")?.textContent).toContain(
		"Rick Sanchez"
	);
});
