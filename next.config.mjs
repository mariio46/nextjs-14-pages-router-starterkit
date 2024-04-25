/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/login',
                destination: '/guest/login',
            },
            {
                source: '/register',
                destination: '/guest/register',
            },
        ];
    },
};

export default nextConfig;
