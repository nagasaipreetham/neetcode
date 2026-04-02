import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import ShapeGrid from '../components/ShapeGrid/ShapeGrid';
import GradientText from '../components/GradientText/GradientText';
import SpotlightCard from '../components/SpotlightCard/SpotlightCard';
import MagicBento from '../components/MagicBento/MagicBento';
import PageMenu from '../components/PageMenu/PageMenu';
import globeIcon from '../assets/globe.svg';
import giftIcon from '../assets/gift.svg';
import googleLogo from '../assets/google.png';
import amazonLogo from '../assets/amazon.png';
import microsoftLogo from '../assets/microsoft.png';
import meta from '../assets/meta.png';
import captialOne from '../assets/captialone.png';
import charlesSchwab from '../assets/charles schwab.png';
import citiLogo from '../assets/citi-logo.png';
import doordash from '../assets/doordash.jpg';
import gmLogo from '../assets/gm-logo.png';
import oracle from '../assets/oracle.svg';
import paypal from '../assets/paypal.svg';
import pmgLogo from '../assets/pmg-logo.png';
import sofiIcon from '../assets/sofi-icon.png';
import tmobile from '../assets/tmobile.png';
import zscaler from '../assets/zscaler.png';
import './ProPage.css';

const PRO_SECTIONS = [
  { id: 'pro-plans',   label: 'Plans'    },
  { id: 'pro-features', label: 'Features' },
  { id: 'pro-stories', label: 'Stories'  },
  { id: 'pro-faq',     label: 'FAQ'      },
];

const successStories = [
  {
    logo: meta,
    company: 'Meta',
    position: 'Machine Learning Engineer',
    description: 'Passed a FAANG interview loop at Meta for an MLE position. After failing at Google 10 years ago, DeepMind 4 years ago, and Meta a year ago, I was determined to stick the landing this time.'
  },
  {
    logo: amazonLogo,
    company: 'Amazon',
    position: 'SDE II',
    description: 'All the medium/hard exercises from the interviews were in the company tagged list, so it definitely helped a lot.'
  },
  {
    logo: googleLogo,
    company: 'Google',
    position: 'Machine Learning Engineer',
    description: 'Cracked my final round at Google today! I used to be so scared of DSA. But now I\'m more confident in my DSA skills than in my ML skills!'
  },
  {
    logo: paypal,
    company: 'PayPal',
    position: 'Senior Software Engineer',
    description: 'Laid off on June 20th. Started the roadmap the very next day. Studied for 15 days straight. Received my offer on July 18th!'
  },
  {
    logo: amazonLogo,
    company: 'Amazon',
    position: 'SDE-1',
    description: 'I got a matrix BFS question that I had just gone over from the NeetCode course. I felt like LeBron dunking.'
  },
  {
    logo: microsoftLogo,
    company: 'Microsoft',
    position: 'Software Engineer',
    description: 'Secured an internship over the summer and will be returning as full-time. The roadmap kept me focused and built my confidence.'
  },
  {
    logo: googleLogo,
    company: 'Google',
    position: 'Apprenticeship',
    description: 'At 26, I made the decision to return to my studies and get back into programming. I left my job and joined a unique school. Received an offer for a 1-year apprenticeship at Google!'
  },
  {
    logo: zscaler,
    company: 'ZScaler',
    position: 'Staff Software Engineer',
    description: 'I got offers from ZScaler (Staff Software Engineer) and State Street (Principal Software Engineer). The prep made the difference.'
  },
  {
    logo: doordash,
    company: 'DoorDash',
    position: 'Software Engineer',
    description: 'Passed the onsite and moving on to team matching! Definitely wouldn\'t have passed the phone screen without NeetCode.'
  },
  {
    logo: sofiIcon,
    company: 'SoFi',
    position: 'Software Engineer',
    description: 'The courses, videos, articles, and solutions are all top tier. After a long and hard search, I just started a new job as Software Engineer at SoFi!'
  },
  {
    logo: captialOne,
    company: 'Capital One',
    position: 'Software Engineer',
    description: 'I come from a state school, not even a target school. After landing final rounds at 2 FAANG companies, I chose Capital One!'
  },
  {
    logo: charlesSchwab,
    company: 'Charles Schwab',
    position: 'Associate Software Engineer',
    description: 'I\'ve accepted an offer letter to Charles Schwab for an associate software engineer position. Thank you NeetCode for helping me properly prepare.'
  },
  {
    logo: tmobile,
    company: 'T-Mobile',
    position: 'SWE - AI/Data Team',
    description: 'Got a SWE job at T-Mobile on their AI/Data team. Moved from Data Engineering with 2 years of experience and a big salary increase.'
  },
  {
    logo: pmgLogo,
    company: 'PMG',
    position: 'Software Engineer',
    description: 'Had a final round interview that required strong system design knowledge. NeetCode\'s clear explanations were crucial in helping me prepare and succeed.'
  },
  {
    logo: googleLogo,
    company: 'Google',
    position: 'Software Engineer',
    description: 'My interview process with Google was successful. The platform helped me remain calm and get the algorithms under my fingers.'
  },
  {
    logo: amazonLogo,
    company: 'Amazon',
    position: 'SDE II',
    description: 'Four months ago, I started from zero, even struggling to solve some easy array/hashing problems. Having the structure from the roadmap was a huge part of my success.'
  },
  {
    logo: amazonLogo,
    company: 'Amazon India',
    position: 'Applied Scientist Intern',
    description: 'I did my undergrad in Mechanical Engineering. DSA has always been foreign to me. Recently landed an Applied Scientist Intern role at Amazon!'
  },
  {
    logo: meta,
    company: 'Meta',
    position: 'E4 Software Engineer',
    description: 'Just found out I passed the Meta E4 loop and am now in team matching! NeetCode absolutely helped me nail the coding interviews.'
  },
  {
    logo: googleLogo,
    company: 'Google',
    position: 'L4 Software Engineer',
    description: 'I heavily relied on the roadmap for my preparation. Took on average 1 hour per question, solved it on my own in 45 min, then watched the video to compare.'
  },
  {
    logo: citiLogo,
    company: 'Citi',
    position: 'SWE Intern',
    description: 'I was able to get an internship offer at Citi as a SWE intern in the ICG team. Thank you NeetCode!'
  },
  {
    logo: oracle,
    company: 'Oracle',
    position: 'Software Engineer',
    description: 'Got a verbal offer from Oracle today! Your platform has been life changing for my career and my family.'
  },
  {
    logo: gmLogo,
    company: 'GM',
    position: 'Full-time SWE',
    description: 'Just got a full-time SWE offer at GM as a business major with no SWE internship experience!'
  },
  {
    logo: amazonLogo,
    company: 'Amazon',
    position: 'SDE Intern',
    description: 'I was able to land an Amazon SDE intern solely because of NeetCode. I come from a statistics and data science background with very little DSA experience. I only had 2 weeks to prepare.'
  },
  {
    logo: googleLogo,
    company: 'Google',
    position: 'New Grad SWE',
    description: 'Just got my official offer letter for Google New Grad in SF! Your videos helped me nail the onsite. You are really saving careers out here!'
  }
  
];

function LifetimeCard() {
  return (
    <div className="pricing-card pricing-card--lifetime">
      <div className="pricing-card-inner">
        <div className="pricing-header">
          {/* Infinity — bigger, purple gradient via SVG */}
          <svg className="pricing-infinity" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="infGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7c3aed"/>
                <stop offset="50%" stopColor="#a855f7"/>
                <stop offset="100%" stopColor="#e879f9"/>
              </linearGradient>
            </defs>
            <path d="M12 12c-2-2.5-4-4-6-4a4 4 0 000 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 000-8c-2 0-4 1.5-6 4z"
              stroke="url(#infGrad)" strokeWidth="2" strokeLinecap="round"/>
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

        {/* Price */}
        <div className="pricing-price-row">
          <span className="pricing-price">
            <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}>
              $297
            </GradientText>
          </span>
          <span className="pricing-original">$599</span>
        </div>

        {/* Caption */}
        <div className="pricing-caption">
          <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
            One-time Payment
          </GradientText>
        </div>

        {/* Divider */}
        <div className="pricing-divider pricing-divider--gradient">— — — — — — — —</div>

        {/* Features */}
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

        {/* Header */}
        <div className="pricing-header">
          <img src={globeIcon} alt="One Year" className="pricing-icon" style={{ filter: 'invert(1)' }} />
          <span className="pricing-label" style={{ color: '#fff' }}>One-Year Access</span>
        </div>

        {/* Price */}
        <div className="pricing-price-row">
          <span className="pricing-price pricing-price--white">$119</span>
          <span className="pricing-original">$199</span>
        </div>

        {/* Caption */}
        <div className="pricing-caption pricing-caption--muted">Auto-renew off by default</div>

        {/* Divider */}
        <div className="pricing-divider">— — — — — — —</div>

        {/* Features */}
        <div className="pricing-features">
          <div className="pricing-feature"><span className="pricing-tick--green">✓</span> Full access for 12 months</div>
          <div className="pricing-feature"><span className="pricing-tick--green">✓</span> Includes future content</div>
          <div className="pricing-feature"><span className="pricing-tick--green">✓</span> Private Discord community</div>
        </div>

      </SpotlightCard>
    </div>
  );
}

export default function ProPage() {
  const [showAll, setShowAll] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const successSectionRef = useRef(null);
  const COLS = 3;
  const ROWS = 2;
  const visible = showAll ? successStories : successStories.slice(0, COLS * ROWS);
  
  const handleToggle = () => {
    if (showAll) {
      // Hiding - add transition and scroll up
      setIsHiding(true);
      setTimeout(() => {
        setShowAll(false);
        setIsHiding(false);
        // Scroll to success section
        if (successSectionRef.current) {
          successSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 300);
    } else {
      // Showing
      setShowAll(true);
    }
  };
  
  return (
    <div className="pro-page">
      <div className="pro-page-bg">
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
      <PageMenu sections={PRO_SECTIONS} />

      <div className="pro-page-content">
        <div id="pro-plans">
          <h1 className="pro-page-heading">
            <GradientText
              colors={["#7c3aed","#a855f7","#c084fc","#e879f9"]}
              animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
            >
              Choose Your Plan
            </GradientText>
          </h1>

          {/* Pricing cards */}
          <div className="pricing-row" style={{ marginTop: '2rem' }}>
            <LifetimeCard />
            <YearCard />
          </div>

          {/* Gift link */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.5rem' }}>
            <Link to="/gift" className="pricing-gift-link">
              <svg className="pricing-gift-icon" viewBox="0 0 24 24" fill="none">
                <defs>
                  <linearGradient id="giftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="80%" stopColor="#7c3aed"/>
                    <stop offset="90%" stopColor="#a855f7"/>
                    <stop offset="100%" stopColor="#e879f9"/>
                  </linearGradient>
                </defs>
                <path
                  d="M20 12v8H4v-8M2 7h20v5H2zM12 7v13M7 7c-1.5 0-2.5-1-2.5-2.5S5.5 2 7 2c2 0 5 5 5 5s3-5 5-5c1.5 0 2.5 1 2.5 2.5S18.5 7 17 7"
                  stroke="url(#giftGrad)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Gift a Friend
            </Link>
          </div>
        </div>

        {/* Everything You Need section */}
        <div id="pro-features" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem', marginTop: '2rem' }}>
          <h2 className="pro-page-heading">
            <GradientText
              colors={["#7c3aed","#a855f7","#c084fc","#e879f9"]}
              animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}
            >
              Everything You Need To Succeed
            </GradientText>
          </h2>
          <MagicBento glowColor="132, 0, 255" disableAnimations={false} />
        </div>

        {/* Success Stories */}
        <div className="success-section" id="pro-stories" ref={successSectionRef}>
          <h2 className="pro-page-heading">
            <GradientText colors={["#7c3aed","#a855f7","#c084fc","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}>
              Success Stories
            </GradientText>
          </h2>
          <div className="success-grid">
            {visible.map((s, i) => (
              <div 
                key={i} 
                className={`success-card-wrapper${i >= COLS * ROWS ? ' success-card-wrapper--extra' : ''}${isHiding && i >= COLS * ROWS ? ' success-card-wrapper--hiding' : ''}`}
                style={{
                  animation: i >= COLS * ROWS && showAll && !isHiding ? 'fadeInScale 0.4s ease forwards' : 'none',
                  animationDelay: i >= COLS * ROWS ? `${(i - COLS * ROWS) * 0.05}s` : '0s'
                }}
              >
                <SpotlightCard spotlightColor="rgba(139, 92, 246, 0.2)" className="success-card-inner">
                  <div className="success-card-top">
                    <img src={s.logo} alt={s.company} className="success-card-logo" />
                    <div className="success-card-meta">
                      <span className="success-card-company">{s.company}</span>
                      <span className="success-card-position">{s.position}</span>
                    </div>
                  </div>
                  <p className="success-card-desc">{s.description}</p>
                </SpotlightCard>
              </div>
            ))}
          </div>
          <button className="success-toggle-btn" onClick={handleToggle}>
            <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
              {showAll ? 'Show Less ↑' : 'Show More ↓'}
            </GradientText>
          </button>
        </div>

        {/* Common Questions */}
        <div className="faq-section" id="pro-faq">
          <h2 className="faq-heading">
            <GradientText colors={["#7c3aed","#a855f7","#c084fc","#e879f9"]} animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', letterSpacing: 'inherit' }}>
              Common Questions
            </GradientText>
          </h2>
          <div className="faq-list">
            {faqItems.map((item, i) => (
              <FaqItem key={i} item={item} />
            ))}
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

const faqItems = [
  {
    q: 'What is included in NeetCode Pro?',
    a: 'NeetCode Pro includes full access to all video courses, 300+ practice problems with solutions in 8 languages, written guides, NeetBot AI assistant, AI hints & debug, company-tagged problems, and cloud sync across all your devices.'
  },
  {
    q: 'What is the difference between Lifetime and One-Year?',
    a: 'The Lifetime plan is a one-time payment that gives you permanent access to everything, including all future content. The One-Year plan gives you full access for 12 months and does not auto-renew by default.'
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes, we offer a 7-day money-back guarantee. If you are not satisfied with NeetCode Pro within 7 days of purchase, contact us at support@neetcode.io for a full refund.'
  },
  {
    q: 'Is there a free tier?',
    a: 'Yes! NeetCode offers a generous free tier including the NeetCode 150 problem list, roadmap, and many video explanations. Pro unlocks the full experience.'
  },
  {
    q: 'Do you offer student discounts?',
    a: 'We do not currently offer a formal student discount program, but our pricing is designed to be accessible. The One-Year plan is a great option for students preparing for internship or new grad roles.'
  },
];

function FaqItem({ item }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item${open ? ' faq-item--open' : ''}`} onClick={() => setOpen(v => !v)}>
      <div className="faq-question">
        {open ? (
          <GradientText colors={["#7c3aed","#a855f7","#e879f9"]} animationSpeed={8}
            style={{ fontSize: 'inherit', fontWeight: 'inherit' }}>
            {item.q}
          </GradientText>
        ) : item.q}
        <span className="faq-chevron">{open ? '↑' : '↓'}</span>
      </div>
      {open && <div className="faq-answer">{item.a}</div>}
    </div>
  );
}
