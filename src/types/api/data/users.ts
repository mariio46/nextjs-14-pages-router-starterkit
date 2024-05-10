export type UsersType = {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar: string;
    verified: string;
    joined: string;
};

export interface SingleUserType extends UsersType {
    last_updated_account: string;
    last_updated_password: string;
}
