import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const acronym = (value: string): string => {
    return value.trim().substring(0, 1).toLocaleUpperCase();
};
