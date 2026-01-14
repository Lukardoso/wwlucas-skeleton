import { MenuItem } from "@/types/menu-items";
import { createContext } from "react";

const ConfigContext = createContext<{
    menus: MenuItem[],
    permissions: string[],
    selectedMenu: string,
    setSelectedMenu: (menu: string) => void
}>({
    menus: [],
    permissions: [],
    selectedMenu: '',
    setSelectedMenu: () => { }
});

export default ConfigContext;