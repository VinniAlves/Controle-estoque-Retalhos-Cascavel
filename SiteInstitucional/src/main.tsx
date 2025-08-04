import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderFilters from './components/headers/headerFilters.tsx'
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <BrowserRouter>
           <HeaderFilters/>
            <App />
            
          </BrowserRouter>
         
  </StrictMode>,
)
