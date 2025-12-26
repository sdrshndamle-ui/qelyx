import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import LineageCatalog from './pages/LineageCatalog'
import LineageDashboard from './pages/LineageDashboard'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<LineageCatalog />} />
        <Route path="/lineage/:productName" element={<LineageDashboard />} />
      </Routes>
    </Layout>
  )
}

export default App

