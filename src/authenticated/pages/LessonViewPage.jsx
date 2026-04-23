import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, SkipBack, SkipForward, Volume2, Settings, Maximize, Share2, Star, ChevronLeft, ChevronRight, CheckCircle2, ExternalLink, List } from 'lucide-react';
import { DSA_LESSONS, LESSON_DATA_MAP } from '../data/courseLessonsData';
import './LessonViewPage.css';

export default function LessonViewPage({ title: propTitle }) {
  const { courseCategory, courseName, lessonId } = useParams();
  const navigate = useNavigate();

  // Use localStorage to persist completion status
  const getInitialCompleted = () => {
    const completedStr = localStorage.getItem('completed_lessons');
    if (!completedStr) return false;
    const completedList = JSON.parse(completedStr);
    return completedList.includes(lessonId);
  };

  const [completed, setCompleted] = useState(getInitialCompleted());
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [activeSection, setActiveSection] = useState('summary');

  // Sync completion state when lessonId changes
  useEffect(() => {
    setCompleted(getInitialCompleted());
  }, [lessonId]);

  const handleToggleComplete = () => {
    const newStatus = !completed;
    setCompleted(newStatus);

    const completedStr = localStorage.getItem('completed_lessons');
    let completedList = completedStr ? JSON.parse(completedStr) : [];

    if (newStatus) {
      if (!completedList.includes(lessonId)) completedList.push(lessonId);
    } else {
      completedList = completedList.filter(id => id !== lessonId);
    }

    localStorage.setItem('completed_lessons', JSON.stringify(completedList));
    // Dispatch a custom event so the sidebar can update immediately
    window.dispatchEvent(new Event('storage'));
  };

  // Find the current course data
  const courseKey = `${courseCategory}/${courseName}`;
  const currentCourse = LESSON_DATA_MAP[courseKey];
  
  // Find the lesson name and index for navigation
  const allLessons = (currentCourse?.lessons || DSA_LESSONS).flatMap(sec => sec.lessons);
  const lessonIndex = allLessons.findIndex(l => l.id === lessonId);
  const lesson = allLessons[lessonIndex];
  const displayTitle = lesson ? lesson.name : (propTitle || 'Lesson');

  const goToNext = () => {
    if (lessonIndex < allLessons.length - 1) {
      navigate(`/course/${courseCategory}/${courseName}/${allLessons[lessonIndex + 1].id}`);
    }
  };

  const goToPrev = () => {
    if (lessonIndex > 0) {
      navigate(`/course/${courseCategory}/${courseName}/${allLessons[lessonIndex - 1].id}`);
    }
  };

  // Interaction Observer for ToC highlighting
  useEffect(() => {
    const sections = ['summary', 'insights', 'timeline', 'features', 'conclusion'];
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 120; // sticky header + buffer
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = el.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tocItems = [
    { id: 'summary', label: 'Summary' },
    { id: 'insights', label: 'Key Insights' },
    { id: 'timeline', label: 'Timeline' },
    { id: 'features', label: 'Features & Changes' },
    { id: 'conclusion', label: 'Conclusion' }
  ];

  return (
    <main className="lesson-view-main">
      <div className="lesson-view-content">
        <header className="lesson-header">
          <h1 className="lesson-title">{displayTitle}</h1>
          <div className="lesson-actions">
            <button className="action-btn">
              <Share2 size={18} />
              <span>Share</span>
            </button>
          </div>
        </header>

        <div className="video-player-container">
          <div className="video-aspect-ratio">
            <iframe
              className="youtube-iframe"
              src="https://www.youtube.com/embed/5PnP1gWGw20?autoplay=0&rel=0&modestbranding=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>

        {/* New Interactive Toolbar Section */}
        <div className="lesson-toolbar-sticky">
          <div className="toolbar-left">
            <label className="complete-checkbox">
              <input
                type="checkbox"
                checked={completed}
                onChange={handleToggleComplete}
              />
              <span className="checkbox-custom">
                {completed && <CheckCircle2 size={16} fill="var(--auth-accent, #22c55e)" color="#fff" />}
              </span>
              <span className="checkbox-label">Mark the lesson as complete</span>
            </label>
          </div>

          <div className="toolbar-right">
            <div className="rating-section">
              <span className="rating-text">How was this lesson?</span>
              <div className="stars-row">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    className={`star-icon ${(hoverRating || rating) >= star ? 'filled' : ''}`}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    fill={(hoverRating || rating) >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>
            </div>

            <div className="nav-arrows">
              <button className="nav-arrow-btn" onClick={goToPrev} disabled={lessonIndex <= 0}>
                <ChevronLeft size={20} />
              </button>
              <button className="nav-arrow-btn" onClick={goToNext} disabled={lessonIndex >= allLessons.length - 1}>
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="lesson-content-layout">
          {/* Beautified Content Section */}
          <article className="lesson-article-content">
            <section className="article-intro" id="summary">
              <h2>Summary of Video Content on Anthropic Claude Opus 4.7 Release</h2>
              <p className="article-lead">
                <strong>Anthropic has released Claude Opus 4.7</strong>, their latest publicly available AI model. Despite initial hype and some dramatic claims such as "AGI achieved" and "coding is dead," the presenter emphasises that this release is <strong>not a significant breakthrough</strong> compared to previous versions. The video provides a nuanced analysis of the model’s performance, features, and the broader context of AI development and competition.
              </p>
            </section>

            <hr className="article-divider" />

            <section className="article-section" id="insights">
              <h3>Key Insights</h3>
              <ul className="article-list">
                <li>Claude Opus 4.7 shows incremental improvements but no revolutionary changes compared to prior versions.</li>
                <li>The most advanced Anthropic model, <strong>Mythos</strong>, remains unreleased to the public due to safety concerns.</li>
                <li>Benchmarks show Opus 4.7 performs better than 4.6 in most categories, but slightly worse in Agentic Search.</li>
                <li>Claude Opus 4.7 uses <strong>35% more tokens</strong> for thinking processes, increasing computational cost.</li>
                <li>Introduces "adaptive thinking," a controversial feature that allows the model to decide reasoning depth.</li>
                <li>Anthropic is actively testing <strong>cyber safeguards</strong>, which can sometimes lead to false positives.</li>
                <li>Competition between Anthropic and OpenAI is highlighted, showing differing ethical stances.</li>
              </ul>
            </section>

            <section className="article-section" id="timeline">
              <h3>Timeline of Events and Releases</h3>
              <div className="table-container">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Date/Period</th>
                      <th>Event/Release</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>November (previous year)</td>
                      <td>Release of Opus 4.5</td>
                      <td>Considered a more significant update</td>
                    </tr>
                    <tr>
                      <td>Recent weeks</td>
                      <td>Release of Opus 4.7</td>
                      <td>Publicly available; incremental update</td>
                    </tr>
                    <tr>
                      <td><em>Not specified</em></td>
                      <td>Mythos model preview</td>
                      <td>Unreleased to public; limited access</td>
                    </tr>
                    <tr>
                      <td>Past few weeks</td>
                      <td>Increased rate limits</td>
                      <td>Due to higher computational demands</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="article-section" id="features">
              <h3>Features and Changes in Claude Opus 4.7</h3>
              <div className="table-container">
                <table className="content-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th>Description</th>
                      <th>Impact/Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><a href="#" className="table-link">Adaptive Thinking <ExternalLink size={12} /></a></td>
                      <td>Model decides reasoning depth</td>
                      <td>Default off; depends on effort level</td>
                    </tr>
                    <tr>
                      <td><a href="#" className="table-link">Token Usage <ExternalLink size={12} /></a></td>
                      <td>35% more tokens used for thinking</td>
                      <td>Higher compute cost, offset by rate limits</td>
                    </tr>
                    <tr>
                      <td>Instruction Following</td>
                      <td>Improved ability to follow multi-step instructions</td>
                      <td>Minor improvement</td>
                    </tr>
                    <tr>
                      <td>Image Interpretation</td>
                      <td>Better at understanding text in images</td>
                      <td>Slightly improved</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="article-section" id="conclusion">
              <h3>Conclusion</h3>
              <div className="conclusion-card">
                <p>
                  Claude Opus 4.7 represents a <strong>modest step forward rather than a fundamental leap</strong> in AI capability. It introduces some new features like adaptive thinking but also raises questions about cost and transparency. The presenter encourages a measured view on the hype surrounding new AI model releases.
                </p>
              </div>
            </section>

            <section className="article-keywords">
              <div className="keyword-cloud">
                {["Claude Opus 4.7", "Anthropic", "Mythos", "Adaptive Thinking", "AI Benchmarks", "Cybersecurity", "Ethics", "OpenAI"].map(kw => (
                  <span key={kw} className="keyword-tag">{kw}</span>
                ))}
              </div>
            </section>
          </article>

          {/* Table of Contents Column */}
          <aside className="lesson-toc-column">
            <div className="lesson-toc-sticky">
              <div className="toc-header">
                <List size={16} />
                <span>ON THIS PAGE</span>
              </div>
              <nav className="toc-nav">
                {tocItems.map(item => (
                  <button
                    key={item.id}
                    className={`toc-link ${activeSection === item.id ? 'active' : ''}`}
                    onClick={() => scrollToSection(item.id)}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
