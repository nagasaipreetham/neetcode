import { useState, useEffect, useRef } from 'react';
import { FileText, Lightbulb, Users, Clock, RotateCcw, Settings, X, Plus, ChevronRight } from 'lucide-react';
import Editor from '@monaco-editor/react';
import ProblemNav from '../../components/ProblemNav/ProblemNav';
import { useTheme } from '../../AuthLayout';
import './ProblemSolvePage.css';

export default function ProblemSolvePage() {
  const { theme, toggleTheme } = useTheme();
  const containerRef = useRef(null);

  // Panel width state (percentages) - Requirements 9.1, 9.2, 9.3
  const [leftWidth, setLeftWidth] = useState(35);
  const [middleWidth, setMiddleWidth] = useState(40);
  const [rightWidth, setRightWidth] = useState(25);

  // Tab navigation state - Requirements 2.1, 2.2, 4.1, 4.2
  const [leftActiveTab, setLeftActiveTab] = useState('description');
  const [rightActiveTab, setRightActiveTab] = useState('testcase');

  // Drag state - Requirements 9.4, 13.1
  const [isDragging, setIsDragging] = useState(false);
  const [activeHandle, setActiveHandle] = useState(null); // 'left' | 'right' | null

  // Editor state - Task 7.3, 7.4, 8.1 - Requirements 3.2, 3.3, 3.4, 3.5
  const [language, setLanguage] = useState('python3');
  const [code, setCode] = useState('');

  // Test case management state
  const [testCases, setTestCases] = useState([
    { id: 1, nums: [2, 7, 11, 15], target: 9 }
  ]);
  const [activeTestCase, setActiveTestCase] = useState(1);

  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState({
    hint1: false,
    hint2: false,
    hint3: false,
    companyTags: false
  });

  // Default code templates for each language - Task 7.4
  const defaultCodeTemplates = {
    python3: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    pass`,
    java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
    cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
    javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};`
  };

  // Initialize code with default template - Task 8.1
  useEffect(() => {
    setCode(defaultCodeTemplates[language]);
  }, [language]);

  // Resize handlers - Requirements 5.4, 5.5, 5.6, 6.1-6.5, 8.2, 8.3, 13.1-13.5
  
  // Task 2.2: mousedown handler - attach listeners, prevent text selection
  const handleResizeStart = (e, handle) => {
    e.preventDefault();
    setIsDragging(true);
    setActiveHandle(handle);
    
    // Prevent text selection during drag - Requirement 8.2
    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'col-resize';
  };

  // Task 2.3: mousemove handler - calculate widths with constraints
  const handleMouseMove = (e) => {
    if (!isDragging || !activeHandle || !containerRef.current) return;
    
    const container = containerRef.current;
    const containerRect = container.getBoundingClientRect();
    const containerWidth = containerRect.width;
    const mouseX = e.clientX - containerRect.left;
    const mousePercent = (mouseX / containerWidth) * 100;
    
    // Minimum width constraints - Requirements 6.1, 6.2, 6.3
    const MIN_LEFT = 20;
    const MIN_MIDDLE = 30;
    const MIN_RIGHT = 20;
    
    if (activeHandle === 'left') {
      // Resizing between left and middle panels - Requirement 13.4
      const newLeftWidth = Math.max(MIN_LEFT, Math.min(80, mousePercent));
      const remainingWidth = 100 - newLeftWidth;
      
      // Distribute remaining width proportionally between middle and right
      const middleRatio = middleWidth / (middleWidth + rightWidth);
      let newMiddleWidth = remainingWidth * middleRatio;
      let newRightWidth = remainingWidth - newMiddleWidth;
      
      // Enforce minimum constraints - Requirements 6.4, 6.5
      if (newMiddleWidth < MIN_MIDDLE) {
        newMiddleWidth = MIN_MIDDLE;
        newRightWidth = remainingWidth - MIN_MIDDLE;
      }
      if (newRightWidth < MIN_RIGHT) {
        newRightWidth = MIN_RIGHT;
        newMiddleWidth = remainingWidth - MIN_RIGHT;
      }
      
      // Only update if all constraints are satisfied
      if (newMiddleWidth >= MIN_MIDDLE && newRightWidth >= MIN_RIGHT) {
        setLeftWidth(newLeftWidth);
        setMiddleWidth(newMiddleWidth);
        setRightWidth(newRightWidth);
      }
    } else if (activeHandle === 'right') {
      // Resizing between middle and right panels - Requirement 13.4
      const newRightWidth = Math.max(MIN_RIGHT, Math.min(80, 100 - mousePercent));
      const remainingWidth = 100 - newRightWidth;
      
      // Distribute remaining width proportionally between left and middle
      const leftRatio = leftWidth / (leftWidth + middleWidth);
      let newLeftWidth = remainingWidth * leftRatio;
      let newMiddleWidth = remainingWidth - newLeftWidth;
      
      // Enforce minimum constraints - Requirements 6.4, 6.5
      if (newLeftWidth < MIN_LEFT) {
        newLeftWidth = MIN_LEFT;
        newMiddleWidth = remainingWidth - MIN_LEFT;
      }
      if (newMiddleWidth < MIN_MIDDLE) {
        newMiddleWidth = MIN_MIDDLE;
        newLeftWidth = remainingWidth - MIN_MIDDLE;
      }
      
      // Only update if all constraints are satisfied
      if (newLeftWidth >= MIN_LEFT && newMiddleWidth >= MIN_MIDDLE) {
        setLeftWidth(newLeftWidth);
        setMiddleWidth(newMiddleWidth);
        setRightWidth(newRightWidth);
      }
    }
  };

  // Task 2.4: mouseup handler - cleanup listeners, restore cursor
  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveHandle(null);
    
    // Restore default cursor and text selection - Requirements 5.6, 13.2, 13.5
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  };

  // Attach/detach document-level event listeners - Requirement 13.3
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }
    
    // Cleanup on unmount or when dragging stops - Requirement 13.5
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging, activeHandle, leftWidth, middleWidth, rightWidth]);

  // Placeholder handlers for ProblemNav
  const handleRun = () => {
    console.log('Run clicked');
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  // Task 7.3: Language selector handler - Requirement 3.2, 3.3, 3.4
  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  // Task 7.4: Reset button handler - Requirement 3.5
  const handleReset = () => {
    setCode(defaultCodeTemplates[language]);
  };

  // Task 7.5: Settings button handler (placeholder) - Requirement 3.6
  const handleSettings = () => {
    console.log('Settings clicked - placeholder for future implementation');
  };

  // Test case management handlers
  const handleAddTestCase = () => {
    if (testCases.length >= 4) return; // Max 4 test cases
    const newId = Math.max(...testCases.map(tc => tc.id)) + 1;
    setTestCases([...testCases, { id: newId, nums: [], target: 0 }]);
    setActiveTestCase(newId);
  };

  const handleRemoveTestCase = (id) => {
    if (testCases.length === 1) return; // Keep at least one test case
    const newTestCases = testCases.filter(tc => tc.id !== id);
    setTestCases(newTestCases);
    if (activeTestCase === id) {
      setActiveTestCase(newTestCases[0].id);
    }
  };

  const handleTestCaseChange = (field, value) => {
    setTestCases(testCases.map(tc => 
      tc.id === activeTestCase 
        ? { ...tc, [field]: field === 'nums' ? JSON.parse(value) : parseInt(value) }
        : tc
    ));
  };

  // Collapsible section toggle
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Task 8.2: Map language to Monaco language ID
  const getMonacoLanguage = (lang) => {
    const languageMap = {
      python3: 'python',
      java: 'java',
      cpp: 'cpp',
      javascript: 'javascript'
    };
    return languageMap[lang] || 'python';
  };

  // Task 8.2: Map theme to Monaco theme - Requirement 10.2
  const getMonacoTheme = () => {
    return theme === 'dark' ? 'vs-dark' : 'light';
  };

  // Task 8.1: Monaco Editor options - Requirement 3.7
  const editorOptions = {
    minimap: { enabled: false },
    fontSize: 14,
    lineNumbers: 'on',
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 4,
    wordWrap: 'off',
    folding: true,
    renderLineHighlight: 'all',
  };

  // Disable custom cursor on this page
  useEffect(() => {
    document.body.setAttribute('data-problem-solve-page', 'true');
    return () => {
      document.body.removeAttribute('data-problem-solve-page');
    };
  }, []);

  // Sample problem data - Task 6.1 (Two Sum problem as example)
  const problemData = {
    title: "1. Two Sum",
    difficulty: "Easy",
    tags: ["Array", "Hash Table"],
    statement: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
      },
      {
        input: "nums = [3,3], target = 6",
        output: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 6, we return [0, 1]."
      }
    ],
    constraints: [
      "2 <= nums.length <= 10⁴",
      "-10⁹ <= nums[i] <= 10⁹",
      "-10⁹ <= target <= 10⁹",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers but that would be too slow. Again, it's best to try out brute force solutions for just for completeness. It is from these brute force solutions that you can come up with optimizations.",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x where value is the input parameter. Can we change our array somehow so that this search becomes faster?",
      "The second train of thought is, without changing the array, can we use additional space somehow? Like maybe a hash map to speed up the search?"
    ],
    companyTags: ["Amazon", "Google", "Facebook", "Microsoft", "Apple", "Adobe"]
  };

  const sampleTestResult = {
    status: 'passed',
    input: {
      nums: [2, 7, 11, 15],
      target: 9
    },
    output: [0, 1],
    expected: [0, 1],
    runtime: '52 ms',
    memory: '15.2 MB'
  };

  // Task 6.1, 6.2: Render left panel content based on active tab
  const renderLeftContent = () => {
    switch (leftActiveTab) {
      case 'description':
        return (
          <div className="description-content">
            {/* Problem title and metadata */}
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

            {/* Problem statement */}
            <div className="problem-section-content">
              <p className="problem-statement">{problemData.statement}</p>
            </div>

            {/* Examples */}
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

            {/* Constraints */}
            <div className="problem-section-content">
              <h3 className="section-title">Constraints</h3>
              <ul className="constraints-list">
                {problemData.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>

            {/* Collapsible Sections */}
            <div className="collapsible-sections">
              {/* Hint 1 */}
              <div className="collapsible-section">
                <button 
                  className="collapsible-header"
                  onClick={() => toggleSection('hint1')}
                >
                  <ChevronRight 
                    size={16} 
                    className={`chevron-icon ${expandedSections.hint1 ? 'expanded' : ''}`}
                  />
                  <span>Hint 1</span>
                </button>
                {expandedSections.hint1 && (
                  <div className="collapsible-content">
                    <p>{problemData.hints[0]}</p>
                  </div>
                )}
              </div>

              {/* Hint 2 */}
              <div className="collapsible-section">
                <button 
                  className="collapsible-header"
                  onClick={() => toggleSection('hint2')}
                >
                  <ChevronRight 
                    size={16} 
                    className={`chevron-icon ${expandedSections.hint2 ? 'expanded' : ''}`}
                  />
                  <span>Hint 2</span>
                </button>
                {expandedSections.hint2 && (
                  <div className="collapsible-content">
                    <p>{problemData.hints[1]}</p>
                  </div>
                )}
              </div>

              {/* Hint 3 */}
              <div className="collapsible-section">
                <button 
                  className="collapsible-header"
                  onClick={() => toggleSection('hint3')}
                >
                  <ChevronRight 
                    size={16} 
                    className={`chevron-icon ${expandedSections.hint3 ? 'expanded' : ''}`}
                  />
                  <span>Hint 3</span>
                </button>
                {expandedSections.hint3 && (
                  <div className="collapsible-content">
                    <p>{problemData.hints[2]}</p>
                  </div>
                )}
              </div>

              {/* Company Tags */}
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
            <h3>Editorial</h3>
            <p>Official solution explanation will be available here.</p>
          </div>
        );
      
      case 'solutions':
        return (
          <div className="placeholder-content">
            <h3>Solutions</h3>
            <p>Community solutions will be displayed here.</p>
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

  // Task 11.1, 11.2: Render right panel content based on active tab
  const renderRightContent = () => {
    const currentTestCase = testCases.find(tc => tc.id === activeTestCase);
    
    switch (rightActiveTab) {
      case 'testcase':
        return (
          <div className="testcase-content">
            {/* Test case selector buttons */}
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

            {/* Test input fields */}
            <div className="test-input-group">
              <label className="test-input-label">nums =</label>
              <input 
                type="text" 
                className="test-input-field" 
                value={`[${currentTestCase?.nums.join(', ') || ''}]`}
                onChange={(e) => {
                  try {
                    const value = e.target.value;
                    handleTestCaseChange('nums', value);
                  } catch (err) {
                    // Invalid JSON, ignore
                  }
                }}
              />
            </div>
            <div className="test-input-group">
              <label className="test-input-label">target =</label>
              <input 
                type="text" 
                className="test-input-field" 
                value={currentTestCase?.target || 0}
                onChange={(e) => handleTestCaseChange('target', e.target.value)}
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
    <div className="problem-solve-root">
      <ProblemNav 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={false}
      />

      <main className="problem-solve-layout" ref={containerRef}>
        {/* Left Panel - Description */}
        <section 
          className="problem-section left-panel" 
          style={{ width: `${leftWidth}%` }}
        >
          {/* Task 5.1, 5.2: Tab navigation with icons and dividers */}
          <div className="pane-header">
            <button 
              className={`tab ${leftActiveTab === 'description' ? 'active' : ''}`}
              onClick={() => setLeftActiveTab('description')}
            >
              <FileText size={16} />
              <span>Description</span>
            </button>
            <div className="tab-divider" />
            <button 
              className={`tab ${leftActiveTab === 'editorial' ? 'active' : ''}`}
              onClick={() => setLeftActiveTab('editorial')}
            >
              <Lightbulb size={16} />
              <span>Editorial</span>
            </button>
            <div className="tab-divider" />
            <button 
              className={`tab ${leftActiveTab === 'solutions' ? 'active' : ''}`}
              onClick={() => setLeftActiveTab('solutions')}
            >
              <Users size={16} />
              <span>Solutions</span>
            </button>
            <div className="tab-divider" />
            <button 
              className={`tab ${leftActiveTab === 'submissions' ? 'active' : ''}`}
              onClick={() => setLeftActiveTab('submissions')}
            >
              <Clock size={16} />
              <span>Submissions</span>
            </button>
          </div>
          {/* Task 6.1, 6.2, 6.3: Content area with vertical scrolling */}
          <div className="pane-content">
            {renderLeftContent()}
          </div>
        </section>

        {/* Resize Handle - Left/Middle */}
        <div 
          className="resize-handle horizontal" 
          onMouseDown={(e) => handleResizeStart(e, 'left')}
        />

        {/* Middle Panel - Code Editor */}
        <section 
          className="problem-section middle-panel" 
          style={{ width: `${middleWidth}%` }}
        >
          {/* Task 7.1, 7.2: Editor header with language selector, reset, and settings buttons */}
          <div className="pane-header editor-header">
            <div className="editor-controls-left">
              {/* Task 7.3: Language selector - Requirements 3.2, 3.3, 3.4 */}
              <select 
                className="lang-select" 
                value={language} 
                onChange={handleLanguageChange}
              >
                <option value="python3">Python3</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
                <option value="javascript">JavaScript</option>
              </select>
              {/* Task 7.4: Reset button - Requirement 3.5 */}
              <button 
                className="editor-action-btn" 
                onClick={handleReset}
                title="Reset to default code"
              >
                <RotateCcw size={14} />
              </button>
            </div>
            <div className="editor-controls-right">
              {/* Task 7.5: Settings button (placeholder) - Requirement 3.6 */}
              <button 
                className="editor-action-btn" 
                onClick={handleSettings}
                title="Editor settings"
              >
                <Settings size={14} />
              </button>
            </div>
          </div>
          {/* Task 8.1, 8.2, 8.3: Monaco Editor integration - Requirements 3.1, 3.4, 3.7, 8.5, 10.2 */}
          <div className="editor-container">
            <Editor
              height="100%"
              language={getMonacoLanguage(language)}
              theme={getMonacoTheme()}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={editorOptions}
            />
          </div>
        </section>

        {/* Resize Handle - Middle/Right */}
        <div 
          className="resize-handle horizontal" 
          onMouseDown={(e) => handleResizeStart(e, 'right')}
        />

        {/* Right Panel - Test Cases */}
        <section 
          className="problem-section right-panel" 
          style={{ width: `${rightWidth}%` }}
        >
          {/* Task 10.1, 10.2: Tab navigation with active indicators */}
          <div className="pane-header">
            <button 
              className={`tab ${rightActiveTab === 'testcase' ? 'active' : ''}`}
              onClick={() => setRightActiveTab('testcase')}
            >
              <span>Testcase</span>
            </button>
            <div className="tab-divider" />
            <button 
              className={`tab ${rightActiveTab === 'result' ? 'active' : ''}`}
              onClick={() => setRightActiveTab('result')}
            >
              <span>Test Result</span>
            </button>
          </div>
          {/* Task 11.1, 11.2, 11.3: Content area with vertical scrolling */}
          <div className="pane-content">
            {renderRightContent()}
          </div>
        </section>
      </main>
    </div>
  );
}
