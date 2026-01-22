import { MenuItem } from "@/types/menu-items";
import { createContext } from "react";

const ConfigContext = createContext<{
    menus: MenuItem[],
    permissions: string[],
    selectedMenu: string,
    setSelectedMenu: (menu: string) => void
    message: string,
}>({
    menus: [],
    permissions: [],
    selectedMenu: '',
    setSelectedMenu: () => { },
    message: ''
});

export default ConfigContext;