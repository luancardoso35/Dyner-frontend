'use client'
import { Josefin_Sans,  } from "next/font/google";
import "./globals.css";
import localFont from 'next/font/local'
import { AuthContextProvider, UserContext } from "@/contexts/AuthContext";
import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";

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
        <meta name="apple-mobile-web-app-capable" content="yes"/>
        <meta name="mobile-web-app-capable" content="yes"/>
      </head>
      <body className={` ${josefin_sans.className}`}>
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
