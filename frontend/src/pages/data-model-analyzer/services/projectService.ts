// Project Service for managing projects and their associated models

export interface Project {
  id: string
  name: string
  description: string
  userId: string
  createdAt: string
  updatedAt: string
  externalResources?: ExternalResource[]
  models?: Model[]
}

export interface ExternalResource {
  id: string
  name: string
  type: 'database' | 'api' | 'file' | 'url'
  connectionString?: string
  description?: string
}

export interface Model {
  id: string
  name: string
  type: 'image' | 'json' | 'pdf'
  uploadDate: string
  url?: string
  projectId: string
}

class ProjectService {
  private projects: Project[] = [
    {
      id: '1',
      name: 'Billing System Data Model',
      description: 'Data model for billing and payment system',
      userId: 'user123',
      createdAt: '2025-11-15 10:30:00',
      updatedAt: '2025-12-04 14:20:00',
      externalResources: [
        {
          id: '1',
          name: 'Production Database',
          type: 'database',
          connectionString: 'jdbc:postgresql://prod-db:5432/billing',
          description: 'Production billing database',
        },
      ],
      models: [
        {
          id: '1',
          name: 'BillingAccount.jpg',
          type: 'image',
          uploadDate: '2025-12-03 14:28:21',
          projectId: '1',
        },
        {
          id: '2',
          name: 'My_new_ER_Diagram.jpg',
          type: 'image',
          uploadDate: '2025-11-27 07:54:37',
          projectId: '1',
        },
      ],
    },
    {
      id: '2',
      name: 'Customer Management Model',
      description: 'Customer and order management data model',
      userId: 'user123',
      createdAt: '2025-10-20 09:15:00',
      updatedAt: '2025-11-30 16:45:00',
      models: [
        {
          id: '3',
          name: 'Customer_Model.json',
          type: 'json',
          uploadDate: '2025-11-25 11:20:00',
          projectId: '2',
        },
      ],
    },
  ]

  async getAllProjects(): Promise<Project[]> {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.projects]), 500)
    })
  }

  async getProjectById(id: string): Promise<Project | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const project = this.projects.find((p) => p.id === id)
        resolve(project || null)
      }, 300)
    })
  }

  async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>): Promise<Project> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newProject: Project = {
          ...project,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        this.projects.push(newProject)
        resolve(newProject)
      }, 500)
    })
  }

  async updateProject(id: string, updates: Partial<Project>): Promise<Project> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.projects.findIndex((p) => p.id === id)
        if (index === -1) {
          reject(new Error('Project not found'))
          return
        }
        this.projects[index] = {
          ...this.projects[index],
          ...updates,
          updatedAt: new Date().toISOString(),
        }
        resolve(this.projects[index])
      }, 500)
    })
  }

  async deleteProject(id: string): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const index = this.projects.findIndex((p) => p.id === id)
        if (index === -1) {
          reject(new Error('Project not found'))
          return
        }
        this.projects.splice(index, 1)
        resolve()
      }, 500)
    })
  }

  async addExternalResource(projectId: string, resource: ExternalResource): Promise<Project> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = this.projects.find((p) => p.id === projectId)
        if (!project) {
          reject(new Error('Project not found'))
          return
        }
        if (!project.externalResources) {
          project.externalResources = []
        }
        project.externalResources.push(resource)
        project.updatedAt = new Date().toISOString()
        resolve(project)
      }, 500)
    })
  }

  async removeExternalResource(projectId: string, resourceId: string): Promise<Project> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = this.projects.find((p) => p.id === projectId)
        if (!project || !project.externalResources) {
          reject(new Error('Project or resource not found'))
          return
        }
        project.externalResources = project.externalResources.filter((r) => r.id !== resourceId)
        project.updatedAt = new Date().toISOString()
        resolve(project)
      }, 500)
    })
  }

  async addModelToProject(projectId: string, model: Omit<Model, 'id' | 'projectId'>): Promise<Model> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const project = this.projects.find((p) => p.id === projectId)
        if (!project) {
          reject(new Error('Project not found'))
          return
        }
        const newModel: Model = {
          ...model,
          id: Date.now().toString(),
          projectId,
        }
        if (!project.models) {
          project.models = []
        }
        project.models.push(newModel)
        project.updatedAt = new Date().toISOString()
        resolve(newModel)
      }, 500)
    })
  }
}

export const projectService = new ProjectService()

