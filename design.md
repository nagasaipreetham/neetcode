# Website Design Document
## Supermemory-Inspired Redesign Reference

---

## 1. Design Philosophy & Aesthetic Direction

**Concept:** "Intelligent Dark Matter" — the site should feel like an operating system for memory. Cold, precise, technical — yet with warmth in its data visualization moments. Think: a Bloomberg terminal that went to art school.

**Tone:** Industrial-minimal with editorial tension. Not soft SaaS. Not aggressive brutalism. A quiet authority — the kind of interface that makes you trust the product before reading a single word.

**What makes it unforgettable:** The tension between dense information and extreme whitespace. Data panels that feel alive. A color system that uses one single neon accent against a near-black background, deployed with surgical restraint.

---

## 2. Color System

```
Background (primary):     #0A0A0A   — near-black, not pure black
Background (elevated):    #111111   — card surfaces, panels
Background (subtle):      #1A1A1A   — hover states, input fields
Border:                   #222222   — default dividers
Border (highlight):       #2E2E2E   — card borders on hover

Text (primary):           #F2F2F2   — headings, labels
Text (secondary):         #888888   — body, descriptors
Text (muted):             #444444   — placeholder, disabled

Accent (neon):            #00FFA3   — the ONE accent color (mint-green)
Accent (dim):             #00FFA320 — 12% opacity for glow effects
Accent (text on dark):    #00FF90   — slightly brighter for inline text

Danger / Warning:         #FF4545   — sparingly, for contrast metrics
```

**Rule:** The neon accent appears on fewer than 5% of all UI elements. Every other use of color must earn its place.

---

## 3. Typography

```
Display Font:   "Neue Machina" (or fallback: "DM Mono")
                — Used for hero headline, section numbers, big stats
                — Weight: 700–800
                — Tracking: -0.03em (tight)

Body / UI Font: "Geist" (or fallback: "IBM Plex Sans")
                — Used for all body text, nav, labels
                — Weight: 400–500
                — Line height: 1.6 for paragraphs, 1.2 for UI

Code Font:      "Berkeley Mono" (or fallback: "JetBrains Mono")
                — Used in code blocks, terminal snippets
                — Weight: 400
                — Letter-spacing: 0.02em
```

**Type Scale:**
```
Hero headline:    72–96px / weight 800 / line-height 1.0
Section headline: 40–52px / weight 700 / line-height 1.1
Sub-headline:     24–28px / weight 600 / line-height 1.2
Body large:       18px    / weight 400 / line-height 1.65
Body:             15px    / weight 400 / line-height 1.6
Label / caption:  12px    / weight 500 / letter-spacing 0.08em / UPPERCASE
Stat number:      56–72px / weight 800 / font: Display
```

---

## 4. Layout & Grid

**Base grid:** 12-column grid with `clamp(24px, 5vw, 80px)` gutters.

**Max content width:** 1280px, centered.

**Section rhythm:** Each major section gets `120px` top/bottom padding on desktop, `64px` on mobile.

**The "section counter" pattern:** Every major section has a top-left label like `[01 / CONTEXT STACK]` — monospace, muted, 11px uppercase. This anchors the user and adds editorial structure.

---

## 5. Page Structure & Section Layout

### 5.1 — Navigation

```
Position:       Fixed, top-0, full-width
Height:         64px
Background:     #0A0A0A with 1px bottom border (#1E1E1E)
Blur effect:    backdrop-filter: blur(12px) + 80% opacity on scroll

Layout:
  LEFT:         Logo (wordmark, 20px, weight 700)
  CENTER:       Nav links (Research · Pricing · Docs · Blog)
                — 14px, weight 500, color #888, hover → #F2F2F2
  RIGHT:        [Consumer ▾] dropdown  +  [Login] ghost button  +  [Start Building →] filled CTA button

CTA Button style:
  Background:   #00FFA3
  Text:         #0A0A0A (black on neon)
  Border-radius: 6px
  Padding:      10px 20px
  Font:         14px weight 600
  Hover:        scale(1.02) + slight glow: box-shadow 0 0 16px #00FFA340
```

---

### 5.2 — Hero Section

```
Layout:         Two-column (60/40 split) on desktop, stacked on mobile
Min-height:     100vh
Padding-top:    120px (below fixed nav)

LEFT COLUMN (60%):
  ┌─────────────────────────────────────────┐
  │  [BADGE]  #1 on MemoryBench →          │  ← pill badge, border #2E2E2E, accent dot
  │                                         │
  │  Your AI is only as good               │  ← 88px display font
  │  as what it remembers                  │     white, tight tracking
  │                                         │
  │  [body text — 18px, color #888]        │
  │                                         │
  │  [Start Building →]  [Talk to Founder] │  ← primary + ghost CTA
  │                                         │
  │  $ npx skills add supermemoryai/skills  │  ← inline terminal snippet
  └─────────────────────────────────────────┘

RIGHT COLUMN (40%):
  — Floating visual: abstract 3D brain/graph node visualization
  — Or: animated dot-graph showing memory connections
  — Subtle entrance animation: fade-up + scale from 0.95

BACKGROUND:
  — Radial gradient from #00FFA308 centered at top-right → fades to #0A0A0A
  — Faint grid lines (1px, #1A1A1A) as subtle texture across entire section
  — No full-bleed images. The grid + glow IS the background.
```

---

### 5.3 — Dual Product Callout (What We Do)

```
Layout:         Two equal cards side-by-side, full-width
Card style:     Border: 1px solid #222, border-radius: 16px
                Background: #111111
                Padding: 48px

LEFT CARD — Developer API:
  Tag:          [FOR DEVELOPERS & TEAMS]  — 11px uppercase, accent color
  Headline:     "The Supermemory API"     — 28px
  Body:         descriptor text           — 15px, #888
  Stats row:    [<300ms] [100B+ Tokens] [#1 Quality]
                — each stat: large number in display font, label below in muted text
  Footer:       [Start Building →]        — accent text link

RIGHT CARD — Personal App:
  Tag:          [FOR EVERYONE]
  Headline:     "Personal Supermemory"
  Body:         descriptor text
  Plugin logos: row of small integration icons
  Footer:       [Get Personal Supermemory →]

Hover behavior:  
  Card lifts slightly: transform: translateY(-4px)
  Border brightens: #333333
  Transition: 0.2s ease
```

---

### 5.4 — Context Stack Section

```
Section label:  [02 / THE CONTEXT STACK]
Headline:       "Five layers. Complete context."  — 48px

Layout:         Horizontal sticky scroll OR vertical accordion on desktop
                (Sticky sidebar + scrolling detail panel is preferred)

LEFT PANEL (sticky, 35%):
  — Vertical list of 5 layers, numbered 01–05
  — Active item: accent color left border (3px) + text brightens
  — Inactive: muted gray
  — Each item: number (mono) + layer name (body font, 16px)

RIGHT PANEL (scrolling, 65%):
  — Large detail block for each layer
  — Contains: layer name (28px headline) + description (16px body)
  — Visual accent: abstract icon or mini diagram per layer
  — Subtle entrance: slides in from right as user scrolls to each

The "Context Stack" diagram (above the lists):
  — Horizontal layered bar visualization
  — 5 labeled columns: CONNECTORS · EXTRACTORS · RETRIEVAL · GRAPH · PROFILES
  — Each column: subtle fill color (varying opacity of accent)
  — Active column highlights on hover
```

---

### 5.5 — "Knowledge that Evolves" Section

```
Section label:  [03 / UNDER THE HOOD]
Headline:       "Knowledge that evolves, not just stores"  — 44px
Layout:         Two-column, 50/50

LEFT:
  — "Vector Graph Engine" sub-card
  — Dark panel, border, inner glow on hover

RIGHT:
  — "User Understanding Model" sub-card

Center/below:
  — Wide stat bar: [100B+ tokens/month]  ·  [Every query <300ms]
  — Ultra-large numbers in display font, labels in 12px muted mono
```

---

### 5.6 — Benchmarks Section

```
Section label:  [04 / BENCHMARKS]
Headline:       "We don't think benchmarks tell the full story."
Subtext:        "But we lead every major one anyway."

Layout:
  TOP ROW — 3 large stat boxes:
    Each box: Metric name (12px label) + Score (56px display number) + Badge (#1 or %)
    Border: 1px #222, rounded-12, background #111

  MIDDLE ROW — 4 comparison stats:
    [5 context layers] [<300ms latency] [100B+ tokens/month] + 1 more
    Inline, separated by thin vertical dividers

  BOTTOM — Comparison Table:
    Table headers: Feature / Supermemory / Mem0 / Zep
    Row style: alternating #111 / #0E0E0E rows
    Checkmark style: ✓ in accent green, ✗ in #333 (nearly invisible)
    Supermemory column header: slight accent glow background
```

---

### 5.7 — Developer Experience / Code Section

```
Section label:  [05 / DEVELOPER EXPERIENCE]
Headline:       "Setup in 5 minutes"

Layout:         Tab bar (TypeScript · Python · REST) + code panel below

Tab bar:
  Active tab:   Bottom border 2px accent, text white
  Inactive:     Text #555, no border
  Background:   None (tabs float above code window)

Code panel:
  Background:   #0D0D0D
  Border:       1px #1E1E1E
  Border-radius: 12px
  Padding:      32px
  Top bar:      3 macOS-style dots (decorative) + filename label right-aligned
  Font:         Berkeley Mono, 14px
  Syntax highlighting:
    Keywords:   #569CD6 (blue)
    Strings:    #00FFA3 (accent green — used purposefully here)
    Comments:   #444
    Functions:  #DCDCAA

Below code panel:
  Integration pills: horizontal scrolling row of tool logos/names
  Style: pill shape, #1A1A1A bg, #333 border, 13px text
  Hover: border → #00FFA360, text → white
```

---

### 5.8 — Personal Supermemory Feature Showcase

```
Layout:         Full-width section, alternating feature rows (text left / visual right, then flip)

Each row:
  TEXT SIDE:    Feature name (22px bold) + description (15px, #888)
  VISUAL SIDE:  Mock UI screenshot or abstract animation of the feature
  Divider:      1px horizontal rule between rows, color #1A1A1A

Background:     Subtle gradient: #0A0A0A → #0F0F0F → #0A0A0A (top to bottom)
```

---

### 5.9 — Enterprise / Logos Section

```
Section label:  [06 / ENTERPRISE]
Headline:       "Loved by teams of every scale."

Logo row:
  Layout:       Centered, horizontal, evenly spaced
  Style:        All logos desaturated (filter: grayscale(1) opacity(0.5))
  Hover:        filter: grayscale(0) opacity(1), transition 0.2s

Below logos — 3 trust pillars (equal-width cards):
  Card 1: "Self-host on your premise"
  Card 2: "SOC 2, HIPAA, GDPR" — with certification badge icons
  Card 3: "You own your data"

  Card style: border 1px #1E1E1E, bg #111, padding 32px, rounded-12
```

---

### 5.10 — Testimonials Section

```
Section label:  [07 / TESTIMONIALS]
Headline:       "Builders love us."

Layout:         Masonry grid, 3–4 columns on desktop
                OR: Horizontal auto-scrolling ticker (2 rows, opposite directions)

Tweet card style:
  Background:   #111111
  Border:       1px #1E1E1E
  Border-radius: 12px
  Padding:      24px
  Avatar:       32px circle, left-aligned
  Name + handle: 14px / 13px #555
  Body text:    15px, #CCC, line-height 1.55
  Date:         12px, #444

Hover:
  Border: #2A2A2A
  Background: #141414
  Transition: 0.15s

"View all" button: ghost style, centered below grid
```

---

### 5.11 — Pricing Section

```
Section label:  [08 / PRICING]
Headline:       "Simple, transparent pricing."

Layout:         4-column card grid (Free · Pro · Scale · Enterprise)

Card style (default):
  Background:   #111
  Border:       1px #222
  Border-radius: 16px
  Padding:      40px 32px

Card style (PRO — featured):
  Border:       1px #00FFA360
  Background:   linear-gradient(160deg, #0F1A14, #111)
  Box-shadow:   0 0 40px #00FFA308
  Badge:        "MOST POPULAR" — 10px uppercase, accent bg, black text

Price display:
  Amount:       48px display font, white
  Period:       16px, #555, inline
  
Feature list:
  Each item:    Checkmark (accent) + 14px text
  Spacing:      12px between items

CTA Button (featured card): full-width, accent background
CTA Button (others):        full-width, #1E1E1E bg, white text border

Overage row (below cards):
  Style: centered, 2 mini-stat boxes ($0.01 / $0.10), separated by centered dot
```

---

### 5.12 — Final CTA Banner

```
Layout:         Full-width, centered text block
Background:     Subtle radial gradient: #00FFA306 center → transparent
Padding:        120px vertical

Headline:       "Your Agent needs its supermemory."  — 56px display
CTA:            [Read the Docs →]  — large ghost button, accent border
```

---

### 5.13 — Footer

```
Layout:         4-column link grid + copyright bar below
Background:     #0A0A0A
Top border:     1px #1A1A1A

Columns:        Product · Resources · Company · Connect
Link style:     14px, #555, hover → #CCC, transition 0.15s

Bottom bar:
  Left:         © 2026 Supermemory Inc.
  Right:        Social icon links (GitHub, Twitter/X, Discord)
  Social icons: 18px, #444, hover → #F2F2F2
  Divider:      1px #1A1A1A above bottom bar
```

---

## 6. Interactive States & Motion

### Global Transitions
```css
/* All interactive elements */
transition: all 0.15s ease;

/* Cards and panels */
transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
```

### Scroll Animations (entrance)
```
Pattern: elements enter with   opacity: 0 → 1
                                transform: translateY(20px) → translateY(0)
Duration: 0.5s
Easing:   cubic-bezier(0.16, 1, 0.3, 1)  — fast ease-out
Stagger:  80ms between sibling elements
Trigger:  IntersectionObserver at 10% visibility
```

### Hover States
```
Buttons:    scale(1.02) — subtle
Cards:      translateY(-4px) + border brightens
Links:      color transition only, no transform
Nav items:  color only
```

### Special Effects
```
Hero glow:        Animated radial gradient pulse, 4s loop, very subtle
Code block:       Syntax tokens fade in sequentially on tab switch
Stat numbers:     Count-up animation when scrolled into view
Context Stack:    Smooth panel slide when active layer changes
Logo row:         CSS-only infinite scroll marquee for trust logos
Testimonials:     Two-row auto-scrolling ticker, opposite directions, pause on hover
```

---

## 7. Component Patterns

### Pill Badge
```
Background:   #1A1A1A
Border:       1px #2E2E2E
Border-radius: 100px
Padding:      6px 14px
Font:         12px, weight 500
Optional dot: 6px circle, accent color, left of text with pulse animation
```

### Section Counter Label
```
Format:       [01 / SECTION NAME]
Font:         11px monospace, uppercase, letter-spacing 0.12em
Color:        #444
Margin-bottom: 24px
```

### Stat Block
```
Number:       Display font, 48–72px, white
Label:        12px, #555, uppercase, mono, margin-top 4px
Container:    No box — stats are inline or in a transparent row
```

### Divider
```
Style:   1px solid #1A1A1A
Width:   100%
Margin:  64px 0
```

---

## 8. Responsive Breakpoints

```
Mobile:   < 640px
Tablet:   640px – 1024px
Desktop:  1024px – 1280px
Wide:     > 1280px

Key adaptations:
- Nav: hamburger menu below 768px
- Hero: single column, visual moves below text
- Cards: stack vertically below 768px
- Pricing: horizontal scroll or accordion below 900px
- Testimonials: 1 column masonry on mobile
- Code block: full-width, font-size 12px on mobile
- Context Stack: vertical tab list + detail below (no sticky)
```

---

## 9. Spacing Tokens

```
--space-xs:   4px
--space-sm:   8px
--space-md:   16px
--space-lg:   24px
--space-xl:   40px
--space-2xl:  64px
--space-3xl:  96px
--space-4xl:  120px

--radius-sm:  6px
--radius-md:  12px
--radius-lg:  16px
--radius-full: 100px
```

---

## 10. Key Design Decisions (Summary)

| Decision | Choice | Reason |
|---|---|---|
| Background | Near-black `#0A0A0A`, not pure black | Reduces harshness, more editorial |
| Accent color | Single neon mint `#00FFA3` | One dominant accent = maximum impact |
| Typography | Neue Machina + Geist | Mechanical + clean, avoids generic SaaS fonts |
| Section structure | Numbered, labeled sections | Editorial feel, builds narrative trust |
| Card borders | `1px #222` at rest, `#333` on hover | Subtle depth without glow abuse |
| Code blocks | Dark bg, subtle mac-dots, full syntax highlighting | Developer-focused credibility signal |
| Testimonials | Auto-scrolling ticker rows | Shows volume of love without paging |
| Featured pricing card | Accent border + gradient bg | Clear hierarchy without garish colors |
| Animation | Entrance only, no looping distractions | Respects user focus, feels polished |
| Grid texture in hero | 1px lines on dark bg | Technical/system feel without heavy imagery |
