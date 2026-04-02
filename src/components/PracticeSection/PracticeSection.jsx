import { useState } from 'react';
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
          <div className="practice-card">
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
                  <div className="practice-progress-bar">
                    <div
                      className="practice-progress-fill"
                      style={{ width: `${pct}%`, transition: 'width 0.4s ease' }}
                    />
                  </div>
                  <span className="practice-progress-label">{pct}% completed ({count} / {total})</span>
                </div>

                {/* Clickable topic buttons */}
                <div className="practice-topics">
                  {ALL_TOPICS.map((t, i) => (
                    <button
                      key={i}
                      onClick={() => toggle(t)}
                      className={`practice-topic-btn${selected.has(t) ? ' practice-topic-btn--active' : ''}${t.startsWith('+') ? ' practice-topic-btn--more' : ''}`}
                    >
                      {t}
                    </button>
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
