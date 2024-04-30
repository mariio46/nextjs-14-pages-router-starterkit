import { clsx, type ClassValue } from 'clsx';
import { getCookie, hasCookie } from 'cookies-next';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getPageNumberFromUrl(url: string): number | null {
    const match = url.match(/[?&]page=(\d+)/);
    if (match) {
        return parseInt(match[1], 10);
    }
    return null;
}

export const acronym = (value: string): string => {
    return value.trim().substring(0, 1).toLocaleUpperCase();
};

export const getAxiosHeadersWithToken = (token: string): {} | undefined => {
    if (hasCookie(token)) {
        return {
            headers: {
                Authorization: `Bearer ${getCookie(token)}`,
            },
        };
    }

    return undefined;
};
