import './ProblemDashboard.css';

/* polarToCartesian: converts angle (0=top, clockwise) to SVG x,y */
function pt(cx, cy, r, deg) {
  const rad = ((deg - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arcPath(cx, cy, r, startDeg, endDeg) {
  const [x1, y1] = pt(cx, cy, r, startDeg);
  const [x2, y2] = pt(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

/*  Single-track horseshoe arc:
    Starts at 140° (bottom-left), sweeps 260° clockwise to 400° (=40°, bottom-right)
    Divided into Easy | Med | Hard segments proportionally                          */
export default function ProblemDashboard({ problems = [] }) {
  const cx = 54, cy = 58, r = 44, sw = 9;
  const START = 140, SWEEP = 260;
  const END = START + SWEEP;

  const easy   = { solved: problems.filter(p => p.difficulty==='Easy'   && p.status==='Solved').length, total: problems.filter(p => p.difficulty==='Easy').length   };
  const medium = { solved: problems.filter(p => p.difficulty==='Medium' && p.status==='Solved').length, total: problems.filter(p => p.difficulty==='Medium').length };
  const hard   = { solved: problems.filter(p => p.difficulty==='Hard'   && p.status==='Solved').length, total: problems.filter(p => p.difficulty==='Hard').length   };
  const total  = easy.total + medium.total + hard.total || 1;
  const totalSolved = easy.solved + medium.solved + hard.solved;

  /* Angle spans per difficulty */
  const easySpan = (easy.total   / total) * SWEEP;
  const medSpan  = (medium.total / total) * SWEEP;
  const hardSpan = (hard.total   / total) * SWEEP;

  const medStart  = START + easySpan;
  const hardStart = medStart + medSpan;

  /* Solved spans */
  const easySolved = easy.total   > 0 ? (easy.solved   / easy.total)   * easySpan : 0;
  const medSolved  = medium.total > 0 ? (medium.solved / medium.total) * medSpan  : 0;
  const hardSolved = hard.total   > 0 ? (hard.solved   / hard.total)   * hardSpan : 0;

  /* Marker dots at segment boundaries */
  const medPt  = pt(cx, cy, r, medStart);
  const hardPt = pt(cx, cy, r, hardStart);

  return (
    <div className="prob-dash">
      {/* Left: counts */}
      <div className="prob-breakdown">
        {[['Easy', easy, '#22c55e'], ['Med', medium, '#f59e0b'], ['Hard', hard, '#ef4444']].map(([lbl, s, c]) => (
          <div key={lbl} className="prob-row">
            <span className="prob-lbl" style={{ color: c }}>{lbl}</span>
            <span className="prob-cnt">{s.solved}/{s.total}</span>
          </div>
        ))}
      </div>

      {/* Right: arc chart */}
      <div className="prob-chart-wrap">
        <svg width="118" height="108" viewBox="0 0 118 108">
          {/* Background track */}
          <path d={arcPath(cx,cy,r,START,END)} fill="none" stroke="var(--auth-hover-bg)"
            strokeWidth={sw} strokeLinecap="round" />

          {/* Easy segment track (dim green) */}
          <path d={arcPath(cx,cy,r,START,START+easySpan)} fill="none" stroke="rgba(34,197,94,0.2)"
            strokeWidth={sw} strokeLinecap="butt" />
          {/* Easy solved (bright green) */}
          {easySolved > 0.5 && (
            <path d={arcPath(cx,cy,r,START,START+easySolved)} fill="none" stroke="#22c55e"
              strokeWidth={sw} strokeLinecap="round" />
          )}

          {/* Med segment track (dim amber) */}
          <path d={arcPath(cx,cy,r,medStart,medStart+medSpan)} fill="none" stroke="rgba(245,158,11,0.2)"
            strokeWidth={sw} strokeLinecap="butt" />
          {/* Med solved */}
          {medSolved > 0.5 && (
            <path d={arcPath(cx,cy,r,medStart,medStart+medSolved)} fill="none" stroke="#f59e0b"
              strokeWidth={sw} strokeLinecap="round" />
          )}

          {/* Hard segment track (dim red) */}
          <path d={arcPath(cx,cy,r,hardStart,END)} fill="none" stroke="rgba(239,68,68,0.2)"
            strokeWidth={sw} strokeLinecap="butt" />
          {/* Hard solved */}
          {hardSolved > 0.5 && (
            <path d={arcPath(cx,cy,r,hardStart,hardStart+hardSolved)} fill="none" stroke="#ef4444"
              strokeWidth={sw} strokeLinecap="round" />
          )}

          {/* Boundary marker dots */}
          <circle cx={medPt[0]}  cy={medPt[1]}  r={5} fill="#f59e0b" />
          <circle cx={hardPt[0]} cy={hardPt[1]} r={5} fill="#ef4444" />
        </svg>

        {/* Center text */}
        <div className="prob-center">
          <span className="prob-total">
            {totalSolved}<span className="prob-denom">/{easy.total+medium.total+hard.total}</span>
          </span>
          <span className="prob-sub">Solved</span>
        </div>
      </div>
    </div>
  );
}
