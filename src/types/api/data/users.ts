import { ApiResponse } from '../response';
import { BaseRoleType } from './roles';

type UserRole = Omit<BaseRoleType, 'guard' | 'created' | 'updated'>;

export interface BaseUserType {
    id: number;
    name: string;
    username: string;
    email: string;
    verified?: string;
    joined: string;
    role: UserRole;
}

export interface UserIndexType extends BaseUserType {
    avatar: string;
}

export type FetchAllUserResponse = ApiResponse<{ users: UserIndexType[] }>;

export interface UserShowType extends BaseUserType {
    avatar: string;
    last_updated_account?: string;
    last_updated_password?: string;
    updated: string;
}

export type FetchSingleUserResponse = ApiResponse<{ user: UserShowType }>;
