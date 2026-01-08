import { MenuItem } from "@/types";

const menus: MenuItem[] = [
    {
        title: 'Menu 1',
        icon: '/icons/menu/fallback.svg',
        href: '/'
    },
    {
        title: 'Menu 2',
        icon: '/icons/menu/fallback.svg',
        href: '/'
    },
    {
        title: 'Menu 3',
        icon: '/icons/menu/fallback.svg',
        href: '/'
    },
    {
        title: 'Menu 4',
        icon: '/icons/menu/fallback.svg',
        href: '/'
    },
    {
        title: 'Others',
        icon: '/icons/menu/fallback.svg',
        submenus: [
            {
                title: 'Menu 5',
                icon: '/icons/menu/fallback.svg',
                href: '/'
            },
            {
                title: 'Menu 6',
                icon: '/icons/menu/fallback.svg',
                submenus: [
                    {
                        title: 'Menu 7',
                        icon: '/icons/menu/fallback.svg',
                        href: '/'
                    },
                    {
                        title: 'Menu 8',
                        icon: '/icons/menu/fallback.svg',
                        href: '/'
                    }
                ]
            }
        ]
    },
];

export default menus;