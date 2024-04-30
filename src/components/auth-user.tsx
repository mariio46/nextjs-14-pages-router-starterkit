import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useAuthState from '@/services/store/auth-state';

export const AuthUser = () => {
    const { user, check } = useAuthState();
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
                        <span className='text-muted-foreground'>Name :</span> {user?.name}
                    </h4>
                    <p>
                        <span className='text-muted-foreground'>Status :</span>
                        {check ? 'Authenticated' : 'Not Authenticated'}
                    </p>
                    <p>
                        <span className='text-muted-foreground'>Joined :</span> {user?.created_at}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};
