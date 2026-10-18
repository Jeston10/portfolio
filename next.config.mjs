/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allows the placeholder avatar.svg to be served through next/image.
    // Swap in your own avatar.png/.jpg in /public and this stays fine.
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
