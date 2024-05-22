import { BlockLabel, BlockParagraph } from '@/components/block-fragments';
import { DataTable } from '@/components/tanstack/data-table';
import { now } from '@/lib/utils';
import { TypeShowType } from '@/types/api/data/product-types';
import { QueryStatus } from '@tanstack/react-query';
import { TypeDetailSkeleton } from './type-detail-skeleton';
import { typeProductsColumn } from './type-products-column';

interface TypeDetailBlocksProps {
    type: TypeShowType;
    status: QueryStatus;
}

export const TypeDetailBlocks = ({ type, status }: TypeDetailBlocksProps) => {
    return (
        <div className='space-y-6'>
            {status === 'success' && type ? <DetailBlock type={type} /> : <TypeDetailSkeleton />}

            <div>
                <DataTable status={status} data={type?.products} columns={typeProductsColumn} filterKey='name' />
            </div>
        </div>
    );
};

const DetailBlock = ({ type }: { type: TypeDetailBlocksProps['type'] }) => {
    return (
        <div className='flex flex-col sm:flex-row sm:gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
            <div className='min-w-52'>
                <div>
                    <BlockLabel>Name</BlockLabel>
                    <BlockParagraph>{type.name}</BlockParagraph>
                </div>
                <div>
                    <BlockLabel>Slug</BlockLabel>
                    <BlockParagraph>{type.slug}</BlockParagraph>
                </div>
            </div>
            <div className='min-w-52'>
                <div>
                    <BlockLabel>Last Created</BlockLabel>
                    <BlockParagraph>{now(type.created)}</BlockParagraph>
                </div>
                <div>
                    <BlockLabel>Last Created</BlockLabel>
                    <BlockParagraph>{now(type.created)}</BlockParagraph>
                </div>
            </div>
        </div>
    );
};
