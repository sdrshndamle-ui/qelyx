export interface Project {
  id: string;
  sourceTechnology: string;
  targetTechnology?: string;
  numberOfObjects: number;
  overallComplexity: 'Low' | 'Medium' | 'High';
  projectCreationDate: string;
  percentageCompletion: number;
  productivityGainPercent: number;
  objects: ProjectObject[];
  testCases?: TestCase[];
}

export interface ProjectObject {
  id: string;
  name: string;
  type: string;
  originalCode: string;
  convertedCode?: string;
  documentation?: string;
  businessRules?: string;
  confidenceScore?: number;
  needsReview?: boolean;
  validationStatus?: 'not_started' | 'in_progress' | 'under_review' | 'completed';
  validationCompletion?: number;
}

export interface ConversionOptions {
  generateDocumentation: boolean;
  extractBusinessRules: boolean;
  refactorOrRationalize: 'refactor' | 'rationalize';
}

export interface Technology {
  name: string;
  category: string;
}

export interface TestCase {
  id: string;
  projectId: string;
  objectId?: string; // undefined for project-level test cases
  testCaseId: string;
  description: string;
  category: 'Functional' | 'Negative' | 'Boundary' | 'Regression' | 'Integration' | 'UI/UX' | 'Performance';
  testSteps: string[];
  expectedResults: string;
  parameters?: string;
  outcome?: 'Pass' | 'Fail' | 'Blocked' | 'Not Executed';
  createdAt?: string;
  updatedAt?: string;
}
