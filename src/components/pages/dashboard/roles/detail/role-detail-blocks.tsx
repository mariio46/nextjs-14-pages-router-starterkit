import { useId } from 'react';

import { RoleShowType } from '@/types/api/data/roles';

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

            <RoleDetailDataTable
                key={_permissionTableKey}
                columns={roleDetailPermissionsColumn}
                data={role?.permissions!}
                isLoading={isLoading}
                isError={isError}
                searchPlaceholder='Find permission...'
                tableTitle='Permissions'
            />
            <RoleDetailDataTable
                key={_userTableKey}
                columns={roleDetailUsersColumn}
                data={role?.users!}
                isLoading={isLoading}
                isError={isError}
                searchPlaceholder='Find user...'
                tableTitle='Users'
            />
        </div>
    );
};
