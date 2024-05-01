import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import type { ApiResponse } from '@/types/api-response';
import type { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { isAxiosError, type AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UpdateAccountResponse extends ApiResponse {
    data: User;
}

const updateAccountFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().email().toLowerCase(),
});

type UpdateAccountFormFields = z.infer<typeof updateAccountFormSchema>;

export const UpdateAccountForm = () => {
    const { user, setUser, check } = useAuthState();
    const { toast } = useToast();
    const form = useForm<UpdateAccountFormFields>({
        resolver: zodResolver(updateAccountFormSchema),
        defaultValues: {
            name: user?.name,
            email: user?.email,
        },
    });

    const submit = async (values: UpdateAccountFormFields) => {
        try {
            const { data }: AxiosResponse<UpdateAccountResponse> = await axios.post(
                '/account',
                values,
                getAxiosHeadersWithToken(TOKEN_COOKIE_KEY),
            );

            const user = data.data;

            setUser(user, check);

            form.reset({
                name: user.name,
                email: user.email,
            });

            toast({
                title: 'Success',
                description: data.message,
                duration: 2000,
            });
        } catch (e: any) {
            if (isAxiosError(e)) {
                if (e.response?.status === 422) {
                    const error: { name?: string[]; email?: string[] } = e.response?.data.errors;
                    error?.name && form.setError('name', { message: error?.name[0] });
                    error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true });
                } else {
                    toast({
                        title: 'Failed',
                        description: e.response?.data?.message ?? 'Server is busy. Try again later!',
                        variant: 'destructive',
                    });
                }
            } else {
                console.error(e);
            }
        }
    };

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
                                    placeholder='Your name'
                                    autoComplete='name'
                                    autoFocus
                                    type='text'
                                    aria-label='Name'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='email'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='example@mail.com'
                                    autoComplete='email'
                                    type='email'
                                    aria-label='Email'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button type='submit' disabled={form.formState.isSubmitting} aria-label='Update'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Update' : 'Updating...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
