'use client';
import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TrackPageView() {
  const pathname = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    const t = setTimeout(() => {
      if (typeof window !== 'undefined' && (window as any).fbq) {
        (window as any).fbq('track', 'PageView');
      }
    }, 150);
    return () => clearTimeout(t);
  }, [pathname, search?.toString()]);

  return null;
}
