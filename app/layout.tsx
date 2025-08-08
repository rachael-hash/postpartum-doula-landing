import Script from "next/script";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TrackPageView from "./track-pageview";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Natural Mom Wellness",
  description: "Pregnancy and Postpartum Guide",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        {/* Meta Pixel base code (inline loader + init) */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
            (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '2101939556996012');
            fbq('track', 'PageView');`}
        </Script>

        {/* Fire PageView on SPA route changes */}
        <TrackPageView />

        {/* No-script fallback */}
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
