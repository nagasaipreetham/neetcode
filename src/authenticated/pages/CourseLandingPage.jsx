import React from 'react';
import { useNavigate } from 'react-router-dom';
import { COURSES_AVAILABLE } from '../data/courseLessonsData';
import './CourseLandingPage.css';

export default function CourseLandingPage() {
  const navigate = useNavigate();

  // Group courses by subject
  const subjects = [...new Set(COURSES_AVAILABLE.map(c => c.subject))];

  return (
    <main className="course-landing-main">
      <div className="course-landing-header">
        <h1>Courses</h1>
        <p>Master technical skills with our structured, step-by-step courses.</p>
      </div>

      {subjects.map(subject => (
        <div key={subject} className="course-subject-section">
          <h2 className="subject-title">{subject}</h2>
          <div className="course-grid">
            {COURSES_AVAILABLE.filter(c => c.subject === subject).map(course => (
              <div 
                key={course.id} 
                className="course-card"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="course-card-icon">{course.icon}</div>
                <div className="course-card-content">
                  <h3>{course.title}</h3>
                  <p>{course.desc}</p>
                  <div className="course-card-meta">
                    <span className="lesson-count">{course.lessonsCount} Lessons</span>
                    <span className="course-badge">Course</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
