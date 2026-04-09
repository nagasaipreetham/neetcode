import { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import ProblemDashboard from '../../components/Dashboard/ProblemDashboard';
import './SpecialProblemsPage.css';
import '../Practice/PracticePage.css';

const DIFF_FILTERS   = ['All', 'Easy', 'Medium', 'Hard'];
const STATUS_FILTERS = ['All', 'Solved', 'Attempted', 'Not Started'];

function StatusIcon({ status }) {
  if (status === 'Solved')    return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle       size={14} className="status-icon attempted" />;
  return                             <Circle       size={14} className="status-icon not-started" />;
}

/**
 * Reusable page for System Design / Low Level Design / Databases.
 *
 * Props:
 *   title    — h1 text (e.g. "System Design")
 *   heading  — centred section label (e.g. "Interview Questions")  
 *   problems — array of { id, name, difficulty, status }
 *   showSolution — always false for these pages
 */
export default function SpecialProblemsPage({ title, heading, problems = [] }) {
  const [search,   setSearch]   = useState('');
  const [diffFilt, setDiffFilt] = useState('All');
  const [statFilt, setStatFilt] = useState('All');

  const filtered = useMemo(() =>
    problems.filter(p => {
      const srchOk = p.name.toLowerCase().includes(search.toLowerCase());
      const diffOk = diffFilt === 'All' || p.difficulty === diffFilt;
      const statOk = statFilt === 'All' || p.status    === statFilt;
      return srchOk && diffOk && statOk;
    }),
    [problems, search, diffFilt, statFilt]
  );

  const solved    = filtered.filter(p => p.status === 'Solved').length;
  const attempted = filtered.filter(p => p.status === 'Attempted').length;

  return (
    <main className="practice-main">

      {/* ── ROW 1: Title/Filters | Dashboard ── */}
      <div className="practice-row1">
        <div className="practice-main-header">
          <h1>{title}</h1>
          <p className="practice-main-subtitle">
            <span className="stat-solved">{solved} solved</span>
            {attempted > 0 && <span className="stat-attempted"> · {attempted} attempted</span>}
            <span className="stat-total"> · {filtered.length} total</span>
          </p>

          <div className="practice-filters-stack">
            <div className="filter-group">
              <span className="filter-label">Difficulty</span>
              {DIFF_FILTERS.map(f => (
                <button key={f}
                  className={`filter-chip ${diffFilt === f ? 'filter-chip--active diff--' + f.toLowerCase() : ''}`}
                  onClick={() => setDiffFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              {STATUS_FILTERS.map(f => (
                <button key={f}
                  className={`filter-chip ${statFilt === f ? 'filter-chip--active' : ''}`}
                  onClick={() => setStatFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="practice-search-bar">
              <Search size={13} className="search-icon" />
              <input type="text" placeholder="Search…" value={search}
                onChange={e => setSearch(e.target.value)} className="practice-search-input" />
            </div>
          </div>
        </div>

        <ProblemDashboard problems={filtered} />
      </div>

      {/* ── Section heading (centred) ── */}
      <div className="special-page-heading">{heading}</div>

      {/* ── Full-width Problems Table (no topics, no solution column) ── */}
      <div className="topic-problems-table">
        <div className="special-table-header">
          <span></span>
          <span>Problem</span>
          <span>Difficulty</span>
        </div>

        <div className="practice-problem-list">
          {filtered.length === 0
            ? <div className="practice-empty">No problems match your filters.</div>
            : filtered.map(p => (
                <div key={p.id} className="practice-problem-row special-problem-row">
                  <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                  <span className="problem-name">
                    {p.name}<ChevronRight size={11} className="problem-chevron" />
                  </span>
                  <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>
                    {p.difficulty}
                  </span>
                </div>
              ))
          }
        </div>
      </div>
    </main>
  );
}
