import * as React from 'react';

import { type VariantProps } from 'class-variance-authority';
import DefaultLink, { type LinkProps as DefaultLinkProps } from 'next/link';

import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

interface LinkProps extends DefaultLinkProps, VariantProps<typeof buttonVariants> {
    className?: string;
    children: React.ReactNode;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(({ className, variant, size, ...props }, ref) => {
    return <DefaultLink className={cn(buttonVariants({ className, variant, size }))} ref={ref} {...props} />;
});

Link.displayName = 'Link';

export { Link };
