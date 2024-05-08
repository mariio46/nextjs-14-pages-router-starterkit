import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';

type AuthShellPrimaryProps = {
    children: React.ReactNode;
    title: string;
    description: string;
};

export const AuthShellPrimary: React.FC<AuthShellPrimaryProps> = ({ title, description, children }) => {
    return (
        <>
            <HeaderPrimary>
                <HeaderPrimaryTitle>{title}</HeaderPrimaryTitle>
                <HeaderPrimaryDescription>{description}</HeaderPrimaryDescription>
            </HeaderPrimary>

            <>{children}</>
        </>
    );
};
