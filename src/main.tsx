import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { initTheme } from "./hooks/useTheme";
import "./index.css";
import { createQueryClient } from "./lib/queries";
import { routes } from "./routes";

initTheme();

const queryClient = createQueryClient();
const router = createBrowserRouter(routes);

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</StrictMode>,
);
