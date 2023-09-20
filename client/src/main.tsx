import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthTokenProvider } from './context/AuthTokenContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthTokenProvider>
        <App />
      </AuthTokenProvider>
    </BrowserRouter>
  </React.StrictMode>
)


