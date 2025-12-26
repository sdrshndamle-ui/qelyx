// DDL Service for generating Data Definition Language scripts

import { Node, Edge } from 'reactflow'

interface TableNodeData {
  tableName: string
  columns: Array<{ name: string; type: string; primaryKey?: boolean }>
}

interface TableNode extends Node {
  data: TableNodeData
}

class DDLService {
  generateDDL(nodes: Node[], edges: Edge[]): string {
    let ddl = '-- Generated DDL Script\n'
    ddl += `-- Generated on: ${new Date().toISOString()}\n\n`

    // Generate CREATE TABLE statements
    nodes.forEach((node) => {
      const tableNode = node as TableNode
      if (!tableNode.data?.tableName) return
      
      const tableName = tableNode.data.tableName
      ddl += `CREATE TABLE ${tableName} (\n`

      const columns = (tableNode.data.columns || []).map((col) => {
        let colDef = `  ${col.name} ${col.type}`
        if (col.primaryKey) {
          colDef += ' PRIMARY KEY'
        }
        return colDef
      })

      if (columns.length === 0) {
        ddl += '  id BIGINT PRIMARY KEY\n'
      } else {
        ddl += columns.join(',\n')
      }
      ddl += '\n);\n\n'
    })

    // Generate foreign key constraints from edges
    edges.forEach((edge, index) => {
      const sourceNode = nodes.find((n) => n.id === edge.source) as TableNode
      const targetNode = nodes.find((n) => n.id === edge.target) as TableNode

      if (sourceNode?.data?.tableName && targetNode?.data?.tableName) {
        ddl += `ALTER TABLE ${sourceNode.data.tableName}\n`
        ddl += `  ADD CONSTRAINT fk_${sourceNode.data.tableName}_${targetNode.data.tableName}_${index}\n`
        ddl += `  FOREIGN KEY (id) REFERENCES ${targetNode.data.tableName}(id);\n\n`
      }
    })

    return ddl
  }

  generateAlterStatements(changes: any[]): string {
    let ddl = '-- ALTER Statements for Changes\n\n'
    changes.forEach((change) => {
      if (change.type === 'add_column') {
        ddl += `ALTER TABLE ${change.tableName} ADD COLUMN ${change.columnName} ${change.columnType};\n`
      } else if (change.type === 'add_table') {
        ddl += `CREATE TABLE ${change.tableName} (...);\n`
      } else if (change.type === 'add_relationship') {
        ddl += `ALTER TABLE ${change.fromTable} ADD FOREIGN KEY (${change.column}) REFERENCES ${change.toTable}(id);\n`
      }
    })
    return ddl
  }
}

export const ddlService = new DDLService()
