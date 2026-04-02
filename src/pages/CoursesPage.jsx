import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import PixelSnowBg from '../components/PixelSnow/PixelSnowBg';
import Courses from '../components/Courses/Courses';
import Lessons from '../components/Lessons/Lessons';
import './CoursesPage.css';

function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('revealed'); observer.unobserve(el); } },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children }) {
  const ref = useScrollReveal();
  return <div ref={ref} className="scroll-reveal">{children}</div>;
}

const tabVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 50 : -50,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 50 : -50,
    opacity: 0
  })
};

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'courses';
  const prevTab = useRef(tab);
  const direction = tab === 'lessons' ? 1 : -1;
  
  const setTab = (t) => {
    prevTab.current = tab;
    setSearchParams({ tab: t });
  };

  return (
    <div className="courses-page">
      <div className="courses-page-bg">
        <PixelSnowBg />
      </div>

      <Navbar />

      <div className="courses-page-content">
        {/* Toggle */}
        <div className="courses-page-toggle">
          <div
            className="toggle-slider"
            style={{ transform: `translateX(${tab === 'lessons' ? '100%' : '0'})` }}
          />
          <button
            className={`toggle-btn ${tab === 'courses' ? 'toggle-btn--active' : 'toggle-btn--inactive'}`}
            onClick={() => setTab('courses')}
          >
            Courses
          </button>
          <button
            className={`toggle-btn ${tab === 'lessons' ? 'toggle-btn--active' : 'toggle-btn--inactive'}`}
            onClick={() => setTab('lessons')}
          >
            Lessons
          </button>
        </div>

        {/* Tab content with AnimatePresence */}
        <div className="courses-page-tab">
          <AnimatePresence mode="wait" custom={direction}>
            {tab === 'courses' && (
              <motion.div
                key="courses"
                custom={direction}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <RevealSection>
                  <Courses showHeading={false} gradientTitles layout="page" />
                </RevealSection>
              </motion.div>
            )}
            {tab === 'lessons' && (
              <motion.div
                key="lessons"
                custom={direction}
                variants={tabVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <RevealSection>
                  <Lessons />
                </RevealSection>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
}
