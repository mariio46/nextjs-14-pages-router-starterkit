import { Table } from '@tanstack/react-table';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface DataTablePageSizeProps<Tdata> {
    table: Table<Tdata>;
}

export function DataTablePageSize<TData>({ table }: DataTablePageSizeProps<TData>) {
    return (
        <div className='flex items-center ms-2 space-x-2'>
            <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                    table.setPageSize(Number(value));
                }}>
                <SelectTrigger className='w-[70px]'>
                    <SelectValue placeholder={table.getState().pagination.pageSize} />
                </SelectTrigger>
                <SelectContent>
                    {[5, 10, 20, 30, 40, 50, 100].map((pageSize) => (
                        <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
