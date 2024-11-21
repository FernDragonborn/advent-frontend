import { useState, useLayoutEffect } from 'react';

import { useWindowDimensions } from '@/hooks';

export const useIsMobileVersion = () => {
  const [isMobileVersion, setIsMobileVersion] = useState(false);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    setIsMobileVersion(width < 1440);
  }, [width]);

  return isMobileVersion;
};
