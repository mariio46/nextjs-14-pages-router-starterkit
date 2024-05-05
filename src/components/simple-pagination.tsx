import type { Links, Meta } from '@/types/api-response';
import { Icon } from './icon';
import { Button } from './ui/button';

type SimplePaginationProps = {
    meta: Meta;
    links: Links;
    setUrl: (url: string) => void;
};

export const SimplePagination = ({ meta, links, setUrl }: SimplePaginationProps) => {
    return (
        meta.has_pages && (
            <div className='flex w-full items-center justify-center sm:gap-x-8'>
                <div className='flex items-center justify-end gap-x-1.5'>
                    {meta.current_page !== 1 ? (
                        <Button size='icon' variant='outline' onClick={() => setUrl(links.first)}>
                            <Icon name='IconChevronsLeft' className='size-4' />
                        </Button>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronsLeft' className='size-4' />
                        </Button>
                    )}

                    {links.prev ? (
                        <Button size='icon' variant='outline' onClick={() => setUrl(links.prev)}>
                            <Icon name='IconChevronLeft' className='size-4' />
                        </Button>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronLeft' className='size-4' />
                        </Button>
                    )}

                    <strong className='mx-4 select-none text-sm font-medium'>
                        {`${meta.current_page} / ${meta.last_page}`}
                    </strong>

                    {links.next ? (
                        <Button size='icon' variant='outline' onClick={() => setUrl(links.next)}>
                            <Icon name='IconChevronRight' className='size-4' />
                        </Button>
                    ) : (
                        <Button size='icon' variant='outline' disabled>
                            <Icon name='IconChevronRight' className='size-4' />
                        </Button>
                    )}

                    {meta.to !== meta.total ? (
                        <Button size='icon' variant='outline' onClick={() => setUrl(links.last)}>
                            <Icon name='IconChevronsRight' className='size-4' />
                        </Button>
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
