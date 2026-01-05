import AppLogo from "@/components/app-logo";
import MobileMenuIcon from "@/components/mobile-menu-icon";
import ProfileMenu from "@/components/profile-menu";
import { Head } from "@inertiajs/react"

export default function MobileLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="">
            <Header />

            <div className="pb-8 overflow-auto">
                {children}
            </div>

            <BottomMenu />
        </div>
    );
}

function Header() {
    return (
        <div>
            <Head title="Mobile layout" />

            <div className="h-32 p-4 flex items-center justify-between bg-primary text-secondary">
                <AppLogo />
                
                <ProfileMenu />
            </div>
        </div>
    );
}

function BottomMenu() {
    return (
        <div className="fixed bottom-0 w-full flex justify-center pb-2 sm:pb-8 backdrop-blur-[0.07rem]">
            <div className="w-[95vw] px-4 py-2 flex justify-between border shadow rounded-full bg-secondary text-primary">
            
                <MobileMenuIcon href="#" src="/icons/menu/fallback.svg" label="Estimates" />
                <MobileMenuIcon href="#" src="/icons/menu/fallback.svg" label="Documents" />
                <MobileMenuIcon href="#" src="/icons/menu/fallback.svg" label="Payments" />
                <MobileMenuIcon href="#" src="/icons/menu/fallback.svg" label="Website" />
                <MobileMenuIcon href="#" src="/icons/menu/fallback.svg" label="Others" />

            </div>
        </div>
    );
}