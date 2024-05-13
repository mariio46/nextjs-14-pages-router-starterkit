import * as React from 'react';

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';

import { Icon } from '@/components/icon';
import { TableRowCellError } from '@/components/table-error';
import { TableRowCellLoading } from '@/components/table-loading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { DialogCreateRole } from './dialog-create-role';

interface RolesDataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    isError: boolean;
}

const RolesDataTable = <TData, TValue>({ columns, data, isLoading, isError }: RolesDataTableProps<TData, TValue>) => {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            columnFilters,
        },
    });

    const { openDialog, toggleDialog } = useToggleDialog();

    return (
        <div>
            <div className='flex items-center justify-end gap-2 py-4'>
                <Input
                    placeholder='Find role...'
                    autoFocus
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className='max-w-sm'
                />
                <Button onClick={toggleDialog}>
                    <Icon name='IconCirclePlus' className='me-1' />
                    Add New Role
                </Button>
            </div>

            <div className='rounded-md'>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {isLoading ? (
                            <TableRowCellLoading colSpan={columns.length} message='Loading...' />
                        ) : isError ? (
                            <TableRowCellError colSpan={columns.length} message='Error' />
                        ) : (
                            <>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRowCellError colSpan={columns.length} message='No results.' />
                                )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>

            {!isLoading && !isError && (
                <div className='flex items-center justify-center gap-x-1.5 py-4'>
                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => table.firstPage()}
                        disabled={!table.getCanPreviousPage()}>
                        <Icon name='IconChevronsLeft' className='size-4' />
                    </Button>

                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}>
                        <Icon name='IconChevronLeft' className='size-4' />
                    </Button>

                    <span className='mx-4 select-none text-sm font-medium'>
                        {`${table.getState().pagination.pageIndex + 1} / ${table.getPageCount()}`}
                    </span>

                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}>
                        <Icon name='IconChevronRight' className='size-4' />
                    </Button>

                    <Button
                        variant='outline'
                        size='icon'
                        onClick={() => table.lastPage()}
                        disabled={!table.getCanNextPage()}>
                        <Icon name='IconChevronsRight' className='size-4' />
                    </Button>
                </div>
            )}

            <DialogCreateRole open={openDialog} onOpenChange={toggleDialog} />
        </div>
    );
};

export { RolesDataTable };
