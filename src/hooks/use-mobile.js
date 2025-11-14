import { useState, useLayoutEffect } from 'react';

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 768px)').matches;
    }
    return false;
  });

  useLayoutEffect(() => {
    const mql = window.matchMedia('(max-width: 768px)');
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

