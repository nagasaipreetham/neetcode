import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { List, ExternalLink, ChevronLeft, ChevronRight, Timer, Moon, Sun, User, Play, Loader2 } from 'lucide-react';
import neetcodeLogo from '../../../assets/neetcode-io-logo.png';
import './ProblemNav.css';

export default function ProblemNav({ theme, toggleTheme, onRun, onSubmit, isRunning }) {
  const [timeInSeconds, setTimeInSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeInSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  return (
    <nav className="problem-nav">
      <div className="problem-nav-left">
        <Link to="/practice" className="nav-logo">
          <img src={neetcodeLogo} className="nav-logo-img" alt="NeetCode" />
        </Link>

        <Link to="/practice" style={{ textDecoration: 'none' }}>
          <button className="nav-btn neetcode-all-btn">
            <List size={18} />
            <span>NeetCode ALL</span>
            <ExternalLink size={14} />
          </button>
        </Link>

        <div className="nav-pagination">
          <button 
            className="nav-icon-btn"
            onClick={() => console.log('Previous problem')}
            title="Previous Problem"
          >
            <ChevronLeft size={20} />
          </button>
          <button 
            className="nav-icon-btn"
            onClick={() => console.log('Next problem')}
            title="Next Problem"
          >
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
            <>
              <Loader2 size={16} className="spin-icon" />
              <span>Running</span>
            </>
          ) : (
            <>
              <Play size={16} />
              <span>Run</span>
            </>
          )}
        </button>
        <button className="submit-btn" onClick={onSubmit}>
          Submit
        </button>
      </div>

      <div className="problem-nav-right">
        <button 
          className={`nav-btn timer-btn ${!isTimerRunning ? 'paused' : ''}`} 
          onClick={toggleTimer}
          title={isTimerRunning ? "Click to pause" : "Click to resume"}
        >
          <Timer size={18} />
          <span>{formatTime(timeInSeconds)}</span>
        </button>

        <Link to="/pro" style={{ textDecoration: 'none' }}>
          <button className="nav-btn pro-btn">Go Pro</button>
        </Link>

        <button className="nav-icon-btn theme-toggle" onClick={toggleTheme}>
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        <button 
          className="user-profile-btn"
          onClick={() => console.log('Profile clicked')}
        >
          <User size={20} />
        </button>
      </div>
    </nav>
  );
}
