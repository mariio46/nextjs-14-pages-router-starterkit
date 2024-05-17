import * as React from 'react';

import { TableCell, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { IconLoader, IconMoodSad } from '@tabler/icons-react';

interface DataTableStatusProps {
    status: 'pending' | 'error' | 'success';
    colSpan: number;
}

const DataTableStatus: React.FC<DataTableStatusProps> = ({ colSpan = 5, status, ...props }) => {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                className={cn(
                    'text-center text-balance h-16 font-semibold tracking-wider [&>svg]:inline-flex',
                    status === 'pending' ? 'text-foreground' : 'text-red-500',
                )}
                {...props}>
                {status === 'pending' && <IconLoader className='animate-spin' />}
                {status === 'error' && (
                    <>
                        <IconMoodSad />
                        Error
                    </>
                )}
            </TableCell>
        </TableRow>
    );
};

export { DataTableStatus };
