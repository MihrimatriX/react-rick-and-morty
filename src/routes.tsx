import type { RouteObject } from "react-router";
import NotFound from "./components/NotFound";
import RootLayout from "./layouts/RootLayout";
import CharacterPage from "./pages/CharacterPage";
import CharactersPage from "./pages/CharactersPage";
import EpisodePage from "./pages/EpisodePage";
import EpisodesPage from "./pages/EpisodesPage";
import FavoritesPage from "./pages/FavoritesPage";
import LegacyCharacterRedirect from "./pages/LegacyCharacterRedirect";
import LocationPage from "./pages/LocationPage";
import LocationsPage from "./pages/LocationsPage";
import RouteErrorPage from "./pages/RouteErrorPage";

export const routes: RouteObject[] = [
	{
		element: <RootLayout />,
		errorElement: <RouteErrorPage />,
		children: [
			{ index: true, element: <CharactersPage /> },
			{ path: "character/:id", element: <CharacterPage /> },
			{ path: "char/:id", element: <LegacyCharacterRedirect /> },
			{ path: "episodes", element: <EpisodesPage /> },
			{ path: "episodes/:id", element: <EpisodePage /> },
			{ path: "locations", element: <LocationsPage /> },
			{ path: "locations/:id", element: <LocationPage /> },
			{ path: "favorites", element: <FavoritesPage /> },
			{ path: "*", element: <NotFound /> },
		],
	},
];
