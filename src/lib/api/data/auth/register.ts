import { zodResolver } from '@hookform/resolvers/zod';
import { type AxiosError } from 'axios';
import { deleteCookie, hasCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useForm, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import type { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';
import { BE_REGISTER } from '../../end-point';
import { TOKEN_DELETED_KEY } from '../../key';

type RegisterFormResponse = ApiResponse<string>;

type RegisterErrorResponse = AxiosError<
    ApiValidationErrorResponse<{ name: string[]; email: string[]; password: string[] }>
>;

const registerFormSchema = z
    .object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Password doesn't match.",
        path: ['password_confirmation'],
    });

type RegisterFormFields = z.infer<typeof registerFormSchema>;

const useRegsiterHandler = (form: UseFormReturn<RegisterFormFields>) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (data: RegisterFormResponse) => {
        form.reset();

        toast({
            title: 'Success',
            description: data.data,
        });

        router.push('/login');
    };

    const handleError = (e: RegisterErrorResponse) => {
        if (e.response?.data.errors) {
            const error = e.response.data.errors;
            error.name && form.setError('name', { message: error.name[0] });
            error.email && form.setError('email', { message: error.email[0] }, { shouldFocus: true });
            error.password && form.setError('password', { message: error.password[0] });
        } else {
            console.error(e);
            toast({
                title: 'Failed!',
                description: e.message,
                variant: 'destructive',
                duration: 10000,
            });
        }
    };

    return { handleError, handleSuccess };
};

export const useRegister = () => {
    const form = useForm<RegisterFormFields>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    const { handleError, handleSuccess } = useRegsiterHandler(form);

    const submit = async (values: RegisterFormFields) => {
        if (hasCookie(TOKEN_DELETED_KEY)) {
            deleteCookie(TOKEN_DELETED_KEY);
        }

        try {
            const { data } = await axios.post<RegisterFormResponse>(BE_REGISTER, values);
            handleSuccess(data);
        } catch (error) {
            handleError(error as RegisterErrorResponse);
        }
    };

    return { submit, form };
};
