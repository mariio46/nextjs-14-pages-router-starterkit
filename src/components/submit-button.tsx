import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import React from 'react';
import { Icon } from './icon';
import { Button, ButtonProps, buttonVariants } from './ui/button';

interface SubmitButtonProps extends ButtonProps, VariantProps<typeof buttonVariants> {
    disabledWhen: boolean;
    defaultLabel: string;
    onLoadingLabel?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    disabledWhen,
    className,
    variant,
    size,
    defaultLabel,
    onLoadingLabel,
    type = 'submit',
    ...props
}) => {
    const onLoadText = !onLoadingLabel ? `${defaultLabel}...` : onLoadingLabel;
    return (
        <Button
            type={type}
            disabled={disabledWhen}
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}>
            {disabledWhen && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
            {!disabledWhen ? defaultLabel : onLoadText}
        </Button>
    );
};
