import { IconProps } from "@/types/base-icon";

export default function FallbackMenuIcon({ selected, ...props }: IconProps) {
    return selected
        ? (
            <svg {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.56" d="M12 0.666992C18.2593 0.666992 23.333 5.74077 23.333 12C23.333 18.2593 18.2593 23.333 12 23.333C5.74077 23.333 0.666992 18.2593 0.666992 12C0.666992 5.74078 5.74078 0.666992 12 0.666992Z" className="fill-brand stroke-primary" strokeWidth="1.33333" />
                <path d="M12 1C18.0752 1 23 5.92487 23 12C23 18.0752 18.0752 23 12 23C5.92487 23 1 18.0752 1 12C1 5.92487 5.92487 1 12 1Z" className="fill-brand stroke-primary" strokeWidth="2" />
                <path d="M8 12L10.2437 14.2437C10.4773 14.4773 10.856 14.4773 11.0896 14.2437L16 9.33333" className="fill-brand" />
                <path d="M8 12L10.2437 14.2437C10.4773 14.4773 10.856 14.4773 11.0896 14.2437L16 9.33333" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        )
        : (
            <svg {...props} width="24" height="24" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 13C25 19.6275 19.6275 25 13 25C6.37259 25 1 19.6275 1 13C1 6.37259 6.37259 1 13 1C19.6275 1 25 6.37259 25 13Z" className="stroke-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5.33 5.33" />
            </svg>
        )
}