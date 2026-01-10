import AppLogoIcon from "@/components/app-logo-icon";
import Arrow from "@/components/arrow";
import MenuInLine from "@/components/menu-inline";
import ConfigContext from "@/pages/webapp/contexts/config-context";
import { useContext } from "react";

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

    return (
        <div className="pt-4 pl-4 pr-12 grid grid-rows-[auto_1fr_auto]">
            <div className="grid">
                <AppLogoIcon className="w-10 h-10" />
            </div>

            <div className="mt-12">
                {menus.map(menu => (
                    <MenuInLine key={menu.title} title={menu.title} icon={menu.icon} href="#"
                        className="pt-2 hover:text-brand hover:font-semibold" />
                ))}
            </div>
        </div>
    );
}