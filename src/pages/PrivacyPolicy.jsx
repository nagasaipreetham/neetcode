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
            <p className="policy-text">
                Last Updated: 02/03/2026<br />
                Neetcode.io (“Neetcode” “we” or “us”) is committed to protecting your privacy.
                This Privacy Policy explains the methods and reasons we collect, use, disclose, transfer, and store your information.
                If you have any questions about the contents of this policy, don't hesitate to contact us.<br />
                If you do not consent to the collection and use of information from or about you in accordance with this Privacy Policy, then you are not permitted to use Neetcode or any services provided on https://Neetcode.io.<br />
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Applicable Law</h2>
            <p className="policy-text">
              Neetcode is headquartered in the United States of America in the state of Washington. By viewing any content or otherwise using the services offered by Neetcode, you consent to the transfer of information to the United States of America to the extent applicable, and the collection, storage, and processing of information under Washington, USA law.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Information We Collect</h2>
            <p className="policy-text">
                Information you Submit: We store information you provide on this site via forms, surveys, or any other interactive content. This information commonly includes, but is not limited to, name and email address.<br />
                Profile Information: When you create an account, we collect and store your display name, anonymous username, and profile picture. Your display name and profile picture are publicly visible on your profile and alongside any comments or posts you make (unless you choose to post anonymously). Your anonymous username is used when you post content anonymously.<br />
                User-Generated Content: We collect and store content you create on our platform, including comments, posts, and replies. This content may be publicly visible to other users. We also store metadata such as timestamps and vote counts associated with your content.<br />
                Image Storage: Profile pictures are stored using third-party image hosting services (Cloudflare Images). These images may be processed and resized for optimal delivery. We retain the right to remove images that violate our terms of service.<br />
                Log Files: We collect information when you use services provided on our site. This information may include your IP address, device and software characteristics (such as type and operating system), page views, referral URLs, device identifiers or other unique identifiers such as advertising identifiers (e.g., “ad-ID” or “IDFA”), and carrier information. Log files are primarily used for the purpose of enhancing the user experience.<br />
                Cookies: We use cookies and related technologies to keep track of user preferences and activity. Cookies are small text files created by a web server, delivered through a web browser, and stored on your computer. Most Internet browsers automatically accept cookies. You can instruct your browser, by changing its settings, to stop accepting cookies or to prompt you before accepting a cookie from the websites you visit.<br />
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Third Party Services</h2>
            <p className="policy-text">
                This site contains links to other websites not owned by Neetcode. In general, the third-party services used by us will only collect, use and disclose your information to the extent necessary to allow them to perform their intended services. Please be aware that we are not responsible for the privacy policies of third-party services.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Children and COPPA</h2>
            <p className="policy-text">
                Neetcode is committed to complying with the Children's Online Privacy Protection Act (COPPA). We do not use our services to intentionally solicit data from or market to children under the age of 13. We encourage parents and guardians to report any suspicions that a child has provided us with information without their consent. We will take reasonable action to remove this information.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Your Choices</h2>
            <p className="policy-text">
                Do Not Track Browser settings: If you enable Do Not Track settings in the browser you are using, Neetcode will not use information about websites you visit, other than our site. Learn more about Do Not Track by visiting https://allaboutdnt.com. Email Communication Opt-Out: If you receive promotional emails from Neetcode, you can unsubscribe by clicking the bottom Unsubscribe or Opt-Out link at the bottom of every email.<br />
                Profile Information: You can update your display name and profile picture at any time through your account settings. You can remove your profile picture to revert to your authentication provider's default image or a placeholder.<br />
                User-Generated Content: You can delete your own comments and posts at any time. Deleted content may be retained in our backups for a limited period but will not be publicly visible. Note that replies to your content made by other users will not be deleted when you delete your content.<br />
            </p>
          </div>

        <div className="policy-section">
            <h2 className="policy-subheading">Data Retention</h2>
            <p className="policy-text">
                We retain your account information and user-generated content for as long as your account is active. If you delete your account, we will delete your personal information within 30 days, except where we are required to retain it for legal or legitimate business purposes. Anonymized or aggregated data may be retained indefinitely.
            </p>
          </div>

          <div className="policy-section">
            <h2 className="policy-subheading">Contact Us</h2>
            <p className="policy-text">
                At Neetcode, we believe our talented customer service staff will be able to resolve any issues you may have using the our services. If you would like additional information about this privacy policy, please visit our homepage at https://Neetcode.io or contact us at neetcodebusiness@gmail.com.
            </p>
          </div>
        </SpotlightCard>
      </div>

      <Footer />
    </div>
  );
}
