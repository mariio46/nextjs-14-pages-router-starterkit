import { cn } from '@/lib/utils';
import React from 'react';

interface InputErrorType extends React.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

export const InputError: React.FC<InputErrorType> = ({ message, className, ...props }) => {
    return message ? (
        <p className={cn('text-sm text-red-600', className)} {...props}>
            {message}
        </p>
    ) : null;
};
