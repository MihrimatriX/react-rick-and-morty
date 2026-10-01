import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, Monitor, Moon, Sun } from "lucide-react";
import { useTheme, type Theme } from "../hooks/useTheme";
import { cn } from "../lib/cn";
import { buttonClasses } from "./ui/button-classes";

const OPTIONS: { value: Theme; label: string; icon: typeof Sun }[] = [
	{ value: "light", label: "Açık", icon: Sun },
	{ value: "dark", label: "Koyu", icon: Moon },
	{ value: "system", label: "Sistem", icon: Monitor },
];

export default function ThemeMenu() {
	const { theme, resolved, setTheme } = useTheme();
	const TriggerIcon = resolved === "dark" ? Moon : Sun;

	return (
		<DropdownMenu.Root>
			<DropdownMenu.Trigger
				className={buttonClasses("ghost", "icon")}
				aria-label="Tema seç"
			>
				<TriggerIcon className="size-5" aria-hidden="true" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.Content
					align="end"
					sideOffset={8}
					className="z-50 min-w-44 rounded-xl border border-line bg-surface p-1.5 shadow-xl shadow-black/10"
				>
					<DropdownMenu.Label className="px-2.5 py-1.5 text-xs font-medium text-muted">
						Görünüm
					</DropdownMenu.Label>
					{OPTIONS.map(({ value, label, icon: Icon }) => (
						<DropdownMenu.Item
							key={value}
							onSelect={() => setTheme(value)}
							className={cn(
								"flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm outline-none select-none data-highlighted:bg-surface-2",
								theme === value && "font-semibold text-portal-ink",
							)}
						>
							<Icon className="size-4" aria-hidden="true" />
							{label}
							{theme === value && (
								<Check className="ml-auto size-4" aria-hidden="true" />
							)}
						</DropdownMenu.Item>
					))}
				</DropdownMenu.Content>
			</DropdownMenu.Portal>
		</DropdownMenu.Root>
	);
}
