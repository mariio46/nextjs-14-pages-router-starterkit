import { cn } from '@/lib/utils';
import type { NavigationProps } from '@/types/components';
import Link from 'next/link';
import { useRouter } from 'next/router';

type NavigationLinkProps = NavigationProps;

export const NavigationLink = ({ href, className, children }: NavigationLinkProps) => {
    const { asPath } = useRouter();
    const boolean = href.toString() === '/' ? href.toString() === asPath : asPath.startsWith(href.toString());
    const active: string = boolean ? 'bg-accent text-foreground' : '';

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
