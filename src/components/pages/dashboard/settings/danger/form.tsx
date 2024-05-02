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

interface DeleteAccountResponse extends ApiResponse {
    data: null;
}

const deleteAccountFormSchema = z.object({
    password: z.string().min(1, { message: 'Password is required.' }),
});

type DeleteAccountFormFields = z.infer<typeof deleteAccountFormSchema>;

export const DeleteAccountForm = ({ closeDialog }: { closeDialog: () => void }) => {
    const router = useRouter();
    const setUser = useAuthState((state) => state.setUser);
    const { toast } = useToast();
    const form = useForm<DeleteAccountFormFields>({
        resolver: zodResolver(deleteAccountFormSchema),
        defaultValues: {
            password: '',
        },
    });

    const submit = async (values: DeleteAccountFormFields) => {
        try {
            // prettier-ignore
            const response: AxiosResponse<DeleteAccountResponse> = await axios.post('/delete-account', values, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY))

            if (response.status === 200 && response.data.code === 200) {
                handleWhenDeletingAccountIsSuccess(response.data);
            } else {
                console.log(response);
            }
        } catch (e: any) {
            const error: { password?: string[] } = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e,toast, {
                error_password: error?.password && form.setError('password', { message: error?.password[0] }, { shouldFocus: true }),
            });
        }
    };

    const handleWhenDeletingAccountIsSuccess = (data: DeleteAccountResponse): void => {
        closeDialog();

        toast({
            title: 'Success',
            description: data.message,
            duration: 2000,
        });

        deleteCookie(TOKEN_COOKIE_KEY);

        setTimeout(() => {
            setUser(null, false);
            router.reload();
        }, 2100);
    };

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(submit)} className='space-y-4'>
                    <FormField
                        control={form.control}
                        name='password'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
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
                    <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2'>
                        <Button variant='outline' type='button' onClick={closeDialog}>
                            Cancel
                        </Button>
                        <Button
                            type='submit'
                            variant='destructive'
                            disabled={form.formState.isSubmitting || form.formState.isSubmitSuccessful}
                            aria-label='Update'>
                            {form.formState.isSubmitting && (
                                <Icon name='IconLoader' className='size-4 me-1 animate-spin' />
                            )}
                            {!form.formState.isSubmitting ? 'Delete Account' : 'Deleting...'}
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};
