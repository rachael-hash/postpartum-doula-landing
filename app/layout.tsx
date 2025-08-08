import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natural Mom Wellness",
  description: "Pregnancy and Postpartum Guide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Load FB library, then init & track */}
        <Script
          id="fb-lib"
          src="https://connect.facebook.net/en_US/fbevents.js"
          strategy="afterInteractive"
          onLoad={() => {
            // @ts-ignore
            if (typeof fbq === 'function') {
              // @ts-ignore
              fbq('init', '2101939556996012');
              // @ts-ignore
              fbq('track', 'PageView');
              // debug
              console.log('FB lib loaded via <Script>, PageView fired');
            } else {
              console.warn('FB lib loaded but fbq not found');
            }
          }}
          onError={(e) => { console.error('FB lib load error', e); }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <noscript
          dangerouslySetInnerHTML={{
            __html:
              '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2101939556996012&ev=PageView&noscript=1"/>',
          }}
        />
      </body>
    </html>
  );
}
