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
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    isError: boolean;
}

export function DataTable<TData, TValue>({ columns, data, isLoading, isError }: DataTableProps<TData, TValue>) {
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

    return (
        <div>
            <div className='flex items-center justify-between py-4'>
                <Link href='/users/create' className={buttonVariants({ variant: 'default' })}>
                    <Icon name='IconCirclePlus' className='me-1' />
                    Add User
                </Link>
                <Input
                    placeholder='Find user by their name.'
                    autoFocus
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={(event) => table.getColumn('name')?.setFilterValue(event.target.value)}
                    className='max-w-sm'
                />
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
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className='text-teal-500 text-center font-semibold tracking-wider'>
                                    Loading...
                                </TableCell>
                            </TableRow>
                        ) : isError ? (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className='text-red-500 text-center font-semibold tracking-wider'>
                                    Error
                                </TableCell>
                            </TableRow>
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
                                    <TableRow>
                                        <TableCell colSpan={columns.length} className='h-24 text-center'>
                                            No results.
                                        </TableCell>
                                    </TableRow>
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
        </div>
    );
}
