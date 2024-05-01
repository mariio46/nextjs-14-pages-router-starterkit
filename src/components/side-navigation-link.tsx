import { cn } from '@/lib/utils';
import type { NavigationProps } from '@/types/components';
import Link from 'next/link';
import { useRouter } from 'next/router';

type SideNavigationLinkProps = NavigationProps;

export const SideNavigationLink = ({ children, className, href, ...props }: SideNavigationLinkProps) => {
    const { asPath } = useRouter();
    // prettier-ignore
    const active: string = asPath.startsWith(href.toString()) ? 'font-semibold text-foreground' : 'text-muted-foreground';

    return (
        <li>
            <Link
                href={href}
                className={cn(
                    'flex items-center gap-x-2 rounded-md px-4 py-2 text-[0.930rem]/[1.35rem] capitalize tracking-tight hover:text-foreground [&>svg]:mr-2 [&>svg]:h-5 [&>svg]:w-5 [&>svg]:stroke-[1.3] font-semibold text-foreground',
                    active,
                    className,
                )}
                {...props}>
                {children}
            </Link>
        </li>
    );
};
