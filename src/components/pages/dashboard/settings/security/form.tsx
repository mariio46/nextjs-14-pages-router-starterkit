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
import { ApiResponse } from '@/types/api-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UpdatePasswordResponse extends ApiResponse {
    data: null;
}

// prettier-ignore
const updatePasswordFormSchema = z.object({
    current_password: z.string({
        required_error: 'Current Password is required.',
        invalid_type_error: 'Current Password must be a string.',
    }).min(1,{ message: 'Current Password is required.' }),
    password: z.string({
        required_error: 'New Password is required.',
        invalid_type_error: 'New Password must be a string.',
    }).min(8, { message: 'New Password field must be at least 8 characters.' }),
    password_confirmation: z.string({
        required_error: 'Password Confirmation is required.',
        invalid_type_error: 'Password Confirmation must be a string.',
    }).min(8, { message: 'Password Confirmation field must be at least 8 characters.' }),
}).refine((fields) => fields.password === fields.password_confirmation, {
    message: "Password field confirmation does not match.",
    path: ['password'],
})

type UpdatePasswordFormFields = z.infer<typeof updatePasswordFormSchema>;

export const UpdatePasswordForm = () => {
    const setUser = useAuthState((state) => state.setUser);
    const router = useRouter();
    const { toast } = useToast();
    const form = useForm<UpdatePasswordFormFields>({
        resolver: zodResolver(updatePasswordFormSchema),
        defaultValues: {
            current_password: '',
            password: '',
            password_confirmation: '',
        },
    });

    const submit = async (values: UpdatePasswordFormFields): Promise<void> => {
        try {
            // prettier-ignore
            const response: AxiosResponse<UpdatePasswordResponse> = await axios.post('/security', values, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY))

            if (response.status === 200 && response.data.code === 200) {
                handleWhenUpdatingPasswordIsSuccess(response.data);
            } else {
                console.log(response);
            }
        } catch (e: any) {
            const error: { current_password?: string[]; password?: string[] } = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e,toast, {
                error_current_password: error?.current_password && form.setError('current_password', { message: error?.current_password[0] }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        }
    };

    const handleWhenUpdatingPasswordIsSuccess = (data: UpdatePasswordResponse): void => {
        form.reset();

        toast({
            title: 'Success',
            description: data.message,
            duration: 2000,
        });

        deleteCookie(TOKEN_COOKIE_KEY);

        setTimeout(() => setUser(null, false), 2100);

        setTimeout(() => router.reload(), 2200);
    };
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
                <FormField
                    control={form.control}
                    name='current_password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='current-password'
                                    aria-label='Current Password'
                                    disabled={form.formState.isSubmitSuccessful}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='new-password'
                                    aria-label='New Password'
                                    disabled={form.formState.isSubmitSuccessful}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name='password_confirmation'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm New Password</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder='********'
                                    type='password'
                                    autoComplete='confirm-new-password'
                                    aria-label='Confirm New Password'
                                    disabled={form.formState.isSubmitSuccessful}
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
                        disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                        aria-label='Update'>
                        {form.formState.isSubmitting && <Icon name='IconLoader' className='size-4 me-1 animate-spin' />}
                        {!form.formState.isSubmitting ? 'Update' : 'Updating...'}
                    </Button>
                </div>
            </form>
        </Form>
    );
};
