// src/hooks/useGtagPageTracking.ts
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useGtagPageTracking() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-3094XR81MN', {
        page_path: location.pathname + location.search,
        page_location: window.location.href, // ✅ 이걸 명시적으로 지정하면 dl 값도 갱신됨
      });
    }
  }, [location]);
}
