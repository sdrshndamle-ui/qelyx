import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00d9ff',
            colorBgBase: '#020617',
            colorText: 'rgba(226, 232, 240, 0.86)',
            fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            fontSize: 16,
          },
          components: {
            Button: {
              primaryColor: '#020617',
              fontSize: 16,
              fontWeight: 600,
            },
            Card: {
              colorBgContainer: 'rgba(15, 23, 42, 0.9)',
              borderRadius: 12,
              paddingLG: 24,
              colorText: 'rgba(226, 232, 240, 0.86)',
            },
            Statistic: {
              colorText: 'rgba(226, 232, 240, 0.86)',
              colorTextDescription: '#67e8f9',
            },
            Input: {
              colorBgContainer: 'rgba(15, 23, 42, 0.9)',
              colorText: 'rgba(226, 232, 240, 0.9)',
              colorTextPlaceholder: 'rgba(148, 163, 184, 0.6)',
              fontSize: 16,
            },
            Select: {
              colorBgContainer: 'rgba(15, 23, 42, 0.9)',
              optionSelectedBg: 'rgba(0, 217, 255, 0.2)',
              optionActiveBg: 'rgba(0, 217, 255, 0.15)',
              colorText: 'rgba(226, 232, 240, 0.86)',
              fontSize: 16,
            },
            Menu: {
              itemSelectedBg: 'rgba(0, 217, 255, 0.3)',
              itemSelectedColor: '#00d9ff',
              itemHoverBg: 'rgba(0, 217, 255, 0.15)',
              itemHoverColor: '#00d9ff',
            },
            Table: {
              colorBgContainer: 'rgba(15, 23, 42, 0.9)',
              colorText: 'rgba(226, 232, 240, 0.86)',
              fontSize: 16,
            },
            Typography: {
              fontSize: 16,
              colorText: 'rgba(226, 232, 240, 0.86)',
            },
            Modal: {
              colorText: 'rgba(226, 232, 240, 0.9)',
            },
            Form: {
              labelColor: 'rgba(226, 232, 240, 0.9)',
            },
            Pagination: {
              colorText: 'rgba(226, 232, 240, 0.86)',
            },
            Tabs: {
              colorText: 'rgba(226, 232, 240, 0.86)',
              itemActiveColor: '#00d9ff',
              itemSelectedColor: '#00d9ff',
              inkBarColor: '#00d9ff',
            },
          },
        }}
      >
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
