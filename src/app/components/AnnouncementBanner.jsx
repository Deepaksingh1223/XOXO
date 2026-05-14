'use client'
import { useState } from 'react'

const items = [
  'Platform v3.4.1 — 40% faster execution engine deployed globally',
  'Easter Campaign: 2× referral commission until Apr 30',
  'Arbitrum One now LIVE — 3 chains active simultaneously',
  'SOL/USDC hitting record 0.84% spreads this week',
  'Flash Loan capital limits increased 3× — higher profit potential',
  'Token2049 Singapore — XOXO team attending May 2025',
]
const all = [...items, ...items]

export default function AnnouncementBanner() {
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="flex items-center gap-3 px-4 py Ascending-2 mb-4 bg-[rgba(124,58,237,0.06)]  rounded-xl overflow-hidden">
      <span className="flex-shrink-0 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[rgba(239,68,68,0.2)] text-[#f87171] border border-[rgba(239,68,68,0.3)] tracking-wide animate-pulse">📢 LIVE</span>
      <div className="flex-1 overflow-hidden">
        <div className="flex gap-8 ann-track whitespace-nowrap">
          {all.map((item, i) => (
            <span key={i} className="text-[11.5px] text-[var(--t2)] flex-shrink-0">
              <span className="text-[rgba(124,58,237,0.6)] mx-2">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
      <button
        onClick={() => setVisible(false)}
        className="flex-shrink-0 text-[var(--t2)] hover:text-[var(--t1)] transition-colors text-sm leading-none"
      >✕</button>
    </div>
  )
}
