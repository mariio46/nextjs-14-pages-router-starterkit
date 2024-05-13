import { RoleShowType } from '@/types/api/data/roles';

import { capitalize } from '@/lib/utils';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RoleDetailCardInfoProps {
    role: RoleShowType;
}

export const RoleDetailCardInfo = ({ role }: RoleDetailCardInfoProps) => {
    return (
        <div className='grid gap-4 md:gap-8 xl:grid-cols-4'>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Role</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className=' text-sm text-muted-foreground line-clamp-2'>{capitalize(role.name)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Guard</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className=' text-sm text-muted-foreground line-clamp-2'>{capitalize(role.guard)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Total Permissions</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className=' text-sm text-muted-foreground line-clamp-2'>{`${role.permissions?.length} Permissions`}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className='flex-row items-center justify-between space-y-0 pb-2'>
                    <CardTitle>Total Users</CardTitle>
                </CardHeader>
                <CardContent className='flex flex-col'>
                    <p className='text-sm text-muted-foreground line-clamp-2'>{`${role.users?.length} Users`}</p>
                </CardContent>
            </Card>
        </div>
    );
};
