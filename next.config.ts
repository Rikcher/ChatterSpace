import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/avatars/**', // Matches the path structure for Discord avatars
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/a/**', // Matches the path structure for Google profile pictures
      },
      {
        protocol: 'https',
        hostname: 'hfyahiqwhtkmontdplnz.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/images/**', // Matches all images in the specified Supabase bucket
      },
    ],
  },
};

export default nextConfig;
