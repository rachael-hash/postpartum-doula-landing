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
      <head>
        {/* Guard: force the correct Pixel ID only */}
        <Script id="fbq-guard" strategy="beforeInteractive">
          {`
            (function () {
              var TARGET = '2101939556996012';
              var stub = window.fbq = window.fbq || function(){ (window.fbq.q = window.fbq.q || []).push(arguments); };
              var orig = stub;
              window.fbq = function() {
                try {
                  if (arguments && arguments[0] === 'init') {
                    var id = String(arguments[1] || '');
                    if (id !== TARGET) {
                      console.warn('[FBQ GUARD] Blocking init for', id, '— forcing', TARGET);
                      return orig('init', TARGET);
                    }
                  }
                } catch (e) {}
                return orig.apply(this, arguments);
              };
            })();
          `}
        </Script>

        {/* Load FB script; init after it’s truly loaded */}
        <Script
          id="fb-pixel-loader"
          src="https://connect.facebook.net/en_US/fbevents.js"
          strategy="afterInteractive"
          onLoad={() => {
            // Initialize and send the first PageView after the library finishes loading
            // (helper component will handle SPA route changes)
            // @ts-ignore
            fbq('init', '2101939556996012');
            // @ts-ignore
            setTimeout(() => fbq('track', 'PageView'), 150);
          }}
        />
      </head>
      <body className={inter.className}>
        {/* Fire PageView on route changes too */}
        <TrackPageView />
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
