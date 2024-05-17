import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import {
    MultiSelector,
    MultiSelectorContent,
    MultiSelectorInput,
    MultiSelectorItem,
    MultiSelectorList,
    MultiSelectorTrigger,
} from './multi-select-extension';

const schema = z.object({
    permissions: z.array(z.string()),
});

type FormValues = z.infer<typeof schema>;

export const MultiSelectForm = ({ permissions }: { permissions: { label: string; value: string }[] }) => {
    const form = useForm<FormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            permissions: [],
        },
    });

    const onSubmit = async (values: FormValues) => {
        await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-3'>
                <FormField
                    control={form.control}
                    name='permissions'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Permissions</FormLabel>
                            <FormControl>
                                <MultiSelector onValuesChange={field.onChange} values={field.value}>
                                    <MultiSelectorTrigger>
                                        <MultiSelectorInput placeholder='Select permissions' />
                                    </MultiSelectorTrigger>
                                    <MultiSelectorContent>
                                        <MultiSelectorList>
                                            {permissions.map((option, i) => (
                                                <MultiSelectorItem key={i} value={option.value}>
                                                    {option.label}
                                                </MultiSelectorItem>
                                            ))}
                                        </MultiSelectorList>
                                    </MultiSelectorContent>
                                </MultiSelector>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'>Submit</Button>
            </form>
        </Form>
    );
};
