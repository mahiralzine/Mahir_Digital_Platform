'use client';
export const metadata = {
  metadataBase: new URL('https://mahiralzanna.com'),
  title: {
    default: 'Mahir Alzanna | Personal Platform & Business Consultancy',
    template: '%s | Mahir Alzanna',
  },
  description: 'Personal platform of Mahir Alzanna — Expertise in Business Management, Operations, Legal Consultancy, and Tech Solutions.',
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  openGraph: {
    title: 'Mahir Alzanna | Digital Platform',
    description: 'Expertise in Business Management, Operations, Legal Consultancy, and Tech Solutions.',
    url: 'https://mahiralzanna.com',
    siteName: 'Mahir Alzanna',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Mahir Alzanna Brand Mark',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mahir Alzanna | Digital Platform',
    description: 'Expertise in Business Management, Operations, Legal Consultancy, and Tech Solutions.',
    images: ['/logo.png'],
  },
};
