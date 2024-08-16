import { NextFont, NextFontWithVariable } from "next/dist/compiled/@next/font";
import { Josefin_Sans } from "next/font/google";
import localFont from "next/font/local";

export const josefin_sans: NextFont = Josefin_Sans({ subsets: ["latin"] });

export const espana: NextFontWithVariable = localFont({
  src: [
    {
      path: '../public/fonts/PlaywriteESDeco-ExtraLight.ttf',
      weight: '200'
    },
    {
      path: '../public/fonts/PlaywriteESDeco-Light.ttf',
      weight: '300'
    },
    {
      path: '../public/fonts/PlaywriteESDeco-Regular.ttf',
      weight: '400'
    },
    {
      path: '../public/fonts/PlaywriteESDeco-Thin.ttf',
      weight: '100'
    }
  ],
  variable: '--font-espana'
})