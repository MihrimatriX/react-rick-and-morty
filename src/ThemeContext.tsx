import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";

type Theme = "light" | "dark" | "auto";

interface ThemeContextProps {
	theme: Theme;
	setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
	theme: "auto",
	setTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setThemeState] = useState<Theme>(() => {
		return (localStorage.getItem("theme") as Theme) || "auto";
	});

	useEffect(() => {
		const root = window.document.documentElement;
		let applied = theme;
		if (theme === "auto") {
			applied = window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		root.classList.remove("light", "dark");
		root.classList.add(applied);
		localStorage.setItem("theme", theme);
	}, [theme]);

	const setTheme = (t: Theme) => setThemeState(t);

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			{children}
		</ThemeContext.Provider>
	);
}

export function useTheme() {
	return useContext(ThemeContext);
}
