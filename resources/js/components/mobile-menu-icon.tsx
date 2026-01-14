import ConfigContext from "@/pages/webapp/contexts/config-context";
import { MenuItem } from "@/types";
import { useContext } from "react";

export default function MobileMenuIcon({ menu, handleMenu }: { menu: MenuItem, handleMenu: (submenu: MenuItem) => void }) {
    const config = useContext(ConfigContext);

    const handleClick = (menu: MenuItem) => {
        config.setSelectedMenu(menu.title);
        handleMenu(menu);
    }

    const handleIcon = () => {
        if (menu.selected_icon && config.selectedMenu === menu.title) {
            return menu.selected_icon;
        }

        return menu.icon;
    }

    return (
        <button onClick={() => handleClick(menu)} className="grid place-items-center text-center">
            <img src={handleIcon()} alt={`${menu.title}-icon`} className="h-6 w-6" />
            <p className={`max-w-[8ch] text-xs sm:text-base overflow-hidden text-nowrap text-ellipsis ${config.selectedMenu === menu.title ? "text-brand font-semibold" : ""}`}>{menu.title}</p>
        </button>
    );
}