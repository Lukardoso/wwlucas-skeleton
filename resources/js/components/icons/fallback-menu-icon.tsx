import { IconProps } from "@/types/base-icon";
import { LucideCircleCheck, LucideCircleDashed } from "lucide-react";

export default function FallbackMenuIcon({ selected, ...props }: IconProps) {
    return selected
        ? <LucideCircleCheck {...props} className="stroke-1 fill-brand" />
        : <LucideCircleDashed  {...props} className="stroke-1" />
}