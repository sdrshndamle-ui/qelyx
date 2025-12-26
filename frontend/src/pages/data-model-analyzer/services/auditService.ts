// Audit Service for logging all user interactions

export interface AuditLog {
  id: string
  action: string
  timestamp: Date
  userId: string
  details: any
  projectId?: string
}

class AuditService {
  private logs: AuditLog[] = []

  logAction(action: string, details: any, projectId?: string) {
    const log: AuditLog = {
      id: Date.now().toString(),
      action,
      timestamp: new Date(),
      userId: 'user123', // In real app, get from auth context
      details,
      projectId,
    }
    this.logs.push(log)
    console.log('Audit Log:', log)
    // In production, send to backend API
  }

  getLogs(projectId?: string): AuditLog[] {
    if (projectId) {
      return this.logs.filter((log) => log.projectId === projectId)
    }
    return [...this.logs]
  }

  exportLogs(projectId?: string): string {
    const logs = this.getLogs(projectId)
    return JSON.stringify(logs, null, 2)
  }
}

export const auditService = new AuditService()

