import { LucideX } from "lucide-react";
import { ReactNode, use, useEffect, useState } from "react";

export default function InnerNotification({ message }: { message?: ReactNode | string | null }) {
    const [showMessage, setShowMessage] = useState(true);

    useEffect(() => {
        if (message) {
            hideMessage(10000);
        }
    }, [message]);

    const hideMessage = (time?: number) => {
        if (time) {
            setTimeout(() => {
                setShowMessage(false);
            }, time);
        } else {
            setShowMessage(false);
        }
    }

    return (
        <div className={
            `fixed z-50 top-4 sm:right-4 right-1/2 translate-x-1/2 sm:translate-0 w-[95%] sm:max-w-lg rounded overflow-hidden shadow-lg border border-primary/30 bg-foreground text-center sm:text-start animate-slide-left
            ${message && showMessage ? '' : 'hidden'}`
        }>
            <p className="px-4 py-8 lg:py-4 bg-foreground">{message}</p>

            <div onClick={() => hideMessage()} className="absolute right-2 top-2 cursor-pointer hover:opacity-70">
                <LucideX className="w-4 h-4" />
            </div>
        </div>
    );
}