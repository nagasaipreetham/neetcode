import React from 'react';
import { FileText, Lightbulb, Users, Clock, ChevronRight } from 'lucide-react';

export default function LeftPanel({
  activeTab,
  setActiveTab,
  problemData,
  expandedSections,
  toggleSection
}) {
  const renderContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="description-content">
            <div className="problem-header">
              <h1 className="problem-title">{problemData.title}</h1>
              <div className="problem-meta">
                <span className={`difficulty-tag ${problemData.difficulty.toLowerCase()}`}>
                  {problemData.difficulty}
                </span>
                <div className="topic-tags">
                  {problemData.tags.map((tag, index) => (
                    <span key={index} className="topic-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="problem-section-content">
              <p className="problem-statement">{problemData.statement}</p>
            </div>

            <div className="problem-section-content">
              <h3 className="section-title">Examples</h3>
              {problemData.examples.map((example, index) => (
                <div key={index} className="example-block">
                  <p className="example-label">Example {index + 1}:</p>
                  <div className="example-content">
                    <p><strong>Input:</strong> {example.input}</p>
                    <p><strong>Output:</strong> {example.output}</p>
                    {example.explanation && (
                      <p><strong>Explanation:</strong> {example.explanation}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="problem-section-content">
              <h3 className="section-title">Constraints</h3>
              <ul className="constraints-list">
                {problemData.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>

            <div className="collapsible-sections">
              {['hint1', 'hint2', 'hint3'].map((hint, idx) => (
                <div key={hint} className="collapsible-section">
                  <button
                    className="collapsible-header"
                    onClick={() => toggleSection(hint)}
                  >
                    <ChevronRight
                      size={16}
                      className={`chevron-icon ${expandedSections[hint] ? 'expanded' : ''}`}
                    />
                    <span>Hint {idx + 1}</span>
                  </button>
                  {expandedSections[hint] && (
                    <div className="collapsible-content">
                      <p>{problemData.hints[idx]}</p>
                    </div>
                  )}
                </div>
              ))}

              <div className="collapsible-section">
                <button
                  className="collapsible-header company-tags-header"
                  onClick={() => toggleSection('companyTags')}
                >
                  <ChevronRight
                    size={16}
                    className={`chevron-icon ${expandedSections.companyTags ? 'expanded' : ''}`}
                  />
                  <span>Company Tags</span>
                </button>
                {expandedSections.companyTags && (
                  <div className="collapsible-content">
                    <div className="company-tags-list">
                      {problemData.companyTags.map((company, index) => (
                        <span key={index} className="company-tag">{company}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 'editorial':
        return (
          <div className="placeholder-content">
            <h3>Discuss</h3>
            <p>Community discussions will be available here.</p>
          </div>
        );

      case 'solutions':
        return (
          <div className="placeholder-content">
            <h3>Solutions</h3>
            <p>Official and community solutions will be displayed here.</p>
          </div>
        );

      case 'submissions':
        return (
          <div className="placeholder-content">
            <h3>Submissions</h3>
            <p>Your submission history will appear here.</p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="problem-section left-panel" style={{ width: '100%' }}>
      <div className="pane-header">
        <button
          className={`tab ${activeTab === 'description' ? 'active' : ''}`}
          onClick={() => setActiveTab('description')}
        >
          <FileText size={16} />
          <span>Description</span>
        </button>
        <div className="tab-divider" />
        <button
          className={`tab ${activeTab === 'editorial' ? 'active' : ''}`}
          onClick={() => setActiveTab('editorial')}
        >
          <Users size={16} />
          <span>Discuss</span>
        </button>
        <div className="tab-divider" />
        <button
          className={`tab ${activeTab === 'solutions' ? 'active' : ''}`}
          onClick={() => setActiveTab('solutions')}
        >
          <Lightbulb size={16} />
          <span>Solutions</span>
        </button>
        <div className="tab-divider" />
        <button
          className={`tab ${activeTab === 'submissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('submissions')}
        >
          <Clock size={16} />
          <span>Submissions</span>
        </button>
      </div>
      <div className="pane-content">
        {renderContent()}
      </div>
    </section>
  );
}
