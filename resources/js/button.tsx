import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
    return (
        <button {...props} className={twMerge(
            "bg-brand text-white capitalize border border-transparent py-1 px-2 rounded shadow cursor-pointer hover:opacity-95",
            className
        )}>
            {children}
        </button>
    );
}