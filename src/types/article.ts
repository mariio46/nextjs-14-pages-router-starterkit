export interface ArticleResponse {
    data: ArticleType[];
    links: Links;
    meta: Meta;
}

export interface ArticleType {
    id: number;
    title: string;
    slug: string;
    image: string;
    excerpt: string;
    body: string;
    created_at: string;
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
