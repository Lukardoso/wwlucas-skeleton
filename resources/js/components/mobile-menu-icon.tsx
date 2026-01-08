import { MenuItem } from "@/types";

export default function MobileMenuIcon({ menu, handleSubmenu }: { menu: MenuItem, handleSubmenu: (submenu: MenuItem) => void }) {

    return (
        <button onClick={() => handleSubmenu(menu)} className="grid place-items-center text-center">
            <img src={menu.icon} alt={`${menu.title}-icon`} className="h-6 w-6" />
            <p className="text-xs sm:text-base">{menu.title}</p>
        </button>
    );
}