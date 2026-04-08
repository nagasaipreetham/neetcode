import SpotlightCard from '../SpotlightCard/SpotlightCard';
import navneetImg from '../../assets/navneet.png';
import googleImg from '../../assets/google.png';
import amazonImg from '../../assets/amazon.png';
import captialoneImg from '../../assets/captialone.png';
import youtubeLogo from '../../assets/youtube.svg';
import linkedinLogo from '../../assets/linkedin.svg';
import './AboutSection.css';

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-inner">

        {/* LEFT — photo */}
        <div className="about-left">
          <div className="about-img-wrap">
            <img src={navneetImg} alt="Navi" className="about-img" />
          </div>
        </div>

        {/* RIGHT — spotlight card */}
        <div className="about-right">
          <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.25)" className="about-spotlight">
            <div className="about-content">
              <h2 className="about-heading">Hi, I'm Navi</h2>

              <p className="about-body">
                I created NeetCode in 2020 when I was unemployed and couldn't find a job.
              </p>
              <p className="about-body">
                While I was struggling myself, it was still rewarding for me to make videos.
              </p>
              <p className="about-body">
                I received so many messages from others who got jobs after studying with my videos. It felt so gratifying and kept me motivated.
              </p>
              <p className="about-body">
                About a year later I managed to get a job at Google.
              </p>

              {/* Social stats */}
              <div className="about-stats">
                <div className="about-stat">
                  <img src={youtubeLogo} alt="YouTube" className="about-stat-icon about-stat-icon--yt" />
                  <div className="about-stat-text">
                    <span className="about-stat-number">1M+</span>
                    <span className="about-stat-label">YouTube Subscribers</span>
                  </div>
                </div>
                <div className="about-stat">
                  <img src={linkedinLogo} alt="LinkedIn" className="about-stat-icon about-stat-icon--li" />
                  <div className="about-stat-text">
                    <span className="about-stat-number">201K+</span>
                    <span className="about-stat-label">LinkedIn Followers</span>
                  </div>
                </div>
              </div>

              {/* Founder + Previously at */}
              <div className="about-bottom-row">
                <div className="about-founder">
                  <span className="about-founder-name">Navdeep Singh</span>
                  <span className="about-founder-title">Founder of NeetCode</span>
                </div>
                <div className="about-prev">
                  <span className="about-prev-label">Previously at:</span>
                  <div className="about-prev-logos">
                    <img src={googleImg}     alt="Google"      className="about-prev-logo" />
                    <img src={amazonImg}     alt="Amazon"      className="about-prev-logo" />
                    <img src={captialoneImg} alt="Capital One" className="about-prev-logo" />
                  </div>
                </div>
              </div>

            </div>
          </SpotlightCard>
        </div>

      </div>
    </section>
  );
}
