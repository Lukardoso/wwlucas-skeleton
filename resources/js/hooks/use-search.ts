import { useEffect, useState } from "react";

export default function useSearch<T extends Array<unknown>>(endpoing: string, debounce = 500) {
    const [results, setResults] = useState<T>();
    const [query, setQuery] = useState<string>("");

    const searching = query?.length > 2;

    useEffect(() => {
        if (!query || query.length < 3) {
            return;
        }

        const normalizedEndpoint = endpoing.slice(-1) === "/" ? endpoing : endpoing + "/";

        const timeout = setTimeout(() => {
            fetch(normalizedEndpoint + query)
                .then(response => response.json())
                .then(data => {
                    setResults(data)
                    setQuery("");
                })
                .catch(error => console.error(error));

        }, debounce);

        return () => clearTimeout(timeout);
    }, [query, endpoing, debounce]);

    const search = (query: string) => {
        setQuery(query);
    }

    const reset = () => {
        setQuery("");
        setResults(undefined);
    }

    return { results, searching, search, reset } as const;
}