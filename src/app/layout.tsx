import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tim Watts Art - Contemporary Artist & Gallery",
  description: "Explore contemporary artwork by Tim Watts. Original paintings, prints, and commissions available. Modern artistic expression exploring emotion and form.",
  keywords: ["Tim Watts", "contemporary art", "modern art", "paintings", "artist", "gallery", "original artwork", "commissions"],
  authors: [{ name: "Tim Watts" }],
  creator: "Tim Watts",
  publisher: "Tim Watts Art",
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://timwatts.art',
    siteName: 'Tim Watts Art',
    title: 'Tim Watts Art - Contemporary Artist & Gallery',
    description: 'Explore contemporary artwork by Tim Watts. Original paintings, prints, and commissions available. Modern artistic expression exploring emotion and form.',
    images: [
      {
        url: '/images/SLC_Trish_Headshot_250919 1.jpg',
        width: 1200,
        height: 630,
        alt: 'Portrait of Tim Watts in the studio',
        type: 'image/jpeg',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tim Watts Art - Contemporary Artist & Gallery',
    description: 'Explore contemporary artwork by Tim Watts. Original paintings, prints, and commissions available.',
    images: ['/images/SLC_Trish_Headshot_250919 1.jpg'],
    creator: '@timwatts', // Update this with actual Twitter handle if available
  },
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
  metadataBase: new URL('https://www.timwatts.art/links'),
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Editorial Serif for Headlines — Calm, Grounded, Non-Performative */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500&family=Dancing+Script:wght@400;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="antialiased font-sans">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
