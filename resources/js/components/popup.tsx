import { useEffect, useRef } from "react";
import Button from "./button";

type PopupProps = {
    open: boolean,
    title?: string,
    children: React.ReactNode,
    destructive?: boolean,
    action: () => void,
    onClose: () => void
}

export default function Popup({ open, title, children, destructive, action, onClose }: PopupProps) {
    const modal = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (open) {
            modal.current?.showModal();
        } else {
            modal.current?.close();
        }
    }, [open]);

    const handleAction = () => {
        action();
        onClose();
    }

    return (
        <dialog ref={modal}
            className="w-[95%] sm:max-w-xl max-h-[90%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 rounded shadow-xl space-y-4 bg-foreground backdrop:backdrop-brightness-30">

            <div>
                <h1 className="text-xl capitalize font-semibold">{title}</h1>
            </div>

            <div>
                {children}
            </div>

            <div className="sticky bottom-0 grid gap-2 sm:grid-flow-col">
                <Button variant={destructive ? "destructive" : "primary"} onClick={handleAction}>action</Button>
                <Button variant="secondary" onClick={onClose}>close</Button>
            </div>
        </dialog>
    );
}