// import { useAuthUserState } from '@/services/store/auth-user-state';
import { useAuthUserState } from '@/services/store/auth-user-state';
import { SA_PERMISSION_SPECIAL_NAME } from '../api/key';

export const useHasPermission = (permission: string): boolean => {
    const authUserPermissions = useAuthUserState((state) => state.user?.role.permissions || []);

    if (authUserPermissions.includes(SA_PERMISSION_SPECIAL_NAME)) {
        return true;
    }

    return authUserPermissions.includes(permission, 0);
};

// export const can = (permission: string): boolean => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userPermissions: string[] = authUser?.role.permissions || [];

//     if (userPermissions.includes(SA_PERMISSION_SPECIAL_NAME)) {
//         return true;
//     }

//     return userPermissions.includes(permission, 0);
// };

// export const canAny = (permissions: string[]): boolean => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userPermissions: string[] = authUser?.role.permissions || [];

//     if (userPermissions.includes(SA_PERMISSION_SPECIAL_NAME)) {
//         return true;
//     }

//     return permissions.some((item) => userPermissions.includes(item, 0));
// };

// export const hasRole = (role: string): boolean => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userRole: string = authUser?.role.name || '';

//     return userRole === role;
// };

// export const hasAnyRole = (roles: string[]): boolean => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userRole: string = authUser?.role.name || '';

//     return roles.includes(userRole, 0);
// };

// export const unlessRole = (role: string): boolean => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userRole: string = authUser?.role.name || '';

//     return userRole !== role;
// };

// export const hasPermission = (permission: string): boolean => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userPermissions: string[] = authUser?.role.permissions || [];

//     if (userPermissions.includes(SA_PERMISSION_SPECIAL_NAME)) {
//         return true;
//     }

//     return userPermissions.includes(permission, 0);
// };

// export const hasAnyPermission = (permissions: string[]) => {
//     const authUser = useAuthUserState((state) => state.user);

//     const userPermissions: string[] = authUser?.role.permissions || [];

//     if (userPermissions.includes(SA_PERMISSION_SPECIAL_NAME)) {
//         return true;
//     }

//     return permissions.some((item) => userPermissions.includes(item, 0));
// };
