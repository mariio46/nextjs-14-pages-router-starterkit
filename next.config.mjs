/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    /**
     * Redirects allow you to redirect an incoming request path to a different destination path.
     * source: is the incoming request path pattern.
     * destination: is the path you want to route to.
     * permanent true or false - if true will use the 308 status code which instructs clients/search engines to cache the redirect forever, if false will use the 307 status code which is temporary and is not cached.
     */
    async redirects() {
        return [
            {
                destination: '/',
                source: '/home',
                permanent: true,
            },
            {
                destination: '/login',
                source: '/guest/login',
                permanent: true,
            },
            {
                destination: '/register',
                source: '/guest/register',
                permanent: true,
            },
            {
                destination: '/settings/:path*',
                source: '/dashboard/settings/:path*',
                permanent: true,
            },
            {
                destination: '/users/:path*',
                source: '/dashboard/users/:path*',
                permanent: true,
            },
            {
                destination: '/roles/:path*',
                source: '/dashboard/roles/:path*',
                permanent: true,
            },
            {
                destination: '/permissions/:path*',
                source: '/dashboard/permissions/:path*',
                permanent: true,
            },
        ];
    },

    /**
     * Rewrites allow you to map an incoming request path to a different destination path.
     * source: String - is the incoming request path pattern.
     * destination: String is the path you want to route to.
     */
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/home',
            },
            {
                source: '/login',
                destination: '/guest/login',
            },
            {
                source: '/register',
                destination: '/guest/register',
            },
            {
                source: '/settings/:path*',
                destination: '/dashboard/settings/:path*',
            },
            {
                source: '/users/:path*',
                destination: '/dashboard/users/:path*',
            },
            {
                source: '/roles/:path*',
                destination: '/dashboard/roles/:path*',
            },
            {
                source: '/permissions/:path*',
                destination: '/dashboard/permissions/:path*',
            },
        ];
    },
    images: {
        dangerouslyAllowSVG: true,
        remotePatterns: [
            {
                hostname: 'localhost',
                protocol: 'http',
            },
            {
                protocol: 'https',
                hostname: 'www.gravatar.com',
                pathname: '/avatar/**',
                port: '',
            },
        ],
    },
    compiler: {
        styledComponents: true,
    },
};

export default nextConfig;
