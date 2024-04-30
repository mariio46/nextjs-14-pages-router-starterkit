export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    created_at: string;
    updated_at: string;
};

export type AuthUserType = {
    user: User;
};
