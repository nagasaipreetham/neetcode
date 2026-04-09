import { useState, useMemo, useLayoutEffect, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { COMPANIES, companyToSlug } from '../../data/companyData';
import './CompanyTagsPanel.css';

export default function CompanyTagsPanel({ selectedSlug }) {
  const navigate   = useNavigate();
  const innerRef   = useRef(null);
  const containerRef = useRef(null);

  const [query,      setQuery]      = useState('');
  const [page,       setPage]       = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [pages,      setPages]      = useState([]);

  const filteredCompanies = useMemo(() =>
    query.trim()
      ? COMPANIES.filter(c => c.name.toLowerCase().includes(query.toLowerCase()))
      : COMPANIES,
    [query]
  );

  // Calculate pages based on actual container height
  useLayoutEffect(() => {
    const calculatePages = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = containerRef.current.offsetHeight;
      
      if (containerHeight === 0 || containerWidth === 0) return;
      
      // Create temporary container to measure chip layout
      const tempContainer = document.createElement('div');
      tempContainer.style.cssText = `
        position: absolute;
        visibility: hidden;
        width: ${containerWidth}px;
        display: flex;
        flex-wrap: wrap;
        gap: 5px;
        align-content: flex-start;
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      `;
      document.body.appendChild(tempContainer);
      
      const pagesArray = [];
      let currentPage = [];
      
      // Reduce available height by 20px to prevent cropping (more aggressive)
      const safeHeight = containerHeight - 20;
      
      filteredCompanies.forEach((company) => {
        // Create a chip element to measure
        const chip = document.createElement('button');
        chip.style.cssText = `
          display: inline-flex;
          align-items: center;
          gap: 0.35rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.78rem;
          font-weight: 500;
          white-space: nowrap;
          border: 1px solid transparent;
          border-radius: 8px;
          margin: 0;
          box-sizing: border-box;
          height: 28px;
        `;
        
        // Add label and count
        const label = document.createElement('span');
        label.textContent = company.name;
        label.style.fontSize = '0.78rem';
        
        const count = document.createElement('span');
        count.textContent = company.count;
        count.style.cssText = 'font-size: 0.64rem; padding: 1px 5px; border-radius: 9999px;';
        
        chip.appendChild(label);
        chip.appendChild(count);
        tempContainer.appendChild(chip);
        
        // Get the actual height after adding the chip
        const tempHeight = tempContainer.scrollHeight;
        
        // If this would overflow, start a new page
        if (tempHeight > safeHeight && currentPage.length > 0) {
          // Start new page
          pagesArray.push([...currentPage]);
          currentPage = [company];
          
          // Clear and add only the new chip
          tempContainer.innerHTML = '';
          const newChip = chip.cloneNode(true);
          tempContainer.appendChild(newChip);
        } else {
          currentPage.push(company);
        }
      });
      
      // Add the last page if it has items
      if (currentPage.length > 0) {
        pagesArray.push(currentPage);
      }
      
      document.body.removeChild(tempContainer);
      
      setPages(pagesArray.length > 0 ? pagesArray : [[]]);
      setTotalPages(Math.max(1, pagesArray.length));
      setPage(0);
    };

    // Delay to ensure container is fully rendered
    const timer = setTimeout(calculatePages, 150);
    
    // Recalculate on window resize
    window.addEventListener('resize', calculatePages);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', calculatePages);
    };
  }, [filteredCompanies]);

  const onSearch = v => setQuery(v);
  const goPrev   = () => setPage(p => Math.max(0, p - 1));
  const goNext   = () => setPage(p => Math.min(totalPages - 1, p + 1));

  // Slide the inner wrapper horizontally by page × 100%
  const translateX = page * -100;

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
      <div className="company-chips-container" ref={containerRef}>
        <div
          ref={innerRef}
          className="company-chips-pages-wrapper"
          style={{ transform: `translateX(${translateX}%)` }}
        >
          {filteredCompanies.length === 0 ? (
            <div className="company-chips-page">
              <p className="company-no-results">No companies found.</p>
            </div>
          ) : (
            pages.map((pageCompanies, pageIndex) => (
              <div key={pageIndex} className="company-chips-page">
                {pageCompanies.map(company => {
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
                })}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Frequency note */}
      <div className="company-freq-note">
        Problems are sorted by how frequently they appear in interviews.
      </div>
    </div>
  );
}
