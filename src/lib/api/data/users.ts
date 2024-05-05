import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks/use-loading';
import axios from '@/lib/axios';
import { authFetcher } from '@/lib/swr-fetcher';
import { handleAxiosError } from '@/lib/utilities/axios-utils';
import { getAxiosHeadersWithToken } from '@/lib/utils';
import { ApiResponse } from '@/types/api-response';
import { UserResponse } from '@/types/api/feature/users';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { TOKEN_COOKIE_KEY } from '../key';

interface FetchUsersHookReturn {
    searchUserRef: React.RefObject<HTMLInputElement>;
    search: string;
    setSearch: (search: string) => void;
    url: string;
    setUrl: (url: string) => void;
    data?: UserResponse;
    isLoading: boolean;
    error: any;
    useSearch: (e: React.FormEvent) => void;
    defaultUsersUrlLabel: string;
    searchUsersUrlLabel: string;
    deleteUser: (username: string, current_url: string) => Promise<void>;
    loading: boolean;
}

export const useFetchUsers = (): FetchUsersHookReturn => {
    const { loading, startLoading, stopLoading } = useLoading();

    const { toast } = useToast();

    const defaultUsersUrlLabel: string = 'http://localhost:8080/api/users?page=1';

    const searchUsersUrlLabel: string = 'http://localhost:8080/api/users?search=';

    const searchUserRef = useRef<HTMLInputElement>(null);

    const [search, setSearch] = useState<string>('');

    const [url, setUrl] = useState<string>(defaultUsersUrlLabel);

    const { data, isLoading, error } = useSWR<UserResponse>(url, authFetcher);

    const { mutate } = useSWRConfig();

    const useSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setUrl(`${searchUsersUrlLabel}${searchUserRef.current?.value.trim()}`);
        setSearch('');
    };

    const deleteUser = async (username: string, current_url: string) => {
        startLoading();
        try {
            const response: AxiosResponse<ApiResponse & { data: string }> = await axios.delete(
                `users/${username}`,
                getAxiosHeadersWithToken(TOKEN_COOKIE_KEY),
            );
            if (response.status === 200 && response.data.code === 200) {
                toast({
                    title: response.data.message,
                    description: response.data.data,
                });
                mutate(current_url);
            } else {
                console.log(response);
            }
        } catch (e: any) {
            handleAxiosError(e, toast, {
                error: toast({
                    title: 'Failed',
                    description: `Error when deleting user with username: ${username}`,
                    variant: 'destructive',
                }),
            });
        } finally {
            stopLoading();
        }
    };

    return {
        searchUserRef,
        search,
        setSearch,
        url,
        setUrl,
        data,
        isLoading,
        error,
        useSearch,
        defaultUsersUrlLabel,
        searchUsersUrlLabel,
        deleteUser,
        loading,
    };
};

type DeleteUserHookReturn = {
    handleDelete: (username: string) => Promise<void>;
    loading: boolean;
};

export const useDeleteUser = (): DeleteUserHookReturn => {
    const router = useRouter();
    const { toast } = useToast();
    const { loading, startLoading, stopLoading } = useLoading();
    const handleDelete = async (username: string) => {
        startLoading();
        try {
            const response: AxiosResponse<ApiResponse & { data: string }> = await axios.delete(
                `users/${username}`,
                getAxiosHeadersWithToken(TOKEN_COOKIE_KEY),
            );
            if (response.status === 200 && response.data.code === 200) {
                toast({
                    title: response.data.message,
                    description: response.data.data,
                });
                router.replace(router.asPath, router.asPath, { scroll: false });
            } else {
                console.log(response);
            }
        } catch (e: any) {
            handleAxiosError(e, toast, {
                error: toast({
                    title: 'Failed',
                    description: `Error when deleting user with username: ${username}`,
                    variant: 'destructive',
                }),
            });
        } finally {
            stopLoading();
        }
    };

    return { handleDelete, loading };
};
