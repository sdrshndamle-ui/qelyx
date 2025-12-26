import { Project, ProjectObject } from '../types';

const STORAGE_KEY = 'qelyx_projects';

// Generate sample objects for a project
const generateSampleObjects = (count: number, sourceTech: string): ProjectObject[] => {
  const objects: ProjectObject[] = [];
  for (let i = 1; i <= count; i++) {
    objects.push({
      id: `obj-${i}`,
      name: `Object${i}`,
      type: i % 3 === 0 ? 'Function' : i % 3 === 1 ? 'Class' : 'Procedure',
      originalCode: `// ${sourceTech} Code for Object${i}\npublic class Object${i} {\n    private String name;\n    \n    public void process() {\n        // Business logic here\n        System.out.println("Processing Object${i}");\n    }\n}`,
      validationStatus: 'not_started',
      validationCompletion: 0,
    });
  }
  return objects;
};

export const getProjects = (): Project[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    const projects = JSON.parse(stored);
    // Ensure all projects have objects
    return projects.map((p: Project) => ({
      ...p,
      objects: p.objects && p.objects.length > 0 ? p.objects : generateSampleObjects(p.numberOfObjects, p.sourceTechnology),
    }));
  } catch {
    return [];
  }
};

export const saveProjects = (projects: Project[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
};

export const getProject = (id: string): Project | null => {
  const projects = getProjects();
  return projects.find(p => p.id === id) || null;
};

export const saveProject = (project: Project): void => {
  const projects = getProjects();
  const index = projects.findIndex(p => p.id === project.id);
  
  // Ensure project has objects
  const projectWithObjects = {
    ...project,
    objects: project.objects && project.objects.length > 0 
      ? project.objects 
      : generateSampleObjects(project.numberOfObjects, project.sourceTechnology),
  };
  
  if (index >= 0) {
    projects[index] = projectWithObjects;
  } else {
    projects.push(projectWithObjects);
  }
  saveProjects(projects);
};

export const deleteProject = (id: string): void => {
  const projects = getProjects();
  const filtered = projects.filter(p => p.id !== id);
  saveProjects(filtered);
};
