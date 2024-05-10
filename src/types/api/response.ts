export interface ApiResponse<TData> {
    code: number;
    message: string;
    data: TData;
}
