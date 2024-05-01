import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import useAuthState from '@/services/store/auth-state';

export const AuthUser = () => {
    const { user, check, status } = useAuthState();
    return (
        <Card className='max-w-lg'>
            <CardHeader>
                <CardTitle>Auth User State Using Zustand</CardTitle>
                <CardDescription>
                    A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on
                    hooks. It isn&apos;t boilerplatey or opinionated, but has enough convention to be explicit and
                    flux-like.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className='text-sm flex flex-col gap-3'>
                    <h4>
                        <span className='text-muted-foreground'>Name : </span>
                        <span>{user?.name}</span>
                    </h4>
                    <p>
                        <span className='text-muted-foreground'>Status : </span>
                        <span className={cn(check ? 'text-green-500' : 'text-red-500')}>{status(check)}</span>
                    </p>
                    <p>
                        <span className='text-muted-foreground'>Joined : </span>
                        <span>{user?.created_at}</span>
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
