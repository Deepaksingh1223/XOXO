 "use client";

export default function Reports() {
  return (
    <>
      <div className="ws">
        <div className="ws-av">A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700 }}>Good morning, arbion123 ☀️</div>
          <div style={{ fontSize: "10px", color: "var(--t2)" }}>Reports & Analytics</div>
        </div>
        <div className="ws-pills">
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--t2)" }}></div>
            <span style={{ color: "var(--t2)" }}>Updated</span>
            <span style={{ color: "var(--t2)" }}>Today</span>
          </div>
        </div>
      </div>

      <div id="p-reports" className="page">
        <div className="g21">
          <div className="scard scc">
            <div className="st">Performance Summary</div>
            <div className="g3" style={{ marginTop: "16px" }}>
              <div className="scard scc">
                <div className="sg-l">Total PnL</div>
                <div className="sg-v" style={{ color: "var(--t2)" }}>$8,241</div>
              </div>
              <div className="scard scc">
                <div className="sg-l">Win Rate</div>
                <div className="sg-v">91.7%</div>
              </div>
              <div className="scard scc">
                <div className="sg-l">Sharpe Ratio</div>
                <div className="sg-v" style={{ color: "var(--c)" }}>4.82</div>
              </div>
            </div>
          </div>

          <div className="scard scc">
            <div className="st">Export Reports</div>
            <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
              <button className="btn btn-p" style={{ padding: "10px" }}>📊 Download CSV (All Trades)</button>
              <button className="btn btn-g2" style={{ padding: "10px" }}>📈 PnL Report (90d)</button>
              <button className="btn btn-c2" style={{ padding: "10px" }}>💰 Tax Report</button>
            </div>
          </div>
        </div>

        <div className="scard scc">
          <div className="sh">
            <div className="st">Recent Activity Log</div>
          </div>
          <div className="tw">
            <table className="tbl">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Event</th>
                  <th>Details</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Today 14:32</td>
                  <td>Trade Executed</td>
                  <td>SOL/USDC +$342</td>
                  <td><span className="tag tg">Success</span></td>
                </tr>
                <tr>
                  <td>Today 13:45</td>
                  <td>Opportunity Missed</td>
                  <td>Gas too high</td>
                  <td><span className="tag tr">Skipped</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
