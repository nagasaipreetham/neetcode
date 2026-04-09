import { useState, useMemo } from 'react';
import { Search, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import ProblemDashboard from '../../components/Dashboard/ProblemDashboard';
import { ML_TOPICS, ALL_ML_PROBLEMS } from '../../data/mlData';
import '../Practice/PracticePage.css';
import '../SpecialProblems/SpecialProblemsPage.css';

const DIFF_FILTERS   = ['All', 'Easy', 'Medium', 'Hard'];
const STATUS_FILTERS = ['All', 'Solved', 'Attempted', 'Not Started'];

function StatusIcon({ status }) {
  if (status === 'Solved')    return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle       size={14} className="status-icon attempted" />;
  return                             <Circle       size={14} className="status-icon not-started" />;
}

export default function MachineLearningPage() {
  const [activeTopic, setActiveTopic] = useState('All');
  const [search,   setSearch]   = useState('');
  const [diffFilt, setDiffFilt] = useState('All');
  const [statFilt, setStatFilt] = useState('All');

  const filtered = useMemo(() => {
    let base = ALL_ML_PROBLEMS;
    if (activeTopic !== 'All') {
      const topicObj = ML_TOPICS.find(t => t.name === activeTopic);
      base = topicObj ? topicObj.problems : [];
    }
    
    return base.filter(p => {
      const srchOk = p.name.toLowerCase().includes(search.toLowerCase());
      const diffOk = diffFilt === 'All' || p.difficulty === diffFilt;
      const statOk = statFilt === 'All' || p.status    === statFilt;
      return srchOk && diffOk && statOk;
    });
  }, [activeTopic, search, diffFilt, statFilt]);

  const solved    = filtered.filter(p => p.status === 'Solved').length;
  const attempted = filtered.filter(p => p.status === 'Attempted').length;

  return (
    <main className="practice-main">

      {/* ── ROW 1: Left (Title + Filters) | Right (Dashboard) ── */}
      <div className="practice-row1">
        <div className="practice-main-header">
          <h1>Machine Learning</h1>
          <p className="practice-main-subtitle">
            <span className="stat-solved">{solved} solved</span>
            {attempted > 0 && <span className="stat-attempted"> · {attempted} attempted</span>}
            <span className="stat-total"> · {filtered.length} total</span>
          </p>

          <div className="practice-filters-stack">
            <div className="filter-group">
              <span className="filter-label">Difficulty</span>
              {DIFF_FILTERS.map(f => (
                <button key={f} className={`filter-chip ${diffFilt===f ? 'filter-chip--active diff--'+f.toLowerCase() : ''}`} onClick={() => setDiffFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              {STATUS_FILTERS.map(f => (
                <button key={f} className={`filter-chip ${statFilt===f ? 'filter-chip--active' : ''}`} onClick={() => setStatFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="practice-search-bar">
              <Search size={13} className="search-icon" />
              <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="practice-search-input" />
            </div>
          </div>
        </div>

        <ProblemDashboard problems={filtered} />
      </div>

      {/* ── ROW 2: Categories | Problems table ── */}
      <div className="practice-body-split" style={{ marginTop: '1rem' }}>

        {/* Topics column */}
        <div className="practice-categories-col">
          <p className="practice-col-label">Topics</p>
          <ul className="practice-cat-list">
            <li className={`practice-cat-item ${activeTopic === 'All' ? 'active' : ''}`} onClick={() => setActiveTopic('All')}>
              <div className="cat-item-top">
                <span className="cat-item-name">All Problems</span>
                <span className="cat-item-count">0/{ALL_ML_PROBLEMS.length}</span>
              </div>
              <div className="cat-item-bar"><div className="cat-item-bar-fill" style={{ width: `0%` }} /></div>
            </li>
            {ML_TOPICS.map(topic => {
              const pct = Math.round((topic.solved / topic.total) * 100);
              const isActive = activeTopic === topic.name;
              return (
                <li key={topic.name} className={`practice-cat-item ${isActive ? 'active' : ''}`} onClick={() => setActiveTopic(topic.name)}>
                  <div className="cat-item-top">
                    <span className="cat-item-name">{topic.name}</span>
                    <span className="cat-item-count">{topic.solved}/{topic.total}</span>
                  </div>
                  <div className="cat-item-bar"><div className="cat-item-bar-fill" style={{ width: `${pct}%` }} /></div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Problems column - No Solution Column */}
        <div className="practice-problems-col">
          <div className="special-table-header">
            <span></span><span>Problem</span><span>Difficulty</span>
          </div>
          <div className="practice-problem-list">
            {filtered.length === 0
              ? <div className="practice-empty">No problems match your filters.</div>
              : filtered.map(p => (
                  <div key={p.id} className="practice-problem-row special-problem-row">
                    <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                    <span className="problem-name">{p.name}<ChevronRight size={11} className="problem-chevron"/></span>
                    <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>

    </main>
  );
}
