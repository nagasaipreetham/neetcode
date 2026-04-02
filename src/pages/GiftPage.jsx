import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShapeGrid from '../components/ShapeGrid/ShapeGrid';
import GradientText from '../components/GradientText/GradientText';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import globeIcon from '../assets/globe.svg';
import giftIcon from '../assets/gift.svg';
import './GiftPage.css';
import './ProPage.css';

// ── Reused pricing card components (same UI as ProPage, no shared state) ──

function LifetimeCard() {
  return (
    <div className="pricing-card pricing-card--lifetime">
      <div className="pricing-card-inner">
        <div className="pricing-header">
          <svg className="pricing-infinity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="infGradG" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed"/>
                <stop offset="50%" stopColor="#a855f7"/>
                <stop offset="100%" stopColor="#e879f9"/>
              </linearGradient>
            </defs>
            <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"
              stroke="url(#infGradG)" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className="pricing-label">
            <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              Lifetime
            </GradientText>
          </span>
          <div className="best-value-badge">
            <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              Best Value
            </GradientText>
          </div>
        </div>

        <div className="pricing-price-row">
          <span className="pricing-price">
            <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}>
              $297
            </GradientText>
          </span>
          <span className="pricing-original">$599</span>
        </div>

        <div className="pricing-caption">
          <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
            One-time Payment
          </GradientText>
        </div>

        <div className="pricing-divider pricing-divider--gradient">— — — — — — — —</div>

        <div className="pricing-features">
          <div className="pricing-feature"><span className="pricing-tick--blue">✓</span> Everything, forever</div>
          <div className="pricing-feature"><span className="pricing-tick--blue">✓</span> All future content included</div>
          <div className="pricing-feature"><span className="pricing-tick--blue">✓</span> Private Discord community</div>
        </div>
      </div>
    </div>
  );
}

function YearCard() {
  return (
    <div className="pricing-card pricing-card--year">
      <SpotlightCard spotlightColor="rgba(255,255,255,0.06)" className="pricing-card-inner">
        <div className="pricing-header">
          <img src={globeIcon} alt="One Year" className="pricing-icon" style={{ filter: 'invert(1)' }} />
          <span className="pricing-label" style={{ color: '#fff' }}>One-Year Access</span>
        </div>

        <div className="pricing-price-row">
          <span className="pricing-price pricing-price--white">$119</span>
          <span className="pricing-original">$199</span>
        </div>

        <div className="pricing-caption pricing-caption--muted">Auto-renew off by default</div>

        <div className="pricing-divider">— — — — — — —</div>

        <div className="pricing-features">
          <div className="pricing-feature"><span className="pricing-tick--green">✓</span> Full access for 12 months</div>
          <div className="pricing-feature"><span className="pricing-tick--green">✓</span> Includes future content</div>
          <div className="pricing-feature"><span className="pricing-tick--green">✓</span> Private Discord community</div>
        </div>
      </SpotlightCard>
    </div>
  );
}

export default function GiftPage() {
  return (
    <div className="gift-page">
      <div className="gift-page-bg">
        <ShapeGrid
          direction="diagonal"
          speed={0.26}
          squareSize={40}
          borderColor="#271E37"
          hoverFillColor="#222222"
          shape="square"
          hoverTrailAmount={0}
        />
      </div>

      <Navbar />

      <div className="gift-page-content">

        {/* Heading */}
        <div className="gift-heading-row">
          <img src={giftIcon} alt="Gift" className="gift-heading-icon" />
          <h1 className="gift-main-heading">
            <GradientText
              colors={["#7c3aed","#a855f7","#c084fc","#e879f9"]}
              animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
            >
              Gift NeetCode Pro
            </GradientText>
          </h1>
        </div>

        {/* Sub heading */}
        <p className="gift-subheading">Give the gift of learning to a friend!</p>

        {/* Description */}
        <p className="gift-description">
          After your payment is completed, you will receive an email with<br />
          your activation code. You can redeem the code yourself or<br />
          forward it to a friend.
        </p>

        {/* Pricing cards — same as Pro page */}
        <div className="pricing-row">
          <LifetimeCard />
          <YearCard />
        </div>

        {/* Back link */}
        <Link to="/pro" className="gift-back-link">
          ← Back to Pro Plans
        </Link>

      </div>

      <Footer />
    </div>
  );
}
