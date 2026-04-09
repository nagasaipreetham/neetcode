import React, { useState } from 'react';
import { DownloadCloud, GitBranch, Server, Cpu, CheckCircle2, Circle } from 'lucide-react';
import FileTree from '../../components/FileTree/FileTree';
import { ML_TOPICS, ML_FILE_TREE } from '../../data/mlData';
import './MachineLearningProjectPage.css';
import '../Practice/PracticePage.css';
import '../SpecialProblems/SpecialProblemsPage.css';

function StatusIcon({ status }) {
  if (status === 'Solved')    return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle       size={14} className="status-icon attempted" />;
  return                             <Circle       size={14} className="status-icon not-started" />;
}

export default function MachineLearningProjectPage() {
  const [activeTopic, setActiveTopic] = useState(ML_TOPICS[0].name);
  
  const activeTopicObj = ML_TOPICS.find(t => t.name === activeTopic);
  const problems = activeTopicObj ? activeTopicObj.problems : [];

  return (
    <main className="ml-project-main">
      <div className="ml-project-container">
        
        {/* ── Header ── */}
        <div className="ml-project-header">
          <h1>Build Your GPT - Project Tracker</h1>
          <p>
            Complete all ML problems and your submissions assemble into a working GPT that
            generates text. Your code. Your project. Your GitHub.
          </p>
        </div>

        {/* ── Problems Table with Topics (like ML page) ── */}
        <div className="ml-project-problems-section">
          <div className="practice-body-split">
            {/* Topics column */}
            <div className="practice-categories-col">
              <p className="practice-col-label">Topics</p>
              <ul className="practice-cat-list">
                {ML_TOPICS.map(topic => {
                  const isActive = activeTopic === topic.name;
                  const pct = Math.round((topic.solved / topic.total) * 100);
                  return (
                    <li key={topic.name} className={`practice-cat-item ${isActive ? 'active' : ''}`} onClick={() => setActiveTopic(topic.name)}>
                      <div className="cat-item-top">
                        <span className="cat-item-name">{topic.name}</span>
                        <span className="cat-item-count">{topic.solved}/{topic.total}</span>
                      </div>
                      <div className="cat-item-bar"><div className="cat-item-bar-fill" style={{ width: `${pct}%` }} /></div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Problems column */}
            <div className="practice-problems-col">
              <div className="special-table-header">
                <span></span><span>Problem</span><span>Difficulty</span>
              </div>
              <div className="practice-problem-list">
                {problems.map(p => (
                  <div key={p.id} className="practice-problem-row special-problem-row">
                    <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                    <span className="problem-name">{p.name}</span>
                    <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Your Project (File Tree) ── */}
        <div className="ml-section">
          <h2>Your Project</h2>
          <p className="ml-section-desc">
            Each file maps to a problem you solved. Green means your code is ready.
          </p>
          <div className="ml-file-tree-wrapper">
            <FileTree tree={ML_FILE_TREE} />
          </div>
        </div>

        {/* ── Complete All Problems to Build ── */}
        <div className="ml-section">
          <h2>Complete All Problems to Build</h2>
          <div className="ml-cards-grid">
            
            {/* Download Card */}
            <div className="ml-action-card">
              <div className="ml-card-top-row">
                <div className="ml-card-icon"><DownloadCloud size={28} /></div>
                <div className="ml-card-content">
                  <h3>Download Project</h3>
                  <p>Get your complete GPT project as a ZIP</p>
                </div>
              </div>
              <button className="ml-btn secondary-btn">Download ZIP</button>
            </div>

            {/* Github Card */}
            <div className="ml-action-card">
              <div className="ml-card-top-row">
                <div className="ml-card-icon"><GitBranch size={28} /></div>
                <div className="ml-card-content">
                  <h3>Push to github</h3>
                  <p>Connect GitHub to push your project</p>
                  <p className="ml-card-subtext">Repo must be public for GitHub sync to work</p>
                </div>
              </div>
              <button className="ml-btn primary-btn">Connect Github</button>
            </div>
            
          </div>
        </div>

        {/* ── Continue Your Journey ── */}
        <div className="ml-section">
          <h2>Continue Your Journey</h2>
          <p className="ml-section-desc">After building your GPT, go deeper with advanced tracks.</p>
          <div className="ml-journey-list">
            
            {/* Journey Card 1 */}
            <div className="ml-journey-card">
              <div className="ml-journey-icon"><Server size={28} /></div>
              <div className="ml-journey-content">
                <div className="ml-journey-title-row">
                  <h3>Training at Scale</h3>
                  <span className="ml-badge-coming-soon">COMING SOON</span>
                </div>
                <p>Scale your GPT to multiple GPUs with DDP, ZeRO, mixed precision, RLHF, and more</p>
                <span className="ml-problem-count">12 problems</span>
              </div>
            </div>

            {/* Journey Card 2 */}
            <div className="ml-journey-card">
              <div className="ml-journey-icon"><Cpu size={28} /></div>
              <div className="ml-journey-content">
                <div className="ml-journey-title-row">
                  <h3>GPU Programming</h3>
                  <span className="ml-badge-coming-soon">COMING SOON</span>
                </div>
                <p>Write CUDA kernels from scratch — vector ops, shared memory, Flash Attention</p>
                <span className="ml-problem-count">15 problems</span>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </main>
  );
}
