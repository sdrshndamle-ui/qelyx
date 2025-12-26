// Utility functions for downloading content

export const downloadAsJSON = (data: any, filename: string) => {
  const jsonStr = JSON.stringify(data, null, 2)
  const blob = new Blob([jsonStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.json`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const downloadAsText = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${filename}.txt`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const downloadAsCSV = (data: any[] | string, filename: string) => {
  let csvContent: string
  
  if (typeof data === 'string') {
    // If data is already a CSV string, use it directly
    csvContent = data
  } else {
    // If data is an array, convert it to CSV
    if (data.length === 0) return

    const headers = Object.keys(data[0])
    const csvRows = [
      headers.join(','),
      ...data.map((row) =>
        headers
          .map((header) => {
            const value = row[header]
            if (value === null || value === undefined) return ''
            if (typeof value === 'object') return JSON.stringify(value)
            return `"${String(value).replace(/"/g, '""')}"`
          })
          .join(',')
      ),
    ]

    csvContent = csvRows.join('\n')
  }

  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename.includes('.csv') ? filename : `${filename}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export const downloadChatHistory = (messages: Array<{ role: string; content: string; timestamp: Date }>, filename: string) => {
  const chatContent = messages
    .map((msg) => {
      const timestamp = new Date(msg.timestamp).toLocaleString()
      return `[${timestamp}] ${msg.role.toUpperCase()}:\n${msg.content}\n${'='.repeat(80)}\n`
    })
    .join('\n')

  downloadAsText(chatContent, filename)
}

