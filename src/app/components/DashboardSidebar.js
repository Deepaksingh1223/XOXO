"use client";

import { useState, useEffect } from "react";
import { CiMenuFries } from "react-icons/ci";

export default function DashboardHeader({ theme, toggleTheme }) {

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showBotPopup, setShowBotPopup] = useState(false);
  const [showRefPopup, setShowRefPopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  // Close popups when Escape key is pressed
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setShowBotPopup(false);
        setShowRefPopup(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleSidebar = () => {
    const sidebar = document.querySelector(".sidebar");

    if (!sidebar) return;

    if (sidebarOpen) {
      sidebar.style.width = "300px";
      sidebar.style.overflow = "hidden";
    } else {
      sidebar.style.width = "0px";
      sidebar.style.overflow = "hidden";
    }

    setSidebarOpen(!sidebarOpen);
  };

  const closeBot = () => setShowBotPopup(false);
  const closeRef = () => setShowRefPopup(false);

  const activateBot = () => {
    console.log("Bot activated");
    // Add your bot activation logic here
    setShowBotPopup(false);
  };

  const copyRef = async () => {
    const refLink = "https://arbion.ai/ref/ARB-a9x7k2-premium";
    try {
      await navigator.clipboard.writeText(refLink);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const shareOn = (platform) => {
    const refLink = "https://arbion.ai/ref/ARB-a9x7k2-premium";
    const text = "Join me on XOXO AI Engine - earn up to 8% commission!";
    
    let url = "";
    switch(platform) {
      case "WhatsApp":
        url = `https://wa.me/?text=${encodeURIComponent(text + " " + refLink)}`;
        break;
      case "Facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(refLink)}`;
        break;
      case "Instagram":
        navigator.clipboard.writeText(`${text} ${refLink}`);
        alert("Link copied! Share it on Instagram.");
        return;
      case "Telegram":
        url = `https://t.me/share/url?url=${encodeURIComponent(refLink)}&text=${encodeURIComponent(text)}`;
        break;
    }
    if (url) window.open(url, "_blank");
  };

  return (
    <>
      <header className="topbar">
        <div className="tb-l">
          <div className="pgtitle">
            Dashboard
            <span
              style={{
                fontSize: "11px",
                color: "var(--t2)",
                fontWeight: 400
              }}
            >
              / Overview
            </span>
          </div>
        </div>

        <div className="tb-r">
          <div className="schip" onClick={() => setShowBotPopup(true)} style={{ cursor: "pointer" }}>
            <span className="dot dc"></span>
            BOT ACTIVE
          </div>

          <div className="schip" onClick={() => setShowRefPopup(true)} style={{ cursor: "pointer" }}>
            <span className="dot dg"></span>
            INVITE & EARN
          </div>

          <div className="schip">
            <span className="dot dy"></span>
            34 gwei
          </div>

          <div className="pchip">
            ▲ +$<span id="tp">341.21</span> today
          </div>

          <button
            onClick={toggleTheme}
            className={`theme-btn nbtn ${theme === "dark" ? "active" : ""}`}
            style={{ fontSize: "18px" }}
          >
            🌙
          </button>

          <button className="bdep">+ Deposit</button>
          <div className="btn-mb-show">
            <div className="nbtn" onClick={toggleSidebar}>
              <CiMenuFries />
            </div>
          </div>
        </div>
      </header>

      {/* Bot Popup */}
      {showBotPopup && (
        <div className="overlay" id="botOv" onClick={(e) => e.target === e.currentTarget && closeBot()}>
          <div className="popup" style={{ maxWidth: "480px" }}>
            <div className="popup-bar"></div>
            <div className="popup-x" onClick={closeBot}>✕</div>
            <div className="popup-body">
              <div className="bp-hero">
                <div className="bp-img">
                  <div className="bp-ring"></div>
                  <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                    <rect x="10" y="18" width="44" height="34" rx="9" stroke="#a78bfa" strokeWidth="1.5"></rect>
                    <rect x="10" y="18" width="44" height="12" rx="9" fill="rgba(124,58,237,0.15)"></rect>
                    <rect x="19" y="28" width="8" height="8" rx="3" fill="#06b6d4" opacity=".9"></rect>
                    <rect x="37" y="28" width="8" height="8" rx="3" fill="#7c3aed" opacity=".9"></rect>
                    <circle cx="23" cy="32" r="2" fill="#fff" opacity=".7"></circle>
                    <circle cx="41" cy="32" r="2" fill="#fff" opacity=".7"></circle>
                    <path d="M22 42h20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"></path>
                    <path d="M26 18V13M38 18V13" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"></path>
                    <circle cx="26" cy="11" r="3" fill="#7c3aed"></circle>
                    <circle cx="38" cy="11" r="3" fill="#7c3aed"></circle>
                    <path d="M10 32H5M59 32H54" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"></path>
                    <circle cx="4" cy="32" r="2.5" fill="#06b6d4"></circle>
                    <circle cx="60" cy="32" r="2.5" fill="#06b6d4"></circle>
                    <circle cx="26" cy="11" r="1.5" fill="#c4b5fd" opacity=".8">
                      <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" repeatCount="indefinite"></animate>
                    </circle>
                    <circle cx="38" cy="11" r="1.5" fill="#22d3ee" opacity=".8">
                      <animate attributeName="opacity" values="1;0.4;1" dur="1.8s" repeatCount="indefinite"></animate>
                    </circle>
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <div style={{ fontSize: "19px", fontWeight: 900, letterSpacing: "-.3px" }}>
                      XOXO <span style={{ color: "#a78bfa" }}>AI Engine</span>
                    </div>
                    <span className="tag tg">v3.4</span>
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.7, marginBottom: "8px" }}>
                    World's fastest MEV arbitrage bot — autonomously detects and executes profitable trades across Solana, Ethereum &amp; BSC. Zero manual effort. Maximum yield.
                  </div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <span className="tag tp">MEV Sandwich</span>
                    <span className="tag tc">Cross-DEX</span>
                    <span className="tag tg">Flash Loan</span>
                    <span className="tag ta">Triangular</span>
                  </div>
                </div>
              </div>
              <div className="bp-stats">
                <div className="bps">
                  <div className="bps-v" style={{ color: "var(--g)" }}>91.7%</div>
                  <div className="bps-l">Win Rate</div>
                </div>
                <div className="bps">
                  <div className="bps-v" style={{ color: "var(--pb)" }}>~340%</div>
                  <div className="bps-l">Annual APY</div>
                </div>
                <div className="bps">
                  <div className="bps-v" style={{ color: "var(--c)" }}>4.2s</div>
                  <div className="bps-l">Avg Hold</div>
                </div>
              </div>
              <div className="bp-feats">
                <div className="bp-feat"><div className="bp-dot"></div>Automated MEV sandwich &amp; front-running detection in real-time</div>
                <div className="bp-feat"><div className="bp-dot"></div>Cross-DEX price gap exploitation — Jupiter, Orca, Uniswap, Curve</div>
                <div className="bp-feat"><div className="bp-dot"></div>Flash loan zero-capital arbitrage via Aave &amp; dYdX protocols</div>
                <div className="bp-feat"><div className="bp-dot"></div>Smart gas engine — never overpays, maximizes net profit</div>
                <div className="bp-feat"><div className="bp-dot"></div>Live TXID stream linked to Solscan / Etherscan / BscScan</div>
              </div>
              <button className="btn btn-p" style={{ width: "100%", padding: "13px", fontSize: "14px" }} onClick={activateBot}>
                ⚡ Activate Bot — Start Earning Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Referral Popup */}
      {showRefPopup && (
        <div className="overlay show" id="refOv" onClick={(e) => e.target === e.currentTarget && closeRef()}>
          <div className="popup" style={{ maxWidth: "430px" }}>
            <div className="popup-bar"></div>
            <div className="popup-x" onClick={closeRef}>✕</div>
            <div className="popup-body">
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <div style={{ fontSize: "21px", fontWeight: 900, letterSpacing: "-.4px", marginBottom: "4px" }}>
                  Invite &amp; <span style={{ color: "#a78bfa" }}>Earn</span>
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6 }}>
                  Share your link · Earn up to <strong style={{ color: "#fbbf24" }}>8% commission</strong> on every trade — 3 levels deep, paid daily
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "7px", marginBottom: "14px" }}>
                <div className="bps">
                  <div className="bps-v" style={{ color: "var(--c)" }}>12</div>
                  <div className="bps-l">Referrals</div>
                </div>
                <div className="bps">
                  <div className="bps-v" style={{ color: "var(--g)" }}>$841</div>
                  <div className="bps-l">Earned</div>
                </div>
                <div className="bps">
                  <div className="bps-v" style={{ color: "var(--pb)" }}>$92k</div>
                  <div className="bps-l">Team Vol</div>
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: "6px" }}>
                Your Unique Referral Link
              </div>
              <div className="ref-link">https://arbion.ai/ref/ARB-a9x7k2-premium</div>
              <button className="copy-btn" id="copyRefBtn" onClick={copyRef}>
                {copySuccess ? "✓ Copied!" : "📋 Copy Referral Link"}
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px", marginBottom: "14px" }}>
                <div style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", borderRadius: "var(--r8)", padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--g)" }}>8%</div>
                  <div style={{ fontSize: "9px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase" }}>Level 1</div>
                </div>
                <div style={{ background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.2)", borderRadius: "var(--r8)", padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--c)" }}>5%</div>
                  <div style={{ fontSize: "9px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase" }}>Level 2</div>
                </div>
                <div style={{ background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", borderRadius: "var(--r8)", padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--pb)" }}>3%</div>
                  <div style={{ fontSize: "9px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase" }}>Level 3</div>
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: "8px" }}>
                Share on Social Media
              </div>
              <div className="soc-grid">
                <button className="soc-btn soc-wa" onClick={() => shareOn("WhatsApp")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.898-1.425A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2"></path>
                  </svg>
                  WhatsApp
                </button>
                <button className="soc-btn soc-fb" onClick={() => shareOn("Facebook")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
                  </svg>
                  Facebook
                </button>
                <button className="soc-btn soc-ig" onClick={() => shareOn("Instagram")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"></path>
                  </svg>
                  Instagram
                </button>
                <button className="soc-btn soc-tg" onClick={() => shareOn("Telegram")}>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.481c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.875.74z"></path>
                  </svg>
                  Telegram
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}