import { useState } from 'react';
import { Link } from 'react-router-dom';
import QHubModal from '../components/qhub/QHubModal';
import QHubCategory from '../components/qhub/QHubCategory';

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
        },
        {
          id: 'learning-labs',
          title: 'Learning Labs',
          description: 'Register and pay to train for specific client requirements in our specialized learning labs.',
          icon: <LabIcon />,
          cta: 'Browse Labs'
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
          description: 'Register interest for Qelyx to conduct rapid prototype on your behalf.',
          icon: <PrototypeIcon />,
          cta: 'Register Interest'
        },
        {
          id: 'sandbox-partners',
          title: 'Secured Sandbox',
          description: 'Access secured sandbox environments with niche partners of Qelyx for development and testing.',
          icon: <SandboxIcon />,
          cta: 'Request Access'
        },
        {
          id: 'hosted-environment',
          title: 'Hosted Deployment',
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
        },
        {
          id: 'escrow-payments',
          title: 'Escrow Payment System',
          description: 'Secure payment release based on milestones achieved by contributors. Ensuring trust and transparency.',
          icon: <EscrowIcon />,
          cta: 'Learn More'
        }
      ]
    }
  ];

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
        <QHubCategory
          key={category.title}
          category={category}
          catIndex={catIndex}
          setActiveModal={setActiveModal}
        />
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
      <QHubModal activeModal={activeModal} closeModal={() => setActiveModal(null)} />
    </div>
  );
};

export default QHubPage;
