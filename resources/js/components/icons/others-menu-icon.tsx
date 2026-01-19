import { IconProps } from "@/types/base-icon";
import { LucideCircleEllipsis, LucideSettings2 } from "lucide-react";

export default function OthersMenuItem({ selected, ...props }: IconProps) {
    return selected
        ? (
            <div className={`w-6 h-6 place-items-center border border-primary rounded-full ${selected ? "bg-brand" : ""}`}>
                <LucideSettings2 className="scale-[70%] stroke-1" {...props} />
            </div>
        )
        : (
            <div className="w-6 h-6 place-items-center border border-primary rounded-full">
                <LucideSettings2 className="scale-[70%] stroke-1" {...props} />
            </div>
        )
}