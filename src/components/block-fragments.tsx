import { cn } from '@/lib/utils';

export const BlockLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...props }) => {
    return (
        <span className={cn('text-muted-foreground', className)} {...props}>
            {children}
        </span>
    );
};

export const BlockParagraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <p className={cn('font-medium text-foreground', className)} {...props}>
            {children}
        </p>
    );
};
