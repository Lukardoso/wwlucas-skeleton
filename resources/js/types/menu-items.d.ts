import FallbackMenuIcon from "@/components/icons/fallback-menu-icon";
import { ComponentType } from "react";

interface BaseMenuItem {
    title: string;
    permission: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface MenuItemWithHref extends BaseMenuItem {
    href: string;
    submenus?: never;
}

interface MenuItemWithSubmenus extends BaseMenuItem {
    href?: never;
    submenus: MenuItem[];
}

export type MenuItem = MenuItemWithHref | MenuItemWithSubmenus;