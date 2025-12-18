# Qelyx Platform - Font & Color Template Documentation

## Table of Contents
1. [Color System Overview](#color-system-overview)
2. [Typography System](#typography-system)
3. [Color Palette](#color-palette)
4. [Component-Specific Colors](#component-specific-colors)
5. [Gradients](#gradients)
6. [Shadows & Effects](#shadows--effects)
7. [Responsive Typography](#responsive-typography)
8. [Usage Examples](#usage-examples)
9. [CSS Variables Reference](#css-variables-reference)

---

## Color System Overview

The Qelyx platform uses a comprehensive color system with CSS custom properties (variables) for consistency across both applications. The system is organized into semantic color categories.

### Color Architecture

```
Color System
├── Background Colors (Dark Theme)
├── Text Colors (Hierarchy)
├── Primary Colors (Brand)
├── Accent Colors
├── Status Colors
├── Border Colors
└── Gradient Definitions
```

---

## Typography System

### Font Family

#### Primary Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
             'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
```

**Font Source**: Google Fonts (Inter)  
**Fallback**: System fonts for performance

#### Code/Monospace Font
```css
font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace;
```

### Font Weights

| Weight | Value | Usage |
|--------|-------|-------|
| Light | 300 | Rarely used |
| Regular | 400 | Body text, paragraphs |
| Medium | 500 | Navigation links, labels |
| Semi-bold | 600 | Buttons, emphasis, badges |
| Bold | 700 | Headings (h3-h6), cards |
| Extra-bold | 800 | Main headings (h1-h2), hero text |

### Font Sizes

#### Qelyx Solutioning Platform

| Element | Size | Line Height | Weight | Letter Spacing |
|---------|------|-------------|--------|----------------|
| Hero Title | `clamp(2.5rem, 5vw, 4rem)` | 1.1 | 800 | -0.02em |
| Section Title | `clamp(2rem, 4vw, 3rem)` | 1.1 | 800 | -0.02em |
| H1 | `2.5rem - 4rem` | 1.1 | 800 | -0.02em |
| H2 | `2rem - 3rem` | 1.2 | 800 | -0.02em |
| H3 | `1.4rem - 1.8rem` | 1.3 | 700 | -0.01em |
| H4 | `1.2rem - 1.4rem` | 1.4 | 700 | -0.01em |
| Body Large | `1.15rem` | 1.7 | 400 | -0.01em |
| Body | `1rem` (16px) | 1.6 | 400 | -0.01em |
| Body Small | `0.9rem` | 1.5 | 400 | -0.01em |
| Eyebrow | `0.8rem` | 1.2 | 700 | 0.12em |
| Button | `0.95rem` | 1.2 | 600 | 0 |
| Caption | `0.85rem` | 1.4 | 400 | 0.01em |
| Label | `0.9rem` | 1.3 | 500 | 0.02em |

#### Integration Mapping Blueprint

| Element | Size | Line Height | Weight | Letter Spacing |
|---------|------|-------------|--------|----------------|
| Hero Title | `72px` | 1.1 | 800 | -1px |
| Section Title | `48px` | 1.2 | 700 | -1px |
| H1 | `72px` | 1.1 | 800 | -1px |
| H2 | `48px` | 1.2 | 700 | -1px |
| H3 | `24px` | 1.3 | 600 | 0 |
| H4 | `20px` | 1.4 | 600 | 0 |
| Body Large | `20px` | 1.6 | 400 | 0 |
| Body | `16px` | 1.7 | 400 | 0.01em |
| Body Small | `14px` | 1.6 | 400 | 0.01em |
| Button | `16px` | 1.2 | 600 | 0 |
| Caption | `13px` | 1.5 | 400 | 0 |
| Label | `14px` | 1.3 | 500 | 0 |

### Letter Spacing

- **Tight**: `-0.02em` (Headings)
- **Normal**: `-0.01em` (Body text)
- **Wide**: `0.01em - 0.12em` (Labels, badges, uppercase text)

### Line Height

- **Tight**: `1.1 - 1.2` (Headings)
- **Normal**: `1.6 - 1.7` (Body text)
- **Loose**: `1.8+` (Long-form content)

---

## Color Palette

### Background Colors

#### Qelyx Solutioning Platform

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--bg` | `#0a0f1c` | `rgb(10, 15, 28)` | Main background |
| `--bg-alt` | `#0f1625` | `rgb(15, 22, 37)` | Alternate sections |
| `--surface` | `#151b2e` | `rgb(21, 27, 46)` | Cards, panels |
| `--surface-elevated` | `#1c2438` | `rgb(28, 36, 56)` | Elevated cards, modals |

#### Integration Mapping Blueprint

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--bg` | `#0a0e27` | `rgb(10, 14, 39)` | Main background |
| `--bg-alt` | `#1a1f3a` | `rgb(26, 31, 58)` | Alternate sections |
| `--surface` | `rgba(255, 255, 255, 0.03)` | - | Cards, panels |
| `--card` | `#0f1f3b` | `rgb(15, 31, 59)` | Card backgrounds |

### Text Colors

#### Qelyx Solutioning Platform

| Variable | Hex | RGB | Opacity | Usage |
|----------|-----|-----|---------|-------|
| `--text` | `#ffffff` | `rgb(255, 255, 255)` | 100% | Primary text |
| `--text-muted` | `#a0aec0` | `rgb(160, 174, 192)` | 100% | Secondary text |
| `--text-subtle` | `#718096` | `rgb(113, 128, 150)` | 100% | Tertiary text |

#### Integration Mapping Blueprint

| Variable | Hex | RGB | Opacity | Usage |
|----------|-----|-----|---------|-------|
| `--text` | `#ffffff` | `rgb(255, 255, 255)` | 100% | Primary text |
| `--muted` | `rgba(255, 255, 255, 0.7)` | - | 70% | Secondary text |
| `--text-subtle` | `rgba(255, 255, 255, 0.5)` | - | 50% | Tertiary text |

### Primary Colors (Brand)

#### Qelyx Solutioning Platform

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--primary` | `#00d9ff` | `rgb(0, 217, 255)` | Primary actions, links |
| `--primary-dark` | `#00b8d4` | `rgb(0, 184, 212)` | Hover states |
| `--primary-light` | `#33e0ff` | `rgb(51, 224, 255)` | Light accents |
| `--primary-glow` | `rgba(0, 217, 255, 0.25)` | - | Glow effects |

#### Integration Mapping Blueprint

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--primary` | `#24e0c9` | `rgb(36, 224, 201)` | Primary actions |
| `--primary-strong` | `#13c7b1` | `rgb(19, 199, 177)` | Hover states |

### Accent Colors

#### Qelyx Solutioning Platform

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| `--accent` | `#6366f1` | `rgb(99, 102, 241)` | Accent elements |
| `--accent-dark` | `#4f46e5` | `rgb(79, 70, 229)` | Darker accent |

#### Integration Mapping Blueprint

| Variable | Hex | RGB | Usage |
|----------|-----|-----|-------|
| Accent Purple | `#667eea` | `rgb(102, 126, 234)` | Module icons, badges |
| Accent Pink | `#f093fb` | `rgb(240, 147, 251)` | Gradient accents |
| Accent Cyan | `#4facfe` | `rgb(79, 172, 254)` | Secondary accents |
| Accent Green | `#43e97b` | `rgb(67, 233, 123)` | Success states |

### Border Colors

#### Qelyx Solutioning Platform

| Variable | Hex | RGB | Opacity | Usage |
|----------|-----|-----|---------|-------|
| `--border` | `rgba(255, 255, 255, 0.1)` | - | 10% | Default borders |
| `--border-strong` | `rgba(255, 255, 255, 0.15)` | - | 15% | Strong borders |
| `--border-primary` | `rgba(0, 217, 255, 0.3)` | - | 30% | Primary borders |

#### Integration Mapping Blueprint

| Variable | Hex | RGB | Opacity | Usage |
|----------|-----|-----|---------|-------|
| `--border` | `rgba(255, 255, 255, 0.1)` | - | 10% | Default borders |
| Border Primary | `#667eea` | `rgb(102, 126, 234)` | 100% | Active borders |

### Status Colors

| Status | Hex | RGB | Usage |
|--------|-----|-----|-------|
| Success | `#10b981` | `rgb(16, 185, 129)` | Success states, checkmarks |
| Warning | `#f59e0b` | `rgb(245, 158, 11)` | Warning states |
| Error | `#ef4444` | `rgb(239, 68, 68)` | Error states |
| Info | `#3b82f6` | `rgb(59, 130, 246)` | Information states |

---

## Component-Specific Colors

### Buttons

#### Primary Button (Qelyx Solutioning)
```css
Background: linear-gradient(135deg, #00d9ff, #00b8d4)
Text Color: #0a0f1c
Font Size: 0.95rem
Font Weight: 600
Border Radius: 10px
Shadow: 0 4px 16px rgba(0, 217, 255, 0.3)
```

#### Primary Button (Integration Mapping)
```css
Background: linear-gradient(135deg, #667eea, #764ba2)
Text Color: #ffffff
Font Size: 16px
Font Weight: 600
Border Radius: 12px
Shadow: 0 8px 32px rgba(102, 126, 234, 0.4)
```

#### Secondary Button
```css
Background: rgba(255, 255, 255, 0.05)
Text Color: #ffffff
Font Size: 0.95rem
Font Weight: 600
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 10px
```

### Cards

#### Module Card
```css
Background: #151b2e (Qelyx) / rgba(255, 255, 255, 0.03) (Mapping)
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 16px
Padding: 32px
Text Color: #ffffff
```

#### Pipeline Card
```css
Background: #151b2e
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 12px
Padding: 24px
Hover Border: #00d9ff
```

### Navigation

#### Active Link
```css
Color: #00d9ff (Qelyx) / #818cf8 (Mapping)
Background: rgba(0, 217, 255, 0.1)
Font Weight: 500
Font Size: 0.9rem (Qelyx) / 14px (Mapping)
```

#### Inactive Link
```css
Color: #a0aec0 (Qelyx) / rgba(255, 255, 255, 0.7) (Mapping)
Font Weight: 500
Font Size: 0.9rem (Qelyx) / 14px (Mapping)
```

### Headers

#### Site Header
```css
Background: rgba(10, 14, 26, 0.85) (Qelyx) / rgba(10, 14, 39, 0.95) (Mapping)
Backdrop Filter: blur(20px) (Qelyx) / blur(10px) (Mapping)
Border Bottom: 1px solid rgba(255, 255, 255, 0.1)
Height: 64px
```

#### Logo
```css
Font Size: 1.35rem (Qelyx) / 18px (Mapping)
Font Weight: 600-700
Color: #ffffff (Qelyx) / Gradient (Mapping)
```

### Modals

#### Modal Overlay
```css
Background: rgba(0, 0, 0, 0.8)
Backdrop Filter: blur(8px)
```

#### Modal Content
```css
Background: #1c2438
Border: 1px solid rgba(255, 255, 255, 0.1)
Border Radius: 20px
Max Width: 1000px
Shadow: 0 16px 48px rgba(0, 0, 0, 0.5)
```

### Tables

#### Table Header
```css
Background: rgba(255, 255, 255, 0.1)
Text Color: #818cf8
Font Weight: 600
Font Size: 14px
```

#### Table Row
```css
Background: transparent
Text Color: rgba(255, 255, 255, 0.9)
Font Size: 14px
Hover Background: rgba(102, 126, 234, 0.2)
```

---

## Gradients

### Primary Gradients

#### Qelyx Solutioning Platform

**Primary Gradient**
```css
linear-gradient(135deg, #00d9ff, #00b8d4)
Usage: Buttons, badges, highlights
```

**Accent Gradient**
```css
linear-gradient(135deg, #6366f1, #4f46e5)
Usage: Secondary elements
```

#### Integration Mapping Blueprint

**Module Gradients**

1. **Partner Connect (Broker Configuration)**
   ```css
   linear-gradient(135deg, #667eea 0%, #764ba2 100%)
   ```

2. **Data Gateway (Document Ingestion)**
   ```css
   linear-gradient(135deg, #f093fb 0%, #f5576c 100%)
   ```

3. **Schema Builder (Data Dictionary)**
   ```css
   linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)
   ```

4. **Mapping Studio (Metadata Mapping)**
   ```css
   linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)
   ```

5. **Lineage Vision (Data Lineage)**
   ```css
   linear-gradient(135deg, #fa709a 0%, #fee140 100%)
   ```

6. **Output Center (Target Data)**
   ```css
   linear-gradient(135deg, #30cfd0 0%, #330867 100%)
   ```

### Background Gradients

#### Hero Background (Qelyx)
```css
radial-gradient(circle at 20% 30%, rgba(0, 217, 255, 0.08), transparent 50%),
radial-gradient(circle at 80% 70%, rgba(99, 102, 241, 0.06), transparent 50%)
```

#### Hero Background (Integration Mapping)
```css
linear-gradient(180deg, #0a0e27 0%, #1a1f3a 100%)
```

### Text Gradients

#### Gradient Text (Hero Titles)
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## Shadows & Effects

### Box Shadows

#### Qelyx Solutioning Platform

| Variable | Value | Usage |
|----------|-------|-------|
| `--shadow-sm` | `0 2px 8px rgba(0, 0, 0, 0.3)` | Small elements |
| `--shadow-md` | `0 8px 24px rgba(0, 0, 0, 0.4)` | Cards, panels |
| `--shadow-lg` | `0 16px 48px rgba(0, 0, 0, 0.5)` | Modals, overlays |
| `--shadow-glow` | `0 0 40px rgba(0, 217, 255, 0.2)` | Primary glow effects |

#### Integration Mapping Blueprint

| Variable | Value | Usage |
|----------|-------|-------|
| `--shadow` | `0 20px 60px rgba(0, 0, 0, 0.35)` | Cards, panels |
| Button Shadow | `0 8px 32px rgba(102, 126, 234, 0.4)` | Primary buttons |
| Card Shadow | `0 20px 60px rgba(102, 126, 234, 0.2)` | Hover states |

### Glow Effects

#### Primary Glow
```css
box-shadow: 0 0 40px rgba(0, 217, 255, 0.2);
filter: drop-shadow(0 0 8px rgba(0, 217, 255, 0.3));
```

#### Accent Glow
```css
box-shadow: 0 0 20px rgba(102, 126, 241, 0.3);
```

---

## Responsive Typography

### Breakpoints

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile | `max-width: 768px` | Small screens |
| Tablet | `768px - 1024px` | Medium screens |
| Desktop | `min-width: 1024px` | Large screens |

### Responsive Font Sizes

#### Hero Title
```css
/* Desktop */
font-size: 4rem; /* 64px */

/* Tablet */
font-size: 3rem; /* 48px */

/* Mobile */
font-size: 2.5rem; /* 40px */

/* Using clamp */
font-size: clamp(2.5rem, 5vw, 4rem);
```

#### Section Title
```css
font-size: clamp(2rem, 4vw, 3rem);
```

#### Body Text
```css
/* Desktop */
font-size: 1rem; /* 16px */

/* Mobile */
font-size: 0.9rem; /* 14.4px */
```

---

## Usage Examples

### Typography Examples

#### Hero Heading
```css
.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}
```

#### Section Heading
```css
.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text);
}
```

#### Body Text
```css
.body-text {
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.01em;
  color: var(--text-muted);
}
```

#### Eyebrow Text
```css
.eyebrow {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--primary);
}
```

### Color Examples

#### Primary Button
```css
.cta-primary {
  background: var(--gradient-primary);
  color: var(--bg);
  font-weight: 600;
  font-size: 0.95rem;
  padding: 12px 24px;
  border-radius: 10px;
  box-shadow: 0 4px 16px rgba(0, 217, 255, 0.3);
}
```

#### Card Component
```css
.module-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 16px;
  padding: 32px;
  color: var(--text);
}
```

#### Text Hierarchy
```css
.primary-text {
  color: var(--text); /* #ffffff */
}

.secondary-text {
  color: var(--text-muted); /* #a0aec0 */
}

.tertiary-text {
  color: var(--text-subtle); /* #718096 */
}
```

---

## CSS Variables Reference

### Complete Variable List (Qelyx Solutioning)

```css
:root {
  /* Background Colors */
  --bg: #0a0f1c;
  --bg-alt: #0f1625;
  --surface: #151b2e;
  --surface-elevated: #1c2438;
  
  /* Text Colors */
  --text: #ffffff;
  --text-muted: #a0aec0;
  --text-subtle: #718096;
  
  /* Primary Colors */
  --primary: #00d9ff;
  --primary-dark: #00b8d4;
  --primary-light: #33e0ff;
  --primary-glow: rgba(0, 217, 255, 0.25);
  
  /* Accent Colors */
  --accent: #6366f1;
  --accent-dark: #4f46e5;
  
  /* Border Colors */
  --border: rgba(255, 255, 255, 0.1);
  --border-strong: rgba(255, 255, 255, 0.15);
  --border-primary: rgba(0, 217, 255, 0.3);
  
  /* Shadows */
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 8px 24px rgba(0, 0, 0, 0.4);
  --shadow-lg: 0 16px 48px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 40px rgba(0, 217, 255, 0.2);
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-dark));
  --gradient-accent: linear-gradient(135deg, var(--accent), var(--accent-dark));
}
```

### Complete Variable List (Integration Mapping)

```css
:root {
  /* Background Colors */
  --bg: #060f1f;
  --bg-alt: #0c1a33;
  --card: #0f1f3b;
  --surface: #0a162b;
  
  /* Text Colors */
  --text: #e9eef7;
  --muted: #a7b4c9;
  
  /* Primary Colors */
  --primary: #24e0c9;
  --primary-strong: #13c7b1;
  
  /* Border Colors */
  --border: #1d2c4a;
  
  /* Shadows */
  --shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}
```

---

## Color Accessibility

### Contrast Ratios

| Text Color | Background | Ratio | WCAG Level |
|------------|------------|-------|------------|
| `#ffffff` | `#0a0f1c` | 15.8:1 | AAA |
| `#ffffff` | `#151b2e` | 13.2:1 | AAA |
| `#a0aec0` | `#0a0f1c` | 7.2:1 | AA |
| `#00d9ff` | `#0a0f1c` | 8.5:1 | AAA |
| `#718096` | `#0a0f1c` | 4.8:1 | AA (Large text) |

### Color Blindness Considerations

- Primary actions use both color and shape (buttons, icons)
- Status indicators include text labels
- Borders provide additional visual distinction
- Icons supplement color coding

---

## Best Practices

### Typography

1. **Use semantic HTML**: `<h1>`, `<h2>`, `<p>`, etc.
2. **Maintain hierarchy**: Clear distinction between heading levels
3. **Limit font sizes**: Use the defined scale consistently
4. **Responsive design**: Use `clamp()` for fluid typography
5. **Line length**: Keep body text between 45-75 characters per line

### Colors

1. **Use CSS variables**: Always reference variables, not hardcoded colors
2. **Semantic naming**: Use `--text-muted` not `--gray-500`
3. **Consistency**: Use the same color for the same purpose
4. **Accessibility**: Ensure sufficient contrast ratios
5. **Dark theme**: All colors are optimized for dark backgrounds

### Gradients

1. **Consistent direction**: Use `135deg` for most gradients
2. **Subtle effects**: Keep opacity low for background gradients
3. **Performance**: Use CSS gradients over images when possible
4. **Fallbacks**: Provide solid color fallbacks

---

## Quick Reference

### Common Typography Classes

```css
/* Headings */
.hero-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; }
.section-title { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; }
.card-title { font-size: 1.2rem; font-weight: 700; }

/* Body */
.body-large { font-size: 1.15rem; line-height: 1.7; }
.body { font-size: 1rem; line-height: 1.6; }
.body-small { font-size: 0.9rem; line-height: 1.5; }

/* Labels */
.eyebrow { font-size: 0.8rem; font-weight: 700; text-transform: uppercase; }
.label { font-size: 0.9rem; font-weight: 500; }
.caption { font-size: 0.85rem; }
```

### Common Color Classes

```css
/* Text Colors */
.text-primary { color: var(--text); }
.text-muted { color: var(--text-muted); }
.text-subtle { color: var(--text-subtle); }
.text-accent { color: var(--primary); }

/* Background Colors */
.bg-primary { background: var(--bg); }
.bg-surface { background: var(--surface); }
.bg-elevated { background: var(--surface-elevated); }

/* Border Colors */
.border-default { border-color: var(--border); }
.border-strong { border-color: var(--border-strong); }
.border-primary { border-color: var(--border-primary); }
```

---

## Version History

- **v1.0.0** (January 2025): Initial documentation
  - Complete color system documentation
  - Typography scale definition
  - Component-specific color guidelines
  - Responsive typography guidelines

---

## Document Information

**Document Version**: 1.0  
**Last Updated**: January 2025  
**Author**: Qelyx Design Team  
**Status**: Active  
**Next Review**: April 2025

---

*This template documentation is a living document and will be updated as the design system evolves.*

