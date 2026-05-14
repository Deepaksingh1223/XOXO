"use client";

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; 

export default function Wallet() {
  const walletChartRef = useRef(null);
  const chartInstances = useRef([]);
  const [activeTab, setActiveTab] = useState('d');
  const [depositAmount, setDepositAmount] = useState('');
  const [depositCurrency, setDepositCurrency] = useState('USDT (TRC20)');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [withdrawNetwork, setWithdrawNetwork] = useState('TRC20 (USDT)');
  const [withdraw2FA, setWithdraw2FA] = useState('');
  const [swapFrom, setSwapFrom] = useState('USDT');
  const [swapTo, setSwapTo] = useState('SOL');
  const [swapAmount, setSwapAmount] = useState('');

  useEffect(() => {
    // Cleanup previous charts
    chartInstances.current.forEach(chart => chart.destroy());
    chartInstances.current = [];

    // Wallet Distribution Chart
    if (walletChartRef.current) {
      const chart = new Chart(walletChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Compound Wallet', 'Trading Wallet', 'Commission Wallet'],
          datasets: [{
            data: [57, 39, 4],
            backgroundColor: ['#00d4ff', '#a78bfa', '#10d98a'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: 'var(--t2)', font: { size: 10 } }
            }
          }
        }
      });
      chartInstances.current.push(chart);
    }

    // Initialize transaction history
    const initHistory = () => {
      const whTbl = document.getElementById('whTbl');
      if (whTbl) {
        const history = [
          { date: '2024-01-15 14:32', type: 'Deposit', amount: '+$5,000', network: 'TRC20', txid: '0x7a3f...b291', status: 'Completed' },
          { date: '2024-01-14 09:21', type: 'Withdraw', amount: '-$2,000', network: 'ERC20', txid: '0x2e8c...d174', status: 'Completed' },
          { date: '2024-01-13 22:15', type: 'Deposit', amount: '+$10,000', network: 'SOL', txid: '0x9b4d...f823', status: 'Completed' },
          { date: '2024-01-12 11:08', type: 'Compound', amount: '+$1,240', network: 'Compound', txid: '0xd5e2...a712', status: 'Completed' }
        ];
        
        whTbl.innerHTML = history.map(h => `
          <tr>
            <td>${h.date}</td>
            <td>${h.type}</td>
            <td style="color: ${h.amount.startsWith('+') ? 'var(--t2)' : 'var(--r)'}">${h.amount}</td>
            <td>${h.network}</td>
            <td class="tx-hash">${h.txid}</td>
            <td><a href="#" class="view-link" onclick="return false;">View →</a></td>
            <td><span class="tag tag-completed">${h.status}</span></td>
          </tr>
        `).join('');
      }
    };
    
    initHistory();
    
    return () => {
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];
    };
  }, []);

  const showToast = (title, message) => {
    console.log(`${title}: ${message}`);
    alert(`${title}\n${message}`);
  };

  const switchTab = (tab, buttonElement) => {
    setActiveTab(tab);
    
    // Update UI
    const tabs = document.querySelectorAll('#wTabs .tab');
    tabs.forEach(btn => btn.classList.remove('active'));
    buttonElement.classList.add('active');
    
    // Show/hide content
    const depositDiv = document.getElementById('wD');
    const withdrawDiv = document.getElementById('wW');
    const historyDiv = document.getElementById('wH');
    
    if (depositDiv) depositDiv.style.display = tab === 'd' ? 'block' : 'none';
    if (withdrawDiv) withdrawDiv.style.display = tab === 'w' ? 'block' : 'none';
    if (historyDiv) historyDiv.style.display = tab === 'h' ? 'block' : 'none';
  };

  const copyAddress = () => {
    const address = 'TXarbion8b5cf6A2D3EE7F4C9B0d1E2';
    navigator.clipboard.writeText(address);
    showToast('Copied!', 'Deposit address copied to clipboard');
  };

  const generateInvoice = () => {
    if (!depositAmount || parseFloat(depositAmount) < 50) {
      showToast('Error', 'Minimum deposit amount is $50');
      return;
    }
    showToast('Invoice Generated', `Deposit ${depositAmount} USDT to the address provided`);
  };

  const handleWithdraw = () => {
    if (!withdrawAddress) {
      showToast('Error', 'Please enter a destination address');
      return;
    }
    if (!withdrawAmount || parseFloat(withdrawAmount) < 20) {
      showToast('Error', 'Minimum withdrawal amount is $20');
      return;
    }
    if (!withdraw2FA || withdraw2FA.length !== 6) {
      showToast('Error', 'Please enter a valid 6-digit 2FA code');
      return;
    }
    showToast('Withdrawal Initiated', `Withdrawing $${withdrawAmount} to ${withdrawNetwork}`);
  };

  const handleSwap = () => {
    if (!swapAmount || parseFloat(swapAmount) <= 0) {
      showToast('Error', 'Please enter a valid amount');
      return;
    }
    showToast('Swap Initiated', `Swapping ${swapAmount} ${swapFrom} to ${swapTo}`);
  };

  return (
    <>
      <div className="ws">
        <div className="ws-av">A</div>
        <div className="ws-info">
          <div className="ws-greet" id="greetEl">
            Good morning, arbion123 ☀️
          </div>
          <div className="ws-login">
            Last login: Today 09:14 AM · 0x8b5…cf6A · IP 192.168.x.x
          </div>
        </div>
        <div className="ws-pills">
          <div className="ws-pill">
            <div className="ws-dot ws-dot-active"></div>
            <span className="ws-pill-label">Bot</span>
            <span className="ws-pill-value" id="wsBotPill">ACTIVE</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot ws-dot-purple"></div>
            <span className="ws-pill-label">Today</span>
            <span className="ws-pill-pnl-purple" id="wsPnl">+$341.20</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot ws-dot-accent"></div>
            <span className="ws-pill-label">Uptime</span>
            <span className="ws-pill-uptime" id="wsUp">14h 32m</span>
          </div>
        </div>
      </div>

      <div className="page" id="p-wallet">
        <div className="wallet-cards-grid">
          <div className="wallet-card">
            <div className="wallet-card-icon">🔷</div>
            <div className="wallet-card-name">Commission Wallet</div>
            <div className="wallet-card-balance">$2,140.00</div>
            <div className="wallet-card-footer">
              USDT · TRC20
            </div>
          </div>
          <div className="wallet-card">
            <div className="wallet-card-icon">💵</div>
            <div className="wallet-card-name">Trading Wallet</div>
            <div className="wallet-card-balance">$18,500.00</div>
            <div className="wallet-card-footer">
              USDT · ERC20
            </div>
          </div>
          <div className="wallet-card">
            <div className="wallet-card-icon">📦</div>
            <div className="wallet-card-name">Compound Wallet</div>
            <div className="wallet-card-balance">$27,192.00</div>
            <div className="wallet-card-footer">
              SOL · Compound
            </div>
          </div>
        </div>

        <div className="grid-two-col">
          <div className="scard wallet-tab-card">
            <div className="tabs" id="wTabs">
              <button className="tab active" onClick={(e) => switchTab('d', e.currentTarget)}>Deposit</button>
              <button className="tab" onClick={(e) => switchTab('w', e.currentTarget)}>Withdraw</button>
              <button className="tab" onClick={(e) => switchTab('h', e.currentTarget)}>History</button>
            </div>
            
            <div id="wD" style={{ display: activeTab === 'd' ? 'block' : 'none' }}>
              <div className="two-col-grid">
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select 
                    className="form-input" 
                    value={depositCurrency}
                    onChange={(e) => setDepositCurrency(e.target.value)}
                  >
                    <option>USDT (TRC20)</option>
                    <option>USDT (ERC20)</option>
                    <option>SOL</option>
                    <option>ETH</option>
                    <option>BNB</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (USD)</label>
                  <input 
                    className="form-input" 
                    type="number" 
                    placeholder="Min $50"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
              </div>
              <div className="deposit-address-box">
                <div className="qr-placeholder">
                  <svg width="64" height="64" viewBox="0 0 64 64">
                    <rect x="4" y="4" width="24" height="24" rx="2" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="10" y="10" width="12" height="12" fill="#111"/>
                    <rect x="36" y="4" width="24" height="24" rx="2" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="42" y="10" width="12" height="12" fill="#111"/>
                    <rect x="4" y="36" width="24" height="24" rx="2" fill="none" stroke="#111" strokeWidth="3"/>
                    <rect x="10" y="42" width="12" height="12" fill="#111"/>
                    <rect x="36" y="36" width="4" height="4" fill="#111"/>
                    <rect x="44" y="36" width="4" height="4" fill="#111"/>
                    <rect x="52" y="36" width="4" height="4" fill="#111"/>
                    <rect x="36" y="44" width="4" height="4" fill="#111"/>
                    <rect x="44" y="52" width="4" height="4" fill="#111"/>
                    <rect x="52" y="44" width="4" height="4" fill="#111"/>
                    <rect x="56" y="56" width="8" height="8" fill="#111"/>
                  </svg>
                </div>
                <div className="address-info">
                  <div className="address-label">DEPOSIT ADDRESS</div>
                  <div className="address-value">
                    TXarbion8b5cf6A2D3EE7F4C9B0d1E2
                  </div>
                  <button className="btn btn-secondary btn-small" onClick={copyAddress}>
                    Copy Address
                  </button>
                </div>
              </div>
              <div className="alert alert-info">
                Send only supported tokens. Minimum $50. Confirms in 1–3 min.
              </div>
              <button className="btn btn-primary btn-full" onClick={generateInvoice}>
                Generate Invoice
              </button>
            </div>

            <div id="wW" style={{ display: activeTab === 'w' ? 'block' : 'none' }}>
              <div className="form-group">
                <label className="form-label">Destination Address</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="0x… or Solana address"
                  value={withdrawAddress}
                  onChange={(e) => setWithdrawAddress(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Amount (USD)</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder="Min $20"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Network</label>
                <select 
                  className="form-input"
                  value={withdrawNetwork}
                  onChange={(e) => setWithdrawNetwork(e.target.value)}
                >
                  <option>TRC20 (USDT)</option>
                  <option>ERC20 (ETH/USDT)</option>
                  <option>BEP20 (BNB)</option>
                  <option>Solana (SOL)</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">2FA Code</label>
                <input 
                  className="form-input" 
                  type="text" 
                  placeholder="6-digit code"
                  value={withdraw2FA}
                  onChange={(e) => setWithdraw2FA(e.target.value)}
                />
              </div>
              <div className="alert alert-warning">
                Withdrawals via smart contract. Gas fees apply. Est. 15–60 min.
              </div>
              <button className="btn btn-primary btn-full" onClick={handleWithdraw}>
                Withdraw via Smart Contract →
              </button>
            </div>

            <div id="wH" style={{ display: activeTab === 'h' ? 'block' : 'none' }}>
              <div className="table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Network</th>
                      <th>TXID</th>
                      <th>Explorer</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody id="whTbl"></tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="right-col">
            <div className="scard portfolio-card">
              <div className="section-title">Portfolio Split</div>
              <div className="chart-container">
                <canvas ref={walletChartRef} role="img" aria-label="Wallet split">
                  Compound 57%, Trading 39%, Commission 4%.
                </canvas>
              </div>
              <div className="portfolio-stats">
                <div className="portfolio-row">
                  <span className="portfolio-label">In Bot</span>
                  <span className="portfolio-value bot-value">$31,200</span>
                </div>
                <div className="portfolio-row">
                  <span className="portfolio-label">Available</span>
                  <span className="portfolio-value available-value">$16,632</span>
                </div>
                <div className="portfolio-row">
                  <span className="portfolio-label">Gas Reserve</span>
                  <span className="portfolio-value gas-value">$248</span>
                </div>
              </div>
            </div>

            <div className="scard swap-card">
              <div className="section-title">Quick Swap</div>
              <div className="form-group">
                <label className="form-label">From</label>
                <select 
                  className="form-input"
                  value={swapFrom}
                  onChange={(e) => setSwapFrom(e.target.value)}
                >
                  <option>USDT</option>
                  <option>SOL</option>
                  <option>ETH</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">To</label>
                <select 
                  className="form-input"
                  value={swapTo}
                  onChange={(e) => setSwapTo(e.target.value)}
                >
                  <option>SOL</option>
                  <option>ETH</option>
                  <option>USDT</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input 
                  className="form-input" 
                  type="number" 
                  placeholder="0.00"
                  value={swapAmount}
                  onChange={(e) => setSwapAmount(e.target.value)}
                />
              </div>
              <button className="btn btn-primary btn-full" onClick={handleSwap}>
                Swap →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}