"use client";

import { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto'; 

export default function ArbionEngine() {
  const scanChartRef = useRef(null);
  const chartInstances = useRef([]);
  const [botChecked, setBotChecked] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState('MEV Sandwich');
  const [slippage, setSlippage] = useState(0.5);
  const [minProfit, setMinProfit] = useState(5);
  const [maxGas, setMaxGas] = useState(50);

  useEffect(() => {
    // Cleanup previous charts
    chartInstances.current.forEach(chart => chart.destroy());
    chartInstances.current = [];

    // Scanner Chart
    if (scanChartRef.current) {
      const chart = new Chart(scanChartRef.current, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => `${i}s`),
          datasets: [{
            data: Array.from({ length: 30 }, () => Math.floor(40 + Math.random() * 60)),
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
            tension: 0.4,
            fill: true,
            pointRadius: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false }
          },
          scales: {
            x: { display: false },
            y: { display: false }
          }
        }
      });
      chartInstances.current.push(chart);
    }

    return () => {
      chartInstances.current.forEach(chart => chart.destroy());
      chartInstances.current = [];
    };
  }, []);

  const toggleBot = (event) => {
    const isChecked = event.target.checked;
    setBotChecked(isChecked);
    const wsBotPill = document.getElementById('wsBotPill');
    if (wsBotPill) {
      wsBotPill.textContent = isChecked ? 'ACTIVE' : 'PAUSED';
      wsBotPill.style.color = isChecked ? 'var(--t2)' : 'var(--r)';
    }
  };

  const pickStrategy = (strategyName) => {
    setSelectedStrategy(strategyName);
    const allStrategies = document.querySelectorAll('.sc');
    allStrategies.forEach((strategy, index) => {
      if (strategy.querySelector('.sc-n')?.textContent === strategyName) {
        strategy.classList.add('sel');
      } else {
        strategy.classList.remove('sel');
      }
    });
  };

  const handleSlippageChange = (e) => {
    const value = parseFloat(e.target.value);
    setSlippage(value);
  };

  const applySettings = () => {
    alert(`Settings applied:\nMax slippage: ${slippage}%\nMin profit: $${minProfit}\nMax gas: ${maxGas} gwei\nStrategy: ${selectedStrategy}`);
  };

  // Initialize live TX stream
  useEffect(() => {
    const txEl = document.getElementById('txEl');
    if (txEl) {
      const transactions = [
        { hash: '0x7a3f...b291', profit: '+$342.50', chain: 'SOL', age: '2s ago' },
        { hash: '0x2e8c...d174', profit: '+$218.30', chain: 'ETH', age: '12s ago' },
        { hash: '0x9b4d...f823', profit: '+$156.20', chain: 'BSC', age: '23s ago' },
        { hash: '0xd5e2...a712', profit: '+$89.40', chain: 'SOL', age: '31s ago' },
        { hash: '0x1c8f...e945', profit: '+$67.80', chain: 'ETH', age: '44s ago' }
      ];

      txEl.innerHTML = transactions.map(tx => `
        <div class="tx-item">
          <div><span class="tag ${tx.chain.toLowerCase()}">${tx.chain}</span>
          <span class="ml">${tx.hash}</span>
          </div>
          <div class="ml">${tx.profit}</div>
          <div class="ml">${tx.age}</div>
        </div>
      `).join('');
    }

    // Simulate real-time updates
    const interval = setInterval(() => {
      const opmElement = document.getElementById('opm');
      const excElement = document.getElementById('exc');
      if (opmElement) {
        const newOpm = Math.floor(140 + Math.random() * 20);
        opmElement.textContent = newOpm;
      }
      if (excElement) {
        const currentExc = parseInt(excElement.textContent) || 1847;
        excElement.textContent = currentExc + Math.floor(Math.random() * 5);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
            <div className="ws-dot ws-dot-neutral"></div>
            <span className="ws-pill-label">Today</span>
            <span className="ws-pill-pnl" id="wsPnl">+$341.20</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot ws-dot-accent"></div>
            <span className="ws-pill-label">Uptime</span>
            <span className="ws-pill-uptime" id="wsUp">14h 32m</span>
          </div>
        </div>
      </div>

      <div className="page" id="p-engine">
        <div className="grid-two-col">
          <div className="left-col">
            <div className="scard main-card">
              <div className="card-header">
                <div className="card-title-section">
                  <div className="card-title">
                    XOXO Engine
                  </div>
                  <div className="card-subtitle">
                    AI MEV + cross-chain arb · 24/7 autonomous — click TX to view on explorer
                  </div>
                </div>
                <label className="toggle">
                  <input
                    type="checkbox"
                    id="botChk"
                    checked={botChecked}
                    onChange={toggleBot}
                  />
                  <div className="toggle-track"></div>
                  <div className="toggle-thumb"></div>
                </label>
              </div>
              <div className="stats-grid">
                <div className="scard stat-card">
                  <div className="stat-label">Opps/min</div>
                  <div className="stat-value stat-value-primary" id="opm">142</div>
                </div>
                <div className="scard stat-card">
                  <div className="stat-label">Avg Spread</div>
                  <div className="stat-value stat-value-secondary">0.38%</div>
                </div>
                <div className="scard stat-card">
                  <div className="stat-label">Execs today</div>
                  <div className="stat-value stat-value-tertiary" id="exc">1,847</div>
                </div>
              </div>
              <div className="section-header">
                <div className="section-title">Live TX Stream</div>
                <span className="tag tag-live">● LIVE</span>
              </div>
              <div className="transactions-list" id="txEl"></div>
            </div>
            <div className="scard scanner-card">
              <div className="section-header">
                <div className="section-title">Scanner Activity</div>
                <span className="tag tag-real">Real-time</span>
              </div>
              <div className="scanner-container">
                <div className="scanner-line"></div>
                <div className="chart-wrapper">
                  <canvas ref={scanChartRef} role="img" aria-label="Scanner">
                    Scanner detecting opportunities.
                  </canvas>
                </div>
              </div>
            </div>
          </div>
          <div className="right-col">
            <div className="scard strategy-card">
              <div className="section-title">Strategy Mode</div>
              <div className="strategies-list">
                <div
                  className={`strategy-item ${selectedStrategy === 'MEV Sandwich' ? 'selected' : ''}`}
                  onClick={() => pickStrategy('MEV Sandwich')}
                >
                  <div className="strategy-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="strategy-name">MEV Sandwich</div>
                  <div className="strategy-desc">Front-run pending large txs</div>
                  <div className="strategy-apy">~340% APY</div>
                </div>
                <div
                  className={`strategy-item ${selectedStrategy === 'Cross-DEX Arb' ? 'selected' : ''}`}
                  onClick={() => pickStrategy('Cross-DEX Arb')}
                >
                  <div className="strategy-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="strategy-name">Cross-DEX Arb</div>
                  <div className="strategy-desc">Jupiter, Orca, Uniswap, Curve</div>
                  <div className="strategy-apy">~180% APY</div>
                </div>
                <div
                  className={`strategy-item ${selectedStrategy === 'Flash Loan Arb' ? 'selected' : ''}`}
                  onClick={() => pickStrategy('Flash Loan Arb')}
                >
                  <div className="strategy-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="strategy-name">Flash Loan Arb</div>
                  <div className="strategy-desc">Aave/dYdX zero-capital flash</div>
                  <div className="strategy-apy">~260% APY</div>
                </div>
                <div
                  className={`strategy-item ${selectedStrategy === 'Triangular Arb' ? 'selected' : ''}`}
                  onClick={() => pickStrategy('Triangular Arb')}
                >
                  <div className="strategy-check">
                    <svg width="8" height="8" viewBox="0 0 8 8">
                      <polyline points="1.5,4 3,5.5 6.5,2" stroke="#fff" strokeWidth="1.5" fill="none" />
                    </svg>
                  </div>
                  <div className="strategy-name">Triangular Arb</div>
                  <div className="strategy-desc">A → B → C → A profit loops</div>
                  <div className="strategy-apy">~120% APY</div>
                </div>
              </div>
            </div>
            <div className="scard params-card">
              <div className="section-title">Parameters</div>
              <div className="form-group">
                <label className="form-label">Max slippage</label>
                <input
                  type="range"
                  min="0.1"
                  max="3"
                  step="0.1"
                  value={slippage}
                  onChange={handleSlippageChange}
                  className="slider-input"
                />
                <div className="slider-value" id="slO">
                  {slippage}%
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Min profit (USD)</label>
                <input
                  className="form-input"
                  type="number"
                  value={minProfit}
                  onChange={(e) => setMinProfit(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Max gas (gwei)</label>
                <input
                  className="form-input"
                  type="number"
                  value={maxGas}
                  onChange={(e) => setMaxGas(parseInt(e.target.value) || 0)}
                />
              </div>
              <button className="btn btn-primary" onClick={applySettings}>
                Apply &amp; Restart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}