import { ENV } from './environment';

// Backend
export const BACKEND_BASE_URL = ENV.BACKEND_BASE_URL;
export const BACKEND_API_URL = `${BACKEND_BASE_URL}/api`;

/**
 * Backend Api sub-route | starts with : `BE`
 */
export const BE_CHECK_TOKEN_URL = `${BACKEND_API_URL}/user-token-check`;

// Fronted
export const FRONTEND_BASE_URL = ENV.FRONTEND_BASE_URL;
export const FRONTEND_API_URL = `${ENV.FRONTEND_BASE_URL}/api`;

/**
 * Frontend Api sub-route | starts with : `FE`
 */
export const FE_CHECK_TOKEN_URL = `${FRONTEND_API_URL}/authorization/user-token-validation`;
