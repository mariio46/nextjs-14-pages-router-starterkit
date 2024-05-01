import { Icon } from '@/components/icon';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import { ApiResponse } from '@/types/api-response';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse, isAxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface UpdatePasswordResponse extends ApiResponse {
    data: null;
}

// prettier-ignore
const updatePasswordFormSchema = z.object({
    current_password: z.string(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
}).refine((fields) => fields.password === fields.password_confirmation, {
    message: "Password doesn't match.",
    path: ['password'],
})

type UpdatePasswordFormFields = z.infer<typeof updatePasswordFormSchema>;

export const UpdatePasswordForm = () => {
    const { setUser } = useAuthState();
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

    const submit = async (values: UpdatePasswordFormFields) => {
        try {
            // prettier-ignore
            const { data }: AxiosResponse<UpdatePasswordResponse> = await axios.post('/security', values, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY))

            if (data.code === 200) {
                setUser(null, false);

                toast({
                    title: 'Success',
                    description: data.message,
                    duration: 2000,
                });

                deleteCookie(TOKEN_COOKIE_KEY);

                setTimeout(() => {
                    router.reload();
                }, 2100);
            }
        } catch (e: any) {
            if (isAxiosError(e)) {
                if (e.response?.status === 422) {
                    const error: { current_password?: string[]; password?: string[] } = e.response?.data.errors;
                    error?.current_password &&
                        form.setError('current_password', { message: error?.current_password[0] });
                    error?.password && form.setError('password', { message: error?.password[0] });
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
