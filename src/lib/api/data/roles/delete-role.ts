import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { FETCH_ALL_ROLES_KEY } from '@/lib/query-key';
import { ApiResponse } from '@/types/api/response';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

type DeleteRoleResponse = ApiResponse<string>;

const deleteRole = async (id: number) => {
    const { data } = await axios.delete<DeleteRoleResponse>(`/roles/${id}/delete`, getClientSideAxiosHeaders());
    return data;
};

export const useDeleteRole = (closeDialog: () => void) => {
    const queryClient = useQueryClient();

    const { toast } = useToast();
    const router = useRouter();

    const { mutateAsync, isPending } = useMutation<DeleteRoleResponse, AxiosError<{ data: string }>, number>({
        mutationKey: ['delete-role'],
        mutationFn: deleteRole,
        onError: (error) => {
            toast({
                title: 'Failed',
                description: error.message,
                variant: 'destructive',
                duration: 10000,
            });
        },
        onSuccess: () => {
            closeDialog();

            toast({
                title: 'Success',
                description: 'Role has been deleted successfully.',
            });

            if (router.asPath !== '/roles') router.push('/roles');

            return queryClient.invalidateQueries({
                queryKey: [FETCH_ALL_ROLES_KEY],
            });
        },
    });

    // prettier-ignore
    const handleDeleteRole = (id: number) => mutateAsync(id).then((r) => r).catch((e) => e);

    return { handleDeleteRole, isPending };
};
