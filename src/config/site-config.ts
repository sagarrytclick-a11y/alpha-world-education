// src/config/site-config.ts

// Re-export from centralized site identity
export {
  SITE_IDENTITY,
  contact as SITE_CONTACT,
  name as SITE_NAME,
  brand as SITE_BRAND,
  assets as SITE_ASSETS,
  meta as SITE_META,
  getFullAddress,
  getMetaTags,
  getManifestData,
} from '../site-identity';