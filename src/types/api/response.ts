export interface ApiResponse<TData> {
    code: number;
    message: string;
    data: TData;
}

export interface ApiValidationErrorResponse<TError> {
    errors?: TError;
}
