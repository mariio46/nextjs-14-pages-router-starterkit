import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { BasePermissionType } from '@/types/api/data/permissions';
import type { ApiResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';

type DeletePermissionResponse = ApiResponse<string>;
type ErrorResponse = AxiosError<{ data: string }>;

const submitDeletedRoleToServer = async (id: number) => {
    return await axios
        .delete<DeletePermissionResponse>(`/permissions/${id}/delete`, getClientSideAxiosHeaders())
        .then((res) => res.data);
};

export const useDeletePermission = (permission: BasePermissionType, closeDialog: () => void) => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation<DeletePermissionResponse, ErrorResponse, number>({
        mutationKey: ['delete-permission', { id: permission.id.toString() }],
        mutationFn: submitDeletedRoleToServer,
        onSuccess: (data) => handleWhenDeletePermissionIsSuccess(data),
        onError: (error) => handleWhenDeletePermissionIsFailed(error),
    });

    const handleWhenDeletePermissionIsSuccess = (data: DeletePermissionResponse) => {
        closeDialog();

        toast({
            title: 'Success',
            description: data.data,
        });

        if (router.asPath !== '/permissions') router.push('/permissions');

        queryClient.removeQueries({
            queryKey: ['permissions', { id: permission.id.toString() }],
            exact: true,
        });

        return queryClient.invalidateQueries({
            queryKey: ['permissions'],
        });
    };

    const handleWhenDeletePermissionIsFailed = (error: ErrorResponse) => {
        toast({
            title: 'Failed',
            description: error.message,
            variant: 'destructive',
            duration: 10000,
        });
    };

    // prettier-ignore
    const handleDelete = async (id: number) => await mutateAsync(id).then(res => res).catch(e => e);

    return { handleDelete, isPending };
};
