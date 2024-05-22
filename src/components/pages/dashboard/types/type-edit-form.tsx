import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useEditType } from '@/lib/api/data/types/edit-type';
import { BaseProductTypeType } from '@/types/api/data/product-types';

interface TypeEditFormProps {
    type: BaseProductTypeType;
    closeDialog: VoidFunction;
}

export const TypeEditForm = ({ type, closeDialog }: TypeEditFormProps) => {
    const { form, submit, isPending } = useEditType(type, closeDialog);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='name'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoFocus placeholder='Type Name' type='text' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <DialogFooter className='mt-5 gap-2 sm:gap-0'>
                    <DialogClose asChild>
                        <Button type='button' variant='outline'>
                            Cancel
                        </Button>
                    </DialogClose>
                    <SubmitButton
                        type='submit'
                        disabledWhen={form.formState.isSubmitting || isPending}
                        defaultLabel='Save'
                        onLoadingLabel='Saving...'
                    />
                </DialogFooter>
            </form>
        </Form>
    );
};
