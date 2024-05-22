import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { BaseProductCategoryType } from '@/types/api/data/product-categories';
import { CategoryDeleteDialog } from '../category-delete-dialog';
import { CategoryEditDialog } from '../category-edit-dialog';

interface CategoryDetailActionProps {
    category: BaseProductCategoryType;
}

export const CategoryDetailAction = ({ category }: CategoryDetailActionProps) => {
    return (
        category && (
            <div className='flex items-center gap-2'>
                <CategoryEditDialog category={category}>
                    <Button>
                        <Icon className='me-1' name='IconEdit' />
                        Edit
                    </Button>
                </CategoryEditDialog>
                <CategoryDeleteDialog category={category}>
                    <Button variant='destructive'>
                        <Icon className='me-1' name='IconTrash' />
                        Delete
                    </Button>
                </CategoryDeleteDialog>
            </div>
        )
    );
};
