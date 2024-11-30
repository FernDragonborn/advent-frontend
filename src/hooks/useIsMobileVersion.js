import { useState, useLayoutEffect } from 'react';

import { useWindowDimensions } from '@/hooks';

export const useIsMobileVersion = () => {
  const [isMobileVersion, setIsMobileVersion] = useState(true);
  const [isVersionChecked, setIsVersionChecked] = useState(false);
  const { width } = useWindowDimensions();

  useLayoutEffect(() => {
    setIsMobileVersion(width < 1440);
    setIsVersionChecked(true);
  }, [width]);

  return { isMobileVersion, isVersionChecked };
};
