/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // async redirects() {
    //     return [
    //         {
    //             destination: '/',
    //             source: '/home',
    //             permanent: true,
    //         },
    //         {
    //             destination: '/login',
    //             source: '/guest/login',
    //             permanent: true,
    //         },
    //         {
    //             destination: '/register',
    //             source: '/guest/register',
    //             permanent: true,
    //         },
    //         {
    //             destination: '/profile',
    //             source: '/dashboard/profile',
    //             permanent: true,
    //         },
    //     ];
    // },
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
                source: '/profile',
                destination: '/dashboard/profile',
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
                hostname: 'tailwindui.com',
                protocol: 'https',
                pathname: '/img/**',
            },
        ],
    },
    compiler: {
        styledComponents: true,
    },
};

export default nextConfig;
