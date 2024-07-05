import type { Metadata } from "next";
import { Josefin_Sans,  } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'

export const josefin_sans = Josefin_Sans({ subsets: ["latin"] });

export const espana = localFont({
  src: [
    {
      path: '../../public/fonts/PlaywriteESDeco-ExtraLight.ttf',
      weight: '200'
    },
    {
      path: '../../public/fonts/PlaywriteESDeco-Light.ttf',
      weight: '300'
    },
    {
      path: '../../public/fonts/PlaywriteESDeco-Regular.ttf',
      weight: '400'
    },
    {
      path: '../../public/fonts/PlaywriteESDeco-Thin.ttf',
      weight: '100'
    }
  ],
  variable: '--font-espana'
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Dyner</title>
        <meta name='description' content='Web application to help people decide where to go.' />
      </head>
      <body className={` ${josefin_sans.className}`}>{children}</body>
    </html>
  );
}