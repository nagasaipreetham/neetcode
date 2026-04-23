import { Code, Users, Trophy, TrendingUp } from 'lucide-react';
import './FeaturesGrid.css';

const FEATURES = [
  {
    icon: Code,
    label: 'PROBLEMS',
    title: '2,500+',
    subtitle: 'Coding Problems',
    description: 'From easy to hard, covering all major topics and patterns',
    color: '#0562EF'
  },
  {
    icon: Users,
    label: 'COMMUNITY',
    title: '1M+',
    subtitle: 'Active Learners',
    description: 'Join a thriving community of developers preparing for interviews',
    color: '#8b5cf6'
  },
  {
    icon: Trophy,
    label: 'SUCCESS',
    title: '85%',
    subtitle: 'Success Rate',
    description: 'Students who complete our courses land their dream jobs',
    color: '#22c55e'
  },
  {
    icon: TrendingUp,
    label: 'GROWTH',
    title: '<300ms',
    subtitle: 'Average Response',
    description: 'Lightning-fast platform for seamless learning experience',
    color: '#f59e0b'
  }
];

export default function FeaturesGrid() {
  return (
    <section className="features-grid-section">
      <div className="features-grid-container">
        
        {/* Section Header */}
        <div className="features-grid-header">
          <span className="features-grid-label">FEATURES [1/4]</span>
          <h2 className="features-grid-title">Everything you need to succeed</h2>
          <p className="features-grid-desc">
            Comprehensive tools and resources designed to help you master coding interviews
          </p>
        </div>

        {/* Grid */}
        <div className="features-grid">
          {FEATURES.map((feature, idx) => (
            <div key={idx} className="feature-card" style={{ '--accent-color': feature.color }}>
              <div className="feature-card-inner">
                <div className="feature-icon-wrap">
                  <feature.icon className="feature-icon" strokeWidth={1.5} />
                </div>
                <span className="feature-label">{feature.label}</span>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-subtitle">{feature.subtitle}</p>
                <p className="feature-description">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
