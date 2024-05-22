import { ApiResponse } from '../response';
import { BaseProductCategoryType } from './product-categories';
import { BaseProductTypeType } from './product-types';

export type BaseProductType = {
    id: number;
    name: string;
    slug: string;
    description: string;
    price: string;
    created: string;
    updated: string;
    category: Omit<BaseProductCategoryType, 'created' | 'updated'>;
    type: Omit<BaseProductTypeType, 'created' | 'updated'>;
};

export type FetchAllProductsResponse = ApiResponse<{ products: BaseProductType[] }>;

export type FetchSingleProductResponse = ApiResponse<{ product: BaseProductType }>;
