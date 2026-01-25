import useTranslate from "@/hooks/useTranslate";
import { Input } from "./ui/input";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Result = {
    [key: string]: string | number;
};

type SearchBoxProps = {
    endpoint: string;
    db_columns: string[];
    onSelect: (result: Result) => void;
    onAdd: () => void;
};

export default function SearchBox({
    endpoint,
    db_columns,
    onSelect,
    onAdd,
}: SearchBoxProps) {
    const [results, setResults] = useState<Result[]>([]);
    const [searching, setSearching] = useState(false);
    const [query, setQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const { translate } = useTranslate({
        "Pesquisar": { en: "Search", es: "Buscar" },
        "Adicionar Novo": { en: "Add New", es: "Agregar Nuevo" },
        "Nenhum resultado encontrado": { en: "No results found", es: "No se encontraron resultados" },
        "Digite pelo menos 3 caracteres": { en: "Enter at least 3 characters", es: "Ingrese al menos 3 caracteres" },
        "Carregando...": { en: "Loading...", es: "Cargando..." },
    });

    const hasMinLength = (min = 2) => query.length > min;

    const resetSearch = () => {
        setResults([]);
        setQuery("");
        if (searchRef.current) {
            searchRef.current.value = "";
        }
    };

    useEffect(() => {
        if (!hasMinLength()) {
            setResults([]);
            return;
        }

        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        setSearching(true);

        const sanitizedEndpoint = endpoint.replace(/\/$/, "");

        debounceRef.current = setTimeout(() => {
            fetch(`${sanitizedEndpoint}/${query}`)
                .then((res) => res.json())
                .then((data: Result[]) => setResults(data))
                .catch(console.error)
                .finally(() => setSearching(false));
        }, 500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [query, endpoint]);

    const handleSelect = (result: Result) => {
        onSelect(result);
        resetSearch();
    };

    const handleAdd = () => {
        onAdd();
        resetSearch();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === "Enter") {
            e.currentTarget.click();
        }
    };

    const renderResultsList = () => (
        <div className="grid divide-y">
            {results.map((result) => (
                <div
                    key={JSON.stringify(result)}
                    tabIndex={0}
                    onClick={() => handleSelect(result)}
                    onKeyDown={handleKeyDown}
                    className="flex items-center gap-4 px-4 py-2 cursor-pointer text-sm hover:bg-muted/30 focus-visible:bg-muted/30 outline-0"
                >
                    {db_columns.map((column) => (
                        <span key={column}>{result[column]}</span>
                    ))}
                </div>
            ))}
        </div>
    );

    const renderEmptyState = () => {
        if (!hasMinLength()) {
            return (
                <p className="text-sm opacity-70 px-4">
                    {translate("Digite pelo menos 3 caracteres")}.
                </p>
            );
        }

        if (searching) {
            return (
                <p className="text-sm opacity-70 px-4">
                    {translate("Carregando...")}.
                </p>
            );
        }

        return (
            <p className="text-sm opacity-70 px-4">
                {translate("Nenhum resultado encontrado")}.
            </p>
        );
    };

    return (
        <div className="relative">
            <div className="bg-foreground">
                <label htmlFor="search" className="relative flex items-center">
                    <Input
                        ref={searchRef}
                        id="search"
                        name="search"
                        autoComplete="off"
                        placeholder={translate("Pesquisar")}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pr-8"
                    />
                    <SearchIcon
                        width={20}
                        className="absolute right-2 opacity-30 scale-x-[-1]"
                    />
                </label>
            </div>

            {hasMinLength(0) && (
                <div className="absolute min-h-32 w-full mt-1 py-4 grid grid-rows-[1fr_auto] border rounded shadow bg-foreground text-nowrap overflow-auto animate-slide-bottom">
                    {results.length > 0
                        ? renderResultsList()
                        : renderEmptyState()}

                    <div
                        tabIndex={0}
                        onClick={handleAdd}
                        onKeyDown={handleKeyDown}
                        className="flex items-center gap-2 px-4 py-2 mt-4 cursor-pointer font-semibold text-sm bg-muted/30 border-t focus-visible:bg-muted/50 outline-0"
                    >
                        <span>{translate("Adicionar Novo")}</span>
                        <PlusIcon width={15} />
                    </div>
                </div>
            )}
        </div>
    );
}
