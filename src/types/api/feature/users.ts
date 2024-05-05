import { ApiResponseWithPaginateData } from '@/types/api-response';

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
    verified: string;
    joined: string;
};

export interface UserResponse extends ApiResponseWithPaginateData {
    data: User[];
}
