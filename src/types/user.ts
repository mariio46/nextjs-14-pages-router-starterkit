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
};

export type AuthUserType = {
    user: User;
};
