import { ThemeProvider } from '@/services/providers/theme-provider';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from '../ui/toaster';

export const RootLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
            <NextTopLoader color='#3b82f6' showSpinner={false} />
            {children}
            <Toaster />
        </ThemeProvider>
    );
};
