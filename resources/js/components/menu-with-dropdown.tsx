import { Link, router } from "@inertiajs/react";
import { useContext, useEffect } from "react";
import Arrow from "./arrow";
import { MenuItem } from "@/types/menu-items";
import ConfigContext from "@/pages/webapp/contexts/config-context";

export default function MenuWithDropDown({ menu }: { menu: MenuItem }) {
    const { selectedMenu, setSelectedMenu } = useContext(ConfigContext);
    const open = selectedMenu === menu.title;
    const hasSubmenu = menu.submenus && menu.submenus.length > 0;

    useEffect(() => {
        const location = window.location.pathname;

        if (location === menu.href) {
            setSelectedMenu(menu.title);
        }
    }, [])

    const handleClick = () => {
        setSelectedMenu(menu.title);

        if (menu.href) {
            router.visit(menu.href, { preserveState: true });
        }
    }

    return (
        <div>
            <div onClick={handleClick} className="flex items-center gap-4 cursor-pointer select-none">
                <img src={selectedMenu === menu.title ? menu.selected_icon : menu.icon} alt={menu.title} className="h-6 w-6" />

                <div className="group py-2 flex gap-4 grow justify-between items-center border-b hover:opacity-70 transition-all">
                    <p
                        className={`max-w-[15ch] capitalize overflow-hidden text-ellipsis text-nowrap ${open ? "text-brand font-semibold" : ""}`}>
                        {menu.title}
                    </p>

                    <Arrow className={`${open ? "fill-brand" : ""} ${open && hasSubmenu ? "rotate-90" : ""}`} />
                </div>
            </div>

            {open && (
                menu.submenus?.map((submenu, idx) => (
                    <div key={idx} className="mt-1 grid pl-12">
                        <Link href={submenu.href} preserveState
                            className="max-w-[20ch] capitalize overflow-hidden text-ellipsis text-nowrap text-sm hover:text-brand">
                            {submenu.title}
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}