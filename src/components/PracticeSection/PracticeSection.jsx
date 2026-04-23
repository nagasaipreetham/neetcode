import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StarBorder from '../StarBorder/StarBorder';
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
        <motion.div
          className="practice-left"
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="practice-section-label">Practice</div>
          <h2 className="practice-heading">Start Practicing for Free</h2>
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
              <StarBorder as="div" className="practice-btn-pro" color="#0562EF" speed="3s">
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
        </motion.div>

        {/* RIGHT */}
        <div className="practice-right">
          <motion.div
            className="practice-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
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
                      animate={selected.has(t) ? { scale: [1, 1.08, 1] } : {}}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
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
          </motion.div>
        </div>

      </div>
    </section>
  );
}
