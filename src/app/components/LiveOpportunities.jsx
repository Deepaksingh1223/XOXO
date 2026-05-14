'use client'
import { useEffect, useState } from 'react'

const chains = ['SOL', 'ETH', 'BSC']
const pairs = ['SOL/USDC', 'ETH/USDT', 'BNB/BUSD', 'MATIC/USDC', 'BTC/USDT', 'AVAX/USDC', 'LINK/USDT']
const routes = ['Balancer→Uniswap v3', 'Jupiter→PancakeSwap', 'Orca→Curve', 'SushiSwap→Raydium']

function randOpp() {
  const spread = (Math.random() * 0.8 + 0.3).toFixed(2)
  const profit = (Math.random() * 50 + 10).toFixed(2)
  return { chain: chains[Math.floor(Math.random() * chains.length)], pair: pairs[Math.floor(Math.random() * pairs.length)], route: routes[Math.floor(Math.random() * routes.length)], spread: `+${spread}%`, profit: `$${profit}` }
}

const chainCls = { SOL: 'tag-sol', ETH: 'tag-eth', BSC: 'tag-bsc' }

export default function LiveOpportunities() {
  const [opps, setOpps] = useState(() => Array.from({ length: 10 }, randOpp))

  useEffect(() => {
    const t = setInterval(() => {
      setOpps(prev => [randOpp(), ...prev.slice(0, 9)])
    }, 2200)
    return () => clearInterval(t)
  }, [])

  return (
    <div className="space-y-1.5">
      {opps.map((o, i) => (
        <div key={i} className="flex items-center gap-2 px-3 py-2 bg-[rgba(255,255,255,0.02)] rounded-lg border border-[rgba(255,255,255,0.04)] hover:bg-[rgba(124,58,237,0.05)] transition-colors">
          <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${chainCls[o.chain]}`}>{o.chain}</span>
          <span className="text-[12px] font-bold text-[var(--t1)]">{o.pair}</span>
          <span className="text-[10px] text-[var(--t2)] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">{o.route}</span>
          <span className="text-[11.5px] font-bold text-[#f59e0b]">{o.spread}</span>
          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded tag-green">{o.profit}</span>
        </div>
      ))}
    </div>
  )
}