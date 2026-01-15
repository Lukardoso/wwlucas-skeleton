import { MenuItem } from "@/types/menu-items";
import { useContext, useEffect } from "react";
import useTranslate from "@/hooks/useTranslate";
import menuSheet from "@/translateSheets/menuSheet";
import ConfigContext from "@/pages/webapp/contexts/config-context";

export default function MobileMenuIcon({ menu, handleMenu }: { menu: MenuItem, handleMenu: (submenu: MenuItem) => void }) {
    const config = useContext(ConfigContext);
    const { translate } = useTranslate(menuSheet);

    useEffect(() => {
        const location = window.location.pathname;

        if (location === menu.href) {
            config.setSelectedMenu(menu.title);
        }
    }, [])
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

            <p className={`max-w-[8ch] text-xs sm:text-base overflow-hidden text-nowrap text-ellipsis ${config.selectedMenu === menu.title ? "text-brand font-semibold" : ""}`}>
                {translate(menu.title)}
            </p>
        </button>
    );
}