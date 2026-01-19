import { router } from "@inertiajs/react"
import Arrow from "./arrow"
import OthersMenuItem from "./icons/others-menu-icon";
import { IconComponent } from "@/types/base-icon";

interface MenuInLineBaseProps {
    title: string;
    icon: IconComponent;
    className?: string;
}

interface MenuInLineWithHrefProps extends MenuInLineBaseProps {
    href: string;
    onClick?: never;
}

interface MenuInLineWithOnClickProps extends MenuInLineBaseProps {
    onClick: () => void;
    href?: never;
}

type MenuInLineProps = MenuInLineWithHrefProps | MenuInLineWithOnClickProps

export default function MenuInLine({ title, icon, href, onClick, className }: MenuInLineProps) {
    const Icon = icon;

    const handleClick = () => {
        if (href) {
            router.visit(href, { preserveState: true });

        } else if (onClick) {
            onClick();
        }
    }

    return (
        <div key={title} onClick={handleClick} className={`flex items-center gap-4 cursor-pointer text-primary bg-foreground ${className}`}>
            <Icon />

            <div className="py-2 flex gap-4 grow justify-between items-center border-b border-muted">
                <p>{title}</p>
                <Arrow className="stroke-primary" />
            </div>
        </div>
    )
}