// 'use client'
// import { useState, useEffect } from 'react'

// export default function WelcomeStrip() {
//   const [greeting, setGreeting] = useState('Good morning')

//   useEffect(() => {
//     const h = new Date().getHours()
//     if (h < 12) setGreeting('Good morning')
//     else if (h < 17) setGreeting('Good afternoon')
//     else setGreeting('Good evening')
//   }, [])

//   return (
//     <div className="flex items-center gap-3 px-5 py-2.5 border-b border-[rgba(124,58,237,0.08)] bg-[rgba(124,58,237,0.03)] flex-wrap gap-y-2">
//       <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-xs font-black text-white flex-shrink-0">
//         A
//       </div>
//       <div className="flex-1 min-w-0">
//         <div className="text-[12.5px] font-bold">{greeting} arbion123 ☀️</div>
//         <div className="text-[10px] text-[var(--t2)]">Last login: Today 09:14 AM · 0x8b5…cf6A · IP 192.168.x.x</div>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {[
//           { dot: '#10b981', label: 'Bot', val: 'ACTIVE', c: '#10b981' },
//           { dot: '#7c3aed', label: 'Today', val: '+$341.25', c: '#7c3aed' },
//           { dot: '#f59e0b', label: 'Uptime', val: '14h 35m', c: '#f59e0b' },
//         ].map(p => (
//           <div key={p.label} className="flex items-center gap-1.5 text-[11.5px] px-2.5 py-1 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.06)]">
//             <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.dot, boxShadow: `0 0 4px ${p.dot}` }} />
//             <span className="text-[var(--t2)]">{p.label}</span>
//             <span className="font-bold" style={{ color: p.c }}>{p.val}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

'use client'
import { useState, useEffect } from 'react'

export default function WelcomeStrip() {
  const [greeting, setGreeting] = useState('Good morning')
  const [userName, setUserName] = useState('')
  const [userData, setUserData] = useState(null)

  useEffect(() => {
    const h = new Date().getHours()
    if (h < 12) setGreeting('Good morning')
    else if (h < 17) setGreeting('Good afternoon')
    else setGreeting('Good evening')
  }, [])

  // Fetch user data from localStorage
  useEffect(() => {
    try {
      let userDataString = localStorage.getItem('userData')
      if (!userDataString) {
        userDataString = localStorage.getItem('UserData')
      }
      
      if (userDataString) {
        const parsedData = JSON.parse(userDataString)
        setUserData(parsedData)
        
        // Get FullName from the data
        const fullName = parsedData.FullName || parsedData.fullName || 'User'
        // Take first name or first part of full name
        const displayName = fullName
        setUserName(displayName)
      } else {
        setUserName('Guest')
      }
    } catch (error) {
      console.error('Error parsing userData:', error)
      setUserName('User')
    }
  }, [])

  return (
    <div className="flex items-center gap-3 px-5 py-2.5 border-b border-[rgba(124,58,237,0.08)] bg-[rgba(124,58,237,0.03)] flex-wrap gap-y-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#06b6d4] flex items-center justify-center text-xs font-black text-white flex-shrink-0 uppercase">
        {userName.charAt(0) || 'A'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] font-bold">
          {greeting} {userName} {userName ? '☀️' : '👋'}
        </div>
        <div className="text-[10px] text-[var(--t2)]">
          Last login: Today {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} · {userData?.UserId ? userData.UserId.slice(0, 8) + '…' + userData.UserId.slice(-4) : 'Not logged in'} · IP {userData?.IP || '192.168.x.x'}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {[
          { dot: '#10b981', label: 'Bot', val: 'ACTIVE', c: '#10b981' },
          { dot: '#7c3aed', label: 'Today', val: '+$341.25', c: '#7c3aed' },
          { dot: '#f59e0b', label: 'Uptime', val: '14h 35m', c: '#f59e0b' },
        ].map(p => (
          <div key={p.label} className="flex items-center gap-1.5 text-[11.5px] px-2.5 py-1 bg-[rgba(255,255,255,0.03)] rounded-lg border border-[rgba(255,255,255,0.06)]">
            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: p.dot, boxShadow: `0 0 4px ${p.dot}` }} />
            <span className="text-[var(--t2)]">{p.label}</span>
            <span className="font-bold" style={{ color: p.c }}>{p.val}</span>
          </div>
        ))}
      </div>
    </div>
  )
}