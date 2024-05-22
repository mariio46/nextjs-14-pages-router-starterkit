import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { ApiResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { toastFailedMessage } from '@/lib/utils';
import { BaseProductTypeType } from '@/types/api/data/product-types';

type DeleteTypeResponse = ApiResponse<string>;

type DeleteTypeErrorResponse = AxiosError<DeleteTypeResponse>;

const submitDeletedTypeToServer = async (id: number) => {
    const { data } = await axios.delete<DeleteTypeResponse>(`/types/${id}/delete`, getClientSideAxiosHeaders());
    return data;
};

const useDeleteTypeMutation = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<DeleteTypeResponse, DeleteTypeErrorResponse, number>({
        mutationKey: ['delete-type', { id: id.toString() }],
        mutationFn: submitDeletedTypeToServer,
        onSuccess: (data, variables, context) => {
            queryClient.removeQueries({
                queryKey: ['types', { id: variables.toString() }],
                exact: true,
            });
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['types'],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useDeleteTypeHandler = () => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: DeleteTypeResponse) => {
        if (router.asPath !== '/types') router.push('/types');

        toast({
            title: 'Success',
            description: response.data || `Type has been deleted successfully.`,
        });

        return response;
    };

    const handleError = (error: DeleteTypeErrorResponse) => {
        toast(
            toastFailedMessage(error, {
                description: error.message,
            }),
        );
    };

    return { handleError, handleSuccess };
};

export const useDeleteType = (type: BaseProductTypeType, closeDialog: VoidFunction) => {
    const { mutateAsync, isPending } = useDeleteTypeMutation(type.id);

    const { handleError, handleSuccess } = useDeleteTypeHandler();

    const submit = async (id: number) => {
        try {
            const response = await mutateAsync(id);
            handleSuccess(response);
        } catch (error) {
            handleError(error as DeleteTypeErrorResponse);
        } finally {
            closeDialog();
        }
    };

    return { submit, isPending };
};
