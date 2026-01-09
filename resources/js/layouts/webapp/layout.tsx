import { Head } from "@inertiajs/react";
import DesktopLayout from "./desktop-layout";
import MobileLayout from "./mobile-layout";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import { useState } from "react";

export default function Layout({ children, title }: { children: React.ReactNode, title: string }) {
    const [selectedMenu, setSelectedMenu] = useState<string>('');
    const deviceWidth = window.innerWidth;
    const Layout = deviceWidth > 1000 ? DesktopLayout : MobileLayout;

    return (
        <ConfigContext.Provider value={{ selectedMenu: selectedMenu, setSelectedMenu: setSelectedMenu }}>

            <div className="min-h-screen">
                <Head title={title} />

                <Layout title={title}>{children}</Layout>
            </div>

        </ConfigContext.Provider>
    );
}