import { LucideX } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type PopoverProps = {
    children: React.ReactNode;
    trigger: React.ReactNode;
}
export default function HintOnHover({ children, trigger }: PopoverProps) {
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
                className={
                    `group-hover:visible invisible absolute text-sm p-4 rounded shadow-xl space-y-4 bg-foreground
                    ${show ? "visible" : "invisible"}`
                }
            >
                <div>{children}</div>
            </div>
        </div>
    );
}