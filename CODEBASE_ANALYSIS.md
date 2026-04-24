# NeetCode Platform - Codebase Analysis

## 📋 Overview
This is a **React + Vite** application for a coding interview preparation platform (NeetCode). The application features a modern, clean design with smooth animations, dark/light theme support, and a comprehensive learning ecosystem.

---

## 🏗️ Architecture

### **Tech Stack**
- **Framework**: React 19.2.4 with React Router DOM 7.13.2
- **Build Tool**: Vite 8.0.1
- **Styling**: Custom CSS with CSS Variables (no Tailwind despite package.json)
- **Animations**: Framer Motion 12.38.0, GSAP 3.14.2
- **Smooth Scrolling**: Lenis 1.3.23
- **Code Editor**: Monaco Editor (@monaco-editor/react 4.7.0)
- **3D Graphics**: Three.js with React Three Fiber
- **UI Components**: Lucide React icons, HeroUI components

### **Project Structure**
```
src/
├── components/          # Public-facing landing page components
│   ├── Hero/           # Hero section with typing animation
│   ├── Navbar/         # Public navigation
│   ├── Footer/         # Public footer
│   ├── Courses/        # Course carousel section
│   ├── CompanyOrbit/   # 3D rotating company logos
│   ├── FeaturesGrid/   # Stats/features grid
│   ├── PageMenu/       # Custom scroll indicator
│   └── [20+ more]      # Various UI components
│
├── authenticated/       # Authenticated user area
│   ├── AuthLayout.jsx  # Main authenticated wrapper
│   ├── layouts/        # Layout components
│   │   └── PracticeLayout.jsx  # 3-column layout (sidebar + content + streak)
│   ├── components/     # Auth-specific components
│   │   ├── Navbar/     # Authenticated navbar
│   │   ├── Sidebar/    # Tree navigation sidebar
│   │   ├── Calendar/   # Streak calendar
│   │   ├── Dashboard/  # Problem dashboard
│   │   └── [more]
│   ├── pages/          # Authenticated pages
│   │   ├── Practice/   # Problem list page
│   │   ├── ProblemSolve/ # Code editor page
│   │   ├── Company/    # Company-tagged problems
│   │   └── [more]
│   └── data/           # Static data files
│
├── pages/              # Public pages (Privacy, Terms, etc.)
├── hooks/              # Custom React hooks
├── data/               # Public data (courses, etc.)
└── assets/             # Images, logos (64 files)
```

---

## 🎨 Design System

### **Color Palette**
```css
/* Light Theme (Default) */
--bg-color: #F5F9FF;           /* Soft blue-white background */
--text-color: #0f172a;         /* Dark slate text */
--accent: #0562EF;             /* Primary blue */
--accent-hover: #0450cc;       /* Darker blue */
--border: #e2e8f0;             /* Light gray borders */
--card-bg: #ffffff;            /* White cards */
--text-muted: #64748b;         /* Muted gray text */

/* Dark Theme (Authenticated) */
--auth-bg: #111111;            /* Near-black */
--auth-nav-bg: #1a1a1a;        /* Slightly lighter */
--auth-text: #ffffff;          /* White text */
--auth-text-muted: #a0a0a0;    /* Gray text */
```

### **Typography**
- **Font Family**: 'Space Grotesk' (Google Fonts)
- **Weights**: 300-700 (variable)
- **Hierarchy**:
  - Hero: 72-96px, weight 800
  - Section Titles: 40-52px, weight 700
  - Body: 15-18px, weight 400
  - Labels: 12px, weight 500, uppercase

### **Spacing & Layout**
- Max content width: 1200-1450px (centered)
- Section padding: 6rem vertical, 2rem horizontal
- Grid system: Flexbox and CSS Grid
- Border radius: 6-16px (rounded corners)

---

## 🧩 Key Components

### **1. Landing Page Components**

#### **Hero Section** (`src/components/Hero/Hero.jsx`)
- **Features**:
  - Animated typing caption with TextType component
  - BlurText for staggered word animations
  - CountUp animation for statistics
  - HierarchyFlow tree visualization (DSA roadmap)
  - Badge pill with pulsing dot
- **Layout**: 2-column (60/40 split), stacks on mobile
- **Stats**: "1M+ Prepared Engineers", "1000+ Problems"

#### **CompanyOrbit** (`src/components/CompanyOrbit/CompanyOrbit.jsx`)
- **3D rotating carousel** of company logos (Google, Meta, Amazon, etc.)
- Draggable with mouse/touch
- Uses Framer Motion for smooth rotation
- 7 companies distributed evenly in 3D space

#### **CoursesLanding** (`src/components/Courses/CoursesLanding.jsx`)
- **Carousel with blue transition overlay**
- 5 course categories: DSA, System Design, Python, Full Stack, OOD
- Animated card transitions with blur effects
- Dot navigation + arrow buttons
- Page counter (1/5, 2/5, etc.)

#### **PageMenu** (`src/components/PageMenu/PageMenu.jsx`)
- **Custom scroll indicator** (right side, desktop)
- Vertical line with draggable thumb
- Animated section labels (vertical text)
- Mobile: bottom pill navigation bar
- Hides default browser scrollbar

#### **FeaturesGrid** (`src/components/FeaturesGrid/FeaturesGrid.jsx`)
- 4-card grid with stats:
  - 2,500+ Problems
  - 1M+ Active Learners
  - 85% Success Rate
  - <300ms Response Time
- Each card has icon, label, title, subtitle, description

### **2. Authenticated Components**

#### **AuthLayout** (`src/authenticated/AuthLayout.jsx`)
- Wrapper for all authenticated pages
- Dark/light theme toggle
- Auto-hiding navbar on scroll down
- Outlet for nested routes

#### **PracticeLayout** (`src/authenticated/layouts/PracticeLayout.jsx`)
- **3-column layout**:
  1. **Left**: AuthSidebar (tree navigation)
  2. **Middle**: Page content (Outlet)
  3. **Right**: Streak panel (calendar + stats)
- Sidebars scroll independently
- Right panel has `data-lenis-prevent` to disable smooth scroll

#### **AuthSidebar** (`src/authenticated/components/Sidebar/AuthSidebar.jsx`)
- **Two tabs**: Practice | Courses
- **Practice tree**:
  - Coding Interviews (Problems, Company Tagged, Cheatsheets, Quizes)
  - System Design
  - Machine Learning
  - Low Level Design
  - Databases
- **Courses tree**:
  - DSA, System Design, Python, Full Stack, OOD
  - Expands to show lesson tree when inside a course
- **Lesson tree mode**:
  - Back button to course list
  - Progress circle (completed/total)
  - Collapsible sections
  - Lesson items with duration, FREE tag, completion checkmark

#### **PracticePage** (`src/authenticated/pages/Practice/PracticePage.jsx`)
- **Problem list with filters**:
  - Difficulty: All, Easy, Medium, Hard
  - Status: All, Solved, Attempted, Not Started
  - Search bar
- **Two modes**:
  1. **Normal lists** (Blind 75, NeetCode 150, etc.):
     - 4-column table: Status | Problem | Difficulty | Solution
     - Category sidebar (Arrays & Hashing, Two Pointers, etc.)
     - Progress bars per category
  2. **Core Skills**:
     - Data Structures vs Algorithms tabs
     - 3-column table (no Solution column)
     - Topic-based filtering
- **List selector**: Dropdown with emoji icons
- **Dashboard**: ProblemDashboard component (top right)

#### **ProblemSolvePage** (`src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx`)
- **Split-pane layout**:
  - **Left**: Problem description (tabs: Description, Editorial, Solutions, Submissions)
  - **Right**: Code editor + console (stacked vertically)
- **Monaco Editor** with theme toggle
- Language selector (Python, Java, C++, JavaScript)
- Test case input panel
- Run + Submit buttons

#### **StreakCalendar** (`src/authenticated/components/Calendar/StreakCalendar.jsx`)
- **Monthly calendar view** with streak visualization
- Color-coded cells:
  - Streak days (gradient background)
  - Break days (red border)
  - Today (special highlight)
  - Future days (muted)
- Countdown timer to midnight
- Month navigation (prev/next)
- Fake data with multiple streak ranges

---

## 🎭 Animation & Interactions

### **Scroll Animations**
- **Lenis smooth scrolling** (disabled on `/practice` routes)
- **IntersectionObserver** for scroll-reveal animations
- **useScrollReveal** hook for fade-in effects
- **GSAP** for complex timeline animations

### **Framer Motion Patterns**
1. **Stagger children**: Hero section elements
2. **Exit animations**: Course carousel transitions
3. **Hover effects**: Scale, translateY, color changes
4. **Drag gestures**: CompanyOrbit rotation
5. **Layout animations**: Sidebar expand/collapse

### **Custom Animations**
- **BlurText**: Word-by-word or character-by-character blur-in
- **CountUp**: Animated number counting with spring physics
- **TextType**: Typewriter effect with cursor
- **HierarchyFlow**: DSA tree with connecting lines (SVG paths)

---

## 📊 Data Structure

### **Courses Data** (`src/data/coursesData.js`)
```javascript
{
  id: 'dsa',
  title: 'Data Structures & Algorithms',
  description: '...',
  cards: [
    {
      title: 'Algorithms & Data Structures for Beginners',
      hours: '25 Hours',
      difficulty: 'Medium',
      lessons: 45,
      images: [img1, img2],
      variant: 'duo', // or 'trio', 'grid4', 'grid6'
      link: 'https://...'
    }
  ]
}
```

### **Problem Data** (`src/authenticated/pages/Practice/PracticePage.jsx`)
```javascript
{
  id: 1,
  name: 'Two Sum',
  category: 'Arrays & Hashing',
  difficulty: 'Easy',
  status: 'Solved', // or 'Attempted', 'Not Started'
  lists: ['blind75', 'neetcode150', 'neetcode250', 'neetcodeall'],
  topics: ['Array', 'Hash Table']
}
```

### **Core Skills Data** (`src/authenticated/data/coreSkillsData.js`)
```javascript
{
  dataStructures: {
    label: 'Data Structures',
    topics: [
      {
        name: 'Implement Data Structures',
        solved: 0,
        total: 9,
        problems: [...]
      }
    ]
  },
  algorithms: { ... }
}
```

---

## 🎯 Routing Structure

```
/ ──────────────────────────── Landing Page
├── /privacy ──────────────── Privacy Policy
├── /terms ────────────────── Terms of Service
├── /courses ──────────────── Courses Page
├── /pro ──────────────────── Pro Subscription
├── /gift ─────────────────── Gift Page
│
└── [AuthLayout] ──────────── Authenticated wrapper
    ├── [PracticeLayout] ──── 3-column layout
    │   ├── /practice ────── Redirect to /practice/problems/neetcode150
    │   ├── /practice/problems/:listId ── Problem list
    │   ├── /practice/company ─────────── Company-tagged problems
    │   ├── /practice/company/:name ───── Specific company
    │   ├── /practice/cheatsheet ──────── Cheatsheets (placeholder)
    │   ├── /practice/quizes ──────────── Quizes (placeholder)
    │   ├── /practice/system-design ───── System design problems
    │   ├── /practice/machine-learning ── ML problems
    │   ├── /practice/machine-learning/project ── ChatGPT project
    │   ├── /practice/low-level-design ── LLD problems
    │   ├── /practice/databases ───────── Database problems
    │   ├── /practice/problem-list/:topicId ── Topic-specific list
    │   ├── /course ───────────────────── Course landing
    │   └── /course/:category/:name/:lessonId ── Lesson view
    │
    └── /problems/:problemId ──────────── Problem solver (fullscreen)
```

---

## 🔧 Custom Hooks

### **useLenis** (`src/hooks/useLenis.js`)
- Initializes Lenis smooth scrolling
- **Disabled** on `/practice` routes (for better performance)
- Cleans up on route change

### **useScrollReveal** (used in LandingPage)
- IntersectionObserver wrapper
- Adds `.scroll-reveal` class for CSS animations
- Configurable threshold

---

## 🎨 Styling Patterns

### **CSS Architecture**
- **Component-scoped CSS** (one CSS file per component)
- **CSS Variables** for theming
- **BEM-like naming** (e.g., `.hero-btn-pro`, `.practice-problem-row`)
- **No CSS-in-JS** (pure CSS files)

### **Responsive Breakpoints**
```css
@media (max-width: 768px)  { /* Mobile */ }
@media (max-width: 1100px) { /* Tablet */ }
```

### **Common Patterns**
1. **Glass morphism**: `backdrop-filter: blur(16px)`
2. **Hover lift**: `transform: translateY(-2px)`
3. **Smooth transitions**: `transition: all 0.2s ease`
4. **Gradient text**: `background: linear-gradient(...); -webkit-background-clip: text`
5. **Pill buttons**: `border-radius: 100px`

---

## 🚀 Performance Optimizations

1. **Code splitting**: React Router lazy loading (not yet implemented)
2. **Memo components**: `React.memo` for Section wrapper
3. **useMemo/useCallback**: Filtered problem lists, position calculations
4. **Lenis disabled on practice**: Reduces overhead on data-heavy pages
5. **IntersectionObserver**: Lazy animation triggers
6. **requestAnimationFrame**: Smooth canvas animations (ShapeGrid)

---

## 🔐 Authentication & State

- **No auth implementation yet** (Sign In popup is UI-only)
- **LocalStorage** for completed lessons tracking
- **URL-based state**: Active list, filters, current lesson
- **No global state management** (React Context or Redux)

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 19.2.4 | UI framework |
| react-router-dom | 7.13.2 | Routing |
| framer-motion | 12.38.0 | Animations |
| gsap | 3.14.2 | Timeline animations |
| lenis | 1.3.23 | Smooth scrolling |
| @monaco-editor/react | 4.7.0 | Code editor |
| three | 0.183.2 | 3D graphics |
| lucide-react | 1.7.0 | Icons |

---

## 🎯 Design Philosophy

### **Inspired by Supermemory Design** (from design.md)
- **"Intelligent Dark Matter"** aesthetic
- **Industrial-minimal** with editorial tension
- **Single neon accent** (#00FFA3 in design.md, #0562EF in implementation)
- **Extreme whitespace** vs dense information
- **Numbered sections** with labels (e.g., `[01 / CONTEXT STACK]`)
- **Terminal/code aesthetic** (monospace fonts, code blocks)
- **Subtle animations** (entrance only, no looping distractions)

### **Actual Implementation**
- Uses **#0562EF blue** instead of mint green
- **Softer, friendlier** than design.md (less brutalist)
- **Space Grotesk** font (not Neue Machina)
- **Light theme default** (design.md is dark-first)
- **More playful** (emojis, 3D orbit, typing animations)

---

## 🐛 Known Issues / TODOs

1. **No authentication** (Sign In is UI-only)
2. **Placeholder pages** (Cheatsheets, Quizes)
3. **Hardcoded problem data** (no backend API)
4. **No test coverage**
5. **Tailwind in package.json** but not used
6. **Some routes redirect to external neetcode.io**
7. **Lesson completion** stored in localStorage (not synced)

---

## 🎨 UI Components Inventory

### **Reusable Components**
- **BlurText**: Animated text reveal
- **CountUp**: Number animation
- **TextType**: Typewriter effect
- **CustomCursor**: Custom mouse cursor
- **ScrollToTop**: Auto-scroll on route change
- **ShapeGrid**: Animated background grid (canvas)
- **SpotlightCard**: Card with spotlight effect
- **StarBorder**: Animated border effect
- **BorderGlow**: Glowing border animation
- **GradientText**: Gradient text effect
- **FuzzyText**: Fuzzy/glitch text effect

### **Layout Components**
- **Navbar**: Public navigation
- **AuthNavbar**: Authenticated navigation
- **Footer**: Public footer
- **AuthFooter**: Authenticated footer
- **PageMenu**: Scroll indicator + mobile nav
- **AuthSidebar**: Tree navigation
- **PracticeLayout**: 3-column layout

### **Feature Components**
- **Hero**: Landing hero section
- **CompanyOrbit**: 3D company logos
- **CoursesLanding**: Course carousel
- **FeaturesGrid**: Stats grid
- **Reviews**: Testimonials
- **AboutSection**: Founder story
- **PracticeSection**: Practice CTA
- **HierarchyFlow**: DSA tree visualization
- **StreakCalendar**: Streak tracking calendar
- **ProblemDashboard**: Problem stats dashboard
- **TopicChips**: Topic filter chips
- **CompanyTagsPanel**: Company filter panel

---

## 📝 File Naming Conventions

- **Components**: PascalCase (e.g., `Hero.jsx`, `AuthNavbar.jsx`)
- **Styles**: Same name as component (e.g., `Hero.css`)
- **Hooks**: camelCase with `use` prefix (e.g., `useLenis.js`)
- **Data**: camelCase (e.g., `coursesData.js`, `coreSkillsData.js`)
- **Pages**: PascalCase with `Page` suffix (e.g., `PracticePage.jsx`)

---

## 🎯 Key Features Summary

### **Public Site**
✅ Smooth scrolling with Lenis  
✅ Custom scroll indicator  
✅ 3D company orbit  
✅ Animated course carousel  
✅ Typing hero animation  
✅ Stats with count-up  
✅ Responsive design  
✅ Glass morphism navbar  

### **Authenticated Area**
✅ Dark/light theme toggle  
✅ 3-column practice layout  
✅ Tree navigation sidebar  
✅ Streak calendar  
✅ Problem filtering  
✅ Monaco code editor  
✅ Split-pane problem solver  
✅ Lesson progress tracking  
✅ Company-tagged problems  
✅ Core Skills section  

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

---

## 📚 Additional Notes

- **Design document** (`design.md`) describes a Supermemory-inspired redesign that is **partially implemented**
- **Actual design** is softer, more colorful, and user-friendly than the design doc
- **No backend** - all data is hardcoded in JS files
- **External links** - some routes redirect to neetcode.io (the real site)
- **Monaco Editor** - full-featured code editor with syntax highlighting
- **Three.js** - used for 3D company orbit (via React Three Fiber)

---

**Last Updated**: Based on codebase analysis on 2026-04-24
