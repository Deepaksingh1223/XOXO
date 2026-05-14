"use client";

import { useState, useEffect } from 'react';
import DashboardSidebar from '../components/DashboardHeader'; // XOXO Sidebar
import DashboardTopbar from '../components/DashboardSidebar'; // XOXO Topbar

// Dashboard CSS now loaded globally in root layout.js - /assets/css/dashboard.css
export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('dark');
  const [sidebarOpen, setSidebarOpen] = useState(true);


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    document.documentElement.dataset.theme = savedTheme;
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <link rel="stylesheet" href="/assets/css/dashboard.css" />
       
      {/* XOXO BACKGROUND SYSTEM */}
      <div className="bg-mesh">
        <div className="blob b1"></div>
        <div className="blob b2"></div>
        <div className="blob b3"></div>
      </div>
      <div className="grid-bg"></div>
      <div id="pts"></div>

      {/* MAIN LAYOUT */}
      <div className="layout" data-sidebar-open={sidebarOpen ? '1' : '0'}>
        {/* SIDEBAR TOGGLE (hamburger) */}
        <button
          type="button"
          className="sidebar-hamburger"
          aria-label="Toggle sidebar"
          onClick={() => setSidebarOpen(v => !v)}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        {/* XOXO SIDEBAR */}
        <div className="sidebar-wrap" aria-hidden={sidebarOpen ? 'false' : 'true'}>
          <DashboardSidebar />
        </div>

        {/* MAIN + TOPBAR */}
        <div className="main">
          <DashboardTopbar theme={theme} toggleTheme={toggleTheme} />
          <main className="content">
            {children}
          </main>
        </div>
      </div>

    </>
  );
}
