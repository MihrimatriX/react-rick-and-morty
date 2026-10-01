import { useEffect } from "react";

export const SITE_NAME = "Rick & Morty Karakter ve Bölüm Rehberi";
export const DEFAULT_DESCRIPTION =
	"Rick and Morty karakterlerini ve bölümlerini modern arayüzle keşfet. Filtrele, detayları incele, tematik ve animasyonlu deneyim!";
export const DEFAULT_IMAGE = "/og-image.png";
export const DEFAULT_IMAGE_ALT = "Rick and Morty logo";

export function getSiteUrl(): string {
	if (typeof window !== "undefined" && window.location?.origin) {
		return window.location.origin;
	}
	return "";
}

export function absUrl(path = "/"): string {
	if (/^https?:\/\//i.test(path)) return path;
	const origin = getSiteUrl();
	const normalized = path.startsWith("/") ? path : `/${path}`;
	return origin ? `${origin}${normalized}` : normalized;
}

function upsertMeta(attr: "name" | "property", key: string, content: string) {
	let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, key);
		document.head.appendChild(el);
	}
	el.content = content;
}

function upsertLink(rel: string, href: string) {
	let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
	if (!el) {
		el = document.createElement("link");
		el.rel = rel;
		document.head.appendChild(el);
	}
	el.href = href;
}

function upsertJsonLd(data: unknown) {
	const id = "seo-jsonld";
	let el = document.getElementById(id) as HTMLScriptElement | null;
	if (!el) {
		el = document.createElement("script");
		el.id = id;
		el.type = "application/ld+json";
		document.head.appendChild(el);
	}
	el.textContent = JSON.stringify(data);
}

export type SeoInput = {
	title?: string;
	description?: string;
	path?: string;
	image?: string;
	imageAlt?: string;
	type?: "website" | "article" | "profile";
	noindex?: boolean;
	jsonLd?: unknown;
	enabled?: boolean;
};

export function useSeo({
	title = SITE_NAME,
	description = DEFAULT_DESCRIPTION,
	path,
	image = DEFAULT_IMAGE,
	imageAlt = DEFAULT_IMAGE_ALT,
	type = "website",
	noindex = false,
	jsonLd,
	enabled = true,
}: SeoInput) {
	const jsonLdStr = jsonLd ? JSON.stringify(jsonLd) : "";

	useEffect(() => {
		if (!enabled) return;

		const url = absUrl(path ?? window.location.pathname);
		const img = absUrl(image);

		document.title = title;
		upsertMeta("name", "description", description);
		upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
		upsertMeta("name", "twitter:card", "summary_large_image");
		upsertMeta("name", "twitter:title", title);
		upsertMeta("name", "twitter:description", description);
		upsertMeta("name", "twitter:image", img);
		upsertMeta("property", "og:title", title);
		upsertMeta("property", "og:description", description);
		upsertMeta("property", "og:url", url);
		upsertMeta("property", "og:image", img);
		upsertMeta("property", "og:image:alt", imageAlt);
		upsertMeta("property", "og:type", type);
		upsertMeta("property", "og:site_name", SITE_NAME);
		upsertLink("canonical", url);

		if (jsonLdStr) upsertJsonLd(JSON.parse(jsonLdStr));
	}, [title, description, path, image, imageAlt, type, noindex, jsonLdStr, enabled]);
}

export function Seo(props: SeoInput) {
	useSeo(props);
	return null;
}

export function websiteJsonLd() {
	const url = absUrl("/");
	return {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "WebSite",
				name: SITE_NAME,
				url,
				description: DEFAULT_DESCRIPTION,
				inLanguage: "tr",
			},
			{
				"@type": "WebApplication",
				name: SITE_NAME,
				url,
				applicationCategory: "EntertainmentApplication",
				operatingSystem: "Any",
				description: DEFAULT_DESCRIPTION,
			},
		],
	};
}
