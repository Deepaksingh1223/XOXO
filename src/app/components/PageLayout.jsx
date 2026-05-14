'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useAuth } from '../contexts/AuthContext'

export default function PageLayout({ children, topbarProps }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { isLoggedIn, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.push('/login')
    }
  }, [isLoggedIn, loading, router])

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-purple-900/20">Loading...</div>
  }

  if (!isLoggedIn) {
    return null
  }

  return (
    <>
      <div className="flex h-screen overflow-hidden lg:flex" style={{ background: 'var(--bg)' }}>
        {/* Sidebar */}
        <div className={`lg:relative lg:translate-x-0 fixed lg:w-[215px] h-screen z-40 transition-transform lg:z-10 
          flex-shrink-0 overflow-hidden bg-[#060f20] border-[rgba(124,58,237,0.12)] 
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <Sidebar />
        </div>

        {/* Main content */}
        <div className="flex flex-col flex-1 h-full min-w-0 overflow-hidden">
          <Topbar onOpenRef={topbarProps?.onOpenRef || (() => {})} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="flex-1 min-h-0 p-2 space-y-4 overflow-y-auto md:p-4 scrollbar-thin scrollbar-thumb-purple-500/50 scrollbar-track-transparent">
            {children}
          </div>
        </div>
      </div>
      
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
    </>
  )
}
