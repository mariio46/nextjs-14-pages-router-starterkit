import { useToast } from '@/components/ui/use-toast';
import { useLoading } from '@/hooks/use-loading';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { ApiResponse } from '@/types/api/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

type DeleteUserResponse = ApiResponse<string | null>;

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const { loading, startLoading, stopLoading } = useLoading();

    const deleteUser = async (username: string) => {
        // prettier-ignore
        startLoading()
        return await axios
            .delete<DeleteUserResponse>(`/users/${username}`, getClientSideAxiosHeaders())
            .then((res) => res.data);
    };

    const mutation = useMutation({
        mutationFn: deleteUser,
        onError: (error: AxiosError<DeleteUserResponse>) => {
            toast({
                title: 'Failed',
                description: error.response?.data.data + ' Check again!' ?? `Something went wrong, Try again later!`,
                variant: 'destructive',
                duration: 10000,
            });
        },
        onSuccess: (data) => {
            toast({
                title: 'Success',
                description: data.data,
            });
            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_USERS_KEY],
                exact: true,
            });
        },
        onSettled: () => setTimeout(() => stopLoading(), 2500) as unknown,
    });

    // prettier-ignore
    const handleDeleteUser = (username: string) => mutation.mutateAsync(username).then(res => res).catch(e => e)

    return { handleDeleteUser, isPending: mutation.isPending, isSuccess: mutation.isSuccess, loading };
};
