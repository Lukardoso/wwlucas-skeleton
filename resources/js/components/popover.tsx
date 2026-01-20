import { LucideX } from "lucide-react";
import { useRef, useState } from "react";

type PopoverProps = {
    children: React.ReactNode;
    trigger: React.ReactNode;
}
export default function Popover({ children, trigger }: PopoverProps) {
    const popover = useRef<HTMLDivElement>(null);

    const closeManually = () => {
        popover.current?.hidePopover();
    }

    return (
        <div className="relative">
            <button popoverTarget="popover">
                {trigger}
            </button>

            <div
                id="popover"
                ref={popover}
                popover="hint"
                className="w-[95%] sm:max-w-xl max-h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow-xl space-y-4 bg-foreground backdrop:backdrop-brightness-30"
            >
                <div>{children}</div>

                <div onClick={closeManually} className="absolute right-2 top-2 cursor-pointer opacity-50 hover:opacity-70">
                    <LucideX />
                </div>
            </div>
        </div>
    );
}