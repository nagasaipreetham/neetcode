import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';

/**
 * Initialises Lenis smooth scrolling on every route except /practice*.
 * Cleans up the instance when the route changes or the component unmounts.
 */
export default function useLenis() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Disable Lenis on all /practice and /problems routes
    if (pathname.startsWith('/practice') || pathname.startsWith('/problems')) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);
}
