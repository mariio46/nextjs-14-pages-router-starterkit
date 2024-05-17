import type { PermissionShowType } from '@/types/api/data/permissions';

import { capitalize, diffForHumans } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface PermissionDetailCardInfoProps {
    permission: PermissionShowType;
}

export const PermissionDetailCardInfo = ({ permission }: PermissionDetailCardInfoProps) => {
    return (
        <div className='grid gap-4 md:gap-8 xl:grid-cols-4'>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Permission</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className=' text-sm text-muted-foreground line-clamp-2'>{capitalize(permission.name)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Guard</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className=' text-sm text-muted-foreground line-clamp-2'>{capitalize(permission.guard)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Created</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className=' text-sm text-muted-foreground line-clamp-2'>
                        {diffForHumans(permission.created, true)}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Updated</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className='text-sm text-muted-foreground line-clamp-2'>
                        {diffForHumans(permission.updated, true)}
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};
