import axios from '@/lib/axios';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import { ApiResponse } from '@/types/api-response';
import { CookieValueTypes } from 'cookies-next';
import { z } from 'zod';
import { TOKEN_COOKIE_KEY } from '../../key';

export const getAllUsers = async (token: CookieValueTypes) => {
    return await axios
        .get('/users', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then((res) => res.data);
};

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
