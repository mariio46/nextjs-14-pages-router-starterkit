import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DataTableColumnDropdownActionProps {
    children: React.ReactNode;
}

export const DataTableColumnDropdownAction = ({ children }: DataTableColumnDropdownActionProps) => {
    return (
        <div className='text-end'>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='outline' className='h-5' size='icon'>
                        <span className='sr-only'>Open menu</span>
                        <Icon name='IconDots' className='size-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='min-w-[12rem] z-[61]'>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {children}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};
