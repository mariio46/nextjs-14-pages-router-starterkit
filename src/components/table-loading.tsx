import * as React from 'react';

import { cn } from '@/lib/utils';
import { TableCell, TableRow } from './ui/table';

type TableRowCellLoadingProps = { message?: string | React.ReactNode };

const TableRowCellLoading: React.FC<React.TdHTMLAttributes<HTMLTableCellElement> & TableRowCellLoadingProps> = ({
    children,
    message,
    colSpan = 5,
    className,
    ...props
}) => {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                className={cn('text-teal-500 text-center h-24 font-semibold tracking-wider', className)}
                {...props}>
                {message ?? children}
            </TableCell>
        </TableRow>
    );
};

export { TableRowCellLoading };
