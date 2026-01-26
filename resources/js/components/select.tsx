import { useState } from "react";
import Arrow from "./arrow";
import useTranslate from "@/hooks/useTranslate";

type SelectProps = {
    label: string;
    name: string;
    options: string[];
    defaultValue?: string;
}

export default function Select({ label, name, options, defaultValue }: SelectProps) {
    const [selected, setSelected] = useState(defaultValue || null);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { translate } = useTranslate({ "Nenhuma opção": { en: "Reset", es: "Ninguna" } });

    const handleDropDown = () => {
        setDropdownOpen(!dropdownOpen);
    }

    const handleSelected = (e: React.MouseEvent<HTMLLIElement>) => {
        setSelected(e.currentTarget.innerText);
        setDropdownOpen(false);
    }

    const reset = () => {
        setSelected(null);
        setDropdownOpen(false);
    }

    return (
        <div className="relative">
            <label htmlFor={name}
                onClick={handleDropDown}
                className="flex items-center justify-between px-2 py-1 bg-foreground border border-primary/10 rounded shadow select-none cursor-pointer hover:opacity-90"
            >
                {selected || label}
                <Arrow className={`fill-primary ${dropdownOpen ? 'rotate-90' : ''}`} />
            </label>

            <input type="hidden" id={name} name={name} value={selected ?? undefined} />

            <ul className={`absolute z-10 mt-1 w-full border border-primary/10 rounded shadow-lg bg-foreground overflow-hidden ${dropdownOpen ? 'block' : 'hidden'}`}>
                {options.map((option, idx) => (
                    <li key={idx} onClick={handleSelected} className="px-2 py-1 text-sm hover:bg-brand hover:text-brand-counter cursor-pointer">
                        {option}
                    </li>
                ))}

                <li onClick={reset} className="px-2 py-1 text-sm hover:bg-brand hover:text-brand-counter cursor-pointer">
                    {translate("Nenhuma opção")}
                </li>
            </ul>
        </div>
    );
}