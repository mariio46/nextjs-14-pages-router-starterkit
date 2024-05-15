import { useId } from 'react';

import { RoleShowType } from '@/types/api/data/roles';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RoleDetailCardInfo } from './role-detail-card-info';
import { RoleDetailDataTable } from './role-detail-data-table';
import { roleDetailPermissionsColumn } from './role-detail-permissions-columns';
import { RoleDetailSkeleton } from './role-detail-skeleton';
import { roleDetailUsersColumn } from './role-detail-users-columns';

interface RolesDetailBlocksProps {
    role: RoleShowType;
    isLoading: boolean;
    isError: boolean;
}

export const RoleDetailBlocks = ({ role, isError, isLoading }: RolesDetailBlocksProps) => {
    const _permissionTableKey = useId();
    const _userTableKey = useId();

    return (
        <div className='space-y-5'>
            {isLoading || isError ? <RoleDetailSkeleton /> : <RoleDetailCardInfo role={role} />}

            <Tabs defaultValue='permissions'>
                <TabsList className='max-w-[300px] w-full'>
                    <TabsTrigger className='w-full' value='permissions'>
                        Permissions
                    </TabsTrigger>
                    <TabsTrigger className='w-full' value='users'>
                        Users
                    </TabsTrigger>
                </TabsList>
                <TabsContent value='permissions'>
                    <RoleDetailDataTable
                        key={_permissionTableKey}
                        columns={roleDetailPermissionsColumn}
                        data={role?.permissions!}
                        isLoading={isLoading}
                        isError={isError}
                        searchPlaceholder='Find permission...'
                        tableTitle='Permissions'
                    />
                </TabsContent>
                <TabsContent value='users'>
                    <RoleDetailDataTable
                        key={_userTableKey}
                        columns={roleDetailUsersColumn}
                        data={role?.users!}
                        isLoading={isLoading}
                        isError={isError}
                        searchPlaceholder='Find user...'
                        tableTitle='Users'
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};
