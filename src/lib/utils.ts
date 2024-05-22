import { ToastActionElement, ToastProps } from '@/components/ui/toast';
import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { format, formatDistanceToNow } from 'date-fns';
import { twMerge } from 'tailwind-merge';
import { formatCurrency } from 'usemods';

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

/**
 * Formatter using UseMods Package.
 *
 * @param value string | number
 * @returns string
 */
export const toRupiah = (value: string | number): string => {
    if (typeof value === 'string') {
        const initialStringValue = value.trim() === '' ? '0' : value.trim();

        const stringResult = formatCurrency(Number(initialStringValue), { decimals: 2, locale: 'id-ID' });

        return stringResult;
    }

    const numberResult = formatCurrency(value, { decimals: 2, locale: 'id-ID' });

    return numberResult;
};

type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};

type Toast = Omit<ToasterToast, 'id'>;

export const toastFailedMessage = (error: AxiosError, { ...props }: Toast) => {
    console.log(error);
    return {
        title: 'Failed',
        description: props.description,
        variant: 'destructive',
        duration: 10000,
    } satisfies Toast;
};
