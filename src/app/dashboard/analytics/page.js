"use client";

import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export default function ArbionEngine() {
  const pnlChartRef = useRef(null);
  const dailyChartRef = useRef(null);
  const chainChartRef = useRef(null);
  const chartInstances = useRef([]);

  useEffect(() => {
    // Cleanup previous charts
    chartInstances.current.forEach(chart => chart.destroy());
    chartInstances.current = [];

    // PnL Curve Chart
    if (pnlChartRef.current) {
      const chart = new Chart(pnlChartRef.current, {
        type: 'line',
        data: {
          labels: Array.from({ length: 90 }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            label: 'PnL',
            data: Array.from({ length: 90 }, (_, i) => i * 91.57),
            borderColor: '#10b981',
            backgroundColor: 'rgba(16, 185, 129, 0.1)',
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
      chartInstances.current.push(chart);
    }

    // Daily Profits Chart
    if (dailyChartRef.current) {
      const chart = new Chart(dailyChartRef.current, {
        type: 'bar',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            label: 'Daily Profit',
            data: Array.from({ length: 30 }, () => Math.floor(60 + Math.random() * 280)),
            backgroundColor: 'rgba(139, 92, 246, 0.7)',
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
      chartInstances.current.push(chart);
    }

    // Chain Donut Chart
    if (chainChartRef.current) {
      const chart = new Chart(chainChartRef.current, {
        type: 'doughnut',
        data: {
          labels: ['Solana', 'Ethereum', 'BSC'],
          datasets: [{
            data: [52, 31, 17],
            backgroundColor: ['#9945ff', '#627eea', '#f3ba2f'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: { color: 'var(--t2)', font: { size: 11 } }
            }
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

  const showToast = (title, message) => {
    console.log(`${title}: ${message}`);
    alert(`${title}: ${message}`);
  };

  return (
    <>
      <div className="ws">
        <div className="ws-av">A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700 }} id="greetEl">Good afternoon arbion123 🌤️</div>
          <div style={{ fontSize: "10px", color: "var(--t2)" }}>Last login: Today 09:14 AM · 0x8b5…cf6A · IP 192.168.x.x</div>
        </div>
        <div className="ws-pills">
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--t2)", boxShadow: "0 0 4px var(--t2)" }}></div>
            <span style={{ color: "var(--t2)" }}>Bot</span>
            <span style={{ color: "var(--t2)" }} id="wsBotPill">ACTIVE</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--pb)" }}></div>
            <span style={{ color: "var(--t2)" }}>Today</span>
            <span style={{ color: "var(--pb)" }} id="wsPnl">+$341.36</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--a)" }}></div>
            <span style={{ color: "var(--t2)" }}>Uptime</span>
            <span style={{ color: "var(--a)" }} id="wsUp">14h 34m</span>
          </div>
        </div>
      </div>

      <div id="p-analytics" className="page">
        <div className="g4">
          <div className="scard scc">
            <div className="ml">Total Profit</div>
            <div className="mv" style={{ color: "var(--t2)" }}>$8,241</div>
            <div className="mc up">▲ +18.3%</div>
          </div>
          <div className="scard scc">
            <div className="ml">Realized PnL</div>
            <div className="mv">$6,847</div>
            <div className="mc up">▲ +$341</div>
          </div>
          <div className="scard scc">
            <div className="ml">Total Trades</div>
            <div className="mv">12,847</div>
            <div style={{ fontSize: "10px", color: "var(--t2)", marginTop: "6px", fontFamily: "var(--mono)" }}>
              1190W · 107L
            </div>
          </div>
          <div className="scard scc">
            <div className="ml">Avg Profit</div>
            <div className="mv" style={{ color: "var(--a)" }}>$0.64</div>
            <div className="mc up">▲ +$0.08</div>
          </div>
        </div>

        <div className="g2">
          <div className="scard scc">
            <div className="sh">
              <div className="st">PnL Curve · 90d</div>
              <span className="tag tg">+$8,241</span>
            </div>
            <div className="cw" style={{ height: "210px" }}>
              <canvas ref={pnlChartRef} role="img" aria-label="90d PnL">
                Steady growth to $8,241 over 90 days.
              </canvas>
            </div>
          </div>

          <div className="scard scc">
            <div className="sh">
              <div className="st">Daily Profits · 30d</div>
            </div>
            <div className="cw" style={{ height: "210px" }}>
              <canvas ref={dailyChartRef} role="img" aria-label="Daily profits">
                Daily profits $60–$340.
              </canvas>
            </div>
          </div>
        </div>

        <div className="g21">
          <div className="scard scc">
            <div className="sh">
              <div className="st">Trade History</div>
              <span className="sa" onClick={() => showToast('Exporting…', 'Preparing CSV download')}>
                Export CSV ↓
              </span>
            </div>
            <div className="tw">
              <table className="tbl">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>TXID</th>
                    <th>Pair</th>
                    <th>Chain</th>
                    <th>Explorer</th>
                    <th>Volume</th>
                    <th>Profit</th>
                    <th>Type</th>
                  </tr>
                </thead>
                <tbody id="histTbl"></tbody>
              </table>
            </div>
          </div>

          <div className="scard scc">
            <div className="sh">
              <div className="st">By Chain</div>
            </div>
            <div className="cw" style={{ height: "140px" }}>
              <canvas ref={chainChartRef} role="img" aria-label="Chain donut">
                SOL 52%, ETH 31%, BSC 17%.
              </canvas>
            </div>
            <div style={{ marginTop: "14px" }}>
              <div className="pb-w">
                <div className="pb-h">
                  <span>Solana</span>
                  <span style={{ color: "var(--t2)", fontFamily: "var(--mono)" }}>$4,285 · 52%</span>
                </div>
                <div className="pb-t">
                  <div className="pb-f" style={{ width: "52%", background: "#9945ff" }}></div>
                </div>
              </div>
              <div className="pb-w">
                <div className="pb-h">
                  <span>Ethereum</span>
                  <span style={{ color: "var(--t2)", fontFamily: "var(--mono)" }}>$2,555 · 31%</span>
                </div>
                <div className="pb-t">
                  <div className="pb-f" style={{ width: "31%", background: "#627eea" }}></div>
                </div>
              </div>
              <div className="pb-w">
                <div className="pb-h">
                  <span>BSC</span>
                  <span style={{ color: "var(--t2)", fontFamily: "var(--mono)" }}>$1,401 · 17%</span>
                </div>
                <div className="pb-t">
                  <div className="pb-f" style={{ width: "17%", background: "#f3ba2f" }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}