import React from 'react';
import { X, Plus, Layout } from 'lucide-react';

export default function TestcasePanel({
  activeTab,
  setActiveTab,
  testCases,
  activeTestCase,
  setActiveTestCase,
  handleRemoveTestCase,
  handleAddTestCase,
  localTestCase,
  setLocalTestCase,
  handleNumsBlur,
  handleTargetBlur,
  sampleTestResult,
  isLayoutSplit,
  onToggleLayout
}) {
  const renderContent = () => {
    switch (activeTab) {
      case 'testcase':
        return (
          <div className="testcase-content">
            <div className="test-case-selector">
              {testCases.map((tc) => (
                <button
                  key={tc.id}
                  className={`test-case-btn ${activeTestCase === tc.id ? 'active' : ''}`}
                  onClick={() => setActiveTestCase(tc.id)}
                >
                  <span>Case {tc.id}</span>
                  {testCases.length > 1 && (
                    <X
                      size={14}
                      className="remove-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTestCase(tc.id);
                      }}
                    />
                  )}
                </button>
              ))}
              {testCases.length < 4 && (
                <button
                  className="add-test-case-btn"
                  onClick={handleAddTestCase}
                >
                  <Plus size={16} />
                </button>
              )}
            </div>

            <div className="test-input-group">
              <label className="test-input-label">nums =</label>
              <input
                type="text"
                className="test-input-field"
                value={localTestCase.nums}
                onChange={(e) => setLocalTestCase(prev => ({ ...prev, nums: e.target.value }))}
                onBlur={handleNumsBlur}
              />
            </div>
            <div className="test-input-group">
              <label className="test-input-label">target =</label>
              <input
                type="text"
                className="test-input-field"
                value={localTestCase.target}
                onChange={(e) => setLocalTestCase(prev => ({ ...prev, target: e.target.value }))}
                onBlur={handleTargetBlur}
              />
            </div>
          </div>
        );

      case 'result':
        return (
          <div className="test-result-content">
            <div className={`result-status ${sampleTestResult.status}`}>
              <span className="status-icon">{sampleTestResult.status === 'passed' ? '✓' : '✗'}</span>
              <span className="status-text">{sampleTestResult.status === 'passed' ? 'Accepted' : 'Failed'}</span>
            </div>

            <div className="result-section">
              <h4 className="result-section-title">Input</h4>
              <div className="result-code-block">
                <p>nums = [{sampleTestResult.input.nums.join(', ')}]</p>
                <p>target = {sampleTestResult.input.target}</p>
              </div>
            </div>

            <div className="result-section">
              <h4 className="result-section-title">Output</h4>
              <div className="result-code-block">
                <p>[{sampleTestResult.output.join(', ')}]</p>
              </div>
            </div>

            <div className="result-section">
              <h4 className="result-section-title">Expected</h4>
              <div className="result-code-block">
                <p>[{sampleTestResult.expected.join(', ')}]</p>
              </div>
            </div>

            <div className="result-metrics">
              <div className="metric-item">
                <span className="metric-label">Runtime:</span>
                <span className="metric-value">{sampleTestResult.runtime}</span>
              </div>
              <div className="metric-item">
                <span className="metric-label">Memory:</span>
                <span className="metric-value">{sampleTestResult.memory}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="problem-section right-panel" style={{ width: '100%' }}>
      <div className="pane-header testcase-header">
        <div className="testcase-tabs">
          <button
            className={`tab ${activeTab === 'testcase' ? 'active' : ''}`}
            onClick={() => setActiveTab('testcase')}
          >
            <span>Testcase</span>
          </button>
          <div className="tab-divider" />
          <button
            className={`tab ${activeTab === 'result' ? 'active' : ''}`}
            onClick={() => setActiveTab('result')}
          >
            <span>Test Result</span>
          </button>
        </div>

        <button
          className="icon-btn-ghost layout-toggle-btn"
          onClick={onToggleLayout}
          title="Change layout"
        >
          <Layout size={16} />
        </button>
      </div>
      <div className="pane-content">
        {renderContent()}
      </div>
    </section>
  );
}

