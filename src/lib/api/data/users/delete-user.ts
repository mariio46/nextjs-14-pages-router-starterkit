import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';
import { ApiResponse } from '@/types/api-response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

export interface DeleteUserResponse extends ApiResponse {
    data: string | null;
}

export const deleteUser = async (username: string) => {
    // prettier-ignore
    return await axios.delete<DeleteUserResponse>(`/users/${username}`, getClientSideAxiosHeaders()).then(res => res.data)
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    const { toast } = useToast();

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
            queryClient.invalidateQueries({ queryKey: [FETCH_ALL_USERS_KEY], exact: true });
        },
    });

    // prettier-ignore
    const handleDeleteUser = (username: string) => mutation.mutateAsync(username).then(res => res).catch(e => e)

    return { handleDeleteUser, isPending: mutation.isPending, isSuccess: mutation.isSuccess };
};
