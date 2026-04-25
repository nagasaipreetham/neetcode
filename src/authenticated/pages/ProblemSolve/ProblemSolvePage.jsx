import { useState, useEffect, useRef } from 'react';
import ProblemNav from '../../components/ProblemNav/ProblemNav';
import { useTheme } from '../../AuthLayout';
import LeftPanel from './components/LeftPanel';
import EditorPanel from './components/EditorPanel';
import TestcasePanel from './components/TestcasePanel';
import NeetBotPanel from './components/NeetBotPanel';
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
  const [activeHandle, setActiveHandle] = useState(null); // 'left' | 'right' | 'split' | null
  const [isLayoutSplit, setIsLayoutSplit] = useState(false);
  const [splitOffset, setSplitOffset] = useState(60); // Editor height % in split mode

  // NeetBot state
  const [isNeetBotOpen, setIsNeetBotOpen] = useState(false);

  // Editor state - Task 7.3, 7.4, 8.1 - Requirements 3.2, 3.3, 3.4, 3.5
  const [language, setLanguage] = useState('python3');
  const [solutions, setSolutions] = useState([
    {
      id: 1, name: 'Solution 1', codes: {
        python3: `def twoSum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    pass`, java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`, cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`, javascript: `/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    
};` }
    }
  ]);
  const [activeSolutionId, setActiveSolutionId] = useState(1);

  // Test case management state
  const [testCases, setTestCases] = useState([
    { id: 1, nums: [2, 7, 11, 15], target: 9 }
  ]);
  const [activeTestCase, setActiveTestCase] = useState(1);

  // Local state for input fields to prevent parsing lock
  const [localTestCase, setLocalTestCase] = useState({ nums: '[2, 7, 11, 15]', target: '9' });
  const widthsRef = useRef({ left: 35, middle: 40, right: 25 });

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

  // Sync local test case input when active test case changes
  useEffect(() => {
    const tc = testCases.find(t => t.id === activeTestCase);
    if (tc) {
      setLocalTestCase({
        nums: `[${tc.nums.join(', ')}]`,
        target: tc.target.toString()
      });
    }
  }, [activeTestCase, testCases]);

  const activeSolution = solutions.find(s => s.id === activeSolutionId) || solutions[0];

  const handleAddSolution = () => {
    if (solutions.length >= 4) return;
    const newId = Math.max(...solutions.map(s => s.id)) + 1;
    const newSolution = {
      id: newId,
      name: `Solution ${newId}`,
      codes: { ...defaultCodeTemplates }
    };
    setSolutions([...solutions, newSolution]);
    setActiveSolutionId(newId);
  };

  const handleRemoveSolution = (id) => {
    if (solutions.length <= 1) return;
    const newSolutions = solutions.filter(s => s.id !== id);
    setSolutions(newSolutions);
    if (activeSolutionId === id) {
      setActiveSolutionId(newSolutions[0].id);
    }
  };

  const handleOpenNeetBot = () => {
    if (!isLayoutSplit) {
      setIsLayoutSplit(true);
    }
    setIsNeetBotOpen(true);
  };

  const updateActiveSolutionCode = (newCode) => {
    setSolutions(prev => prev.map(s =>
      s.id === activeSolutionId
        ? { ...s, codes: { ...s.codes, [language]: newCode } }
        : s
    ));
  };

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

    // Minimum width constraints in pixels - Requirement 3.2 improvement
    const MIN_LEFT_PX = 300;
    const MIN_MIDDLE_PX = 350;
    const MIN_RIGHT_PX = 250;

    const MIN_LEFT = (MIN_LEFT_PX / containerWidth) * 100;
    const MIN_MIDDLE = (MIN_MIDDLE_PX / containerWidth) * 100;
    const MIN_RIGHT = (MIN_RIGHT_PX / containerWidth) * 100;

    const { left: currentLeft, middle: currentMiddle, right: currentRight } = widthsRef.current;

    if (activeHandle === 'left') {
      // Resizing between left and middle panels - Requirement 13.4
      const newLeftWidth = Math.max(MIN_LEFT, Math.min(100 - MIN_MIDDLE - MIN_RIGHT, mousePercent));
      const remainingWidth = 100 - newLeftWidth;

      // Distribute remaining width proportionally between middle and right
      const middleRatio = currentMiddle / (currentMiddle + currentRight);
      let newMiddleWidth = remainingWidth * middleRatio;
      let newRightWidth = remainingWidth - newMiddleWidth;

      // Enforce minimum constraints
      if (newMiddleWidth < MIN_MIDDLE) {
        newMiddleWidth = MIN_MIDDLE;
        newRightWidth = remainingWidth - MIN_MIDDLE;
      }
      if (newRightWidth < MIN_RIGHT) {
        newRightWidth = MIN_RIGHT;
        newMiddleWidth = remainingWidth - MIN_RIGHT;
      }

      if (newMiddleWidth >= MIN_MIDDLE && newRightWidth >= MIN_RIGHT) {
        setLeftWidth(newLeftWidth);
        setMiddleWidth(newMiddleWidth);
        setRightWidth(newRightWidth);
        widthsRef.current = { left: newLeftWidth, middle: newMiddleWidth, right: newRightWidth };
      }
    } else if (activeHandle === 'right' && (!isLayoutSplit || isNeetBotOpen)) {
      // Resizing between middle and right panels - Requirement 13.4
      const newRightWidth = Math.max(MIN_RIGHT, Math.min(100 - MIN_LEFT - MIN_MIDDLE, 100 - mousePercent));
      const remainingWidth = 100 - newRightWidth;

      // Distribute remaining width proportionally between left and middle
      const leftRatio = currentLeft / (currentLeft + currentMiddle);
      let newLeftWidth = remainingWidth * leftRatio;
      let newMiddleWidth = remainingWidth - newLeftWidth;

      // Enforce minimum constraints
      if (newLeftWidth < MIN_LEFT) {
        newLeftWidth = MIN_LEFT;
        newMiddleWidth = remainingWidth - MIN_LEFT;
      }
      if (newMiddleWidth < MIN_MIDDLE) {
        newMiddleWidth = MIN_MIDDLE;
        newLeftWidth = remainingWidth - MIN_MIDDLE;
      }

      if (newLeftWidth >= MIN_LEFT && newMiddleWidth >= MIN_MIDDLE) {
        setLeftWidth(newLeftWidth);
        setMiddleWidth(newMiddleWidth);
        setRightWidth(newRightWidth);
        widthsRef.current = { left: newLeftWidth, middle: newMiddleWidth, right: newRightWidth };
      }
    } else if (activeHandle === 'split') {
      const mouseY = e.clientY - containerRect.top;
      const containerHeight = containerRect.height;
      const newSplitOffset = Math.max(20, Math.min(80, (mouseY / containerHeight) * 100));
      setSplitOffset(newSplitOffset);
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
  }, [isDragging, activeHandle]); // Removed width states to prevent listener churn

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
    updateActiveSolutionCode(defaultCodeTemplates[language]);
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
        ? { ...tc, [field]: field === 'nums' ? JSON.parse(value) : (typeof value === 'number' ? value : parseInt(value)) }
        : tc
    ));
  };

  const handleNumsBlur = () => {
    try {
      const tc = testCases.find(t => t.id === activeTestCase);
      const parsed = JSON.parse(localTestCase.nums);
      if (Array.isArray(parsed)) {
        handleTestCaseChange('nums', JSON.stringify(parsed));
      }
    } catch (err) {
      const tc = testCases.find(t => t.id === activeTestCase);
      setLocalTestCase(prev => ({ ...prev, nums: `[${tc?.nums.join(', ')}]` }));
    }
  };

  const handleTargetBlur = () => {
    const tc = testCases.find(t => t.id === activeTestCase);
    const parsed = parseInt(localTestCase.target);
    if (!isNaN(parsed)) {
      handleTestCaseChange('target', parsed);
    } else {
      setLocalTestCase(prev => ({ ...prev, target: tc?.target.toString() || '0' }));
    }
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

  return (
    <div className="problem-solve-root">
      <ProblemNav
        theme={theme}
        toggleTheme={toggleTheme}
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={false}
      />

      <main className={`problem-solve-layout ${isLayoutSplit ? 'split-mode' : ''}`} ref={containerRef}>
        {/* Left Panel - Description */}
        <div style={{ width: `${leftWidth}%` }} className="panel-wrapper">
          <LeftPanel
            activeTab={leftActiveTab}
            setActiveTab={setLeftActiveTab}
            problemData={problemData}
            expandedSections={expandedSections}
            toggleSection={toggleSection}
          />
        </div>

        {/* Resize Handle - Left/Middle */}
        <div
          className="resize-handle horizontal"
          onMouseDown={(e) => handleResizeStart(e, 'left')}
        />

        {!isLayoutSplit ? (
          <>
            {/* Middle Panel - Code Editor */}
            <div style={{ width: `${middleWidth}%` }} className="panel-wrapper">
              <EditorPanel
                language={language}
                handleLanguageChange={handleLanguageChange}
                handleReset={handleReset}
                handleSettings={handleSettings}
                code={activeSolution.codes[language]}
                onCodeChange={updateActiveSolutionCode}
                getMonacoLanguage={getMonacoLanguage}
                getMonacoTheme={getMonacoTheme}
                editorOptions={editorOptions}
                solutions={solutions}
                activeSolutionId={activeSolutionId}
                setActiveSolutionId={setActiveSolutionId}
                onAddSolution={handleAddSolution}
                onRemoveSolution={handleRemoveSolution}
                onOpenNeetBot={handleOpenNeetBot}
              />
            </div>

            {/* Resize Handle - Middle/Right */}
            <div
              className="resize-handle horizontal"
              onMouseDown={(e) => handleResizeStart(e, 'right')}
            />

            {/* Right Panel - Test Cases */}
            <div style={{ width: `${rightWidth}%` }} className="panel-wrapper">
              <TestcasePanel
                activeTab={rightActiveTab}
                setActiveTab={setRightActiveTab}
                testCases={testCases}
                activeTestCase={activeTestCase}
                setActiveTestCase={setActiveTestCase}
                handleRemoveTestCase={handleRemoveTestCase}
                handleAddTestCase={handleAddTestCase}
                localTestCase={localTestCase}
                setLocalTestCase={setLocalTestCase}
                handleNumsBlur={handleNumsBlur}
                handleTargetBlur={handleTargetBlur}
                sampleTestResult={sampleTestResult}
                isLayoutSplit={isLayoutSplit}
                onToggleLayout={() => {
                  setIsLayoutSplit(!isLayoutSplit);
                  if (isNeetBotOpen) setIsNeetBotOpen(false);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <div style={{ width: `${isNeetBotOpen ? middleWidth : 100 - leftWidth}%` }} className="split-layout-container">
              <div style={{ height: `${splitOffset}%` }} className="panel-wrapper">
                <EditorPanel
                  language={language}
                  handleLanguageChange={handleLanguageChange}
                  handleReset={handleReset}
                  handleSettings={handleSettings}
                  code={activeSolution.codes[language]}
                  onCodeChange={updateActiveSolutionCode}
                  getMonacoLanguage={getMonacoLanguage}
                  getMonacoTheme={getMonacoTheme}
                  editorOptions={editorOptions}
                  solutions={solutions}
                  activeSolutionId={activeSolutionId}
                  setActiveSolutionId={setActiveSolutionId}
                  onAddSolution={handleAddSolution}
                  onRemoveSolution={handleRemoveSolution}
                  onOpenNeetBot={handleOpenNeetBot}
                />
              </div>

              <div
                className="resize-handle vertical"
                onMouseDown={(e) => handleResizeStart(e, 'split')}
              />

              <div style={{ height: `${100 - splitOffset}%` }} className="panel-wrapper">
                <TestcasePanel
                  activeTab={rightActiveTab}
                  setActiveTab={setRightActiveTab}
                  testCases={testCases}
                  activeTestCase={activeTestCase}
                  setActiveTestCase={setActiveTestCase}
                  handleRemoveTestCase={handleRemoveTestCase}
                  handleAddTestCase={handleAddTestCase}
                  localTestCase={localTestCase}
                  setLocalTestCase={setLocalTestCase}
                  handleNumsBlur={handleNumsBlur}
                  handleTargetBlur={handleTargetBlur}
                  sampleTestResult={sampleTestResult}
                  isLayoutSplit={isLayoutSplit}
                  onToggleLayout={() => {
                    setIsLayoutSplit(!isLayoutSplit);
                    if (isNeetBotOpen) setIsNeetBotOpen(false);
                  }}
                />
              </div>
            </div>

            {isNeetBotOpen && (
              <>
                {/* Resize Handle - Middle/Right */}
                <div
                  className="resize-handle horizontal"
                  onMouseDown={(e) => handleResizeStart(e, 'right')}
                />
                {/* Right Panel - NeetBot */}
                <div style={{ width: `${rightWidth}%` }} className="panel-wrapper">
                  <NeetBotPanel onClose={() => setIsNeetBotOpen(false)} />
                </div>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
