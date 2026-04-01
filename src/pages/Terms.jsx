import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import GradientText from '../components/GradientText/GradientText';
import PixelSnow from '../components/PixelSnow/PixelSnow';
import './PrivacyPolicy.css';

export default function Terms() {
  return (
    <div className="policy-page">
      {/* Background */}
      <div className="policy-bg">
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

      <Navbar />

      <div className="policy-content">
        <h1 className="policy-main-heading">
          <GradientText
            colors={["#7c3aed", "#a855f7", "#c084fc", "#e879f9"]}
            animationSpeed={8}
            style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
          >
            Terms of Service
          </GradientText>
        </h1>

        <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="policy-card">
          <div className="policy-section">
            <h2 className="policy-subheading">1. Acceptance of Terms</h2>
            <p className="policy-text">
              By accessing and using NeetCode, you accept and agree to be bound by the terms
              and provisions of this agreement. If you do not agree to these terms, please
              do not use our services.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">2. Use of Service</h2>
            <p className="policy-text">
              You may use our services only for lawful purposes and in accordance with these
              terms. You agree not to use our services in any way that violates applicable
              local, national, or international law or regulation.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">3. Intellectual Property</h2>
            <p className="policy-text">
              The service and its original content, features, and functionality are and will
              remain the exclusive property of NeetCode and its licensors. Our content may
              not be reproduced without express written permission.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">4. Subscriptions & Payments</h2>
            <p className="policy-text">
              Some parts of the service are billed on a subscription basis. You will be billed
              in advance on a recurring basis. Subscription fees are non-refundable except
              where required by law.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">5. Termination</h2>
            <p className="policy-text">
              We may terminate or suspend your account immediately, without prior notice or
              liability, for any reason, including without limitation if you breach these terms.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">6. Limitation of Liability</h2>
            <p className="policy-text">
              In no event shall NeetCode, its directors, employees, or agents be liable for
              any indirect, incidental, special, consequential, or punitive damages resulting
              from your use of the service.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">7. Contact Us</h2>
            <p className="policy-text">
              If you have any questions about these Terms, please contact us at support@neetcode.io.
            </p>
          </div>
        </SpotlightCard>
      </div>

      <Footer />
    </div>
  );
}
