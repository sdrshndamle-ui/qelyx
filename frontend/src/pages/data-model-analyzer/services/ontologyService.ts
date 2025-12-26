// Industry Ontology Service
// This service integrates with industry-standard ontologies for data model analysis

interface OntologyMatch {
  term: string
  category: string
  confidence: number
  description: string
  table?: string
}

class OntologyService {
  // Industry ontology mappings
  private ontologyMappings: Record<string, OntologyMatch[]> = {
    customer: [
      {
        term: 'Customer',
        category: 'Entity',
        confidence: 0.95,
        description: 'Standard customer entity in retail/finance ontologies',
      },
      {
        term: 'Person',
        category: 'Entity',
        confidence: 0.88,
        description: 'Generic person entity from FOAF ontology',
      },
    ],
    order: [
      {
        term: 'Order',
        category: 'Transaction',
        confidence: 0.92,
        description: 'Standard order entity in e-commerce ontology',
      },
      {
        term: 'Purchase',
        category: 'Transaction',
        confidence: 0.85,
        description: 'Purchase transaction from commerce ontology',
      },
    ],
    product: [
      {
        term: 'Product',
        category: 'Entity',
        confidence: 0.94,
        description: 'Product entity from GoodRelations ontology',
      },
      {
        term: 'Item',
        category: 'Entity',
        confidence: 0.87,
        description: 'Generic item from schema.org',
      },
    ],
    payment: [
      {
        term: 'Payment',
        category: 'Transaction',
        confidence: 0.91,
        description: 'Payment transaction from financial ontology',
      },
      {
        term: 'Transaction',
        category: 'Transaction',
        confidence: 0.83,
        description: 'Generic transaction from schema.org',
      },
    ],
  }

  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  async findMatches(query: string): Promise<OntologyMatch[]> {
    await this.delay(1000)

    const queryLower = query.toLowerCase()
    const matches: OntologyMatch[] = []

    // Search through ontology mappings
    for (const [key, terms] of Object.entries(this.ontologyMappings)) {
      if (queryLower.includes(key)) {
        matches.push(...terms)
      }
    }

    // If no direct matches, return generic matches
    if (matches.length === 0) {
      return [
        {
          term: 'Entity',
          category: 'Generic',
          confidence: 0.5,
          description: 'Generic entity from common ontology',
        },
      ]
    }

    return matches.sort((a, b) => b.confidence - a.confidence)
  }

  async getOntologyTerm(entityName: string): Promise<OntologyMatch | null> {
    await this.delay(800)

    const entityLower = entityName.toLowerCase()
    const mapping = this.ontologyMappings[entityLower]

    if (mapping && mapping.length > 0) {
      return { ...mapping[0], table: entityName }
    }

    return null
  }

  async validateAgainstOntology(
    tableName: string,
    columns: string[]
  ): Promise<{
    valid: boolean
    suggestions: string[]
    warnings: string[]
  }> {
    await this.delay(1200)

    const suggestions: string[] = []
    const warnings: string[] = []

    // Check if table follows ontology standards
    const ontologyMatch = await this.getOntologyTerm(tableName)
    if (!ontologyMatch) {
      warnings.push(`Table "${tableName}" does not match standard ontology terms`)
    }

    // Suggest standard columns based on ontology
    if (tableName.toLowerCase().includes('customer')) {
      if (!columns.some((c) => c.toLowerCase().includes('email'))) {
        suggestions.push('Consider adding an "email" column (standard in customer ontologies)')
      }
      if (!columns.some((c) => c.toLowerCase().includes('name'))) {
        suggestions.push('Consider adding a "name" column (standard in customer ontologies)')
      }
    }

    return {
      valid: warnings.length === 0,
      suggestions,
      warnings,
    }
  }

  async getIndustryStandards(industry: string): Promise<OntologyMatch[]> {
    await this.delay(1000)

    // Industry-specific ontology standards
    const industryStandards: Record<string, OntologyMatch[]> = {
      retail: [
        {
          term: 'Customer',
          category: 'Entity',
          confidence: 0.95,
          description: 'Customer entity - retail industry standard',
        },
        {
          term: 'Product',
          category: 'Entity',
          confidence: 0.94,
          description: 'Product entity - retail industry standard',
        },
        {
          term: 'Order',
          category: 'Transaction',
          confidence: 0.93,
          description: 'Order transaction - retail industry standard',
        },
      ],
      finance: [
        {
          term: 'Account',
          category: 'Entity',
          confidence: 0.96,
          description: 'Account entity - finance industry standard',
        },
        {
          term: 'Transaction',
          category: 'Transaction',
          confidence: 0.94,
          description: 'Transaction entity - finance industry standard',
        },
      ],
    }

    return industryStandards[industry.toLowerCase()] || []
  }
}

export const ontologyService = new OntologyService()

