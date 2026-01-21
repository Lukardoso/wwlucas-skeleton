import { useState } from 'react';
import { Input } from "./ui/input";
import { LucideEye, LucideEyeClosed } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export default function PasswordInput({ className, ...props }: React.ComponentProps<"input">) {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' || event.key === ' ') {
            handleTogglePassword();
        }
    };

    return (
        <div className='relative flex items-center justify-end'>
            <Input
                {...props}
                type={showPassword ? "text" : "password"}
                className={twMerge(
                    "pr-12",
                    className
                )}
            />
            <div tabIndex={0} onClick={handleTogglePassword} onKeyDown={handleKeyDown}
                className='absolute right-4 focus-visible:outline-1 outline-offset-2 outline-neutral-300 rounded'>

                {showPassword ? (
                    <LucideEye
                        className="stroke-neutral-400 cursor-pointer"
                    />
                ) : (
                    <LucideEyeClosed
                        className="stroke-neutral-400 cursor-pointer"
                    />
                )}
            </div>
        </div>

    );
}