import { cn } from '@/lib/utils';
import { type Route } from 'next';
import Link, { type LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';

type NavLinkType = {
    href: Route | URL;
    className?: string;
    children: React.ReactNode;
} & LinkProps;

export const NavigationLink = ({ href, className, children }: NavLinkType) => {
    const pathname = usePathname();
    const active: string = href == pathname ? 'bg-accent text-foreground' : '';

    return (
        <Link
            href={href}
            className={cn(
                'rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground',
                className,
                active,
            )}>
            {children}
        </Link>
    );
};
