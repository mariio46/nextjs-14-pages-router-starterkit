import { cn, now, toRupiah } from '@/lib/utils';
import { BaseProductType } from '@/types/api/data/products';

interface ProductDetailBlocksProps {
    product: BaseProductType;
}

export const ProductDetailBlocks = ({ product }: ProductDetailBlocksProps) => {
    return (
        <div className='flex flex-wrap items-start gap-5 md:gap-10'>
            <div className='flex flex-col md:flex-row gap-0 md:gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
                <div className='w-1/2'>
                    <div>
                        <BlockLabel>Name</BlockLabel>
                        <BlockParagraph>{product.name}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Slug</BlockLabel>
                        <BlockParagraph>{product.slug}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Description</BlockLabel>
                        <BlockParagraph>{product.description}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Price</BlockLabel>
                        <BlockParagraph>{toRupiah(product.price)}</BlockParagraph>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div>
                        <BlockLabel>Category</BlockLabel>
                        <BlockParagraph>{product.category.name}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Type</BlockLabel>
                        <BlockParagraph>{product.type.name}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Last Created</BlockLabel>
                        <BlockParagraph>{now(product.created)}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Last Updated</BlockLabel>
                        <BlockParagraph>{now(product.updated)}</BlockParagraph>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlockLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...props }) => {
    return (
        <span className={cn('text-muted-foreground', className)} {...props}>
            {children}
        </span>
    );
};

const BlockParagraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className, ...props }) => {
    return (
        <p className={cn('font-medium text-foreground', className)} {...props}>
            {children}
        </p>
    );
};
