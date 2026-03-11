import {Metadata} from 'next'
import {baseConfig} from './landing-config'

const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://appname.com'

export const defaultMetadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: baseConfig.brand.name,
    template: `%s | ${baseConfig.brand.name}`,
  },
  description: baseConfig.brand.description,
  keywords: [
    'split bill',
    'expense tracker',
    'group expenses',
    'bill splitter',
    'roommate expenses',
    'trip expenses',
    'settle debt',
    'money owed',
    'IOU app',
    'shared expenses',
    'Spliter',
  ],
  authors: [{name: 'Spliter'}],
  creator: 'Spliter',
  publisher: 'Spliter',
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
    type: 'website',
    locale: 'en_US',
    url: appUrl,
    title: baseConfig.brand.name,
    description: baseConfig.brand.description,
    siteName: baseConfig.brand.name,
    images: [
      {
        url: `${appUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: baseConfig.brand.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: baseConfig.brand.name,
    description: baseConfig.brand.description,
    images: [`${appUrl}/twitter-image.png`],
    creator: '@spliterapp',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  verification: {
    google: 'your-google-verification-id',
    // Add other verification tokens as needed
  },
  alternates: {
    canonical: appUrl,
    languages: {
      'en-US': `${appUrl}/en-US`,
      // Add other language alternatives if available
    },
  },
}
