import { IconChevronDown, IconChevronUp, IconEyeOff, IconSelector } from '@tabler/icons-react';
import { Column } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';

interface DataTableColumnHeaderProps<TData, TValue> extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
}

export function DataTableColumnHeader<TData, TValue>({
    column,
    title,
    className,
}: DataTableColumnHeaderProps<TData, TValue>) {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' size='sm' className='-ml-3 h-8 data-[state=open]:bg-accent'>
                        <span className='font-semibold'>{title}</span>
                        {column.getIsSorted() === 'desc' ? (
                            <IconChevronDown className='ml-2 h-4 w-4' />
                        ) : column.getIsSorted() === 'asc' ? (
                            <IconChevronUp className='ml-2 h-4 w-4' />
                        ) : (
                            <IconSelector className='ml-2 h-4 w-4' />
                        )}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='start'>
                    <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
                        <IconChevronUp className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                        Asc
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
                        <IconChevronDown className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                        Desc
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <IconEyeOff className='mr-2 h-3.5 w-3.5 text-muted-foreground/70' />
                        Hide
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
