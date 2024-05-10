import * as React from 'react';

import { type VariantProps } from 'class-variance-authority';
import DefaultLink, { type LinkProps as DefaultLinkProps } from 'next/link';
import { useRouter } from 'next/router';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface NavigationLinkProps extends DefaultLinkProps, VariantProps<typeof buttonVariants> {
    className?: string;
    children: React.ReactNode;
}

// prettier-ignore
const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>( ({ className, variant, size, ...props }, ref) => {
    const { asPath } = useRouter();

    const boolean: boolean = props.href.toString() === '/' ? props.href.toString() === asPath : asPath.startsWith(props.href.toString());

    const active: string = boolean ? 'bg-accent text-foreground font-semibold' : '';

    return <DefaultLink className={cn(buttonVariants({ className, variant, size }), active)} ref={ref} {...props} />;
});

NavigationLink.displayName = 'NavigationLink';

export { NavigationLink };
