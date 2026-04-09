import { Outlet } from 'react-router-dom';
import AuthSidebar from '../components/Sidebar/AuthSidebar';
import StreakCalendar from '../components/Calendar/StreakCalendar';
import StreakIgnites from '../components/Streak/StreakIgnites';
import StreakRanking from '../components/Streak/StreakRanking';
import { Trophy } from 'lucide-react';
import './PracticeLayout.css';

export default function PracticeLayout() {
  return (
    <div className="practice-layout">
      {/* Left: tree navigation sidebar */}
      <AuthSidebar />

      {/* Middle: page content rendered here */}
      <Outlet />

      {/* Right: streak panel — always visible */}
      <aside className="streak-panel">
        <div className="streak-calendar-wrap">
          <StreakCalendar />
        </div>
        <div className="streak-stats-wrap">
          <p className="streak-section-title">Your Stats</p>
          <div className="streak-stat-grid">
            <div className="streak-stat streak-stat--fire">
              <span className="streak-stat-title">Day Streak</span>
              <div className="streak-stat-body">
                <span className="streak-stat-emoji">🔥</span>
                <span className="streak-stat-value">14</span>
              </div>
            </div>
            <div className="streak-stat streak-stat--trophy">
              <span className="streak-stat-title">Best Streak</span>
              <div className="streak-stat-body">
                <Trophy size={16} className="trophy-icon" />
                <span className="streak-stat-value">21</span>
              </div>
            </div>
          </div>

          <StreakIgnites />
          <StreakRanking />
        </div>
      </aside>
    </div>
  );
}
