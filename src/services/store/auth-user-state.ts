import { User } from '@/types/user';
import { create } from 'zustand';

type Auth = {
    user: User | undefined;
    setUser: (user?: User) => void;
    check: boolean;
    setCheck: (check: boolean) => void;
};

export const useAuthUserState = create<Auth>()((set) => ({
    user: undefined,
    setUser: (user) => set({ user: user }),
    check: false,
    setCheck: (check) => set({ check: check }),
}));
