import type { CategoryShowType } from '@/types/api/data/product-categories';

import { BlockLabel, BlockParagraph } from '@/components/block-fragments';
import { DataTable } from '@/components/tanstack/data-table';
import { now } from '@/lib/utils';
import { QueryStatus } from '@tanstack/react-query';
import { CategoryDetailSkeleton } from './category-detail-skeleton';
import { categoryProductsColumn } from './category-products-column';

interface CategoryDetailBlocksProps {
    category: CategoryShowType;
    status: QueryStatus;
}

export const CategoryDetailBlocks = ({ category, status }: CategoryDetailBlocksProps) => {
    return (
        <div className='space-y-6'>
            {status === 'success' && category ? <DetailBlock category={category} /> : <CategoryDetailSkeleton />}

            <div>
                <DataTable
                    status={status}
                    data={category?.products}
                    columns={categoryProductsColumn}
                    filterKey='name'
                />
            </div>
        </div>
    );
};

const DetailBlock = ({ category }: { category: CategoryDetailBlocksProps['category'] }) => {
    return (
        <div className='flex flex-col sm:flex-row sm:gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
            <div className='min-w-52'>
                <div>
                    <BlockLabel>Name</BlockLabel>
                    <BlockParagraph>{category.name}</BlockParagraph>
                </div>
                <div>
                    <BlockLabel>Slug</BlockLabel>
                    <BlockParagraph>{category.slug}</BlockParagraph>
                </div>
            </div>
            <div className='min-w-52'>
                <div>
                    <BlockLabel>Last Created</BlockLabel>
                    <BlockParagraph>{now(category.created)}</BlockParagraph>
                </div>
                <div>
                    <BlockLabel>Last Created</BlockLabel>
                    <BlockParagraph>{now(category.created)}</BlockParagraph>
                </div>
            </div>
        </div>
    );
};
