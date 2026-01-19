import { useContext } from "react";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import AppLogoIcon from "@/components/app-logo-icon";
import MenuWithDropDown from "@/components/menu-with-dropdown";
import { MenuItem } from "@/types/menu-items";
import ProfileMenu from "@/components/profile-menu";

export default function DesktopLayout({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className="h-screen grid grid-cols-[280px_1fr] pr-4 overflow-hidden">
            <Sidebar />

            <div className="h-full">
                <div className="pt-4 border-b-2 text-3xl font-semibold text-brand">
                    {title}
                </div>

                <div className="h-[95vh] overflow-auto">{children}</div>
            </div>
        </div>
    );
}

function Sidebar() {
    const { menus } = useContext(ConfigContext);

    return (
        <div className="h-screen pt-4 pl-4 pr-12 grid grid-rows-[auto_1fr_auto] bg-linear-to-r from-white dark:from-foreground overflow-hidden">
            <div className="grid place-items-center opacity-30">
                <AppLogoIcon className="w-28 h-8" />
            </div>

            <div className="relative py-12 space-y-4 overflow-y-auto no-scrollbar">
                {menus.map((menu: MenuItem) => (
                    <MenuWithDropDown key={menu.permission} menu={menu} />
                ))}
            </div>

            <div className="relative py-4">
                <div className="absolute left-0 bottom-full w-full h-16 bg-linear-to-tr from-neutral-50 dark:from-foreground pointer-events-none"></div>
                <ProfileMenu inline />
            </div>
        </div>
    );
}