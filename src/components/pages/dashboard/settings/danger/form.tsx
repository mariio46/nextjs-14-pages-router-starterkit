import { InputError } from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks/use-loading';
import { TOKEN_COOKIE_KEY } from '@/lib/api/key';
import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';
import { ApiResponse } from '@/types/api-response';
import { AxiosResponse, isAxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useState } from 'react';

export const DeleteAccountForm = ({ closeDialog }: { closeDialog: () => void }) => {
    const router = useRouter();
    const setUser = useAuthState((state) => state.setUser);
    const { toast } = useToast();
    const { loading, startLoading, stopLoading } = useLoading();
    const [errors, setErrors] = useState<{ password?: string[] }>({
        password: [],
    });
    const [data, setData] = useState<{ password: string }>({
        password: '',
    });

    const submit: React.FormEventHandler = async (e) => {
        e.preventDefault();
        startLoading();
        try {
            // prettier-ignore
            const {data: response}: AxiosResponse<ApiResponse> = await axios.post('/delete-account', data, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY))

            if (response.code === 200) {
                toast({
                    title: 'Success',
                    description: response.message,
                    duration: 2000,
                });

                deleteCookie(TOKEN_COOKIE_KEY);

                setTimeout(() => {
                    setUser(null, false);
                    router.reload();
                }, 2100);
            }
        } catch (e: any) {
            if (isAxiosError(e)) {
                if (e.response?.status === 422) {
                    const error: { password?: string[] } = e.response?.data.errors;
                    setErrors({ ...errors, password: error.password });
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
        } finally {
            stopLoading();
        }
    };

    return (
        <>
            <form onSubmit={submit}>
                <div>
                    <Label htmlFor='password' className='sr-only'>
                        Password
                    </Label>
                    <Input
                        id='password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })}
                        autoFocus
                        type='password'
                        required
                        placeholder='********'
                        className='mt-1'
                        autoComplete='current-password'
                    />
                    <InputError message={errors?.password?.[0]} className='mt-1' />
                </div>
                <div className='flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-3'>
                    <Button type='button' variant='outline' onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button type='submit' variant='destructive' disabled={loading}>
                        Confirm
                    </Button>
                </div>
            </form>
        </>
    );
};
