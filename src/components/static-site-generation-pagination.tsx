import { cn, getPageNumberFromUrl } from '@/lib/utils';
import type { Links, Meta } from '@/types/article';
import Link from 'next/link';
import { Icon } from './icon';
import { Button, buttonVariants } from './ui/button';

type StaticSiteGenerationPaginationProps = {
    meta: Meta;
    links: Links;
    url: string;
};

export const StaticSiteGenerationPagination = ({ meta, links, url }: StaticSiteGenerationPaginationProps) => {
    return (
        meta.has_pages && (
            <div className='flex w-full items-center justify-center sm:gap-x-8'>
                <div className='flex items-center justify-end gap-x-1.5'>
                    {meta.current_page !== 1 ? (
                        <Link
                            href={`${url}/${getPageNumberFromUrl(links.first)}`}
                            className={cn(buttonVariants({ size: 'icon', variant: 'outline' }))}>
                            <Icon name='IconChevronsLeft' className='size-4' />
                        </Link>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronsLeft' className='size-4' />
                        </Button>
                    )}

                    {links.prev ? (
                        <Link
                            href={`${url}/${getPageNumberFromUrl(links.prev)}`}
                            className={cn(buttonVariants({ size: 'icon', variant: 'outline' }))}>
                            <Icon name='IconChevronLeft' className='size-4' />
                        </Link>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronLeft' className='size-4' />
                        </Button>
                    )}

                    <strong className='mx-4 select-none text-sm font-medium'>
                        {`${meta.current_page} / ${meta.last_page}`}
                    </strong>

                    {links.next ? (
                        <Link
                            href={`${url}/${getPageNumberFromUrl(links.next)}`}
                            className={cn(buttonVariants({ size: 'icon', variant: 'outline' }))}>
                            <Icon name='IconChevronRight' className='size-4' />
                        </Link>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronRight' className='size-4' />
                        </Button>
                    )}

                    {meta.to !== meta.total ? (
                        <Link
                            href={`${url}/${getPageNumberFromUrl(links.last)}`}
                            className={cn(buttonVariants({ size: 'icon', variant: 'outline' }))}>
                            <Icon name='IconChevronsRight' className='size-4' />
                        </Link>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronsRight' className='size-4' />
                        </Button>
                    )}
                </div>
            </div>
        )
    );
};
