import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './shopify-theme.css'
import App from './App.jsx'
import { CurrencyProvider } from './hooks/useCurrency.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CurrencyProvider>
      <App />
    </CurrencyProvider>
  </StrictMode>,
)
