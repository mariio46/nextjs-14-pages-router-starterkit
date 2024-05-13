import * as React from 'react';

import { cn } from '@/lib/utils';
import { TableCell, TableRow } from './ui/table';

type TableRowCellErrorProps = { message?: string };

const TableRowCellError: React.FC<React.TdHTMLAttributes<HTMLTableCellElement> & TableRowCellErrorProps> = ({
    children,
    colSpan = 5,
    className,
    message,
    ...props
}) => {
    return (
        <TableRow>
            <TableCell
                colSpan={colSpan}
                className={cn('text-red-500 text-center h-24 font-semibold tracking-wider', className)}
                {...props}>
                {message ?? children}
            </TableCell>
        </TableRow>
    );
};

export { TableRowCellError };
