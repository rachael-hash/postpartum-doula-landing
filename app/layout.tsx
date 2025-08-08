import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Natural Mom Wellness | Professional Postpartum Doula Services",
  description:
    "Expert postpartum doula support for new mothers. Rest, recover, and thrive with personalized care for you and your newborn.",
    generator: 'v0.dev'
}

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
    dataLayer: any[]
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics 4 - Your specific tracking code */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-4EN7PN9MZ8" strategy="afterInteractive" />
        <Script id="ga4-script" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-4EN7PN9MZ8');
          `}
        </Script>

        {/* Meta Pixel Code - Your specific Facebook Pixel */}
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1551862949121403');
            fbq('track', 'PageView');
          `}
        </Script>

        {/* Google Tag Manager - Only load if GTM_ID is provided */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
            `}
          </Script>
        )}

        {/* Hotjar - Only load if HOTJAR_ID is provided */}
        {process.env.NEXT_PUBLIC_HOTJAR_ID && (
          <Script id="hotjar-script" strategy="afterInteractive">
            {`
              (function(h,o,t,j,a,r){
                  h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                  h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
                  a=o.getElementsByTagName('head')[0];
                  r=o.createElement('script');r.async=1;
                  r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                  a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `}
          </Script>
        )}

        {/* Microsoft Clarity - Only load if CLARITY_ID is provided */}
        {process.env.NEXT_PUBLIC_CLARITY_ID && (
          <Script id="clarity-script" strategy="afterInteractive">
            {`
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${process.env.NEXT_PUBLIC_CLARITY_ID}");
            `}
          </Script>
        )}

        {/* LinkedIn Insight Tag - Only load if LINKEDIN_PARTNER_ID is provided */}
        {process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID && (
          <Script id="linkedin-insight" strategy="afterInteractive">
            {`
              _linkedin_partner_id = "${process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID}";
              window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
              window._linkedin_data_partner_ids.push(_linkedin_partner_id);
              (function(l) {
              if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
              window.lintrk.q=[]}
              var s = document.getElementsByTagName("script")[0];
              var b = document.createElement("script");
              b.type = "text/javascript";b.async = true;
              b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
              s.parentNode.insertBefore(b, s);})(window.lintrk);
            `}
          </Script>
        )}

        {/* Enhanced Analytics Tracking Function */}
        <Script id="enhanced-analytics" strategy="afterInteractive">
          {`
            // Initialize enhanced analytics tracking
            window.dataLayer = window.dataLayer || [];
            
            // Enhanced tracking function that works with both GA and Facebook Pixel
            window.trackEvent = function(eventName, eventData) {
              console.log('Event tracked:', eventName, eventData);
              
              // Google Analytics 4
              if (window.gtag) {
                window.gtag('event', eventName, {
                  event_category: eventData.event_category || 'User Interaction',
                  event_label: eventData.event_label || '',
                  value: eventData.value || 0,
                  currency: eventData.currency || 'USD',
                  ...eventData
                });
              }
              
              // Facebook Pixel - Now always available
              if (window.fbq) {
                const fbEventMap = {
                  'email_captured': 'Lead',
                  'email_capture_attempt': 'Lead',
                  'begin_checkout': 'InitiateCheckout',
                  'purchase': 'Purchase',
                  'page_view': 'ViewContent',
                  'click': 'Click'
                };
                const fbEvent = fbEventMap[eventName] || eventName;
                
                // Send event with custom parameters
                window.fbq('track', fbEvent, {
                  content_name: eventData.event_label || 'Natural Mom Wellness',
                  content_category: eventData.event_category || 'Landing Page',
                  value: eventData.value || 0,
                  currency: eventData.currency || 'USD'
                });
              }
              
              // Data Layer for GTM
              if (window.dataLayer) {
                window.dataLayer.push({
                  event: eventName,
                  ...eventData
                });
              }
            };

            // Track initial page load
            window.trackEvent('page_view', {
              event_category: 'Page View',
              event_label: 'Landing Page Load',
              page_title: document.title,
              page_location: window.location.href
            });
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Facebook Pixel noscript fallback */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1551862949121403&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {/* Google Tag Manager (noscript) - Only render if GTM_ID exists */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
