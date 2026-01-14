import { useContext, useState } from "react";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import AppLogoIcon from "@/components/app-logo-icon";
import MenuWithDropDown from "@/components/menu-with-dropdown";
import { MenuItem } from "@/types/menu-items";
import { usePage } from "@inertiajs/react";

export default function DesktopLayout({ children, title }: { children: React.ReactNode, title: string }) {
    return (
        <div className="h-screen grid grid-cols-[300px_1fr] pr-4">
            <Sidebar />

            <div>
                <div className="pt-4 border-b-2 text-4xl font-semibold text-primary">
                    {title}
                </div>

                <div className="mt-12">{children}</div>
            </div>
        </div>
    );
}

function Sidebar() {
    const { menus } = useContext(ConfigContext);
    const appName = usePage<{ name: string }>().props.name;

    return (
        <div className="pt-4 pl-4 pr-12 grid grid-rows-[auto_1fr_auto] bg-linear-to-r from-white to-neutral-100">
            <div className="flex gap-2 items-center opacity-30">
                <AppLogoIcon className="w-10 h-10 fill-brand" />
                <h1 className="text-xl font-semibold">{appName}</h1>
            </div>

            <div className="mt-12 space-y-4">
                {menus.map((menu: MenuItem) => (
                    <MenuWithDropDown key={menu.permission} menu={menu} />
                ))}
            </div>
        </div>
    );
}