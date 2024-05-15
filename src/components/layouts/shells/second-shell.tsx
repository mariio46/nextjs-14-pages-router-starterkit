import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { cn } from '@/lib/utils';

const SecondShellHeader = ({ title, description }: { title: string; description: string }) => {
    return (
        <HeaderPrimary className='my-5 space-y-0.5'>
            <HeaderPrimaryTitle className='text-base'>{title}</HeaderPrimaryTitle>
            <HeaderPrimaryDescription>{description}</HeaderPrimaryDescription>
        </HeaderPrimary>
    );
};

const SecondShellHeaderContainerAction: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
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

const SecondShell = ({ children }: { children: React.ReactNode }) => {
    return <div>{children}</div>;
};

SecondShell.HeaderContainer = SecondShellHeaderContainerAction;
SecondShell.Header = SecondShellHeader;

export { SecondShell };
