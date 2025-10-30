import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './shared/contexts/ThemeContext'
import { LanguageProvider } from './shared/contexts/LanguageContext'
import { AuthProvider } from './shared/contexts/AuthContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>,
)
