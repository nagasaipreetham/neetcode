import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BorderGlow from '../BorderGlow/BorderGlow';
import StarBorder from '../StarBorder/StarBorder';
import GradientText from '../GradientText/GradientText';
import discordIcon from '../../assets/discord.svg';
import './PracticeSection.css';

const NC150 = 'https://neetcode.io/practice/practice/neetcode150';
const ROADMAP = 'https://neetcode.io/roadmap';
const DISCORD = 'https://discord.com/invite/ddjKRXPqtk';

const features = [
  'Organized study plans: Blind 75, NeetCode 150, NeetCode 250',
  'Detailed video explanations for every problem',
  'Track your progress and stay motivated',
  'Join our public Discord community',
];

const ALL_TOPICS = [
  'Arrays & Hashing', 'Two Pointers', 'Sliding Window',
  'Stack', 'Binary Search', 'Linked List',
  'Trees', 'Tries', 'Heap / Priority Queue',
  'Backtracking', 'Graphs', 'Advanced Graphs',
  'Dynamic Programming', 'Greedy', 'Intervals',
  'Math & Geometry', '+1 more'
];

// Default 3 selected
const DEFAULT_SELECTED = new Set(['Arrays & Hashing', 'Two Pointers', 'Sliding Window']);

export default function PracticeSection() {
  const [selected, setSelected] = useState(DEFAULT_SELECTED);
  const [prevPct, setPrevPct] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const toggle = (topic) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  };

  const total = ALL_TOPICS.length;
  const count = selected.size;
  const pct = Math.round((count / total) * 100);

  // Celebration milestones
  useEffect(() => {
    const milestones = [25, 50, 75, 100];
    const crossedMilestone = milestones.find(m => prevPct < m && pct >= m);
    
    if (crossedMilestone) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1000);
    }
    
    setPrevPct(pct);
  }, [pct, prevPct]);

  return (
    <section className="practice-section">
      <div className="practice-inner">

        {/* LEFT */}
        <div className="practice-left">
          <h2 className="practice-heading">
            <GradientText
              colors={["#7c3aed", "#a855f7", "#c084fc", "#e879f9"]}
              animationSpeed={8}
              style={{ fontSize: 'inherit', fontWeight: 'inherit', lineHeight: 'inherit', letterSpacing: 'inherit' }}
            >
              Start Practicing for Free
            </GradientText>
          </h2>
          <p className="practice-caption">The best resources for coding interviews. Period.</p>

          <div className="practice-features">
            {features.map((f, i) => (
              <div key={i} className="practice-feature">
                <span className="practice-tick">✓</span>
                <span>{f}</span>
              </div>
            ))}
          </div>

          <div className="practice-buttons">
            <a href={NC150} target="_blank" rel="noreferrer" className="practice-link-wrap">
              <StarBorder as="div" className="practice-btn-pro" color="#c084fc" speed="3s">
                Start Practicing
              </StarBorder>
            </a>
            <a href={ROADMAP} target="_blank" rel="noreferrer">
              <button className="practice-btn-free">View Roadmap</button>
            </a>
          </div>

          <div>
            <a href={DISCORD} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
              <button className="practice-btn-discord">
                <img src={discordIcon} alt="Discord" className="discord-icon" />
                Join Discord
              </button>
            </a>
          </div>
        </div>

        {/* RIGHT */}
        <div className="practice-right">
          <div 
            className="practice-card"
            onMouseMove={(e) => {
              const card = e.currentTarget;
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = ((y - centerY) / centerY) * -5;
              const rotateY = ((x - centerX) / centerX) * 5;
              card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            }}
          >
            <BorderGlow
              borderRadius={16}
              backgroundColor="rgba(0, 0, 0, 0.4)"
              glowColor="220 80 70"
              glowRadius={55}
              glowIntensity={1}
              coneSpread={14}
              edgeSensitivity={0}
              colors={['#38bdf8', '#818cf8', '#60a5fa']}
            >
              <div className="practice-card-inner">
                {/* Header */}
                <div className="practice-card-header">
                  <a href={NC150} target="_blank" rel="noreferrer" className="practice-card-badge-link">
                    <span className="practice-card-badge">Free</span>
                  </a>
                  <a href={NC150} target="_blank" rel="noreferrer" className="practice-card-title-link">
                    <span className="practice-card-title">NeetCode 150</span>
                  </a>
                </div>

                {/* Interactive progress bar */}
                <div className="practice-progress-wrap">
                  <div className={`practice-progress-bar${showCelebration ? ' practice-progress-bar--celebrate' : ''}`}>
                    <div
                      className="practice-progress-fill"
                      style={{ width: `${pct}%`, transition: 'width 0.4s ease' }}
                    />
                    {showCelebration && (
                      <div className="progress-sparkles">
                        {[...Array(8)].map((_, i) => (
                          <div key={i} className="sparkle" style={{ '--i': i }} />
                        ))}
                      </div>
                    )}
                  </div>
                  <span className="practice-progress-label">{pct}% completed ({count} / {total})</span>
                </div>

                {/* Clickable topic buttons */}
                <div className="practice-topics">
                  {ALL_TOPICS.map((t, i) => (
                    <motion.button
                      key={i}
                      onClick={() => toggle(t)}
                      className={`practice-topic-btn${selected.has(t) ? ' practice-topic-btn--active' : ''}${t.startsWith('+') ? ' practice-topic-btn--more' : ''}`}
                      whileTap={{ scale: 0.95 }}
                      animate={selected.has(t) ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      {selected.has(t) && (
                        <motion.span
                          className="topic-checkmark"
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        >
                          ✓
                        </motion.span>
                      )}
                      {t}
                    </motion.button>
                  ))}
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>

      </div>
    </section>
  );
}
