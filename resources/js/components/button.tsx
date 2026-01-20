import { twMerge } from "tailwind-merge";

type ButtonProps = React.ComponentProps<"button"> & {
    variant?: "primary" | "secondary" | "destructive";
};

export default function Button({ children, className, variant = "primary", ...props }: ButtonProps) {
    const defaultStyles = "pl-4 pr-8 py-1 text-left text-sm tracking-wider font-semibold capitalize border border-transparent rounded shadow cursor-pointer hover:opacity-90 disabled:opacity-50 disabled:cursor-default disabled:shadow-none";

    const selectVariant = (variant: string) => {
        switch (variant) {
            case "primary":
                return "bg-brand text-brand-counter";
            case "secondary":
                return "bg-foreground text-primary border border-primary/30 hover:bg-brand/10 disabled:bg-transparent";
            case "destructive":
                return "bg-destructive text-destructive-foreground border border-transparent hover:opacity-90";
            default:
                return "";
        }
    }
    return (
        <button
            {...props}
            className={twMerge(defaultStyles, selectVariant(variant), className)}
        >
            {children}
        </button >
    );
}