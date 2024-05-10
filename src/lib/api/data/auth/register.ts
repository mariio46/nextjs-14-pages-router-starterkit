import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { ApiResponse } from '@/types/api/response';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { BE_REGISTER } from '../../end-point';

type RegisterFormResponse = ApiResponse<string>;

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

    const submit = async (values: RegisterFormFields) => {
        try {
            const { data } = await axios.post<RegisterFormResponse>(BE_REGISTER, values);

            toast({
                title: 'Success',
                description: data.data,
                duration: 2000,
            });

            form.reset();

            setTimeout(() => router.push('/login'), 2100);
        } catch (e: any) {
            const error = e.response?.data.errors;
            // prettier-ignore
            handleAxiosError(e, toast, {
                error_name: error?.name && form.setError('name', { message: error?.name[0] }),
                error_email: error?.email && form.setError('email', { message: error?.email[0] }, { shouldFocus: true }),
                error_password: error?.password && form.setError('password', { message: error?.password[0] }),
            });
        }
    };

    return { submit, form };
};
