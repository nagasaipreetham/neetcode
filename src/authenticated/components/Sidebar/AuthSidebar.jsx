import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code2, Server, Brain, Layers, Database, Globe, Box, ChevronRight, Terminal, GitBranch, Building2 } from 'lucide-react';
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
  { id: 'dsa', label: 'Data Structures & Algorithms', icon: GitBranch, path: '/courses/dsa' },
  { id: 'sysdesign', label: 'System Design', icon: Server, path: '/courses/system-design' },
  { id: 'python', label: 'Python', icon: Terminal, path: '/courses/python' },
  { id: 'fullstack', label: 'Full Stack Development', icon: Globe, path: '/courses/fullstack' },
  { id: 'ood', label: 'Object Oriented Design', icon: Box, path: '/courses/ood' },
];

export default function AuthSidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const defaultTab = pathname.startsWith('/courses') ? 'courses' : 'practice';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [expanded, setExpanded] = useState({ 'coding-interviews': true });

  const tree = activeTab === 'practice' ? PRACTICE_TREE : COURSES_TREE;

  const switchTab = (tab) => {
    setActiveTab(tab);
    if (tab === 'courses') navigate('/courses/dsa');
    else navigate('/practice/problems/neetcode150');
  };

  const toggle = (id) => setExpanded(p => ({ ...p, [id]: !p[id] }));

  const isActive = (path) => path && pathname === path;
  const isChildActive = (item) => item.children?.some(c => isActive(c.path));

  return (
    <aside className="auth-sidebar">
      <div className="sidebar-tab-row">
        <button className={`sidebar-tab ${activeTab === 'practice' ? 'sidebar-tab--active' : ''}`} onClick={() => switchTab('practice')}>Practice</button>
        <button className={`sidebar-tab ${activeTab === 'courses' ? 'sidebar-tab--active' : ''}`} onClick={() => switchTab('courses')}>Courses</button>
      </div>

      <nav className="sidebar-tree">
        {tree.map(item => {
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
        })}
      </nav>
    </aside>
  );
}
