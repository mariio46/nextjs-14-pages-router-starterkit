import { cn } from '@/lib/utils';

export const HeaderPrimary = ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    return (
        <header className={cn('flex flex-col space-y-2', className)} {...props}>
            {children}
        </header>
    );
};

export const HeaderPrimaryTitle = ({ children, className, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    return (
        <h2 className={cn('font-bold leading-none tracking-tight text-2xl', className)} {...props}>
            {children}
        </h2>
    );
};

export const HeaderPrimaryDescription = ({
    children,
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
    return (
        <p className={cn('text-sm text-muted-foreground', className)} {...props}>
            {children}
        </p>
    );
};
