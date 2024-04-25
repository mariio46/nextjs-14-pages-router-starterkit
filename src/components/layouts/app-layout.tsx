import type { ReactElement } from 'react';

export const AppLayout = ({ children }: { children: ReactElement }) => {
    return <div className='min-h-screen flex items-center justify-center font-sans'>{children}</div>;
};
