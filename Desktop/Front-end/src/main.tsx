import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import React from 'react'

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      <Layout>
        <App />
      </Layout>
    
  
  </StrictMode>,
)

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='w-screen'>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

