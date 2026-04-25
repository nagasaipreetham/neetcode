# Implementation Plan: Problem Solve Page Rebuild

## Overview

This implementation plan breaks down the rebuild of the Problem Solve Page into discrete, actionable coding tasks. The rebuild creates a three-panel resizable layout (Description | Code Editor | Test Cases) with drag-to-resize functionality, tab navigation, Monaco Editor integration, and full theme support.

The implementation follows an incremental approach where each task builds on previous work, with checkpoints to validate progress. All tasks focus on modifying only `ProblemSolvePage.jsx` and `ProblemSolvePage.css`.

## Tasks

- [x] 1. Set up basic three-panel layout structure
  - Create main layout container with flexbox display
  - Add three panel sections (left, middle, right) with default widths
  - Add resize handle divs between panels
  - Apply basic CSS styling for layout structure
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

- [ ]* 1.1 Write unit tests for initial layout rendering
  - Test that three panels render with correct default widths (35%, 40%, 25%)
  - Test that resize handles render between panels
  - Test that layout fills viewport height minus navigation
  - _Requirements: 1.1, 9.1, 9.2, 9.3_

- [x] 2. Implement resize handle drag functionality
  - [x] 2.1 Create state management for panel widths and drag state
    - Add useState hooks for leftWidth, middleWidth, rightWidth
    - Add useState hooks for isDragging and activeHandle
    - Initialize with default widths (35%, 40%, 25%)
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

  - [x] 2.2 Implement mousedown handler for resize handles
    - Create handleResizeStart function that sets drag state
    - Attach document-level mousemove and mouseup listeners
    - Prevent text selection during drag (userSelect: 'none')
    - Set document cursor to 'col-resize'
    - _Requirements: 5.4, 8.2, 8.3, 13.1_

  - [x] 2.3 Implement mousemove handler for width calculation
    - Create handleMouseMove function that calculates new widths
    - Calculate mouse position relative to container
    - Update panel widths based on which handle is being dragged
    - Enforce minimum width constraints (20%, 30%, 20%)
    - Ensure widths always sum to 100%
    - _Requirements: 5.5, 6.1, 6.2, 6.3, 6.4, 6.5, 13.3, 13.4_

  - [x] 2.4 Implement mouseup handler for cleanup
    - Create handleMouseUp function that clears drag state
    - Remove document-level event listeners
    - Restore default cursor and text selection
    - _Requirements: 5.6, 13.2, 13.5_

  - [x] 2.5 Add cursor feedback for resize handles
    - Apply 'col-resize' cursor on resize handle hover
    - Apply 'col-resize' cursor to document body during drag
    - _Requirements: 5.3, 7.4, 7.5, 14.1, 14.2_

- [ ]* 2.6 Write integration tests for resize functionality
  - Test that dragging left handle updates left and middle panel widths
  - Test that dragging right handle updates middle and right panel widths
  - Test that minimum width constraints are enforced
  - Test that widths always sum to 100%
  - Test that event listeners are cleaned up on unmount
  - _Requirements: 5.4, 5.5, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 13.5_

- [x] 3. Style resize handles with theme integration
  - [x] 3.1 Apply CSS styling to resize handles
    - Set width to 4px
    - Use CSS variable for default background color
    - Add hover state with accent color (#22c55e)
    - Add transition for smooth color change
    - Set z-index to ensure handles are clickable
    - _Requirements: 7.1, 7.2, 7.3, 7.6, 10.4_

  - [x] 3.2 Test resize handle visual states
    - Verify default state uses theme background color
    - Verify hover state shows accent color
    - Verify cursor changes on hover
    - _Requirements: 7.2, 7.3, 7.4, 7.5_

- [x] 4. Checkpoint - Ensure resize functionality works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement left panel tab navigation
  - [x] 5.1 Create tab navigation component structure
    - Add state for active tab (default: 'description')
    - Create tab button elements for Description, Editorial, Solutions, Submissions
    - Add icons from lucide-react (FileText, Lightbulb, etc.)
    - Add tab dividers between tabs
    - _Requirements: 2.1, 2.2_

  - [x] 5.2 Style tab navigation with active indicators
    - Apply CSS for tab layout and spacing
    - Add hover states for tabs
    - Add active tab indicator (bottom border with accent color)
    - Use CSS variables for theme-appropriate colors
    - _Requirements: 2.3, 10.3, 12.5_

  - [x] 5.3 Implement tab click handlers
    - Create setLeftActiveTab function to update active tab state
    - Wire up onClick handlers for each tab button
    - _Requirements: 2.2_

- [ ]* 5.4 Write unit tests for left panel tab navigation
  - Test that clicking Description tab shows description content
  - Test that clicking Editorial tab shows editorial content
  - Test that active tab has visual indicator
  - Test that only one tab is active at a time
  - _Requirements: 2.2, 2.3_

- [x] 6. Implement left panel content rendering
  - [x] 6.1 Create Description tab content
    - Add problem title with styling
    - Add difficulty tag (Easy/Medium/Hard) with color coding
    - Add topic tags as chips
    - Add problem statement with proper formatting
    - Add examples section with input/output/explanation
    - Add constraints section
    - _Requirements: 2.4, 12.1_

  - [x] 6.2 Add placeholder content for other tabs
    - Create Editorial tab placeholder
    - Create Solutions tab placeholder
    - Create Submissions tab placeholder
    - _Requirements: 2.1_

  - [x] 6.3 Implement vertical scrolling for left panel
    - Set overflow-y: auto on content area
    - Add custom scrollbar styling using CSS variables
    - Ensure tab header remains fixed during scroll
    - _Requirements: 2.5, 2.6_

- [ ]* 6.4 Write unit tests for left panel content
  - Test that Description tab renders problem title and statement
  - Test that content area scrolls when content exceeds height
  - Test that tab header remains fixed during scroll
  - _Requirements: 2.4, 2.5, 2.6_

- [x] 7. Implement middle panel editor header
  - [x] 7.1 Create editor header structure
    - Add header container with left and right control sections
    - Add language selector dropdown
    - Add reset button with RotateCcw icon
    - Add settings button with Settings icon
    - _Requirements: 3.2, 3.5, 3.6_

  - [x] 7.2 Style editor header
    - Apply CSS for header layout and spacing
    - Style language selector dropdown
    - Style action buttons with hover states
    - Use CSS variables for theme colors
    - _Requirements: 10.3, 12.3_

  - [x] 7.3 Implement language selector functionality
    - Add state for selected language (default: 'python3')
    - Create handleLanguageChange function
    - Add options for Python3, Java, C++, JavaScript
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 7.4 Implement reset button functionality
    - Create handleReset function to restore default code template
    - Store default code templates for each language
    - _Requirements: 3.5_

  - [x] 7.5 Implement settings button (placeholder)
    - Create handleSettings function (placeholder for future)
    - _Requirements: 3.6_

- [ ]* 7.6 Write unit tests for editor header
  - Test that language selector renders with correct options
  - Test that changing language updates state
  - Test that reset button restores default code
  - Test that all buttons have correct hover states
  - _Requirements: 3.2, 3.3, 3.4, 3.5_

- [x] 8. Integrate Monaco Editor
  - [x] 8.1 Import and configure Monaco Editor component
    - Import Editor from @monaco-editor/react
    - Add state for code content
    - Configure editor options (minimap, fontSize, lineNumbers, etc.)
    - _Requirements: 3.1, 3.7_

  - [x] 8.2 Wire up editor with language and theme
    - Create getMonacoLanguage helper function to map language to Monaco language ID
    - Pass language prop to Editor component
    - Pass theme prop based on app theme ('vs-dark' or 'light')
    - Wire up onChange handler to update code state
    - _Requirements: 3.4, 10.2_

  - [x] 8.3 Ensure editor fills middle panel height
    - Set editor height to 100%
    - Enable automaticLayout option for responsive resizing
    - _Requirements: 3.7, 8.5_

- [ ]* 8.4 Write integration tests for Monaco Editor
  - Test that editor renders with correct language
  - Test that editor theme matches app theme
  - Test that editor updates when language changes
  - Test that editor resizes when panel width changes
  - _Requirements: 3.1, 3.4, 8.5, 10.2_

- [x] 9. Checkpoint - Ensure editor integration works
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement right panel tab navigation
  - [x] 10.1 Create tab navigation component structure
    - Add state for active tab (default: 'testcase')
    - Create tab button elements for Testcase and Test Result
    - _Requirements: 4.1, 4.2_

  - [x] 10.2 Style tab navigation with active indicators
    - Apply CSS for tab layout and spacing
    - Add hover states for tabs
    - Add active tab indicator (bottom border with accent color)
    - Use CSS variables for theme-appropriate colors
    - _Requirements: 4.2, 10.3, 12.5_

  - [x] 10.3 Implement tab click handlers
    - Create setRightActiveTab function to update active tab state
    - Wire up onClick handlers for each tab button
    - _Requirements: 4.2_

- [ ]* 10.4 Write unit tests for right panel tab navigation
  - Test that clicking Testcase tab shows testcase content
  - Test that clicking Test Result tab shows result content
  - Test that active tab has visual indicator
  - Test that only one tab is active at a time
  - _Requirements: 4.1, 4.2_

- [x] 11. Implement right panel content rendering
  - [x] 11.1 Create Testcase tab content
    - Add input field labels and text inputs for test parameters
    - Style input fields with theme colors
    - Add example test case data
    - _Requirements: 4.3, 12.4_

  - [x] 11.2 Create Test Result tab content
    - Add output display area
    - Add expected vs actual comparison sections
    - Add pass/fail status indicator
    - Style result display with theme colors
    - _Requirements: 4.4, 12.4_

  - [x] 11.3 Implement vertical scrolling for right panel
    - Set overflow-y: auto on content area
    - Add custom scrollbar styling using CSS variables
    - Ensure tab header remains fixed during scroll
    - _Requirements: 4.5, 4.6_

- [ ]* 11.4 Write unit tests for right panel content
  - Test that Testcase tab renders input fields
  - Test that Test Result tab renders output display
  - Test that content area scrolls when content exceeds height
  - Test that tab header remains fixed during scroll
  - _Requirements: 4.3, 4.4, 4.5, 4.6_

- [x] 12. Implement theme integration
  - [x] 12.1 Apply CSS variables throughout component
    - Use --auth-bg for panel backgrounds
    - Use --auth-nav-bg for header backgrounds
    - Use --auth-text for primary text
    - Use --auth-text-muted for secondary text
    - Use --auth-hover-bg for hover states
    - Use --auth-accent-bg for accent backgrounds
    - _Requirements: 10.1, 10.3, 10.4_

  - [x] 12.2 Implement Monaco Editor theme switching
    - Get theme from ThemeContext
    - Map app theme to Monaco theme ('vs-dark' or 'light')
    - Pass theme prop to Editor component
    - _Requirements: 10.2_

  - [x] 12.3 Test theme switching
    - Verify all components update when theme changes
    - Test dark theme appearance
    - Test light theme appearance
    - Verify Monaco editor theme switches correctly
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [ ]* 12.4 Write integration tests for theme switching
  - Test that CSS variables are applied correctly
  - Test that Monaco editor theme updates with app theme
  - Test that all interactive elements have correct hover states in both themes
  - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

- [x] 13. Add cursor feedback for all interactive elements
  - [x] 13.1 Apply cursor styles to interactive elements
    - Set 'pointer' cursor for tab buttons
    - Set 'pointer' cursor for dropdown and buttons
    - Set 'text' cursor for Monaco editor
    - Set 'col-resize' cursor for resize handles
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5_

  - [x] 13.2 Test cursor feedback
    - Verify cursor changes on hover for all interactive elements
    - Verify cursor changes during resize drag
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

- [x] 14. Optimize resize performance
  - [x] 14.1 Implement throttling for mousemove events
    - Create throttle utility function (16ms delay for 60fps)
    - Apply throttling to handleMouseMove
    - _Requirements: 8.1_

  - [x] 14.2 Test resize performance
    - Verify resize updates occur at 60fps
    - Verify no memory leaks from event listeners
    - Test resize with large content in panels
    - _Requirements: 8.1, 8.5_

- [x] 15. Add smooth transitions and polish
  - [x] 15.1 Add CSS transitions for hover states
    - Add transition for tab hover states
    - Add transition for button hover states
    - Add transition for resize handle hover states
    - _Requirements: 7.3_

  - [x] 15.2 Verify mockup compliance
    - Compare implementation with mockup images
    - Verify spacing and proportions match mockup
    - Verify colors and styling match mockup
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

- [x] 16. Final checkpoint - Comprehensive testing
  - [x] 16.1 Manual testing across browsers
    - Test in Chrome
    - Test in Firefox
    - Test in Safari
    - Test in Edge
    - _Requirements: All_

  - [x] 16.2 Manual testing of all features
    - Test resize functionality with various drag patterns
    - Test tab navigation in both panels
    - Test language selector and code editing
    - Test theme switching
    - Test with different screen sizes (1024px and wider)
    - _Requirements: All_

  - [x] 16.3 Verify no regressions
    - Ensure ProblemNav component still works
    - Ensure routing still works correctly
    - Ensure no console errors or warnings
    - Verify component integrates with AuthLayout
    - _Requirements: 11.6, 11.7_

- [x] 17. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- All implementation tasks build on previous work in a logical sequence
- Focus is on unit tests and integration tests (no property-based tests needed for UI layout)
- The implementation is isolated to ProblemSolvePage.jsx and ProblemSolvePage.css only

## Implementation Context

**Files to modify:**
- `src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx`
- `src/authenticated/pages/ProblemSolve/ProblemSolvePage.css`

**Dependencies:**
- @monaco-editor/react (already installed)
- lucide-react (already installed)
- react-router-dom (already installed)

**Theme integration:**
- Use ThemeContext from AuthLayout.jsx
- Use CSS variables from AuthLayout.css

**Key constraints:**
- Do not modify any other component files
- Maintain compatibility with existing routing
- Use existing Monaco Editor package
- Support modern browsers (Chrome, Firefox, Safari, Edge)
