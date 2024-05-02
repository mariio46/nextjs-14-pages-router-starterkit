import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import type { ApiResponse } from '@/types/api-response';
import type { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosResponse } from 'axios';
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
    const authUser = useAuthState((state) => state.user);
    const setUser = useAuthState((state) => state.setUser);
    const check = useAuthState((state) => state.check);

    const { toast } = useToast();

    const form = useForm<UpdateAccountFormFields>({
        resolver: zodResolver(updateAccountFormSchema),
        defaultValues: {
            name: authUser?.name,
            email: authUser?.email,
        },
    });

    const submit = async (values: UpdateAccountFormFields): Promise<void> => {
        try {
            // prettier-ignore
            const response: AxiosResponse<UpdateAccountResponse> = await axios.post('/account', values, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY));

            if (response.status === 200 && response.data.code === 200) {
                handleWhenUpdatingAccountIsSuccess(response.data);
            } else {
                console.log(response);
            }
        } catch (e: any) {
            const error: { name?: string[]; email?: string[] } = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_name :error?.name && form.setError('name', { message: error?.name[0] }),
                error_email :error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
            })
        }
    };

    const handleWhenUpdatingAccountIsSuccess = (data: UpdateAccountResponse): void => {
        // New user from API
        const user = data.data;

        // Set old User to a new User from API
        setUser(user, check);

        // Reset form and override the default value with new User from API
        form.reset({
            name: user.name,
            email: user.email,
        });

        // Toast for showing that updating account is success
        toast({
            title: 'Success',
            description: data.message,
            duration: 2000,
        });
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
                                    disabled={form.formState.isSubmitting}
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
                                    disabled={form.formState.isSubmitting}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div>
                    <Button
                        type='submit'
                        disabled={!form.formState.isDirty || form.formState.isSubmitting}
                        aria-label='Update'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Update' : 'Updating...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
