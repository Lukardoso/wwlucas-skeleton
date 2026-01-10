import { router } from "@inertiajs/react"
import Arrow from "./arrow"

interface MenuInLineBaseProps {
    title: string;
    icon: string;
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
    const handleClick = () => {
        if (href) {
            router.visit(href, { preserveState: true });

        } else if (onClick) {
            onClick();
        }
    }

    return (
        <div key={title} onClick={handleClick} className={`flex items-center gap-4 cursor-pointer ${className}`}>
            <img src={icon} alt={title} className="h-6 w-6" />

            <div className="py-2 flex gap-4 grow justify-between items-center border-b">
                <p>{title}</p>
                <Arrow />
            </div>
        </div>
    )
}