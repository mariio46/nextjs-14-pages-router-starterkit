import { type BaseProductType } from '@/types/api/data/products';

import { useToggleDialog } from '@/hooks/use-toggle-dialog';
import { useDeleteProduct } from '@/lib/api/data/products/delete-product';
import { toRupiah } from '@/lib/utils';

import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

interface ProductDeleteDialogProps {
    product: BaseProductType;
    children: React.ReactNode;
}

export const ProductDeleteDialog = ({ children, product }: ProductDeleteDialogProps) => {
    const { openDialog, toggleDialog } = useToggleDialog();
    const { submit, isPending } = useDeleteProduct(product, toggleDialog);

    return (
        <Dialog open={openDialog} onOpenChange={toggleDialog}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you sure want to delete this product?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this product and remove data from our
                        servers.
                    </DialogDescription>
                </DialogHeader>

                <section id='delete-user-information' className='[&>div]:text-sm [&>div]:mt-2'>
                    <div>
                        <span className='text-muted-foreground'>Product Name</span>
                        <p className='font-medium text-foreground'>{product.name}</p>
                    </div>
                    <div>
                        <span className='text-muted-foreground'>Price</span>
                        <p className='font-medium text-foreground'>{toRupiah(product.price)}</p>
                    </div>
                </section>

                <DialogFooter className='mt-5 gap-2 sm:gap-0'>
                    <DialogClose asChild>
                        <Button type='button' variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <SubmitButton
                        type='button'
                        onClick={() => submit(product.id)}
                        disabledWhen={isPending}
                        defaultLabel='Delete'
                        onLoadingLabel='Deleting...'
                        variant='destructive'
                    />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
