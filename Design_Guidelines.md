# Design Guidelines
## QELYX Website - Visual Identity & UX Standards

---

## 1. Design Philosophy

**Core Principles:**
- **Elegant Simplicity:** Clean, sophisticated design that conveys professionalism
- **Data-Driven Aesthetics:** Visual elements inspired by data visualization and connectivity
- **Trust & Authority:** Design that reinforces expertise and credibility
- **Progressive Disclosure:** Information revealed contextually as users explore
- **Purposeful Animation:** Motion that enhances UX, not distracts

**Brand Personality:**
- Innovative yet trustworthy
- Technical yet accessible
- Bold yet refined
- Modern yet timeless

---

## 2. Color System

### Primary Colors
```css
--primary-navy: #150734;        /* Deep Navy - Main brand color */
--primary-ocean: #0f2557;       /* Ocean Blue - Secondary brand */
--primary-legacy: #0A1A2F;      /* Legacy navy (phase out gradually) */
```

### Secondary Colors
```css
--secondary-azure: #28559a;     /* Azure Blue - Mid-tone */
--secondary-bright: #3778c2;    /* Bright Blue - Interactive elements */
```

### Accent Colors (Gradients & Highlights)
```css
--accent-sky: #4b9FE1;          /* Sky Blue - Light accent */
--accent-aqua: #63BCE5;         /* Aqua - Mid accent */
--accent-cyan: #7ED5EA;         /* Cyan - Bright accent */
--gradient-electric: linear-gradient(135deg, #2A6FF4 0%, #15d5d1 100%);
```

### Neutral Colors
```css
--graphite: #4A4A4A;            /* Graphite Grey - Body text */
--cloud-white: #F5F7FA;         /* Cloud White - Backgrounds */
--pure-white: #FFFFFF;          /* Pure White - Cards, overlays */
--border-light: rgba(74, 74, 74, 0.1);  /* Subtle borders */
--shadow-base: rgba(10, 26, 47, 0.08);  /* Soft shadows */
```

### Color Usage Rules

**Backgrounds:**
- Primary pages: `cloud-white` (#F5F7FA)
- Hero sections: `primary-navy` (#150734) or `primary-ocean` (#0f2557)
- Cards/Panels: `pure-white` with subtle shadow

**Text:**
- Headers: `primary-navy` (#150734)
- Body text: `graphite` (#4A4A4A)
- Light backgrounds: Use primary colors
- Dark backgrounds: `pure-white` or `cloud-white`

**Interactive Elements:**
- Primary CTA buttons: `gradient-electric` or `secondary-bright`
- Hover states: 10% darker/lighter shade
- Links: `secondary-bright` (#3778c2)
- Link hover: `accent-sky` (#4b9FE1)

**Accents:**
- Icons: `accent-aqua` or `accent-cyan`
- Highlights: `gradient-electric`
- Data visualizations: Use full accent palette

### Accessibility Requirements
- Maintain minimum 4.5:1 contrast ratio for body text
- Maintain minimum 3:1 contrast ratio for large text (18pt+)
- Never use color alone to convey information

---

## 3. Typography

### Font Family
```css
/* Primary Font Stack */
font-family: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;

/* Alternative: */
font-family: 'Poppins', 'Inter', sans-serif;  /* For headings */
font-family: 'Inter', sans-serif;              /* For body */
```

### Type Scale

**Headings:**
```css
h1 {
  font-size: 3.5rem;      /* 56px */
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.02em;
}

h2 {
  font-size: 2.5rem;      /* 40px */
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: -0.01em;
}

h3 {
  font-size: 1.875rem;    /* 30px */
  line-height: 1.3;
  font-weight: 600;
}

h4 {
  font-size: 1.5rem;      /* 24px */
  line-height: 1.4;
  font-weight: 600;
}

h5 {
  font-size: 1.25rem;     /* 20px */
  line-height: 1.5;
  font-weight: 600;
}
```

**Body Text:**
```css
body {
  font-size: 1rem;        /* 16px */
  line-height: 1.6;
  font-weight: 400;
}

.lead {
  font-size: 1.25rem;     /* 20px */
  line-height: 1.7;
  font-weight: 400;
}

.small {
  font-size: 0.875rem;    /* 14px */
  line-height: 1.5;
}

.caption {
  font-size: 0.75rem;     /* 12px */
  line-height: 1.4;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
```

### Responsive Typography
```css
/* Mobile (< 768px) */
h1 { font-size: 2.5rem; }
h2 { font-size: 2rem; }
h3 { font-size: 1.5rem; }

/* Tablet (768px - 1024px) */
h1 { font-size: 3rem; }
h2 { font-size: 2.25rem; }
h3 { font-size: 1.75rem; }

/* Desktop (> 1024px) */
/* Use base sizes defined above */
```

---

## 4. Spacing System

### Base Unit: 8px

```css
--space-xs: 0.5rem;     /* 8px */
--space-sm: 1rem;       /* 16px */
--space-md: 1.5rem;     /* 24px */
--space-lg: 2rem;       /* 32px */
--space-xl: 3rem;       /* 48px */
--space-2xl: 4rem;      /* 64px */
--space-3xl: 6rem;      /* 96px */
--space-4xl: 8rem;      /* 128px */
```

### Component Spacing
- **Card padding:** `space-lg` (32px)
- **Section padding (vertical):** `space-3xl` to `space-4xl` (96px-128px)
- **Section padding (mobile):** `space-xl` (48px)
- **Button padding:** `space-sm` horizontal, `space-xs` vertical
- **Input padding:** `space-sm` (16px)

### Layout Grid
- **Max content width:** 1280px
- **Container padding:** `space-md` on mobile, `space-lg` on desktop
- **Column gap:** `space-lg` (32px)
- **Row gap:** `space-xl` (48px)

---

## 5. Component Specifications

### 5.1 Buttons

**Primary Button:**
```css
background: linear-gradient(135deg, #2A6FF4 0%, #15d5d1 100%);
padding: 14px 32px;
border-radius: 8px;
font-size: 1rem;
font-weight: 600;
color: white;
border: none;
box-shadow: 0 4px 12px rgba(42, 111, 244, 0.3);
transition: all 0.3s ease;

/* Hover */
transform: translateY(-2px);
box-shadow: 0 6px 20px rgba(42, 111, 244, 0.4);
```

**Secondary Button:**
```css
background: transparent;
border: 2px solid #3778c2;
color: #3778c2;
padding: 12px 32px;
border-radius: 8px;
font-weight: 600;

/* Hover */
background: #3778c2;
color: white;
```

**Ghost Button:**
```css
background: transparent;
border: none;
color: #3778c2;
padding: 12px 24px;
text-decoration: underline;
text-underline-offset: 4px;

/* Hover */
color: #4b9FE1;
```

### 5.2 Cards

**Standard Card:**
```css
background: white;
border-radius: 12px;
padding: 32px;
box-shadow: 0 2px 8px rgba(10, 26, 47, 0.06);
transition: all 0.3s ease;

/* Hover */
box-shadow: 0 8px 24px rgba(10, 26, 47, 0.12);
transform: translateY(-4px);
```

**Service Card:**
```css
background: white;
border-radius: 16px;
padding: 40px;
border: 1px solid rgba(74, 74, 74, 0.08);
position: relative;
overflow: hidden;

/* Add gradient accent bar */
&::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: var(--gradient-electric);
}
```

### 5.3 Navigation

**Header:**
```css
height: 80px;
background: rgba(255, 255, 255, 0.98);
backdrop-filter: blur(10px);
box-shadow: 0 2px 8px rgba(10, 26, 47, 0.04);
position: sticky;
top: 0;
z-index: 100;
```

**Nav Links:**
```css
font-size: 0.95rem;
font-weight: 500;
color: #150734;
padding: 8px 16px;
transition: color 0.2s ease;

/* Hover */
color: #3778c2;

/* Active */
color: #3778c2;
border-bottom: 2px solid #3778c2;
```

### 5.4 Forms

**Input Fields:**
```css
padding: 14px 16px;
border: 1.5px solid rgba(74, 74, 74, 0.2);
border-radius: 8px;
font-size: 1rem;
background: white;
transition: all 0.2s ease;

/* Focus */
border-color: #3778c2;
box-shadow: 0 0 0 3px rgba(55, 120, 194, 0.1);
outline: none;

/* Error */
border-color: #EF4444;
```

**Textarea:**
```css
min-height: 120px;
resize: vertical;
/* Inherits input styles */
```

---

## 6. Animations & Interactions

### Animation Principles
- **Duration:** 200ms for micro-interactions, 300-400ms for transitions
- **Easing:** `cubic-bezier(0.4, 0.0, 0.2, 1)` for standard, `cubic-bezier(0.0, 0.0, 0.2, 1)` for deceleration
- **Purpose:** Enhance UX, provide feedback, guide attention

### Interaction Patterns

**Page Transitions:**
```css
opacity: 0;
transform: translateY(20px);
animation: fadeInUp 0.6s ease forwards;

@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

**Hover Effects:**
- **Cards:** Lift with shadow increase
- **Buttons:** Slight lift + glow
- **Links:** Color change + underline animation
- **Images:** Subtle scale (1.05x)

**Scroll Animations:**
- Fade in elements as they enter viewport
- Counter animations for metrics
- Parallax on hero sections (subtle, 0.5x speed)

**Data Visualizations:**
- Numbers count up on scroll into view
- Charts animate from 0 to final value
- Stagger animation for multiple elements (100ms delay between)

---

## 7. Iconography

### Style
- **Line weight:** 2px
- **Style:** Outline/stroke icons
- **Size:** 24px standard, 32px for features, 16px for inline
- **Color:** Match text color or use accent colors

### Icon Library
- **Recommended:** Lucide Icons, Heroicons, or Feather Icons
- **Custom:** Data-related icons (nodes, connections, graphs)

### Usage
- Always include accessible labels
- Use consistent sizing within sections
- Pair with text for clarity
- Animate on hover (subtle rotation, scale, or color)

---

## 8. Layout Patterns

### Hero Section
```
[Full viewport height]
- Centered content
- Large headline + subheadline
- 2 CTAs (primary + secondary)
- Background: Dark gradient or animated visual
- Text: White for contrast
```

### Content Sections
```
[Alternating layouts]
- Pattern 1: Text left, visual right (60/40 split)
- Pattern 2: Visual left, text right (40/60 split)
- Pattern 3: Centered content with full-width visual
- Vertical spacing: 96px - 128px between sections
```

### Grid Systems
- **2-column:** Tablet and up
- **3-column:** Desktop (Services, Team, Case Studies)
- **4-column:** Large desktop (Logos, Stats)
- **Gap:** 32px standard

---

## 9. Imagery Guidelines

### Photo Style
- **Mood:** Professional, modern, aspirational
- **Treatment:** Subtle overlay (10-20% navy gradient) when text overlays
- **Subjects:** Technology, data visualizations, diverse professionals, abstract

### Illustrations
- **Style:** Geometric, data-inspired, minimal
- **Colors:** Use brand palette, especially electric gradient
- **Usage:** Feature graphics, empty states, section dividers

### Image Optimization
- **Format:** WebP with JPG fallback
- **Lazy loading:** Enabled for below-fold images
- **Responsive images:** Provide 1x, 2x, 3x for retina displays
- **Alt text:** Always required

---

## 10. Responsive Design Breakpoints

```css
/* Mobile first approach */
--breakpoint-sm: 640px;   /* Small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large displays */
```

### Mobile Design (<768px)
- Single column layouts
- Stacked navigation (hamburger menu)
- Larger touch targets (min 44x44px)
- Simplified animations
- Hide secondary content

### Tablet (768px - 1024px)
- 2-column layouts where appropriate
- Expanded navigation (may still use hamburger)
- Show more content

### Desktop (>1024px)
- Full multi-column layouts
- Horizontal navigation
- Advanced interactions and animations
- Maximum content visibility

---

## 11. Accessibility Standards

### WCAG 2.1 Level AA Compliance

**Color Contrast:**
- Body text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- Interactive elements: 3:1 minimum

**Keyboard Navigation:**
- All interactive elements reachable via Tab
- Clear focus indicators (2px outline, brand color)
- Skip to main content link
- Logical tab order

**Screen Reader Support:**
- Semantic HTML elements
- ARIA labels for custom components
- Alt text for images
- Descriptive link text (no "click here")

**Motion & Animation:**
- Respect `prefers-reduced-motion`
- Provide pause controls for auto-playing carousels
- No flashing content (< 3 times per second)

---

## 12. Design Inspirations & References

### Reference Websites
1. **WIX Tech Template:** Modern, clean, tech-forward aesthetic
   - URL: https://www.wix.com/website-template/view/html/2855

2. **BPI France:** Bold typography, confident brand presence
   - URL: https://bel.bpifrance.fr/

### Key Takeaways
- Large, bold typography
- Generous white space
- Data-driven visual elements
- Smooth, purposeful animations
- Clear visual hierarchy
- Trust-building through design

---

## 13. Brand Assets

### Logo Usage
- Clear space: Minimum 20px on all sides
- Minimum size: 100px width
- Formats: SVG (preferred), PNG (2x resolution)
- Variations: Full color, white, navy

### Logo Don'ts
- Don't stretch or distort
- Don't change colors outside brand palette
- Don't apply effects (shadows, outlines)
- Don't place on busy backgrounds without overlay

---

## 14. Design Deliverables Checklist

Before development, ensure:
- [ ] All pages designed for mobile, tablet, desktop
- [ ] Interactive states defined (hover, active, focus, disabled)
- [ ] Loading states designed
- [ ] Error states designed
- [ ] Empty states designed
- [ ] Animations specified (trigger, duration, easing)
- [ ] Spacing measured and documented
- [ ] Colors extracted and named
- [ ] Typography scale documented
- [ ] Component library created
- [ ] Accessibility notes included
- [ ] Design system documented