'use client';

import { useEffect } from 'react';

const PIXEL_ID = '2101939556996012';

export default function Pixel() {
  useEffect(() => {
    // Avoid double-initializing
    if ((window as any).__NMW_FB_INITED__) return;
    (window as any).__NMW_FB_INITED__ = true;

    // 1) Create fbq stub BEFORE loading the library (Meta's official pattern)
    (function (f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
      if (f.fbq) return;
      n = f.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = false; // will flip when lib loads
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e); t.async = true; t.src = v; t.setAttribute('data-nmw-fb', '1');
      s = b.getElementsByTagName(e)[0]; s.parentNode!.insertBefore(t, s);
    })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

    // 2) Wait a tick, then init + PageView
    const init = () => {
      try {
        (window as any).fbq('init', PIXEL_ID);
        setTimeout(() => (window as any).fbq('track', 'PageView'), 100);
        // eslint-disable-next-line no-console
        console.log('[Pixel] init + PageView sent');
      } catch (e) {
        // Backup: beacon (won’t block anything)
        new Image().src = `https://www.facebook.com/tr?id=${PIXEL_ID}&ev=PageView&noscript=1&cd[init_error]=1&v=2.9`;
        console.error('[Pixel] init error; used fallback', e);
      }
    };

    const t = setTimeout(init, 150);
    return () => clearTimeout(t);
  }, []);

  return null;
}
