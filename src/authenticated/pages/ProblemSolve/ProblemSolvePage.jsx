import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import ProblemNav from '../../components/ProblemNav/ProblemNav';
import { Settings, RotateCcw, FileText, Lightbulb, CheckCircle, MessageSquare } from 'lucide-react';
import { useTheme } from '../../AuthLayout';
import './ProblemSolvePage.css';

export default function ProblemSolvePage() {
  const { problemId } = useParams();
  const problemName = problemId.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  const { theme, toggleTheme } = useTheme();
  const [code, setCode] = useState(`class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        # Write your code here\n        pass`);
  const [isRunning, setIsRunning] = useState(false);
  
  // Resizing state
  const [leftWidth, setLeftWidth] = useState(50); // percentage
  const [editorHeight, setEditorHeight] = useState(70); // percentage
  const isDraggingHorizontal = useRef(false);
  const isDraggingVertical = useRef(false);

  const handleRun = () => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
    }, 3000);
  };

  const handleSubmit = () => {
    console.log('Submit clicked');
  };

  // Horizontal resize (left/right panels)
  const handleMouseDownHorizontal = (e) => {
    e.preventDefault();
    isDraggingHorizontal.current = true;
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDraggingHorizontal.current) {
        const container = document.querySelector('.problem-solve-layout');
        if (container) {
          const rect = container.getBoundingClientRect();
          const newWidth = ((e.clientX - rect.left) / rect.width) * 100;
          if (newWidth > 20 && newWidth < 80) {
            setLeftWidth(newWidth);
          }
        }
      }
      
      if (isDraggingVertical.current) {
        const container = document.querySelector('.editor-console-stack');
        if (container) {
          const rect = container.getBoundingClientRect();
          const newHeight = ((e.clientY - rect.top) / rect.height) * 100;
          if (newHeight > 20 && newHeight < 80) {
            setEditorHeight(newHeight);
          }
        }
      }
    };

    const handleMouseUp = () => {
      isDraggingHorizontal.current = false;
      isDraggingVertical.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  // Vertical resize (editor/console)
  const handleMouseDownVertical = (e) => {
    e.preventDefault();
    isDraggingVertical.current = true;
  };

  // Disable custom cursor on this page
  useEffect(() => {
    document.body.setAttribute('data-problem-solve-page', 'true');
    return () => {
      document.body.removeAttribute('data-problem-solve-page');
    };
  }, []);

  return (
    <div className="problem-solve-root">
      <ProblemNav 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onRun={handleRun}
        onSubmit={handleSubmit}
        isRunning={isRunning}
      />

      <main className="problem-solve-layout">
        {/* Left Section: Question */}
        <section className="problem-section question-pane" style={{ width: `${leftWidth}%` }}>
          <div className="pane-header">
            <div className="tab active">
              <FileText className="tab-icon" size={16} />
              <span>Description</span>
            </div>
            <div className="tab-divider"></div>
            <div className="tab">
              <Lightbulb className="tab-icon" size={16} />
              <span>Solutions</span>
            </div>
            <div className="tab-divider"></div>
            <div className="tab">
              <CheckCircle className="tab-icon" size={16} />
              <span>Submissions</span>
            </div>
            <div className="tab-divider"></div>
            <div className="tab">
              <MessageSquare className="tab-icon" size={16} />
              <span>Discuss</span>
            </div>
          </div>
          <div className="pane-content">
            <h1 className="problem-h1">{problemName}</h1>
            <div className="problem-tags">
              <span className="tag-difficulty easy">Easy</span>
              <span className="tag-topic">Arrays</span>
              <span className="tag-topic">Hash Table</span>
            </div>

            <div className="problem-description">
              <p>Given an array of integers <code>nums</code> and an integer <code>target</code>, return indices of the two numbers such that they add up to <code>target</code>.</p>
              <p>You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice.</p>
              <p>You can return the answer in any order.</p>

              <div className="example-block">
                <h4>Example 1:</h4>
                <pre>
                  <strong>Input:</strong> nums = [2,7,11,15], target = 9{"\n"}
                  <strong>Output:</strong> [0,1]{"\n"}
                  <strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].
                </pre>
              </div>

              <div className="constraints">
                <h4>Constraints:</h4>
                <ul>
                  <li><code>2 &lt;= nums.length &lt;= 10<sup>4</sup></code></li>
                  <li><code>-10<sup>9</sup> &lt;= nums[i] &lt;= 10<sup>9</sup></code></li>
                  <li><code>-10<sup>9</sup> &lt;= target &lt;= 10<sup>9</sup></code></li>
                  <li><strong>Only one valid answer exists.</strong></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Horizontal Resize Handle */}
        <div 
          className="resize-handle horizontal"
          onMouseDown={handleMouseDownHorizontal}
        ></div>

        {/* Right Section: Editor + Console */}
        <div className="editor-console-stack" style={{ width: `${100 - leftWidth}%` }}>
          {/* Top: Editor */}
          <section className="problem-section editor-pane" style={{ height: `${editorHeight}%` }}>
            <div className="pane-header editor-header">
              <div className="editor-controls-left">
                <select className="lang-select">
                  <option>Python3</option>
                  <option>Java</option>
                  <option>C++</option>
                  <option>JavaScript</option>
                </select>
                <button className="editor-action-btn"><RotateCcw size={14} /></button>
              </div>
              <div className="editor-controls-right">
                <button className="editor-action-btn"><Settings size={14} /></button>
              </div>
            </div>
            <div className="editor-container">
              <Editor
                height="100%"
                defaultLanguage="python"
                theme={theme === 'dark' ? 'vs-dark' : 'light'}
                value={code}
                onChange={setCode}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
              />
            </div>
          </section>

          {/* Vertical Resize Handle */}
          <div 
            className="resize-handle vertical"
            onMouseDown={handleMouseDownVertical}
          ></div>

          {/* Bottom: Console / Test Cases */}
          <section className="problem-section console-pane" style={{ height: `${100 - editorHeight}%` }}>
            <div className="pane-header console-header">
              <div className="tab active">Testcase</div>
              <div className="tab">Result</div>
            </div>
            <div className="pane-content console-content">
              <div className="testcase-item">
                <label>nums =</label>
                <div className="testcase-input">[2,7,11,15]</div>
              </div>
              <div className="testcase-item">
                <label>target =</label>
                <div className="testcase-input">9</div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
