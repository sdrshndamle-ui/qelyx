import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import QelyxLogoNew from '../assets/Qelyx Logo_New.png';

const BlogPostPage = () => {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organisation: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const posts = {
    'data-democratization': {
      title: 'Unlocking Value at Scale: Data Democratization as the Cornerstone of Modern Financial Services',
      date: 'December 2025',
      content: `
## **The Industry Imperative: Why Data Democratization Now?**

In 2025, financial services and insurance organizations are at a crossroads. The relentless pace of digital transformation, the explosion of data sources, and the rise of generative AI have made data not just an asset, but the foundation for competitive differentiation.

**Data democratization**—the process of making data accessible, understandable, and actionable for all authorized users—has emerged as a critical enabler for organizations seeking to unlock new revenue streams, drive operational efficiency, and foster innovation. But democratization is not just about technology; it's a cultural and organizational shift that requires breaking down silos, ensuring data quality, and empowering employees at every level.

## **Industry Challenges: The Roadblocks to Data Democratization**

- **Legacy Complexity:** Many financial institutions are burdened by sprawling, heterogeneous data estates. Legacy systems, proprietary languages, and undocumented dependencies make modernization daunting and costly.
- **Data Silos and Trust:** Users often struggle to find the data they need, lack confidence in its quality, or are unsure who is using the data and for what purpose.
- **Skills Gaps:** Shortages in cloud management, DevOps, and data engineering are among the top talent challenges.
- **Regulatory and Security Pressures:** Evolving regulations and cyber threats demand robust data governance and real-time monitoring.
- **Change Management:** Poorly defined processes and resistance to change can stall even the best-intentioned data initiatives.

## **Key Differentiators: What Sets Leaders Apart**

**1. Treating Data as a Product**

Leaders adopt a "data-as-a-product" mindset, managing data with the same rigor as any commercial offering. This means clear ownership, quality metrics, and a focus on reusability and interoperability.

**2. Building Modular, Open Architectures**

Modern data platforms—cloud-native, API-driven, and leveraging data mesh principles—enable organizations to federate data ownership, simplify integration, and accelerate innovation.

**3. Focusing on User Experience and Self-Service**

Effective democratization is about more than access; it's about usability. This includes discoverability, accessibility, intuitive user interfaces, and self-service analytics.

**4. Embedding Governance and Security**

Responsible democratization requires robust governance—balancing access with controls, ensuring data quality, and maintaining compliance.

**5. Investing in Data Literacy and Change Management**

Organizations that invest in data literacy programs and foster a culture of curiosity and collaboration see higher adoption and greater ROI from their data initiatives.

## **The Way Forward: A Roadmap for Data Democratization**

1. **Assess Data Maturity:** Understand where you are and define clear business objectives.
2. **Modernize Architecture:** Invest in modular, cloud-native platforms that support open standards.
3. **Prioritize Use Cases:** Focus on high-impact, high-ease-of-adoption areas.
4. **Embed Governance:** Balance access with robust controls.
5. **Invest in People:** Build data literacy and foster a culture of experimentation.
6. **Measure and Iterate:** Track outcomes and continuously refine your approach.

## **Conclusion**

Data democratization is not a one-time project—it's a journey that requires vision, investment, and cultural change. The organizations that succeed will be those that treat data as a strategic product, empower their people, and build the flexible, secure, and user-centric platforms needed to thrive in the digital age.

**Are you ready to unlock the full value of your data? The time to act is now.**
      `
    },
    'pipeline-to-power': {
      title: 'Pipeline to Power: Building Trustworthy Data in the Age of Modernization',
      date: 'December 2025',
      content: `
## **Introduction: Why Modern Data Pipelines Matter**

In today's digital-first world, data is the fuel for innovation, analytics, and AI. But raw data alone is not enough. The real value is unlocked only when data is trustworthy, curated, standardized, and transformed—ready to power business decisions at scale.

Modern data pipelines are the unsung heroes of this transformation, quietly orchestrating the flow from messy, disparate sources to clean, actionable insights.

## **The Anatomy of a Modern Data Pipeline**

A modern data pipeline is not just a technical construct—it's a strategic capability. At its core, it encompasses:

- **Ingestion:** Seamlessly collecting data from diverse sources—legacy databases, cloud platforms, APIs, and more.
- **Curation:** Profiling, cleansing, and enriching data to ensure it's accurate, complete, and relevant.
- **Standardization:** Harmonizing formats, definitions, and structures so data can be reliably combined and compared.
- **Transformation:** Converting raw data into business-ready assets through rules, logic, and advanced analytics.
- **Delivery:** Making curated data available to users and systems—securely, efficiently, and at the right time.

## **Data Quality: The Foundation of Trust**

**Why it matters:** Poor data quality is the Achilles' heel of digital transformation. Inaccurate, incomplete, or inconsistent data leads to flawed analytics, regulatory risk, and lost business opportunities.

**Best practices:**
- Implement automated data profiling and validation at every pipeline stage
- Use AI-powered tools for anomaly detection and cleansing
- Establish clear data quality metrics and SLAs, monitored continuously
- Foster a culture where data quality is everyone's responsibility

## **Data Curation: From Raw to Ready**

**Why it matters:** Curation transforms raw, unstructured, and semi-structured data into business-ready assets. It's about more than just cleaning—it's about adding context, lineage, and meaning.

**What leading organizations do:**
- Build comprehensive data inventories and master inventories for all in-scope components
- Use metadata-driven approaches to track data lineage and dependencies
- Leverage modular, reusable data products—treating data as a product, not a byproduct
- Apply business rules and domain knowledge to enrich and contextualize data

## **Standardization: The Language of Interoperability**

**Why it matters:** Without standardization, data remains siloed and fragmented. Standardization enables interoperability, scalability, and compliance.

**How leaders approach it:**
- Adopt industry frameworks (e.g., BIAN, FIBO, ACORD in financial services)
- Use common data models and ontologies to harmonize definitions
- Automate data mapping using AI/ML to recommend and validate mappings
- Enforce naming conventions, data types, and business rules across the pipeline

## **Transformation: Turning Data into Value**

**Why it matters:** Transformation is where data becomes actionable—ready for analytics, AI, and business processes.

**Modern approaches:**
- Use declarative, metadata-driven transformation logic for agility and transparency
- Employ reverse engineering and code lineage tools to understand and refactor legacy logic
- Automate conversion of legacy code and business rules into modern platforms
- Integrate data validation and reconciliation to ensure functional equivalence post-transformation

## **The Business Impact: Why It All Matters**

- **Faster Time-to-Insight:** Clean, curated, standardized data accelerates analytics and AI adoption.
- **Regulatory Compliance:** Reliable pipelines ensure traceability, auditability, and adherence to evolving regulations.
- **Operational Efficiency:** Automation reduces manual effort, errors, and SME dependency.
- **Innovation at Scale:** Modular, productized data assets enable rapid experimentation and new business models.

## **Conclusion: The Pipeline as a Strategic Asset**

Modern data pipelines are not just IT infrastructure—they are the backbone of digital business. Investing in data quality, curation, standardization, and transformation is no longer optional; it's the price of entry for organizations that want to compete and win in the data-driven economy.

**Are your data pipelines ready for the future? The time to modernize is now.**
      `
    },
    'legacy-modernization': {
      title: 'Breaking the Chains: Legacy Modernization for the Digital Age',
      date: 'December 2025',
      content: `
## **Introduction**

In a world where digital agility defines winners and laggards, legacy modernization has become a strategic imperative for organizations across industries. The pressure to innovate, comply, and deliver seamless customer experiences is relentless. Yet, many enterprises remain shackled by outdated systems—monolithic architectures, proprietary languages, and decades-old processes that stifle transformation.

## **Industry Challenges: Why Legacy Modernization Is So Hard**

Despite the clear need, legacy modernization is fraught with obstacles:

- **Complexity and Technical Debt:** Decades of patchwork enhancements, undocumented dependencies, and tightly coupled systems make change risky and expensive.
- **Talent Shortages:** As legacy technologies age, finding skilled professionals to maintain or migrate them becomes increasingly difficult.
- **Business Disruption Fears:** Organizations worry that modernization will disrupt mission-critical operations or lead to data loss.
- **Regulatory and Security Pressures:** Outdated systems often struggle to meet evolving compliance and cybersecurity requirements.
- **Cost and ROI Uncertainty:** The scale and unpredictability of modernization projects can make it hard to build a compelling business case.

## **Key Differentiators: What Sets Modernization Leaders Apart**

**1. Business-Driven, Not Just IT-Driven**

Successful organizations align modernization with clear business outcomes—whether it's improving customer experience, enabling new digital products, or reducing operational risk.

**2. Incremental and Modular Approaches**

Rather than "big bang" migrations, leaders favor modular, phased strategies. This reduces risk, allows for continuous value delivery, and enables organizations to adapt as needs evolve.

**3. Data Quality and Governance**

Modernization is not just about moving applications; it's about ensuring data is accurate, accessible, and governed. Organizations that invest in data curation, standardization, and transformation unlock greater value from analytics and AI.

**4. Cloud-Native and Open Architectures**

Embracing cloud-native platforms and open standards enables flexibility, scalability, and integration with modern ecosystems.

**5. Change Management and Talent Development**

Leaders invest in upskilling their workforce and fostering a culture of continuous improvement. They recognize that modernization is as much about people and processes as it is about technology.

## **Real-World Examples**

- **Financial Services:** A leading US bank invested over $15 billion in modernization and AI-powered tools, focusing on cloud migration and data-driven decision-making.
- **Insurance:** Insurers are leveraging modular, cloud-based platforms to replace legacy policy administration systems, achieving faster ROI and greater agility.
- **Banking:** 50% of organizations achieved double-digit KPI improvements from data modernization, with operational efficiency, cost savings, and customer satisfaction as top outcomes.

## **Conclusion**

Legacy modernization is no longer a luxury—it's a necessity for organizations that want to thrive in the digital era. The journey is complex, but the rewards are substantial: greater agility, resilience, and the ability to unlock new sources of value.

The most successful organizations treat modernization as a business transformation, not just a technology upgrade. They invest in data quality, embrace modular and cloud-native architectures, and empower their people to drive change.

**Are you ready to break the chains of legacy and build for the future? The time to modernize is now.**
      `
    },
    'database-migration': {
      title: 'Beyond Boundaries: Mastering Database Migration in the Modern Enterprise',
      date: 'December 2025',
      content: `
## **Introduction**

Database migration is no longer just a technical upgrade—it's a strategic move that can unlock agility, scalability, and cost savings for organizations. Whether shifting from legacy on-premises systems to the cloud, consolidating platforms, or modernizing for analytics, successful migrations require careful planning, deep expertise, and a clear understanding of business goals.

## **Industry Challenges**

Migrating databases is complex and fraught with challenges:

- **Performance and Functionality Risks:** Converted output may have performance or functionality issues, and legacy features may not be needed or supported on modern platforms.
- **Volume and Complexity:** Large volumes of legacy objects, undocumented code, and complex interdependencies between stored procedures and triggers.
- **Skills and Documentation Gaps:** Lack of historical documentation and difficulty accessing system experts (SMEs).
- **Proprietary Languages and Compatibility:** Differences in dialects, data types, and logic between source and target platforms.
- **Cost and Time:** Traditional migration approaches can be time-consuming and costly.

## **Key Differentiators for Success**

1. **Comprehensive Assessment:** Pre-migration reports break down objects, highlight manual rework needs, and identify issues before migration begins.
2. **Accuracy and Automation:** Automated script conversion, syntax validation, and code correction minimize errors and speed up migration.
3. **Scalability and Continuous Improvement:** Modular processes allow for low-level restarts, concurrent migrations, and continuous improvement based on lessons learned.
4. **Monitoring and Reporting:** Log files and dashboards provide real-time visibility into migration progress and post-migration health.
5. **Alignment with Business Processes:** Migration is scheduled to minimize disruption, with read-only data often migrated ahead of time for large databases.
6. **Knowledge Management:** Ongoing training, competency assessments, and best practice sharing ensure teams are equipped for future migrations.

## **How to Approach Database Migrations**

A successful migration follows a structured, phased approach:

**1. Assessment Phase**
- Activities: Workshops, interviews, questionnaires, AS-IS analysis, stakeholder mapping.
- Deliverables: Assessment report, target state architecture, migration roadmap.

**2. Discovery Phase**
- Activities: Inventory analysis, dependency mapping, rationalization of DB objects and batch jobs.
- Deliverables: Inventory list, lineage/dependency list, rationalized list of objects/jobs.

**3. Analysis Phase**
- Activities: Technical and business priority setting, tool fitment, future state architecture blueprint.
- Deliverables: Draft architecture blueprint, migration approach, strategy, best practices.

**4. Design Phase**
- Activities: Migration design, transition planning, proof of concept, estimation.
- Deliverables: Migration steps, test plans, solution architecture.

**5. Build & Migration Phase**
- Activities: Code translation, validation, correction, testing, deployment, execution, signoff.
- Deliverables: Translated and validated codebase, deployment scripts, migration reports.

## **Case Studies: Real-World Examples**

- **SQL Server Upgrade to Azure Cloud:** Migrated 20+ services from data center to Azure IaaS, consolidating 24 SQL instances into 7, upgrading to high-availability clusters. Result: 99.95% availability, scalability, and reduced business risk.
- **Financial Services Oracle to Postgres Migration:** Migrated 8,000 Oracle databases to Postgres in the cloud, using automation to reduce costs and effort. Realized 90% license savings.
- **Insurance Firm Data Lake Migration to AWS/Snowflake:** Seamlessly migrated Oracle Exadata data lake to AWS/Snowflake, enabling unlimited growth, faster queries, and cost optimization.

## **Conclusion**

Database migration is a journey, not a one-time event. By embracing a phased approach, leveraging automation, and aligning with business priorities, organizations can overcome legacy challenges and unlock new opportunities for innovation and growth.

**Ready to move beyond boundaries? The future of your data starts with a smart migration strategy.**
      `
    }
  };

  const post = posts[id];

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0A1A2F] py-16">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Post Not Found</h1>
          <Link to="/blog" className="text-accent-aqua hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  const renderContent = (content) => {
    const lines = content.trim().split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('## **')) {
        const text = line.replace('## **', '').replace('**', '');
        return (
          <h2 key={index} className="text-2xl font-bold text-white mt-10 mb-4">
            {text}
          </h2>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        const text = line.slice(2, -2);
        return (
          <p key={index} className="text-lg font-bold text-white mt-6 mb-2">
            {text}
          </p>
        );
      }
      if (line.startsWith('- **')) {
        const match = line.match(/- \*\*(.+?)\*\*(.+)/);
        if (match) {
          return (
            <li key={index} className="text-gray-300 mb-2 ml-4 list-disc">
              <strong className="text-white">{match[1]}</strong>{match[2]}
            </li>
          );
        }
      }
      if (line.startsWith('- ')) {
        return (
          <li key={index} className="text-gray-300 mb-2 ml-4 list-disc">
            {line.slice(2)}
          </li>
        );
      }
      if (line.match(/^\d+\. \*\*/)) {
        const match = line.match(/^(\d+)\. \*\*(.+?)\*\*(.*)$/);
        if (match) {
          return (
            <p key={index} className="text-gray-300 mb-2">
              <strong className="text-white">{match[1]}. {match[2]}</strong>{match[3]}
            </p>
          );
        }
      }
      if (line.trim() === '') {
        return <br key={index} />;
      }
      return (
        <p key={index} className="text-gray-300 leading-relaxed mb-4">
          {line}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      <article className="py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <Link to="/blog" className="text-accent-aqua hover:underline mb-8 inline-block">
            ← Back to Blog
          </Link>
          
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 bg-gradient-to-r from-primary-legacy via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
            {post.title}
          </h1>
          
          <p className="text-gray-400 mb-8">{post.date}</p>
          
          <div className="prose prose-invert max-w-none">
            {renderContent(post.content)}
          </div>

          {/* CTA Section */}
          <div className="mt-16 p-8 bg-[#1E2A38] rounded-xl text-center">
            <h3 className="text-2xl font-bold text-white mb-4">
              Want to learn how Qelyx approaches this?
            </h3>
            <p className="text-gray-300 mb-6">
              Our experts are ready to discuss your specific challenges and opportunities.
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-8 py-4 text-base font-semibold text-white shadow-md hover:shadow-lg transition"
            >
              Talk to Our Experts
            </button>
          </div>

          {/* Qelyx Branding */}
          <div className="mt-16 pt-8 border-t border-gray-700 flex items-center gap-3">
            <img src={QelyxLogoNew} alt="Qelyx logo" className="h-8 w-auto" loading="lazy" />
            <span className="text-lg font-semibold bg-gradient-to-r from-primary-legacy via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">
              Qelyx
            </span>
          </div>
        </div>
      </article>

      {/* Contact Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-[#1E2A38] rounded-2xl p-8 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">Talk to Our Experts</h3>
              <button
                onClick={() => { setShowModal(false); setSubmitted(false); }}
                className="text-gray-400 hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                <p className="text-gray-300">We'll be in touch shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="modal-name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="modal-name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="modal-email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="modal-email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="modal-organisation" className="block text-sm font-medium text-gray-300 mb-2">
                    Organisation
                  </label>
                  <input
                    type="text"
                    id="modal-organisation"
                    name="organisation"
                    value={formData.organisation}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright"
                    placeholder="Your company"
                  />
                </div>
                <div>
                  <label htmlFor="modal-message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="modal-message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright resize-none"
                    placeholder="Tell us about your project or inquiry"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPostPage;

