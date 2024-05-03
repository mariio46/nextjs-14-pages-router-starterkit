import { type Route } from 'next';
import { LinkProps } from 'next/link';

export interface NavigationProps extends LinkProps {
    href: Route | URL;
    className?: string;
    children: React.ReactNode;
}
