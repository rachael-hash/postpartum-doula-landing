'use client';

import { useEffect } from 'react';

const PIXEL_ID = '2101939556996012';

export default function Pixel() {
  useEffect(() => {
    // Already loaded?
    if (document.querySelector('script[data-nmw-fb="1"]')) return;

    // Guard: force our ID if something else tries another
    (function () {
      const TARGET = PIXEL_ID;
      const q: any = (window as any).fbq = (window as any).fbq || function () {
        (window as any).fbq.q = (window as any).fbq.q || [];
        (window as any).fbq.q.push(arguments);
      };
      const orig = q;
      (window as any).fbq = function () {
        try {
          if (arguments && arguments[0] === 'init') {
            const id = String(arguments[1] || '');
            if (id !== TARGET) return orig('init', TARGET);
          }
        } catch {}
        return orig.apply(this, arguments as any);
      };
    })();

    const s = document.createElement('script');
    s.src = 'https://connect.facebook.net/en_US/fbevents.js';
    s.async = true;
    s.setAttribute('data-nmw-fb', '1');
    s.onload = () => {
      try {
        (window as any).fbq('init', PIXEL_ID);
        // first PageView
        setTimeout(() => (window as any).fbq('track', 'PageView'), 100);
        // eslint-disable-next-line no-console
        console.log('[Pixel] loaded & PageView sent');
      } catch (e) {
        console.error('[Pixel] init error', e);
      }
    };
    s.onerror = (e) => console.error('[Pixel] load error', e);
    document.body.appendChild(s);

    return () => {
      // no-op on unmount (SPA keeps it)
    };
  }, []);

  return null;
}
