import { Clapperboard, Earth, Heart, Users, type LucideIcon } from "lucide-react";

export interface NavItem {
	to: string;
	label: string;
	icon: LucideIcon;
	end?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
	{ to: "/", label: "Karakterler", icon: Users, end: true },
	{ to: "/episodes", label: "Bölümler", icon: Clapperboard },
	{ to: "/locations", label: "Konumlar", icon: Earth },
	{ to: "/favorites", label: "Favoriler", icon: Heart },
];
