import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utilities/axios-utils';
import { ApiResponse } from '@/types/api-response';
import { z } from 'zod';
import { TOKEN_COOKIE_KEY } from '../../key';

export interface CreateUserFormResponse extends ApiResponse {
    data: string;
}

export interface CreateUserErrorResponse {
    errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
    };
}

export const createUserFormSchema = z
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

export type CreateUserFormFields = z.infer<typeof createUserFormSchema>;

export const createUser = async (values: CreateUserFormFields) => {
    // prettier-ignore
    return await axios.post<CreateUserFormResponse>('/users', values, getAxiosHeadersWithToken(TOKEN_COOKIE_KEY)).then((res) => res.data);
};
