import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { createMemoryRouter, MemoryRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { vi } from "vitest";
import { routes } from "../routes";

function testQueryClient() {
	return new QueryClient({
		defaultOptions: { queries: { retry: false, gcTime: Infinity } },
	});
}

/** Renders the whole app at `path` with a fresh cache. */
export function renderRoute(path: string) {
	const router = createMemoryRouter(routes, { initialEntries: [path] });
	const utils = render(
		<QueryClientProvider client={testQueryClient()}>
			<RouterProvider router={router} />
		</QueryClientProvider>,
	);
	return { ...utils, router };
}

/** Renders a single component inside a router and a query client. */
export function renderWithProviders(ui: ReactElement, path = "/") {
	return render(
		<QueryClientProvider client={testQueryClient()}>
			<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
		</QueryClientProvider>,
	);
}

type Handler = (url: URL) => unknown;

/**
 * Stubs `fetch` for the Rick and Morty API. Each handler receives the request
 * url and returns a JSON body, or `undefined` to answer with a 404.
 */
export function mockApi(handlers: Record<string, Handler>) {
	const fetchMock = vi.fn(async (input: RequestInfo | URL) => {
		const url = new URL(String(input));
		const path = url.pathname.replace(/^\/api/, "");
		for (const [pattern, handler] of Object.entries(handlers)) {
			if (new RegExp(`^${pattern}$`).test(path)) {
				const body = handler(url);
				if (body !== undefined) return Response.json(body);
			}
		}
		return Response.json({ error: "There is nothing here" }, { status: 404 });
	});
	vi.stubGlobal("fetch", fetchMock);
	return fetchMock;
}
