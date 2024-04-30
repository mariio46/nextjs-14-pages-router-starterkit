import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';
import { ThemeToggle } from '../theme-toggle';

export const GuestLayout = ({ children, title }: { children: ReactNode; title: string }) => {
    return (
        <div className='min-h-screen flex flex-col items-center justify-center font-sans relative'>
            <Head>
                <title>{`${title} / NextJS-14`}</title>
            </Head>
            <Link className='mb-5' href='/'>
                <Image
                    className='h-12 w-auto'
                    src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                    alt='Your Company'
                    width={40}
                    height={32}
                />
            </Link>
            <div className='max-w-xl min-w-[36rem]'>{children}</div>
            <div className='absolute bottom-2 right-2'>
                <ThemeToggle />
            </div>
        </div>
    );
};
