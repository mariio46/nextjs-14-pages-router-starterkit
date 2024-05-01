import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { TOKEN_COOKIE_KEY } from './lib/api/key';

export function middleware(request: NextRequest) {
    console.info('Middleware Trigger');
    console.info(process.env.NODE_ENV);

    const path = request.nextUrl.pathname;
    const cookie = request.cookies.get(TOKEN_COOKIE_KEY)?.value || '';
    const is_guest_route = path === '/login' || path === '/register';

    if (cookie && is_guest_route) {
        console.info('Statement 1 Trigger');
        return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
    }

    if (!cookie && !is_guest_route) {
        console.info('Statement 2 Trigger');
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}

// prettier-ignore
/**
 * Protected Routes
 * This routes just for authenticated user / cookies has 'auth-api-token' as TOKEN_COOKIE_KEY
 */
export const config = {
    matcher: [
        '/client-side', 
        '/server-side', 
        '/static-site-generation',
        '/api-render',
        '/dashboard',
        '/settings',
        '/settings/account',
        '/login',
        '/register',
    ],
};
