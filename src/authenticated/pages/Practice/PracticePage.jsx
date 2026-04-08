import { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Search, CheckCircle2, Circle, ChevronRight, ChevronDown, FileText } from 'lucide-react';
import ProblemDashboard from '../../components/Dashboard/ProblemDashboard';
import './PracticePage.css';

/* ── List options (with emoji icons) ── */
const LIST_OPTIONS = [
  { id: 'blind75',     label: 'Blind 75',     icon: '🧠' },
  { id: 'neetcode150', label: 'NeetCode 150',  icon: '🚀' },
  { id: 'neetcode250', label: 'NeetCode 250',  icon: '🦄' },
  { id: 'neetcodeall', label: 'NeetCode All',  icon: '🌐' },
];

/* ── Categories ── */
const CATEGORIES = [
  { name: 'All',                   total: 150, solved: 62 },
  { name: 'Arrays & Hashing',      total: 9,   solved: 9  },
  { name: 'Two Pointers',          total: 5,   solved: 5  },
  { name: 'Sliding Window',        total: 6,   solved: 4  },
  { name: 'Stack',                 total: 7,   solved: 3  },
  { name: 'Binary Search',         total: 7,   solved: 6  },
  { name: 'Linked List',           total: 11,  solved: 7  },
  { name: 'Trees',                 total: 15,  solved: 8  },
  { name: 'Tries',                 total: 3,   solved: 1  },
  { name: 'Heap / Priority Queue', total: 7,   solved: 2  },
  { name: 'Backtracking',          total: 9,   solved: 4  },
  { name: 'Graphs',                total: 13,  solved: 5  },
  { name: 'Advanced Graphs',       total: 6,   solved: 2  },
  { name: 'DP — 1D',              total: 12,  solved: 4  },
  { name: 'DP — 2D',              total: 11,  solved: 2  },
  { name: 'Greedy',                total: 8,   solved: 0  },
  { name: 'Intervals',             total: 6,   solved: 0  },
  { name: 'Math & Geometry',       total: 8,   solved: 0  },
  { name: 'Bit Manipulation',      total: 7,   solved: 0  },
];

/* ── Problems ── */
const ALL_PROBLEMS = [
  { id:1,  name:'Two Sum',                         category:'Arrays & Hashing',   difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:2,  name:'Valid Anagram',                   category:'Arrays & Hashing',   difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:3,  name:'Contains Duplicate',              category:'Arrays & Hashing',   difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:4,  name:'Group Anagrams',                  category:'Arrays & Hashing',   difficulty:'Medium', status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:5,  name:'Top K Frequent Elements',         category:'Arrays & Hashing',   difficulty:'Medium', status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:6,  name:'Product of Array Except Self',    category:'Arrays & Hashing',   difficulty:'Medium', status:'Attempted',   lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:7,  name:'Longest Consecutive Sequence',    category:'Arrays & Hashing',   difficulty:'Medium', status:'Attempted',   lists:['neetcode150','neetcode250','neetcodeall']},
  { id:8,  name:'Trapping Rain Water',             category:'Arrays & Hashing',   difficulty:'Hard',   status:'Not Started', lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:9,  name:'Valid Palindrome',                category:'Two Pointers',       difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:10, name:'3Sum',                            category:'Two Pointers',       difficulty:'Medium', status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:11, name:'Container With Most Water',       category:'Two Pointers',       difficulty:'Medium', status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:12, name:'Best Time to Buy and Sell Stock', category:'Sliding Window',     difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:13, name:'Longest Substring Without Repeating',category:'Sliding Window',  difficulty:'Medium', status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:14, name:'Minimum Window Substring',        category:'Sliding Window',     difficulty:'Hard',   status:'Attempted',   lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:15, name:'Valid Parentheses',               category:'Stack',              difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:16, name:'Min Stack',                       category:'Stack',              difficulty:'Medium', status:'Not Started', lists:['neetcode150','neetcode250','neetcodeall']},
  { id:17, name:'Evaluate Reverse Polish Notation',category:'Stack',              difficulty:'Medium', status:'Not Started', lists:['neetcode150','neetcode250','neetcodeall']},
  { id:18, name:'Binary Search',                   category:'Binary Search',      difficulty:'Easy',   status:'Solved',      lists:['neetcode150','neetcode250','neetcodeall']},
  { id:19, name:'Koko Eating Bananas',             category:'Binary Search',      difficulty:'Medium', status:'Attempted',   lists:['neetcode150','neetcode250','neetcodeall']},
  { id:20, name:'Find Minimum in Rotated Array',   category:'Binary Search',      difficulty:'Medium', status:'Not Started', lists:['neetcode150','neetcode250','neetcodeall']},
  { id:21, name:'Reverse Linked List',             category:'Linked List',        difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:22, name:'Merge Two Sorted Lists',          category:'Linked List',        difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:23, name:'Reorder List',                    category:'Linked List',        difficulty:'Medium', status:'Not Started', lists:['neetcode150','neetcode250','neetcodeall']},
  { id:24, name:'LRU Cache',                       category:'Linked List',        difficulty:'Medium', status:'Not Started', lists:['neetcode150','neetcode250','neetcodeall']},
  { id:25, name:'Invert Binary Tree',              category:'Trees',              difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:26, name:'Maximum Depth of Binary Tree',    category:'Trees',              difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:27, name:'Level Order Traversal',           category:'Trees',              difficulty:'Medium', status:'Attempted',   lists:['neetcode150','neetcode250','neetcodeall']},
  { id:28, name:'Binary Tree Right Side View',     category:'Trees',              difficulty:'Medium', status:'Not Started', lists:['neetcode150','neetcode250','neetcodeall']},
  { id:29, name:'Construct Binary Tree from Preorder',category:'Trees',           difficulty:'Medium', status:'Not Started', lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:30, name:'Binary Tree Maximum Path Sum',    category:'Trees',              difficulty:'Hard',   status:'Not Started', lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:31, name:'Climbing Stairs',                 category:'DP — 1D',           difficulty:'Easy',   status:'Solved',      lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:32, name:'House Robber',                    category:'DP — 1D',           difficulty:'Medium', status:'Attempted',   lists:['blind75','neetcode150','neetcode250','neetcodeall']},
  { id:33, name:'Longest Palindromic Substring',   category:'DP — 1D',           difficulty:'Medium', status:'Not Started', lists:['blind75','neetcode150','neetcode250','neetcodeall']},
];

const DIFF_FILTERS   = ['All','Easy','Medium','Hard'];
const STATUS_FILTERS = ['All','Solved','Attempted','Not Started'];

function StatusIcon({ status }) {
  if (status === 'Solved')    return <CheckCircle2 size={14} className="status-icon solved" />;
  if (status === 'Attempted') return <Circle       size={14} className="status-icon attempted" />;
  return                             <Circle       size={14} className="status-icon not-started" />;
}

export default function PracticePage() {
  const { listId = 'neetcode150' } = useParams();
  const navigate = useNavigate();

  const [activeCategory, setActiveCategory] = useState('All');
  const [search,    setSearch]    = useState('');
  const [diffFilt,  setDiffFilt]  = useState('All');
  const [statFilt,  setStatFilt]  = useState('All');
  const [dropOpen,  setDropOpen]  = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const h = e => { if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const currentList = LIST_OPTIONS.find(l => l.id === listId) || LIST_OPTIONS[1];
  const isCoreSkills = listId === 'coreskills';

  const listProblems = useMemo(() =>
    ALL_PROBLEMS.filter(p => isCoreSkills ? p.id <= 15 : p.lists?.includes(listId)),
    [listId, isCoreSkills]
  );

  const filtered = useMemo(() => listProblems.filter(p => {
    const catOk  = activeCategory === 'All' || p.category === activeCategory;
    const srchOk = p.name.toLowerCase().includes(search.toLowerCase());
    const diffOk = diffFilt === 'All' || p.difficulty === diffFilt;
    const statOk = statFilt === 'All' || p.status    === statFilt;
    return catOk && srchOk && diffOk && statOk;
  }), [listProblems, activeCategory, search, diffFilt, statFilt]);

  const solved    = filtered.filter(p => p.status === 'Solved').length;
  const attempted = filtered.filter(p => p.status === 'Attempted').length;

  return (
    <main className="practice-main">

      {/* ── ROW 1: Title + Dashboard ── */}
      <div className="practice-row1">
        <div className="practice-main-header">
          <h1>{activeCategory === 'All' ? 'All Problems' : activeCategory}</h1>
          <p className="practice-main-subtitle">
            <span className="stat-solved">{solved} solved</span>
            {attempted > 0 && <span className="stat-attempted"> · {attempted} attempted</span>}
            <span className="stat-total"> · {filtered.length} total</span>
          </p>
        </div>
        {/* Dashboard — no background, no border */}
        <ProblemDashboard problems={filtered} />
      </div>

      {/* ── ROW 2: Core Skills selector — Centered with underlines ── */}
      <div className="practice-row2-centered">
        {/* Left: Core Skills button */}
        <div className={`list-tab-item ${isCoreSkills ? 'active' : ''}`}>
          <button
            className="list-tab-btn"
            onClick={() => navigate('/practice/problems/coreskills')}
          >
            <span className="list-btn-icon">🎯</span>
            <span>Core Skills</span>
          </button>
          {isCoreSkills && <div className="list-tab-indicator" />}
        </div>

        {/* Right: List selection */}
        <div className={`list-tab-item ${!isCoreSkills ? 'active' : ''}`} ref={dropRef}>
          <div className="list-tab-group">
            <button
              className="list-tab-btn"
              onClick={() => {
                if (isCoreSkills) {
                  navigate(`/practice/problems/${currentList.id}`);
                }
              }}
            >
              <span className="list-btn-icon">{currentList.icon}</span>
              <span>{currentList.label}</span>
            </button>
            <button 
              className="list-dropdown-trigger"
              onClick={(e) => {
                e.stopPropagation();
                setDropOpen(v => !v);
              }}
            >
              <ChevronDown size={14} style={{ transition: 'transform 0.2s', transform: dropOpen ? 'rotate(180deg)' : 'none' }} />
            </button>
          </div>
          {!isCoreSkills && <div className="list-tab-indicator" />}

          {dropOpen && (
            <div className="list-dropdown">
              {LIST_OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  className={`list-drop-item ${opt.id === listId ? 'active' : ''}`}
                  onClick={() => { navigate(`/practice/problems/${opt.id}`); setDropOpen(false); }}
                >
                  <span className="list-drop-icon">{opt.icon}</span>
                  <span>{opt.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── ROW 3: Filters + Search (NO border/background) ── */}
      <div className="practice-row3">
        <div className="filter-group">
          <span className="filter-label">Difficulty</span>
          {DIFF_FILTERS.map(f => (
            <button key={f} className={`filter-chip ${diffFilt===f?'filter-chip--active diff--'+f.toLowerCase():''}`} onClick={() => setDiffFilt(f)}>{f}</button>
          ))}
        </div>
        <div className="filter-group">
          <span className="filter-label">Status</span>
          {STATUS_FILTERS.map(f => (
            <button key={f} className={`filter-chip ${statFilt===f?'filter-chip--active':''}`} onClick={() => setStatFilt(f)}>{f}</button>
          ))}
        </div>
        <div className="practice-search-bar">
          <Search size={13} className="search-icon" />
          <input type="text" placeholder="Search…" value={search} onChange={e => setSearch(e.target.value)} className="practice-search-input" />
        </div>
      </div>

      {/* ── ROW 4: Topics | Problems ── */}
      <div className="practice-body-split">
        {/* Categories */}
        <div className="practice-categories-col">
          <p className="practice-col-label">Topics</p>
          <ul className="practice-cat-list">
            {CATEGORIES.map(cat => {
              const pct = Math.round((cat.solved / cat.total) * 100);
              const isActive = activeCategory === cat.name;
              return (
                <li key={cat.name} className={`practice-cat-item${isActive?' active':''}`} onClick={() => setActiveCategory(cat.name)}>
                  <div className="cat-item-top">
                    <span className="cat-item-name">{cat.name}</span>
                    <span className="cat-item-count">{cat.solved}/{cat.total}</span>
                  </div>
                  <div className="cat-item-bar"><div className="cat-item-bar-fill" style={{width:`${pct}%`}}/></div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Problems */}
        <div className="practice-problems-col">
          <div className="practice-table-header">
            <span></span><span>Problem</span><span>Difficulty</span><span className="center-header">Solution</span>
          </div>
          <div className="practice-problem-list">
            {filtered.length === 0
              ? <div className="practice-empty">No problems match your filters.</div>
              : filtered.map(p => (
                  <div key={p.id} className="practice-problem-row">
                    <span className="problem-status-icon"><StatusIcon status={p.status} /></span>
                    <span className="problem-name">{p.name}<ChevronRight size={11} className="problem-chevron"/></span>
                    <span className={`problem-difficulty difficulty--${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                    <span className="problem-solution centered"><FileText size={14}/></span>
                  </div>
                ))
            }
          </div>
        </div>
      </div>

    </main>
  );
}
