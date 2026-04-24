import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, Circle, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import ProblemDashboard from '../../components/Dashboard/ProblemDashboard';
import { ALL_PROBLEMS } from '../Practice/PracticePage';
import { ALL_TOPICS, topicToSlug } from '../../components/Topics/TopicChips';
import '../Practice/PracticePage.css';
import './TopicProblemListPage.css';

/* re-use list options */
const LIST_OPTIONS = [
  { id: 'blind75', label: 'Blind 75', icon: '🧠' },
  { id: 'neetcode150', label: 'NeetCode 150', icon: '🚀' },
  { id: 'neetcode250', label: 'NeetCode 250', icon: '🦄' },
  { id: 'neetcodeall', label: 'NeetCode All', icon: '🌐' },
];

const DIFF_FILTERS = ['All', 'Easy', 'Medium', 'Hard'];
const STATUS_FILTERS = ['All', 'Solved', 'Attempted', 'Not Started'];

function StatusIcon({ status }) {
  if (status === 'Solved') return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle size={14} className="status-icon attempted" />;
  return <Circle size={14} className="status-icon not-started" />;
}

/* Convert slug back to display name */
function slugToTopic(slug) {
  const found = ALL_TOPICS.find(t => topicToSlug(t.name) === slug);
  return found ? found.name : slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

export default function TopicProblemListPage() {
  const { topicId } = useParams();
  const navigate = useNavigate();

  const [search, setSearch] = useState('');
  const [diffFilt, setDiffFilt] = useState('All');
  const [statFilt, setStatFilt] = useState('All');
  const [dropOpen, setDropOpen] = useState(false);

  const topicDisplay = slugToTopic(topicId);

  /* Filter problems that have this topic tag */
  const topicProblems = useMemo(() =>
    ALL_PROBLEMS.filter(p =>
      p.topics?.some(t => topicToSlug(t) === topicId)
    ), [topicId]
  );

  const filtered = useMemo(() => topicProblems.filter(p => {
    const srchOk = p.name.toLowerCase().includes(search.toLowerCase());
    const diffOk = diffFilt === 'All' || p.difficulty === diffFilt;
    const statOk = statFilt === 'All' || p.status === statFilt;
    return srchOk && diffOk && statOk;
  }), [topicProblems, search, diffFilt, statFilt]);

  const solved = filtered.filter(p => p.status === 'Solved').length;
  const attempted = filtered.filter(p => p.status === 'Attempted').length;

  return (
    <main className="topic-list-main">

      {/* ── ROW 1: Title + Filters + Dashboard ── */}
      <div className="practice-row1">
        <div className="practice-main-header">
          <h1>{topicDisplay}</h1>
          <p className="practice-main-subtitle">
            <span className="stat-solved">{solved} solved</span>
            {attempted > 0 && <span className="stat-attempted"> · {attempted} attempted</span>}
            <span className="stat-total"> · {filtered.length} total</span>
          </p>

          <div className="practice-filters-stack">
            <div className="filter-group">
              <span className="filter-label">Difficulty</span>
              {DIFF_FILTERS.map(f => (
                <button key={f} className={`filter-chip ${diffFilt === f ? 'filter-chip--active diff--' + f.toLowerCase() : ''}`} onClick={() => setDiffFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              {STATUS_FILTERS.map(f => (
                <button key={f} className={`filter-chip ${statFilt === f ? 'filter-chip--active' : ''}`} onClick={() => setStatFilt(f)}>{f}</button>
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

      {/* ── ROW 2: List Selectors ── */}
      <div className="practice-row2-centered">
        <div className="list-tab-item">
          <button className="list-tab-btn" onClick={() => navigate('/practice/problems/coreskills')}>
            <span className="list-btn-icon">🎯</span>
            <span>Core Skills</span>
          </button>
        </div>

        <div className="list-tab-item active">
          <div className="list-tab-group">
            <button className="list-tab-btn">
              <span className="list-btn-icon">🚀</span>
              <span>NeetCode 150</span>
            </button>
            <button className="list-dropdown-trigger" onClick={e => { e.stopPropagation(); setDropOpen(v => !v); }}>
              <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
          <div className="list-tab-indicator" />
          {dropOpen && (
            <div className="list-dropdown">
              {LIST_OPTIONS.map(opt => (
                <button key={opt.id} className="list-drop-item"
                  onClick={() => { navigate(`/practice/problems/${opt.id}`); setDropOpen(false); }}>
                  <span className="list-drop-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ROW 3 (final): Full-width Problem Table only ── */}
      <div className="topic-problems-table">
        <div className="practice-table-header">
          <span></span><span>Problem</span><span>Difficulty</span><span className="center-header">Solution</span>
        </div>
        <div className="practice-problem-list">
          {filtered.length === 0
            ? <div className="practice-empty">No problems found for "{topicDisplay}".</div>
            : filtered.map(p => (
              <div key={p.id} className="practice-problem-row" onClick={() => navigate(`/problems/${getProblemSlug(p.name)}`)}>
                <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                <span className="problem-name">{p.name}<ChevronRight size={11} className="problem-chevron" /></span>
                <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                <span className="problem-solution centered"><FileText size={14} /></span>
              </div>
            ))
          }
        </div>
      </div>

    </main>
  );
}
