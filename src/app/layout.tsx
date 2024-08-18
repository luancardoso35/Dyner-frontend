'use client'
import "./globals.css";
import { AuthContextProvider } from "@/contexts/AuthContext";
import { PollContextProvider } from "@/contexts/PollsContext";
import { josefin_sans } from "../../lib/fonts";
import { Suspense } from "react";

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
          <PollContextProvider>
            <Suspense fallback={<>placeholder</>}>
              {children}
            </Suspense>
          </PollContextProvider>
        </AuthContextProvider>
      </body>
    </html>
  );
}
