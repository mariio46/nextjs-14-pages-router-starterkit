import { useCreateProduct } from '@/lib/api/data/products/create-product';

import { Icon } from '@/components/icon';
import { SubmitButton } from '@/components/submit-button';
import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import type { FormData } from '@/types/form-data';

interface ProductCreateFormProps {
    categories: FormData[];
    types: FormData[];
}

export const ProductCreateForm = ({ categories, types }: ProductCreateFormProps) => {
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

                <FormField
                    control={form.control}
                    name='category'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel className='mb-1'>Category</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className={cn(
                                                'justify-between w-full',
                                                !field.value && 'text-muted-foreground',
                                            )}>
                                            {field.value
                                                ? categories.find((category) => category.value === field.value)?.label
                                                : 'Select category'}
                                            <Icon name='IconSelector' className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align='end' className='w-full p-0'>
                                    <Command>
                                        <CommandInput placeholder='Search category...' className='h-9' />
                                        <CommandEmpty>No category found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandList>
                                                {categories.map((category) => (
                                                    <CommandItem
                                                        value={category.label}
                                                        key={category.value}
                                                        onSelect={() => {
                                                            form.setValue('category', category.value);
                                                        }}>
                                                        {category.label}
                                                        <Icon
                                                            name='IconCheck'
                                                            className={cn(
                                                                'ml-auto h-4 w-4',
                                                                category.value === field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name='type'
                    render={({ field }) => (
                        <FormItem className='flex flex-col'>
                            <FormLabel className='mb-1'>Type</FormLabel>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                            variant='outline'
                                            role='combobox'
                                            className={cn(
                                                'justify-between w-full',
                                                !field.value && 'text-muted-foreground',
                                            )}>
                                            {field.value
                                                ? types.find((type) => type.value === field.value)?.label
                                                : 'Select type'}
                                            <Icon name='IconSelector' className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                                        </Button>
                                    </FormControl>
                                </PopoverTrigger>
                                <PopoverContent align='end' className='w-full p-0'>
                                    <Command>
                                        <CommandInput placeholder='Search type...' className='h-9' />
                                        <CommandEmpty>No type found.</CommandEmpty>
                                        <CommandGroup>
                                            <CommandList>
                                                {types.map((type) => (
                                                    <CommandItem
                                                        value={type.label}
                                                        key={type.value}
                                                        onSelect={() => {
                                                            form.setValue('type', type.value);
                                                        }}>
                                                        {type.label}
                                                        <Icon
                                                            name='IconCheck'
                                                            className={cn(
                                                                'ml-auto h-4 w-4',
                                                                type.value === field.value
                                                                    ? 'opacity-100'
                                                                    : 'opacity-0',
                                                            )}
                                                        />
                                                    </CommandItem>
                                                ))}
                                            </CommandList>
                                        </CommandGroup>
                                    </Command>
                                </PopoverContent>
                            </Popover>
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
