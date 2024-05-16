import { DataTable } from '@/components/tanstack/data-table';
import { PermissionShowType } from '@/types/api/data/permissions';
import { PermissionDetailCardInfo } from './permission-detail-card-info';
import { permissionDetailRolesColumns } from './permission-detail-roles-columns';
import { PermissionDetailSekeleton } from './permission-detail-skeleton';

interface PermissionDetailBlockProps {
    permission: PermissionShowType;
    isLoading: boolean;
    isError: boolean;
    status: 'pending' | 'error' | 'success';
}

export const PermissionDetailBlock = ({ permission, isError, isLoading, status }: PermissionDetailBlockProps) => {
    return (
        <div className='space-y-5'>
            {isLoading || isError ? (
                <PermissionDetailSekeleton />
            ) : (
                <PermissionDetailCardInfo permission={permission} />
            )}

            <DataTable
                data={permission?.roles!}
                columns={permissionDetailRolesColumns}
                status={status}
                filterKey='name'
            />
        </div>
    );
};
