import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import './PageMenu.css';

export default function PageMenu({ sections }) {
  const [active, setActive] = useState(sections[0]?.id || '');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const observerRef = useRef(null);
  const scrollLineRef = useRef(null);

  /* ── Active section tracking ── */
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    const observers = [];
    const visibilityMap = {};

    const pickActive = () => {
      let best = null, bestRatio = -1;
      for (const [id, ratio] of Object.entries(visibilityMap)) {
        if (ratio > bestRatio) { bestRatio = ratio; best = id; }
      }
      if (best) setActive(best);
    };

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { visibilityMap[id] = entry.intersectionRatio; pickActive(); },
        { threshold: Array.from({ length: 21 }, (_, i) => i * 0.05), rootMargin: '-10% 0px -10% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });

    observerRef.current = { disconnect: () => observers.forEach(o => o.disconnect()) };
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections]);

  /* ── Scroll progress ── */
  useEffect(() => {
    const handleScroll = () => {
      if (isDragging) return; // Don't update while dragging
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const currentScroll = window.scrollY;
      const maxScroll = totalHeight - windowHeight;
      const progress = maxScroll > 0 ? currentScroll / maxScroll : 0;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  /* ── Draggable scroll thumb ── */
  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!scrollLineRef.current) return;
      
      const lineRect = scrollLineRef.current.getBoundingClientRect();
      const lineHeight = lineRect.height;
      const mouseY = e.clientY - lineRect.top;
      
      // Calculate progress (0 to 1)
      let progress = mouseY / lineHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      // Calculate scroll position
      const windowHeight = window.innerHeight;
      const totalHeight = document.documentElement.scrollHeight;
      const maxScroll = totalHeight - windowHeight;
      const targetScroll = progress * maxScroll;
      
      // Update scroll position
      window.scrollTo({ top: targetScroll, behavior: 'auto' });
      setScrollProgress(progress);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbar = document.querySelector('.navbar-container');
    const offset = navbar ? navbar.getBoundingClientRect().height + 50 : 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  };

  const activeLabel = sections.find(s => s.id === active)?.label || '';
  const chars = activeLabel.toUpperCase().split('');

  return (
    <>
      {/* ── Desktop: right-side scroll indicator ── */}
      <div className="scroll-indicator-container">
        <div className="scroll-line" ref={scrollLineRef}>
          <div
            className="scroll-thumb"
            style={{
              top: `${scrollProgress * 100}%`,
              transform: `translateY(-${scrollProgress * 100}%)`,
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleThumbMouseDown}
          />
        </div>

        {/* Section label */}
        <div className="scroll-text">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeLabel}
              className="scroll-text-inner"
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {chars.map((char, i) => (
                <motion.span
                  key={`${activeLabel}-${i}`}
                  className="scroll-char"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.12, delay: i * 0.035, ease: 'easeOut' }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Mobile: bottom pill bar ── */}
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
