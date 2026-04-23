import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code2, Server, Brain, Layers, Database, Globe, Box, ChevronRight, Terminal, GitBranch, Building2, ArrowLeft, Clock } from 'lucide-react';
import { DSA_LESSONS, LESSON_DATA_MAP } from '../../data/courseLessonsData';
import './AuthSidebar.css';

const PRACTICE_TREE = [
  {
    id: 'coding-interviews', label: 'Coding Interviews', icon: Code2,
    children: [
      { label: 'Problems', path: '/practice/problems/neetcode150' },
      { label: 'Company Tagged', path: '/practice/company' },
      { label: 'Cheatsheets', path: '/practice/cheatsheet' },
      { label: 'Quizes', path: '/practice/quizes' },
    ],
  },
  { id: 'system-design', label: 'System Design', icon: Server, path: '/practice/system-design' },
  {
    id: 'machine-learning', label: 'Machine Learning', icon: Brain,
    children: [
      { label: 'Problems', path: '/practice/machine-learning' },
      { label: 'Build your ChatGPT', path: '/practice/machine-learning/project' },
    ],
  },
  { id: 'low-level-design', label: 'Low Level Design', icon: Building2, path: '/practice/low-level-design' },
  { id: 'databases', label: 'Databases', icon: Database, path: '/practice/databases' },
];

const COURSES_TREE = [
  {
    id: 'course-dsa', label: 'Data Structures & Algorithms', icon: GitBranch,
    children: [
      { label: 'Data Structures & Algorithms', path: '/course/dsa/fundamentals/intro' },
      { label: 'Advanced Algorithms',           path: '/course/dsa/advanced/intro' },
    ],
  },
  {
    id: 'course-sysdesign', label: 'System Design', icon: Server,
    children: [
      { label: 'System Design for Beginners', path: '/course/system-design/beginners/intro' },
      { label: 'System Design Interview',     path: '/course/system-design/interview/intro' },
    ],
  },
  {
    id: 'course-python', label: 'Python', icon: Terminal,
    children: [
      { label: 'Python for Beginners',          path: '/course/python/beginners/intro' },
      { label: 'Python for Coding Interviews',  path: '/course/python/coding-interviews/intro' },
      { label: 'Python OOP',                    path: '/course/python/oop/intro' },
    ],
  },
  {
    id: 'course-fullstack', label: 'Full Stack Development', icon: Globe,
    children: [
      { label: 'SQL for Beginners',       path: '/course/fullstack/sql/intro' },
      { label: 'Full Stack Development',  path: '/course/fullstack/dev/intro' },
    ],
  },
  {
    id: 'course-ood', label: 'Object Oriented Design', icon: Box,
    children: [
      { label: 'Object Oriented Design Interviews', path: '/course/ood/interviews/intro' },
      { label: 'Object Oriented Design Patterns',   path: '/course/ood/patterns/intro' },
    ],
  },
];

export default function AuthSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [activeTab, setActiveTab] = useState(pathname.startsWith('/course') ? 'courses' : 'practice');
  const [completedLessons, setCompletedLessons] = useState([]);

  // Parse path to find current course key (e.g. 'dsa/fundamentals')
  const pathParts = pathname.split('/').filter(Boolean);
  const isCoursePath = pathParts[0] === 'course' && pathParts.length >= 3;
  const currentCourseKey = isCoursePath ? `${pathParts[1]}/${pathParts[2]}` : null;
  const currentCourseData = LESSON_DATA_MAP[currentCourseKey];

  // Sync tab and completion with URL/Storage
  useEffect(() => {
    if (pathname.startsWith('/course')) {
      setActiveTab('courses');
    } else if (pathname.startsWith('/practice')) {
      setActiveTab('practice');
    }

    const syncCompleted = () => {
      const completed = localStorage.getItem('completed_lessons');
      setCompletedLessons(completed ? JSON.parse(completed) : []);
    };
    
    syncCompleted();
    window.addEventListener('storage', syncCompleted);
    return () => window.removeEventListener('storage', syncCompleted);
  }, [pathname]);

  // Calculate progress for current course
  const totalLessonsInCurrentCourse = currentCourseData 
    ? currentCourseData.lessons.reduce((acc, sec) => acc + sec.lessons.length, 0)
    : 36;
  
  const completedInCurrentCourse = currentCourseData
    ? currentCourseData.lessons.flatMap(s => s.lessons).filter(l => completedLessons.includes(l.id)).length
    : 0;

  const progressPercent = Math.round((completedInCurrentCourse / totalLessonsInCurrentCourse) * 100) || 0;
  const progressLabel = `${completedInCurrentCourse}/${totalLessonsInCurrentCourse}`;

  // Detect if we are inside a specific course lesson tree
  const isCourseDetail = !!currentCourseData;

  // Auto-expand the active course section (or default practice section)
  const getInitialExpanded = () => {
    const base = { 'coding-interviews': true };
    // Expand all sections by default in lesson tree
    const targetLessons = currentCourseData ? currentCourseData.lessons : DSA_LESSONS;
    targetLessons.forEach(sec => base[sec.title] = true);
    
    if (pathname.startsWith('/course/dsa'))            return { ...base, 'course-dsa': true };
    if (pathname.startsWith('/course/system-design'))  return { ...base, 'course-sysdesign': true };
    if (pathname.startsWith('/course/python'))         return { ...base, 'course-python': true };
    if (pathname.startsWith('/course/fullstack'))      return { ...base, 'course-fullstack': true };
    if (pathname.startsWith('/course/ood'))            return { ...base, 'course-ood': true };
    return base;
  };
  const [expanded, setExpanded] = useState(getInitialExpanded);

  const tree = activeTab === 'practice' ? PRACTICE_TREE : COURSES_TREE;

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'courses') {
      setExpanded(p => ({ ...p, 'course-dsa': true }));
      navigate('/course'); // Navigate to course landing page by default
    } else {
      navigate('/practice/problems/neetcode150');
    }
  };

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const isActive = (path) => path && pathname === path;
  const isChildActive = (item) => item.children?.some(c => isActive(c.path));

  // Small Progress Circle Component
  const ProgressCircle = ({ percent = 0, label = "0/36" }) => (
    <div className="sidebar-progress-circle">
      <svg width="32" height="32" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="14" className="progress-bg" />
        <circle cx="16" cy="16" r="14" className="progress-fg" 
          style={{ strokeDasharray: `${percent * 0.88} 100` }} />
      </svg>
      <span className="progress-label">{label}</span>
    </div>
  );

  return (
    <aside className="auth-sidebar" data-lenis-prevent="true">
      <div className="sidebar-tab-row">
        <button className={`sidebar-tab ${activeTab === 'practice' ? 'sidebar-tab--active' : ''}`} onClick={() => switchTab('practice')}>Practice</button>
        <button className={`sidebar-tab ${activeTab === 'courses' ? 'sidebar-tab--active' : ''}`} onClick={() => switchTab('courses')}>Courses</button>
      </div>

      <nav className="sidebar-tree">
        {activeTab === 'courses' && isCourseDetail ? (
          /* ── DETAILED LESSON TREE ── */
          <div className="course-lesson-tree">
            <div className="lesson-tree-header">
              <button className="lesson-back-btn" onClick={() => navigate('/course')}>
                <ArrowLeft size={18} />
              </button>
              <ProgressCircle percent={progressPercent} label={progressLabel} />
              <h3 className="lesson-course-title">{currentCourseData?.title || 'Course'}</h3>
            </div>

            <div className="lesson-sections">
              {(currentCourseData?.lessons || []).map(section => {
                const isOpen = !!expanded[section.title];
                return (
                   <div key={section.title} className="lesson-section-group">
                    <button className="lesson-section-toggle" onClick={() => toggle(section.title)}>
                      <span className="section-title">{section.title}</span>
                      <ChevronRight size={14} className={`section-chevron ${isOpen ? 'open' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="lesson-list">
                        {section.lessons.map(lesson => {
                          const isCompleted = completedLessons.includes(lesson.id);
                          return (
                            <div 
                              key={lesson.id} 
                              className={`lesson-item ${isActive(`/course/${currentCourseKey}/${lesson.id}`) ? 'lesson-item--active' : ''} ${isCompleted ? 'lesson-item--completed' : ''}`}
                              onClick={() => navigate(`/course/${currentCourseKey}/${lesson.id}`)}
                            >
                              <span className="lesson-name">{lesson.name}</span>
                              <div className="lesson-meta">
                                {lesson.free && <span className="lesson-free-tag">FREE</span>}
                                <div className="lesson-duration">
                                  <Clock size={11} />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* ── STANDARD TREE (Practice or Course List) ── */
          tree.map(item => {
            const Icon = item.icon;
            const hasChildren = !!item.children;
            const open = !!expanded[item.id];
            const active = hasChildren ? isChildActive(item) : isActive(item.path);
            return (
              <div key={item.id} className="tree-group">
                <button
                  className={`tree-item ${active && !hasChildren ? 'tree-item--active' : ''}`}
                  onClick={() => { if (hasChildren) toggle(item.id); else navigate(item.path); }}
                >
                  <Icon size={15} className="tree-item-icon" />
                  <span className="tree-item-label">{item.label}</span>
                  {hasChildren && <ChevronRight size={13} className={`tree-chevron ${open ? 'tree-chevron--open' : ''}`} />}
                </button>
                {hasChildren && open && (
                  <div className="tree-children">
                    {item.children.map(child => (
                      <button
                        key={child.label}
                        className={`tree-child ${isActive(child.path) ? 'tree-child--active' : ''}`}
                        onClick={() => navigate(child.path)}
                      >
                        {child.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </nav>
    </aside>
  );
}
