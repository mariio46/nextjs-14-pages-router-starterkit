import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function Custom404() {
    return (
        <div className='flex min-h-screen items-center justify-center bg-background'>
            <main className='mx-auto w-full max-w-7xl px-6 pb-16 pt-10 sm:pb-24 lg:px-8'>
                <div className='mx-auto max-w-2xl text-center'>
                    <p className='text-base font-bold leading-8 text-sky-600'>404</p>
                    <h1 className='mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl'>
                        This page does not exist
                    </h1>
                    <p className='mb-8 mt-4 text-base leading-7 text-muted-foreground sm:mt-6 sm:text-lg sm:leading-8'>
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className='flex items-center justify-center gap-4'>
                        <Link href='/' className={cn(buttonVariants({ variant: 'default' }))}>
                            Go back home
                        </Link>
                        <Link href='/' className={cn(buttonVariants({ variant: 'ghost' }))}>
                            Contact support
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
