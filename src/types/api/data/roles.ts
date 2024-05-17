import { ApiResponse } from '../response';

export type BaseRoleType = {
    id: number;
    name: string;
    guard: string;
    created: string;
    updated: string;
};

export interface RoleIndexType extends BaseRoleType {
    permissions_count: number;
    users_count: number;
}

export type RoleShowUserType = {
    id: number;
    name: string;
    username: string;
    created: string;
    updated: string;
};

export type RoleShowPermissionType = {
    id: number;
    name: string;
    guard: string;
    created: string;
    updated: string;
};

export interface RoleShowType extends BaseRoleType {
    users?: RoleShowUserType[];
    permissions?: RoleShowPermissionType[];
}

export type FetchSingleRoleResponse = ApiResponse<{ role: RoleShowType }>;

export type FetchAllRolesResponse = ApiResponse<{ roles: RoleIndexType[] }>;
