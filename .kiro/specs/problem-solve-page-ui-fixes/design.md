# Problem Solve Page UI Fixes - Bugfix Design

## Overview

This bugfix addresses seven categories of UI/UX issues in the ProblemSolvePage component that collectively degrade the user experience. The issues stem from incomplete CSS implementations, missing component state management, incorrect theme context usage, and inconsistent cursor behavior. The fix strategy involves: (1) removing custom scrollbar CSS that blocks native scrolling, (2) implementing proper resize constraints and visual feedback, (3) connecting ProblemNav theme toggle to the global theme context, (4) correcting navbar layout and button styling, (5) adding loading state management for the Run button, (6) replacing emoji icons with proper Lucide icons and colors, and (7) ensuring consistent pointer cursor behavior across all interactive elements.

## Glossary

- **Bug_Condition (C)**: The condition that triggers each of the seven bug categories - when users interact with panels, theme toggle, navbar elements, or tabs
- **Property (P)**: The desired behavior for each bug category - smooth scrolling, responsive resizing, global theme changes, correct navbar layout, loading states, proper tab styling, and consistent cursor behavior
- **Preservation**: Existing functionality that must remain unchanged - editor features, navigation, problem content display, test case display, responsive behavior, and theme variables
- **ProblemSolvePage**: The main component in `src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx` that renders the problem-solving interface
- **ProblemNav**: The navbar component in `src/authenticated/components/ProblemNav/ProblemNav.jsx` specific to the problem-solving page
- **ThemeContext**: The React context in `src/authenticated/AuthLayout.jsx` that manages global theme state
- **Monaco Editor**: The code editor component used for writing solutions
- **Resize Handles**: The draggable dividers between panels (horizontal between left/right, vertical between editor/console)

## Bug Details

### Bug Condition

The bugs manifest across seven distinct interaction patterns in the ProblemSolvePage component:

1. **Scrolling Failure**: When users attempt to scroll in the left (question) or right (test case) panels, the custom scrollbar CSS prevents native browser scrolling from functioning
2. **Resize Behavior Issues**: When users drag resize handles, the system exhibits jerky behavior and allows panels to become unusable at extreme positions
3. **Theme Toggle Scope**: When users click the theme toggle in ProblemNav, only the Monaco editor theme changes instead of the entire page
4. **Navbar Layout Errors**: The ProblemNav renders with incorrect button styling (text instead of icons, wrong icon placement)
5. **Missing Loading State**: When users click Run, the button does not show a loading indicator during the 3-second execution
6. **Tab Styling Issues**: The left panel tabs display emoji icons instead of proper colored Lucide icons with inadequate spacing
7. **Cursor Inconsistency**: Navbar text elements show text cursor instead of pointer cursor on hover

**Formal Specification:**
```
FUNCTION isBugCondition(input)
  INPUT: input of type UserInteraction
  OUTPUT: boolean
  
  RETURN (input.action == "scroll" AND input.target IN ["question-pane", "console-pane"])
         OR (input.action == "drag" AND input.target IN ["horizontal-resize", "vertical-resize"])
         OR (input.action == "click" AND input.target == "theme-toggle-in-problem-nav")
         OR (input.action == "render" AND input.component == "ProblemNav")
         OR (input.action == "click" AND input.target == "run-button")
         OR (input.action == "render" AND input.component == "left-panel-tabs")
         OR (input.action == "hover" AND input.target IN ["navbar-text", "navbar-logo"])
END FUNCTION
```

### Examples

**Scrolling Issues:**
- User scrolls in question panel with long problem description → no scrolling occurs, content is cut off
- User scrolls in test case panel with multiple test cases → no scrolling occurs, cannot see all test cases

**Panel Resizing Issues:**
- User drags horizontal resize handle quickly → resizing is jerky and unresponsive
- User drags left panel to 95% width → right panel becomes unusable (should be constrained to minimum 20%)
- User drags editor to 95% height → console becomes unusable (should be constrained to minimum 20%)

**Theme Toggle Issues:**
- User clicks theme toggle in ProblemNav → only Monaco editor changes from dark to light, but panels, navbar, and text remain in dark theme
- Expected: entire page should change theme like when using AuthNavbar theme toggle

**Navbar Layout Issues:**
- Run button displays with text "Run" → should show only a play icon (grey, turning green on hover)
- Submit button displays with cloud icon → should show only text "Submit" without icon
- Problem name appears in navbar center → should not be displayed

**Run Button Loading State:**
- User clicks Run button → button remains static with play icon for 3 seconds → should show yellow spinning Loader2 icon

**Tab Styling Issues:**
- Description tab shows 📝 emoji → should show FileText icon in yellow (#fbbf24)
- Solutions tab shows 💡 emoji → should show Lightbulb icon in blue (#3b82f6)
- Submissions tab shows 🕒 emoji → should show CheckCircle icon in green (#22c55e)
- Discuss tab shows 💬 emoji → should show MessageSquare icon in blue (#3b82f6)
- Tabs have excessive gaps → should have pipe dividers with reduced spacing

**Cursor Behavior Issues:**
- User hovers over "NeetCode ALL" button text → text cursor appears instead of pointer
- User hovers over navbar logo → may show default cursor instead of pointer

## Expected Behavior

### Preservation Requirements

**Unchanged Behaviors:**
- Editor functionality: syntax highlighting, autocomplete, language switching must continue to work
- Navigation: logo click, chevron buttons, "NeetCode ALL" button must continue to function
- Problem content display: description, examples, constraints must render correctly
- Tab switching: active tab indicators must continue to work for both left panel and console tabs
- Test case display: test case inputs must continue to show in correct format
- Submit button: onSubmit handler must continue to trigger as currently implemented
- Responsive behavior: viewport resizing below 1024px must continue to apply responsive layout
- Theme variables: existing CSS variable names (--auth-bg, --auth-text, etc.) must remain unchanged

**Scope:**
All inputs that do NOT involve the seven bug categories should be completely unaffected by this fix. This includes:
- Code editing in Monaco editor
- Language dropdown selection
- Editor action buttons (reset, settings)
- Console tab switching (Testcase/Result)
- All navigation links and buttons
- Timer display
- User profile button
- "Go Pro" button

## Hypothesized Root Cause

Based on the bug description and code analysis, the most likely issues are:

### 1. **Scrolling Issues - Custom Scrollbar CSS Override**
The CSS in `ProblemSolvePage.css` likely contains custom scrollbar styling or `overflow: hidden` that prevents native browser scrolling:
- `.pane-content` may have `overflow: hidden` instead of `overflow-y: auto`
- Custom scrollbar webkit styles may be interfering with scroll functionality
- The `problem-solve-root` has `overflow: hidden` which is correct for the root, but child elements need proper overflow settings

### 2. **Panel Resizing - Missing Constraints and Smooth Transitions**
The resize implementation in `ProblemSolvePage.jsx` has basic percentage-based resizing but lacks:
- Minimum width/height constraints are set to 20% and 80%, but these may not be enforced consistently
- No visual feedback during dragging (cursor may not change, handle may not highlight)
- Potential performance issues with frequent state updates during mousemove
- The resize logic exists but may need refinement for smoother operation

### 3. **Theme Toggle - Local State Instead of Global Context**
The `ProblemSolvePage.jsx` uses local theme state from `useTheme()` hook, but the `toggleTheme` function passed to `ProblemNav` may not be updating the global context:
- `ProblemNav` receives `theme` and `toggleTheme` as props
- The theme toggle only affects the Monaco editor's `theme` prop
- The `data-theme` attribute is set on `.problem-solve-root` but may not be propagating to the global `auth-root` element
- The global theme context in `AuthLayout.jsx` is not being updated when theme is toggled in `ProblemNav`

### 4. **Navbar Layout - Incorrect Component Structure**
The `ProblemNav.jsx` component structure has:
- Run button correctly shows Play icon but may have text in some render path
- Submit button may have a cloud icon imported but not used in current code
- The problem name is rendered in `ProblemSolvePage.jsx` but not passed to `ProblemNav`, so this may be a documentation error or the name appears elsewhere

### 5. **Run Button Loading State - Missing Icon Swap Logic**
The `ProblemNav.jsx` has `isRunning` prop and conditional rendering:
- The logic exists: `{isRunning ? <Loader2 className="spin-icon" /> : <Play />}`
- The CSS has `.spin-icon` animation and `.run-btn.running` styles
- The issue may be that the loading state works but the color is not yellow as specified
- The `.run-btn.running` class sets border and color to `#fbbf24` (yellow), so this should work

### 6. **Tab Styling - Emoji Icons Instead of Lucide Icons**
The `ProblemSolvePage.jsx` renders tabs with emoji icons:
- `<span className="tab-icon">📝</span>` instead of `<FileText className="tab-icon" />`
- The CSS has color rules for `.tab:nth-child(n) .tab-icon` but these won't work with emoji
- Need to import Lucide icons: FileText, Lightbulb, CheckCircle, MessageSquare
- Tab dividers exist but spacing may need adjustment

### 7. **Cursor Behavior - Overly Aggressive Cursor Override**
The `ProblemSolvePage.css` has aggressive cursor rules:
- `.problem-solve-root *` sets `cursor: default !important` on ALL elements
- Specific overrides exist for buttons, links, tabs, but may not cover all text within buttons
- The `.nav-btn *` rule in `ProblemNav.css` sets `cursor: pointer !important` which should work
- The logo has `.nav-logo *` with `cursor: pointer !important` which should work
- The issue may be specificity conflicts or missing overrides

## Correctness Properties

Property 1: Bug Condition - UI Interaction Fixes

_For any_ user interaction where one of the seven bug conditions holds (isBugCondition returns true), the fixed ProblemSolvePage SHALL exhibit the correct behavior: smooth scrolling in panels, responsive resizing with constraints, global theme changes, correct navbar layout with proper icons, yellow loading state on Run button, colored Lucide icons in tabs, and consistent pointer cursor on interactive elements.

**Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, 2.10, 2.11, 2.12, 2.13, 2.14, 2.15**

Property 2: Preservation - Non-Buggy Functionality

_For any_ user interaction where the bug condition does NOT hold (isBugCondition returns false), the fixed code SHALL produce exactly the same behavior as the original code, preserving all existing functionality for editor operations, navigation, content display, tab switching, test case display, submit functionality, responsive behavior, and theme variables.

**Validates: Requirements 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9, 3.10, 3.11, 3.12**

## Fix Implementation

### Changes Required

Assuming our root cause analysis is correct:

**File**: `src/authenticated/pages/ProblemSolve/ProblemSolvePage.css`

**Function**: CSS styling for panels and scrolling

**Specific Changes**:

1. **Fix Scrolling - Enable Native Browser Scrollbars**:
   - Ensure `.pane-content` has `overflow-y: auto` (already present, verify it's not overridden)
   - Remove any custom scrollbar webkit styles that may be blocking scrolling
   - Verify no parent elements have `overflow: hidden` that would prevent scrolling

2. **Fix Resize Visual Feedback - Enhance Hover States**:
   - The `.resize-handle:hover` styles exist and should work
   - Ensure cursor changes are not blocked by the aggressive cursor override rules
   - Add `user-select: none` to resize handles to prevent text selection during drag

3. **Fix Tab Styling - Update Icon Colors**:
   - The color rules for `.tab:nth-child(n) .tab-icon` are correct
   - These will work once Lucide icons replace emojis in the JSX

4. **Fix Cursor Behavior - Refine Cursor Override Rules**:
   - The current approach with `.problem-solve-root *` and specific overrides should work
   - Verify that `.nav-btn *` and `.nav-logo *` rules in `ProblemNav.css` have sufficient specificity
   - May need to add `!important` to ensure overrides work

**File**: `src/authenticated/pages/ProblemSolve/ProblemSolvePage.jsx`

**Function**: Main component rendering and state management

**Specific Changes**:

1. **Fix Theme Toggle - Connect to Global Context**:
   - The component already uses `useTheme()` from `AuthLayout`
   - The `toggleTheme` function should update the global context
   - Verify that the `data-theme` attribute on `.problem-solve-root` is not creating an isolated theme scope
   - Remove `data-theme={theme}` from `.problem-solve-root` and rely on the global `data-theme` on `.auth-root`

2. **Fix Tab Icons - Replace Emojis with Lucide Icons**:
   - Import: `FileText, Lightbulb, CheckCircle, MessageSquare` from 'lucide-react'
   - Replace `<span className="tab-icon">📝</span>` with `<FileText className="tab-icon" size={16} />`
   - Replace `<span className="tab-icon">💡</span>` with `<Lightbulb className="tab-icon" size={16} />`
   - Replace `<span className="tab-icon">🕒</span>` with `<CheckCircle className="tab-icon" size={16} />`
   - Replace `<span className="tab-icon">💬</span>` with `<MessageSquare className="tab-icon" size={16} />`

3. **Fix Panel Resizing - Improve Constraints**:
   - The current constraints `if (newWidth > 20 && newWidth < 80)` are correct
   - Ensure these constraints are consistently applied
   - Consider adding `requestAnimationFrame` for smoother updates during drag

**File**: `src/authenticated/components/ProblemNav/ProblemNav.jsx`

**Function**: Navbar component for problem-solving page

**Specific Changes**:

1. **Fix Run Button Loading State - Verify Color**:
   - The logic `{isRunning ? <Loader2 className="spin-icon" /> : <Play />}` is correct
   - The CSS `.run-btn.running` sets color to `#fbbf24` (yellow) which is correct
   - Verify that the `spin-icon` class has the rotation animation (already present in CSS)
   - No changes needed - this should already work correctly

2. **Fix Navbar Layout - Verify Button Structure**:
   - The Run button correctly shows only the Play icon without text
   - The Submit button correctly shows only text "Submit" without icon
   - The problem name is NOT rendered in ProblemNav (it's in ProblemSolvePage)
   - No changes needed - the structure is already correct

**File**: `src/authenticated/components/ProblemNav/ProblemNav.css`

**Function**: Navbar styling

**Specific Changes**:

1. **Fix Cursor Behavior - Ensure Pointer Cursor**:
   - The rules `.nav-btn *`, `.nav-logo *`, `.nav-icon-btn *` with `cursor: pointer !important` are correct
   - These should override the aggressive default cursor rules
   - Verify specificity is sufficient to override `.problem-solve-root *` rule

## Testing Strategy

### Validation Approach

The testing strategy follows a two-phase approach: first, surface counterexamples that demonstrate the bugs BEFORE implementing the fix, then verify the fix works correctly and preserves existing behavior.

### Exploratory Bug Condition Checking

**Goal**: Surface counterexamples that demonstrate the bugs BEFORE implementing the fix. Confirm or refute the root cause analysis. If we refute, we will need to re-hypothesize.

**Test Plan**: Manually test each bug category on the UNFIXED code to observe failures and understand the root causes. Document specific examples of each bug manifestation.

**Test Cases**:

1. **Scrolling Test**: Navigate to a problem with long description, attempt to scroll in left panel (will fail - no scrolling occurs)
2. **Scrolling Test**: Add multiple test cases, attempt to scroll in console panel (will fail - no scrolling occurs)
3. **Resize Test**: Drag horizontal resize handle rapidly (may exhibit jerky behavior)
4. **Resize Test**: Drag left panel to extreme right position (may allow right panel to become unusable)
5. **Theme Toggle Test**: Click theme toggle in ProblemNav (will fail - only editor changes theme, not entire page)
6. **Navbar Layout Test**: Inspect Run and Submit buttons (may show incorrect icons/text)
7. **Run Button Test**: Click Run button and observe for 3 seconds (will fail - no yellow loading indicator appears)
8. **Tab Styling Test**: Inspect left panel tabs (will fail - shows emojis instead of colored Lucide icons)
9. **Cursor Test**: Hover over navbar button text (will fail - shows text cursor instead of pointer)
10. **Cursor Test**: Hover over navbar logo (may fail - shows default cursor instead of pointer)

**Expected Counterexamples**:
- Panels do not scroll when content overflows
- Resize handles allow panels to become unusable at extreme positions
- Theme toggle only affects Monaco editor, not entire page
- Run button does not show yellow loading state during execution
- Tabs show emoji icons instead of proper colored Lucide icons
- Navbar elements show text cursor instead of pointer cursor

**Root Cause Confirmation**:
- If scrolling fails, confirm that `.pane-content` has proper `overflow-y: auto`
- If theme toggle fails, confirm that `toggleTheme` updates global context, not local state
- If tabs show emojis, confirm JSX uses emoji strings instead of Lucide icon components
- If cursor is wrong, confirm that cursor override rules have sufficient specificity

### Fix Checking

**Goal**: Verify that for all inputs where the bug condition holds, the fixed function produces the expected behavior.

**Pseudocode:**
```
FOR ALL input WHERE isBugCondition(input) DO
  result := ProblemSolvePage_fixed(input)
  ASSERT expectedBehavior(result)
END FOR
```

**Test Cases**:

1. **Scrolling Fix Verification**:
   - Scroll in left panel with long content → should scroll smoothly with native scrollbar
   - Scroll in console panel with multiple test cases → should scroll smoothly with native scrollbar

2. **Resize Fix Verification**:
   - Drag horizontal resize handle → should resize smoothly with visual feedback
   - Drag left panel to extreme positions → should enforce minimum 20% width for both panels
   - Drag vertical resize handle → should resize smoothly with visual feedback
   - Drag editor to extreme positions → should enforce minimum 20% height for both sections

3. **Theme Toggle Fix Verification**:
   - Click theme toggle in ProblemNav → entire page should change theme (navbar, panels, text, editor)
   - Verify CSS variables update globally (--auth-bg, --auth-text, etc.)
   - Compare behavior with AuthNavbar theme toggle (should be identical)

4. **Navbar Layout Fix Verification**:
   - Inspect Run button → should show only grey play icon (no text)
   - Hover over Run button → icon should turn green
   - Inspect Submit button → should show only text "Submit" (no icon)

5. **Run Button Loading Fix Verification**:
   - Click Run button → should immediately show yellow spinning Loader2 icon
   - Wait 3 seconds → should return to grey play icon
   - Verify button is disabled during execution

6. **Tab Styling Fix Verification**:
   - Inspect Description tab → should show yellow FileText icon
   - Inspect Solutions tab → should show blue Lightbulb icon
   - Inspect Submissions tab → should show green CheckCircle icon
   - Inspect Discuss tab → should show blue MessageSquare icon
   - Verify pipe dividers appear between tabs with proper spacing

7. **Cursor Fix Verification**:
   - Hover over navbar button text → should show pointer cursor
   - Hover over navbar logo → should show pointer cursor
   - Hover over all interactive elements → should show pointer cursor consistently

### Preservation Checking

**Goal**: Verify that for all inputs where the bug condition does NOT hold, the fixed function produces the same result as the original function.

**Pseudocode:**
```
FOR ALL input WHERE NOT isBugCondition(input) DO
  ASSERT ProblemSolvePage_original(input) = ProblemSolvePage_fixed(input)
END FOR
```

**Testing Approach**: Property-based testing is recommended for preservation checking because:
- It generates many test cases automatically across the input domain
- It catches edge cases that manual unit tests might miss
- It provides strong guarantees that behavior is unchanged for all non-buggy inputs

**Test Plan**: Observe behavior on UNFIXED code first for non-bug interactions, then write property-based tests capturing that behavior.

**Test Cases**:

1. **Editor Preservation**: Verify typing code, syntax highlighting, autocomplete continue to work
2. **Language Dropdown Preservation**: Verify changing language updates editor mode correctly
3. **Navigation Preservation**: Verify logo click, chevron buttons, "NeetCode ALL" button continue to function
4. **Problem Content Preservation**: Verify description, examples, constraints render correctly
5. **Tab Switching Preservation**: Verify active tab indicators work for both left panel and console tabs
6. **Test Case Display Preservation**: Verify test case inputs display in correct format
7. **Submit Button Preservation**: Verify onSubmit handler triggers correctly
8. **Responsive Preservation**: Verify viewport resizing below 1024px applies responsive layout
9. **Theme Variables Preservation**: Verify existing CSS variable names remain unchanged and work on other pages

### Unit Tests

- Test scrolling functionality in left and right panels with overflow content
- Test resize handle dragging with various mouse positions and speeds
- Test resize constraints at minimum and maximum positions
- Test theme toggle updates global context and CSS variables
- Test Run button state changes (idle → running → idle)
- Test tab icon rendering with correct Lucide components and colors
- Test cursor behavior on all interactive navbar elements

### Property-Based Tests

- Generate random panel sizes and verify resize constraints always maintain minimum 20% for both panels
- Generate random theme toggle sequences and verify theme state remains consistent across all components
- Generate random scroll positions and verify scrolling works correctly in all panels
- Generate random hover events and verify cursor is always pointer on interactive elements

### Integration Tests

- Test full problem-solving flow: navigate to problem, scroll description, resize panels, toggle theme, run code, submit solution
- Test theme persistence: toggle theme in ProblemNav, navigate to another page, verify theme remains consistent
- Test responsive behavior: resize viewport, verify all fixes continue to work at different screen sizes
- Test rapid interactions: quickly resize panels, toggle theme, click buttons, verify no race conditions or visual glitches
