import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './TopicChips.css';

export const ALL_TOPICS = [
  { name: 'Array', count: 324 },
  { name: 'String', count: 136 },
  { name: 'Hash Table', count: 127 },
  { name: 'Depth-First Search', count: 91 },
  { name: 'Dynamic Programming', count: 87 },
  { name: 'Sorting', count: 83 },
  { name: 'Breadth-First Search', count: 67 },
  { name: 'Math', count: 66 },
  { name: 'Two Pointers', count: 64 },
  { name: 'Tree', count: 61 },
  { name: 'Binary Search', count: 55 },
  { name: 'Binary Tree', count: 52 },
  { name: 'Matrix', count: 52 },
  { name: 'Greedy', count: 49 },
  { name: 'Stack', count: 46 },
  { name: 'Design', count: 43 },
  { name: 'Heap (Priority Queue)', count: 42 },
  { name: 'Linked List', count: 34 },
  { name: 'Backtracking', count: 27 },
  { name: 'Bit Manipulation', count: 27 },
  { name: 'Sliding Window', count: 27 },
  { name: 'Union Find', count: 24 },
  { name: 'Counting', count: 22 },
  { name: 'Prefix Sum', count: 22 },
  { name: 'Graph Theory', count: 20 },
  { name: 'Simulation', count: 20 },
  { name: 'Binary Search Tree', count: 17 },
  { name: 'Queue', count: 16 },
  { name: 'Recursion', count: 16 },
  { name: 'Divide and Conquer', count: 15 },
  { name: 'Trie', count: 15 },
  { name: 'Topological Sort', count: 13 },
  { name: 'Monotonic Stack', count: 10 },
  { name: 'Graph', count: 9 },
  { name: 'Interactive', count: 9 },
  { name: 'Data Stream', count: 8 },
  { name: 'Hash Function', count: 6 },
  { name: 'Memoization', count: 6 },
  { name: 'Shortest Path', count: 6 },
  { name: 'String Matching', count: 6 },
  { name: 'Bitmask DP', count: 5 },
  { name: 'Ordered Set', count: 5 },
  { name: 'Doubly-Linked List', count: 4 },
  { name: 'Enumeration', count: 4 },
  { name: 'Combinatorics', count: 3 },
  { name: 'Counting Sort', count: 3 },
  { name: 'Game Theory', count: 3 },
  { name: 'Iterator', count: 3 },
  { name: 'Monotonic Queue', count: 3 },
  { name: 'Number Theory', count: 3 },
  { name: 'Quickselect', count: 3 },
  { name: 'Sweep Line', count: 3 },
  { name: 'Bucket Sort', count: 2 },
  { name: 'Merge Sort', count: 2 },
  { name: 'Minimum Spanning Tree', count: 2 },
  { name: 'Randomized', count: 2 },
  { name: 'Binary Indexed Tree', count: 1 },
  { name: 'Eulerian Circuit', count: 1 },
  { name: 'Geometry', count: 1 },
  { name: 'Probability and Statistics', count: 1 },
  { name: 'Radix Sort', count: 1 },
  { name: 'Rolling Hash', count: 1 },
  { name: 'Segment Tree', count: 1 },
  { name: 'Strongly Connected Component', count: 1 },
];

export function topicToSlug(name) {
  return name.toLowerCase().replace(/[()]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-');
}

export default function TopicChips() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`topic-chips-wrapper ${expanded ? 'expanded' : 'collapsed'}`}>
      <div className="topic-chips-scroll-container">
        {ALL_TOPICS.map(topic => (
          <button
            key={topic.name}
            className="topic-chip"
            onClick={() => navigate(`/practice/problem-list/${topicToSlug(topic.name)}`)}
          >
            <span className="chip-label">{topic.name}</span>
            <span className="chip-count">{topic.count}</span>
          </button>
        ))}
      </div>

      {/* Expand: absolutely overlaid on top-right when collapsed */}
      {!expanded && (
        <button className="chips-expand-btn expand-overlay" onClick={() => setExpanded(true)}>
          Expand <ChevronDown size={13} />
        </button>
      )}

      {expanded && (
        <div className="chips-collapse-row">
          <button className="chips-expand-btn" onClick={() => setExpanded(false)}>
            Collapse <ChevronUp size={13} />
          </button>
        </div>
      )}
    </div>
  );
}
