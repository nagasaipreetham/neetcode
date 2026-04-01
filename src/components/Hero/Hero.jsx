import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import TextType from '../TextType/TextType';
import BlurText from '../BlurText/BlurText';
import CountUp from '../CountUp/CountUp';
import StarBorder from '../StarBorder/StarBorder';
import HierarchyFlow from '../HierarchyFlow/HierarchyFlow';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-left">

        {/* 1. Main heading */}
        <h1 className="hero-brand">NeetCode</h1>

        {/* 2. Typing caption */}
        <div className="hero-caption">
          <TextType
            text={["Welcome to Neetcode!", "A Better Way to Prepare"]}
            typingSpeed={60}
            deletingSpeed={40}
            pauseDuration={1800}
            showCursor
            cursorCharacter="_"
            loop
          />
        </div>

        {/* 3. Blur-in description */}
        <BlurText
          text="Tech interview roadmaps trusted by engineers at Google, Meta, OpenAI, and other top tech companies."
          delay={80}
          animateBy="words"
          direction="top"
          stepDuration={0.3}
          className="hero-description"
        />

        {/* 4. Buttons */}
        <div className="hero-buttons">
          <Link to="/pro" style={{ textDecoration: 'none' }}>
            <StarBorder
              as="div"
              className="hero-btn-pro"
              color="#c084fc"
              speed="3s"
            >
              Get Pro
            </StarBorder>
          </Link>
          <a href="https://neetcode.io/practice/practice/neetcode150" target="_blank" rel="noreferrer">
            <button className="hero-btn-free">
              Start Free
            </button>
          </a>
        </div>

        {/* 5. Stats */}
        <div className="hero-stats">

          {/* 1M+ — blur-in white text */}
          <div className="hero-stat">
            <div className="hero-stat-number">
              <BlurText
                text="1M+"
                delay={100}
                animateBy="characters"
                direction="top"
                stepDuration={0.35}
                className="stat-blur-text"
              />
            </div>
            <motion.span
              className="hero-stat-caption"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              Prepared Engineers
            </motion.span>
          </div>

          {/* 1000+ — count up with purple gradient */}
          <div className="hero-stat">
            <div className="hero-stat-number">
              <span className="gradient-stat-text">
                <CountUp from={0} to={1000} separator="," duration={2.5} />+
              </span>
            </div>
            <motion.span
              className="hero-stat-caption"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              Practice problems &amp; Video Explanations
            </motion.span>
          </div>

        </div>
      </div>

      {/* Right side — Hierarchy Flow → roadmap */}
      <a href="https://neetcode.io/roadmap" target="_blank" rel="noreferrer" className="hero-right-link">
        <div className="hero-right">
          <HierarchyFlow />
        </div>
      </a>
    </section>
  );
}
