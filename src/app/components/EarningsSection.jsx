'use client'

import { useState, useEffect } from 'react'

export function Heatmap() {
  const [apiData, setApiData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Function to fetch data
  const fetchUserLinkedIds = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Get userData from localStorage and parse it
      const userDataStr = localStorage.getItem('userData')
     
      
      if (!userDataStr) {
        setError('No userData found in localStorage')
        setLoading(false)
        return
      }

      // Parse userData to get UserId
      const userData = JSON.parse(userDataStr)
      const URID = userData.UserId
      
      if (!URID) {
        setError('No UserId found in userData')
        setLoading(false)
        return
      }

      const apiUrl = `https://apis.arbionai.com/api/Authentication/getUserLinkedIds?URID=${URID}`

      // Make API call
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })


      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const json = await response.json()
      
      // Store the raw API response
      setApiData(json)
      
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  // Use useEffect to call API on component mount
  useEffect(() => {
    fetchUserLinkedIds()
  }, [])

  return (
    <div className="mt-3 pt-3 border-t border-[rgba(255,255,255,0.05)]">
      
      {/* Loading State */}
      {loading && (
        <div className="mb-4 p-3 bg-[rgba(0,0,0,0.3)] rounded-lg">
          <div className="text-[11px] text-[var(--t2)]">Loading API data...</div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="mb-4 p-3 bg-[rgba(255,0,0,0.1)] rounded-lg border border-red-500">
          <div className="text-[11px] font-bold text-red-400 mb-2">Error:</div>
          <div className="text-[10px] text-red-300">{error}</div>
          <button 
            onClick={fetchUserLinkedIds}
            className="mt-2 px-2 py-1 bg-red-500/20 text-red-300 rounded text-[10px]"
          >
            Retry
          </button>
        </div>
      )}

      <div className="mb-2 text-sm font-bold">
        Linked Users & Packages
      </div>

      {/* Scrollable Container */}
      <div className="overflow-y-auto max-h-40 custom-scrollbar">
        {/* Display API Data in grid - responsive for mobile, 4 columns for desktop */}
        {apiData && apiData.data && (
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {apiData.data.map((item, index) => (
              <div 
                key={index}
                className="p-2 rounded-lg bg-[rgba(124,58,237,0.05)] border border-[rgba(124,58,237,0.2)] hover:bg-[rgba(124,58,237,0.1)] transition-all"
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[10px] font-mono text-[var(--t2)] truncate" title={item.ThirdPartyUserId}>
                    {item.ThirdPartyUserId}
                  </span>
                  <span className="text-[12px] font-mono font-bold text-[#22d3ee] whitespace-nowrap">
                    ${item.ThirdPartyPackage?.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* If no data */}
        {apiData && (!apiData.data || apiData.data.length === 0) && (
          <div className="text-center py-8 text-[var(--t2)] text-[11px]">
            No linked users found
          </div>
        )}
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(124, 58, 237, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(124, 58, 237, 0.6);
        }
      `}</style>
    </div>
  )
}

/* ===================== EARNINGS TRACKER (UNCHANGED UI) ===================== */
// export function EarningsTracker() {
//   const total = 8241
//   const limit = 12000
//   const remaining = limit - total
//   const pct = ((total / limit) * 100).toFixed(1)

//   const breakdown = [
//     { label: 'Trading', val: '$4,286', pct: '52%', color: '#22d3ee' },
//     { label: 'Level', val: '$1,841', pct: '22%', color: '#34d399' },
//     { label: 'Affiliate', val: '$841', pct: '16%', color: '#a78bfa' },
//     { label: 'Compound', val: '$1,274', pct: '10%', color: '#fbbf24' },
//   ]

//   return (
//     <div>
//       <div className="grid grid-cols-3 gap-2 mb-3">
//         {[
//           { label: 'Total Earned', val: `$${total.toLocaleString()}`, c: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
//           { label: 'Income Limit', val: `$${limit.toLocaleString()}`, c: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)' },
//           { label: 'Remaining', val: `$${remaining.toLocaleString()}`, c: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)' },
//         ].map(s => (
//           <div key={s.label} className="rounded-lg p-2.5 text-center border" style={{ background: s.bg, borderColor: s.border }}>
//             <div className="text-[9.5px] font-bold uppercase tracking-wider text-[var(--t2)] mb-0.5">{s.label}</div>
//             <div className="font-mono text-lg font-black" style={{ color: s.c }}>{s.val}</div>
//           </div>
//         ))}
//       </div>

//       <div className="flex justify-between text-[10.5px] text-[var(--t2)] mb-1">
//         <span>Income Used</span>
//         <span className="font-mono font-bold text-[#7c3aed]">{pct}%</span>
//       </div>

//       <div className="h-2 bg-[rgba(255,255,255,0.05)] rounded-full overflow-hidden mb-4">
//         <div
//           className="h-full rounded-full"
//           style={{ width: `${pct}%`, background: 'linear-gradient(90deg, #7c3aed, #06b6d4)' }}
//         />
//       </div>

//       {/* Breakdown */}
//       <div className="pt-3 border-t border-[rgba(255,255,255,0.05)]">
//         <div className="text-[12.5px] font-bold mb-3">Income Breakdown</div>

//         <div className="flex items-center gap-4">
//           <svg viewBox="0 0 80 80" className="flex-shrink-0 w-20 h-20 -rotate-90">
//             {breakdown.reduce((acc, b, i) => {
//               const pctVal = parseInt(b.pct) / 100
//               const circumference = 2 * Math.PI * 28
//               const strokeDasharray = `${pctVal * circumference} ${circumference}`
//               const strokeDashoffset = -acc.offset * circumference

//               acc.elements.push(
//                 <circle key={i} cx="40" cy="40" r="28" fill="none" stroke={b.color} strokeWidth="14"
//                   strokeDasharray={strokeDasharray}
//                   strokeDashoffset={strokeDashoffset}
//                   opacity="0.85"
//                 />
//               )

//               acc.offset += pctVal
//               return acc
//             }, { offset: 0, elements: [] }).elements}
//           </svg>

//           <div className="flex-1 space-y-2">
//             {breakdown.map(b => (
//               <div key={b.label} className="flex items-center justify-between text-[11.5px]">
//                 <div className="flex items-center gap-1.5">
//                   <div className="w-2 h-2 rounded-sm" style={{ background: b.color }} />
//                   <span className="text-[var(--t2)]">{b.label}</span>
//                 </div>
//                 <span className="font-mono font-bold">{b.val} <span className="text-[10px] text-[var(--t2)]">{b.pct}</span></span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

/* ===================== EARNINGS TRACKER (WITH SINGLE PIE CHART) ===================== */
export function EarningsTracker() {
  const total = 8241
  const limit = 12000
  const remaining = limit - total
  const pct = ((total / limit) * 100).toFixed(1)

  const breakdown = [
    { label: 'Trading', val: '$4,286', pct: '52%', color: '#22d3ee' },
    { label: 'Level', val: '$1,841', pct: '22%', color: '#34d399' },
    { label: 'Affiliate', val: '$841', pct: '16%', color: '#a78bfa' },
    { label: 'Compound', val: '$1,274', pct: '10%', color: '#fbbf24' },
  ]

  // Single blockchain data with all 4 metrics
  const blockchainData = [
    { name: 'BSC', percentage: 35, color: '#F0B90B' },
    { name: 'Solana', percentage: 28, color: '#14F195' },
    { name: 'Ethereum', percentage: 22, color: '#627EEA' },
    { name: 'Polygon', percentage: 15, color: '#8247E5' },
  ]

  return (
    <div>
      {/* <div className="grid grid-cols-3 gap-2 mb-3">
        {[
          { label: 'Total Earned', val: `$${total.toLocaleString()}`, c: '#7c3aed', bg: 'rgba(124,58,237,0.08)', border: 'rgba(124,58,237,0.2)' },
          { label: 'Income Limit', val: `$${limit.toLocaleString()}`, c: '#ef4444', bg: 'rgba(239,68,68,0.06)', border: 'rgba(239,68,68,0.2)' },
          { label: 'Remaining', val: `$${remaining.toLocaleString()}`, c: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)' },
        ].map(s => (
          <div key={s.label} className="rounded-lg p-2.5 text-center border" style={{ background: s.bg, borderColor: s.border }}>
            <div className="text-[9.5px] font-bold uppercase tracking-wider text-[var(--t2)] mb-0.5">{s.label}</div>
            <div className="font-mono text-lg font-black" style={{ color: s.c }}>{s.val}</div>
          </div>
        ))}
      </div> */}


      {/* Single Blockchain Usage Section */}
      <div className="pt-3 border-t border-[rgba(255,255,255,0.05)]">

        {/* Centered Pie Chart */}
        <div className="flex justify-center mb-4">
          <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
            {blockchainData.reduce((acc, chain, i) => {
              const pctVal = chain.percentage / 100
              const circumference = 2 * Math.PI * 42
              const strokeDasharray = `${pctVal * circumference} ${circumference}`
              const strokeDashoffset = -acc.offset * circumference

              acc.elements.push(
                <circle 
                  key={i} 
                  cx="50" 
                  cy="50" 
                  r="42" 
                  fill="none" 
                  stroke={chain.color} 
                  strokeWidth="10"
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  opacity="0.9"
                />
              )

              acc.offset += pctVal
              return acc
            }, { offset: 0, elements: [] }).elements}
          </svg>
        </div>

        {/* Legend - 4 blockchain items */}
        <div className="grid grid-cols-2 gap-2 mt-3">
          {blockchainData.map(chain => (
            <div key={chain.name} className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-[rgba(255,255,255,0.02)]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm" style={{ background: chain.color }} />
                <span className="text-[var(--t2)] font-medium">{chain.name}</span>
              </div>
              <span className="font-mono font-bold text-[var(--t1)]">
                {chain.percentage}%
              </span>
            </div>
          ))}
        </div>

       
      </div>
    </div>
  )
}