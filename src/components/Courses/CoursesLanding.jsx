import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import CourseCard from './CourseCard';
import { COURSES_DATA } from '../../data/coursesData';
import './CoursesLanding.css';

export default function CoursesLanding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePrevious = () => {
    if (activeIndex > 0 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection(-1);
      // Wait for expand animation, then change content, then collapse
      setTimeout(() => {
        setActiveIndex(activeIndex - 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600); // Collapse duration
      }, 600); // Expand duration
    }
  };

  const handleNext = () => {
    if (activeIndex < COURSES_DATA.length - 1 && !isTransitioning) {
      setIsTransitioning(true);
      setDirection(1);
      // Wait for expand animation, then change content, then collapse
      setTimeout(() => {
        setActiveIndex(activeIndex + 1);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600); // Collapse duration
      }, 600); // Expand duration
    }
  };

  const handleDotClick = (index) => {
    if (index !== activeIndex && !isTransitioning) {
      setIsTransitioning(true);
      setDirection(index > activeIndex ? 1 : -1);
      setTimeout(() => {
        setActiveIndex(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 600);
      }, 600);
    }
  };

  const activeSubject = COURSES_DATA[activeIndex];

  return (
    <section className="courses-landing-outer">
      <div className="courses-container">
        
        {/* Header Section */}
        <header className="courses-header">
          <span className="courses-label">Courses</span>
          <h2 className="courses-title">Master the Core</h2>
          <p className="courses-desc">
            From foundation to mastery. Our structured paths are designed 
            to take you from zero to job-ready.
          </p>
        </header>

        {/* Content Wrapper with Transition Overlay */}
        <div className="courses-content-wrapper">
          
          {/* Blue Rectangle Transition Overlay */}
          <motion.div
            className="transition-overlay"
            initial={false}
            animate={
              isTransitioning
                ? direction === 1
                  ? { scaleY: [0, 1, 0], transformOrigin: ['bottom', 'bottom', 'top'] }
                  : { scaleY: [0, 1, 0], transformOrigin: ['top', 'top', 'bottom'] }
                : { scaleY: 0 }
            }
            transition={{
              duration: 1.2,
              times: [0, 0.5, 1],
              ease: [0.65, 0, 0.35, 1]
            }}
          />
          
          <div className="courses-content-grid">
            
            <div className="courses-text-panel">
              <div className="courses-progress-header">
                <div className="carousel-dots">
                  {COURSES_DATA.map((_, i) => (
                    <div 
                      key={i} 
                      className={`dot ${i === activeIndex ? 'active' : ''}`}
                      onClick={() => handleDotClick(i)}
                      style={{ cursor: 'pointer' }}
                    />
                  ))}
                </div>
                <div className="page-controls">
                  <button
                    className="arrow-button arrow-left"
                    onClick={handlePrevious}
                    disabled={activeIndex === 0}
                    aria-label="Previous course"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div className="page-number">
                    {activeIndex + 1} / {COURSES_DATA.length}
                  </div>
                  <button
                    className="arrow-button arrow-right"
                    onClick={handleNext}
                    disabled={activeIndex === COURSES_DATA.length - 1}
                    aria-label="Next course"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSubject.id}
                  initial={{ opacity: 0, y: direction > 0 ? 20 : -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: direction > 0 ? -20 : 20 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <h3 className="subject-title">{activeSubject.title}</h3>
                  <p className="subject-description">{activeSubject.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="courses-cards-panel">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={activeSubject.id}
                  className="subject-row-wrapper active"
                  initial={{ opacity: 0, x: direction > 0 ? 80 : -80, filter: "blur(4px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: direction > 0 ? -80 : 80, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {activeSubject.cards.map((card, idx) => (
                    <div key={`${activeSubject.id}-${idx}`} className="showcase-card">
                      <CourseCard {...card} />
                    </div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
