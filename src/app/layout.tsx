import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import { SITE_IDENTITY } from "@/site-identity";
import { defaultViewport } from "@/lib/metadata";
import { FormModalProvider } from "@/context/FormModalContext";
import { FormModal } from "@/components/FormModal";
import { QueryProvider } from "@/providers/QueryProvider";
import SchemaMarkup from "@/components/SchemaMarkup";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://alphaworldeducation.com'),
  title: {
    default: SITE_IDENTITY.meta.title,
    template: '%s | Alpha World Education'
  },
  description: SITE_IDENTITY.meta.description,
  keywords: SITE_IDENTITY.meta.keywords,
  authors: [{ name: SITE_IDENTITY.meta.author }],
  creator: SITE_IDENTITY.meta.author,
  publisher: SITE_IDENTITY.meta.author,
    robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    type: "website",
    locale: "en_US",
    siteName: "Alpha World Education",
    url: "https://alphaworldeducation.com",
    images: [
      {
        url: SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main,
        width: 1200,
        height: 630,
        alt: SITE_IDENTITY.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_IDENTITY.meta.title,
    description: SITE_IDENTITY.meta.description,
    site: "@AlphaWorldEdu",
    creator: "@AlphaWorldEdu",
    images: [SITE_IDENTITY.meta.ogImage || SITE_IDENTITY.assets.logo.main],
  },
  icons: {
    icon: SITE_IDENTITY.assets.logo.favicon,
    apple: SITE_IDENTITY.assets.logo.appleTouchIcon,
  },
  manifest: "/manifest.json",
};

export { defaultViewport as viewport };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}>
        <QueryProvider>
          <FormModalProvider>
            {children}
            <FormModal />
            <SchemaMarkup pageType="home" />
          </FormModalProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
