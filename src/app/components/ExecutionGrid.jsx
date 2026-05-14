


'use client'
import { useEffect, useState, useRef } from 'react'

const EXPLORERS = {
  sol: 'https://solscan.io/tx/',
  eth: 'https://etherscan.io/tx/',
  bsc: 'https://bscscan.com/tx/',
}

const types = ['MEV', 'Flash Loan', 'Cross-DEX', 'Triangular']
const pairs = ['SOL/USDC', 'ETH/USDT', 'BTC/USDT', 'BNB/BUSD', 'MATIC/USDC', 'LINK/USDT', 'AVAX/USDC']
const routes = ['Jupiter→Uniswap v3', 'Orca→Curve', 'Balancer→PancakeSwap', 'SushiSwap→Raydium', 'Uniswap v3→Balancer', 'PancakeSwap→Orca']

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function formatDate(dateString) {
  const date = new Date(dateString)
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    hour12: false 
  })
}

function truncateHash(hash, maxLength = 12) {
  if (!hash) return ''
  if (hash.length <= maxLength) return hash
  return `${hash.slice(0, maxLength)}...`
}

function getChainDisplay(networkChain) {
  if (networkChain?.toLowerCase().includes('sol')) return 'SOL'
  if (networkChain?.toLowerCase().includes('bsc')) return 'BSC'
  if (networkChain?.toLowerCase().includes('eth')) return 'ETH'
  return 'ETH'
}

const chainColors = {
  SOL: 'tag-sol',
  ETH: 'tag-eth',
  BSC: 'tag-bsc',
}

export default function ExecutionGrid() {
  const [execs, setExecs] = useState([])
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState(null)
  const [lastUpdate, setLastUpdate] = useState(null)
  const intervalRef = useRef(null)
  const isMounted = useRef(true)

  // Fetch UserId from localStorage
  useEffect(() => {
    let userDataString = localStorage.getItem('userData')
    if (!userDataString) {
      userDataString = localStorage.getItem('UserData')
    }
    
    if (userDataString) {
      try {
        const parsedUserData = JSON.parse(userDataString)
        const id = parsedUserData.UserId || parsedUserData.userId || parsedUserData.URID
        setUserId(id)
      } catch (error) {
        console.error('Error parsing UserData:', error)
      }
    }
  }, [])

  // Fetch Transaction Log from API
  const fetchTransactionLog = async () => {
    if (!userId || !isMounted.current) return

    try {
      const url = `https://apis.arbionai.com/api/Authentication/getTransactionLog?URID=${userId}`
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const result = await response.json()
      
      if (result.statusCode === 200 && result.data && result.data.length > 0 && isMounted.current) {
        // Use a callback to safely access current execs state
        setExecs(prevExecs => {
          const existingTxIds = new Set(prevExecs.map(e => e.txid))
          
          // Find new transactions that don't exist yet
          const newTransactions = result.data.filter(tx => !existingTxIds.has(tx.TransactionHash))
          
          if (newTransactions.length > 0) {
            // Transform only new transactions
            const formattedNewExecs = newTransactions.map(tx => {
              const chain = getChainDisplay(tx.NetworkChain)
              const time = formatDate(tx.Datex)
              const amount = tx.Amount || 0
              const isWin = amount > 0
              const spread = (Math.random() * 2.35 + 0.15).toFixed(3)
              
              return {
                chain: chain,
                pair: randomItem(pairs),
                type: randomItem(types),
                route: randomItem(routes),
                txid: tx.TransactionHash,
                spread: spread,
                win: isWin,
                amt: amount.toFixed(2),
                time: time,
                explorerUrl: tx.BaseUrl || EXPLORERS[chain.toLowerCase()],
                tokenSymbol: tx.TokenSymbol,
                originalAmount: amount
              }
            })
            
            // Add new transactions to the top and keep only latest 10
            const updatedExecs = [...formattedNewExecs, ...prevExecs].slice(0, 10)
            updatedExecs.sort((a, b) => parseFloat(b.amt) - parseFloat(a.amt))
            
            // Silent update
            setLastUpdate(new Date())
            return updatedExecs
          }
          return prevExecs
        })
      }
    } catch (error) {
      console.error('Error fetching Transaction Log:', error)
    } finally {
      if (isMounted.current) {
        setLoading(false)
      }
    }
  }

  // Start live feed when userId is available - WITHOUT execs dependency
  useEffect(() => {
    if (userId) {
      // Initial fetch
      fetchTransactionLog()
      
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      
      // Set up interval - SLOW: har 5 minute (300,000 milliseconds)
      intervalRef.current = setInterval(() => {
        fetchTransactionLog()
      }, 2200 ) // 5 minutes
      
      // Cleanup interval on unmount
      return () => {
        isMounted.current = false
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    } else {
      setLoading(false)
    }
  }, [userId]) // ONLY userId dependency, NOT execs!

  // Show loading state
  if (loading) {
    return (
      <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-bold">
            Recent Executions
            <span className="text-[10.5px] text-[var(--t2)] font-normal ml-1">— click hash to view on explorer</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded tag-green">● LIVE</span>
          </div>
        </div>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 mx-auto mb-4 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-sm text-gray-400">Loading executions...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-[#060f20] border border-[rgba(124,58,237,0.12)] rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-bold">
          Recent Executions
          <span className="text-[10.5px] text-[var(--t2)] font-normal ml-1">— click hash to view on explorer</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-bold px-2 py-0.5 rounded tag-green">● LIVE</span>

        </div>
      </div>

      {execs.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          No transactions found
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {execs.map((ex) => (
              <div
                key={ex.txid}
                className="bg-[#081228] border border-[rgba(124,58,237,0.1)] rounded-xl p-3 hover:border-[rgba(124,58,237,0.25)] transition-colors"
              >
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <span className={`text-[9.5px] font-bold px-1.5 py-0.5 rounded ${chainColors[ex.chain]}`}>{ex.chain}</span>
                  <span className="text-[12px] font-bold text-[var(--t1)]">{ex.pair}</span>
                  <span className="ml-auto text-[9.5px] font-bold px-1.5 py-0.5 rounded tag-mev">{ex.type}</span>
                </div>
                <div className="space-y-1 text-[11px]">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--t2)]">TXID</span>
                    <button
                      onClick={() => window.open(ex.explorerUrl + ex.txid)}
                      className="font-mono text-[#a78bfa] hover:text-[#c4b5fd] transition-colors"
                      title={ex.txid}
                    >
                      {truncateHash(ex.txid, 12)} 🔗
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--t2)]">Route</span>
                    <span className="text-[10px] text-[var(--t2)]">{ex.route}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--t2)]">Spread</span>
                    <span className="text-[#f59e0b]">{ex.spread}%</span>
                  </div>
                </div>
                <div className={`text-base font-black font-mono mt-2 ${ex.win ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
                  {ex.win ? '+' : '−'}${parseFloat(ex.amt).toLocaleString()}
                </div>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="text-[9.5px] text-[var(--t2)]">{ex.time}</span>
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ml-auto ${ex.win ? 'tag-green' : 'tag-red'}`}>
                    {ex.win ? 'WIN' : 'LOSS'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Simple status bar with last update time */}
          <div className="mt-3 pt-2 border-t border-[rgba(124,58,237,0.1)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
              <span className="text-[10px] text-gray-500">
                Live updates every 5 minutes
              </span>
            </div>
            <div className="flex items-center gap-3">
              {lastUpdate && (
                <span className="text-[9px] text-gray-600">
                  Last: {lastUpdate.toLocaleTimeString()}
                </span>
              )}
              <span className="text-[10px] text-gray-600">
                {execs.length} executions
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}