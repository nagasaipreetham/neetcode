import './ProblemDashboard.css';

/**
 * polarToCartesian
 * Converts angle (0 = top, degrees clockwise) to (x, y) coordinates.
 */
function polarToCartesian(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

/**
 * arcPath
 * Generates an SVG path for an arc.
 */
function arcPath(cx, cy, r, startDeg, endDeg) {
  const [x1, y1] = polarToCartesian(cx, cy, r, startDeg);
  const [x2, y2] = polarToCartesian(cx, cy, r, endDeg);
  const large = (endDeg - startDeg) % 360 > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/**
 * ProblemDashboard
 * Recreated as a 3-segment progress circle with proportional lengths and gaps.
 */
export default function ProblemDashboard({ problems = [] }) {
  // Dimensions
  const cx = 70, cy = 70, r = 55, sw = 6;
  const GAP = 12; // degrees between segments

  // Stats pool
  const easy = { solved: problems.filter(p => p.difficulty === 'Easy' && p.status === 'Solved').length, total: problems.filter(p => p.difficulty === 'Easy').length };
  const medium = { solved: problems.filter(p => p.difficulty === 'Medium' && p.status === 'Solved').length, total: problems.filter(p => p.difficulty === 'Medium').length };
  const hard = { solved: problems.filter(p => p.difficulty === 'Hard' && p.status === 'Solved').length, total: problems.filter(p => p.difficulty === 'Hard').length };
  
  const totalPool = easy.total + medium.total + hard.total || 1;
  const totalSolved = easy.solved + medium.solved + hard.solved;

  // Calculate available sweep (360 - 3 * GAP)
  const availableSweep = 285 - (3 * GAP);

  // Proportional spans for the TOTAL tracks
  const easySpan = (easy.total / totalPool) * availableSweep;
  const medSpan  = (medium.total / totalPool) * availableSweep;
  const hardSpan = (hard.total / totalPool) * availableSweep;

  // Starting positions (starting from top: 0 degrees)
  const easyStart = 0;
  const medStart  = easyStart + easySpan + GAP;
  const hardStart = medStart + medSpan + GAP;

  // Progress spans within each track
  const easyProgress = easy.total > 0 ? (easy.solved / easy.total) * easySpan : 0;
  const medProgress  = medium.total > 0 ? (medium.solved / medium.total) * medSpan : 0;
  const hardProgress = hard.total > 0 ? (hard.solved / hard.total) * hardSpan : 0;

  return (
    <div className="dashboard-container">
      {/* Counts Column */}
      <div className="dashboard-stats">
        {[
          { label: 'Easy', s: easy,   color: '#22c55e' },
          { label: 'Med',  s: medium, color: '#f59e0b' },
          { label: 'Hard', s: hard,   color: '#ef4444' }
        ].map(({ label, s, color }) => (
          <div key={label} className="stat-item">
            <span className="stat-label" style={{ color }}>{label}</span>
            <span className="stat-value">
              <span className="stat-solved-count">{s.solved}</span>
              <span className="stat-total-count">/{s.total}</span>
            </span>
          </div>
        ))}
      </div>

      {/* Circle Chart Column */}
      <div className="dashboard-arc-wrapper">
        <svg width="150" height="150" viewBox="0 0 140 140" className="dashboard-svg">
          {/* TRACKS (Background) */}
          <path d={arcPath(cx, cy, r, easyStart, easyStart + easySpan)} fill="none" stroke="rgba(34,197,94,0.12)" strokeWidth={sw} strokeLinecap="round" />
          <path d={arcPath(cx, cy, r, medStart, medStart + medSpan)} fill="none" stroke="rgba(245,158,11,0.12)" strokeWidth={sw} strokeLinecap="round" />
          <path d={arcPath(cx, cy, r, hardStart, hardStart + hardSpan)} fill="none" stroke="rgba(239,68,68,0.12)" strokeWidth={sw} strokeLinecap="round" />

          {/* PROGRESS (Foreground) */}
          {easyProgress > 0 && (
            <path d={arcPath(cx, cy, r, easyStart, easyStart + easyProgress)} fill="none" stroke="#22c55e" strokeWidth={sw} strokeLinecap="round" />
          )}
          {medProgress > 0 && (
            <path d={arcPath(cx, cy, r, medStart, medStart + medProgress)} fill="none" stroke="#f59e0b" strokeWidth={sw} strokeLinecap="round" />
          )}
          {hardProgress > 0 && (
            <path d={arcPath(cx, cy, r, hardStart, hardStart + hardProgress)} fill="none" stroke="#ef4444" strokeWidth={sw} strokeLinecap="round" />
          )}
        </svg>

        {/* Central Counter Display */}
        <div className="dashboard-center-text">
          <div className="center-solved">{totalSolved}</div>
          <div className="center-divider"></div>
          <div className="center-total">{totalPool}</div>
          <div className="center-label">Solved</div>
        </div>
      </div>
    </div>
  );
}
