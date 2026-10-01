import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.webp";
import { useFavorites } from "../hooks/useFavorites";
import { cn } from "../lib/cn";
import { NAV_ITEMS, type NavItem } from "./navigation";
import ThemeMenu from "./ThemeMenu";
import { buttonClasses } from "./ui/button-classes";

function NavCount({ count }: { count: number }) {
	if (count === 0) return null;
	return (
		<span className="ml-0.5 rounded-full bg-portal px-1.5 py-px text-[0.68rem] leading-4 font-bold text-on-portal tabular-nums">
			{count}
		</span>
	);
}

function NavLinkItem({
	item,
	count,
	onNavigate,
	large = false,
}: {
	item: NavItem;
	count: number;
	onNavigate?: () => void;
	large?: boolean;
}) {
	const Icon = item.icon;
	return (
		<NavLink
			to={item.to}
			end={item.end}
			onClick={onNavigate}
			className={({ isActive }) =>
				cn(
					"flex items-center gap-2 rounded-xl font-medium transition-colors",
					large ? "px-4 py-3 text-base" : "px-3 py-2 text-sm",
					isActive
						? "bg-portal/15 text-portal-ink"
						: "text-muted hover:bg-surface-2 hover:text-fg",
				)
			}
		>
			<Icon className={large ? "size-5" : "size-4"} aria-hidden="true" />
			{item.label}
			{item.to === "/favorites" && <NavCount count={count} />}
		</NavLink>
	);
}

export default function Header() {
	const [open, setOpen] = useState(false);
	const { ids } = useFavorites();

	return (
		<header className="sticky top-0 z-40 border-b border-line/70 bg-bg/75 backdrop-blur-xl">
			<div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
				<Link
					to="/"
					aria-label="Ana sayfa"
					className="group flex items-center gap-3"
				>
					<img
						src={logo}
						alt="Rick and Morty"
						width={400}
						height={130}
						className="h-9 w-auto drop-shadow-[0_2px_10px_rgba(151,206,76,0.35)] transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105"
						draggable={false}
					/>
				</Link>

				<nav
					aria-label="Ana menü"
					className="ml-4 hidden items-center gap-1 md:flex"
				>
					{NAV_ITEMS.map((item) => (
						<NavLinkItem key={item.to} item={item} count={ids.length} />
					))}
				</nav>

				<div className="ml-auto flex items-center gap-1">
					<ThemeMenu />
					<Dialog.Root open={open} onOpenChange={setOpen}>
						<Dialog.Trigger
							className={cn(buttonClasses("ghost", "icon"), "md:hidden")}
							aria-label="Menüyü aç"
						>
							<Menu className="size-5" aria-hidden="true" />
						</Dialog.Trigger>
						<Dialog.Portal>
							<Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
							<Dialog.Content className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col gap-6 border-l border-line bg-surface p-5 shadow-2xl">
								<div className="flex items-center justify-between">
									<Dialog.Title className="font-display text-lg font-semibold">
										Menü
									</Dialog.Title>
									<Dialog.Close
										className={buttonClasses("ghost", "icon")}
										aria-label="Menüyü kapat"
									>
										<X className="size-5" aria-hidden="true" />
									</Dialog.Close>
								</div>
								<Dialog.Description className="sr-only">
									Sayfalar arasında gezin
								</Dialog.Description>
								<nav
									aria-label="Mobil menü"
									className="flex flex-col gap-1"
								>
									{NAV_ITEMS.map((item) => (
										<NavLinkItem
											key={item.to}
											item={item}
											count={ids.length}
											onNavigate={() => setOpen(false)}
											large
										/>
									))}
								</nav>
							</Dialog.Content>
						</Dialog.Portal>
					</Dialog.Root>
				</div>
			</div>
		</header>
	);
}
