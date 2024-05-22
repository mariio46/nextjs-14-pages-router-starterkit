import { useMutation, useQueryClient } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { useRouter } from 'next/router';

import { type BaseProductType } from '@/types/api/data/products';
import { type ApiResponse } from '@/types/api/response';

import { useToast } from '@/components/ui/use-toast';
import axios from '@/lib/axios';
import { getClientSideAxiosHeaders } from '@/lib/cookies-next';
import { toastFailedMessage } from '@/lib/utils';

type DeleteProductResponse = ApiResponse<string>;

type DeleteProductErrorResponse = AxiosError<DeleteProductResponse>;

const submitDeletedProductToServer = async (id: number) => {
    const { data } = await axios.delete<DeleteProductResponse>(`/products/${id}/delete`, getClientSideAxiosHeaders());

    return data;
};

const useDeleteProductMutation = (id: number) => {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending } = useMutation<DeleteProductResponse, DeleteProductErrorResponse, number>({
        mutationKey: ['delete-product', { id: id.toString() }],
        mutationFn: submitDeletedProductToServer,
        onSuccess: (data, variables, context) => {
            queryClient.removeQueries({
                queryKey: ['products', { id: variables.toString() }],
                exact: true,
            });
        },
        onSettled: (data, error, variables, context) => {
            queryClient.invalidateQueries({
                queryKey: ['categories'],
                exact: true,
            });
            queryClient.invalidateQueries({
                queryKey: ['products'],
                exact: true,
            });
        },
    });

    return { mutateAsync, isPending };
};

const useDeleteProductHandler = () => {
    const router = useRouter();
    const { toast } = useToast();

    const handleSuccess = (response: DeleteProductResponse) => {
        if (router.asPath !== '/products') router.push('/products');

        toast({
            title: 'Success',
            description: response.data || `Product has been deleted successfully.`,
        });

        return response;
    };

    const handleError = (error: DeleteProductErrorResponse) => {
        toast(
            toastFailedMessage(error, {
                description: error.message,
            }),
        );
    };

    return { handleError, handleSuccess };
};

export const useDeleteProduct = (product: BaseProductType, closeDialog: () => void) => {
    const { mutateAsync, isPending } = useDeleteProductMutation(product.id);

    const { handleError, handleSuccess } = useDeleteProductHandler();

    const submit = async (id: number) => {
        try {
            const response = await mutateAsync(id);
            handleSuccess(response);
        } catch (error) {
            handleError(error as DeleteProductErrorResponse);
        } finally {
            closeDialog();
        }
    };

    return { submit, isPending };
};
