import { useCreateProduct } from '@/lib/api/data/products/create-product';

import { SubmitButton } from '@/components/submit-button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export const ProductCreateForm = () => {
    const { form, submit, isPending } = useCreateProduct();

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
                                <Input
                                    autoFocus
                                    aria-label='Name'
                                    placeholder='The name of your product'
                                    autoComplete='name'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='description'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea placeholder='Tell us a little bit about product' rows={5} {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='price'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Price</FormLabel>
                            <FormControl>
                                <Input
                                    aria-label='Price'
                                    placeholder='The price of your product'
                                    autoComplete='price'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <SubmitButton
                    disabledWhen={form.formState.isSubmitting || isPending}
                    defaultLabel='Save'
                    onLoadingLabel='Saving...'
                />
            </form>
        </Form>
    );
};
