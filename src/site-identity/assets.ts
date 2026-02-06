// src/site-identity/assets.ts
// Asset paths and configurations for site identity

export const SITE_ASSETS = {
  // Logo variants
  logo: {
    main: "/logo.png",
    favicon: "/logo.png",
    appleTouchIcon: "/apple-touch-icon.png",
  },

  // PWA icons
  icons: {
    icon192: "/icon-192.png",
    icon512: "/icon-512.png",
  },

  // Hero images
  hero: {
    main: "/Hero/hero.jpg",
  },

  // Utility icons (not part of brand identity but used in components)
  utility: {
    globe: "/globe.svg",
    file: "/file.svg",
    window: "/window.svg",
  },

  // Framework assets
  framework: {
    next: "/next.svg",
    vercel: "/vercel.svg",
  },
} as const;

// Helper functions for asset management
export const getAssetPath = (category: keyof typeof SITE_ASSETS, asset: string) => {
  const categoryAssets = SITE_ASSETS[category] as Record<string, string>;
  return categoryAssets[asset] || null;
};

export const getLogoUrl = (variant: keyof typeof SITE_ASSETS.logo = 'main') =>
  SITE_ASSETS.logo[variant];

export const getIconUrl = (size: keyof typeof SITE_ASSETS.icons) =>
  SITE_ASSETS.icons[size];

// Asset validation (for development)
export const validateAssets = () => {
  const requiredAssets = [
    SITE_ASSETS.logo.main,
    SITE_ASSETS.logo.favicon,
    SITE_ASSETS.logo.appleTouchIcon,
    SITE_ASSETS.icons.icon192,
    SITE_ASSETS.icons.icon512,
  ];

  const missingAssets = requiredAssets.filter(asset => {
    // In a real implementation, you might check if files exist
    return false; // Placeholder - would need file system access
  });

  if (missingAssets.length > 0) {
    console.warn('Missing required site identity assets:', missingAssets);
  }
};
