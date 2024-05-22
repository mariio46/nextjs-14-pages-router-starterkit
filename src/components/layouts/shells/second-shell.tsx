import { HeaderPrimary, HeaderPrimaryDescription, HeaderPrimaryTitle } from '@/components/header';
import { cn } from '@/lib/utils';

interface SecondShellHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    title: string;
    description: string;
}

const SecondShellHeader = ({ title, description, className, ...props }: SecondShellHeaderProps) => {
    return (
        <HeaderPrimary className={cn('my-5 space-y-0.5', className)} {...props}>
            <HeaderPrimaryTitle className='text-base'>{title}</HeaderPrimaryTitle>
            <HeaderPrimaryDescription>{description}</HeaderPrimaryDescription>
        </HeaderPrimary>
    );
};

const SecondShellHeaderContainerAction = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return (
        <div className={cn('flex flex-wrap gap-2.5 my-5 items-center justify-between', className)} {...props}>
            {children}
        </div>
    );
};

const SecondShell = ({ children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div {...props}>{children}</div>;
};

SecondShell.HeaderContainer = SecondShellHeaderContainerAction;
SecondShell.Header = SecondShellHeader;

export { SecondShell };
