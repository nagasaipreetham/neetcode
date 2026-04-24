# Implementation Plan

## Phase 1: Exploration Tests (BEFORE Fix)

- [x] 1. Write bug condition exploration tests
  - **Property 1: Bug Condition** - UI Interaction Failures Across Seven Categories
  - **CRITICAL**: These tests MUST FAIL on unfixed code - failures confirm the bugs exist
  - **DO NOT attempt to fix the tests or the code when they fail**
  - **NOTE**: These tests encode the expected behavior - they will validate the fix when they pass after implementation
  - **GOAL**: Surface counterexamples that demonstrate each of the seven bug categories exists
  - **Manual Testing Approach**: Since these are UI interaction bugs, manual testing is most appropriate
  - Test implementation details from Bug Condition in design:
    - **Scrolling**: Navigate to problem with long description, attempt to scroll in left panel (expect: no scrolling occurs)
    - **Scrolling**: Add multiple test cases, attempt to scroll in console panel (expect: no scrolling occurs)
    - **Resize**: Drag horizontal resize handle rapidly (expect: jerky behavior)
    - **Resize**: Drag left panel to extreme right position (expect: right panel becomes unusable)
    - **Theme Toggle**: Click theme toggle in ProblemNav (expect: only editor changes theme, not entire page)
    - **Navbar Layout**: Inspect Run and Submit buttons (expect: incorrect icons/text display)
    - **Run Button**: Click Run button and observe for 3 seconds (expect: no yellow loading indicator)
    - **Tab Styling**: Inspect left panel tabs (expect: emojis instead of colored Lucide icons)
    - **Cursor**: Hover over navbar button text (expect: text cursor instead of pointer)
    - **Cursor**: Hover over navbar logo (expect: may show default cursor instead of pointer)
  - The test assertions should match the Expected Behavior Properties from design
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests FAIL (this is correct - it proves the bugs exist)
  - Document counterexamples found to understand root causes:
    - Which specific panels don't scroll
    - How resize handles behave incorrectly
    - What theme elements don't change
    - Which navbar elements have wrong styling
    - Whether Run button shows loading state
    - Which tab icons are emojis vs Lucide icons
    - Which elements show wrong cursor
  - Mark task complete when tests are written, run, and failures are documented
  - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.10, 1.11, 1.12, 1.13, 1.14, 1.15_

- [x] 2. Write preservation property tests (BEFORE implementing fix)
  - **Property 2: Preservation** - Non-Buggy Functionality Unchanged
  - **IMPORTANT**: Follow observation-first methodology
  - Observe behavior on UNFIXED code for non-buggy inputs (interactions NOT covered by the seven bug categories)
  - Test preservation requirements from design:
    - **Editor Functionality**: Type code in Monaco editor, verify syntax highlighting and autocomplete work
    - **Language Dropdown**: Change programming language, verify editor mode updates correctly
    - **Navigation**: Click NeetCode logo, verify navigation to practice page
    - **Navigation**: Click chevron buttons, verify problem navigation works
    - **Navigation**: Click "NeetCode ALL" button, verify it functions as implemented
    - **Problem Content**: Verify problem description, examples, and constraints render correctly
    - **Tab Switching**: Switch between Description/Solutions/Submissions/Discuss tabs, verify active indicator works
    - **Console Tabs**: Switch between Testcase/Result tabs, verify active indicator works
    - **Test Case Display**: Verify test case inputs display in correct format
    - **Submit Button**: Click Submit button, verify onSubmit handler triggers
    - **Responsive**: Resize viewport below 1024px, verify responsive layout applies
    - **Theme Variables**: Verify CSS variables (--auth-bg, --auth-text, etc.) work on other authenticated pages
  - Write manual test cases capturing observed behavior patterns from Preservation Requirements
  - Manual testing is appropriate for UI preservation verification
  - Run tests on UNFIXED code
  - **EXPECTED OUTCOME**: Tests PASS (this confirms baseline behavior to preserve)
  - Mark task complete when tests are written, run, and passing on unfixed code
  - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12_

## Phase 2: Implementation

- [x] 3. Fix scrolling issues in content panels

  - [x] 3.1 Enable native browser scrollbars in left (question) panel
    - Open `src/authenticated/pages/ProblemSolve/ProblemSolvePage.css`
    - Verify `.pane-content` has `overflow-y: auto` (already present)
    - Check for any custom scrollbar webkit styles that may be blocking scrolling
    - Remove or fix any custom scrollbar CSS that prevents native scrolling
    - Verify no parent elements have `overflow: hidden` that would prevent scrolling
    - Test scrolling in left panel with long problem description
    - _Bug_Condition: input.action == "scroll" AND input.target == "question-pane"_
    - _Expected_Behavior: System SHALL use normal browser scrollbar and allow smooth scrolling_
    - _Preservation: Editor functionality, navigation, problem content display must remain unchanged_
    - _Requirements: 1.1, 2.1, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [x] 3.2 Enable native browser scrollbars in right (console) panel
    - Verify `.console-content` has proper overflow settings
    - Ensure console panel allows scrolling when test cases overflow
    - Test scrolling in console panel with multiple test cases
    - _Bug_Condition: input.action == "scroll" AND input.target == "console-pane"_
    - _Expected_Behavior: System SHALL use normal browser scrollbar and allow smooth scrolling_
    - _Preservation: Test case display, console tab switching must remain unchanged_
    - _Requirements: 1.2, 2.2, 3.8, 3.9_

- [x] 4. Improve panel resizing behavior

  - [x] 4.1 Enhance resize handle visual feedback
    - Open `src/authenticated/pages/ProblemSolve/ProblemSolvePage.css`
    - Verify `.resize-handle:hover` styles provide clear visual feedback
    - Add `user-select: none` to resize handles to prevent text selection during drag
    - Ensure cursor changes are not blocked by aggressive cursor override rules
    - Test dragging both horizontal and vertical resize handles
    - _Bug_Condition: input.action == "drag" AND input.target IN ["horizontal-resize", "vertical-resize"]_
    - _Expected_Behavior: System SHALL provide smooth, responsive resizing with visual feedback_
    - _Preservation: All existing functionality must remain unchanged_
    - _Requirements: 1.3, 1.4, 2.3, 2.4_

  - [x] 4.2 Enforce minimum panel size constraints
    - Open `src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx`
    - Verify horizontal resize constraints: `if (newWidth > 20 && newWidth < 80)` are consistently applied
    - Verify vertical resize constraints: `if (newHeight > 20 && newHeight < 80)` are consistently applied
    - Consider adding `requestAnimationFrame` for smoother updates during drag
    - Test dragging panels to extreme positions (should be constrained to 20%-80% range)
    - _Bug_Condition: input.action == "drag" AND panel position approaches extreme values_
    - _Expected_Behavior: System SHALL enforce minimum width/height constraints to keep both panels visible and usable_
    - _Preservation: All existing functionality must remain unchanged_
    - _Requirements: 1.5, 2.5_

- [x] 5. Connect theme toggle to global context

  - [x] 5.1 Fix theme toggle scope in ProblemSolvePage
    - Open `src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx`
    - Verify component uses `useTheme()` from `AuthLayout` (already present)
    - Check if `data-theme={theme}` on `.problem-solve-root` creates isolated theme scope
    - Remove `data-theme={theme}` from `.problem-solve-root` if it prevents global theme propagation
    - Rely on global `data-theme` on `.auth-root` element instead
    - Verify `toggleTheme` function updates global context, not just local state
    - Test theme toggle in ProblemNav - entire page should change theme
    - Compare behavior with AuthNavbar theme toggle (should be identical)
    - _Bug_Condition: input.action == "click" AND input.target == "theme-toggle-in-problem-nav"_
    - _Expected_Behavior: System SHALL change theme for entire page including all components, matching AuthNavbar behavior_
    - _Preservation: Theme variables (--auth-bg, --auth-text, etc.) must remain unchanged, other pages must not be affected_
    - _Requirements: 1.6, 1.7, 2.6, 2.7, 3.12_

- [x] 6. Verify and document navbar layout correctness

  - [x] 6.1 Verify Run button displays only play icon
    - Open `src/authenticated/components/ProblemNav/ProblemNav.jsx`
    - Verify Run button JSX: should show only `<Play size={18} />` without text
    - Verify no text content appears inside the button element
    - Test Run button rendering - should show grey play icon, turning green on hover
    - _Bug_Condition: input.action == "render" AND input.component == "ProblemNav" AND element == "run-button"_
    - _Expected_Behavior: System SHALL show play icon (grey color, turning green on hover) without text_
    - _Preservation: Run button click handler must continue to function_
    - _Requirements: 1.9, 2.9_

  - [x] 6.2 Verify Submit button displays only text
    - Verify Submit button JSX: should show only text "Submit" without icon
    - Verify no icon component appears inside the button element
    - Test Submit button rendering - should show only text "Submit"
    - _Bug_Condition: input.action == "render" AND input.component == "ProblemNav" AND element == "submit-button"_
    - _Expected_Behavior: System SHALL show only text without any cloud icon_
    - _Preservation: Submit button click handler must continue to function_
    - _Requirements: 1.10, 2.10, 3.10_

  - [x] 6.3 Verify problem name is not displayed in navbar
    - Verify ProblemNav component does not receive or render problem name
    - Verify problem name only appears in ProblemSolvePage main content area
    - Test navbar rendering - center section should show only Run and Submit buttons
    - _Bug_Condition: input.action == "render" AND input.component == "ProblemNav"_
    - _Expected_Behavior: System SHALL display Run and Submit buttons in center without showing problem name_
    - _Preservation: All navigation elements must continue to function_
    - _Requirements: 1.8, 2.8, 3.3, 3.4, 3.5_

- [x] 7. Verify Run button loading state implementation

  - [x] 7.1 Verify loading state icon and color
    - Open `src/authenticated/components/ProblemNav/ProblemNav.jsx`
    - Verify conditional rendering: `{isRunning ? <Loader2 size={18} className="spin-icon" /> : <Play size={18} />}`
    - Open `src/authenticated/components/ProblemNav/ProblemNav.css`
    - Verify `.run-btn.running` class sets border-color and color to `#fbbf24` (yellow)
    - Verify `.spin-icon` class has rotation animation
    - Test Run button click - should show yellow spinning Loader2 icon for 3 seconds
    - _Bug_Condition: input.action == "click" AND input.target == "run-button"_
    - _Expected_Behavior: System SHALL change play icon to yellow loading circle (Loader2 icon) for duration of execution_
    - _Preservation: Run button functionality must remain unchanged_
    - _Requirements: 1.11, 2.11_

- [x] 8. Replace tab emoji icons with Lucide components

  - [x] 8.1 Import required Lucide icons
    - Open `src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx`
    - Add imports: `FileText, Lightbulb, CheckCircle, MessageSquare` from 'lucide-react'
    - Verify imports are correctly added to existing import statement
    - _Bug_Condition: input.action == "render" AND input.component == "left-panel-tabs"_
    - _Expected_Behavior: System SHALL show relevant icons with specific colors_
    - _Preservation: Tab switching functionality must remain unchanged_
    - _Requirements: 1.12, 2.12, 3.7_

  - [x] 8.2 Replace Description tab emoji with FileText icon
    - Find Description tab JSX: `<span className="tab-icon">📝</span>`
    - Replace with: `<FileText className="tab-icon" size={16} />`
    - Verify CSS rule `.tab:nth-child(1) .tab-icon { color: #fbbf24; }` applies yellow color
    - Test Description tab rendering - should show yellow FileText icon
    - _Requirements: 1.12, 2.12_

  - [x] 8.3 Replace Solutions tab emoji with Lightbulb icon
    - Find Solutions tab JSX: `<span className="tab-icon">💡</span>`
    - Replace with: `<Lightbulb className="tab-icon" size={16} />`
    - Verify CSS rule `.tab:nth-child(3) .tab-icon { color: #3b82f6; }` applies blue color
    - Test Solutions tab rendering - should show blue Lightbulb icon
    - _Requirements: 1.12, 2.12_

  - [x] 8.4 Replace Submissions tab emoji with CheckCircle icon
    - Find Submissions tab JSX: `<span className="tab-icon">🕒</span>`
    - Replace with: `<CheckCircle className="tab-icon" size={16} />`
    - Verify CSS rule `.tab:nth-child(5) .tab-icon { color: #22c55e; }` applies green color
    - Test Submissions tab rendering - should show green CheckCircle icon
    - _Requirements: 1.12, 2.12_

  - [x] 8.5 Replace Discuss tab emoji with MessageSquare icon
    - Find Discuss tab JSX: `<span className="tab-icon">💬</span>`
    - Replace with: `<MessageSquare className="tab-icon" size={16} />`
    - Verify CSS rule `.tab:nth-child(7) .tab-icon { color: #3b82f6; }` applies blue color
    - Test Discuss tab rendering - should show blue MessageSquare icon
    - _Requirements: 1.12, 2.12_

  - [x] 8.6 Verify tab dividers and spacing
    - Verify `.tab-divider` elements exist between tabs in JSX
    - Verify CSS for `.tab-divider` provides proper spacing and visual separation
    - Test tab rendering - should show pipe dividers with reduced gaps between tabs
    - _Requirements: 1.13, 2.13_

- [x] 9. Refine cursor behavior for navbar elements

  - [x] 9.1 Verify cursor override rules for navbar buttons
    - Open `src/authenticated/components/ProblemNav/ProblemNav.css`
    - Verify `.nav-btn *` rule has `cursor: pointer !important`
    - Verify `.nav-icon-btn *` rule has `cursor: pointer !important`
    - Check specificity is sufficient to override `.problem-solve-root *` default cursor rule
    - Test hovering over navbar button text - should show pointer cursor
    - _Bug_Condition: input.action == "hover" AND input.target == "navbar-text"_
    - _Expected_Behavior: System SHALL display pointer cursor consistently_
    - _Preservation: All navigation functionality must remain unchanged_
    - _Requirements: 1.14, 2.14, 3.3, 3.4, 3.5_

  - [x] 9.2 Verify cursor override rules for navbar logo
    - Verify `.nav-logo *` rule has `cursor: pointer !important`
    - Check specificity is sufficient to override default cursor rules
    - Test hovering over navbar logo - should show pointer cursor
    - _Bug_Condition: input.action == "hover" AND input.target == "navbar-logo"_
    - _Expected_Behavior: System SHALL display pointer cursor_
    - _Preservation: Logo navigation functionality must remain unchanged_
    - _Requirements: 1.15, 2.15, 3.3_

  - [x] 9.3 Verify cursor behavior on all interactive elements
    - Test cursor on all navbar buttons, links, and interactive elements
    - Verify pointer cursor appears consistently across all interactive elements
    - Verify text cursor appears only in editor and input fields
    - Document any remaining cursor inconsistencies
    - _Requirements: 1.14, 1.15, 2.14, 2.15_

## Phase 3: Verification

- [x] 10. Verify bug condition exploration tests now pass

  - [x] 10.1 Re-run bug condition exploration tests
    - **Property 1: Expected Behavior** - UI Interaction Fixes Across Seven Categories
    - **IMPORTANT**: Re-run the SAME tests from task 1 - do NOT write new tests
    - The tests from task 1 encode the expected behavior
    - When these tests pass, it confirms the expected behavior is satisfied
    - Run all seven bug category tests from step 1:
      - **Scrolling**: Verify left panel scrolls smoothly with native scrollbar
      - **Scrolling**: Verify console panel scrolls smoothly with native scrollbar
      - **Resize**: Verify horizontal resize handle provides smooth, responsive resizing
      - **Resize**: Verify panels enforce minimum 20% width/height constraints
      - **Theme Toggle**: Verify entire page changes theme (navbar, panels, text, editor)
      - **Navbar Layout**: Verify Run button shows only grey play icon (turns green on hover)
      - **Navbar Layout**: Verify Submit button shows only text "Submit" (no icon)
      - **Run Button**: Verify Run button shows yellow spinning Loader2 icon during execution
      - **Tab Styling**: Verify all tabs show colored Lucide icons (yellow FileText, blue Lightbulb, green CheckCircle, blue MessageSquare)
      - **Cursor**: Verify pointer cursor on all navbar interactive elements
    - **EXPECTED OUTCOME**: All tests PASS (confirms bugs are fixed)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15_

- [x] 11. Verify preservation tests still pass

  - [x] 11.1 Re-run preservation property tests
    - **Property 2: Preservation** - Non-Buggy Functionality Unchanged
    - **IMPORTANT**: Re-run the SAME tests from task 2 - do NOT write new tests
    - Run all preservation tests from step 2:
      - **Editor Functionality**: Verify typing, syntax highlighting, autocomplete work
      - **Language Dropdown**: Verify language changes update editor mode
      - **Navigation**: Verify logo click, chevron buttons, "NeetCode ALL" button function
      - **Problem Content**: Verify description, examples, constraints render correctly
      - **Tab Switching**: Verify active tab indicators work for all tabs
      - **Console Tabs**: Verify Testcase/Result tab switching works
      - **Test Case Display**: Verify test case inputs display correctly
      - **Submit Button**: Verify onSubmit handler triggers
      - **Responsive**: Verify responsive layout applies below 1024px
      - **Theme Variables**: Verify CSS variables work on other authenticated pages
    - **EXPECTED OUTCOME**: All tests PASS (confirms no regressions)
    - Confirm all tests still pass after fix (no regressions)
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12_

- [x] 12. Checkpoint - Ensure all tests pass and all bugs are fixed
  - Verify all bug condition tests pass (scrolling, resizing, theme toggle, navbar layout, Run button loading, tab styling, cursor behavior)
  - Verify all preservation tests pass (editor, navigation, content display, tab switching, responsive behavior)
  - Perform manual testing of complete problem-solving workflow
  - Test edge cases: rapid interactions, extreme panel sizes, theme toggle sequences
  - Document any remaining issues or edge cases
  - Ask the user if questions arise or if additional testing is needed
