export interface ApiResponse {
    code: number;
    message: string;
}

export interface ApiResponseWithPaginateData extends ApiResponse {
    meta: Meta;
    links: Links;
}

export interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: Link[];
    path: string;
    per_page: number;
    to: number;
    total: number;
    has_pages: boolean;
}

export interface Link {
    url?: string;
    label: string;
    active: boolean;
}

export interface Links {
    first: string;
    last: string;
    prev?: any;
    next: string;
}
