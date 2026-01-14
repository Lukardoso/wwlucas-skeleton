import { MenuItem } from "@/types/menu-items";

const menus: MenuItem[] = [
    {
        title: "Início",
        permission: "home",
        href: "/",
        icon: "/icons/menu/fallback\.svg",
        selected_icon: "/icons/menu/selected-fallback.svg",
    },
    {
        title: "Resource A",
        permission: "resourceA",
        icon: "/icons/menu/fallback\.svg",
        selected_icon: "/icons/menu/selected-fallback.svg",
        submenus: [
            {
                title: "New",
                permission: "createResource",
                href: "/test",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            },
            {
                title: "List",
                permission: "listResource",
                href: "/resource-a/list",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            }
        ]
    },
    {
        title: "Resource B",
        permission: "resourceB",
        icon: "/icons/menu/fallback\.svg",
        selected_icon: "/icons/menu/selected-fallback.svg",
        submenus: [
            {
                title: "New",
                permission: "createResource",
                href: "/resource-b/new",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            },
            {
                title: "List",
                permission: "listResource",
                href: "/resource-b/list",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            }
        ]
    },
    {
        title: "Resource C",
        permission: "resourceC",
        icon: "/icons/menu/fallback\.svg",
        selected_icon: "/icons/menu/selected-fallback.svg",
        submenus: [
            {
                title: "New",
                permission: "createResource",
                href: "/resource-c/new",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            },
            {
                title: "List",
                permission: "listResource",
                href: "/resource-c/list",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            }
        ]
    },
    {
        title: "Resource D",
        permission: "resourceD",
        icon: "/icons/menu/fallback\.svg",
        selected_icon: "/icons/menu/selected-fallback.svg",
        submenus: [
            {
                title: "New",
                permission: "createResource",
                href: "/resource-d/new",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            },
            {
                title: "List",
                permission: "listResource",
                href: "/resource-d/list",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            }
        ]
    },
    {
        title: "Resource E",
        permission: "resourceE",
        icon: "/icons/menu/fallback\.svg",
        selected_icon: "/icons/menu/selected-fallback.svg",
        submenus: [
            {
                title: "New",
                permission: "createResource",
                href: "/resource-d/new",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            },
            {
                title: "List",
                permission: "listResource",
                href: "/resource-d/list",
                icon: "/icons/menu/fallback\.svg",
                selected_icon: "/icons/menu/selected-fallback.svg",
            }
        ]
    },
];

export default menus;