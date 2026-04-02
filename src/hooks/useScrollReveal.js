import { useEffect, useRef } from 'react';

/**
 * Returns a ref to attach to any element.
 * When the element enters the viewport, the class 'revealed' is added.
 * CSS handles the actual animation via .scroll-reveal and .revealed classes.
 */
export default function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.unobserve(el); } },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px', ...options }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}
