import { Link, router } from "@inertiajs/react";
import { useContext, useEffect } from "react";
import Arrow from "./arrow";
import { MenuItem } from "@/types/menu-items";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import { IconComponent } from "@/types/base-icon";

export default function MenuWithDropDown({ menu }: { menu: MenuItem }) {
    const { selectedMenu, setSelectedMenu } = useContext(ConfigContext);

    const open = selectedMenu === menu.title;

    const hasSubmenu = menu.submenus && menu.submenus.length > 0;

    const Icon: IconComponent = menu.icon;

    useEffect(() => {
        const location = window.location.pathname;

        if (location === menu.href) {
            setSelectedMenu(menu.title);
        }
    }, [menu, setSelectedMenu])

    const handleClick = () => {
        setSelectedMenu(menu.title);

        if (menu.href) {
            router.visit(menu.href, { preserveState: true });
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            handleClick();
        }
    }

    return (
        <div>
            <div tabIndex={0} onKeyDown={handleKeyDown} onClick={handleClick} className="group flex items-center gap-4 cursor-pointer select-none focus:outline-0">
                <div>
                    <Icon selected={selectedMenu === menu.title} className="stroke-white" />
                </div>

                <div className="py-2 flex gap-4 grow justify-between items-center border-b group-focus-visible:border-brand hover:opacity-70 transition-all">
                    <p
                        className={`max-w-[15ch] capitalize overflow-hidden text-sm text-ellipsis text-nowrap ${open ? "text-brand font-semibold" : ""}`}>
                        {menu.title}
                    </p>

                    <Arrow className={`${open ? "fill-brand" : "fill-primary group-focus-visible:fill-brand"} ${open && hasSubmenu ? "rotate-90" : ""}`} />
                </div>
            </div>

            {open && (
                menu.submenus?.map((submenu, idx) => (
                    <div key={idx} className="mt-1 grid pl-12">
                        <Link href={submenu.href} preserveState
                            className="max-w-[20ch] capitalize overflow-hidden text-ellipsis text-nowrap text-sm hover:text-brand border-b border-transparent focus:outline-0 focus-visible:border-brand">
                            {submenu.title}
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
}