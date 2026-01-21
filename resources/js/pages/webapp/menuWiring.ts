import FallbackMenuIcon from "@/components/icons/fallback-menu-icon";
import { MenuItem } from "@/types/menu-items";

const menus: MenuItem[] = [
    {
        title: "Início",
        permission: "webapp.home",
        href: "/",
        icon: FallbackMenuIcon,
    },
    {
        title: "Configurações",
        permission: "webapp.admin",
        icon: FallbackMenuIcon,
        submenus: [
            {
                title: "Perfil",
                permission: "profile",
                href: "/profile",
                icon: FallbackMenuIcon,
            },
            {
                title: "Sair",
                permission: "logout",
                href: "/logout",
                icon: FallbackMenuIcon,
            },
        ]
    },
    {
        title: "Ajuda",
        permission: "help",
        href: "/help",
        icon: FallbackMenuIcon,
    },
    {
        title: "Sobre",
        permission: "about",
        href: "/about",
        icon: FallbackMenuIcon,
    },
    {
        title: "Contato",
        permission: "contact",
        href: "/contact",
        icon: FallbackMenuIcon,
    },
    {
        title: "Termos",
        permission: "terms",
        href: "/terms",
        icon: FallbackMenuIcon,
    }
];

export default menus;