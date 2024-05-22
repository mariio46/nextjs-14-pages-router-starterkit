import { ApiResponse } from '../response';
import { BaseProductType } from './products';

export type BaseProductCategoryType = {
    id: number;
    name: string;
    slug: string;
    created: string;
    updated: string;
};

export interface CategoryIndexType extends BaseProductCategoryType {
    products_count: number;
}

export interface CategoryShowType extends BaseProductCategoryType {
    products: Omit<BaseProductType, 'slug' | 'description' | 'created' | 'updated'>[];
}

export type FetchAllCategoriesResponse = ApiResponse<{ categories: CategoryIndexType[] }>;

export type FetchSingleCategoryResponse = ApiResponse<{ category: CategoryShowType }>;
