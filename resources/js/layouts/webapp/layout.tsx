import { Head, usePage } from "@inertiajs/react";
import DesktopLayout from "./desktop-layout";
import MobileLayout from "./mobile-layout";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import { useState } from "react";
import menus from "@/pages/webapp/menuWiring";
import permissionMap from "@/pages/webapp/utils/permissions-map";

export default function Layout({ children, title }: { children: React.ReactNode, title: string }) {
    const [selectedMenu, setSelectedMenu] = useState<string>('');

    const { permissions } = usePage<{ permissions: string[] }>().props;
    const allowedMenus = permissionMap(permissions, menus);

    const deviceWidth = window.innerWidth;
    const Layout = deviceWidth > 1000 ? DesktopLayout : MobileLayout;

    return (
        <ConfigContext.Provider value={{menus: allowedMenus, permissions: permissions, selectedMenu: selectedMenu, setSelectedMenu: setSelectedMenu }}>

            <div className="min-h-screen bg-neutral-100">
                <Head title={title} />

                <Layout title={title}>{children}</Layout>
            </div>

        </ConfigContext.Provider>
    );
}