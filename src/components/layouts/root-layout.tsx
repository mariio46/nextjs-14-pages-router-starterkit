import { Toaster as Sonner } from '@/components/ui/sonner';
import { ThemeProvider } from '@/services/providers/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { type ReactElement } from 'react';
import { Toaster } from '../ui/toaster';

export const RootLayout = ({ children }: { children: ReactElement }) => {
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextTopLoader color='#3b82f6' showSpinner={false} />
            {children}
            <Toaster />
            <Sonner />
        </ThemeProvider>
    );
};
