'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { IconAdjustments } from '@tabler/icons-react';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface DataTableViewOptionsProps<TData> {
    table: Table<TData>;
}

export function DataTableViewOptions<TData>({ table }: DataTableViewOptionsProps<TData>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' className='hidden ml-auto lg:flex'>
                    <IconAdjustments className='mr-2 h-4 w-4 stroke-[1.3]' />
                    Visibility
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' className='w-[150px]'>
                <DropdownMenuLabel>Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                    .getAllColumns()
                    .filter((column) => typeof column.accessorFn !== 'undefined' && column.getCanHide())
                    .map((column) => {
                        return (
                            <DropdownMenuCheckboxItem
                                key={column.id}
                                className='capitalize'
                                checked={column.getIsVisible()}
                                onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        );
                    })}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
