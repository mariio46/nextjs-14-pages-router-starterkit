import { type AuthShellSecondaryProps } from '@/components/layouts/shells/auth-shell-secondary';
import type { RoleShowType } from '@/types/api/data/roles';
import { capitalize } from '../utils';

export const useRoleShellSecondaryData = (role: RoleShowType | undefined): AuthShellSecondaryProps => {
    const title: string = role ? `Detail Role ${capitalize(role.name)}` : 'Detail Role';

    const roleShellSecondaryData = {
        head: {
            title: title,
        },
        headers: {
            title: title,
            description:
                'Detail role that contain their information like permission that role have and which user is assign to this role.',
        },
        breadcrumb: {
            itemLink: '/roles',
            itemLinkTitle: 'Roles',
            itemPageTitle: title,
        },
        Action: undefined,
    } satisfies AuthShellSecondaryProps;

    return roleShellSecondaryData;
};
