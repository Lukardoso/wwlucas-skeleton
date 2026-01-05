import { Link } from "@inertiajs/react";

export default function MobileMenuIcon({ src, label, href }: { src: string, label: string, href: string }) {

    return (
        <Link href={href} className="grid place-items-center text-center">
            <img src={src} alt={`${label}-icon`} className="h-7 w-7" />
            <p className="text-xs">{label}</p>
        </Link>
    );
}