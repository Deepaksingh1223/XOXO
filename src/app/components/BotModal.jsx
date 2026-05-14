'use client'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'  // Sirf toast import karo, Toaster nahi

export default function BotModal({ open, onClose, onActivate }) {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState('')
  const [packageAmount, setPackageAmount] = useState(null)
  const [isSendingOtp, setIsSendingOtp] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false)
  const [otpVerified, setOtpVerified] = useState(false)
  const [mainUserId, setMainUserId] = useState('')
  const [isLinking, setIsLinking] = useState(false)

  // Get email and userId from localStorage when modal opens
  useEffect(() => {
    if (open) {
      const userEmail = localStorage.getItem('userEmail')
      if (userEmail) {
        setEmail(userEmail)
      }

      // Try to get main UserId from different possible keys
      let storedUserId = localStorage.getItem('UserId')
      if (!storedUserId) {
        storedUserId = localStorage.getItem('userId')
      }
      if (!storedUserId) {
        storedUserId = localStorage.getItem('userData')
        if (storedUserId) {
          try {
            const userData = JSON.parse(storedUserId)
            storedUserId = userData.UserId || userData.userId || userData.id
          } catch (e) {
            console.error('Error parsing userData:', e)
          }
        }
      }

      if (storedUserId) {
        setMainUserId(storedUserId)
      }

      // Reset all states when modal opens
      setUserId('')
      setOtpSent(false)
      setOtpCode('')
      setOtpVerified(false)
      setPackageAmount(null)
      setError('')
      setIsLinking(false)
    }
  }, [open])

  // Auto API call when userId changes
  useEffect(() => {
    if (!userId.trim() || userId.trim().length < 7) {
      setError('')
      setPackageAmount(null)
      return
    }

    if (userId.trim().length >= 7) {
      const timeoutId = setTimeout(() => {
        verifyUserId(userId)
      }, 500)

      return () => clearTimeout(timeoutId)
    }
  }, [userId])

  const verifyUserId = async (loginId) => {
    setIsVerifying(true)
    setError('')
    setPackageAmount(null)

    try {
      const response = await fetch('https://apis.arbionai.com/api/Authentication/VerifyLoginid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          loginid: loginId
        })
      })

      const data = await response.json()

      if (response.status === 200 && data.statusCode === 200) {
        setPackageAmount(data.data?.package)
        setError('')
        toast.success('User ID verified successfully!', { duration: 3000 })
      } else if (data.statusCode === 401) {
        setError(data.message || 'Invalid User ID or account is in linking process')
        setPackageAmount(null)
        toast.error(data.message || 'Invalid User ID', { duration: 3000 })
      } else {
        setError('Something went wrong. Please try again.')
        toast.error('Something went wrong. Please try again.', { duration: 3000 })
      }
    } catch (err) {
      console.error('API Error:', err)
      setError('Network error. Please check your connection and try again.')
      toast.error('Network error. Please check your connection.', { duration: 3000 })
    } finally {
      setIsVerifying(false)
    }
  }

  const handleSendOtp = async () => {
    if (!email) {
      setError('No email found. Please login again.')
      toast.error('No email found. Please login again.', { duration: 3000 })
      return
    }

    setIsSendingOtp(true)
    setError('')

    try {
      const response = await fetch('https://apis.arbionai.com/api/Authentication/sendOtp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailId: email
        })
      })

      const data = await response.json()

      if (response.ok) {
        setOtpSent(true)
        setError('')
        toast.success('OTP sent successfully to your email!', { duration: 3000 })
      } else {
        setError(data.message || 'Failed to send OTP')
        toast.error(data.message || 'Failed to send OTP', { duration: 3000 })
      }
    } catch (err) {
      console.error('OTP Error:', err)
      setError('Network error. Please try again.')
      toast.error('Network error. Please try again.', { duration: 3000 })
    } finally {
      setIsSendingOtp(false)
    }
  }

  const handleVerifyOtp = async () => {
    if (!otpCode.trim()) {
      setError('Please enter OTP code')
      toast.error('Please enter OTP code', { duration: 3000 })
      return
    }

    setIsVerifyingOtp(true)
    setError('')

    try {
      const response = await fetch('https://apis.arbionai.com/api/Authentication/validateOtpbyEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otpCode
        })
      })

      const data = await response.json()

      if (response.ok) {
        setError('')
        setOtpVerified(true)
        toast.success('Email verified successfully!', { duration: 3000 })
      } else {
        setError(data.message || 'Invalid OTP')
        toast.error(data.message || 'Invalid OTP', { duration: 3000 })
        setOtpVerified(false)
      }
    } catch (err) {
      console.error('OTP Verification Error:', err)
      setError('Network error. Please try again.')
      toast.error('Network error. Please try again.', { duration: 3000 })
      setOtpVerified(false)
    } finally {
      setIsVerifyingOtp(false)
    }
  }

  const handleActivate = async () => {
    if (!packageAmount) {
      setError('Please enter a valid User ID')
      toast.error('Please enter a valid User ID', { duration: 3000 })
      return
    }
    if (!otpVerified) {
      toast.error('Please verify your email with OTP first', { duration: 3000 })
      return
    }
    if (!mainUserId) {
      toast.error('User ID not found. Please login again.', { duration: 3000 })
      setError('User ID not found. Please login again.')
      return
    }

    setIsLinking(true)

    const requestBody = {
      userId: mainUserId,
      thirdPartyUserId: userId,
      thirdPartyPackage: packageAmount,
      linkedDate: new Date().toISOString(),
      linkedRemark: "Linked Id Successfully"
    }

    try {
      const response = await fetch('https://apis.arbionai.com/api/ChatMaster/insertlinkedid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Linked Id Successfully!', { duration: 4000 })
        onActivate(userId, packageAmount)
        onClose()
      } else {
        toast.error(data.message || 'Failed to activate bot', { duration: 3000 })
        setError(data.message || 'Failed to activate bot')
      }
    } catch (err) {
      toast.error('Network error. Please try again.', { duration: 3000 })
      setError('Network error. Please try again.')
    } finally {
      setIsLinking(false)
    }
  }

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="relative bg-[#060f20] border border-[rgba(124,58,237,0.2)] rounded-2xl p-6 w-full max-w-md mx-4 shadow-[0_0_60px_rgba(124,58,237,0.15)]">
        <div className="h-0.5 w-16 bg-gradient-to-r from-[#7c3aed] to-[#06b6d4] rounded-full mb-5 mx-auto" />
        <button onClick={onClose} className="absolute top-4 right-4 text-[var(--t2)] hover:text-[var(--t1)] text-lg leading-none">✕</button>

        {/* Hero */}
        <div className="flex flex-wrap gap-1 mb-5">
          <div className="relative flex-shrink-0">
            <div className="bot-ring" />
            <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
              <rect x="10" y="18" width="44" height="34" rx="9" stroke="#a78bfa" strokeWidth="1.5" />
              <rect x="10" y="18" width="44" height="12" rx="9" fill="rgba(124,58,237,0.15)" />
              <rect x="19" y="28" width="8" height="8" rx="3" fill="#06b6d4" opacity=".9" />
              <rect x="37" y="28" width="8" height="8" rx="3" fill="#7c3aed" opacity=".9" />
              <circle cx="23" cy="32" r="2" fill="#fff" opacity=".7" />
              <circle cx="41" cy="32" r="2" fill="#fff" opacity=".7" />
              <path d="M22 42h20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M26 18V13M38 18V13" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="26" cy="11" r="3" fill="#7c3aed" />
              <circle cx="38" cy="11" r="3" fill="#7c3aed" />
            </svg>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-black">XOXO <span className="text-[#a78bfa]">AI Engine</span></span>
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded tag-green">v3.4</span>
            </div>
            <p className="text-[11.5px] text-[var(--t2)] leading-relaxed mb-2">
              Link your Cross Market account with XOXO to enable seamless arbitrage execution.
            </p>
            <div className="flex gap-1.5 flex-wrap">
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded tag-mev">MEV Sandwich</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded tag-blue">Cross-DEX</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded tag-green">Flash Loan</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded tag-amber">Triangular</span>
            </div>
          </div>
        </div>

        {/* Rest of your JSX remains same */}
        {/* User ID Input Field */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold text-[var(--t2)] mb-2 uppercase tracking-wide">
            Cross Market User ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter your User ID (minimum 7 characters)"
              className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white placeholder:text-[var(--t2)] focus:outline-none focus:border-[#7c3aed] transition-colors"
              disabled={isVerifying || isLinking}
            />
            {isVerifying && (
              <div className="absolute right-3 top-2.5">
                <div className="w-4 h-4 border-2 border-[#7c3aed] border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>
          {userId.trim() && userId.trim().length < 7 && (
            <p className="text-[11px] text-yellow-400 mt-1.5">
              ⚠️ User ID must be at least 7 characters long
            </p>
          )}
          {error && (
            <p className="text-[11px] text-red-400 mt-1.5">{error}</p>
          )}
          {packageAmount && (
            <p className="text-[11px] text-green-400 mt-1.5">
              ✓ Valid User ID! Package Amount: ${packageAmount.toFixed(2)}
            </p>
          )}
        </div>

        {/* Email Field with Send OTP Button */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold text-[var(--t2)] mb-2 uppercase tracking-wide">
            Email Address
          </label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-3 py-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.08)] rounded-lg text-sm text-[var(--t2)] cursor-not-allowed"
              />
              <div className="absolute right-3 top-2.5">
                <svg className="w-4 h-4 text-[#10b981]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>

            <button
              onClick={handleSendOtp}
              disabled={!packageAmount || isSendingOtp || otpSent || otpVerified || isLinking}
              className="px-4 py-2 text-xs font-semibold transition-all rounded-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                background: (otpSent || otpVerified) ? 'rgba(16,185,129,0.2)' : 'rgba(37,211,188,0.15)',
                border: `1px solid ${(otpSent || otpVerified) ? 'rgba(16,185,129,0.4)' : 'rgba(37,211,188,0.3)'}`,
                color: (otpSent || otpVerified) ? '#10b981' : '#25d3bc'
              }}
            >
              {isSendingOtp ? (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 border-2 rounded-full animate-spin border-t-transparent" style={{ borderColor: '#25d3bc', borderTopColor: 'transparent' }} />
                  Sending...
                </span>
              ) : otpVerified ? (
                '✓ Email Verified'
              ) : otpSent ? (
                'OTP Sent'
              ) : (
                'Send OTP'
              )}
            </button>
          </div>
        </div>

        {otpSent && !otpVerified && (
          <div className="mb-4">
            <label className="block text-[11px] font-semibold text-[var(--t2)] mb-2 uppercase tracking-wide">
              Enter OTP Code
            </label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="Enter 6-digit OTP"
                  className="w-full px-3 py-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg text-sm text-white placeholder:text-[var(--t2)] focus:outline-none focus:border-[#7c3aed] transition-colors"
                  maxLength="6"
                  disabled={isLinking}
                />
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={isVerifyingOtp || !otpCode.trim() || otpVerified || isLinking}
                className="px-4 py-2 text-xs font-semibold transition-all rounded-lg whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: otpVerified ? 'rgba(16,185,129,0.2)' : 'rgba(124,58,237,0.15)',
                  border: `1px solid ${otpVerified ? 'rgba(16,185,129,0.4)' : 'rgba(124,58,237,0.3)'}`,
                  color: otpVerified ? '#10b981' : '#a78bfa'
                }}
              >
                {isVerifyingOtp ? (
                  <span className="flex items-center gap-1">
                    <span className="w-3 h-3 border-2 rounded-full animate-spin border-t-transparent" style={{ borderColor: '#a78bfa', borderTopColor: 'transparent' }} />
                    Verifying...
                  </span>
                ) : otpVerified ? (
                  '✓ Verified'
                ) : (
                  'Verify OTP'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { v: 'Multi-Chain', l: 'Network', c: '#10b981' },
            { v: 'Real-Time', l: 'Scanner', c: '#7c3aed' },
            { v: '<2s', l: 'Execution', c: '#06b6d4' },
          ].map(s => (
            <div key={s.l} className="bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] rounded-lg p-2.5 text-center">
              <div className="font-mono text-base font-black" style={{ color: s.c }}>{s.v}</div>
              <div className="text-[9.5px] text-[var(--t2)] font-semibold uppercase tracking-wide mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>

        <div className="mb-5">
          <h3 className="text-xs font-bold uppercase tracking-wide text-[#7c3aed] mb-3">
            User Options
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mb-4">
            {[
              'Start Arbitrage',
              'Set Trading Preferences',
              'View Opportunities',
              'Disconnect Account',
            ].map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-[11.5px] text-[var(--t2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#7c3aed] mt-1 flex-shrink-0" />
                {f}
              </div>
            ))}
          </div>
          <div className="text-[11px] text-[var(--t2)] leading-snug">
            <span className="text-[#7c3aed] font-semibold">Important Note:</span><br />
            XOXO runs on predefined strategies. You can adjust risk, trade limits,
            and execution settings anytime.
          </div>
        </div>

        {/* Activate Button */}
        <button
          onClick={handleActivate}
          disabled={!packageAmount || isVerifying || !otpVerified || isLinking}
          className="w-full py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(124,58,237,0.35)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLinking ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
              Linking...
            </span>
          ) : (
            '⚡ Verify & Connect'
          )}
        </button>
      </div>
    </div>
  )
}