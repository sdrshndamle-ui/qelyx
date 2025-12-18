// QHub Modal Content Renderer
// Renders the descriptive content for each modal type

import {
  careerContent,
  trainingContent,
  trainerContent,
  contractorContent,
  rfpContent,
  bespokeContent,
  ethicalAiContent,
  consultingContent,
  focusedWorkshopsContent,
  architectureReviewContent,
  marketResearchContent,
  rapidPrototypesContent,
  securedSandboxContent,
  hostedDeploymentContent,
  hackathonsContent,
  collaborativeSandboxContent,
  publishIdeasContent,
  learningLabsContent,
  collegeTrainingContent,
  escrowPaymentContent
} from './QHubContent';

const QHubModalContent = ({ activeModal }) => {
  if (!activeModal) return null;

  // Career Opportunities
  if (activeModal === 'aspirant-profiles') {
    return (
      <div className="space-y-6 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {careerContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {careerContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold mb-2">How It Works:</h5>
          <p className="text-gray-400 text-sm leading-relaxed">
            {careerContent.howItWorks}
          </p>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed italic">
          {careerContent.notReady}
        </p>
        <div className="space-y-4">
          {careerContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-4">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {careerContent.tagline}
        </p>
      </div>
    );
  }

  // Training Programs
  if (activeModal === 'training-programs') {
    return (
      <div className="space-y-6 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {trainingContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {trainingContent.intro}
        </p>
        <div className="space-y-4">
          {trainingContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-4">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <div className="bg-[#151b2e] rounded-lg p-4 border-l-4 border-accent-aqua">
          <h6 className="text-white font-semibold text-sm mb-1">Flexible Formats</h6>
          <p className="text-gray-400 text-xs leading-relaxed">{trainingContent.flexibleFormats}</p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {trainingContent.tagline}
        </p>
      </div>
    );
  }

  // Become a Trainer
  if (activeModal === 'trainer-registration') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {trainerContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {trainerContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">We Value Diverse Expertise:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {trainerContent.diverseExpertise}
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Excellence is Our Standard:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {trainerContent.excellence}
          </p>
        </div>
        <div className="space-y-3">
          {trainerContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {trainerContent.tagline}
        </p>
      </div>
    );
  }

  // Contractor & Freelancer Portal
  if (activeModal === 'contractor-profiles') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {contractorContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {contractorContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Your Skills, Our Opportunities:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {contractorContent.skillsIntro}
          </p>
        </div>
        <div className="space-y-3">
          {contractorContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {contractorContent.tagline}
        </p>
      </div>
    );
  }

  // RFPs & Workshops
  if (activeModal === 'rfp-workshops') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {rfpContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {rfpContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">The Problem with Traditional RFPs:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rfpContent.problem}
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">The Qelyx Difference:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rfpContent.difference}
          </p>
        </div>
        <div className="space-y-3">
          {rfpContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {rfpContent.tagline}
        </p>
      </div>
    );
  }

  // Bespoke Training Programs
  if (activeModal === 'bespoke-training') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {bespokeContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {bespokeContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Training That Fits Your Reality:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {bespokeContent.trainingFit}
          </p>
        </div>
        <div className="space-y-3">
          {bespokeContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {bespokeContent.tagline}
        </p>
      </div>
    );
  }

  // Ethical AI Certification
  if (activeModal === 'ethical-ai') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {ethicalAiContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {ethicalAiContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Navigate the New Regulatory Landscape:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {ethicalAiContent.regulatory}
          </p>
        </div>
        <div className="space-y-3">
          {ethicalAiContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {ethicalAiContent.tagline}
        </p>
      </div>
    );
  }

  // Data & Domain Consulting
  if (activeModal === 'consulting') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {consultingContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {consultingContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Global Experience, Local Insight:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {consultingContent.globalInsight}
          </p>
        </div>
        <div className="space-y-3">
          {consultingContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {consultingContent.tagline}
        </p>
      </div>
    );
  }

  // Focused Workshops
  if (activeModal === 'focused-workshops') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {focusedWorkshopsContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {focusedWorkshopsContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Where Innovation Happens:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {focusedWorkshopsContent.whereInnovation}
          </p>
        </div>
        <div className="space-y-3">
          {focusedWorkshopsContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {focusedWorkshopsContent.tagline}
        </p>
      </div>
    );
  }

  // Architecture Review
  if (activeModal === 'architecture-review') {
    return (
      <div className="space-y-4 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {architectureReviewContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {architectureReviewContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Critical Pre-Delivery Checkpoint:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {architectureReviewContent.preDelivery}
          </p>
        </div>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Modernize, Don't Just Migrate:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {architectureReviewContent.modernize}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-2">The Questions That Matter:</h6>
          <ul className="space-y-1">
            {architectureReviewContent.questions.map((question, idx) => (
              <li key={idx} className="text-gray-400 text-xs leading-relaxed flex items-start gap-2">
                <span className="text-accent-aqua mt-0.5">•</span>
                {question}
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-3">
          {architectureReviewContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {architectureReviewContent.tagline}
        </p>
      </div>
    );
  }

  // Market Research
  if (activeModal === 'market-research') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {marketResearchContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {marketResearchContent.intro}
        </p>
        <div>
          <h5 className="text-white font-semibold text-sm mb-2">Tailored to Your Objectives:</h5>
          <p className="text-gray-400 text-xs leading-relaxed">
            {marketResearchContent.tailored}
          </p>
        </div>
        <div className="space-y-3">
          {marketResearchContent.features.map((feature, idx) => (
            <div key={idx} className="bg-[#151b2e] rounded-lg p-3">
              <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
              <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
            </div>
          ))}
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {marketResearchContent.tagline}
        </p>
      </div>
    );
  }

  // Rapid Prototypes
  if (activeModal === 'rapid-prototypes') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {rapidPrototypesContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {rapidPrototypesContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">We Do the Heavy Lifting:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rapidPrototypesContent.heavyLifting}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Speed When You Need It Most:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rapidPrototypesContent.speed}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Your Prototype, Your Presentation, Your Success:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rapidPrototypesContent.presentation}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Complete Ownership, Secure Transfer:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rapidPrototypesContent.ownership}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Partnership Without the Politics:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {rapidPrototypesContent.partnership}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {rapidPrototypesContent.tagline}
        </p>
      </div>
    );
  }

  // Secured Sandbox
  if (activeModal === 'sandbox-partners') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {securedSandboxContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {securedSandboxContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Approval Bottleneck:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {securedSandboxContent.bottleneck}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <p className="text-gray-400 text-xs leading-relaxed">
            {securedSandboxContent.consultingChallenges}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Your Solution, Ready Now:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {securedSandboxContent.solution}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Strategic Partner Investments:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {securedSandboxContent.partnerInvestments}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Your Extended Innovation Arm:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {securedSandboxContent.innovationArm}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {securedSandboxContent.tagline}
        </p>
      </div>
    );
  }

  // Hosted Deployment
  if (activeModal === 'hosted-environment') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {hostedDeploymentContent.headline}
        </h4>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Production-Ready, Without the Overhead:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.productionReady}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Faster Time-to-Market:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.fasterTimeToMarket}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Flexible Commercial Models:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.flexibleCommercial}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Multi-Tenancy Made Simple:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.multiTenancy}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">White-Label Opportunities:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.whiteLabel}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Compliance and Governance Assured:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.compliance}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Expert Support When It Matters:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.expertSupport}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Seamless Migration Path:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hostedDeploymentContent.migration}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {hostedDeploymentContent.tagline}
        </p>
      </div>
    );
  }

  // Hackathons
  if (activeModal === 'hackathons') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {hackathonsContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {hackathonsContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Understanding Hackathons:</h6>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            {hackathonsContent.understanding}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hackathonsContent.challenges}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Qelyx Approach:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hackathonsContent.approach}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Funded by Partners, Amplified by Marketing:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hackathonsContent.fundedByPartners}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Discover Your Next-Gen Talent:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {hackathonsContent.discoverTalent}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {hackathonsContent.tagline}
        </p>
      </div>
    );
  }

  // Collaborative Sandbox
  if (activeModal === 'enthusiast-sandbox') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {collaborativeSandboxContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {collaborativeSandboxContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Collaboration Gap:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collaborativeSandboxContent.collaborationGap}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Qelyx Community Platform:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collaborativeSandboxContent.platform}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Build at Your Pace, Showcase Your Brilliance:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collaborativeSandboxContent.buildAtPace}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">One Platform, Infinite Possibilities:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collaborativeSandboxContent.onePlatform}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {collaborativeSandboxContent.tagline}
        </p>
      </div>
    );
  }

  // Publish Your Ideas
  if (activeModal === 'publish-ideas') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {publishIdeasContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {publishIdeasContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Entrepreneur's Dilemma:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {publishIdeasContent.entrepreneursDilemma}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Your Marketplace for Innovation:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {publishIdeasContent.marketplace}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Earn While You Create:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {publishIdeasContent.earnWhileYouCreate}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Protected and Promoted:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {publishIdeasContent.protectedAndPromoted}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Bridge to Entrepreneurship:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {publishIdeasContent.bridgeToEntrepreneurship}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {publishIdeasContent.tagline}
        </p>
      </div>
    );
  }

  // Learning Labs
  if (activeModal === 'learning-labs') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {learningLabsContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {learningLabsContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Corporate Training Challenge:</h6>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            {learningLabsContent.corporateChallenge}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {learningLabsContent.consultingPressures}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Purpose-Built Learning Environments:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {learningLabsContent.purposeBuilt}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Train on What Matters:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {learningLabsContent.trainOnWhatMatters}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Flexible Access, Measurable Results:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {learningLabsContent.flexibleAccess}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Stay Ahead of the Curve:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {learningLabsContent.stayAhead}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {learningLabsContent.tagline}
        </p>
      </div>
    );
  }

  // College & Community Training
  if (activeModal === 'college-training') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {collegeTrainingContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {collegeTrainingContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Academic Challenge:</h6>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            {collegeTrainingContent.academicChallenge}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collegeTrainingContent.communityBarriers}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Market-Aligned, Career-Focused Training:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collegeTrainingContent.marketAligned}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Flexible Access for All:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collegeTrainingContent.flexibleAccess}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">From Training to Employment:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collegeTrainingContent.trainingToEmployment}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Competitive Edge in a Crowded Market:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {collegeTrainingContent.competitiveEdge}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {collegeTrainingContent.tagline}
        </p>
      </div>
    );
  }

  // Escrow Payment System
  if (activeModal === 'escrow-payments') {
    return (
      <div className="space-y-5 lg:pr-8 lg:border-r lg:border-gray-700">
        <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
          {escrowPaymentContent.headline}
        </h4>
        <p className="text-gray-300 text-sm leading-relaxed">
          {escrowPaymentContent.intro}
        </p>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">The Payment Trust Problem:</h6>
          <p className="text-gray-400 text-xs leading-relaxed mb-3">
            {escrowPaymentContent.paymentTrustProblem}
          </p>
          <p className="text-gray-400 text-xs leading-relaxed">
            {escrowPaymentContent.consultingFirms}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Protected Payments, Proven Performance:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {escrowPaymentContent.protectedPayments}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Trust Through Transparency:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {escrowPaymentContent.trustThroughTransparency}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">We Believe in Earning Your Business:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {escrowPaymentContent.earningBusiness}
          </p>
        </div>
        <div className="bg-[#151b2e] rounded-lg p-3">
          <h6 className="text-accent-aqua font-semibold text-sm mb-1">Peace of Mind, Long-Term Partnership:</h6>
          <p className="text-gray-400 text-xs leading-relaxed">
            {escrowPaymentContent.peaceOfMind}
          </p>
        </div>
        <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
          {escrowPaymentContent.tagline}
        </p>
      </div>
    );
  }

  return null;
};

export default QHubModalContent;

