import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

type PopoverProps = {
    children: React.ReactNode;
    trigger: React.ReactNode;
    directionX?: "left" | "right";
    directionY?: "top" | "bottom";
    className?: string
}
export default function HintOnHover({ children, trigger, directionX = "left", directionY = "bottom", className }: PopoverProps) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(false);
        }, 5000);

        return () => clearTimeout(timeout);
    }, [show]);

    return (
        <div onClick={() => setShow(!show)} className="group relative">
            <button>
                {trigger}
            </button>

            <div
                className={twMerge(
                    `min-w-xs group-hover:visible invisible absolute z-10 text-sm p-4 rounded shadow-xl space-y-4 bg-foreground 
                    ${directionX === "left" ? "left-0" : "right-0"}
                    ${directionY === "top" ? "bottom-6" : "top-6"}
                    ${show ? "visible" : "invisible"}`,
                    className
                )}
            >
                <div>{children}</div>
            </div>
        </div>
    );
}