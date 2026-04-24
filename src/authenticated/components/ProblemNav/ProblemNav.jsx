import React from 'react';
import { Link } from 'react-router-dom';
import { List, ExternalLink, ChevronLeft, ChevronRight, Timer, Moon, Sun, User, Play, Loader2 } from 'lucide-react';
import neetcodeLogo from '../../../assets/neetcode-io-logo.png';
import './ProblemNav.css';

export default function ProblemNav({ theme, toggleTheme, onRun, onSubmit, isRunning }) {
  return (
    <nav className="problem-nav">
      <div className="problem-nav-left">
        <Link to="/practice" className="nav-logo">
          <img src={neetcodeLogo} className="nav-logo-img" alt="NeetCode" />
        </Link>

        <button className="nav-btn neetcode-all-btn">
          <List size={18} />
          <span>NeetCode ALL</span>
          <ExternalLink size={14} />
        </button>

        <div className="nav-pagination">
          <button className="nav-icon-btn">
            <ChevronLeft size={20} />
          </button>
          <button className="nav-icon-btn">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="problem-nav-center">
        <button 
          className={`run-btn ${isRunning ? 'running' : ''}`}
          onClick={onRun}
          disabled={isRunning}
        >
          {isRunning ? (
            <Loader2 size={18} className="spin-icon" />
          ) : (
            <Play size={18} />
          )}
        </button>
        <button className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      </div>

      <div className="problem-nav-right">
        <button className="nav-btn timer-btn">
          <Timer size={18} />
          <span>00:00</span>
        </button>

        <Link to="/pro" style={{ textDecoration: 'none' }}>
          <button className="nav-btn pro-btn">Go Pro</button>
        </Link>

        <button className="nav-icon-btn theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button className="user-profile-btn">
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}
