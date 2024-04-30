import { z } from 'zod';
import { User } from './user';

type Data = {
    user: User;
    token: string;
};

export type LoginFormResponse = {
    code: number;
    message: string;
    data: Data;
};

export const loginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export type LoginFormType = z.infer<typeof loginFormSchema>;
