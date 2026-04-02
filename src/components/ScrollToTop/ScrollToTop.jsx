import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    // Smooth scroll to top for terms and privacy pages
    if (pathname === '/terms' || pathname === '/privacy') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Instant scroll for other pages
      window.scrollTo(0, 0);
    }
  }, [pathname]);
  
  return null;
}
