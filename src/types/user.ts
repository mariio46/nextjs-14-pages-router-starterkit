export type Role = {
    id: number;
    name: string;
};

export type Permissions = {
    permissions: string[];
};

export type RolePermission = Role & Permissions;

export type User = {
    id: number;
    name: string;
    username: string;
    last_updated_account: string;
    last_updated_password: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
    role: RolePermission;
};

export type AuthUserType = {
    user: User;
};
