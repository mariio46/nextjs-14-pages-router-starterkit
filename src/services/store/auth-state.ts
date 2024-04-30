import { User } from '@/types/user';
import { create } from 'zustand';

type Auth = {
    user: User | null;
    check: boolean;
    setUser: (user: User | null, check: boolean) => void;
    clear: () => void;
};
/**
 *  ? 'Authenticated' : 'Not Authenticated'
 */

const useAuthState = create<Auth>()((set) => ({
    user: null,
    check: false,
    setUser: (user, check) => set({ user: user, check: check }),
    clear: () => set({ user: null, check: false }),
}));

export default useAuthState;
