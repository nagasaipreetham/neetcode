import Navbar from '../Navbar/Navbar';
import Hero from '../Hero/Hero';
import CompanyOrbit from '../CompanyOrbit/CompanyOrbit';
import Reviews from '../Reviews/Reviews';
import PixelSnow from '../PixelSnow/PixelSnow';
import './LandingPage.css';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <Navbar />
      <Hero />
      <CompanyOrbit />
      <Reviews />
      <div className="background-container">
        <PixelSnow 
          color="#ffffff"
          flakeSize={0.01}
          minFlakeSize={1.25}
          pixelResolution={200}
          speed={1.25}
          density={0.3}
          direction={125}
          brightness={1}
          depthFade={8}
          farPlane={20}
          gamma={0.4545}
          variant="square"
        />
      </div>
    </div>
  );
}
