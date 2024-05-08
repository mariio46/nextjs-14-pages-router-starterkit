import React from 'react';
import { Icon } from './icon';
import { Button, ButtonProps } from './ui/button';

interface SubmitButtonProps extends ButtonProps {
    disabledWhen: boolean;
    defaultLabel: string;
    onLoadingLabel?: string;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
    disabledWhen,
    defaultLabel,
    onLoadingLabel,
    type = 'submit',
    ...props
}) => {
    const onLoadText = !onLoadingLabel ? `${defaultLabel}...` : onLoadingLabel;
    return (
        <Button type={type} disabled={disabledWhen} {...props}>
            {disabledWhen && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
            {!disabledWhen ? defaultLabel : onLoadText}
        </Button>
    );
};
