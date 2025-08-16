/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },

  // Configuração do Webpack para resolver o erro de build no Cloudflare
  webpack: (config, { isServer }) => {
    // Esta linha desativa o cache do webpack que estava gerando o arquivo .pack gigante
    config.cache = false;
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;


