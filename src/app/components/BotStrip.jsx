'use client'
import { useState } from 'react'
import BotModal from './BotModal'
import toast, { Toaster } from 'react-hot-toast'

export default function BotStrip({ onOpen }) {
  const [showModal, setShowModal] = useState(false)
  const [isLinking, setIsLinking] = useState(false)
  // No isLinked state - button always shows "Link"

  const handleActivateClick = (e) => {
    e.stopPropagation()
    setShowModal(true)
  }

  const handleModalClose = () => {
    setShowModal(false)
  }

  const handleBotActivate = (userId, packageAmount) => {
    setIsLinking(true)
    
    // Just show linking process - no localStorage
    setTimeout(() => {
      setIsLinking(false)
      setShowModal(false)
      
    }, 1000)
  }

  return (
    <>
      {/* Add Toaster component here */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#061417',
            color: '#e0faf6',
            border: '1px solid rgba(37,211,188,0.25)',
            borderRadius: '12px',
            fontSize: '13px',
          },
          success: {
            iconTheme: { primary: '#25d3bc', secondary: '#061417' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#061417' },
          },
        }}
      />

      <div
        onClick={onOpen}
        className="card-hi flex-wrap-new flex items-center gap-4 p-4 
        rounded-xl border border-[rgba(124,58,237,0.2)] bg-[#060f20]
        cursor-pointer hover:border-[rgba(124,58,237,0.4)] transition-all mb-4
        shadow-[0_0_30px_rgba(124,58,237,0.06)]"
      >
        {/* Bot icon */}
        <div className="relative flex-shrink-0 add-width1">
          <div className="bot-ring" />
          <svg width="40" height="40" viewBox="0 0 64 64" fill="none">
            <rect x="10" y="18" width="44" height="34" rx="9" stroke="#a78bfa" strokeWidth="1.5"/>
            <rect x="10" y="18" width="44" height="11" rx="9" fill="rgba(124,58,237,0.12)"/>
            <rect x="19" y="28" width="8" height="8" rx="3" fill="#06b6d4" opacity=".9"/>
            <rect x="37" y="28" width="8" height="8" rx="3" fill="#7c3aed" opacity=".9"/>
            <path d="M22 42h20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M26 18V13M38 18V13" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="26" cy="11" r="3" fill="#7c3aed"/>
            <circle cx="38" cy="11" r="3" fill="#7c3aed"/>
          </svg>
          
          {/* Show linking indicator */}
          {isLinking && (
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 add-width2">
          <div className="mb-1 text-base font-black">XOXO <span className="text-[#a78bfa]">AI Engine</span></div>
          <p className="text-[11.5px] text-[var(--t2)] leading-relaxed mb-2.5">
            MEV + Cross-DEX + Flash Loan arbitrage — Earn passively 24/7 across SOL, ETH & BSC. Click to learn more & activate.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { v: '91.7%', l: 'Win Rate', c: '#10b981' },
              { v: '~340%', l: 'APY', c: '#7c3aed' },
              { v: '142/min', l: 'Opportunities', c: '#06b6d4' },
              { v: '3 chains', l: 'Networks', c: '#f59e0b' },
            ].map(s => (
              <div key={s.l} className="text-center">
                <div className="text-[13px] font-black font-mono" style={{ color: s.c }}>{s.v}</div>
                <div className="text-[9px] font-bold uppercase tracking-wide text-[var(--t2)]">{s.l}</div>
              </div>
            ))}
          </div>
          
          {/* Show linking message */}
          {isLinking && (
            <div className="mt-2 text-[10px] font-semibold text-yellow-500 flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
              Linking your account...
            </div>
          )}
        </div>

        {/* Single button - Always shows "Link Cross Market ID" */}
        <button
          onClick={handleActivateClick}
          disabled={isLinking}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white transition-opacity shadow-[0_0_16px_rgba(124,58,237,0.4)] flex-shrink-0 ${
            isLinking 
              ? 'bg-gradient-to-r from-gray-500 to-gray-600 cursor-not-allowed opacity-60' 
              : 'bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] hover:opacity-90'
          }`}
        >
          {isLinking ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Linking...
            </>
          ) : (
            <>
              <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="currentColor">
                <polygon points="4,2 14,8 4,14"/>
              </svg>
              Link Cross Market ID
            </>
          )}
        </button>
      </div>

      {/* Bot Modal - Always rendered */}
      <BotModal 
        open={showModal}
        onClose={handleModalClose}
        onActivate={handleBotActivate}
      />
    </>
  )
}