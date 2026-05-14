"use client";

import { useState } from 'react';

export default function Profile() {
  const [displayName, setDisplayName] = useState('arbion123');
  const [email, setEmail] = useState('trader@arbion.ai');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('United States');
  const [twoFA, setTwoFA] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [autoCompound, setAutoCompound] = useState(false);
  const [riskAlerts, setRiskAlerts] = useState(true);
  const [withdrawal2FA, setWithdrawal2FA] = useState(true);

  const showToast = (title, message) => {
    console.log(`${title}: ${message}`);
    alert(`${title}\n${message}`);
  };

  const saveChanges = () => {
    showToast('Saved!', 'Profile updated successfully');
  };

  const copyAffiliateCode = () => {
    const code = 'ARB-a9x7k2';
    navigator.clipboard.writeText(code);
    showToast('Copied!', 'Affiliate code copied');
  };

  const revealApiKey = () => {
    showToast('Revealed', 'API key shown — keep it safe');
    alert('Your API Key: arb_live_a9x7k2m3n4p5q6r7s8t9');
  };

  const signOut = (e) => {
    e.preventDefault();
    showToast('Signed Out', 'You have been signed out successfully');
    // Add actual sign out logic here
    // router.push('/login');
  };

  return (
    <>
      <div className="ws">
        <div className="ws-av">A</div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: "12.5px", fontWeight: 700 }} id="greetEl">
            Good morning, arbion123 ☀️
          </div>
          <div style={{ fontSize: "10px", color: "var(--t2)" }}>
            Last login: Today 09:14 AM · 0x8b5…cf6A · IP 192.168.x.x
          </div>
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
            <span style={{ color: "var(--pb)" }} id="wsPnl">+$341.20</span>
          </div>
          <div className="ws-pill">
            <div className="ws-dot" style={{ background: "var(--a)" }}></div>
            <span style={{ color: "var(--t2)" }}>Uptime</span>
            <span style={{ color: "var(--a)" }} id="wsUp">14h 32m</span>
          </div>
        </div>
      </div>

      <div id="p-profile" className="page">
        <div className="g21">
          <div>
            <div className="scard scc" style={{ marginBottom: "12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "18px" }}>
                <div className="pf-av">A</div>
                <div>
                  <div style={{ fontSize: "18px", fontWeight: 900, letterSpacing: "-.3px", marginBottom: "3px" }}>
                    arbion123
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--t2)", marginBottom: "8px" }}>
                    trader@arbion.ai · 0x8b5…cf6A
                  </div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <span className="tag tp">PRO</span>
                    <span className="tag tg">Verified</span>
                    <span className="tag ta">Gold</span>
                  </div>
                </div>
              </div>
              <hr />
              <div className="g2" style={{ gap: "10px", marginBottom: "12px" }}>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Display Name</label>
                  <input 
                    className="fi" 
                    type="text" 
                    value={displayName} 
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Email</label>
                  <input 
                    className="fi" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Phone</label>
                  <input 
                    className="fi" 
                    type="tel" 
                    placeholder="+1 555 0000" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div className="fg" style={{ margin: 0 }}>
                  <label className="fl">Country</label>
                  <select 
                    className="fi" 
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    <option>United States</option>
                    <option>Germany</option>
                    <option>India</option>
                    <option>Singapore</option>
                  </select>
                </div>
              </div>
              <button className="btn btn-p" style={{ padding: "9px 24px" }} onClick={saveChanges}>
                Save Changes
              </button>
            </div>
            
            <div className="scard scc">
              <div className="st" style={{ marginBottom: "12px" }}>Account Stats</div>
              <div className="g2" style={{ gap: "8px" }}>
                <div classname="scard scc">
                  <div className="ml">Member Since</div>
                  <div>Jan 2024</div>
                </div>
                <div >
                  <div className="ml">Total Deposited</div>
                  <div>$42,000</div>
                </div>
                <div classname="scard scc">
                  <div className="ml">Total Withdrawn</div>
                  <div>$14,200</div>
                </div>
                <div classname="scard scc">
                  <div className="ml">Referrals</div>
                  <div>12 direct</div>
                </div>
              </div>
            </div>
          </div>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div className="scard scc">
              <div className="st" style={{ marginBottom: "13px" }}>Security &amp; Settings</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "13px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600 }}>Two-Factor Auth</div>
                    <div style={{ fontSize: "10.5px", color: "var(--t2)" }}>Google Authenticator</div>
                  </div>
                  <label className="tog">
                    <input 
                      type="checkbox" 
                      checked={twoFA} 
                      onChange={(e) => setTwoFA(e.target.checked)}
                    />
                    <div className="tog-tr"></div>
                    <div className="tog-th"></div>
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600 }}>Email Notifications</div>
                    <div style={{ fontSize: "10.5px", color: "var(--t2)" }}>Trades, profits, alerts</div>
                  </div>
                  <label className="tog">
                    <input 
                      type="checkbox" 
                      checked={emailNotifications} 
                      onChange={(e) => setEmailNotifications(e.target.checked)}
                    />
                    <div className="tog-tr"></div>
                    <div className="tog-th"></div>
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600 }}>Auto-Compound</div>
                    <div style={{ fontSize: "10.5px", color: "var(--t2)" }}>Reinvest profits daily</div>
                  </div>
                  <label className="tog">
                    <input 
                      type="checkbox" 
                      checked={autoCompound} 
                      onChange={(e) => setAutoCompound(e.target.checked)}
                    />
                    <div className="tog-tr"></div>
                    <div className="tog-th"></div>
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600 }}>Risk Alerts</div>
                    <div style={{ fontSize: "10.5px", color: "var(--t2)" }}>High drawdown warnings</div>
                  </div>
                  <label className="tog">
                    <input 
                      type="checkbox" 
                      checked={riskAlerts} 
                      onChange={(e) => setRiskAlerts(e.target.checked)}
                    />
                    <div className="tog-tr"></div>
                    <div className="tog-th"></div>
                  </label>
                </div>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: 600 }}>Withdrawal 2FA</div>
                    <div style={{ fontSize: "10.5px", color: "var(--t2)" }}>Require 2FA for withdrawals</div>
                  </div>
                  <label className="tog">
                    <input 
                      type="checkbox" 
                      checked={withdrawal2FA} 
                      onChange={(e) => setWithdrawal2FA(e.target.checked)}
                    />
                    <div className="tog-tr"></div>
                    <div className="tog-th"></div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="scard scc">
              <div className="st" style={{ marginBottom: "10px" }}>Affiliate Code</div>
              <div className="ref-link" style={{ marginBottom: "8px" }}>ARB-a9x7k2</div>
              <button className="btn btn-g2" style={{ width: "100%", padding: "8px", fontSize: "12px" }} onClick={copyAffiliateCode}>
                📋 Copy Code
              </button>
            </div>
            
            <div className="scard scc">
              <div className="st" style={{ marginBottom: "10px" }}>API Access</div>
              <div className="ref-link" style={{ marginBottom: "8px" }}>arb_live_••••••••••••••••</div>
              <button className="btn btn-g2" style={{ width: "100%", padding: "8px", fontSize: "12px" }} onClick={revealApiKey}>
                Reveal Key
              </button>
            </div>
            
            <button 
              className="btn btn-danger" 
              style={{ width: "100%", padding: "10px", textDecoration: "none" }} 
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}