interface BaseMenuItem {
    title: string;
    permission: string;
    icon: string;
    selected_icon?: string;
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