import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { UserIndexType, UserShowType } from '@/types/api/data/users';
import type { ApiResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_USERS_KEY } from '@/lib/query-key';

type DeleteUserResponse = ApiResponse<string>;
type DeleteUserErrorResponse = AxiosError<ApiResponse<string>>;

const submitDeletedUserToServer = async (username: string) => {
    const response = await axios.delete<DeleteUserResponse>(`/users/${username}/delete`, getClientSideAxiosHeaders());
    return response.data;
};

const useDeleteUserMutation = (username: string) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<DeleteUserResponse, DeleteUserErrorResponse, string>({
        mutationKey: ['delete-user', { username: username }],
        mutationFn: submitDeletedUserToServer,
        onSettled: (data, error, variables, context) => {
            queryClient.removeQueries({
                queryKey: [FETCH_ALL_USERS_KEY, { username: variables }],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_USERS_KEY],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useDeleteUserHandler = (closeDialog: () => void) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: DeleteUserResponse) => {
        closeDialog();

        toast({
            title: 'Success',
            description: response.data,
        });

        if (router.asPath !== '/users') router.push('/users');

        return response;
    };

    const handleError = (error: DeleteUserErrorResponse) => {
        closeDialog();
        toast({
            title: 'Failed',
            description: error.message,
            variant: 'destructive',
            duration: 10000,
        });
    };

    return { handleError, handleSuccess };
};

export const useDeleteUser = (user: UserShowType | UserIndexType, closeDialog: () => void) => {
    const { mutateAsync, isPending } = useDeleteUserMutation(user.username);
    const { handleError, handleSuccess } = useDeleteUserHandler(closeDialog);

    const handleDeleteUser = async (username: string) => {
        try {
            const response = await mutateAsync(username);
            handleSuccess(response);
        } catch (error) {
            handleError(error as DeleteUserErrorResponse);
        }
    };

    return { handleDeleteUser, isPending };
};
