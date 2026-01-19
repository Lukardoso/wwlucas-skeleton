import { MenuItem } from "@/types/menu-items";
import { useContext, useEffect } from "react";
import useTranslate from "@/hooks/useTranslate";
import menuSheet from "@/translateSheets/menuSheet";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import { IconComponent } from "@/types/base-icon";

export default function MobileMenuIcon({ menu, handleMenu }: { menu: MenuItem, handleMenu: (submenu: MenuItem) => void }) {
    const { selectedMenu, setSelectedMenu } = useContext(ConfigContext);
    const { translate } = useTranslate(menuSheet);
    const Icon: IconComponent = menu.icon;

    useEffect(() => {
        const location = window.location.pathname;

        if (location === menu.href) {
            setSelectedMenu(menu.title);
        }
    }, [menu, setSelectedMenu])

    const handleClick = (menu: MenuItem) => {
        setSelectedMenu(menu.title);
        handleMenu(menu);
    }

    return (
        <button onClick={() => handleClick(menu)} className="grid place-items-center text-center">
            <Icon selected={selectedMenu === menu.title} />

            <p className={`text-xs sm:text-base overflow-hidden text-nowrap text-ellipsis ${selectedMenu === menu.title ? "text-brand font-semibold" : ""}`}>
                {translate(menu.title)}
            </p>
        </button>
    );
}