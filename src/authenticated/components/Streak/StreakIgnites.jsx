import { Info } from 'lucide-react';
import './StreakIgnites.css';
import matchstick from '../Calendar/matchstick.png';

export default function StreakIgnites() {
  return (
    <div className="streak-ignites">
      <div className="ignites-header">
        <span className="streak-section-title">Ignites</span>
      </div>

      <div className="ignites-body">
        <div className="matchstick-container">
          <img src={matchstick} alt="Matchstick" className="matchstick-icon" />
          <div className="ignite-badge">2</div>
        </div>

        <div className="ignites-main-content">
          <div className="ignites-progress-col">
            <div className="ignites-progress-bar">
              <div className="ignites-progress-fill" style={{ width: '60%' }}></div>
            </div>
            <div className="ignites-progress-sub">
              <span className="ignites-progress-text">3/5</span>
            </div>
          </div>

          <div className="ignites-info-wrap">
            <Info size={14} className="info-icon" />
            <div className="ignites-tooltip">
              Ignite your streaks. Earn 1 ignite per 5 days streak (max of 3 ignites). Use on any missed day after you joined.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
