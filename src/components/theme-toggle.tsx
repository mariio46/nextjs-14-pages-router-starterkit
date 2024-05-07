import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useLoading } from '@/hooks/use-loading';
import { useEffect } from 'react';
import { Icon } from './icon';
import { Skeleton } from './ui/skeleton';

export function ThemeToggle() {
    const { loading, startLoading } = useLoading();
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        startLoading();
    }, [loading]);

    if (!loading) return <Skeleton className='size-9 border border-input' />;

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    {theme === 'system' ? (
                        <Icon name='IconDeviceLaptop' />
                    ) : theme === 'dark' ? (
                        <Icon name='IconMoon' />
                    ) : (
                        <Icon name='IconSunLow' />
                    )}
                    <span className='sr-only'>Toggle theme</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='z-[61]' align='end'>
                <DropdownMenuItem onClick={() => setTheme('light')}>
                    <Icon name='IconSunLow' className='me-2' />
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>
                    <Icon name='IconMoon' className='me-2' />
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>
                    <Icon name='IconDeviceLaptop' className='me-2' />
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
