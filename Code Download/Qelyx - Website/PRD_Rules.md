# Product Requirements Document (PRD)
## QELYX Website - Full Stack Application

### 1. Project Overview

**Product Name:** QELYX Corporate Website  
**Version:** 1.0  
**Type:** Full-stack web application  
**Architecture:** React.js (Frontend) + Flask (Backend)

**Purpose:**  
Create a modern, elegant website for Qelyx, a data and AI consulting company, that showcases their services, expertise, and value proposition while driving client engagement through strategic CTAs.

---

### 2. Tech Stack Requirements

#### Frontend (`/client`)
- **Framework:** React.js (latest stable version)
- **Styling:** Tailwind CSS or styled-components
- **State Management:** React Context API or Redux (for complex state)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Animation Libraries:** Framer Motion or GSAP
- **Form Handling:** React Hook Form
- **Build Tool:** Vite or Create React App

#### Backend (`/server`)
- **Framework:** Flask (Python 3.9+)
- **Database:** PostgreSQL or MongoDB
- **ORM:** SQLAlchemy (if PostgreSQL)
- **API Design:** RESTful architecture
- **Validation:** Flask-WTF or Marshmallow
- **Email Service:** Flask-Mail or SendGrid integration
- **Environment:** python-dotenv for config management
- **CORS:** Flask-CORS

---

### 3. Feature Requirements

#### 3.1 Homepage Features

**Hero Section:**
- Headline: "Turning Data into Decisions"
- Subheadline: "Qelyx helps organisations unlock the power of data through advisory, innovation, and implementation services that accelerate decision-making and deliver measurable business outcomes"
- Primary CTA: "Start Your Data Journey" (Book consultation)
- Secondary CTA: "Explore our services"
- Hero Visual: 3D abstract data nodes forming stylized "Q" or "X" with animated particle glow

**Core Value Pillars Section:**
Display 5 pillars in card format:
1. **Quality** - "We bring uncompromising rigor and excellence to every insight and solution"
2. **Expertise** - "Our multidisciplinary data and innovation specialists help you navigate complexity with confidence"
3. **Leadership** - "We partner with you as strategic leaders—shaping vision, guiding transformation, and unlocking new possibilities"
4. **Yield** - "Our work is designed to deliver tangible results—value, efficiency, and measurable impact"
5. **eXecution** - "Bold ideas matter only when executed well. We turn strategy into scalable, real-world outcomes"

**Interactive Elements:**
- Data Card Carousel with auto-play transitions
- Animated Metric Tiles (numbers counting up on scroll)
- Case Study Story Panels (scroll-activated narrative)

#### 3.2 Navigation Structure

**Primary Navigation Tabs:**
1. Home
2. Why Qelyx (dropdown with: Our Approach, Case Studies, Testimonials)
3. Services (dropdown with: Data Advisory, Innovation, Implementation, Thought Leadership)
4. Industries (dropdown with: Retail, Banking & Capital Markets, Insurance, Health & Life Sciences, Media & Entertainment, Public Sector)
5. About (dropdown with: Story, Mission & Vision, Leadership, Careers)
6. Resources (Blog, Reports, Whitepapers, Guides)
7. Contact

**Header Actions:**
- "Request a Demo" button (prominent, top-right)

**Footer Links:**
- Privacy Policy
- Terms of Service
- Cookie Settings
- Social Links (LinkedIn, Twitter, etc.)

#### 3.3 Services Pages

**1. Data Advisory**
- Content: Strategy, governance, maturity assessments, roadmapping
- Coverage areas:
  - Data & AI strategy
  - Analytics maturity assessment
  - Data governance & Operating model
  - Technology & cloud advisory
  - Privacy & Ethics Frameworks
  - Vendor selection and solution evaluation
  - AI Readiness and Transformation roadmaps
- CTA: "Explore more"

**2. Insight & Intelligence Innovation**
- Content: AI/ML prototypes, automation, concept validation
- Services:
  - AI/ML Prototypes
  - Automation Accelerators
  - Concept validation & POCs
  - Data Product Designs
  - Industry-specific innovation frameworks
  - BI/Analytics Modernisation
  - Predictive & Prescriptive Modelling
  - Generative AI Use-Case Design
  - Customer & Market Insight Frameworks
- CTA: "Learn more"

**3. Implementation & Engineering**
- Content: Modern data platforms, engineering, insights delivery
- Deliverables:
  - Modern data platforms
  - Data pipelines & integration
  - Analytics dashboards & insight systems
  - MLOps & production AI
  - Cloud-native engineering
  - Orchestration
  - Legacy platform decommissioning
  - Data Mesh and Fabric architectures
- CTA: "Explore more"

**4. Thought Leadership**
- Content: Frameworks, workshops, executive storytelling
- Offerings:
  - CXO Advisory
  - Leadership Workshops
  - Data Literacy Training
  - Community & Knowledge Programs
  - Market Research
  - Team upskilling
- CTA: "Learn more"

#### 3.4 Contact Page

**Form Fields:**
- Name (required)
- Email (required, validated)
- Organisation (optional)
- Message (required, textarea)
- Checkbox: "Schedule a Discovery Call" (optional)

**Contact Information Display:**
- Email: sales@qelyx.com
- Phone: +44 (0)7858375128
- Location: London, UK

**Backend Requirements:**
- Form validation
- Email notification to Qelyx team
- Auto-reply to user
- Store inquiries in database
- Rate limiting to prevent spam

#### 3.5 Blog/Resources Section

**Requirements:**
- Blog post listing page (grid/list view)
- Individual blog post pages
- Categories: Reports, Whitepapers, Guides
- Search functionality
- Filter by category/date
- Social sharing buttons

---

### 4. Functional Requirements

#### 4.1 Backend API Endpoints

**Contact Form:**
- `POST /api/contact` - Submit contact form
- Request body: `{name, email, organisation, message, scheduleCall}`
- Response: `{success: boolean, message: string}`

**Blog/Resources:**
- `GET /api/blog/posts` - Fetch all blog posts (with pagination)
- `GET /api/blog/posts/:id` - Fetch single post
- `GET /api/blog/categories` - Fetch categories

**Newsletter Subscription:**
- `POST /api/newsletter/subscribe` - Subscribe to newsletter

**Demo Request:**
- `POST /api/demo/request` - Request demo

#### 4.2 Database Schema

**Contact Inquiries Table:**
```
- id (primary key)
- name (string)
- email (string)
- organisation (string, nullable)
- message (text)
- schedule_call (boolean)
- created_at (timestamp)
- status (enum: new, contacted, closed)
```

**Blog Posts Table:**
```
- id (primary key)
- title (string)
- slug (string, unique)
- content (text)
- excerpt (text)
- category (string)
- author (string)
- published_date (date)
- featured_image (string)
- tags (array/json)
```

#### 4.3 Performance Requirements

- Page load time: < 3 seconds
- Time to Interactive (TTI): < 4 seconds
- Lighthouse score: 90+ for Performance, Accessibility, Best Practices, SEO
- Mobile-first responsive design
- Support for modern browsers (Chrome, Firefox, Safari, Edge - last 2 versions)

#### 4.4 SEO Requirements

- Dynamic meta tags for all pages
- Open Graph tags for social sharing
- Structured data (JSON-LD) for organization
- XML sitemap generation
- Robots.txt configuration
- Alt text for all images
- Semantic HTML markup

#### 4.5 Analytics & Tracking

- Google Analytics 4 integration
- Event tracking for CTA clicks
- Form submission tracking
- Page scroll depth tracking
- Download tracking (whitepapers, guides)

---

### 5. Non-Functional Requirements

#### 5.1 Security
- HTTPS only
- CSRF protection on forms
- Input sanitization
- Rate limiting on API endpoints
- Environment variables for sensitive data
- Content Security Policy headers

#### 5.2 Accessibility
- WCAG 2.1 Level AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios
- Focus indicators
- ARIA labels where appropriate

#### 5.3 Deployment
- Frontend: Vercel, Netlify, or AWS S3 + CloudFront
- Backend: AWS EC2, Heroku, or DigitalOcean
- Database: Managed service (AWS RDS, MongoDB Atlas)
- CI/CD pipeline with GitHub Actions
- Staging and production environments

---

### 6. User Stories

**As a potential client, I want to:**
- Understand Qelyx's value proposition immediately upon landing
- Explore services relevant to my industry
- Read case studies and testimonials
- Easily contact Qelyx or request a demo
- Learn about Qelyx's approach and differentiators

**As a Qelyx team member, I want to:**
- Receive and manage contact form submissions
- Publish and edit blog content
- Track website analytics and conversions
- Showcase our expertise and thought leadership

---

### 7. Success Metrics

- Contact form submission rate: 2-5% of visitors
- Demo request rate: 1-3% of visitors
- Average session duration: > 2 minutes
- Bounce rate: < 50%
- Mobile traffic conversion: > 40% of desktop rate
- Newsletter sign-ups: 100+ in first 3 months

---

### 8. Timeline & Milestones

**Phase 1 (Week 1-2):** Project setup, design system, component library  
**Phase 2 (Week 3-4):** Core pages development (Home, Services, About)  
**Phase 3 (Week 5-6):** Backend API, database, contact form integration  
**Phase 4 (Week 7):** Blog/Resources functionality  
**Phase 5 (Week 8):** Testing, optimization, deployment  

---

### 9. Future Enhancements (Post-Launch)

- Client portal for project tracking
- Interactive ROI calculator
- Live chat support
- Video testimonials section
- Case study filtering by industry/service
- Multi-language support
- Dark mode toggle