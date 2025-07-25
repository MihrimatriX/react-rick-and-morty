import header_logo from "../assets/header_logo.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Tooltip from "@radix-ui/react-tooltip";
import { useState } from "react";

interface HeaderProps {
  renderUnfilteredList: () => void;
}

const Header = ({ renderUnfilteredList }: HeaderProps) => {
  const [theme, setTheme] = useState("light");

  return (
    <header className="w-full flex justify-between items-center py-6 px-4">
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <img
            src={header_logo}
            className="w-2/5 max-w-xs mt-9 cursor-pointer hover:scale-105 transition-transform"
            alt="Rick and Morty logo"
            onClick={renderUnfilteredList}
            tabIndex={0}
            aria-label="Go to unfiltered list"
          />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side="bottom" className="bg-gray-800 text-white px-3 py-2 rounded shadow text-sm">
            Listeyi sıfırlamak için tıkla
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="px-4 py-2 rounded bg-cyan-600 text-white font-semibold shadow hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition">
            Menü
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className="bg-white dark:bg-gray-900 rounded shadow-lg p-2 min-w-[160px]">
            <DropdownMenu.Label className="text-xs text-gray-500 px-2">Tema</DropdownMenu.Label>
            <DropdownMenu.RadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenu.RadioItem value="light" className="px-2 py-1 cursor-pointer rounded hover:bg-cyan-100 dark:hover:bg-cyan-900">Açık</DropdownMenu.RadioItem>
              <DropdownMenu.RadioItem value="dark" className="px-2 py-1 cursor-pointer rounded hover:bg-cyan-100 dark:hover:bg-cyan-900">Koyu</DropdownMenu.RadioItem>
            </DropdownMenu.RadioGroup>
            <DropdownMenu.Separator className="my-2 h-px bg-gray-200 dark:bg-gray-700" />
            <DropdownMenu.Item className="px-2 py-1 cursor-pointer rounded hover:bg-cyan-100 dark:hover:bg-cyan-900">
              <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">API Kaynağı</a>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </header>
  );
};

export default Header; 