import { MenuItem } from "@/types";

function permissionMap(permissions: string[], menus: MenuItem[]) {
    if (permissions.includes("*")) {
        return menus;
    }

    const filtered = menus.filter(menu => permissions.includes(menu.permission));

    const withSubmenus = (): MenuItem[] => {
        return filtered.map(menu => {
            if (menu.submenus) {
                return {
                    ...menu,
                    submenus: permissionMap(permissions, menu.submenus)
                }
            }
            return menu;
        })
    }

    return withSubmenus();
}

export default permissionMap;