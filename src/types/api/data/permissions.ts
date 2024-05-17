import { ApiResponse } from '../response';
import { BaseRoleType } from './roles';

export type BasePermissionType = {
    id: number;
    name: string;
    guard: string;
    created: string;
    updated: string;
};

export interface PermissionIndexType extends BasePermissionType {
    roles_count: number;
}

export type FetchAllPermissionResponse = ApiResponse<{ permissions: PermissionIndexType[] }>;

export interface PermissionShowType extends BasePermissionType {
    roles?: BaseRoleType[];
}

export type FetchSinglePermissionResponse = ApiResponse<{ permission: PermissionShowType }>;
