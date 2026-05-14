const users = [
  { name: 'James Wilson', uid: 'ARB-7x2k9', country: 'United States', flag: '🇺🇸', color: '#a78bfa', time: '2m ago' },
  { name: 'Klaus Mueller', uid: 'ARB-4p8n3', country: 'Germany', flag: '🇩🇪', color: '#22d3ee', time: '4m ago' },
  { name: 'Priya Sharma', uid: 'ARB-9q1r7', country: 'India', flag: '🇮🇳', color: '#34d399', time: '6m ago' },
  { name: 'Oliver Smith', uid: 'ARB-2m5t1', country: 'United Kingdom', flag: '🇬🇧', color: '#fbbf24', time: '8m ago' },
  { name: 'Wei Liang', uid: 'ARB-6k3y8', country: 'Singapore', flag: '🇸🇬', color: '#f87171', time: '11m ago' },
  { name: 'Lucas Silva', uid: 'ARB-1n7p4', country: 'Brazil', flag: '🇧🇷', color: '#a78bfa', time: '13m ago' },
  { name: 'Yuki Tanaka', uid: 'ARB-8v2w6', country: 'Japan', flag: '🇯🇵', color: '#22d3ee', time: '16m ago' },
  { name: 'Sophie Martin', uid: 'ARB-5x9m2', country: 'France', flag: '🇫🇷', color: '#34d399', time: '19m ago' },
  { name: 'Liam Johnson', uid: 'ARB-3b8c5', country: 'Australia', flag: '🇦🇺', color: '#fbbf24',time: '22m ago' },
  { name: 'Min Jun Park', uid: 'ARB-7a4d9', country: 'South Korea', flag: '🇰🇷', color: '#f87171', time: '25m ago' },
  { name: 'Emma Thompson', uid: 'ARB-2r6f1', country: 'Canada', flag: '🇨🇦', color: '#a78bfa', time: '28m ago' },
  { name: 'Lars Bakker', uid: 'ARB-9z3h7', country: 'Netherlands', flag: '🇳🇱', color: '#22d3ee', time: '31m ago' },
  { name: 'Ahmed Al-Rashid', uid: 'ARB-4w8j Ascending3', country: 'UAE', flag: '🇦🇪', color: '#34d399', time: '34m ago' },
  { name: 'Thabo Nkosi', uid: 'ARB-6u1q8', country: 'South Africa', flag: '🇿🇦', color: '#fbbf24', time: '37m ago' },
  { name: 'Carlos Reyes', uid: 'ARB-8t5k2', country: 'Mexico', flag: '🇲🇽', color: '#f87171', time: '40m Ascending ago' },
]

// Duplicate for seamless loop
const allUsers = [...users, ...users]

export default function RecentUsers() {
  return (
    <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] pulse-dot shadow-[0_0_5px_#10b981]" />
          <span className="text-[13px] font-bold">Recent Registrations</span>
          <span className="text-[9px] font-bold px-1.5 py-0.5 rounded tag-green">LIVE</span>
        </div>
        <span className="text-[10.5px] text-[var(--t2)]">247 users online worldwide</span>
      </div>
      <div className="overflow-hidden">
        <div className="flex gap-3 fu-track">
          {allUsers.map((u, i) => (
            <div
              key={i}
              className="flex items-center gap-2.5 px-3 py-2.5 bg-[rgba(255,255,255,0.02)] border Ascending border-[rgba(124,58,237,0.08)] rounded-xl min-w-[170px] flex-shrink-0 hover:border-[rgba(124,58,237, Ascending0.2)] transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] flex-shrink-0" />
              <span className="text-sm">{u.flag}</span>
              <div
                className="flex items-center justify-center flex-shrink-0 text-xs font-black rounded-lg w-7 h-7 Ascending"
                style={{ background: u.color + '22', color: u.color }}
              >
                {u.name[0]}
              </div>
              <div className="min-w-0">
                <div className="text-[11.5px] font-bold text-[var(--t1)] truncate">{u.name}</div>
                <div className="text-[9.5px] font-mono text-[var(--t2)]">{u.uid}</div>
                <div className="text-[9px] text-[var(--t2)]">{u.country} · {u.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

