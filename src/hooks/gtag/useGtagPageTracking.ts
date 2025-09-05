// src/hooks/useGtagPageTracking.ts
import { useEffect } from 'react';
import { useLocation, matchPath } from 'react-router-dom';
import { RouteConfig } from '@/routes/RouteConfig';

export function useGtagPageTracking() {
  const location = useLocation();

  useEffect(() => {
    const matchedRoute = RouteConfig.find((route) =>
      matchPath({ path: route.path, end: true }, location.pathname)
    );

    const baseTitle = 'Flobby';

    const title = matchedRoute?.title
      ? `${matchedRoute.title} | ${baseTitle}`
      : baseTitle;

    // document.title = title; // seo 최적화 시 권장 되는 라우팅 되는 페이지 별 탭 이름 적용 => ux 적인 측면 보안 (강력 권장)

    // if (typeof window.gtag === 'function') {
    //   window.gtag('config', 'G-3094XR81MN', {
    //     page_path: location.pathname + location.search,
    //     page_location: window.location.href, // ✅ 이걸 명시적으로 지정하면 dl 값도 갱신됨
    //     page_title: title,
    //   });
    // }

    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: decodeURI(location.pathname + location.search),
        page_location: decodeURI(window.location.href), // ✅ 이걸 명시적으로 지정하면 dl 값도 갱신됨
        page_title: decodeURI(title),
      });
    }
  }, [location]);
}
