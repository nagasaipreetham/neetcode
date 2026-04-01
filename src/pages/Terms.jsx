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
            <h2 className="policy-subheading">Terms</h2>
            <p className="policy-text">
                By accessing this website, you are agreeing to be bound by these website 
                Terms and Conditions of Use, all applicable laws, and regulations, and agree that 
                you are responsible for compliance with any applicable local laws. 
                If you do not agree with any of these terms, you are prohibited from using or accessing this site. 
                The materials contained in this website are protected by applicable copyright and trademark law.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Content Copyright Policy</h2>
            <p className="policy-text">
              The site design, logo, video content subject to copyright © 2022-present | Neetcode.io
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">User-Generated Content</h2>
            <p className="policy-text">
                Our platform allows users to create and share content, including profile pictures, comments, posts, and display names. By submitting content to Neetcode, you grant us a non-exclusive, worldwide, royalty-free license to use, display, and distribute your content in connection with our services.<br />
                You are solely responsible for any content you submit. You agree not to submit content that:<br />
                1. Is illegal, harmful, threatening, abusive, harassing, defamatory, or otherwise objectionable<br />
                2. Contains sexually explicit or pornographic material<br />
                3. Infringes on any third party's intellectual property or privacy rights<br />
                4. Contains malware, spam, or any form of automated messaging<br />
                5. Impersonates another person or entity<br />
                6. Violates any applicable laws or regulations<br />
                We reserve the right to remove any content that violates these terms and to suspend or terminate accounts that repeatedly violate our policies. We do not pre-screen all user content but may review and remove content at our discretion.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Memberships</h2>
            <p className="policy-text">
                Billing: Fees for the Neetcode Pro Lifetime Membership are charged once, and membership begins upon successful payment. Fees for the Neetcode Pro One-Year Access are also charged once per year. The One-Year Access plan does not auto-renew by default. If you choose to enable auto-renewal, fees are charged on the same day of the year that the subscription began.<br />
                Refunds: We generally do not offer refunds because our content is consumable. We offer extensive free content so you can try before you buy. In rare circumstances, we may grant a refund at our discretion. If you believe there was a mistake or have a special situation, please reach out to support@neetcode.io.<br />
                Account Sharing: Accounts are for personal use only and may not be shared with others. Accounts found to be shared may be restricted or terminated.<br />
                Account Transfers: Accounts cannot be transferred to another person or email. Purchases are tied to the account that made them. We recommend using a personal email address rather than a student or corporate email that you may lose access to in the future.<br />
                Content Updates: Your Pro membership includes access to all future content updates. As we add new courses, problems, and features, you automatically get access to them.<br />
                Sign-up: By signing up for Neetcode, you grant Neetcode permission to send email communications to the email address associated with your account provider. If you receive promotional emails from Neetcode, you can unsubscribe by clicking the Unsubscribe or Opt-Out link at the bottom of every email.<br />
                Cancellations: Since the One-Year Access plan does not auto-renew by default, there is nothing to cancel. If you have enabled auto-renewal, you may disable it any time before the end of the current billing period, and it will take effect at the end of the current billing period. Cancellation or disabling auto-renewal will not result in a refund.<br />
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Disclaimer</h2>
            <p className="policy-text">
                The materials on the Neetcode.io website are provided “as is”. Neetcode.io makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties, including without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights. Further, Neetcode.io does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its Internet website or otherwise relating to such materials or on any sites linked to this site.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Limitations</h2>
            <p className="policy-text">
                In no event shall Neetcode.io liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the Neetcode.io Internet site, even if Neetcode.io or a Neetcode.io authorized representative has been notified orally or in writing of the possibility of such damage. Because some jurisdictions do not allow limitations on implied warranties, or limitations of liability for consequential or incidental damages, these limitations may not apply to you.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Intellectual Property Rights</h2>
            <p className="policy-text">
                Neetcode.io is committed to protecting intellectual property rights. Neetcode.io strictly follows DMCA guidelines for unauthorized use of copyrighted material. Any inquires regarding the reproduction of the content on this site must be directed to the party holding the proprietary rights to the specified content. You shall not distribute, publish, transmit, modify, display or create derivative works from material obtained with this service. To file a notice of copyright infringement with Neetcode.io, you will need to provide a written communication that follows the guidelines set in Section 512(c)(3) of the Digital Millennium Copyright Act (the “DMCA”).
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Governing Law</h2>
            <p className="policy-text">
                Any claim relating to the Neetcode.io website shall be governed by the laws of the State of Washington without regard to its conflict of law provisions. General Terms and Conditions apply to the Use of a Web Site.
            </p>
          </div>

        </SpotlightCard>
      </div>

      <Footer />
    </div>
  );
}
