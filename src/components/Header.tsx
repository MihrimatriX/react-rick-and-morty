import { Link } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import { FaSun, FaMoon, FaAdjust, FaBars } from "react-icons/fa";
import headerLogo from "../assets/header_logo.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

const themeOptions = [
	{ value: "light", label: "Light", icon: <FaSun /> },
	{ value: "dark", label: "Dark", icon: <FaMoon /> },
	{ value: "auto", label: "Auto", icon: <FaAdjust /> },
];

const Header = () => {
	const { theme, setTheme } = useTheme();

	return (
		<header className="sticky top-0 z-50 w-full bg-bg-light dark:bg-bg-dark backdrop-blur-md shadow-lg border-b border-accent-light dark:border-accent-dark transition-colors duration-300">
			<div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5 min-h-[88px] gap-8">
				<Link
					to="/"
					className="flex items-center gap-4 group"
					tabIndex={0}
					aria-label="Home page"
				>
					<img
						src={headerLogo}
						alt="Rick and Morty Logo"
						className="h-16 w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:animate-wiggle"
						draggable={false}
					/>
				</Link>
				<div className="flex items-center gap-6">
					{/* Theme Selector */}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button
								className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-light to-evil-dark dark:from-accent-dark dark:to-evil-dark text-white font-semibold text-lg shadow hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-rick transition-all"
								aria-label="Select theme"
							>
								<FaAdjust className="text-2xl" />
								<span className="hidden md:inline">Theme</span>
							</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg p-2 mt-2 min-w-[180px] animate-slideDownAndFade transition-colors duration-300">
							{themeOptions.map((opt) => (
								<DropdownMenu.Item
									key={opt.value}
									onSelect={() => setTheme(opt.value as any)}
									className={`flex items-center gap-2 px-4 py-3 rounded cursor-pointer text-slate-800 dark:text-white hover:bg-rick/20 dark:hover:bg-morty/20 transition text-lg ${
										theme === opt.value
											? "font-bold bg-rick/30 dark:bg-morty/30"
											: ""
									}`}
									aria-label={opt.label}
								>
									{opt.icon} {opt.label}
								</DropdownMenu.Item>
							))}
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					{/* Menu (placeholder) */}
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild>
							<button
								className="flex items-center gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-evil-dark to-accent-light dark:from-evil-dark dark:to-accent-dark text-white font-semibold text-lg shadow hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-morty transition-all"
								aria-label="Menu"
							>
								<FaBars className="text-2xl" />
								<span className="hidden md:inline">Menu</span>
							</button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content className="bg-card-light dark:bg-card-dark rounded-lg shadow-lg p-2 mt-2 min-w-[180px] animate-slideDownAndFade transition-colors duration-300">
							<DropdownMenu.Item asChild>
								<a
									href="https://rickandmortyapi.com/"
									target="_blank"
									rel="noopener noreferrer"
									className="block px-4 py-3 rounded hover:bg-rick/20 dark:hover:bg-morty/20 transition text-slate-800 dark:text-white text-lg"
								>
									API Source
								</a>
							</DropdownMenu.Item>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
				</div>
			</div>
		</header>
	);
};

export default Header;
