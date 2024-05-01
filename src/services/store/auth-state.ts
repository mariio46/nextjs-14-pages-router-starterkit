import { User } from '@/types/user';
import { create } from 'zustand';

type Auth = {
    user: User | null;
    check: boolean;
    status: (check: boolean) => string;
    setUser: (user: User | null, check: boolean) => void;
    clear: () => void;
};

const useAuthState = create<Auth>()((set) => ({
    user: null,
    check: false,
    status: (check) => (check ? 'Authenticated' : 'Not Authenticated'),
    setUser: (user, check) => set({ user: user, check: check }),
    clear: () => set({ user: null, check: false }),
}));

export default useAuthState;
