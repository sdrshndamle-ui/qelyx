import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '40px', 
          color: '#ffffff', 
          background: '#020617',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <h1 style={{ color: '#f5222d', marginBottom: '20px' }}>Something went wrong</h1>
          <pre style={{ 
            background: 'rgba(15, 23, 42, 0.9)', 
            padding: '20px', 
            borderRadius: '8px',
            color: 'rgba(226, 232, 240, 0.86)',
            maxWidth: '800px',
            overflow: 'auto'
          }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.error && this.state.error.stack}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{
              marginTop: '20px',
              padding: '10px 20px',
              background: 'linear-gradient(135deg, #22d3ee, #0ea5e9)',
              border: 'none',
              borderRadius: '6px',
              color: '#020617',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

