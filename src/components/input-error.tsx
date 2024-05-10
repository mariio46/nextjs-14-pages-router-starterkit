import * as React from 'react';

import { cn } from '@/lib/utils';

interface InputErrorType extends React.HTMLAttributes<HTMLParagraphElement> {
    message?: string;
}

const InputError = React.forwardRef<HTMLParagraphElement, InputErrorType>(({ message, className, ...props }, ref) => {
    return message ? (
        <p className={cn('text-sm text-red-600', className)} ref={ref} {...props}>
            {message}
        </p>
    ) : null;
});

InputError.displayName = 'InputError';

export { InputError };
