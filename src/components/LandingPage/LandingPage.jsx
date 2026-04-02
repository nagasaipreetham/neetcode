import useScrollReveal from '../../hooks/useScrollReveal';
import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import CompanyOrbit from '../CompanyOrbit/CompanyOrbit';
import Reviews from '../Reviews/Reviews';
import Courses from '../Courses/Courses';
import PracticeSection from '../PracticeSection/PracticeSection';
import AboutSection from '../AboutSection/AboutSection';
import Footer from '../Footer/Footer';
import PixelSnowBg from '../PixelSnow/PixelSnowBg';
import PageMenu from '../PageMenu/PageMenu';
import './LandingPage.css';

const LANDING_SECTIONS = [
  { id: 'hero',     label: 'Home'     },
  { id: 'results',  label: 'Results'  },
  { id: 'courses',  label: 'Courses'  },
  { id: 'practice', label: 'Practice' },
  { id: 'story',    label: 'Story'    },
];

function RevealSection({ children, threshold }) {
  const ref = useScrollReveal(threshold ? { threshold } : {});
  return <div ref={ref} className="scroll-reveal">{children}</div>;
}

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="background-container">
        <PixelSnowBg />
      </div>
      <Navbar />
      <PageMenu sections={LANDING_SECTIONS} />

      <div id="hero">
        <Hero />
      </div>

      <div id="results">
        <RevealSection><CompanyOrbit /></RevealSection>
        <RevealSection><Reviews /></RevealSection>
      </div>

      <div id="courses">
        <RevealSection threshold={0.01}><Courses /></RevealSection>
      </div>

      <div id="practice">
        <RevealSection><PracticeSection /></RevealSection>
      </div>

      <div id="story">
        <RevealSection><AboutSection /></RevealSection>
      </div>

      <Footer />
    </div>
  );
}
