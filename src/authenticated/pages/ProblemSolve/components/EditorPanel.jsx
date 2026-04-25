import React, { useState } from 'react';
import {
  RotateCcw,
  Settings,
  Info,
  GitBranch,
  Square,
  Bug,
  Paintbrush,
  Columns,
  Maximize,
  Plus,
  ChevronDown,
  Bot,
  Lightbulb,
  Lock,
  X
} from 'lucide-react';
import Editor from '@monaco-editor/react';

export default function EditorPanel({
  language,
  handleLanguageChange,
  handleReset,
  handleSettings,
  code,
  onCodeChange,
  getMonacoLanguage,
  getMonacoTheme,
  editorOptions,
  solutions,
  activeSolutionId,
  setActiveSolutionId,
  onAddSolution,
  onRemoveSolution,
  onOpenNeetBot
}) {
  const [cursorPos, setCursorPos] = useState({ ln: 1, col: 1 });

  const handleEditorDidMount = (editor, monaco) => {
    editor.onDidChangeCursorPosition((e) => {
      setCursorPos({
        ln: e.position.lineNumber,
        col: e.position.column
      });
    });
  };

  return (
    <section className="problem-section middle-panel" style={{ width: '100%' }}>
      {/* Top Header Row */}
      <div className="pane-header editor-header">
        <div className="editor-controls-left">
          <div className="lang-selector-wrapper" title="Language info">
            <span className="lang-name">{language === 'python3' ? 'Python' : language}</span>
            <ChevronDown size={14} className="chevron-icon" />
          </div>
          <button className="icon-btn-ghost info-btn" title="Language info">
            <Info size={14} />
          </button>
          <div className="auto-status" title="Auto code suggestion and error detection">
            <span className="dot-indicator" />
            <span>Auto</span>
          </div>
        </div>

        <div className="editor-controls-right">
          <button className="icon-btn-ghost" title="Connect github"><GitBranch size={16} /></button>
          <button className="icon-btn-ghost" title="Notes"><Square size={16} /></button>
          <button className="icon-btn-ghost" title="Report bug"><Bug size={16} /></button>
          <button className="icon-btn-ghost" title="Format code"><Paintbrush size={16} /></button>
          <button
            className="icon-btn-ghost"
            onClick={handleReset}
            title="Reset code"
          >
            <RotateCcw size={16} />
          </button>
          <button className="icon-btn-ghost" title="Reset layout"><Columns size={16} /></button>
          <button
            className="icon-btn-ghost"
            onClick={handleSettings}
            title="Settings"
          >
            <Settings size={16} />
          </button>
          <button className="icon-btn-ghost" title="Full screen"><Maximize size={16} /></button>
        </div>
      </div>

      {/* Sub Header Row (Tabs & Bot/Hint) */}
      <div className="editor-sub-header">
        <div className="tabs-container">
          {solutions.map((sol) => (
            <div
              key={sol.id}
              className={`solution-tab ${activeSolutionId === sol.id ? 'active' : ''}`}
              onClick={() => setActiveSolutionId(sol.id)}
            >
              <span>{sol.name}</span>
              {solutions.length > 1 && (
                <X
                  size={12}
                  className="tab-close-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemoveSolution(sol.id);
                  }}
                />
              )}
            </div>
          ))}
          {solutions.length < 4 && (
            <button className="add-tab-btn" onClick={onAddSolution}>
              <Plus size={14} />
            </button>
          )}
        </div>

        <div className="sub-header-actions">
          <button className="action-pill neetbot-btn" title="Ask neetbot" onClick={onOpenNeetBot}>
            <Bot size={14} />
            <span>NeetBot</span>
          </button>
          <div className="action-divider" />
          <button className="action-pill hint-btn" title="Get hints based on your code">
            <Lightbulb size={14} />
            <span>Hint</span>
          </button>
          <div className="action-divider" />
          <div className="editor-status-info">
            <Lock size={14} className="lock-icon" />
            <span className="cursor-pos">Ln {cursorPos.ln}, Col {cursorPos.col}</span>
          </div>
        </div>
      </div>

      <div className="editor-container">
        <Editor
          height="100%"
          language={getMonacoLanguage(language)}
          theme={getMonacoTheme()}
          value={code}
          onChange={onCodeChange}
          options={editorOptions}
          onMount={handleEditorDidMount}
        />
      </div>
    </section>
  );
}


