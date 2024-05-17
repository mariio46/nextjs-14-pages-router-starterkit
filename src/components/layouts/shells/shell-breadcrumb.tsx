import { Fragment } from 'react';

import Link from 'next/link';
import { type UrlObject } from 'url';

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type BreadcrumbLinkType = {
    link: string | UrlObject;
    as: 'link';
};

type BreadcrumbPageType = {
    ariaLabel?: string;
    as: 'page';
};

export type BreadcrumbDataType = { title: string } & (BreadcrumbLinkType | BreadcrumbPageType);

export const ShellBreadcrumb = ({ data }: { data: BreadcrumbDataType[] }) => {
    return (
        <Breadcrumb>
            <BreadcrumbList>
                {data.map((item, i) => (
                    <Fragment key={i}>
                        {item.as === 'link' ? (
                            <>
                                <BreadcrumbItem>
                                    <BreadcrumbLink asChild>
                                        <Link href={item.link}>{item.title}</Link>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                            </>
                        ) : (
                            <BreadcrumbItem>
                                <BreadcrumbPage className='font-semibold'>{item.title}</BreadcrumbPage>
                            </BreadcrumbItem>
                        )}
                    </Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};
