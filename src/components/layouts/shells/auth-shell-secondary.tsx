import { Fragment } from 'react';

import Link from 'next/link';

import { type UrlObject } from 'url';

import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Head from 'next/head';

export interface AuthShellSecondaryProps {
    children?: React.ReactNode;
    head?: {
        title?: string;
    };
    headers: {
        title: string;
        description: string;
    };
    breadcrumb: {
        itemLink: string | UrlObject;
        itemLinkTitle: string;
        itemPageTitle: string;
    };
    Action?: () => React.ReactNode;
}

export const AuthShellSecondary = (props: AuthShellSecondaryProps) => {
    const { children, head, headers, breadcrumb, Action } = props;

    const { itemLink, itemLinkTitle, itemPageTitle } = breadcrumb;

    const { description, title } = headers;

    return (
        <>
            {head && (
                <Head>
                    <title>{`${title} / NextJS-14`}</title>
                </Head>
            )}

            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href={itemLink}>{itemLinkTitle}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{itemPageTitle}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className='flex my-5 flex-wrap items-center justify-between'>
                <HeaderPrimary className='space-y-0.5'>
                    <HeaderPrimaryTitle className='text-base'>{title}</HeaderPrimaryTitle>
                    <HeaderPrimaryDescription>{description}</HeaderPrimaryDescription>
                </HeaderPrimary>
                {Action && <Action />}
            </div>

            <Fragment>{children}</Fragment>
        </>
    );
};
