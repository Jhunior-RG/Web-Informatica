/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "www.google.com",
            "logo.clearbit.com",
            "icons.duckduckgo.com",
            "storage.googleapis.com", // Agrega este dominio
        ],
    },
    webpack: (config) => {
        config.resolve.alias.canvas = false;

        return config;
    },
    experimental: {
        turbo: {
            resolveAlias: {
                canvas: "./empty-module.ts",
            },
        },
    },
};

export default nextConfig;
