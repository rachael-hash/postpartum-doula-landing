'use client';

import { useEffect } from 'react';

const PIXEL_ID = '2101939556996012';

export default function Pixel() {
  useEffect(() => {
    // Don’t double-inject
    if (document.querySelector('script[data-nmw-fb="1"]')) return;

    // Load fbq library
    const s = document.createElement('script');
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    s.async = true;
    s.setAttribute('data-nmw-fb', '1');
    s.onload = () => {
      try {
        // Init
        (window as any).fbq('init', PIXEL_ID);

        // Primary send via fbq
        setTimeout(() => {
          try {
            (window as any).fbq('track', 'PageView');
          } catch {}
        }, 150);

        // Fallback beacon (fires even if fbq failed or got blocked)
        setTimeout(() => {
          const url =
            'https://www.facebook.com/tr?id=' +
            PIXEL_ID +
            '&ev=PageView&noscript=1&cd[fallback]=1&v=2.9';
          new Image().src = url;
          // eslint-disable-next-line no-console
          console.log('[Pixel] fbq PageView attempted; fallback beacon sent too');
        }, 600);
      } catch (e) {
        // If anything goes wrong, send beacon immediately
        new Image().src =
          'https://www.facebook.com/tr?id=' +
          PIXEL_ID +
          '&ev=PageView&noscript=1&cd[init_error]=1&v=2.9';
        console.error('[Pixel] init error; used fallback', e);
      }
    };
    s.onerror = (e) => {
      // If the script fails to load at all, still send via beacon
      new Image().src =
        'https://www.facebook.com/tr?id=' +
        PIXEL_ID +
        '&ev=PageView&noscript=1&cd[load_error]=1&v=2.9';
      console.error('[Pixel] load error; used fallback', e);
    };
    document.body.appendChild(s);
  }, []);

  return null;
}
