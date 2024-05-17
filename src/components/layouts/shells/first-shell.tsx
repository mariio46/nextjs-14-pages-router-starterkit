import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { cn } from '@/lib/utils';

type FirstShellHeaderProps = {
    title: string;
    description: string;
};

const FirstShellHeader = ({ title, description }: FirstShellHeaderProps) => {
    return (
        <HeaderPrimary>
            <HeaderPrimaryTitle>{title}</HeaderPrimaryTitle>
            <HeaderPrimaryDescription>{description}</HeaderPrimaryDescription>
        </HeaderPrimary>
    );
};

const FirstShellHeaderContainerAction: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
    className,
    children,
    ...props
}) => {
    return (
        <div className={cn('flex flex-wrap gap-2.5 items-center justify-between', className)} {...props}>
            {children}
        </div>
    );
};

const FirstShell = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

FirstShell.HeaderContainer = FirstShellHeaderContainerAction;
FirstShell.Header = FirstShellHeader;

export { FirstShell };
