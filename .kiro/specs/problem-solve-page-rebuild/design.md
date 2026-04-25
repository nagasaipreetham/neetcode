# Design Document: Problem Solve Page Rebuild

## Overview

This document provides the technical design for rebuilding the Problem Solve Page with a three-panel resizable layout. The rebuild creates a modern, LeetCode-inspired interface where users can view problem descriptions, write code, and test their solutions in three horizontally arranged panels with draggable resize handles.

### Design Goals

1. **Intuitive Layout**: Three-panel horizontal layout with clear visual separation
2. **Flexible Workspace**: User-adjustable panel widths via drag-and-drop resize handles
3. **Smooth Interactions**: 60fps resize performance with proper event handling
4. **Theme Consistency**: Full integration with existing dark/light theme system
5. **Component Isolation**: Changes limited to ProblemSolvePage.jsx and ProblemSolvePage.css only

### Key Features

- Three resizable panels (Description | Code Editor | Test Cases)
- Drag-to-resize functionality with minimum width constraints
- Tab navigation in left and right panels
- Monaco Editor integration with language selection
- Theme-aware styling using CSS variables
- Responsive cursor feedback during interactions

## Architecture

### High-Level Component Structure

```
ProblemSolvePage (root container)
├── ProblemNav (existing component - not modified)
└── Main Layout Container
    ├── LeftPanel (Description, Editorial, Solutions, Submissions)
    │   ├── TabNavigation
    │   └── ContentArea (scrollable)
    ├── ResizeHandle (horizontal, left-middle)
    ├── MiddlePanel (Code Editor)
    │   ├── EditorHeader (language selector, reset, settings)
    │   └── MonacoEditor
    ├── ResizeHandle (horizontal, middle-right)
    └── RightPanel (Testcase, Test Result)
        ├── TabNavigation
        └── ContentArea (scrollable)
```

### State Management

The component uses React hooks for state management:

```javascript
// Panel width state (percentages)
const [leftWidth, setLeftWidth] = useState(35);
const [middleWidth, setMiddleWidth] = useState(40);
const [rightWidth, setRightWidth] = useState(25);

// Tab navigation state
const [leftActiveTab, setLeftActiveTab] = useState('description');
const [rightActiveTab, setRightActiveTab] = useState('testcase');

// Drag state
const [isDragging, setIsDragging] = useState(false);
const [activeHandle, setActiveHandle] = useState(null); // 'left' | 'right' | null

// Editor state
const [code, setCode] = useState(defaultCodeTemplate);
const [language, setLanguage] = useState('python3');

// Theme from context
const { theme, toggleTheme } = useTheme();
```

### Data Flow

1. **Initial Render**: Component mounts with default panel widths (35%, 40%, 25%)
2. **User Interaction**: User clicks and drags a resize handle
3. **Event Capture**: mousedown event sets drag state and active handle
4. **Real-time Update**: mousemove events calculate new widths and update state
5. **Drag Complete**: mouseup event clears drag state and finalizes widths
6. **Re-render**: React updates panel styles with new width values

## Components and Interfaces

### Main Component: ProblemSolvePage

**Responsibilities:**
- Manage panel width state
- Handle resize drag events
- Coordinate tab navigation
- Integrate with Monaco Editor
- Apply theme styling

**Props:**
- None (uses route params via useParams hook)

**State:**
```typescript
interface ProblemSolvePageState {
  leftWidth: number;        // 20-80% range
  middleWidth: number;      // 30-80% range
  rightWidth: number;       // 20-80% range
  leftActiveTab: 'description' | 'editorial' | 'solutions' | 'submissions';
  rightActiveTab: 'testcase' | 'result';
  isDragging: boolean;
  activeHandle: 'left' | 'right' | null;
  code: string;
  language: 'python3' | 'java' | 'cpp' | 'javascript';
}
```

### Sub-Component: LeftPanel

**Structure:**
```jsx
<section className="problem-section left-panel" style={{ width: `${leftWidth}%` }}>
  <div className="pane-header">
    <TabButton active={leftActiveTab === 'description'} onClick={() => setLeftActiveTab('description')}>
      <FileText size={16} />
      <span>Description</span>
    </TabButton>
    <div className="tab-divider" />
    <TabButton active={leftActiveTab === 'editorial'} onClick={() => setLeftActiveTab('editorial')}>
      <Lightbulb size={16} />
      <span>Editorial</span>
    </TabButton>
    {/* ... more tabs */}
  </div>
  <div className="pane-content">
    {renderLeftContent()}
  </div>
</section>
```

**Content Rendering:**
- Description: Problem title, difficulty tag, topic tags, statement, examples, constraints
- Editorial: Official solution explanation (placeholder)
- Solutions: Community solutions (placeholder)
- Submissions: User submission history (placeholder)

### Sub-Component: MiddlePanel

**Structure:**
```jsx
<section className="problem-section middle-panel" style={{ width: `${middleWidth}%` }}>
  <div className="pane-header editor-header">
    <div className="editor-controls-left">
      <select className="lang-select" value={language} onChange={handleLanguageChange}>
        <option value="python3">Python3</option>
        <option value="java">Java</option>
        <option value="cpp">C++</option>
        <option value="javascript">JavaScript</option>
      </select>
      <button className="editor-action-btn" onClick={handleReset}>
        <RotateCcw size={14} />
      </button>
    </div>
    <div className="editor-controls-right">
      <button className="editor-action-btn" onClick={handleSettings}>
        <Settings size={14} />
      </button>
    </div>
  </div>
  <div className="editor-container">
    <Editor
      height="100%"
      language={getMonacoLanguage(language)}
      theme={theme === 'dark' ? 'vs-dark' : 'light'}
      value={code}
      onChange={setCode}
      options={editorOptions}
    />
  </div>
</section>
```

**Editor Configuration:**
```javascript
const editorOptions = {
  minimap: { enabled: false },
  fontSize: 14,
  lineNumbers: 'on',
  scrollBeyondLastLine: false,
  automaticLayout: true,
  tabSize: 4,
  wordWrap: 'off',
  folding: true,
  renderLineHighlight: 'all',
};
```

### Sub-Component: RightPanel

**Structure:**
```jsx
<section className="problem-section right-panel" style={{ width: `${rightWidth}%` }}>
  <div className="pane-header">
    <TabButton active={rightActiveTab === 'testcase'} onClick={() => setRightActiveTab('testcase')}>
      Testcase
    </TabButton>
    <TabButton active={rightActiveTab === 'result'} onClick={() => setRightActiveTab('result')}>
      Test Result
    </TabButton>
  </div>
  <div className="pane-content console-content">
    {renderRightContent()}
  </div>
</section>
```

**Content Rendering:**
- Testcase: Input fields for test parameters
- Test Result: Execution output, expected vs actual, pass/fail status

### Sub-Component: ResizeHandle

**Structure:**
```jsx
<div 
  className="resize-handle horizontal"
  onMouseDown={(e) => handleResizeStart(e, 'left')}
  style={{ cursor: 'col-resize' }}
/>
```

**Visual States:**
- Default: `background: var(--auth-hover-bg)`
- Hover: `background: #22c55e` (accent color)
- Active (dragging): Cursor changes to `col-resize` on document body

## Resize Functionality Implementation

### Event Handling Strategy

The resize functionality uses a three-phase event handling approach:

1. **Initialization (mousedown)**: Capture initial state and attach listeners
2. **Update (mousemove)**: Calculate and apply new widths in real-time
3. **Finalization (mouseup)**: Clean up listeners and finalize state

### Detailed Implementation

#### Phase 1: Resize Start (mousedown)

```javascript
const handleResizeStart = (e, handle) => {
  e.preventDefault();
  setIsDragging(true);
  setActiveHandle(handle);
  
  // Store initial mouse position and panel widths
  const initialX = e.clientX;
  const containerWidth = containerRef.current.offsetWidth;
  const initialLeftWidth = leftWidth;
  const initialMiddleWidth = middleWidth;
  const initialRightWidth = rightWidth;
  
  // Attach document-level listeners
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
  
  // Prevent text selection during drag
  document.body.style.userSelect = 'none';
  document.body.style.cursor = 'col-resize';
};
```

#### Phase 2: Resize Update (mousemove)

```javascript
const handleMouseMove = (e) => {
  if (!isDragging || !activeHandle) return;
  
  const container = containerRef.current;
  if (!container) return;
  
  const containerRect = container.getBoundingClientRect();
  const containerWidth = containerRect.width;
  const mouseX = e.clientX - containerRect.left;
  const mousePercent = (mouseX / containerWidth) * 100;
  
  if (activeHandle === 'left') {
    // Resizing between left and middle panels
    const newLeftWidth = Math.max(20, Math.min(80, mousePercent));
    const remainingWidth = 100 - newLeftWidth;
    const middleRatio = middleWidth / (middleWidth + rightWidth);
    const newMiddleWidth = Math.max(30, remainingWidth * middleRatio);
    const newRightWidth = Math.max(20, remainingWidth - newMiddleWidth);
    
    // Ensure minimum widths are respected
    if (newMiddleWidth >= 30 && newRightWidth >= 20) {
      setLeftWidth(newLeftWidth);
      setMiddleWidth(newMiddleWidth);
      setRightWidth(newRightWidth);
    }
  } else if (activeHandle === 'right') {
    // Resizing between middle and right panels
    const newRightWidth = Math.max(20, Math.min(80, 100 - mousePercent));
    const remainingWidth = 100 - newRightWidth;
    const leftRatio = leftWidth / (leftWidth + middleWidth);
    const newLeftWidth = Math.max(20, remainingWidth * leftRatio);
    const newMiddleWidth = Math.max(30, remainingWidth - newLeftWidth);
    
    // Ensure minimum widths are respected
    if (newLeftWidth >= 20 && newMiddleWidth >= 30) {
      setLeftWidth(newLeftWidth);
      setMiddleWidth(newMiddleWidth);
      setRightWidth(newRightWidth);
    }
  }
};
```

#### Phase 3: Resize End (mouseup)

```javascript
const handleMouseUp = () => {
  setIsDragging(false);
  setActiveHandle(null);
  
  // Remove document-level listeners
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
  
  // Restore default cursor and text selection
  document.body.style.userSelect = '';
  document.body.style.cursor = '';
};
```

### Width Constraint Logic

**Minimum Width Requirements:**
- Left Panel: 20% (prevents description from becoming unreadable)
- Middle Panel: 30% (ensures editor remains usable)
- Right Panel: 20% (maintains test case visibility)

**Constraint Enforcement:**
```javascript
const enforceConstraints = (left, middle, right) => {
  const MIN_LEFT = 20;
  const MIN_MIDDLE = 30;
  const MIN_RIGHT = 20;
  
  // Clamp values to minimum
  const clampedLeft = Math.max(MIN_LEFT, left);
  const clampedMiddle = Math.max(MIN_MIDDLE, middle);
  const clampedRight = Math.max(MIN_RIGHT, right);
  
  // Normalize to 100%
  const total = clampedLeft + clampedMiddle + clampedRight;
  return {
    left: (clampedLeft / total) * 100,
    middle: (clampedMiddle / total) * 100,
    right: (clampedRight / total) * 100,
  };
};
```

### Performance Optimization

**Throttling mousemove events:**
```javascript
const throttle = (func, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  };
};

// Apply throttling to mousemove handler (16ms = 60fps)
const throttledMouseMove = throttle(handleMouseMove, 16);
```

## CSS Layout Strategy

### Flexbox-Based Layout

The main layout uses CSS Flexbox for horizontal panel arrangement:

```css
.problem-solve-layout {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 56px); /* Full height minus nav */
  overflow: hidden;
  background: var(--auth-accent-bg);
}

.problem-section {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--auth-bg);
}

.left-panel {
  width: 35%; /* Default, overridden by inline style */
}

.middle-panel {
  width: 40%; /* Default, overridden by inline style */
}

.right-panel {
  width: 25%; /* Default, overridden by inline style */
}
```

### Resize Handle Styling

```css
.resize-handle {
  width: 4px;
  background: var(--auth-hover-bg);
  cursor: col-resize;
  transition: background 0.2s ease;
  z-index: 10;
  position: relative;
  flex-shrink: 0;
}

.resize-handle:hover {
  background: #22c55e;
}

.resize-handle:active {
  background: #16a34a;
}
```

### Panel Content Layout

```css
.pane-header {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  background: var(--auth-nav-bg);
  border-bottom: 1px solid var(--auth-hover-bg);
  flex-shrink: 0;
}

.pane-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 1.5rem;
}

/* Custom scrollbar styling */
.pane-content::-webkit-scrollbar {
  width: 8px;
}

.pane-content::-webkit-scrollbar-track {
  background: var(--auth-bg);
}

.pane-content::-webkit-scrollbar-thumb {
  background: var(--auth-hover-bg);
  border-radius: 4px;
}

.pane-content::-webkit-scrollbar-thumb:hover {
  background: var(--auth-text-muted);
}
```

### Tab Navigation Styling

```css
.tab {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0 0.75rem;
  height: 100%;
  font-size: 0.85rem;
  font-weight: 500;
  color: var(--auth-text-muted);
  cursor: pointer;
  position: relative;
  transition: color 0.2s ease;
}

.tab:hover {
  color: var(--auth-text);
}

.tab.active {
  color: var(--auth-text);
}

.tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: #22c55e;
}

.tab-divider {
  width: 1px;
  height: 20px;
  background: var(--auth-hover-bg);
  margin: 0 0.25rem;
}
```

## Theme Integration

### CSS Variable Usage

The design uses existing CSS variables from AuthLayout.css:

```css
/* Dark theme (default) */
--auth-bg: #111111;           /* Panel backgrounds */
--auth-nav-bg: #1a1a1a;       /* Header backgrounds */
--auth-text: #ffffff;         /* Primary text */
--auth-text-muted: #a0a0a0;   /* Secondary text */
--auth-hover-bg: rgba(255, 255, 255, 0.08); /* Hover states */
--auth-accent-bg: #2a2a2a;    /* Accent backgrounds */

/* Light theme */
--auth-bg: #f5f5f5;
--auth-nav-bg: #ffffff;
--auth-text: #111111;
--auth-text-muted: #666666;
--auth-hover-bg: rgba(0, 0, 0, 0.06);
--auth-accent-bg: #e8e8e8;
```

### Monaco Editor Theme Mapping

```javascript
const getMonacoTheme = (appTheme) => {
  return appTheme === 'dark' ? 'vs-dark' : 'light';
};

// Usage in Editor component
<Editor
  theme={getMonacoTheme(theme)}
  // ... other props
/>
```

### Dynamic Theme Updates

The component responds to theme changes via the ThemeContext:

```javascript
const { theme, toggleTheme } = useTheme();

useEffect(() => {
  // Monaco editor automatically updates when theme prop changes
  // CSS variables update automatically via data-theme attribute
}, [theme]);
```

## Error Handling

### Resize Boundary Validation

```javascript
const validateWidths = (left, middle, right) => {
  const total = left + middle + right;
  const tolerance = 0.1; // Allow 0.1% deviation
  
  if (Math.abs(total - 100) > tolerance) {
    console.error('Panel widths do not sum to 100%:', { left, middle, right, total });
    return false;
  }
  
  if (left < 20 || middle < 30 || right < 20) {
    console.warn('Panel width below minimum:', { left, middle, right });
    return false;
  }
  
  return true;
};
```

### Event Listener Cleanup

```javascript
useEffect(() => {
  // Cleanup function to remove listeners on unmount
  return () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
  };
}, []);
```

### Monaco Editor Error Handling

```javascript
const handleEditorMount = (editor, monaco) => {
  try {
    // Configure editor after mount
    editor.updateOptions(editorOptions);
  } catch (error) {
    console.error('Failed to configure Monaco editor:', error);
  }
};

const handleEditorError = (error) => {
  console.error('Monaco editor error:', error);
  // Fallback to textarea if Monaco fails
  setEditorFallback(true);
};
```

## Testing Strategy

### Unit Tests

**Component Rendering:**
- Test that all three panels render with correct initial widths
- Test that tab navigation renders with correct tabs
- Test that Monaco editor renders with correct configuration

**State Management:**
- Test that panel width state updates correctly
- Test that tab selection state updates correctly
- Test that code editor state updates correctly

**Width Constraints:**
- Test that minimum width constraints are enforced
- Test that widths always sum to 100%
- Test that invalid width values are rejected

### Integration Tests

**Resize Functionality:**
- Test that mousedown on resize handle initiates drag
- Test that mousemove updates panel widths
- Test that mouseup finalizes widths and cleans up listeners
- Test that dragging beyond viewport boundaries works correctly

**Tab Navigation:**
- Test that clicking tabs updates active tab state
- Test that tab content changes when active tab changes
- Test that tab indicators display correctly

**Theme Integration:**
- Test that theme changes update CSS variables
- Test that Monaco editor theme updates with app theme
- Test that all themed elements respond to theme changes

### Example-Based Tests

**Specific Resize Scenarios:**
```javascript
describe('Panel Resize', () => {
  it('should resize left panel from 35% to 50%', () => {
    // Simulate drag from 35% to 50% position
    // Verify left panel width is 50%
    // Verify middle and right panels adjust proportionally
  });
  
  it('should prevent left panel from shrinking below 20%', () => {
    // Simulate drag attempting to set left panel to 15%
    // Verify left panel width remains at 20%
  });
  
  it('should prevent middle panel from shrinking below 30%', () => {
    // Simulate drag attempting to set middle panel to 25%
    // Verify middle panel width remains at 30%
  });
});
```

**Tab Navigation:**
```javascript
describe('Tab Navigation', () => {
  it('should switch to Editorial tab when clicked', () => {
    // Click Editorial tab
    // Verify active tab is 'editorial'
    // Verify Editorial content is displayed
  });
  
  it('should switch to Test Result tab when clicked', () => {
    // Click Test Result tab
    // Verify active tab is 'result'
    // Verify Test Result content is displayed
  });
});
```

## Implementation Plan

### Phase 1: Layout Structure (Priority: High)

**Tasks:**
1. Create main layout container with flexbox
2. Implement three panel sections with default widths
3. Add resize handles between panels
4. Apply basic styling with CSS variables

**Acceptance:**
- Three panels render side-by-side
- Panels have correct default widths (35%, 40%, 25%)
- Resize handles are visible between panels

### Phase 2: Resize Functionality (Priority: High)

**Tasks:**
1. Implement mousedown handler for resize handles
2. Implement mousemove handler for width calculation
3. Implement mouseup handler for cleanup
4. Add width constraint enforcement
5. Add cursor feedback during drag

**Acceptance:**
- Dragging resize handles updates panel widths
- Minimum width constraints are enforced
- Cursor changes to col-resize during drag
- Widths always sum to 100%

### Phase 3: Left Panel Content (Priority: Medium)

**Tasks:**
1. Implement tab navigation component
2. Add Description tab content (problem statement, examples, constraints)
3. Add placeholder content for Editorial, Solutions, Submissions tabs
4. Style tab indicators and content area
5. Implement vertical scrolling for content

**Acceptance:**
- Four tabs render in left panel header
- Clicking tabs switches content
- Active tab has visual indicator
- Content scrolls vertically when needed

### Phase 4: Middle Panel Editor (Priority: High)

**Tasks:**
1. Integrate Monaco Editor component
2. Add language selector dropdown
3. Add reset and settings buttons
4. Configure editor options
5. Implement theme switching for editor

**Acceptance:**
- Monaco editor renders and is functional
- Language selector changes syntax highlighting
- Reset button restores default code
- Editor theme matches app theme

### Phase 5: Right Panel Content (Priority: Medium)

**Tasks:**
1. Implement tab navigation component
2. Add Testcase tab content (input fields)
3. Add Test Result tab content (output display)
4. Style tab indicators and content area
5. Implement vertical scrolling for content

**Acceptance:**
- Two tabs render in right panel header
- Clicking tabs switches content
- Active tab has visual indicator
- Content scrolls vertically when needed

### Phase 6: Theme Integration (Priority: Medium)

**Tasks:**
1. Apply CSS variables to all components
2. Test dark theme styling
3. Test light theme styling
4. Ensure Monaco editor theme switches correctly
5. Verify all interactive elements have correct hover states

**Acceptance:**
- All components use CSS variables
- Dark theme displays correctly
- Light theme displays correctly
- Theme switching works without page reload

### Phase 7: Polish and Optimization (Priority: Low)

**Tasks:**
1. Add smooth transitions for hover states
2. Optimize mousemove event handling (throttling)
3. Add keyboard shortcuts (optional)
4. Test responsive behavior
5. Add accessibility attributes

**Acceptance:**
- Hover transitions are smooth
- Resize performance is 60fps
- No memory leaks from event listeners
- Keyboard navigation works (if implemented)

### Phase 8: Testing and Validation (Priority: High)

**Tasks:**
1. Write unit tests for state management
2. Write integration tests for resize functionality
3. Write integration tests for tab navigation
4. Manual testing across browsers
5. Manual testing with different screen sizes

**Acceptance:**
- All unit tests pass
- All integration tests pass
- No console errors or warnings
- Works in Chrome, Firefox, Safari, Edge
- Works on screens 1024px and wider

## Dependencies

### External Libraries

- **@monaco-editor/react**: ^4.6.0 (already installed)
  - Purpose: Code editor component
  - Usage: Main code editing interface

- **lucide-react**: (already installed)
  - Purpose: Icon components
  - Usage: Tab icons, button icons

- **react-router-dom**: (already installed)
  - Purpose: Routing and navigation
  - Usage: useParams hook for problem ID

### Internal Dependencies

- **AuthLayout.jsx**: Provides ThemeContext
- **ProblemNav.jsx**: Navigation bar component (not modified)
- **AuthLayout.css**: CSS variable definitions

## Constraints and Assumptions

### Constraints

1. **File Scope**: Only modify ProblemSolvePage.jsx and ProblemSolvePage.css
2. **No Breaking Changes**: Must maintain compatibility with existing routing
3. **Theme System**: Must use existing CSS variables from AuthLayout
4. **Monaco Integration**: Must use existing @monaco-editor/react package
5. **Browser Support**: Must work in modern browsers (Chrome, Firefox, Safari, Edge)

### Assumptions

1. **Screen Size**: Designed for screens 1024px and wider (responsive design out of scope)
2. **Problem Data**: Problem content is hardcoded for now (API integration out of scope)
3. **Code Execution**: Run/Submit functionality is placeholder (backend integration out of scope)
4. **User Preferences**: Panel widths reset on page reload (persistence out of scope)
5. **Accessibility**: Basic accessibility (ARIA labels out of scope for initial implementation)

## Future Enhancements

### Potential Improvements (Out of Scope)

1. **Persistent Layout**: Save panel widths to localStorage
2. **Vertical Resize**: Add vertical resize between editor and console
3. **Panel Collapse**: Allow panels to collapse to minimum width
4. **Keyboard Shortcuts**: Add hotkeys for common actions
5. **Mobile Layout**: Responsive design for tablets and phones
6. **Split Editor**: Side-by-side code comparison
7. **Custom Themes**: User-selectable editor themes
8. **Font Size Control**: Adjustable editor font size
9. **Line Wrapping**: Toggle word wrap in editor
10. **Full Screen Mode**: Expand editor to full screen

## Mockup Compliance Checklist

### Layout Structure
- ✓ Three horizontal panels (Description | Code Editor | Test Cases)
- ✓ Resize handles between panels with hover effect
- ✓ Clean, modern UI similar to LeetCode

### Left Panel
- ✓ Tab navigation: Description, Editorial, Solutions, Submissions
- ✓ Active tab indicator (underline)
- ✓ Problem title, difficulty tag, topic tags
- ✓ Problem statement with examples and constraints
- ✓ Vertical scrolling for long content

### Middle Panel
- ✓ Language selector dropdown in header
- ✓ Reset button (rotate icon)
- ✓ Settings button (gear icon)
- ✓ Monaco editor with syntax highlighting
- ✓ Full height editor area

### Right Panel
- ✓ Tab navigation: Testcase, Test Result
- ✓ Active tab indicator
- ✓ Input fields for test parameters
- ✓ Clean, organized layout

### Visual Design
- ✓ Dark theme with proper contrast
- ✓ Light theme support
- ✓ Consistent spacing and padding
- ✓ Hover states for interactive elements
- ✓ Proper cursor feedback (col-resize, pointer, text)

### Interactions
- ✓ Smooth drag-to-resize
- ✓ Minimum width constraints
- ✓ Tab switching
- ✓ Theme switching
- ✓ Language selection

## Conclusion

This design provides a comprehensive blueprint for rebuilding the Problem Solve Page with a modern, resizable three-panel layout. The implementation focuses on smooth interactions, theme consistency, and maintainability while keeping changes isolated to the target component files. The design leverages existing patterns from the codebase (CSS variables, theme context, Monaco integration) to ensure consistency with the rest of the application.
