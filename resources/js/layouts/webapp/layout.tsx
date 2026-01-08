import { Head } from "@inertiajs/react";
import DesktopLayout from "./desktop-layout";
import MobileLayout from "./mobile-layout";

export default function Layout({ children, title }: { children: React.ReactNode, title: string }) {
    const deviceWidth = window.innerWidth;
    const Layout = deviceWidth > 1000 ? DesktopLayout : MobileLayout;

    return (
        <div className="min-h-screen bg-neutral-50">
            <Head title={title} />

            <Layout title={title}>{children}</Layout>
        </div>
    );
}