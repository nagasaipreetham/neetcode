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

const topics = ['Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Trees', 'Linked List', 'Tries', 'Backtracking', '+10 more'];

export default function PracticeSection() {
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
            {/* Start Practicing → NC150 */}
            <a href={NC150} target="_blank" rel="noreferrer" className="practice-link-wrap">
              <StarBorder as="div" className="practice-btn-pro" color="#c084fc" speed="3s">
                Start Practicing
              </StarBorder>
            </a>

            {/* View Roadmap → roadmap */}
            <a href={ROADMAP} target="_blank" rel="noreferrer">
              <button className="practice-btn-free">View Roadmap</button>
            </a>
          </div>

          {/* Join Discord */}
          <div>
            <a href={DISCORD} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
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
                {/* Header — badge + title both link to NC150 */}
                <div className="practice-card-header">
                  <a href={NC150} target="_blank" rel="noreferrer" className="practice-card-badge-link">
                    <span className="practice-card-badge">Free</span>
                  </a>
                  <a href={NC150} target="_blank" rel="noreferrer" className="practice-card-title-link">
                    <span className="practice-card-title">NeetCode 150</span>
                  </a>
                </div>

                {/* Progress bar → NC150 */}
                <a href={NC150} target="_blank" rel="noreferrer" className="practice-progress-link">
                  <div className="practice-progress-wrap">
                    <div className="practice-progress-bar">
                      <div className="practice-progress-fill" />
                    </div>
                    <span className="practice-progress-label">67 / 150 completed</span>
                  </div>
                </a>

                {/* Topics */}
                <div className="practice-topics">
                  {topics.map((t, i) => (
                    <button key={i} className={`practice-topic-btn${t.startsWith('+') ? ' practice-topic-btn--more' : ''}`}>
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
