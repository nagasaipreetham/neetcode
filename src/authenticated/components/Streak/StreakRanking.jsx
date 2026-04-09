import { Info, Medal } from 'lucide-react';
import './StreakRanking.css';

export default function StreakRanking() {
  const bars = [80, 20, 25, 15, 18, 12]; // Heights in px for the histogram

  return (
    <div className="streak-ranking">
      <div className="ranking-header">
        <div className="ranking-top-info">
          <Medal size={18} className="bronze-medal" />
          <span className="ranking-percentile">Top 55.9%</span>
        </div>
        <span className="ranking-count">5 solved</span>
      </div>

      <div className="ranking-graph">
        {bars.map((height, i) => (
          <div 
            key={i} 
            className={`ranking-bar ${i === 0 ? 'active' : ''}`} 
            style={{ height: `${height * 0.4}px` }}
          ></div>
        ))}
      </div>

      <div className="ranking-footer">
        <Info size={12} className="footer-info-icon" />
        <span className="ranking-footer-text">How is this calculated?</span>
      </div>
    </div>
  );
}
