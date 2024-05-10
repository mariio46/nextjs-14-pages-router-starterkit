import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import useCount from '@/services/store/use-count';

export const Counter = () => {
    const { count, inc, dec, reset } = useCount();

    return (
        <Card className='max-w-lg'>
            <CardHeader>
                <CardTitle>Counter Using Zustand</CardTitle>
                <CardDescription>
                    A small, fast, and scalable bearbones state management solution. Zustand has a comfy API based on
                    hooks. It isn&apos;t boilerplatey or opinionated, but has enough convention to be explicit and
                    flux-like.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <h1 className='text-base font-semibold'>{count}</h1>
            </CardContent>
            <CardFooter className='gap-3'>
                <Button onClick={inc}>Increment</Button>
                <Button onClick={dec}>Decrement</Button>
                <Button onClick={reset}>Reset</Button>
            </CardFooter>
        </Card>
    );
};
