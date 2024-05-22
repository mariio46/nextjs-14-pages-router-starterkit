import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { RoleIndexType, RoleShowType } from '@/types/api/data/roles';
import { ApiResponse } from '@/types/api/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

type DeleteRoleResponse = ApiResponse<string>;

type DeleteRoleErrorResponse = AxiosError<ApiResponse<string>>;

const deleteRole = async (id: number) => {
    const { data } = await axios.delete<DeleteRoleResponse>(`/roles/${id}/delete`, getClientSideAxiosHeaders());
    return data;
};

const useDeleteRoleMutation = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<DeleteRoleResponse, DeleteRoleErrorResponse, number>({
        mutationKey: ['delete-role'],
        mutationFn: deleteRole,
        onSettled: (data, error, variables, context) => {
            queryClient.removeQueries({
                queryKey: [FETCH_ALL_ROLES_KEY, { id: variables.toString() }],
                exact: true,
            });

            queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY],
            });
        },
    });

    return { mutateAsync, isPending };
};

const useDeleteRoleHandler = (closeDialog: () => void) => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: DeleteRoleResponse) => {
        closeDialog();

        toast({
            title: 'Success',
            description: response.data,
        });

        if (router.asPath !== '/roles') router.push('/roles');

        return response;
    };

    const handleError = (error: DeleteRoleErrorResponse) => {
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

export const useDeleteRole = (closeDialog: () => void, role: RoleShowType | RoleIndexType) => {
    const { mutateAsync, isPending } = useDeleteRoleMutation(role.id);
    const { handleError, handleSuccess } = useDeleteRoleHandler(closeDialog);

    const handleDeleteRole = async (id: number) => {
        try {
            const response = await mutateAsync(id);
            handleSuccess(response);
        } catch (error) {
            handleError(error as DeleteRoleErrorResponse);
        }
    };

    return { handleDeleteRole, isPending };
};
