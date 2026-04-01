import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import GradientText from '../components/GradientText/GradientText';
import PixelSnow from '../components/PixelSnow/PixelSnow';
import './PrivacyPolicy.css';

export default function PrivacyPolicy() {
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
            Privacy Policy
          </GradientText>
        </h1>

        <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="policy-card">
          <div className="policy-section">
            <h2 className="policy-subheading">1. Information We Collect</h2>
            <p className="policy-text">
              We collect information you provide directly to us, such as when you create an account,
              subscribe to our services, or contact us for support. This may include your name,
              email address, and payment information.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">2. How We Use Your Information</h2>
            <p className="policy-text">
              We use the information we collect to provide, maintain, and improve our services,
              process transactions, send you technical notices and support messages, and respond
              to your comments and questions.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">3. Information Sharing</h2>
            <p className="policy-text">
              We do not share your personal information with third parties except as described
              in this policy. We may share your information with vendors and service providers
              who need access to such information to carry out work on our behalf.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">4. Data Retention</h2>
            <p className="policy-text">
              We retain personal information for as long as necessary to fulfill the purposes
              outlined in this privacy policy, unless a longer retention period is required
              or permitted by law.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">5. Security</h2>
            <p className="policy-text">
              We take reasonable measures to help protect information about you from loss, theft,
              misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>
          </div>
          <div className="policy-section">
            <h2 className="policy-subheading">6. Contact Us</h2>
            <p className="policy-text">
              If you have any questions about this Privacy Policy, please contact us at support@neetcode.io.
            </p>
          </div>
        </SpotlightCard>
      </div>

      <Footer />
    </div>
  );
}
