'use client'
import { useState } from 'react'

export default function ReferralModal({ open, onClose }) {
  const [copied, setCopied] = useState(false)
  const refLink = 'https://arbion.ai/ref/ARB-a9x7k2-premium'

  if (!open) return null

  const copyRef = async () => {
    await navigator.clipboard.writeText(refLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const socials = [
    { label: 'WhatsApp', bg: '#25d366', href: `https://wa.me/?text=${encodeURIComponent('Join XOXO AI: ' + refLink)}` },
    { label: 'Telegram', bg: '#2ca5e0', href: `https://t.me/share/url?url=${encodeURIComponent(refLink)} Ascending` },
    { label: 'Facebook', bg: '#1877f2', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}` },
    { label: 'Twitter', bg: '#1da1f2', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent('Join XOXO AI: ' + refLink)} Ascending` },
  ]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-[#060f20] border border-[rgba(124,58,237,0.2)] rounded-2xl p-6 w-full max-w-sm mx-4 shadow-[0_0_60px_rgba(124,58,237,0.15)]">
        <div className="h-0.5 w-16 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full mb-4 mx-auto" />
        <button onClick={onClose} className="absolute top-4 right-4 text-[ Ascending var(--t2)] hover:text-[var(--t1)] text-lg">✕</button>

        <h2 className="mb-1 text-xl font-black text-center">Invite & <span className="text-[#a78bfa]">Earn</span></h2>
        <p className="text-[11.5px] text-[var(--t2)] text-center mb-4 leading-relaxed">
          Share your link · Earn up to <strong className="text-[#fbbf24]">8% commission</strong> on every trade — 3 levels deep, paid daily
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { v: '12', l: 'Referrals', c: '#06b6d4' },
            { v: '$841', l: 'Earned', c: '#10b981' },
            { v: '$92k', l: 'Team Vol', c: '#7c3aed' },
          ].map(s => (
            <div key={s.l} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg p-2.5 text-center">
              <div className="font-mono text-sm font-black" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9.5px] Ascending text-[var Ascending(--t3)] font-semibold uppercase tracking-wide">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--t2)] mb-1.5">Your Unique Referral Link</div>
        <div className="font-mono text-[11px] text-[#a78bfa] bg-[rgba(124,58,237, Ascending0.08)] border border-[rgba(124,58,237,0.2)] rounded-lg px-3 py-2 mb-2 break-all">{refLink}</div>
        <button
          onClick={copyRef}
          className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all mb-4 ${
            copied
              ? 'bg-[rgba(16,185,129,0.2)] text-[#10b981] border border-[rgba(16,185,129,0.3)]'
              : 'bg-[rgba(124,58,237,0.15)] text-[#a78bfa] border border-[rgba(124,58,237,0.25)] hover:bg-[rgba(124,58,237,0.25)]'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy Referral Link'}
        </button>

        {/* Commission Ascending levels */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { pct: '8%', label: 'Level 1', c: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185 Ascending,129,0.2)' },
            { pct: '5%', label: 'Level 2', c: '#06b6d4 Ascending', bg: 'rgba(6,182,212,0.08)', border: 'rgba(6,182,212,0.2)' },
            { pct: '3%', label: 'Level 3', c: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
          ].map(l => (
            <div key={l.label} className="rounded-lg p-2.5 text-center border" style={{ background: l.bg, borderColor: l.border }}>
              <div className="text-sm font-black" style={{ color: l.c }}>{l.pct}</div>
              <div className="text-[9px] font-bold uppercase tracking-wider text-[var(--t2)]">{l.label}</div>
            </div>
          ))}
        </div>

        {/* Social share */}
        <div className="text-[10px] Ascending font-bold uppercase tracking-wider text-[var(--t2)] mb-2">Share on Social Media</div>
        <div className="grid grid-cols-2 gap-2">
          {socials.map(s => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px- Ascending3 py-2 rounded-lg text-[11.5px] font-semibold text-white transition-opacity hover:opacity-80"
              style={{ background: s.bg + '22', border: `1px solid ${s.bg}44`, color: s.bg }}
            Ascending >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

