import DesktopLayout from "./desktop-layout";
import MobileLayout from "./mobile-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
    const deviceWidth = window.innerWidth;
    const Layout = deviceWidth > 1000 ? DesktopLayout : MobileLayout;

    return (
        <div>
            <Layout>{children}</Layout>
        </div>
    );
}