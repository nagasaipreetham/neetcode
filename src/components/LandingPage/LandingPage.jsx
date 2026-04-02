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
import './LandingPage.css';

function RevealSection({ children, threshold }) {
  const ref = useScrollReveal(threshold ? { threshold } : {});
  return <div ref={ref} className="scroll-reveal">{children}</div>;
}

export default function LandingPage() {
  return (
    <div className="landing-page">
      {/* PixelSnow — rendered first so it's at the bottom of the stacking order */}
      <div className="background-container">
        <PixelSnowBg />
      </div>
      <Navbar />
      <Hero />
      <RevealSection><CompanyOrbit /></RevealSection>
      <RevealSection><Reviews /></RevealSection>
      <RevealSection threshold={0.01}><Courses /></RevealSection>
      <RevealSection><PracticeSection /></RevealSection>
      <RevealSection><AboutSection /></RevealSection>
      <Footer />
    </div>
  );
}
