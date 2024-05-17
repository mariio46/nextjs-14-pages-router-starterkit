import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
    return twMerge(clsx(inputs));
};

export const acronym = (value: string): string => {
    return value.trim().substring(0, 1).toLocaleUpperCase();
};

export const initialWord = (value: string): string => {
    return value.trim().split(' ').shift() as string;
};

export const diffForHumans = (date: string | Date, capitalizeFirstWord: boolean = false): string => {
    if (typeof date === 'string') {
        const newDate = formatDistanceToNow(new Date(date), {
            includeSeconds: true,
            addSuffix: true,
        });
        return capitalizeFirstWord ? capitalize(newDate) : newDate;
    }

    const newDate = formatDistanceToNow(date, {
        includeSeconds: true,
        addSuffix: true,
    });

    return capitalizeFirstWord ? capitalize(newDate) : newDate;
};

export const capitalize = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
};

export const now = (value: string) => {
    return format(new Date(value), 'PPpp');
};
