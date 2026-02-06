# Site Identity Configuration

This folder contains the centralized site identity configuration for the AlphaWorld Education website. All site branding, contact information, and asset references should be managed through this system.

## Structure

- `index.ts` - Main site identity configuration and exports
- `assets.ts` - Asset paths and organization
- `README.md` - This documentation file

## Usage

### Import Site Identity

```typescript
import { SITE_IDENTITY, contact, brand, assets, meta } from '@/site-identity';

// Access specific sections
const companyName = SITE_IDENTITY.name;
const primaryColor = SITE_IDENTITY.brand.primaryColor;
const logoUrl = SITE_IDENTITY.assets.logo.main;
const supportEmail = SITE_IDENTITY.contact.email.support;
```

### Backward Compatibility

The existing `src/config/site-config.ts` re-exports from this folder for backward compatibility:

```typescript
import { SITE_CONTACT, SITE_NAME, SITE_BRAND } from '@/config/site-config';
```

## Key Sections

### Brand Identity
- Company name, tagline, and description
- Brand colors and theme
- Domain and business information

### Contact Information
- Phone numbers (display and raw formats)
- Email addresses for different purposes
- Physical address with map link
- Social media links

### Assets
- Logo variants (main, favicon, apple touch icon)
- PWA icons (192x192, 512x512)
- Hero images and utility icons

### Meta Information
- SEO title and description
- Keywords and author information
- Open Graph and Twitter meta tags

## Updating Site Identity

1. Edit the `SITE_IDENTITY` object in `index.ts`
2. Update corresponding assets in the `/public` folder
3. Test changes across all components

## Helper Functions

- `getFullAddress()` - Returns formatted full address
- `getMetaTags()` - Returns meta tag configuration object
- `getManifestData()` - Returns PWA manifest configuration

## Asset Management

Assets are organized in the `/public` folder and referenced through the `assets.ts` file. Required assets include:

- Logo variants for different contexts
- PWA icons for mobile installation
- Favicon and apple touch icon

## Best Practices

1. **Centralization**: All site identity data should come from this folder
2. **Consistency**: Use the provided helper functions for formatting
3. **Validation**: Check that all required assets exist
4. **Updates**: When changing branding, update both the configuration and assets

## Components Updated

The following components have been updated to use centralized identity:
- Navbar (contact info, logo)
- Footer (company name, description, copyright)
- Layout (metadata, icons)
- Manifest.json (PWA configuration)
