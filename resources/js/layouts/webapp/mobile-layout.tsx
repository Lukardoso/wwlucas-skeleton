import { router } from "@inertiajs/react";
import { useContext, useState } from "react";
import MobileMenuIcon from "@/components/mobile-menu-icon";
import ProfileMenu from "@/components/profile-menu";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import MenuInLine from "@/components/menu-inline";
import { MenuItem } from "@/types/menu-items";
import useTranslate from "@/hooks/useTranslate";
import menuSheet from "@/translateSheets/menuSheet";

export default function MobileLayout({ children, title }: { children: React.ReactNode, title: string }) {
    const [submenus, setSubmenus] = useState<MenuItem[]>([]);
    const { menus } = useContext(ConfigContext);

    const handleMenu = (menu: MenuItem) => {
        if (menu.href) {
            setSubmenus([]);
            router.visit(menu.href, { preserveState: true });
        } else {
            setSubmenus(menu.submenus || []);
        }
    }

    return (
        <div>
            <Header title={title} />

            <div className="pb-20 sm:pb-32 overflow-auto">
                {submenus.length > 0 ? (
                    <div className="sm:max-w-lg mx-4 mt-8 sm:mx-auto bg-white rounded shadow overflow-hidden animate-slide-left">
                        {submenus.map((submenu) => (
                            <MenuInLine title={submenu.title} icon={submenu.icon} onClick={() => handleMenu(submenu)}
                                className="px-4 pt-2 animate-slide-left active:bg-neutral-200" />
                        ))}
                    </div>
                ) : children}
            </div>

            <BottomMenu menus={menus} handleMenu={handleMenu} />
        </div>
    );
}

function Header({ title }: { title: string }) {

    return (
        <div>
            <div className="h-28 p-4 flex items-center justify-between bg-brand text-white rounded-b-xl">
                <h1 className="text-2xl sm:text-4xl font-semibold">{title}</h1>

                <div className="flex gap-4">
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
}

function BottomMenu({ menus, handleMenu }: { menus: MenuItem[], handleMenu: (submenu: MenuItem) => void }) {
    const { translate } = useTranslate(menuSheet);

    // if the length of menus is more than 4, group the remaining menus into 'Others'
    const compactMenus = () => {
        if (menus.length <= 4) {
            return menus;
        }

        const others = menus.slice(4);

        const compacted = [...menus.slice(0, 4), {
            title: "Outros",
            permission: 'others',
            icon: '/icons/menu/others-circle.svg',
            selected_icon: '/icons/menu/selected-others-circle.svg',
            submenus: others
        } as MenuItem]

        return compacted;
    }

    return (
        <div className="fixed bottom-0 w-full flex justify-center pb-2 sm:pb-8 backdrop-blur-[0.07rem]">
            <div className="w-[95vw] sm:w-[80vw] px-4 py-2 flex justify-evenly border shadow rounded-full bg-white text-black">
                {
                    compactMenus().map((menu: MenuItem) => (
                        <MobileMenuIcon key={menu.permission} menu={menu} handleMenu={handleMenu} />
                    ))
                }
            </div>
        </div>
    );
}