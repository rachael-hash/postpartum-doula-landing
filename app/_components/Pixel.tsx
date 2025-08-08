'use client';

import { useEffect } from 'react';

const PIXEL_ID = '2101939556996012';

export default function Pixel() {
  useEffect(() => {
    // Don't init twice in the same session
    if ((window as any).__NMW_FB_INITED__) return;
    (window as any).__NMW_FB_INITED__ = true;

    const hasFbq = typeof (window as any).fbq === 'function';
    const fbqLoaded = hasFbq && (window as any).fbq.loaded === true;

    // Helper: send a PageView via beacon as a safety net
    const sendBeacon = (reason: string) => {
      const u = 'https://www.facebook.com/tr?id=' + PIXEL_ID +
        '&ev=PageView&noscript=1&cd[fallback]=' + encodeURIComponent(reason) + '&v=2.9';
      new Image().src = u;
    };

    const initAndTrack = () => {
      try {
        (window as any).fbq('init', PIXEL_ID);
        setTimeout(() => (window as any).fbq('track', 'PageView'), 100);
      } catch {
        sendBeacon('init_error');
      }
    };

    if (fbqLoaded) {
      // fbq is already loaded by something else (e.g., a widget) — don't load again
      initAndTrack();
      return;
    }

    // If fbq isn't present/loaded, inject the library exactly once
    if (!document.querySelector('script[data-nmw-fb="1"]')) {
      const s = document.createElement('script');
      s.src = 'https://connect.facebook.net/en_US/fbevents.js';
      s.async = true;
      s.setAttribute('data-nmw-fb', '1');
      s.onload = () => {
        initAndTrack();
        // Optional fallback in case track was blocked
        setTimeout(() => sendBeacon('fallback'), 600);
        // eslint-disable-next-line no-console
        console.log('[Pixel] loaded & PageView sent');
      };
      s.onerror = (e) => {
        sendBeacon('load_error');
        console.error('[Pixel] load error; fallback beacon sent', e);
      };
      document.body.appendChild(s);
    } else {
      // Script tag exists but not yet marked loaded — try to init anyway after a tick
      setTimeout(() => {
        try {
          (window as any).fbq('init', PIXEL_ID);
          (window as any).fbq('track', 'PageView');
        } catch {
          sendBeacon('existing_tag_init_error');
        }
      }, 200);
    }
  }, []);

  return null;
}
