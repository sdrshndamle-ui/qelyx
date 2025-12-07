import { useState } from 'react';
import { Link } from 'react-router-dom';

// SVG Gradient Definitions - rendered once at page level
const SvgGradientDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      <linearGradient id="qelyxGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#1A3A5C" />
        <stop offset="50%" stopColor="#2A6FF4" />
        <stop offset="100%" stopColor="#15d5d1" />
      </linearGradient>
    </defs>
  </svg>
);

// Gradient Icon Component - uses shared gradient definition
const GradientIcon = ({ children, size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    {children}
  </svg>
);

// Icon Components
const CareerIcon = () => (
  <GradientIcon>
    <path d="M20 4C15.58 4 12 7.58 12 12C12 16.42 15.58 20 20 20C24.42 20 28 16.42 28 12C28 7.58 24.42 4 20 4ZM20 8C22.21 8 24 9.79 24 12C24 14.21 22.21 16 20 16C17.79 16 16 14.21 16 12C16 9.79 17.79 8 20 8Z" fill="url(#qelyxGradient)"/>
    <path d="M20 22C14.48 22 4 24.76 4 30V36H36V30C36 24.76 25.52 22 20 22ZM8 32C8.78 29.62 14.96 26 20 26C25.04 26 31.22 29.62 32 32H8Z" fill="url(#qelyxGradient)"/>
  </GradientIcon>
);

const TrainingIcon = () => (
  <GradientIcon>
    <path d="M20 6L4 14L20 22L36 14L20 6Z" fill="url(#qelyxGradient)"/>
    <path d="M4 20V28L20 36L36 28V20L20 28L4 20Z" fill="url(#qelyxGradient)" fillOpacity="0.7"/>
    <circle cx="34" cy="14" r="2" fill="url(#qelyxGradient)"/>
    <rect x="33" y="14" width="2" height="12" fill="url(#qelyxGradient)"/>
  </GradientIcon>
);

const TrainerIcon = () => (
  <GradientIcon>
    <rect x="6" y="8" width="28" height="20" rx="2" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <rect x="8" y="10" width="24" height="16" rx="1" fill="url(#qelyxGradient)"/>
    <circle cx="20" cy="18" r="4" fill="white"/>
    <rect x="16" y="30" width="8" height="2" fill="url(#qelyxGradient)"/>
    <rect x="12" y="34" width="16" height="2" fill="url(#qelyxGradient)"/>
  </GradientIcon>
);

const ContractorIcon = () => (
  <GradientIcon>
    <rect x="8" y="6" width="24" height="28" rx="2" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <rect x="10" y="8" width="20" height="24" rx="1" fill="url(#qelyxGradient)"/>
    <rect x="14" y="12" width="12" height="2" rx="1" fill="white"/>
    <rect x="14" y="17" width="12" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    <rect x="14" y="22" width="8" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    <circle cx="28" cy="28" r="8" fill="#15d5d1"/>
    <path d="M28 24V28H32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </GradientIcon>
);

const RFPIcon = () => (
  <GradientIcon>
    <rect x="6" y="4" width="22" height="32" rx="2" fill="url(#qelyxGradient)"/>
    <rect x="10" y="10" width="14" height="2" rx="1" fill="white"/>
    <rect x="10" y="16" width="14" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    <rect x="10" y="22" width="10" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    <circle cx="30" cy="30" r="8" fill="url(#qelyxGradient)"/>
    <path d="M27 30L29 32L33 28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </GradientIcon>
);

const BespokeIcon = () => (
  <GradientIcon>
    <circle cx="20" cy="20" r="14" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <circle cx="20" cy="20" r="10" fill="url(#qelyxGradient)"/>
    <circle cx="20" cy="20" r="3" fill="white"/>
    <path d="M20 10V14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 26V30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 20H14" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26 20H30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </GradientIcon>
);

const EthicalAIIcon = () => (
  <GradientIcon>
    <circle cx="20" cy="16" r="10" fill="url(#qelyxGradient)"/>
    <rect x="14" y="12" width="4" height="4" rx="1" fill="white"/>
    <rect x="22" y="12" width="4" height="4" rx="1" fill="white"/>
    <path d="M15 19C15 19 17 22 20 22C23 22 25 19 25 19" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M20 26V30" stroke="url(#qelyxGradient)" strokeWidth="2"/>
    <path d="M12 34H28" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 30L12 34" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M26 30L28 34" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
  </GradientIcon>
);

const ConsultingIcon = () => (
  <GradientIcon>
    <circle cx="20" cy="18" r="12" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <path d="M20 8C14.48 8 10 12.48 10 18C10 23.52 14.48 28 20 28C25.52 28 30 23.52 30 18C30 12.48 25.52 8 20 8ZM21 24H19V22H21V24ZM23.07 17.25L22.17 18.17C21.45 18.9 21 19.5 21 21H19V20.5C19 19.4 19.45 18.4 20.17 17.67L21.41 16.41C21.78 16.05 22 15.55 22 15C22 13.9 21.1 13 20 13C18.9 13 18 13.9 18 15H16C16 12.79 17.79 11 20 11C22.21 11 24 12.79 24 15C24 15.88 23.64 16.68 23.07 17.25Z" fill="url(#qelyxGradient)"/>
    <circle cx="32" cy="32" r="6" fill="#15d5d1"/>
    <path d="M30 32H34M32 30V34" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </GradientIcon>
);

const WorkshopIcon = () => (
  <GradientIcon>
    <rect x="4" y="12" width="32" height="20" rx="2" fill="url(#qelyxGradient)"/>
    <rect x="8" y="16" width="8" height="12" rx="1" fill="white" fillOpacity="0.9"/>
    <rect x="18" y="16" width="6" height="4" rx="1" fill="white" fillOpacity="0.7"/>
    <rect x="26" y="16" width="6" height="4" rx="1" fill="white" fillOpacity="0.7"/>
    <rect x="18" y="22" width="14" height="2" rx="1" fill="white" fillOpacity="0.5"/>
    <rect x="18" y="26" width="10" height="2" rx="1" fill="white" fillOpacity="0.5"/>
    <path d="M16 8L20 12L24 8" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </GradientIcon>
);

const ArchitectureIcon = () => (
  <GradientIcon>
    <rect x="14" y="4" width="12" height="8" rx="2" fill="url(#qelyxGradient)"/>
    <rect x="4" y="16" width="12" height="8" rx="2" fill="url(#qelyxGradient)"/>
    <rect x="24" y="16" width="12" height="8" rx="2" fill="url(#qelyxGradient)"/>
    <rect x="14" y="28" width="12" height="8" rx="2" fill="url(#qelyxGradient)"/>
    <path d="M20 12V16M10 24V28L20 28M30 24V28L20 28" stroke="url(#qelyxGradient)" strokeWidth="2"/>
  </GradientIcon>
);

const ResearchIcon = () => (
  <GradientIcon>
    <circle cx="18" cy="18" r="10" stroke="url(#qelyxGradient)" strokeWidth="3" fill="none"/>
    <path d="M26 26L34 34" stroke="url(#qelyxGradient)" strokeWidth="3" strokeLinecap="round"/>
    <path d="M14 14L22 22M22 14L14 22" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5"/>
  </GradientIcon>
);

const PrototypeIcon = () => (
  <GradientIcon>
    <polygon points="20,4 36,12 36,28 20,36 4,28 4,12" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <polygon points="20,8 32,14 32,26 20,32 8,26 8,14" fill="url(#qelyxGradient)"/>
    <circle cx="20" cy="20" r="4" fill="white"/>
    <path d="M20 12V16M20 24V28M12 20H16M24 20H28" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"/>
  </GradientIcon>
);

const SandboxIcon = () => (
  <GradientIcon>
    <rect x="6" y="10" width="28" height="22" rx="2" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <rect x="8" y="12" width="24" height="18" rx="1" fill="url(#qelyxGradient)"/>
    <path d="M12 16H20V24H12V16Z" fill="white" fillOpacity="0.9"/>
    <path d="M22 16H28V20H22V16Z" fill="white" fillOpacity="0.7"/>
    <path d="M22 22H28V26H22V22Z" fill="white" fillOpacity="0.5"/>
    <circle cx="30" cy="8" r="4" fill="#15d5d1"/>
    <path d="M28 8H32M30 6V10" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
  </GradientIcon>
);

const CloudIcon = () => (
  <GradientIcon>
    <path d="M32 22C34.21 22 36 20.21 36 18C36 15.79 34.21 14 32 14C32 10.13 28.87 7 25 7C22.24 7 19.87 8.64 18.73 11C18.49 11 18.25 11 18 11C13.58 11 10 14.58 10 19C10 23.42 13.58 27 18 27H32C34.21 27 36 25.21 36 23C36 22.66 35.95 22.33 35.87 22.01C34.66 22.01 33.52 22 32 22Z" fill="url(#qelyxGradient)"/>
    <path d="M20 30L16 34M20 30L24 34M20 30V22" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </GradientIcon>
);

const HackathonIcon = () => (
  <GradientIcon>
    <path d="M20 4L22 10H28L23 14L25 20L20 16L15 20L17 14L12 10H18L20 4Z" fill="url(#qelyxGradient)"/>
    <rect x="8" y="24" width="24" height="10" rx="2" fill="url(#qelyxGradient)" fillOpacity="0.5"/>
    <path d="M14 28H26" stroke="white" strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 32H24" stroke="white" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.7"/>
  </GradientIcon>
);

const CustomIcon = () => (
  <GradientIcon>
    <circle cx="20" cy="20" r="14" fill="url(#qelyxGradient)" fillOpacity="0.2"/>
    <path d="M20 8V12M20 28V32M8 20H12M28 20H32" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="20" cy="20" r="6" fill="url(#qelyxGradient)"/>
    <path d="M18 20L19 21L22 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </GradientIcon>
);

const ServerIcon = () => (
  <GradientIcon>
    <rect x="8" y="6" width="24" height="10" rx="2" fill="url(#qelyxGradient)"/>
    <circle cx="14" cy="11" r="2" fill="white"/>
    <rect x="18" y="10" width="10" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    <rect x="8" y="18" width="24" height="10" rx="2" fill="url(#qelyxGradient)" fillOpacity="0.7"/>
    <circle cx="14" cy="23" r="2" fill="white"/>
    <rect x="18" y="22" width="10" height="2" rx="1" fill="white" fillOpacity="0.7"/>
    <path d="M20 30V34M16 34H24" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
  </GradientIcon>
);

const CommunityIcon = () => (
  <GradientIcon>
    <circle cx="20" cy="12" r="6" fill="url(#qelyxGradient)"/>
    <circle cx="10" cy="18" r="5" fill="url(#qelyxGradient)" fillOpacity="0.7"/>
    <circle cx="30" cy="18" r="5" fill="url(#qelyxGradient)" fillOpacity="0.7"/>
    <path d="M14 28C14 24 16.69 22 20 22C23.31 22 26 24 26 28" stroke="url(#qelyxGradient)" strokeWidth="2"/>
    <path d="M6 32C6 29 8 27 10 27C12 27 14 29 14 32" stroke="url(#qelyxGradient)" strokeWidth="2" strokeOpacity="0.7"/>
    <path d="M26 32C26 29 28 27 30 27C32 27 34 29 34 32" stroke="url(#qelyxGradient)" strokeWidth="2" strokeOpacity="0.7"/>
  </GradientIcon>
);

const IdeaIcon = () => (
  <GradientIcon>
    <path d="M20 4C13.37 4 8 9.37 8 16C8 20.42 10.44 24.26 14 26.42V30C14 31.1 14.9 32 16 32H24C25.1 32 26 31.1 26 30V26.42C29.56 24.26 32 20.42 32 16C32 9.37 26.63 4 20 4Z" fill="url(#qelyxGradient)"/>
    <path d="M16 34H24V36H16V34Z" fill="url(#qelyxGradient)" fillOpacity="0.7"/>
    <path d="M20 10V16L24 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </GradientIcon>
);

const CollegeIcon = () => (
  <GradientIcon>
    <path d="M20 4L4 12L20 20L36 12L20 4Z" fill="url(#qelyxGradient)"/>
    <path d="M8 14V26L20 32L32 26V14" stroke="url(#qelyxGradient)" strokeWidth="2" fill="none"/>
    <rect x="18" y="22" width="4" height="8" fill="url(#qelyxGradient)"/>
    <circle cx="20" cy="20" r="2" fill="white"/>
  </GradientIcon>
);

const EscrowIcon = () => (
  <GradientIcon>
    <rect x="8" y="12" width="24" height="18" rx="3" fill="url(#qelyxGradient)"/>
    <rect x="8" y="12" width="24" height="6" fill="url(#qelyxGradient)" fillOpacity="0.5"/>
    <circle cx="20" cy="24" r="4" fill="white"/>
    <path d="M20 22V26M18 24H22" stroke="url(#qelyxGradient)" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="14" y="8" width="12" height="4" rx="1" fill="url(#qelyxGradient)" fillOpacity="0.7"/>
  </GradientIcon>
);

const LabIcon = () => (
  <GradientIcon>
    <path d="M16 6H24V14L30 26C31 28 29.5 30 27 30H13C10.5 30 9 28 10 26L16 14V6Z" fill="url(#qelyxGradient)" fillOpacity="0.3"/>
    <path d="M17 8H23V14L28 24C28.5 25 27.5 26 26 26H14C12.5 26 11.5 25 12 24L17 14V8Z" fill="url(#qelyxGradient)"/>
    <rect x="15" y="4" width="10" height="4" rx="1" fill="url(#qelyxGradient)"/>
    <circle cx="18" cy="20" r="2" fill="white"/>
    <circle cx="23" cy="22" r="1.5" fill="white" fillOpacity="0.7"/>
    <path d="M20 32V36" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 36H26" stroke="url(#qelyxGradient)" strokeWidth="2" strokeLinecap="round"/>
  </GradientIcon>
);

const QHubPage = () => {
  const [activeModal, setActiveModal] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organisation: '',
    message: '',
    resume: null,
    linkedin: '',
    experience: '',
    skills: '',
    availability: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSubmitted(true);
    setIsSubmitting(false);
  };

  const closeModal = () => {
    setActiveModal(null);
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organisation: '',
      message: '',
      resume: null,
      linkedin: '',
      experience: '',
      skills: '',
      availability: '',
    });
  };

  const categories = [
    {
      title: 'Talent & Careers',
      description: 'Opportunities for aspirants, professionals, and trainers',
      items: [
        {
          id: 'aspirant-profiles',
          title: 'Career Opportunities',
          description: 'For aspirants, graduates and interns to submit their profiles for prospective job opportunities within Qelyx, with Partners or with end customers.',
          icon: <CareerIcon />,
          cta: 'Submit Your Profile'
        },
        {
          id: 'training-programs',
          title: 'Training Programs',
          description: 'Browse upcoming trainings where aspirants can apply. Get certified with industry certifications and have your profile displayed for consulting firms and clients.',
          icon: <TrainingIcon />,
          cta: 'View Programs'
        },
        {
          id: 'trainer-registration',
          title: 'Become a Trainer',
          description: 'Trainers can submit their profiles for published programs and get remunerated to run training sessions.',
          icon: <TrainerIcon />,
          cta: 'Register as Trainer'
        },
        {
          id: 'contractor-profiles',
          title: 'Contractor & Freelancer Portal',
          description: 'Submit your profile to be considered for upcoming client engagements as a contractor or freelancer.',
          icon: <ContractorIcon />,
          cta: 'Submit Profile'
        }
      ]
    },
    {
      title: 'Client Services',
      description: 'Comprehensive consulting and engagement services',
      items: [
        {
          id: 'rfp-workshops',
          title: 'RFPs & Workshops',
          description: 'Contact us for running RFPs, workshops and brown bag sessions tailored to your organisation.',
          icon: <RFPIcon />,
          cta: 'Request Service'
        },
        {
          id: 'bespoke-training',
          title: 'Bespoke Training Programs',
          description: "Qelyx creates customized training programs designed specifically for your organisation's needs.",
          icon: <BespokeIcon />,
          cta: 'Request Training'
        },
        {
          id: 'ethical-ai',
          title: 'Ethical AI Certification',
          description: 'Get certified for Ethical AI practices and ensure your AI implementations meet the highest standards.',
          icon: <EthicalAIIcon />,
          cta: 'Get Certified'
        },
        {
          id: 'consulting',
          title: 'Data & Domain Consulting',
          description: 'Contact Qelyx for niche data or domain consulting requirements with deep expertise.',
          icon: <ConsultingIcon />,
          cta: 'Contact Us'
        },
        {
          id: 'focused-workshops',
          title: 'Focused Workshops',
          description: 'Execute focused workshops designed to address specific challenges and skill gaps.',
          icon: <WorkshopIcon />,
          cta: 'Request Workshop'
        },
        {
          id: 'architecture-review',
          title: 'Architecture Review',
          description: 'Have your architectures reviewed and verified by Qelyx experts for your engagements.',
          icon: <ArchitectureIcon />,
          cta: 'Request Review'
        },
        {
          id: 'market-research',
          title: 'Market Research',
          description: 'For end customers or SI firms to conduct market research for specific industry sectors.',
          icon: <ResearchIcon />,
          cta: 'Request Research'
        }
      ]
    },
    {
      title: 'Innovation Lab',
      description: 'Rapid prototyping, sandboxes, and custom solutions',
      items: [
        {
          id: 'rapid-prototypes',
          title: 'Rapid Prototypes',
          description: 'Register interest for Qelyx to create a secured environment for conducting rapid prototypes.',
          icon: <PrototypeIcon />,
          cta: 'Register Interest'
        },
        {
          id: 'sandbox-partners',
          title: 'Partner Sandbox',
          description: 'Access secured sandbox environments with niche partners of Qelyx for development and testing.',
          icon: <SandboxIcon />,
          cta: 'Request Access'
        },
        {
          id: 'hosted-environment',
          title: 'Hosted Development',
          description: 'Let Qelyx host an environment, develop use cases and create rapid prototypes for you.',
          icon: <CloudIcon />,
          cta: 'Get Started'
        },
        {
          id: 'hackathons',
          title: 'Hackathons',
          description: 'Contact Qelyx to conduct engaging hackathons for your organisation.',
          icon: <HackathonIcon />,
          cta: 'Organize Hackathon'
        },
        {
          id: 'custom-solutions',
          title: 'Custom Prototypes & Solutions',
          description: 'Contact Qelyx to create custom prototypes or solutions tailored to your needs.',
          icon: <CustomIcon />,
          cta: 'Request Solution'
        },
        {
          id: 'client-sandbox',
          title: 'Client Sandbox Setup',
          description: 'For clients or partners to connect with Qelyx to set up secured sandbox environments.',
          icon: <ServerIcon />,
          cta: 'Setup Sandbox'
        }
      ]
    },
    {
      title: 'Community & Collaboration',
      description: 'Share ideas, collaborate, and earn from your contributions',
      items: [
        {
          id: 'enthusiast-sandbox',
          title: 'Collaborative Sandbox',
          description: 'A secured environment for enthusiasts to have a collaborative sandbox to share their ideas.',
          icon: <CommunityIcon />,
          cta: 'Join Community'
        },
        {
          id: 'publish-ideas',
          title: 'Publish Your Ideas',
          description: 'Publish your ideas, solutions, presentations. Once approved, earn commission through revenue share options if selected for client deployment.',
          icon: <IdeaIcon />,
          cta: 'Submit Idea'
        },
        {
          id: 'college-training',
          title: 'College & Community Training',
          description: 'For colleges and communities to reach out for focused paid training sessions.',
          icon: <CollegeIcon />,
          cta: 'Request Training'
        }
      ]
    },
    {
      title: 'Platform Features',
      description: 'Secure payments and learning infrastructure',
      items: [
        {
          id: 'escrow-payments',
          title: 'Escrow Payment System',
          description: 'Secure payment release based on milestones achieved by contributors. Ensuring trust and transparency.',
          icon: <EscrowIcon />,
          cta: 'Learn More'
        },
        {
          id: 'learning-labs',
          title: 'Learning Labs',
          description: 'Register and pay to train for specific client requirements in our specialized learning labs.',
          icon: <LabIcon />,
          cta: 'Browse Labs'
        }
      ]
    }
  ];

  const modalConfig = {
    'aspirant-profiles': {
      title: 'Submit Your Profile',
      subtitle: 'Join our talent network for exciting opportunities',
      fields: ['name', 'email', 'phone', 'linkedin', 'experience', 'skills', 'resume', 'message']
    },
    'training-programs': {
      title: 'Training Programs',
      subtitle: 'Browse and apply for upcoming programs',
      fields: ['name', 'email', 'phone', 'experience', 'message']
    },
    'trainer-registration': {
      title: 'Register as Trainer',
      subtitle: 'Share your expertise and get remunerated',
      fields: ['name', 'email', 'phone', 'linkedin', 'experience', 'skills', 'message']
    },
    'contractor-profiles': {
      title: 'Contractor & Freelancer Registration',
      subtitle: 'Submit your profile for client engagements',
      fields: ['name', 'email', 'phone', 'linkedin', 'experience', 'skills', 'availability', 'message']
    },
    'rfp-workshops': {
      title: 'Request RFPs & Workshops',
      subtitle: 'Let us help with your RFPs and workshops',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'bespoke-training': {
      title: 'Request Bespoke Training',
      subtitle: 'Customized training for your organisation',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'ethical-ai': {
      title: 'Ethical AI Certification',
      subtitle: 'Get certified for responsible AI practices',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'consulting': {
      title: 'Data & Domain Consulting',
      subtitle: 'Expert consulting for your niche requirements',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'focused-workshops': {
      title: 'Request Focused Workshop',
      subtitle: 'Targeted workshops for specific challenges',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'architecture-review': {
      title: 'Architecture Review Request',
      subtitle: 'Expert review of your architectures',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'market-research': {
      title: 'Market Research Request',
      subtitle: 'Industry-specific market research',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'rapid-prototypes': {
      title: 'Rapid Prototypes',
      subtitle: 'Register for secured prototyping environment',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'sandbox-partners': {
      title: 'Partner Sandbox Access',
      subtitle: 'Access our partner sandbox environments',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'hosted-environment': {
      title: 'Hosted Development Environment',
      subtitle: 'Let us host and develop for you',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'hackathons': {
      title: 'Organize a Hackathon',
      subtitle: 'Engage your teams with exciting hackathons',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'custom-solutions': {
      title: 'Custom Prototypes & Solutions',
      subtitle: 'Tailored solutions for your needs',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'client-sandbox': {
      title: 'Client Sandbox Setup',
      subtitle: 'Secured sandbox for your organisation',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'enthusiast-sandbox': {
      title: 'Join Collaborative Sandbox',
      subtitle: 'Share ideas with the community',
      fields: ['name', 'email', 'linkedin', 'skills', 'message']
    },
    'publish-ideas': {
      title: 'Publish Your Ideas',
      subtitle: 'Share and earn from your innovations',
      fields: ['name', 'email', 'linkedin', 'message']
    },
    'college-training': {
      title: 'College & Community Training',
      subtitle: 'Training programs for educational institutions',
      fields: ['name', 'email', 'organisation', 'phone', 'message']
    },
    'escrow-payments': {
      title: 'Escrow Payment System',
      subtitle: 'Learn about our secure payment system',
      fields: ['name', 'email', 'message']
    },
    'learning-labs': {
      title: 'Learning Labs Registration',
      subtitle: 'Train for specific client requirements',
      fields: ['name', 'email', 'phone', 'experience', 'message']
    }
  };

  const fieldLabels = {
    name: 'Full Name',
    email: 'Email Address',
    phone: 'Phone Number',
    organisation: 'Organisation',
    linkedin: 'LinkedIn Profile',
    experience: 'Years of Experience',
    skills: 'Key Skills',
    availability: 'Availability',
    message: 'Message / Additional Details',
    resume: 'Upload Resume'
  };

  // Career Opportunities content for aspirant-profiles modal
  const careerContent = {
    headline: "Launch Your Data & AI Career with Qelyx",
    intro: "The future belongs to those who master data and AI. At Qelyx, we're building a global talent network of skilled professionals ready to seize high-demand opportunities in the market's fastest-growing fields.",
    howItWorks: "Submit your profile and showcase your expertise in data science, machine learning, AI engineering, or analytics. Our team conducts thorough interviews to understand your unique strengths and career aspirations. Based on your skills, you'll join our curated talent database, connecting you with opportunities at Qelyx, our partner organizations, and leading companies worldwide.",
    notReady: "Not quite ready? We believe in growth. If your application needs strengthening, we'll provide actionable feedback to help you build the right skills and reapply with confidence.",
    features: [
      {
        title: "Work Your Way",
        text: "Whether you're in Mumbai, Manchester, or Manila, tell us where you want to work. We match your location preferences with opportunities that fit, making your career transition seamless."
      },
      {
        title: "Fast-Track to Impact",
        text: "Skip the endless job boards. We connect market-ready talent with organizations that need them—reducing time-to-hire and accelerating your career momentum."
      },
      {
        title: "Your Privacy Matters",
        text: "Your personal information and profile data are handled with extreme care, in full compliance with data privacy regulations in your region. We safeguard your trust as seriously as we advance your career."
      }
    ],
    tagline: "Your skills. Our network. Limitless possibilities."
  };

  // Training Programs content for training-programs modal
  const trainingContent = {
    headline: "Transform Skills into Career Success",
    intro: "Learning data and AI isn't just about theory—it's about solving real-world challenges. At Qelyx, our training programs bridge the gap between certification and career-readiness, preparing you for the demands of today's industry.",
    features: [
      {
        title: "Expert-Led, Industry-Focused Learning",
        text: "Train with renowned industry experts and vendor partners who bring live challenges from the field into the classroom. Our programs go beyond generic content, diving deep into sector-specific scenarios that mirror what you'll face in actual consulting engagements."
      },
      {
        title: "Personalized Learning Paths",
        text: "Whether you're starting fresh or advancing your expertise, we'll assess your current skills and recommend the right program—from intensive short-term certifications to comprehensive long-term tracks. Small batch sizes ensure you receive focused attention tailored to your learning needs."
      },
      {
        title: "Learn by Doing",
        text: "Collaborate with fellow trainees on hands-on projects that build practical experience. Work through real case studies, sharpen your presentation skills, and master group discussions—the soft skills that often make or break career opportunities."
      },
      {
        title: "Get Recognized",
        text: "Earn industry-recognized certifications and gain visibility. Your certified profile joins our showcase database, directly connecting you with consulting firms and clients actively seeking skilled professionals."
      }
    ],
    flexibleFormats: "Choose classroom or virtual sessions that fit your schedule—because quality training shouldn't require compromise.",
    tagline: "Build skills. Earn credentials. Launch opportunities."
  };

  // Become a Trainer content for trainer-registration modal
  const trainerContent = {
    headline: "Share Your Expertise, Shape the Future",
    intro: "Great trainers don't just teach—they transform careers. At Qelyx, we're seeking industry experts who are passionate about elevating the next generation of data and AI professionals.",
    diverseExpertise: "Whether your strength lies in cutting-edge technology, domain knowledge, consulting methodologies, communication excellence, or management practices—we need you. Our comprehensive programs require trainers across multiple disciplines: technical architects who demystify complex systems, consultants who teach problem-solving frameworks, communication coaches who build presentation confidence, domain experts who share industry nuances, and leaders who develop management acumen. Your unique expertise enriches our trainees' complete professional development.",
    excellence: "We believe trainees deserve nothing less than world-class instruction. That's why we carefully select trainers who bring deep industry expertise, real-world insights, and a genuine commitment to student success. Your knowledge and experience will directly shape the careers of aspiring professionals.",
    features: [
      {
        title: "Give Back, Get Rewarded",
        text: "This is your opportunity to contribute to the community while earning competitive remuneration that reflects your expertise. You control your commitment—teach as much or as little as your schedule allows. Whether you lead one program or several, you're making a meaningful impact."
      },
      {
        title: "Visibility and Recognition",
        text: "Your expert profile will be showcased on our website alongside your training schedule, giving trainees the opportunity to learn directly from recognized industry leaders. Build your personal brand while empowering others to succeed."
      },
      {
        title: "Flexible Engagement",
        text: "Submit your profile for our published programs and choose the sessions that align with your availability and expertise. We handle the logistics—you focus on delivering transformational learning experiences."
      }
    ],
    tagline: "Your expertise. Their breakthrough. Fair compensation."
  };

  // Contractor & Freelancer Portal content for contractor-profiles modal
  const contractorContent = {
    headline: "Independent Expertise, Enterprise Opportunities",
    intro: "The best work happens when talent meets the right opportunity. At Qelyx, we connect skilled contractors and freelancers with meaningful client engagements that value your independence and reward your expertise.",
    skillsIntro: "We seek specialized professionals across the full data and AI spectrum. Whether you excel in ETL development, programming languages, data modelling, traditional AI, Generative AI, Agentic AI systems, data visualization, or bring expertise in data program management and cloud platforms—there's a place for your skills. Our diverse client base needs everything from technical builders to strategic orchestrators, and we're constantly expanding our talent network across all specializations.",
    features: [
      {
        title: "Fair Value, Real Impact",
        text: "We believe in paying contractors what they're worth. Our engagement model ensures you receive competitive compensation that reflects the value you deliver to our clients. No compromises—just fair contracts for quality work."
      },
      {
        title: "Diverse Engagements Across Industries",
        text: "From fintech to healthcare, retail to manufacturing—our partnerships span multiple sectors with varied needs. Whether you're seeking a focused short-term project or an extended engagement, we match your skills with opportunities that fit your professional goals and availability."
      },
      {
        title: "Excellence as Standard",
        text: "We maintain rigorous evaluation criteria because our reputation—and yours—depends on it. Selected contractors embody Qelyx's pillars of value: delivering quality, maintaining integrity, and driving measurable results. When you join our network, you're part of a curated community of top-tier professionals."
      },
      {
        title: "Seamless Collaboration",
        text: "Once selected, you'll gain access to client engagements where your specialized skills are genuinely needed. We handle client relationships and project frameworks—you focus on doing what you do best."
      }
    ],
    tagline: "Submit your profile. Pass our standards. Access premium engagements."
  };

  // RFPs & Workshops content for rfp-workshops modal
  const rfpContent = {
    headline: "Get RFPs Right, From the Start",
    intro: "Most Requests for Proposals (RFPs) fail before they're even issued. Incomplete requirements, misaligned scope, and vague objectives lead to wildly different proposals, inflated costs, and extended timelines. At Qelyx, we've seen this pattern countless times—and we've built a better approach.",
    problem: "Organizations often lack the granular detail needed for effective RFPs. Strategic alignment with long-term business objectives gets lost. Consultancies respond based on different assumptions, quote vastly different costs, and then propose expensive discovery phases that further delay your initiatives. The result? Confusion, budget overruns, and wasted time.",
    difference: "We partner with you before the RFP goes out. We conduct focused workshops with your business and technology leadership to guide scoping discussions—clarifying both interim milestones and strategic objectives. This collaborative process ensures alignment across stakeholders and gets baked directly into your RFP document. Through rapid initial discovery, we establish realistic cost ranges, deliverables, and timelines. Now consultancies respond on a level playing field—with a shared understanding of scope and clear boundaries for their proposals.",
    features: [
      {
        title: "Proven Thought Leadership",
        text: "With decades of experience across regions and industries, we bring battle-tested insights to every engagement. Our thought leadership isn't theoretical—it's forged from real-world implementations, diverse market dynamics, and a deep understanding of what actually drives business value."
      },
      {
        title: "End-to-End Partnership",
        text: "Beyond RFP preparation, we provide advisory services to evaluate responses objectively and recommend the best-fit partners for your needs. We also conduct tailored workshops and brown bag sessions for your teams—building internal capability while addressing your organization's specific data and AI challenges."
      }
    ],
    tagline: "Stop guessing. Start with clarity. Partner with Qelyx."
  };

  // Bespoke Training Programs content for bespoke-training modal
  const bespokeContent = {
    headline: "Upskill Your Workforce, Future-Proof Your Organization",
    intro: "Technology evolves faster than training budgets can keep pace. Tight regulations add complexity. Your talent struggles to stay current while delivering on today's demands. At Qelyx, we solve this challenge with customized training programs built around your organization's specific needs.",
    trainingFit: "We believe in cross-training your workforce to seamlessly adapt to organizational requirements—not generic market trends. Whether it's business users learning new visualization tools, governance frameworks, analytics platforms, or agentic AI systems, or developers mastering emerging technologies and Generative AI capabilities—upskilling isn't reserved for technical teams alone. Everyone grows.",
    features: [
      {
        title: "Strategic Partnerships, Expert Delivery",
        text: "We collaborate with leading platform vendors and renowned industry experts to deliver training that's both cutting-edge and immediately applicable. Our programs don't just teach tools—they build confidence and capability that translates directly to business outcomes."
      },
      {
        title: "Scale Without Compromise",
        text: "Training your entire workforce shouldn't break the budget. We offer competitive pricing models designed for enterprise-scale deployment, ensuring cost-effectiveness without sacrificing quality. From small focused teams to organization-wide initiatives, we structure programs that match your financial and operational realities."
      },
      {
        title: "Tailored to Your Context",
        text: "Every organization has unique challenges, tech stacks, and skill gaps. Our bespoke approach means training content, delivery formats, and learning paths are designed specifically for your environment—not adapted from a one-size-fits-all curriculum."
      }
    ],
    tagline: "Your challenges. Our expertise. Their growth."
  };

  // Ethical AI Certification content for ethical-ai modal
  const ethicalAiContent = {
    headline: "Ethical AI Certification: Build Trust, Meet Compliance",
    intro: "AI is transforming industries at breakneck speed—but with great power comes greater responsibility. As regulations tighten globally, organizations face mounting pressure to demonstrate that their AI implementations are not just innovative, but ethical, explainable, and compliant.",
    regulatory: "Governments worldwide are establishing stringent AI governance frameworks. Whether you're a consultancy deploying AI solutions or an enterprise adopting them, you must abide by evolving laws while maintaining stakeholder trust. Non-compliance isn't just risky—it's costly.",
    features: [
      {
        title: "Beyond Compliance to Excellence",
        text: "Our Ethical AI Certification program equips you with the knowledge and frameworks to implement robust safeguards, ensure algorithmic transparency, and establish proper guardrails. Learn to justify AI decisions with confidence, demonstrate explainability to regulators and customers, and embed ethical considerations into every stage of your AI lifecycle."
      },
      {
        title: "For Consultancies and Enterprises Alike",
        text: "Whether you're building AI solutions for clients or implementing them internally, this certification validates your commitment to responsible AI practices. Stand out in the market as a trusted partner who prioritizes ethics alongside innovation."
      },
      {
        title: "Meet the Highest Standards",
        text: "Get certified in practices that protect your organization, your customers, and society. Because the future of AI isn't just about what's possible—it's about what's right."
      }
    ],
    tagline: "Innovate responsibly. Certify confidently. Lead ethically."
  };

  // Data & Domain Consulting content for consulting modal
  const consultingContent = {
    headline: "Deep Expertise for Complex Challenges",
    intro: "Some problems demand more than generalist knowledge—they require specialists who've lived your industry's unique challenges. At Qelyx, we deliver niche data and domain consulting that goes beyond surface-level recommendations to drive real transformation.",
    globalInsight: "Our expertise spans geographies and sectors, giving us a panoramic view of how data strategies succeed across diverse markets. From regulatory nuances in financial services to operational complexities in manufacturing, we understand the context that makes or breaks implementation.",
    features: [
      {
        title: "Access to Industry Leaders",
        text: "We don't just rely on our own capabilities. Qelyx partners with seasoned industry experts and CXOs who bring decades of domain-specific experience to your toughest challenges. Need a former healthcare executive to guide your patient data strategy? A retail veteran to architect your customer analytics platform? We connect you with practitioners who've already solved similar problems at scale."
      },
      {
        title: "Specialized Knowledge, Practical Solutions",
        text: "Whether you're grappling with complex data architecture decisions, navigating industry-specific compliance requirements, or seeking strategic guidance on domain-specific AI applications—our consulting goes deep. We combine technical excellence with business acumen to deliver solutions that are both innovative and implementable."
      },
      {
        title: "Your Challenge, Our Network",
        text: "Contact us with your niche requirements. We'll match you with the right expertise to move your initiative forward."
      }
    ],
    tagline: "Depth matters. Experience delivers."
  };

  // Focused Workshops content for focused-workshops modal
  const focusedWorkshopsContent = {
    headline: "Spark Ideas, Solve Challenges, Shape Strategy",
    intro: "The best solutions emerge when diverse minds collaborate in the right environment. At Qelyx, our focused workshops transform abstract challenges into concrete action plans—energizing your teams while building clarity on the path forward.",
    whereInnovation: "We conduct immersive workshops with your technology and business teams, either at your location or in our state-of-the-art innovation labs. These aren't typical training sessions—they're collaborative experiences designed to unlock creative thinking and generate breakthrough ideas.",
    features: [
      {
        title: "Discover What's Possible",
        text: "We showcase the art of the possible with next-generation tooling and emerging technologies. Through engaging, hands-on sessions, your teams explore cutting-edge capabilities while grounding them in your specific business context. The result? Inspiration meets practicality."
      },
      {
        title: "From Challenges to Clarity",
        text: "Our facilitated approach gets the creative juices flowing. Teams openly capture their challenges, articulate expectations, and co-create solutions in a dynamic, judgment-free environment. What starts as brainstorming evolves into structured thinking about real opportunities."
      },
      {
        title: "Outcomes That Matter",
        text: "These aren't just \"fun sessions\"—though they are energizing. Clients leave with tangible outputs: clear vision statements, prioritized roadmaps, and a shared understanding of the pathway ahead. You'll know not just what to build, but why and how to get there."
      }
    ],
    tagline: "Challenge your thinking. Energize your teams. Chart your course."
  };

  // Architecture Review content for architecture-review modal
  const architectureReviewContent = {
    headline: "Validate Before You Build, Optimize as You Grow",
    intro: "A flawed architecture compounds into costly mistakes. At Qelyx, we provide expert architecture reviews that catch issues early and ensure your data and AI investments deliver the value you deserve—not just today, but as your needs evolve.",
    preDelivery: "Before you and your consulting partners dive deep into delivery, a timely review can save months of rework and budget overruns. Our experts verify that your proposed architecture aligns with business objectives, leverages appropriate technologies, and positions you for sustainable success.",
    modernize: "While designs are being crafted, we ensure you're not falling into the traditional \"lift and shift\" trap. True modernization requires logical rearchitecture and rationalization—eliminating dead legacy components that drain resources and limit agility. Why migrate technical debt to expensive new platforms? We help you break free from outdated patterns and build architectures that are genuinely fit for the future.",
    questions: [
      "Will your data estate truly deliver the value you're expecting?",
      "Has there been rigorous thinking around how new technologies will improve performance, accelerate time-to-insight, and generate actionable business intelligence?",
      "Is this the right tooling and strategy for your specific context—or are you following trends that don't fit your reality?",
      "Does your design consider not just operational efficiency, but new revenue stream opportunities?"
    ],
    features: [
      {
        title: "Technology Never Stands Still",
        text: "Periodic reviews are equally critical as your environment matures. What worked two years ago may be limiting you today. Our ongoing architecture assessments ensure you're capitalizing on emerging capabilities while maintaining stability and governance."
      },
      {
        title: "Independent, Expert Perspective",
        text: "We bring decades of cross-industry experience with no vendor bias. Our reviews are thorough, pragmatic, and focused on one thing: ensuring your architecture serves your business, not the other way around."
      }
    ],
    tagline: "Build with confidence. Scale with certainty."
  };

  // Market Research content for market-research modal
  const marketResearchContent = {
    headline: "Intelligence That Drives Decisions",
    intro: "Generic market reports gather dust. What you need is targeted intelligence that speaks directly to your strategic questions. At Qelyx, we conduct industry and technology-specific market research that delivers actionable insights, not just data dumps.",
    tailored: "Whether you're an enterprise exploring new market opportunities or a systems integrator evaluating sector potential, our research is customized to your individual objectives. We don't force-fit pre-packaged findings—we investigate the specific questions that matter to your business strategy.",
    features: [
      {
        title: "Quantitative Rigor, Qualitative Depth",
        text: "We deliver research with substance: quantitative data that withstands scrutiny, combined with qualitative insights that reveal the \"why\" behind the numbers. Our output is specific, defensible, and immediately applicable to your decision-making process."
      },
      {
        title: "Trusted Industry Voices",
        text: "We partner with recognized industry leaders and domain experts who bring decades of sector experience to every research engagement. These aren't anonymous analysts—they're respected practitioners whose insights carry weight and credibility. Their involvement builds confidence in the findings and accelerates stakeholder buy-in."
      },
      {
        title: "For Those Who Need to Know",
        text: "Stop making critical decisions based on outdated reports or gut instinct. Get market intelligence that's fresh, focused, and designed for your specific context."
      }
    ],
    tagline: "Ask better questions. Get better answers."
  };

  const renderModal = () => {
    if (!activeModal) return null;

    const config = modalConfig[activeModal] || { title: 'Contact Us', subtitle: 'Get in touch', fields: ['name', 'email', 'message'] };
    const isCareerModal = activeModal === 'aspirant-profiles';
    const isTrainingModal = activeModal === 'training-programs';
    const isTrainerModal = activeModal === 'trainer-registration';
    const isContractorModal = activeModal === 'contractor-profiles';
    const isRfpModal = activeModal === 'rfp-workshops';
    const isBespokeModal = activeModal === 'bespoke-training';
    const isEthicalAiModal = activeModal === 'ethical-ai';
    const isConsultingModal = activeModal === 'consulting';
    const isFocusedWorkshopsModal = activeModal === 'focused-workshops';
    const isArchitectureReviewModal = activeModal === 'architecture-review';
    const isMarketResearchModal = activeModal === 'market-research';
    const isWideModal = isCareerModal || isTrainingModal || isTrainerModal || isContractorModal || isRfpModal || isBespokeModal || isEthicalAiModal || isConsultingModal || isFocusedWorkshopsModal || isArchitectureReviewModal || isMarketResearchModal;

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
        <div className={`bg-[#1E2A38] rounded-2xl p-4 sm:p-6 lg:p-8 max-h-[90vh] overflow-y-auto ${isWideModal ? 'max-w-5xl w-full' : 'max-w-lg w-full'}`}>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-2xl font-bold text-white">{config.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{config.subtitle}</p>
            </div>
            <button
              onClick={closeModal}
              className="text-gray-400 hover:text-white p-1"
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
              <h4 className="text-xl font-bold text-white mb-2">Submitted Successfully!</h4>
              <p className="text-gray-300">We'll be in touch with you shortly.</p>
              <button
                onClick={closeModal}
                className="mt-6 px-6 py-2 bg-accent-aqua text-white rounded-lg hover:bg-accent-aqua/80 transition"
              >
                Close
              </button>
            </div>
          ) : (
            <div className={isWideModal ? 'grid lg:grid-cols-2 gap-8' : ''}>
              {/* Career Content - Left Side */}
              {isCareerModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-4">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {careerContent.tagline}
                  </p>
                </div>
              )}

              {/* Training Content - Left Side */}
              {isTrainingModal && (
                <div className="space-y-6 lg:pr-8 lg:border-r lg:border-gray-700">
                  <h4 className="text-xl font-bold bg-gradient-to-r from-secondary-bright to-accent-aqua bg-clip-text text-transparent">
                    {trainingContent.headline}
                  </h4>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {trainingContent.intro}
                  </p>
                  
                  <div className="space-y-4">
                    {trainingContent.features.map((feature, idx) => (
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-4">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="bg-[#0A1A2F] rounded-lg p-4 border-l-4 border-accent-aqua">
                    <h6 className="text-white font-semibold text-sm mb-1">Flexible Formats</h6>
                    <p className="text-gray-400 text-xs leading-relaxed">{trainingContent.flexibleFormats}</p>
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {trainingContent.tagline}
                  </p>
                </div>
              )}

              {/* Trainer Content - Left Side */}
              {isTrainerModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {trainerContent.tagline}
                  </p>
                </div>
              )}

              {/* Contractor Content - Left Side */}
              {isContractorModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {contractorContent.tagline}
                  </p>
                </div>
              )}

              {/* RFP Content - Left Side */}
              {isRfpModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {rfpContent.tagline}
                  </p>
                </div>
              )}

              {/* Bespoke Training Content - Left Side */}
              {isBespokeModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {bespokeContent.tagline}
                  </p>
                </div>
              )}

              {/* Ethical AI Content - Left Side */}
              {isEthicalAiModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {ethicalAiContent.tagline}
                  </p>
                </div>
              )}

              {/* Data & Domain Consulting Content - Left Side */}
              {isConsultingModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {consultingContent.tagline}
                  </p>
                </div>
              )}

              {/* Focused Workshops Content - Left Side */}
              {isFocusedWorkshopsModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {focusedWorkshopsContent.tagline}
                  </p>
                </div>
              )}

              {/* Architecture Review Content - Left Side */}
              {isArchitectureReviewModal && (
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
                  
                  <div className="bg-[#0A1A2F] rounded-lg p-3">
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {architectureReviewContent.tagline}
                  </p>
                </div>
              )}

              {/* Market Research Content - Left Side */}
              {isMarketResearchModal && (
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
                      <div key={idx} className="bg-[#0A1A2F] rounded-lg p-3">
                        <h6 className="text-accent-aqua font-semibold text-sm mb-1">{feature.title}</h6>
                        <p className="text-gray-400 text-xs leading-relaxed">{feature.text}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-white font-semibold text-center pt-4 border-t border-gray-700">
                    {marketResearchContent.tagline}
                  </p>
                </div>
              )}
              
              {/* Form - Right Side (or full width for other modals) */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {config.fields.map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {fieldLabels[field]} {['name', 'email'].includes(field) && '*'}
                    </label>
                    {field === 'message' ? (
                      <textarea
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright resize-none"
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                      />
                    ) : field === 'resume' ? (
                      <input
                        type="file"
                        name={field}
                        accept=".pdf,.doc,.docx"
                        className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-secondary-bright file:text-white file:cursor-pointer"
                      />
                    ) : field === 'experience' ? (
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary-bright"
                      >
                        <option value="">Select experience</option>
                        <option value="0-1">0-1 years</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                    ) : field === 'availability' ? (
                      <select
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white focus:outline-none focus:border-secondary-bright"
                      >
                        <option value="">Select availability</option>
                        <option value="immediate">Immediate</option>
                        <option value="2-weeks">2 weeks notice</option>
                        <option value="1-month">1 month notice</option>
                        <option value="2-months">2 months notice</option>
                        <option value="3-months">3+ months notice</option>
                      </select>
                    ) : (
                      <input
                        type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={handleChange}
                        required={['name', 'email'].includes(field)}
                        className="w-full px-4 py-3 bg-[#0A1A2F] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-secondary-bright"
                        placeholder={`Enter ${fieldLabels[field].toLowerCase()}`}
                      />
                    )}
                  </div>
                ))}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-6 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#0A1A2F]">
      {/* SVG Gradient Definitions */}
      <SvgGradientDefs />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-content mx-auto px-6 lg:px-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-accent-aqua/20 text-accent-aqua px-4 py-2 rounded-full text-sm font-medium mb-6">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M8 2L10 6H14L11 9L12 14L8 11L4 14L5 9L2 6H6L8 2Z" fill="currentColor"/>
              </svg>
              Our Differentiator
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              <span className="bg-gradient-to-r from-[#1A3A5C] via-[#2A6FF4] to-[#15d5d1] bg-clip-text text-transparent">Q</span> Hub
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-4">
              Where we do things differently. Q Hub is our innovation ecosystem that connects talent, clients, and partners in unique ways.
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From career opportunities and training programs to rapid prototyping and collaborative sandboxes — Q Hub is the platform that sets Qelyx apart from traditional consulting firms.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      {categories.map((category, catIndex) => (
        <section key={category.title} className={`py-12 ${catIndex % 2 === 1 ? 'bg-[#0F1E2E]' : ''}`}>
          <div className="max-w-content mx-auto px-6 lg:px-10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{category.title}</h2>
              <p className="text-gray-400 text-sm">{category.description}</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 auto-rows-fr">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1E2A38] rounded-xl p-5 hover:bg-[#243447] transition-colors group flex flex-col h-full"
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed flex-grow">{item.description}</p>
                  <button
                    onClick={() => setActiveModal(item.id)}
                    className="w-full text-center px-4 py-2 text-sm font-medium rounded-lg border border-white/20 text-white hover:bg-white/10 transition group-hover:border-accent-aqua group-hover:text-accent-aqua mt-auto"
                  >
                    {item.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Bottom CTA */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-[#1E2A38] to-[#0A1A2F]">
        <div className="max-w-content mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Experience the Qelyx Difference?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Whether you're a talent looking for opportunities, a client seeking innovative solutions, or a partner wanting to collaborate — Q Hub is your gateway.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-gradient-to-tr from-secondary-bright to-accent-aqua px-8 py-4 text-base font-semibold text-white shadow-md hover:shadow-lg transition"
            >
              Get in Touch
            </Link>
            <button
              onClick={() => setActiveModal('aspirant-profiles')}
              className="inline-flex items-center justify-center rounded-lg border-2 border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition"
            >
              Join Our Talent Network
            </button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {renderModal()}
    </div>
  );
};

export default QHubPage;
