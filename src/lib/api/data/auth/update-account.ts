import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { ApiResponse } from '@/types/api-response';
import { User } from '@/types/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosResponse } from 'axios';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BE_UPDATE_ACCOUNT } from '../../end-point';

interface UpdateAccountResponse extends ApiResponse {
    data: User;
}

// prettier-ignore
const updateAccountFormSchema = z.object({
    name: z.string().min(3, { 
            message: 'The name field must be at least 3 characters.' 
        }),
    username: z.string().min(5, {
            message: 'The username field must be at least 5 characters.',
        }).max(25, {
            message: 'The username field must not be greater than 25 characters.',
        }).toLowerCase(),
    email: z.string().email({ 
            message: 'The email field must be a valid email address.' 
        }).toLowerCase(),
});

type UpdateAccountFormFields = z.infer<typeof updateAccountFormSchema>;

export const useUpdateAccount = () => {
    const authUser = useAuthUserState((state) => {
        return {
            name: state.user?.name,
            username: state.user?.username,
            email: state.user?.email,
        };
    });
    const setValidating = useAuthUserState((state) => state.isValidating);

    const { toast } = useToast();

    const form = useForm<UpdateAccountFormFields>({
        resolver: zodResolver(updateAccountFormSchema),
        defaultValues: {
            name: authUser?.name,
            username: authUser?.username,
            email: authUser?.email,
        },
    });

    const submit = async (values: UpdateAccountFormFields): Promise<void> => {
        try {
            // prettier-ignore
            const response: AxiosResponse<UpdateAccountResponse> = await axios.post(BE_UPDATE_ACCOUNT, values, getClientSideAxiosHeaders());

            if (response.status === 200 && response.data.code === 200) {
                handleWhenUpdatingAccountIsSuccess(response.data);
            } else {
                console.log(response);
            }
        } catch (e: any) {
            const error: { name?: string[]; username?: string[]; email?: string[] } = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_name :error?.name && form.setError('name', { message: error?.name[0] }),
                error_username :error?.username && form.setError('username', { message: error?.username[0] }),
                error_email :error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
            })
        }
    };

    const handleWhenUpdatingAccountIsSuccess = (data: UpdateAccountResponse): void => {
        // Revalidate Auth User State
        setValidating(false);

        // Toast for showing that updating account is success
        toast({
            title: 'Success',
            description: data.message,
        });
    };

    return { submit, form };
};
