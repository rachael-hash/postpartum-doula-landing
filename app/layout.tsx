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
        {/* Guard: block/init-correct any wrong FB Pixel ID */}
        <Script id="fbq-guard" strategy="beforeInteractive">
          {`
            (function () {
              var TARGET = '2101939556996012';
              // create stub if fbq not yet defined
              var q = window.fbq = window.fbq || function(){ (window.fbq.q = window.fbq.q || []).push(arguments); };
              var orig = q;
              window.fbq = function(){
                try {
                  if (arguments && arguments[0] === 'init') {
                    var id = String(arguments[1] || '');
                    if (id !== TARGET) {
                      console.warn('Blocking FB Pixel init for', id, '— forcing', TARGET);
                      return orig('init', TARGET);
                    }
                  }
                } catch (e) {}
                return orig.apply(this, arguments);
              };
            })();
          `}
        </Script>

        {/* Load FB script + init our correct pixel */}
        <Script id="fb-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '2101939556996012');
          fbq('track', 'PageView');`}
        </Script>
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
