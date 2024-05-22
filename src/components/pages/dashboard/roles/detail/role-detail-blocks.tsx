import { useId } from 'react';

import { RoleShowType } from '@/types/api/data/roles';

import { DataTable } from '@/components/tanstack/data-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QueryStatus } from '@tanstack/react-query';
import { RoleDetailCardInfo } from './role-detail-card-info';
import { roleDetailPermissionsColumn } from './role-detail-permissions-columns';
import { RoleDetailSkeleton } from './role-detail-skeleton';
import { roleDetailUsersColumn } from './role-detail-users-columns';

interface RolesDetailBlocksProps {
    role: RoleShowType;
    status: QueryStatus;
}

export const RoleDetailBlocks = ({ role, status }: RolesDetailBlocksProps) => {
    const _permissionTableKey = useId();
    const _userTableKey = useId();

    return (
        <div className='space-y-5'>
            {status !== 'success' ? <RoleDetailSkeleton /> : <RoleDetailCardInfo role={role} />}

            <Tabs defaultValue='permissions'>
                <TabsList className='sm:max-w-[300px] w-full'>
                    <TabsTrigger className='w-full' value='permissions'>
                        Permissions
                    </TabsTrigger>
                    <TabsTrigger className='w-full' value='users'>
                        Users
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='permissions'>
                    <DataTable
                        data={role?.permissions!}
                        columns={roleDetailPermissionsColumn}
                        filterKey='name'
                        status={status}
                        key={_permissionTableKey}
                    />
                </TabsContent>
                <TabsContent value='users'>
                    <DataTable
                        data={role?.users!}
                        columns={roleDetailUsersColumn}
                        filterKey='name'
                        status={status}
                        key={_userTableKey}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};
