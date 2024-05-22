import { ApiResponse } from '../response';
import { BaseProductType } from './products';

export type BaseProductTypeType = {
    id: number;
    name: string;
    slug: string;
    created: string;
    updated: string;
};

export interface TypeIndexType extends BaseProductTypeType {
    products_count: number;
}

export interface TypeShowType extends BaseProductTypeType {
    products: Omit<BaseProductType, 'slug' | 'description' | 'created' | 'updated'>[];
}

export type FetchAllTypesResponse = ApiResponse<{ types: TypeIndexType[] }>;

export type FetchSingleTypeResponse = ApiResponse<{ type: TypeShowType }>;
