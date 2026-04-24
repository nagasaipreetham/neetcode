import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, Circle, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import ProblemDashboard from '../../components/Dashboard/ProblemDashboard';
import TopicChips from '../../components/Topics/TopicChips';
import { CORE_SKILLS_DATA } from '../../data/coreSkillsData';
import './PracticePage.css';
import '../SpecialProblems/SpecialProblemsPage.css';

/* ── List options ── */
const LIST_OPTIONS = [
  { id: 'blind75', label: 'Blind 75', icon: '🧠' },
  { id: 'neetcode150', label: 'NeetCode 150', icon: '🚀' },
  { id: 'neetcode250', label: 'NeetCode 250', icon: '🦄' },
  { id: 'neetcodeall', label: 'NeetCode All', icon: '🌐' },
];

/* ── Categories ── */
const CATEGORIES = [
  { name: 'All', total: 150, solved: 62 },
  { name: 'Arrays & Hashing', total: 9, solved: 9 },
  { name: 'Two Pointers', total: 5, solved: 5 },
  { name: 'Sliding Window', total: 6, solved: 4 },
  { name: 'Stack', total: 7, solved: 3 },
  { name: 'Binary Search', total: 7, solved: 6 },
  { name: 'Linked List', total: 11, solved: 7 },
  { name: 'Trees', total: 15, solved: 8 },
  { name: 'Tries', total: 3, solved: 1 },
  { name: 'Heap / Priority Queue', total: 7, solved: 2 },
  { name: 'Backtracking', total: 9, solved: 4 },
  { name: 'Graphs', total: 13, solved: 5 },
  { name: 'Advanced Graphs', total: 6, solved: 2 },
  { name: 'DP — 1D', total: 12, solved: 4 },
  { name: 'DP — 2D', total: 11, solved: 2 },
  { name: 'Greedy', total: 8, solved: 0 },
  { name: 'Intervals', total: 6, solved: 0 },
  { name: 'Math & Geometry', total: 8, solved: 0 },
  { name: 'Bit Manipulation', total: 7, solved: 0 },
];

/* ── Problems ── */
export const ALL_PROBLEMS = [
  { id: 1, name: 'Two Sum', category: 'Arrays & Hashing', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Hash Table'] },
  { id: 2, name: 'Valid Anagram', category: 'Arrays & Hashing', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['String', 'Hash Table', 'Sorting'] },
  { id: 3, name: 'Contains Duplicate', category: 'Arrays & Hashing', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Hash Table', 'Sorting'] },
  { id: 4, name: 'Group Anagrams', category: 'Arrays & Hashing', difficulty: 'Medium', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Hash Table', 'String', 'Sorting'] },
  { id: 5, name: 'Top K Frequent Elements', category: 'Arrays & Hashing', difficulty: 'Medium', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Hash Table', 'Sorting'] },
  { id: 6, name: 'Product of Array Except Self', category: 'Arrays & Hashing', difficulty: 'Medium', status: 'Attempted', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Prefix Sum'] },
  { id: 7, name: 'Longest Consecutive Sequence', category: 'Arrays & Hashing', difficulty: 'Medium', status: 'Attempted', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Hash Table'] },
  { id: 8, name: 'Trapping Rain Water', category: 'Arrays & Hashing', difficulty: 'Hard', status: 'Not Started', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Two Pointers', 'Dynamic Programming'] },
  { id: 9, name: 'Valid Palindrome', category: 'Two Pointers', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Two Pointers', 'String'] },
  { id: 10, name: '3Sum', category: 'Two Pointers', difficulty: 'Medium', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Two Pointers', 'Sorting'] },
  { id: 11, name: 'Container With Most Water', category: 'Two Pointers', difficulty: 'Medium', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Two Pointers', 'Greedy'] },
  { id: 12, name: 'Best Time to Buy and Sell Stock', category: 'Sliding Window', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Dynamic Programming'] },
  { id: 13, name: 'Longest Substring Without Repeating', category: 'Sliding Window', difficulty: 'Medium', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Hash Table', 'String', 'Sliding Window'] },
  { id: 14, name: 'Minimum Window Substring', category: 'Sliding Window', difficulty: 'Hard', status: 'Attempted', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Hash Table', 'String', 'Sliding Window'] },
  { id: 15, name: 'Valid Parentheses', category: 'Stack', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['String', 'Stack'] },
  { id: 16, name: 'Min Stack', category: 'Stack', difficulty: 'Medium', status: 'Not Started', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Stack', 'Design'] },
  { id: 17, name: 'Evaluate Reverse Polish Notation', category: 'Stack', difficulty: 'Medium', status: 'Not Started', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Math', 'Stack'] },
  { id: 18, name: 'Binary Search', category: 'Binary Search', difficulty: 'Easy', status: 'Solved', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Binary Search'] },
  { id: 19, name: 'Koko Eating Bananas', category: 'Binary Search', difficulty: 'Medium', status: 'Attempted', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Binary Search'] },
  { id: 20, name: 'Find Minimum in Rotated Array', category: 'Binary Search', difficulty: 'Medium', status: 'Not Started', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Binary Search'] },
  { id: 21, name: 'Reverse Linked List', category: 'Linked List', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Linked List'] },
  { id: 22, name: 'Merge Two Sorted Lists', category: 'Linked List', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Linked List', 'Recursion'] },
  { id: 23, name: 'Reorder List', category: 'Linked List', difficulty: 'Medium', status: 'Not Started', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Linked List', 'Two Pointers', 'Stack', 'Recursion'] },
  { id: 24, name: 'LRU Cache', category: 'Linked List', difficulty: 'Medium', status: 'Not Started', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Hash Table', 'Linked List', 'Design', 'Doubly-Linked List'] },
  { id: 25, name: 'Invert Binary Tree', category: 'Trees', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'] },
  { id: 26, name: 'Maximum Depth of Binary Tree', category: 'Trees', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'] },
  { id: 27, name: 'Level Order Traversal', category: 'Trees', difficulty: 'Medium', status: 'Attempted', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Tree', 'Breadth-First Search', 'Binary Tree'] },
  { id: 28, name: 'Binary Tree Right Side View', category: 'Trees', difficulty: 'Medium', status: 'Not Started', lists: ['neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Tree', 'Depth-First Search', 'Breadth-First Search', 'Binary Tree'] },
  { id: 29, name: 'Construct Binary Tree from Preorder', category: 'Trees', difficulty: 'Medium', status: 'Not Started', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Hash Table', 'Divide and Conquer', 'Tree', 'Binary Tree'] },
  { id: 30, name: 'Binary Tree Maximum Path Sum', category: 'Trees', difficulty: 'Hard', status: 'Not Started', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Dynamic Programming', 'Tree', 'Depth-First Search', 'Binary Tree'] },
  { id: 31, name: 'Climbing Stairs', category: 'DP — 1D', difficulty: 'Easy', status: 'Solved', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Math', 'Dynamic Programming', 'Memoization'] },
  { id: 32, name: 'House Robber', category: 'DP — 1D', difficulty: 'Medium', status: 'Attempted', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Array', 'Dynamic Programming'] },
  { id: 33, name: 'Longest Palindromic Substring', category: 'DP — 1D', difficulty: 'Medium', status: 'Not Started', lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'], topics: ['Two Pointers', 'String', 'Dynamic Programming'] },
];

const DIFF_FILTERS = ['All', 'Easy', 'Medium', 'Hard'];
const STATUS_FILTERS = ['All', 'Solved', 'Attempted', 'Not Started'];

function StatusIcon({ status }) {
  if (status === 'Solved') return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle size={14} className="status-icon attempted" />;
  return <Circle size={14} className="status-icon not-started" />;
}

export default function PracticePage() {
  const { listId = 'neetcode150' } = useParams();
  const navigate = useNavigate();

  const isCoreSkills = listId === 'coreskills';

  const getProblemSlug = (name) => name.toLowerCase().replace(/\s+/g, '-');

  // ── Normal list state ──
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [diffFilt, setDiffFilt] = useState('All');
  const [statFilt, setStatFilt] = useState('All');
  const [dropOpen, setDropOpen] = useState(false);
  const dropRef = useRef(null);

  // ── Core Skills state ──
  const [coreSection, setCoreSection] = useState('dataStructures'); // 'dataStructures' | 'algorithms'
  const [coreTopic, setCoreTopic] = useState(null); // null = show all topics in section

  useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  // Reset core topic when section changes
  useEffect(() => { setCoreTopic(null); }, [coreSection]);
  // Reset category when listId changes
  useEffect(() => { setActiveCategory('All'); }, [listId]);

  const currentList = LIST_OPTIONS.find(l => l.id === listId) || LIST_OPTIONS[1];

  // ── Normal problems ──
  const listProblems = useMemo(() =>
    ALL_PROBLEMS.filter(p => p.lists?.includes(listId)),
    [listId]
  );

  // ── Core skills problems/topics ──
  const coreSectionData = CORE_SKILLS_DATA[coreSection];
  const coreTopicsForSection = coreSectionData?.topics ?? [];

  // Active topic object (or null = show all in section)
  const activeCoreTopicObj = coreTopic
    ? coreTopicsForSection.find(t => t.name === coreTopic)
    : null;

  const coreProblems = useMemo(() => {
    if (!isCoreSkills) return [];
    if (activeCoreTopicObj) return activeCoreTopicObj.problems;
    // All problems in section
    return coreTopicsForSection.flatMap(t => t.problems);
  }, [isCoreSkills, activeCoreTopicObj, coreTopicsForSection]);

  // ── Filtered problems ──
  const filtered = useMemo(() => {
    const base = isCoreSkills ? coreProblems : listProblems.filter(p => {
      return activeCategory === 'All' || p.category === activeCategory;
    });
    return base.filter(p => {
      const srchOk = p.name.toLowerCase().includes(search.toLowerCase());
      const diffOk = diffFilt === 'All' || p.difficulty === diffFilt;
      const statOk = statFilt === 'All' || p.status === statFilt;
      return srchOk && diffOk && statOk;
    });
  }, [isCoreSkills, coreProblems, listProblems, activeCategory, search, diffFilt, statFilt]);

  const solved = filtered.filter(p => p.status === 'Solved').length;
  const attempted = filtered.filter(p => p.status === 'Attempted').length;

  // ── Page title ──
  const pageTitle = isCoreSkills
    ? (activeCoreTopicObj ? activeCoreTopicObj.name : coreSectionData?.label ?? 'Core Skills')
    : (activeCategory === 'All' ? 'All Problems' : activeCategory);

  return (
    <main className="practice-main">

      {/* ── ROW 1: Left (Title + Filters) | Right (Dashboard) ── */}
      <div className="practice-row1">
        <div className="practice-main-header">
          <h1>{pageTitle}</h1>
          <p className="practice-main-subtitle">
            <span className="stat-solved">{solved} solved</span>
            {attempted > 0 && <span className="stat-attempted"> · {attempted} attempted</span>}
            <span className="stat-total"> · {filtered.length} total</span>
          </p>

          <div className="practice-filters-stack">
            <div className="filter-group">
              <span className="filter-label">Difficulty</span>
              {DIFF_FILTERS.map(f => (
                <button key={f} className={`filter-chip ${diffFilt === f ? 'filter-chip--active diff--' + f.toLowerCase() : ''}`} onClick={() => setDiffFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="filter-group">
              <span className="filter-label">Status</span>
              {STATUS_FILTERS.map(f => (
                <button key={f} className={`filter-chip ${statFilt === f ? 'filter-chip--active' : ''}`} onClick={() => setStatFilt(f)}>{f}</button>
              ))}
            </div>
            <div className="practice-search-bar">
              <Search size={13} className="search-icon" />
              <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="practice-search-input" />
            </div>
          </div>
        </div>

        <ProblemDashboard problems={filtered} />
      </div>

      {/* ── ROW 2: Core Skills / List Selector ── */}
      <div className="practice-row2-centered">
        <div className={`list-tab-item ${isCoreSkills ? 'active' : ''}`}>
          <button className="list-tab-btn" onClick={() => navigate('/practice/problems/coreskills')}>
            <span className="list-btn-icon">🎯</span>
            <span>Core Skills</span>
          </button>
          {isCoreSkills && <div className="list-tab-indicator" />}
        </div>

        <div className={`list-tab-item ${!isCoreSkills ? 'active' : ''}`} ref={dropRef}>
          <div className="list-tab-group">
            <button className="list-tab-btn" onClick={() => { if (isCoreSkills) navigate(`/practice/problems/${currentList.id}`); }}>
              <span className="list-btn-icon">{currentList.icon}</span>
              <span>{currentList.label}</span>
            </button>
            <button className="list-dropdown-trigger" onClick={e => { e.stopPropagation(); setDropOpen(v => !v); }}>
              <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
          {!isCoreSkills && <div className="list-tab-indicator" />}
          {dropOpen && (
            <div className="list-dropdown">
              {LIST_OPTIONS.map(opt => (
                <button key={opt.id} className={`list-drop-item ${opt.id === listId ? 'active' : ''}`}
                  onClick={() => { navigate(`/practice/problems/${opt.id}`); setDropOpen(false); }}>
                  <span className="list-drop-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ROW 3: Core Skills section buttons OR Topic Chips ── */}
      {isCoreSkills ? (
        <div className="core-section-row">
          {Object.entries(CORE_SKILLS_DATA).map(([key, sec]) => (
            <button
              key={key}
              className={`core-section-btn ${coreSection === key ? 'active' : ''}`}
              onClick={() => setCoreSection(key)}
            >
              {sec.label}
            </button>
          ))}
        </div>
      ) : (
        <TopicChips />
      )}

      {/* ── ROW 4: Categories | Problems table ── */}
      <div className="practice-body-split">

        {/* Topics column */}
        <div className="practice-categories-col">
          <p className="practice-col-label">Topics</p>
          {isCoreSkills ? (
            <ul className="practice-cat-list">
              {coreTopicsForSection.map(topic => {
                const isActive = coreTopic === topic.name;
                const pct = Math.round((topic.solved / topic.total) * 100);
                return (
                  <li key={topic.name} className={`practice-cat-item${isActive ? ' active' : ''}`}
                    onClick={() => setCoreTopic(isActive ? null : topic.name)}>
                    <div className="cat-item-top">
                      <span className="cat-item-name">{topic.name}</span>
                      <span className="cat-item-count">{topic.solved}/{topic.total}</span>
                    </div>
                    <div className="cat-item-bar"><div className="cat-item-bar-fill" style={{ width: `${pct}%` }} /></div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="practice-cat-list">
              {CATEGORIES.map(cat => {
                const pct = Math.round((cat.solved / cat.total) * 100);
                const isActive = activeCategory === cat.name;
                return (
                  <li key={cat.name} className={`practice-cat-item${isActive ? ' active' : ''}`} onClick={() => setActiveCategory(cat.name)}>
                    <div className="cat-item-top">
                      <span className="cat-item-name">{cat.name}</span>
                      <span className="cat-item-count">{cat.solved}/{cat.total}</span>
                    </div>
                    <div className="cat-item-bar"><div className="cat-item-bar-fill" style={{ width: `${pct}%` }} /></div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Problems column */}
        <div className="practice-problems-col">
          {isCoreSkills ? (
            /* Core Skills: no Solution column */
            <>
              <div className="special-table-header">
                <span></span><span>Problem</span><span>Difficulty</span>
              </div>
              <div className="practice-problem-list">
                {filtered.length === 0
                  ? <div className="practice-empty">No problems match your filters.</div>
                  : filtered.map(p => (
                    <div key={p.id} className="practice-problem-row special-problem-row" onClick={() => navigate(`/problems/${getProblemSlug(p.name)}`)}>
                      <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                      <span className="problem-name">{p.name}<ChevronRight size={11} className="problem-chevron" /></span>
                      <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    </div>
                  ))
                }
              </div>
            </>
          ) : (
            /* Normal list: 4-column with Solution */
            <>
              <div className="practice-table-header">
                <span></span><span>Problem</span><span>Difficulty</span><span className="center-header">Solution</span>
              </div>
              <div className="practice-problem-list">
                {filtered.length === 0
                  ? <div className="practice-empty">No problems match your filters.</div>
                  : filtered.map(p => (
                    <div key={p.id} className="practice-problem-row" onClick={() => navigate(`/problems/${getProblemSlug(p.name)}`)}>
                      <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                      <span className="problem-name">{p.name}<ChevronRight size={11} className="problem-chevron" /></span>
                      <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                      <span className="problem-solution centered"><FileText size={14} /></span>
                    </div>
                  ))
                }
              </div>
            </>
          )}
        </div>
      </div>

    </main>
  );
}
