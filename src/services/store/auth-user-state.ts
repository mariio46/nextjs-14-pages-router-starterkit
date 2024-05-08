import { User } from '@/types/user';
import { create } from 'zustand';

type StatusType = 'validated' | 'revalidate';

type Auth = {
    user: User | undefined;
    setUser: (user?: User) => void;
    check: boolean;
    setCheck: (check: boolean) => void;
    validating: boolean;
    isValidating: (validating: boolean) => void;
    status: StatusType;
    setStatus: (status: StatusType) => void;
};

export const useAuthUserState = create<Auth>()((set) => ({
    user: undefined,
    setUser: (user) => set({ user: user }),
    check: false,
    setCheck: (check) => set({ check: check }),
    validating: false,
    isValidating: (validating) => set({ validating: validating }),
    status: 'revalidate',
    setStatus: (status) => set({ status: status }),
}));
