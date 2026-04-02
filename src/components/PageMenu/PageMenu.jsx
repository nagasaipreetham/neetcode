import { useEffect, useRef, useState } from 'react';
import './PageMenu.css';

export default function PageMenu({ sections }) {
  const [active, setActive] = useState(sections[0]?.id || '');
  const observerRef = useRef(null);

  useEffect(() => {
    // Clean up previous observer
    if (observerRef.current) observerRef.current.disconnect();

    const observers = [];

    // Track which sections are visible and their intersection ratios
    const visibilityMap = {};

    const pickActive = () => {
      // Find the section with the highest visibility ratio
      let best = null;
      let bestRatio = -1;
      for (const [id, ratio] of Object.entries(visibilityMap)) {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      }
      if (best) setActive(best);
    };

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          visibilityMap[id] = entry.intersectionRatio;
          pickActive();
        },
        { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    observerRef.current = { disconnect: () => observers.forEach(o => o.disconnect()) };
    return () => observerRef.current?.disconnect();
  }, [sections]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Get the navbar height dynamically
    const navbar = document.querySelector('.navbar-container');
    const offset = navbar ? navbar.getBoundingClientRect().height + 50 : 80;

    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop — left side */}
      <nav className="page-menu">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              className={`page-menu-item${isActive ? ' page-menu-item--active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              <span className="page-menu-label">{label}</span>
            </button>
          );
        })}
      </nav>

      {/* Mobile — bottom bar */}
      <nav className="page-menu-mobile">
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              className={`page-menu-mobile-item${isActive ? ' page-menu-mobile-item--active' : ''}`}
              onClick={() => scrollTo(id)}
            >
              {label}
            </button>
          );
        })}
      </nav>
    </>
  );
}
