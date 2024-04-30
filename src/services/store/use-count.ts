import { create } from 'zustand';

type Count = {
    count: number;
    inc: () => void;
    dec: () => void;
    reset: () => void;
};

const useCount = create<Count>((set) => ({
    count: 0,
    inc: () => set((state) => ({ count: state.count + 1 })),
    dec: () => set((state) => ({ count: state.count - 1 })),
    reset: () => set({ count: 0 }),
}));

export default useCount;
