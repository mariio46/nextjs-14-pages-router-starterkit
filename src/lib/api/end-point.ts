import { ENV } from './environment';

// Backend
export const BACKEND_BASE_URL = ENV.BACKEND_BASE_URL;
export const BACKEND_API_URL = `${BACKEND_BASE_URL}/api`;

/**
 * Backend Api sub-route | starts with : `BE`
 */
// Auth
export const BE_REGISTER = '/register';
export const BE_LOGIN = '/login';
export const BE_LOGOUT = '/logout';
export const BE_CHECK_TOKEN = '/user-token-check';
export const BE_USER_DATA = '/user';
export const BE_UPDATE_ACCOUNT = '/account';
export const BE_DELETE_ACCOUNT = '/delete-account';
export const BE_UPDATE_PASSWORD = '/security';

// Fronted
export const FRONTEND_BASE_URL = ENV.FRONTEND_BASE_URL;
export const FRONTEND_API_URL = `${ENV.FRONTEND_BASE_URL}/api`;

/**
 * Frontend Api sub-route | starts with : `FE`
 */
export const FE_CHECK_TOKEN = '/auth/token-validation';
