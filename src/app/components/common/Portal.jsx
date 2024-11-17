'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const Portal = ({ containerId, children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    containerRef.current = document.getElementById(containerId);
    setIsMounted(true);
  }, [containerId]);

  return isMounted && containerRef.current
    ? createPortal(children, containerRef.current)
    : null;
};

export default Portal;
