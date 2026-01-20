import { useMemo, useState } from 'react';

type ColumnType = 'string' | 'number' | 'date';

type TableColumn<T> = {
    key: keyof T;
    type: ColumnType;
};

interface DataTableProps<T extends Record<string, unknown>> {
    data: T[];
    columns: TableColumn<T>[];
}

export function SortableTable<T extends Record<string, unknown>>({
    data,
    columns,
}: DataTableProps<T>) {
    const [sortKey, setSortKey] = useState<keyof T | null>(null);
    const [direction, setDirection] = useState<'asc' | 'desc'>('asc');

    const sortedData = useMemo(() => {
        if (!sortKey) return data;

        const column = columns.find(c => c.key === sortKey);
        if (!column) return data;

        return [...data].sort((a, b) => {
            const aVal = a[sortKey];
            const bVal = b[sortKey];

            let result = 0;

            switch (column.type) {
                case 'number':
                    result = Number(aVal) - Number(bVal);
                    break;

                case 'date':
                    result =
                        new Date(aVal as string).getTime() -
                        new Date(bVal as string).getTime();
                    break;

                case 'string':
                default:
                    result = String(aVal).localeCompare(String(bVal));
            }

            return direction === 'asc' ? result : -result;
        });
    }, [data, sortKey, direction, columns]);

    const handleSort = (key: keyof T) => {
        if (sortKey === key) {
            setDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
        } else {
            setSortKey(key);
            setDirection('asc');
        }
    };

    const formatDate = (date: string, locale?: string) => {
        const [year, month, day] = date.split('-').map(Number);
        return new Date(year, month - 1, day).toLocaleDateString(locale);
    }

    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse text-sm">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map(col => (
                            <th
                                key={String(col.key)}
                                onClick={() => handleSort(col.key)}
                                className="capitalize cursor-pointer select-none border-b border-gray-200 px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-100"
                            >
                                {String(col.key)}
                                {sortKey === col.key && (
                                    <span className="ml-1 text-xs">
                                        {direction === 'asc' ? '▲' : '▼'}
                                    </span>
                                )}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {sortedData.map((row, i) => (
                        <tr
                            key={i}
                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                        >
                            {columns.map(col => (
                                <td
                                    key={String(col.key)}
                                    className="text-nowrap border-b border-gray-200 px-4 py-3 text-gray-800"
                                >
                                    {col.type === 'date'
                                        ? formatDate(String(row[col.key]))
                                        : String(row[col.key])}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}