import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { ApiResponse, ApiValidationErrorResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { BE_REGISTER } from '../../end-point';

type RegisterFormResponse = ApiResponse<string>;

type RegisterErrorResponse = ApiValidationErrorResponse<{ name: string[]; email: string[]; password: string[] }>;

// prettier-ignore
const registerFormSchema = z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
    password_confirmation: z.string().min(8),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Password doesn't match.",
    path: ['password_confirmation'],
});

type RegisterFormFields = z.infer<typeof registerFormSchema>;

export const useRegister = () => {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<RegisterFormFields>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
        },
    });

    // prettier-ignore
    const submit = async (values: RegisterFormFields) => {
        await axios.post<RegisterFormResponse>(BE_REGISTER, values)
            .then((response) => handleWhenRegisterSuccess(response.data))
            .catch((e: AxiosError<RegisterErrorResponse>) => handleWhenRegisterFailed(e))
    };

    const handleWhenRegisterSuccess = (data: RegisterFormResponse): void => {
        toast({
            title: 'Success',
            description: data.data,
            duration: 2000,
        });

        form.reset();

        router.push('/login');
    };

    const handleWhenRegisterFailed = (e: AxiosError<RegisterErrorResponse>): void => {
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

    return { submit, form };
};
