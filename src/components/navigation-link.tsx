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
                'inline-flex items-center justify-center rounded-md text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2 hover:bg-accent hover:text-accent-foreground font-semibold',
                className,
                active,
            )}>
            {children}
        </Link>
    );
};
