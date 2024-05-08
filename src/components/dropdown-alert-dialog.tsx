import { TablerIconType } from '@/types/tabler-icon';
import { VariantProps } from 'class-variance-authority';
import { Icon } from './icon';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from './ui/alert-dialog';
import { buttonVariants } from './ui/button';
import { DropdownMenuItem } from './ui/dropdown-menu';

interface DropdownAlertDialogProps extends VariantProps<typeof buttonVariants> {
    trigger_text: string;
    trigger_icon: TablerIconType;
    cancel_text?: string;
    open: boolean;
    onOpenChange: () => void;
    action: () => void;
    action_text: string;
    title?: string;
    description: string;
    disabledWhen: boolean;
    AlertDialogKey: React.Key;
}

export const DropdownAlertDialog: React.FC<DropdownAlertDialogProps> = ({
    trigger_text,
    trigger_icon,
    cancel_text = 'Cancel',
    open,
    onOpenChange,
    action,
    action_text,
    title = 'Are you absolutely sure?',
    description,
    variant = 'destructive',
    disabledWhen,
    AlertDialogKey,
}) => {
    const onSelect = (e: Event) => {
        e.preventDefault();
        onOpenChange();
    };

    return (
        <>
            <DropdownMenuItem onSelect={onSelect}>
                <Icon name={trigger_icon} className='me-1.5 stroke-[1.3]' />
                {trigger_text}
            </DropdownMenuItem>
            <AlertDialog key={AlertDialogKey} open={open} onOpenChange={onOpenChange}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{title}</AlertDialogTitle>
                        <AlertDialogDescription>{description}</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{cancel_text}</AlertDialogCancel>
                        <AlertDialogAction
                            disabled={disabledWhen}
                            onClick={action}
                            className={buttonVariants({ variant: variant })}>
                            {action_text}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};
