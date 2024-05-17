import { hasCookie } from 'cookies-next';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { TOKEN_COOKIE_KEY, TOKEN_DELETED_KEY } from './lib/api/key';

export function middleware(request: NextRequest) {
    if (process.env.NODE_ENV !== 'production') {
        console.log('Middleware Triggered');
    }

    const response = NextResponse;

    const cookies_next_option = { req: request, res: response.next() };
    const has_api_token = hasCookie(TOKEN_COOKIE_KEY, cookies_next_option);
    const token_has_deleted = hasCookie(TOKEN_DELETED_KEY, cookies_next_option);

    const path = request.nextUrl.pathname;
    const is_guest_route = path === '/login' || path === '/register';

    if (has_api_token && is_guest_route) {
        // console.log('Statement 1 Triggered');
        if (token_has_deleted) {
            // console.log('Statement 1.1 Triggered');
            return response.redirect(new URL('/login', request.nextUrl));
        } else {
            // console.log('Statement 1.2 Triggered');
            return response.redirect(new URL('/dashboard', request.nextUrl));
        }
    }

    if (!has_api_token && !is_guest_route) {
        // console.log('Statement 2 Triggered');
        return response.redirect(new URL('/login', request.nextUrl));
    }
}

// prettier-ignore
/**
 * Protected Routes
 * This routes just for authenticated user / cookies has 'auth-api-token' as TOKEN_COOKIE_KEY
 */
export const config = {
    matcher: [
        '/dashboard',
        '/settings/:path*',
        '/users/:path*',
        '/roles/:path*',
        '/permissions/:path*',
        '/login',
        '/register',
    ],
};
