import { useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
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

export default function CoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get('tab') || 'courses';
  const setTab = (t) => setSearchParams({ tab: t });

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

        {/* Tab content */}
        <div className="courses-page-tab">
          {tab === 'courses' && (
            <RevealSection>
              <Courses showHeading={false} gradientTitles layout="page" />
            </RevealSection>
          )}
          {tab === 'lessons' && (
            <RevealSection>
              <Lessons />
            </RevealSection>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
