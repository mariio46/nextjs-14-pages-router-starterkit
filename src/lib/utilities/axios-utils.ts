import type { ToastActionElement, ToastProps } from '@/components/ui/toast';
import { isAxiosError, type AxiosError } from 'axios';

type ToasterToast = ToastProps & {
    id: string;
    title?: React.ReactNode;
    description?: React.ReactNode;
    action?: ToastActionElement;
};

// prettier-ignore
type ToasterProps = ({ ...props }: Omit<ToasterToast, 'id'>) => {
    id: string;
    dismiss: () => void;
    update: (props: ToasterToast) => void;
}

export const handleAxiosServerError = (error: AxiosError, toast: ToasterProps) => {
    if (process.env.NODE_ENV === 'development') console.error(error);

    toast({
        title: 'Failed',
        description: error.response?.statusText ?? 'Server is busy. Try again later!',
        variant: 'destructive',
    });
};

type handleAxiosErrorProps = {
    [key: string]: unknown;
};

export const handleAxiosError = (e: any, toast: ToasterProps, { ...props }: handleAxiosErrorProps) => {
    if (isAxiosError(e)) {
        if (e.response?.status === 422) {
            props;
        } else {
            handleAxiosServerError(e, toast);
        }
    } else {
        console.error(e);
    }
};
