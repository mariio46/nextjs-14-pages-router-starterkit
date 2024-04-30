import { useState } from 'react';

type UseLoadingType = {
    loading: boolean;
    setLoading: (loading: boolean) => void;
    startLoading: () => void;
    stopLoading: () => void;
};

export const useLoading = (initialState: boolean = false): UseLoadingType => {
    const [loading, setLoading] = useState<boolean>(initialState);

    const startLoading = (): void => setLoading(true);
    const stopLoading = (): void => setLoading(false);

    return { loading, setLoading, startLoading, stopLoading };
};
