import React, { memo } from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import CompanyOrbit from '../CompanyOrbit/CompanyOrbit';
import Reviews from '../Reviews/Reviews';
import CoursesLanding from '../Courses/CoursesLanding';
import FeaturesGrid from '../FeaturesGrid/FeaturesGrid';
import PracticeSection from '../PracticeSection/PracticeSection';
import AboutSection from '../AboutSection/AboutSection';
import Footer from '../Footer/Footer';
import PageMenu from '../PageMenu/PageMenu';
import './LandingPage.css';

/**
 * Section Configuration for Navigation
 */
const LANDING_SECTIONS = [
  { id: 'home',        label: 'Home'       },
  { id: 'companies',   label: 'Companies'  },
  { id: 'features',    label: 'Features'   },
  { id: 'courses',     label: 'Courses'    },
  { id: 'practice',    label: 'Practice'   },
  { id: 'testimonials',label: 'Testimonials' },
  { id: 'story',       label: 'Story'      },
];

/**
 * Standardized Section Wrapper
 * Handles ID assignment and optional scroll-reveal animation.
 */
const Section = memo(({ id, children, reveal = true, threshold = 0.12 }) => {
  const revealRef = useScrollReveal({ threshold });
  
  return (
    <div 
      id={id} 
      ref={reveal ? revealRef : null} 
      className={`landing-section ${reveal ? 'scroll-reveal' : ''}`}
    >
      {children}
    </div>
  );
});

Section.displayName = 'Section';

/**
 * Landing Page Component
 * Orchestrates all main sections of the website.
 */
export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <PageMenu sections={LANDING_SECTIONS} />

      {/* Hero Section - No reveal as it's above the fold */}
      <Section id="home" reveal={false}>
        <Hero />
      </Section>

      {/* Trust & Companies */}
      <Section id="companies">
        <CompanyOrbit />
      </Section>

      {/* Features Grid - Stats */}
      <Section id="features">
        <FeaturesGrid />
      </Section>

      {/* Interactive Courses - Handles its own scroll/animations */}
      <Section id="courses" reveal={false}>
        <CoursesLanding />
      </Section>

      {/* Practice & Ecosystem */}
      <Section id="practice">
        <PracticeSection />
      </Section>

      {/* Social Proof / Reviews */}
      <Section id="testimonials">
        <Reviews />
      </Section>

      {/* Founder's Story */}
      <Section id="story">
        <AboutSection />
      </Section>

      <Footer />
    </div>
  );
}

