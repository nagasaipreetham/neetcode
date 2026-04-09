import { useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Search, CheckCircle2, Circle, ChevronRight } from 'lucide-react';
import ProblemDashboard from '../../components/Dashboard/ProblemDashboard';
import CompanyTagsPanel from '../../components/Company/CompanyTagsPanel';
import { ALL_PROBLEMS } from '../Practice/PracticePage';
import { slugToCompany } from '../../data/companyData';
import './CompanyPage.css';
import '../Practice/PracticePage.css';
import '../SpecialProblems/SpecialProblemsPage.css';

const DIFF_FILTERS   = ['All', 'Easy', 'Medium', 'Hard'];
const STATUS_FILTERS = ['All', 'Solved', 'Attempted', 'Not Started'];

function StatusIcon({ status }) {
  if (status === 'Solved')    return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle       size={14} className="status-icon attempted" />;
  return                             <Circle       size={14} className="status-icon not-started" />;
}

export default function CompanyPage() {
  const { companyName: companySlug } = useParams();
  const [search,   setSearch]   = useState('');
  const [diffFilt, setDiffFilt] = useState('All');
  const [statFilt, setStatFilt] = useState('All');

  const companyDisplay = companySlug ? slugToCompany(companySlug) : null;

  const companyProblems = useMemo(() =>
    companySlug ? ALL_PROBLEMS : [],
    [companySlug]
  );

  const filtered = useMemo(() =>
    companyProblems.filter(p => {
      const srchOk = p.name.toLowerCase().includes(search.toLowerCase());
      const diffOk = diffFilt === 'All' || p.difficulty === diffFilt;
      const statOk = statFilt === 'All' || p.status    === statFilt;
      return srchOk && diffOk && statOk;
    }),
    [companyProblems, search, diffFilt, statFilt]
  );

  const solved    = filtered.filter(p => p.status === 'Solved').length;
  const attempted = filtered.filter(p => p.status === 'Attempted').length;

  return (
    <main className="company-main">

      {/* ── ROW 1: Left = Tags Panel | Right = [Dashboard on top, Title+Filters on bottom] ── */}
      <div className="company-row1">

        {/* Col 1: Company Tags */}
        <CompanyTagsPanel selectedSlug={companySlug} />

        {/* Col 2: right column stacked vertically */}
        <div className="company-row1-right">

          {/* Top: Dashboard */}
          <ProblemDashboard problems={filtered} />

          {/* Bottom: Title + Stats + Filters */}
          <div className="company-header-bottom">
            <div className="company-title-row">
              <h1>{companyDisplay ?? 'Company Tagged'}</h1>
              {companyDisplay && (
                <p className="practice-main-subtitle">
                  <span className="stat-solved">{solved} solved</span>
                  {attempted > 0 && <span className="stat-attempted"> · {attempted} attempted</span>}
                  <span className="stat-total"> · {filtered.length} total</span>
                </p>
              )}
            </div>

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
        </div>
      </div>

      {/* ── Landing ── */}
      {!companySlug && (
        <div className="company-landing">
          <div className="company-landing-icon">🏢</div>
          <h2>Select a Company</h2>
          <p>Choose a company from the panel to see their most frequently asked interview questions.</p>
        </div>
      )}

      {/* ── Problems ── */}
      {companySlug && (
        <>
          <div className="company-interview-heading">
            {companyDisplay} Interview Questions
          </div>
          <div className="topic-problems-table">
            <div className="special-table-header">
              <span></span><span>Problem</span><span>Difficulty</span>
            </div>
            <div className="practice-problem-list">
              {filtered.length === 0
                ? <div className="practice-empty">No problems found.</div>
                : filtered.map(p => (
                    <div key={p.id} className="practice-problem-row special-problem-row">
                      <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                      <span className="problem-name">{p.name}<ChevronRight size={11} className="problem-chevron" /></span>
                      <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    </div>
                  ))
              }
            </div>
          </div>
        </>
      )}
    </main>
  );
}
