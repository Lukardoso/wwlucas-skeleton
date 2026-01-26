import useTranslate from "@/hooks/useTranslate";
import { Input } from "./ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import useSearch from "@/hooks/use-search";
import { useRef, useState } from "react";

type SearchBoxProps = {
    endpoint: string;
    columns: string[];
    onSelect: (result: Result) => void;
    onAdd?: () => void;
}

type Result = {
    [key: string]: string | number;
}


export default function SearchBox({ endpoint, columns, onSelect, onAdd, }: SearchBoxProps) {
    const { searching, results, search, reset } = useSearch<Result[]>(endpoint);
    const [show, setShow] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const { translate } = useTranslate({
        "Pesquisar": { en: "Search", es: "Buscar" },
        "Adicionar Novo": { en: "Add New", es: "Agregar Nuevo" },
        "Nenhum resultado encontrado": { en: "No results found", es: "No se encontraron resultados" },
        "Digite pelo menos 3 caracteres": { en: "Enter at least 3 characters", es: "Ingrese al menos 3 caracteres" },
        "Carregando...": { en: "Loading...", es: "Cargando..." },
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;

        setShow(() => query.length > 0);

        if (query.length >= 3) {
            search(query);
        } else {
            reset();
        }
    }

    const handleSelect = (result: Result) => {
        onSelect(result);
        cleanUp();
    }

    const handleAdd = () => {
        onAdd?.();
        cleanUp();
    }

    const cleanUp = () => {
        if (inputRef.current) {
            inputRef.current.value = '';
        }

        setShow(false);

        reset();
    }

    const simulateClick = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter') {
            e.currentTarget.click();
        }
    }

    return (
        <div className="relative">
            <div className="bg-foreground">
                <label htmlFor="search" className="relative flex items-center">
                    <Input
                        ref={inputRef}
                        id="search"
                        name="search"
                        autoComplete="off"
                        placeholder={translate("Pesquisar")}
                        onChange={handleSearch}
                        className="pr-8"
                    />
                    <SearchIcon
                        width={20}
                        className="absolute right-2 opacity-30 scale-x-[-1]"
                    />
                </label>

                {show && (
                    <div className="absolute mt-1 min-h-32 w-full grid grid-rows-[1fr_auto] bg-foreground rounded shadow border text-sm overflow-auto animate-slide-bottom">
                        <div>

                            {!results && !searching && (
                                <div className="px-4 py-2 opacity-70">
                                    {translate("Digite pelo menos 3 caracteres")}
                                </div>
                            )}

                            {results && !searching && results.map((result, idx) =>
                                <div tabIndex={0} key={idx} onKeyDown={simulateClick} onClick={() => handleSelect(result)}
                                    className="grid grid-flow-col gap-4 text-nowrap p-4 rounded border-muted/30 shadow hover:bg-muted/30 focus-visible:bg-muted/30 outline-none cursor-pointer">

                                    {columns.map(column => (
                                        <p key={column}>{result[column]}</p>
                                    ))}
                                </div>
                            )}

                            {!searching && results?.length === 0 && (
                                <div className="px-4 py-2 opacity-70">
                                    {translate("Nenhum resultado encontrado")}
                                </div>
                            )}

                            {searching && (
                                <div className="px-4 py-2 opacity-70">
                                    {translate("Carregando...")}
                                </div>
                            )}

                        </div>

                        {onAdd && (
                            <div tabIndex={0} onKeyDown={simulateClick} onClick={handleAdd} className="flex mt-4 px-4 py-4 hover:opacity-70 cursor-pointer focus-visible:bg-muted/30 outline-none">
                                <div className="sticky left-4 flex items-center gap-1">
                                    {translate("Adicionar Novo")}
                                    <PlusIcon className="w-4 h-4" />
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
