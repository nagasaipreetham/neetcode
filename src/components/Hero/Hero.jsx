import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import BlurText from '../BlurText/BlurText';
import CountUp from '../CountUp/CountUp';
import HierarchyFlow from '../HierarchyFlow/HierarchyFlow';
import TextType from '../TextType/TextType';
import './Hero.css';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } }
};

export default function Hero() {
  const [countComplete, setCountComplete] = useState(false);

  return (
    <section className="hero-section">
      <motion.div
        className="hero-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="hero-badge">
          <span className="hero-badge-dot" />
          #1 Coding Interview Prep Platform
        </motion.div>

        {/* Typing caption — "Welcome to NeetCode!" / "A Better Way to Prepare" */}
        <motion.div variants={itemVariants} className="hero-caption-wrap">
          <TextType
            text={['Welcome to NeetCode!', 'A Better Way to Prepare']}
            typingSpeed={55}
            deletingSpeed={35}
            pauseDuration={2000}
            showCursor
            cursorCharacter="|"
            cursorClassName="hero-cursor"
            loop
            className="hero-caption"
          />
        </motion.div>

        {/* Static sub-heading with highlighted words */}
        <motion.h1 variants={itemVariants} className="hero-brand">
          Master <span className="hero-brand-accent">NeetCode</span>,
        </motion.h1>

        {/* Description */}
        <motion.div variants={itemVariants}>
          <BlurText
            text="Tech interview roadmaps trusted by engineers at Google, Meta, OpenAI, and other top tech companies."
            delay={60}
            animateBy="words"
            direction="top"
            stepDuration={0.25}
            className="hero-description"
          />
        </motion.div>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="hero-buttons">
          <Link to="/pro" className="hero-btn-pro">
            Get Pro
            <span className="hero-btn-pro-arrow">→</span>
          </Link>
          <a
            href="https://neetcode.io/practice/practice/neetcode150"
            target="_blank"
            rel="noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="hero-btn-free">Start Free</button>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-number">
              <BlurText
                text="1M+"
                delay={80}
                animateBy="characters"
                direction="top"
                stepDuration={0.3}
                className="stat-blur-text"
              />
            </div>
            <span className="hero-stat-caption">Prepared Engineers</span>
          </div>

          <div className="hero-stat">
            <div className={`hero-stat-number${countComplete ? ' stat-complete' : ''}`}>
              <span className="gradient-stat-text">
                <CountUp
                  from={0}
                  to={1000}
                  separator=","
                  duration={2.5}
                  onEnd={() => setCountComplete(true)}
                />+
              </span>
            </div>
            <span className="hero-stat-caption">Problems & Video Explanations</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Right side — DSA Roadmap Tree */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="hero-right"
      >
        <HierarchyFlow />
      </motion.div>
    </section>
  );
}
