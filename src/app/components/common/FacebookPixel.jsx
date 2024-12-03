'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';
import { useEffect, useState } from 'react';

const FacebookPixel = () => {
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();

  const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

  const pageview = () => {
    window.fbq('track', 'PageView');
  };

  // https://developers.facebook.com/docs/facebook-pixel/advanced/
  const event = (name, options = {}) => {
    window.fbq('track', name, options);
  };

  useEffect(() => {
    if (!loaded) return;

    pageview();
  }, [pathname, loaded]);

  return (
    <div>
      <Script
        id="fb-pixel"
        src="/scripts/pixel.js"
        strategy="afterInteractive"
        onLoad={() => setLoaded(true)}
        data-pixel-id={FB_PIXEL_ID}
      />
    </div>
  );
};

export default FacebookPixel;
