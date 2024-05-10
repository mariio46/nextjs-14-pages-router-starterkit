import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { VariantProps } from 'class-variance-authority';
import { useId } from 'react';
import { SubmitButton } from './submit-button';
import { Button, buttonVariants } from './ui/button';

interface DropdownDialogProps extends VariantProps<typeof buttonVariants> {
    content?: React.ReactNode;
    children: React.ReactNode;
    action: () => void;
    actionText?: string;
    onLoadingActionText?: string;
    title?: string;
    description?: string;
    disabledWhen: boolean;
    className?: string;
    dialogKey: React.Key;
}

const DropdownDialog: React.FC<DropdownDialogProps> = ({
    content,
    children,
    action,
    actionText = 'Save',
    onLoadingActionText = 'Processing...',
    title = 'Lorem ipsum dolor.',
    description = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore, itaque.',
    disabledWhen,
    dialogKey,
    className,
    variant,
    size,
}) => {
    const _id = useId();

    return (
        <Dialog key={dialogKey + _id}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                </DialogHeader>

                {content}

                <DialogFooter className='mt-5 gap-2 sm:gap-0'>
                    <DialogClose asChild>
                        <Button variant='outline' type='button'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <SubmitButton
                        onClick={action}
                        defaultLabel={actionText}
                        onLoadingLabel={onLoadingActionText}
                        type='button'
                        className={cn(buttonVariants({ variant, size, className }))}
                        disabledWhen={disabledWhen}
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export { DropdownDialog };
