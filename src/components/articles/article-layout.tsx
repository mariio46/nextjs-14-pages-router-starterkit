import { cn } from '@/lib/utils';

export const ArticleLayout = ({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div
            className={cn(
                'grid gap-y-12 sm:grid-cols-2 sm:gap-10 md:grid-cols-3 md:gap-x-4 lg:gap-x-20 lg:gap-y-24',
                className,
            )}
            {...props}>
            {children}
        </div>
    );
};
