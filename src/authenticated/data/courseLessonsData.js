export const DSA_LESSONS = [
  {
    title: 'Introduction',
    lessons: [
      { id: 'intro', name: 'Introduction', duration: '1 min', free: true }
    ]
  },
  {
    title: 'Arrays',
    lessons: [
      { id: 'ram', name: 'RAM', duration: '6 min', free: true },
      { id: 'static-arrays', name: 'Static Arrays', duration: '15 min' },
      { id: 'dynamic-arrays', name: 'Dynamic Arrays', duration: '16 min' },
      { id: 'stacks', name: 'Stacks', duration: '4 min' }
    ]
  },
  {
    title: 'Linked Lists',
    lessons: [
      { id: 'singly-linked', name: 'Singly Linked Lists', duration: '12 min', free: true },
      { id: 'doubly-linked', name: 'Doubly Linked Lists', duration: '10 min' },
      { id: 'queues', name: 'Queues', duration: '4 min' }
    ]
  },
  {
    title: 'Recursion',
    lessons: [
      { id: 'factorial', name: 'Factorial', duration: '11 min' },
      { id: 'fibonacci', name: 'Fibonacci Sequence', duration: '13 min' }
    ]
  },
  {
    title: 'Sorting',
    lessons: [
      { id: 'insertion-sort', name: 'Insertion Sort', duration: '19 min' },
      { id: 'merge-sort', name: 'Merge Sort', duration: '22 min' },
      { id: 'quick-sort', name: 'Quick Sort', duration: '17 min' },
      { id: 'bucket-sort', name: 'Bucket Sort', duration: '14 min' }
    ]
  },
  {
    title: 'Binary Search',
    lessons: [
      { id: 'search-array', name: 'Search Array', duration: '16 min' },
      { id: 'search-range', name: 'Search Range', duration: '8 min' }
    ]
  },
  {
    title: 'Trees',
    lessons: [
      { id: 'binary-tree', name: 'Binary Tree', duration: '11 min' },
      { id: 'binary-search-tree', name: 'Binary Search Tree', duration: '15 min' },
      { id: 'bst-insert-remove', name: 'BST Insert and Remove', duration: '22 min' },
      { id: 'dfs', name: 'Depth-First Search', duration: '15 min' },
      { id: 'bfs', name: 'Breadth-First Search', duration: '11 min' },
      { id: 'bst-sets-maps', name: 'BST Sets and Maps', duration: '6 min' }
    ]
  },
  {
    title: 'Backtracking',
    lessons: [
      { id: 'tree-maze', name: 'Tree Maze', duration: '14 min' }
    ]
  },
  {
    title: 'Heap / Priority Queue',
    lessons: [
      { id: 'heap-props', name: 'Heap Properties', duration: '14 min' },
      { id: 'push-pop', name: 'Push and Pop', duration: '18 min' },
      { id: 'heapify', name: 'Heapify', duration: '15 min' }
    ]
  },
  {
    title: 'Hashing',
    lessons: [
      { id: 'hash-usage', name: 'Hash Usage', duration: '10 min' },
      { id: 'hash-impl', name: 'Hash Implementation', duration: '29 min' }
    ]
  },
  {
    title: 'Graphs',
    lessons: [
      { id: 'intro-graphs', name: 'Intro to Graphs', duration: '22 min' },
      { id: 'matrix-dfs', name: 'Matrix DFS', duration: '22 min' },
      { id: 'matrix-bfs', name: 'Matrix BFS', duration: '14 min' },
      { id: 'adjacency-list', name: 'Adjacency List', duration: '20 min' }
    ]
  },
  {
    title: 'Dynamic Programming',
    lessons: [
      { id: '1d-dp', name: '1-Dimension DP', duration: '20 min' },
      { id: '2d-dp', name: '2-Dimension DP', duration: '22 min' }
    ]
  },
  {
    title: 'Bit Manipulation',
    lessons: [
      { id: 'bit-ops', name: 'Bit Operations', duration: '17 min' }
    ]
  }
];

export const COURSES_AVAILABLE = [
  // Algorithms
  {
    id: 'dsa/fundamentals',
    title: 'Data Structures & Algorithms',
    desc: 'The essential foundation for computer science and coding interviews.',
    icon: '🌳',
    subject: 'Algorithms',
    lessonsCount: 36
  },
  {
    id: 'dsa/advanced',
    title: 'Advanced Algorithms',
    desc: 'Master complex algorithmic patterns and optimization techniques.',
    icon: '🚀',
    subject: 'Algorithms',
    lessonsCount: 12
  },
  // Architecture
  {
    id: 'system-design/beginners',
    title: 'System Design for Beginners',
    desc: 'Learn the core components and concepts of distributed systems.',
    icon: '☁️',
    subject: 'Architecture',
    lessonsCount: 15
  },
  {
    id: 'system-design/interview',
    title: 'System Design Interview',
    desc: 'Advanced strategies for high-level architectural interview questions.',
    icon: '🏗️',
    subject: 'Architecture',
    lessonsCount: 24
  },
  // Language
  {
    id: 'python/beginners',
    title: 'Python for Beginners',
    desc: 'Learn the fundamentals of Python programming from scratch.',
    icon: '🐍',
    subject: 'Language',
    lessonsCount: 10
  },
  {
    id: 'python/coding-interviews',
    title: 'Python for Coding Interviews',
    desc: 'Specific Python tricks and libraries for competitive programming.',
    icon: '🧪',
    subject: 'Language',
    lessonsCount: 15
  },
  {
    id: 'python/oop',
    title: 'Python OOP',
    desc: 'Master classes, inheritance, and object-oriented principles in Python.',
    icon: '🧱',
    subject: 'Language',
    lessonsCount: 8
  },
  // Web
  {
    id: 'fullstack/sql',
    title: 'SQL for Beginners',
    desc: 'Master relational databases and complex query optimization.',
    icon: '📊',
    subject: 'Web',
    lessonsCount: 12
  },
  {
    id: 'fullstack/dev',
    title: 'Full Stack Development',
    desc: 'Build end-to-end web applications with modern frameworks.',
    icon: '💻',
    subject: 'Web',
    lessonsCount: 42
  },
  // Design
  {
    id: 'ood/interviews',
    title: 'OOD Interviews',
    desc: 'Solve object-oriented design questions for top tech companies.',
    icon: '🧩',
    subject: 'Design',
    lessonsCount: 15
  },
  {
    id: 'ood/patterns',
    title: 'OOD Patterns',
    desc: 'Learn design patterns that make software scalable and maintainable.',
    icon: '📜',
    subject: 'Design',
    lessonsCount: 10
  }
];
