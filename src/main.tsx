import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { ThemeProvider } from "./ThemeContext";

createRoot(document.getElementById("root")!).render(
	<ThemeProvider>
		<TooltipProvider>
			<App />
		</TooltipProvider>
	</ThemeProvider>
);
