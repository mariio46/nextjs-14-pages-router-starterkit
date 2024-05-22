import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

import type { BaseProductCategoryType } from '@/types/api/data/product-categories';
import type { ApiResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { toastFailedMessage } from '@/lib/utils';

type DeleteCategoryResponse = ApiResponse<string>;

type DeleteCategoryErrorResponse = AxiosError<DeleteCategoryResponse>;

const submitDeletedCategoryToServer = async (id: number) => {
    const { data } = await axios.delete<DeleteCategoryResponse>(
        `/categories/${id}/delete`,
        getClientSideAxiosHeaders(),
    );
    return data;
};

const useDeleteCategoryMutation = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<DeleteCategoryResponse, DeleteCategoryErrorResponse, number>({
        mutationKey: ['delete-category', { id: id.toString() }],
        mutationFn: submitDeletedCategoryToServer,
        onSuccess: (data, variables, context) => {
            queryClient.removeQueries({
                queryKey: ['categories', { id: variables.toString() }],
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
        },
    });

    return { mutateAsync, isPending };
};

const useDeleteCategoryHandler = () => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: DeleteCategoryResponse) => {
        if (router.asPath !== '/categories') router.push('/categories');

        toast({
            title: 'Success',
            description: response.data || `Category has been deleted successfully.`,
        });

        return response;
    };

    const handleError = (error: DeleteCategoryErrorResponse) => {
        toast(
            toastFailedMessage(error, {
                description: error.message,
            }),
        );
    };

    return { handleError, handleSuccess };
};

export const useDeleteCategory = (category: BaseProductCategoryType, closeDialog: VoidFunction) => {
    const { mutateAsync, isPending } = useDeleteCategoryMutation(category.id);

    const { handleError, handleSuccess } = useDeleteCategoryHandler();

    const submit = async (id: number) => {
        try {
            const response = await mutateAsync(id);
            handleSuccess(response);
        } catch (error) {
            handleError(error as DeleteCategoryErrorResponse);
        } finally {
            closeDialog();
        }
    };

    return { submit, isPending };
};
