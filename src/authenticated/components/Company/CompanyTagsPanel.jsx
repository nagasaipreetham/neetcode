import { useState, useMemo, useLayoutEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPANIES, companyToSlug } from '../../data/companyData';
import './CompanyTagsPanel.css';

const PANEL_HEIGHT = 200; // px — fixed visible window height

export default function CompanyTagsPanel({ selectedSlug }) {
  const navigate   = useNavigate();
  const innerRef   = useRef(null);

  const [query,      setQuery]      = useState('');
  const [page,       setPage]       = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const filteredCompanies = useMemo(() =>
    query.trim()
      ? COMPANIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
      : COMPANIES,
    [query]
  );

  // After layout, measure total chip-area height → determine page count
  useLayoutEffect(() => {
    if (!innerRef.current) return;
    const totalHeight = innerRef.current.scrollHeight;
    const pages = Math.max(1, Math.ceil(totalHeight / PANEL_HEIGHT));
    setTotalPages(pages);
    setPage(0); // reset to page 1 whenever filtered set changes
  }, [filteredCompanies]);

  const onSearch = v => setQuery(v);
  const goPrev   = () => setPage(p => Math.max(0, p - 1));
  const goNext   = () => setPage(p => Math.min(totalPages - 1, p + 1));

  // Slide the inner wrapper up by page × PANEL_HEIGHT
  const translateY = page * -PANEL_HEIGHT;

  return (
    <div className="company-tags-panel">
      {/* Search */}
      <div className="company-search-bar">
        <Search size={12} className="company-search-icon" />
        <input
          type="text"
          placeholder="Search companies…"
          value={query}
          onChange={e => onSearch(e.target.value)}
          className="company-search-input"
        />
      </div>

      {/* Header */}
      <div className="company-panel-header">
        <span className="company-panel-title">TOP COMPANIES</span>
        <div className="company-panel-nav">
          <button className="company-nav-btn" onClick={goPrev} disabled={page === 0} title="Previous">
            <ChevronLeft size={13} />
          </button>
          <span className="company-nav-page">{page + 1}/{totalPages}</span>
          <button className="company-nav-btn" onClick={goNext} disabled={page >= totalPages - 1} title="Next">
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* Chips — slide window */}
      <div className="company-chips-container">
        <div
          ref={innerRef}
          className="company-chips-inner"
          style={{ transform: `translateY(${translateY}px)` }}
        >
          {filteredCompanies.length === 0
            ? <p className="company-no-results">No companies found.</p>
            : filteredCompanies.map(company => {
                const slug     = companyToSlug(company.name);
                const isActive = selectedSlug === slug;
                return (
                  <button
                    key={company.name}
                    className={`company-chip ${isActive ? 'active' : ''}`}
                    onClick={() => navigate(`/practice/company/${slug}`)}
                  >
                    <span className="chip-label">{company.name}</span>
                    <span className="chip-count">{company.count}</span>
                  </button>
                );
              })
          }
        </div>
      </div>

      {/* Frequency note */}
      <div className="company-freq-note">
        Problems are sorted by how frequently they appear in interviews.
      </div>
    </div>
  );
}
