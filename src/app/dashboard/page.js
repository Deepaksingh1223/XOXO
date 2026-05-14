"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js/auto';

export default function DashboardPage() {
  const chartEarnRef = useRef(null);
  const chartPieRef = useRef(null);
  const chartPortRef = useRef(null);
  const oppLRef = useRef(null);
  const heatmapRef = useRef(null);
  const execGridRef = useRef(null);
  const fuTrackRef = useRef(null);
  const timerNumRef = useRef(null);
  const slidesWrapRef = useRef(null);
  const dotsRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 4;

  // Popup States
  const [showBotPopup, setShowBotPopup] = useState(false);
  const [showRefPopup, setShowRefPopup] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isBotActive, setIsBotActive] = useState(false);
  const [showAnnouncement, setShowAnnouncement] = useState(true);

  // Hero slider data
 // Hero slider data - IMAGES ONLY
const slides = [
  {
    id: 0,
    image: "/images/slider1.jpg",  // Replace with your actual image path
    alt: "Trading Dashboard"
  },
  {
    id: 1,
    image: "/images/slider1.jpg",
    alt: "Profit Analytics"
  },
  {
    id: 2,
    image: "/images/slider1.jpg",
    alt: "Market Data"
  },
  {
    id: 3,
    image: "/images/slider1.jpg",
    alt: "Bot Performance"
  }
];
  const changeSlide = useCallback((index) => {
    const slidesWrap = slidesWrapRef.current;
    const dots = dotsRef.current?.querySelectorAll('.sldot');

    if (slidesWrap) {
      slidesWrap.style.transform = `translateX(-${index * 100}%)`;
    }
    if (dots) {
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('on');
        } else {
          dot.classList.remove('on');
        }
      });
    }
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    const nextIndex = (currentSlide + 1) % totalSlides;
    changeSlide(nextIndex);
  }, [currentSlide, changeSlide]);

  const prevSlide = useCallback(() => {
    const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
    changeSlide(prevIndex);
  }, [currentSlide, changeSlide]);

  // Popup Functions
  const openBot = () => {
    console.log("Opening Bot Popup");
    setShowBotPopup(true);
  };

  const closeBot = () => {
    console.log("Closing Bot Popup");
    setShowBotPopup(false);
  };

  const openRef = () => {
    console.log("Opening Referral Popup");
    setShowRefPopup(true);
  };

  const closeRef = () => {
    console.log("Closing Referral Popup");
    setShowRefPopup(false);
  };

  // Copy referral link
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

  // Share on social media
  const shareOn = (platform) => {
    const refLink = "https://arbion.ai/ref/ARB-a9x7k2-premium";
    const text = "Join me on XOXO AI Engine - earn up to 8% commission!";

    let url = "";
    switch (platform) {
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

  // Timer logic
  useEffect(() => {
    let interval;
    if (isBotActive) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBotActive]);

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (timerNumRef.current) {
      timerNumRef.current.textContent = formatTime(timerSeconds);
    }
  }, [timerSeconds]);

  const activateBot = () => {
    const botNotif = document.getElementById('botNotif');
    const timerBox = document.getElementById('timerBox');
    const botActArea = document.getElementById('botActArea');

    if (botNotif) botNotif.style.display = 'flex';
    if (timerBox) timerBox.style.display = 'flex';
    if (botActArea) botActArea.style.display = 'none';

    setIsBotActive(true);
    setShowBotPopup(false);
  };

  const pauseBot = () => {
    console.log('Bot paused');
  };

  // Close announcement
  const closeAnnouncement = () => {
    setShowAnnouncement(false);
  };

  // Initialize charts
  useEffect(() => {
    // Earnings chart
    if (chartEarnRef.current) {
      const ctx = chartEarnRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          datasets: [
            {
              label: 'Earned',
              data: [1240, 2890, 4520, 8241],
              borderColor: '#a78bfa',
              backgroundColor: 'rgba(167, 139, 250, 0.1)',
              tension: 0.4,
              fill: true
            },
            {
              label: 'Limit',
              data: [3000, 6000, 9000, 12000],
              borderColor: 'rgba(239, 68, 68, 0.5)',
              borderDash: [5, 5],
              backgroundColor: 'transparent',
              tension: 0.4,
              fill: false
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }

    // Pie chart
    if (chartPieRef.current) {
      const ctx = chartPieRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Trading', 'Level', 'Affiliate', 'Compound'],
          datasets: [{
            data: [4286, 1841, 841, 1274],
            backgroundColor: ['#22d3ee', '#34d399', '#a78bfa', '#fbbf24'],
            borderWidth: 0
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
    }

    // Portfolio chart
    if (chartPortRef.current) {
      const ctx = chartPortRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`),
          datasets: [{
            data: Array.from({ length: 30 }, (_, i) => 38000 + (i * 320)),
            borderColor: '#00d4ff',
            backgroundColor: 'rgba(0, 212, 255, 0.1)',
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
    }

    return () => {
      const charts = Chart.instances;
      Object.values(charts).forEach(chart => chart.destroy());
    };
  }, []);

  useEffect(() => {
    // Initialize carousel
    if (dotsRef.current) {
      const dots = dotsRef.current.querySelectorAll('.sldot');
      dots.forEach((dot, i) => {
        dot.addEventListener('click', () => changeSlide(i));
      });
    }

    // Auto slide interval
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    // Initialize opportunities list
    if (oppLRef.current) {
      const opportunities = [
        { pair: 'SOL/USDC', profit: '+$124.50', chain: 'SOL', type: 'Flash Loan' },
        { pair: 'ETH/USDT', profit: '+$89.30', chain: 'ETH', type: 'MEV' },
        { pair: 'BNB/BUSD', profit: '+$67.80', chain: 'BSC', type: 'Cross-DEX' },
        { pair: 'MATIC/USDC', profit: '+$45.20', chain: 'ETH', type: 'Arbitrage' },
      ];

      oppLRef.current.innerHTML = opportunities.map(opp => `
        <div style="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--b1)">
          <div><span class="tag ${opp.chain.toLowerCase()}">${opp.chain}</span> <span style="font-weight:700">${opp.pair}</span><div style="font-size:10px;color:var(--t2)">${opp.type}</div></div>
          <div style="font-family:var(--mono);color:var(--t2);font-weight:900">${opp.profit}</div>
        </div>
      `).join('');
    }

    // Initialize execution grid
    if (execGridRef.current) {
      const executions = [
        { hash: '0x7a3f...b291', profit: '+$342.50', time: '12s ago', chain: 'SOL' },
        { hash: '0x2e8c...d174', profit: '+$218.30', time: '34s ago', chain: 'ETH' },
        { hash: '0x9b4d...f823', profit: '+$156.20', time: '1m ago', chain: 'BSC' },
      ];

      execGridRef.current.innerHTML = executions.map(exec => `
        <div class="exec-item">
          <div style="display:flex;align-items:center;gap:8px"><span class="tag ${exec.chain.toLowerCase()}">${exec.chain}</span><span style="font-family:var(--mono);font-size:11px;cursor:pointer;color:var(--pb)">${exec.hash}</span></div>
          <div style="font-family:var(--mono);color:var(--t2);font-weight:900">+${exec.profit}</div>
          <div style="font-size:10px;color:var(--t2)">${exec.time}</div>
        </div>
      `).join('');
    }

    // Initialize user track
    if (fuTrackRef.current) {
      const users = [
        { name: 'Alex***', country: '🇺🇸', amount: '$1,240' },
        { name: 'Maria***', country: '🇬🇧', amount: '$892' },
        { name: 'Wei***', country: '🇸🇬', amount: '$2,100' },
        { name: 'Carlos***', country: '🇧🇷', amount: '$567' },
      ];

      fuTrackRef.current.innerHTML = [...users, ...users].map(user => `
        <div class="fu-item">
          <div style="display:flex;align-items:center;gap:6px"><span style="font-size:16px">${user.country}</span><span style="font-weight:600">${user.name}</span></div>
          <div style="font-family:var(--mono);color:var(--t2);font-weight:700">${user.amount}</div>
        </div>
      `).join('');
    }

    // Heatmap
    if (heatmapRef.current) {
      const days = 28;
      let html = '';
      for (let i = 0; i < days; i++) {
        const profit = Math.random() * 100;
        let intensity = '';
        if (profit > 80) intensity = 'h4';
        else if (profit > 60) intensity = 'h3';
        else if (profit > 40) intensity = 'h2';
        else intensity = 'h1';
        html += `<div class="hcell ${intensity}" title="+$${Math.floor(profit * 10)}"></div>`;
        if ((i + 1) % 7 === 0 && i !== days - 1) html += '<div style="grid-column:1/-1;height:2px"></div>';
      }
      heatmapRef.current.innerHTML = html;
    }

    // Timer functionality for opps/min
    let oppCount = 142;
    const opmElement = document.getElementById('opm');
    if (opmElement) {
      const oppInterval = setInterval(() => {
        oppCount = Math.floor(140 + Math.random() * 20);
        opmElement.textContent = `${oppCount}/m`;
      }, 3000);
      return () => clearInterval(oppInterval);
    }

    return () => clearInterval(interval);
  }, [changeSlide, nextSlide]);

  return (
    <div className="content">

      {/* BOT POPUP */}
      {showBotPopup && (
        <div className="overlay" id="botOv" onClick={(e) => { if (e.target === e.currentTarget) closeBot(); }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="popup">
            <div className="popup-bar" style={{ height: "4px", background: "linear-gradient(90deg, #a78bfa, #06b6d4)", borderRadius: "2px" }}></div>
            <div className="popup-x" onClick={closeBot} style={{ position: "absolute", top: "12px", right: "16px", cursor: "pointer", fontSize: "20px", color: "var(--t2)" }}>✕</div>
            <div className="popup-body" style={{ padding: "20px" }}>
              <div className="bp-hero" style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
                <div className="bp-img" style={{ position: "relative" }}>
                  <div className="bp-ring" style={{ position: "absolute", inset: "-4px", borderRadius: "50%", border: "2px solid #a78bfa", opacity: 0.5 }}></div>
                  <svg width="56" height="56" viewBox="0 0 64 64" fill="none">
                    <rect x="10" y="18" width="44" height="34" rx="9" stroke="#a78bfa" strokeWidth="1.5" />
                    <rect x="10" y="18" width="44" height="12" rx="9" fill="rgba(124,58,237,0.15)" />
                    <rect x="19" y="28" width="8" height="8" rx="3" fill="#06b6d4" opacity=".9" />
                    <rect x="37" y="28" width="8" height="8" rx="3" fill="#7c3aed" opacity=".9" />
                    <circle cx="23" cy="32" r="2" fill="#fff" opacity=".7" />
                    <circle cx="41" cy="32" r="2" fill="#fff" opacity=".7" />
                    <path d="M22 42h20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round" />
                    <path d="M26 18V13M38 18V13" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="26" cy="11" r="3" fill="#7c3aed" />
                    <circle cx="38" cy="11" r="3" fill="#7c3aed" />
                    <path d="M10 32H5M59 32H54" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="4" cy="32" r="2.5" fill="#06b6d4" />
                    <circle cx="60" cy="32" r="2.5" fill="#06b6d4" />
                  </svg>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <div style={{ fontSize: "19px", fontWeight: 900, letterSpacing: "-.3px" }}>
                      XOXO <span style={{ color: "#a78bfa" }}>AI Engine</span>
                    </div>
                    <span className="tag tg" style={{ background: "rgba(16,185,129,.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" }}>v3.4</span>
                  </div>
                  <div style={{ fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.7, marginBottom: "8px" }}>
                    World's fastest MEV arbitrage bot — autonomously detects and executes profitable trades across Solana, Ethereum &amp; BSC. Zero manual effort. Maximum yield.
                  </div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    <span className="tag tp" style={{ background: "rgba(124,58,237,.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" }}>MEV Sandwich</span>
                    <span className="tag tc" style={{ background: "rgba(6,182,212,.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" }}>Cross-DEX</span>
                    <span className="tag tg" style={{ background: "rgba(16,185,129,.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" }}>Flash Loan</span>
                    <span className="tag ta" style={{ background: "rgba(245,158,11,.1)", padding: "2px 6px", borderRadius: "4px", fontSize: "10px" }}>Triangular</span>
                  </div>
                </div>
              </div>
              <div className="bp-stats" style={{ display: "flex", gap: "12px", marginBottom: "16px", padding: "12px", background: "var(--card2)", borderRadius: "var(--r8)" }}>
                <div className="bps" style={{ flex: 1, textAlign: "center" }}><div className="bps-v" style={{ color: "var(--g)", fontSize: "18px", fontWeight: "bold" }}>91.7%</div><div className="bps-l" style={{ fontSize: "10px", color: "var(--t2)" }}>Win Rate</div></div>
                <div className="bps" style={{ flex: 1, textAlign: "center" }}><div className="bps-v" style={{ color: "var(--pb)", fontSize: "18px", fontWeight: "bold" }}>~340%</div><div className="bps-l" style={{ fontSize: "10px", color: "var(--t2)" }}>Annual APY</div></div>
                <div className="bps" style={{ flex: 1, textAlign: "center" }}><div className="bps-v" style={{ color: "var(--c)", fontSize: "18px", fontWeight: "bold" }}>4.2s</div><div className="bps-l" style={{ fontSize: "10px", color: "var(--t2)" }}>Avg Hold</div></div>
              </div>
              <div className="bp-feats" style={{ marginBottom: "16px" }}>
                <div className="bp-feat" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px" }}><div className="bp-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a78bfa" }}></div>Automated MEV sandwich &amp; front-running detection in real-time</div>
                <div className="bp-feat" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px" }}><div className="bp-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a78bfa" }}></div>Cross-DEX price gap exploitation — Jupiter, Orca, Uniswap, Curve</div>
                <div className="bp-feat" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px" }}><div className="bp-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a78bfa" }}></div>Flash loan zero-capital arbitrage via Aave &amp; dYdX protocols</div>
                <div className="bp-feat" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px" }}><div className="bp-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a78bfa" }}></div>Smart gas engine — never overpays, maximizes net profit</div>
                <div className="bp-feat" style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", fontSize: "11px" }}><div className="bp-dot" style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#a78bfa" }}></div>Live TXID stream linked to Solscan / Etherscan / BscScan</div>
              </div>
              <button className="btn btn-p" style={{ width: "100%", padding: "13px", fontSize: "14px", background: "linear-gradient(135deg, #7c3aed, #06b6d4)", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", cursor: "pointer" }} onClick={activateBot}>
                ⚡ Activate Bot — Start Earning Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REFERRAL POPUP */}
      {showRefPopup && (
        <div className="overlay" id="refOv" onClick={(e) => { if (e.target === e.currentTarget) closeRef(); }} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.8)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="popup">
            <div className="popup-bar" style={{ height: "4px", background: "linear-gradient(90deg, #a78bfa, #fbbf24)", borderRadius: "2px" }}></div>
            <div className="popup-x" onClick={closeRef} style={{ position: "absolute", top: "12px", right: "16px", cursor: "pointer", fontSize: "20px", color: "var(--t2)" }}>✕</div>
            <div className="popup-body" style={{ padding: "20px" }}>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
                <div style={{ fontSize: "21px", fontWeight: 900, letterSpacing: "-.4px", marginBottom: "4px" }}>
                  Invite &amp; <span style={{ color: "#a78bfa" }}>Earn</span>
                </div>
                <div style={{ fontSize: "11.5px", color: "var(--t2)", lineHeight: 1.6 }}>
                  Share your link · Earn up to <strong style={{ color: "#fbbf24" }}>8% commission</strong> on every trade — 3 levels deep, paid daily
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "7px", marginBottom: "14px" }}>
                <div className="bps" style={{ textAlign: "center", padding: "8px", background: "var(--card2)", borderRadius: "8px" }}><div className="bps-v" style={{ color: "var(--c)", fontSize: "18px", fontWeight: "bold" }}>12</div><div className="bps-l" style={{ fontSize: "10px", color: "var(--t2)" }}>Referrals</div></div>
                <div className="bps" style={{ textAlign: "center", padding: "8px", background: "var(--card2)", borderRadius: "8px" }}><div className="bps-v" style={{ color: "var(--g)", fontSize: "18px", fontWeight: "bold" }}>$841</div><div className="bps-l" style={{ fontSize: "10px", color: "var(--t2)" }}>Earned</div></div>
                <div className="bps" style={{ textAlign: "center", padding: "8px", background: "var(--card2)", borderRadius: "8px" }}><div className="bps-v" style={{ color: "var(--pb)", fontSize: "18px", fontWeight: "bold" }}>$92k</div><div className="bps-l" style={{ fontSize: "10px", color: "var(--t2)" }}>Team Vol</div></div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: "6px" }}>
                Your Unique Referral Link
              </div>
              <div className="ref-link" style={{ background: "var(--card2)", padding: "10px", borderRadius: "8px", fontSize: "11px", fontFamily: "monospace", marginBottom: "10px", wordBreak: "break-all" }}>https://arbion.ai/ref/ARB-a9x7k2-premium</div>
              <button className="copy-btn" onClick={copyRef} style={{ width: "100%", padding: "10px", marginBottom: "14px", background: "var(--pb)", border: "none", borderRadius: "8px", color: "white", fontWeight: "bold", cursor: "pointer" }}>
                {copySuccess ? "✓ Copied!" : "📋 Copy Referral Link"}
              </button>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "6px", marginBottom: "14px" }}>
                <div style={{ background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--g)" }}>8%</div>
                  <div style={{ fontSize: "9px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase" }}>Level 1</div>
                </div>
                <div style={{ background: "rgba(6,182,212,.08)", border: "1px solid rgba(6,182,212,.2)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--c)" }}>5%</div>
                  <div style={{ fontSize: "9px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase" }}>Level 2</div>
                </div>
                <div style={{ background: "rgba(124,58,237,.08)", border: "1px solid rgba(124,58,237,.2)", borderRadius: "8px", padding: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "14px", fontWeight: 900, color: "var(--pb)" }}>3%</div>
                  <div style={{ fontSize: "9px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase" }}>Level 3</div>
                </div>
              </div>
              <div style={{ fontSize: "10px", color: "var(--t2)", fontWeight: 700, textTransform: "uppercase", letterSpacing: ".6px", marginBottom: "8px" }}>
                Share on Social Media
              </div>
              <div className="soc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "8px" }}>
                <button className="soc-btn soc-wa" onClick={() => shareOn('WhatsApp')} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "8px", background: "#25D366", border: "none", borderRadius: "8px", color: "white", fontSize: "11px", cursor: "pointer" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.898-1.425A9.96 9.96 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2" /></svg>
                  WA
                </button>
                <button className="soc-btn soc-fb" onClick={() => shareOn('Facebook')} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "8px", background: "#1877F2", border: "none", borderRadius: "8px", color: "white", fontSize: "11px", cursor: "pointer" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                  FB
                </button>
                <button className="soc-btn soc-ig" onClick={() => shareOn('Instagram')} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "8px", background: "#E4405F", border: "none", borderRadius: "8px", color: "white", fontSize: "11px", cursor: "pointer" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                  IG
                </button>
                <button className="soc-btn soc-tg" onClick={() => shareOn('Telegram')} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "8px", background: "#0088cc", border: "none", borderRadius: "8px", color: "white", fontSize: "11px", cursor: "pointer" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.248l-2.012 9.481c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.875.74z" /></svg>
                  TG
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ANNOUNCEMENT SECTION - FIXED */}
      {showAnnouncement && (
        <div className="ann" id="annEl">
          <span className="ann-badge">📢 LIVE</span>
          <div className="ann-ticker"><div className="ann-track">
            <span className="ann-item">Platform v3.4.1 — 40% faster execution engine deployed globally</span>
            <span className="ann-item">Easter Campaign: 2× referral commission until Apr 30</span>
            <span className="ann-item">Arbitrum One now LIVE — 3 chains active simultaneously</span>
            <span className="ann-item">SOL/USDC hitting record 0.84% spreads this week</span>
            <span className="ann-item">Flash Loan capital limits increased 3× — higher profit potential</span>
            <span className="ann-item">Token2049 Singapore — XOXO team attending May 2025</span>
            <span className="ann-item">Platform v3.4.1 — 40% faster execution engine deployed globally</span>
            <span className="ann-item">Easter Campaign: 2× referral commission until Apr 30</span>
            <span className="ann-item">Arbitrum One now LIVE — 3 chains active simultaneously</span>
            <span className="ann-item">SOL/USDC hitting record 0.84% spreads this week</span>
            <span className="ann-item">Flash Loan capital limits increased 3× — higher profit potential</span>
            <span className="ann-item">Token2049 Singapore — XOXO team attending May 2025</span>
          </div></div>
          <span style={{ color: "var(--t2)", cursor: "pointer", fontSize: "15px", flexShrink: 0, lineHeight: 1 }} onClick={() => document.getElementById('annEl').style.display = 'none'}>✕</span>
        </div>
      )}


      {/* HERO SLIDER */}
   {/* HERO SLIDER - IMAGES ONLY */}
<div className="hero sc" style={{ position: 'relative', overflow: 'hidden', borderRadius: '16px' }}>
  <div 
    ref={slidesWrapRef} 
    style={{ 
      display: 'flex', 
      transition: 'transform 0.5s ease',
      width: '100%'
    }}
  >
    {slides.map((slide) => (
      <div 
        key={slide.id} 
        style={{ 
          minWidth: '100%',
          position: 'relative'
        }}
      >
        <img 
          src={slide.image} 
          alt={slide.alt}
          style={{
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            display: 'block',
            borderRadius: '16px'
          }}
        />
      </div>
    ))}
  </div>
  
  {/* Dots */}
  <div 
    ref={dotsRef} 
    style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '8px', 
      marginTop: '12px',
      position: 'absolute',
      bottom: '12px',
      left: 0,
      right: 0,
      zIndex: 10
    }}
  >
    {slides.map((slide) => (
      <div
        key={slide.id}
        className={`sldot ${slide.id === currentSlide ? 'on' : ''}`}
        data-i={slide.id}
        style={{ 
          width: '8px', 
          height: '8px', 
          borderRadius: '50%', 
          background: slide.id === currentSlide ? '#a78bfa' : 'rgba(255,255,255,0.5)',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
      ></div>
    ))}
  </div>
  
  {/* Navigation Buttons */}
  <button 
    onClick={prevSlide} 
    style={{ 
      position: 'absolute', 
      left: '10px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      background: 'rgba(0,0,0,0.5)', 
      border: 'none', 
      color: 'white', 
      fontSize: '24px', 
      cursor: 'pointer', 
      width: '32px', 
      height: '32px', 
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }}
  >
    ‹
  </button>
  <button 
    onClick={nextSlide} 
    style={{ 
      position: 'absolute', 
      right: '10px', 
      top: '50%', 
      transform: 'translateY(-50%)', 
      background: 'rgba(0,0,0,0.5)', 
      border: 'none', 
      color: 'white', 
      fontSize: '24px', 
      cursor: 'pointer', 
      width: '32px', 
      height: '32px', 
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10
    }}
  >
    ›
  </button>
</div>
      {/* INCOME GRID */}
      <div className="it-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '12px', marginBottom: '20px' }}>
        <div className="it bg-p gl gl-p" onClick={openRef} style={{ cursor: "pointer", padding: '14px', borderRadius: '12px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
          <div className="it-ic" style={{ background: "rgba(124,58,237,.18)", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="#a78bfa" strokeWidth="1.5" className='svg-size' width="18" height="18">
              <circle cx="7" cy="5.5" r="3" />
              <circle cx="14" cy="6.5" r="2.5" />
              <path d="M1 17c0-2.8 2.7-5 6-5s6 2.2 6 5" strokeLinecap="round" />
              <path d="M14 10.5c2 .4 3.5 2 3.5 4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="it-lbl" style={{ color: "#a78bfa", fontSize: '11px', marginTop: '8px' }}>Affiliate Income</div>
          <div className="it-val" style={{ color: "#a78bfa", fontSize: '18px', fontWeight: 'bold' }}>$841.20</div>
          <span className="it-chg" style={{ background: "rgba(124,58,237,.15)", color: "#a78bfa", fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>▲ +8.4% today</span>
        </div>

        <div className="it bg-c gl gl-c" onClick={openRef} style={{ cursor: "pointer", padding: '14px', borderRadius: '12px', background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)' }}>
          <div className="it-ic" style={{ background: "rgba(6,182,212,.15)", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="#22d3ee" strokeWidth="1.5" className='svg-size' width="18" height="18">
              <polyline points="2,14 6,8 10,11 14,5 18,8" />
              <path d="M14 3h4v4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="it-lbl" style={{ color: "#22d3ee", fontSize: '11px', marginTop: '8px' }}>Trading Income</div>
          <div className="it-val" style={{ color: "#22d3ee", fontSize: '18px', fontWeight: 'bold' }}>$4,285.60</div>
          <span className="it-chg" style={{ background: "rgba(6,182,212,.12)", color: "#22d3ee", fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>▲ +12.1% today</span>
        </div>

        <div className="it bg-g gl gl-g" onClick={openRef} style={{ cursor: "pointer", padding: '14px', borderRadius: '12px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
          <div className="it-ic" style={{ background: "rgba(16,185,129,.15)", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="#34d399" strokeWidth="1.5" className='svg-size' width="18" height="18">
              <path d="M10 2L3 6.5v7L10 18l7-4.5v-7z" strokeLinejoin="round" />
              <path d="M10 11V8M8 9.5h4" strokeLinecap="round" />
            </svg>
          </div>
          <div className="it-lbl" style={{ color: "#34d399", fontSize: '11px', marginTop: '8px' }}>Level Income</div>
          <div className="it-val" style={{ color: "#34d399", fontSize: '18px', fontWeight: 'bold' }}>$1,840.80</div>
          <span className="it-chg" style={{ background: "rgba(16,185,129,.12)", color: "#34d399", fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>▲ +5.7% today</span>
        </div>

        <div className="it bg-a gl gl-a" onClick={openRef} style={{ cursor: "pointer", padding: '14px', borderRadius: '12px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}>
          <div className="it-ic" style={{ background: "rgba(245,158,11,.15)", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg viewBox="0 0 20 20" fill="none" stroke="#fbbf24" strokeWidth="1.5" className='svg-size' width="18" height="18">
              <circle cx="10" cy="10" r="4" />
              <path d="M10 2v2M10 16v2M2 10h2M16 10h2" strokeLinecap="round" />
              <path d="M10 8v2l1.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="it-lbl" style={{ color: "#fbbf24", fontSize: '11px', marginTop: '8px' }}>Compounding Income</div>
          <div className="it-val" style={{ color: "#fbbf24", fontSize: '18px', fontWeight: 'bold' }}>$1,273.90</div>
          <span className="it-chg" style={{ background: "rgba(245,158,11,.12)", color: "#fbbf24", fontSize: '10px', padding: '2px 6px', borderRadius: '4px' }}>▲ +9.2% today</span>
        </div>
      </div>

      {/* BOT ACTIVATE STRIP */}


  

      {/* REST OF YOUR CODE CONTINUES... */}
      {/* MID */}
      <div className="mid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
        <div className="botcard" >
          <div className="botbg"></div>
          <div className="bhead" style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
            <div className="owrap" style={{ position: 'relative' }}>
              <div className="orb" style={{ fontSize: '32px' }}>🤖</div>
              <div className="r1"></div>
              <div className="r2"></div>
            </div>
            <div>
              <div className="bname" style={{ fontWeight: 'bold' }}>XOXO AI Engine</div>
              <div className="bstatus" style={{ display: 'flex', gap: '8px', fontSize: '11px' }}>
                <div className="alive" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="pls" style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></span>ACTIVE — EXECUTING</div>
                <div className="bupt">· Uptime 14h 32m</div>
              </div>
            </div>
          </div>
          <div className="bdesc" style={{ fontSize: '12px', color: 'var(--t2)', marginBottom: '12px' }}>MEV + Cross-DEX + Flash Loan arbitrage running 24/7 across SOL, ETH &amp; BSC. Detects and executes profitable spread opportunities in milliseconds with 91.7% success rate.</div>
          <div className="mgrid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '8px', marginBottom: '12px', textAlign: 'center' }}>
            <div className="mcell"><div className="mv" style={{ fontSize: '16px', fontWeight: 'bold' }}>91.7%</div><div className="ml" style={{ fontSize: '10px', color: 'var(--t2)' }}>Win Rate</div></div>
            <div className="mcell"><div className="mv" style={{ fontSize: '16px', fontWeight: 'bold' }}>~340%</div><div className="ml" style={{ fontSize: '10px', color: 'var(--t2)' }}>APY</div></div>
            <div className="mcell"><div className="mv" id="opm" style={{ fontSize: '16px', fontWeight: 'bold' }}>142/m</div><div className="ml" style={{ fontSize: '10px', color: 'var(--t2)' }}>Opps/Min</div></div>
            <div className="mcell"><div className="mv" style={{ fontSize: '16px', fontWeight: 'bold' }}>3</div><div className="ml" style={{ fontSize: '10px', color: 'var(--t2)' }}>Chains</div></div>
          </div>
          <div className="bbtns" style={{ display: 'flex', gap: '8px' }}>
            <button className="bacti" onClick={openBot} style={{ flex: 1, background: 'linear-gradient(135deg, #7c3aed, #06b6d4)', border: 'none', padding: '8px', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>▶ &nbsp;Activate Bot</button>
            <button className="bpau" onClick={pauseBot} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid var(--b1)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer' }}>⏸ Pause</button>
          </div>
              {/* Bot Notification (second) */}
      <div className="notif-bar" id="botNotif2" style={{ display: isBotActive ? 'flex' : 'none',
         background: 'linear-gradient(135deg, rgba(16,185,129,0.1), rgba(6,182,212,0.1))',
          border: '1px solid rgba(16,185,129,0.3)', borderRadius: '10px', padding: '12px 16px', marginBottom: '20px', alignItems: 'center', gap: '10px' }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
          <polyline points="2,8 5.5,11.5 14,3.5" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span style={{ fontSize: '12px' }}>
          <strong>Your Bot is now ACTIVATED!</strong> — Scanning 142+ opportunities/min across SOL, ETH &amp; BSC. First profit expected within 60 seconds.
        </span>
        <div className="timer-box" id="timerBox2" style={{ display: isBotActive ? 'flex' : 'none', alignItems: 'center', gap: '6px',
           background: 'rgba(16,185,129,0.1)', padding: '4px 12px', borderRadius: '20px', marginTop:"15px" }}>
          <div className="timer-num" style={{ fontFamily: 'monospace', fontSize: '14px', fontWeight: 'bold', color: '#10b981' }}>{formatTime(timerSeconds)}</div>
          <div className="timer-lbl" style={{ fontSize: '10px', color: '#10b981' }}>🟢 Bot Running</div>
        </div>
      </div>
        </div>
        <div className="oppcard" >
          <div className="ch" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <div className="ct" style={{ fontWeight: 'bold' }}>Live Opportunities <span className="lb"><span style={{ width: "5px", height: "5px", borderRadius: "50%", background: "var(--brand-green)", display: "inline-block" }}></span>LIVE</span></div>
              <div className="csub" style={{ fontSize: '10px', color: 'var(--t2)' }}>Real-time arbitrage detection</div>
            </div>
            <div className="va" onClick={openRef} style={{ cursor: "pointer", fontSize: '11px', color: '#a78bfa' }}>View all →</div>
          </div>
          <div className="olist" id="ol" ref={oppLRef}></div>
        </div>
      </div>

      {/* CHAIN BAR */}
      <div className="chbar" >
        <div className="cblbl" style={{ fontSize: '12px', fontWeight: 'bold', marginBottom: '8px' }}>Network Status</div>
        <div className="cbdiv" style={{ height: '1px', background: 'var(--b1)', marginBottom: '12px' }}></div>
        <div className="cbitems" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '12px' }}>
          <div className="cbitem" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="cblogo" style={{ background: "rgba(98,126,234,.12)", color: "#627eea", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ξ</div>
            <div className="cbd" style={{ flex: 1 }}>
              <div className="cbn" style={{ fontSize: '11px', fontWeight: 'bold' }}>Ethereum</div>
              <div className="cbm" style={{ display: 'flex', gap: '8px', fontSize: '9px', color: 'var(--t2)' }}>
                <div className="cbs">GAS <span id="eg">24</span> gwei</div>
                <div className="cbs">TPS <span>15</span></div>
              </div>
            </div>
            <div className="cbli" style={{ fontSize: '10px', color: '#10b981' }}>LIVE</div>
          </div>
          <div className="cbitem" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="cblogo" style={{ background: "rgba(0,255,163,.07)", color: "#00ffa3", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>◎</div>
            <div className="cbd" style={{ flex: 1 }}>
              <div className="cbn" style={{ fontSize: '11px', fontWeight: 'bold' }}>Solana</div>
              <div className="cbm" style={{ display: 'flex', gap: '8px', fontSize: '9px', color: 'var(--t2)' }}>
                <div className="cbs">FEE <span>0.000025</span></div>
                <div className="cbs">TPS <span>3,200</span></div>
              </div>
            </div>
            <div className="cbli" style={{ fontSize: '10px', color: '#10b981' }}>LIVE</div>
          </div>
          <div className="cbitem" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="cblogo" style={{ background: "rgba(240,185,11,.09)", color: "#f0b90b", width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>⬡</div>
            <div className="cbd" style={{ flex: 1 }}>
              <div className="cbn" style={{ fontSize: '11px', fontWeight: 'bold' }}>BNB Chain</div>
              <div className="cbm" style={{ display: 'flex', gap: '8px', fontSize: '9px', color: 'var(--t2)' }}>
                <div className="cbs">GAS <span>3</span> gwei</div>
                <div className="cbs">TPS <span>60</span></div>
              </div>
            </div>
            <div className="cbli" style={{ fontSize: '10px', color: '#10b981' }}>LIVE</div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="row">
        {/* EARNINGS */}
        <div className="bc col-md-4">
          <div className="ch" style={{ marginBottom: 0 }}><div className="ct" style={{ fontWeight: 'bold' }}>Earnings Tracker</div></div>
          <div className="erw" style={{ display: 'flex', justifyContent: 'center', margin: '12px 0', position: 'relative', width: '100%' }}>
            <svg width="100" height="100" viewBox="0 0 128 128">
              <defs><linearGradient id="rg" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#0099cc" /><stop offset="100%" stopColor="#00d4ff" /></linearGradient></defs>
              <circle className="rb" cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
              <circle className="rf rcyn" cx="64" cy="64" r="54" fill="none" stroke="url(#rg)" strokeWidth="8" strokeDasharray="339" strokeDashoffset="106" transform="rotate(-90 64 64)" />
            </svg>
            <div className="rc" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
              <div className="rpct" style={{ fontSize: '18px', fontWeight: 'bold' }}>68.7%</div>
              <div className="rlbl" style={{ fontSize: '9px', color: 'var(--t2)' }}>Used</div>
            </div>
          </div>
          <div className="etiles" style={{ display: 'flex', gap: '8px', justifyContent: 'space-between' }}>
            <div className="etile" style={{ textAlign: 'center' }}><div className="etl" style={{ fontSize: '10px', color: 'var(--t2)' }}>Total Earned</div><div className="etv" style={{ fontSize: '16px', fontWeight: 'bold', color: "var(--brand-cyan)" }}>$8,241</div></div>
            <div className="etile" style={{ textAlign: 'center' }}><div className="etl" style={{ fontSize: '10px', color: 'var(--t2)' }}>Remaining</div><div className="etv" style={{ fontSize: '16px', fontWeight: 'bold', color: "var(--brand-green)" }}>$3,759</div></div>
            <div className="etile s2" style={{ textAlign: 'center' }}><div className="etl" style={{ fontSize: '10px', color: 'var(--t2)' }}>Income Limit</div><div className="etv" style={{ fontSize: '16px', fontWeight: 'bold', color: "var(--brand-gold)" }}>$12,000</div></div>
          </div>
        </div>

        {/* AI */}
        <div className="bc col-md-4">
          <div className="ch" style={{ marginBottom: 0, display: 'flex', justifyContent: 'space-between' }}>
            <div className="ct" style={{ fontWeight: 'bold' }}>🧠 AI Companion</div>
            <div style={{ fontSize: "10px", color: "var(--brand-violet)", background: "rgba(139,92,246,.1)", padding: "3px 9px", borderRadius: "6px", border: "1px solid rgba(139,92,246,.2)", fontWeight: 700 }}>NEXAI v3</div>
          </div>
          <div className="cmsgs" style={{ margin: '12px 0' }}>
            <div className="cmsg" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><div className="cav" style={{ width: '24px', height: '24px', background: 'rgba(124,58,237,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>AI</div><div className="cbub bai" style={{ background: 'rgba(124,58,237,0.1)', padding: '8px', borderRadius: '12px', fontSize: '11px', flex: 1 }}>Best chain today: <strong style={{ color: "var(--brand-cyan)" }}>SOL</strong> — 0.84% record spread detected now.</div></div>
            <div className="cmsg" style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}><div className="cav" style={{ width: '24px', height: '24px', background: 'rgba(124,58,237,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>AI</div><div className="cbub bin" style={{ background: 'rgba(6,182,212,0.1)', padding: '8px', borderRadius: '12px', fontSize: '11px', flex: 1 }}>⚡ 3 high-profit opps in last 5 min. Potential: <strong style={{ color: "var(--brand-green)" }}>+$94.20</strong></div></div>
            <div className="cmsg" style={{ display: 'flex', gap: '8px' }}><div className="cav" style={{ width: '24px', height: '24px', background: 'rgba(124,58,237,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px' }}>AI</div><div className="cbub bg2" style={{ background: 'rgba(245,158,11,0.1)', padding: '8px', borderRadius: '12px', fontSize: '11px', flex: 1 }}>💡 Enable auto-reinvest to boost compound rate by ~18%</div></div>
          </div>
          <div className="cq" style={{ display: 'flex', gap: '8px' }}>
            <button className="qb" style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)', padding: '6px 10px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>⚡ Optimize strategy</button>
            <button className="qb" style={{ background: 'rgba(6,182,212,0.1)', border: '1px solid rgba(6,182,212,0.2)', padding: '6px 10px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>♾ Auto-reinvest profits</button>
            <button className="qb" style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)', padding: '6px 10px', borderRadius: '6px', fontSize: '10px', cursor: 'pointer' }}>🛡 Run risk analysis</button>
          </div>
        </div>

        {/* NEWS */}
        <div className="bc col-md-4">
          <div className="ch" style={{ marginBottom: 0 }}>
            <div className="ct" style={{ fontWeight: 'bold' }}>📰 Market Updates</div>
          </div>
          <div className="tkwrap"><div className="tktrack">
            <span className="tki"><span>●</span> ETH/USDC +0.34% Uniswap</span>
            <span className="tki"><span>●</span> Flash loan limits 3×</span>
            <span className="tki"><span>●</span> SOL TPS record 3,200</span>
            <span className="tki"><span>●</span> Curve→Balancer route live</span>
            <span className="tki"><span>●</span> ETH/USDC +0.34% Uniswap</span>
            <span className="tki"><span>●</span> Flash loan limits 3×</span>
            <span className="tki"><span>●</span> SOL TPS record 3,200</span>
            <span className="tki"><span>●</span> Curve→Balancer route live</span>
          </div>
          </div>
          <div className="ncards2" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="ncard" style={{ padding: '8px', background: 'rgba(124,58,237,0.05)', borderRadius: '8px' }}>
              <div className="ntop" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="ntag2 ntu" style={{ fontSize: '9px', color: '#a78bfa' }}>UPDATE</span>
                <span className="ntm" style={{ fontSize: '9px', color: 'var(--t2)' }}>2m ago</span>
              </div>
              <div className="ntxt" style={{ fontSize: '11px' }}>Arbitrum One now live — 3 chains running simultaneously. SOL/USDC spreads widening.</div>
            </div>
            <div className="ncard" style={{ padding: '8px', background: 'rgba(239,68,68,0.05)', borderRadius: '8px' }}>
              <div className="ntop" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="ntag2 nta" style={{ fontSize: '9px', color: '#ef4444' }}>ALERT</span>
                <span className="ntm" style={{ fontSize: '9px', color: 'var(--t2)' }}>8m ago</span>
              </div>
              <div className="ntxt" style={{ fontSize: '11px' }}>High ETH volatility — bot in opportunistic mode. Execution frequency up 34%.</div>
            </div>
            <div className="ncard" style={{ padding: '8px', background: 'rgba(16,185,129,0.05)', borderRadius: '8px' }}>
              <div className="ntop" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span className="ntag2 ntn" style={{ fontSize: '9px', color: '#10b981' }}>NEWS</span>
                <span className="ntm" style={{ fontSize: '9px', color: 'var(--t2)' }}>15m ago</span>
              </div>
              <div className="ntxt" style={{ fontSize: '11px' }}>BSC gas at 3 gwei — optimal conditions for cross-chain arb operations today.</div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional charts section */}
      <div className="g21" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '20px' }}>
        <div className="card">
          <div className="sh" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div className="st" style={{ fontWeight: 'bold' }}>Total Earnings Tracker</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", color: "var(--t2)" }}><div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#a78bfa" }}></div>Earned</div>
              <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "10.5px", color: "var(--t2)" }}><div style={{ width: "8px", height: "3px", borderRadius: "1px", background: "rgba(239,68,68,.5)" }}></div>Limit</div>
            </div>
          </div>
          <div className="cw" style={{ height: "140px" }}><canvas id="ch-earn" ref={chartEarnRef}></canvas></div>
          <div style={{ marginTop: "12px", paddingTop: "12px", borderTop: "1px solid var(--b1)" }}>
            <div style={{ fontSize: "12.5px", fontWeight: 800, marginBottom: "10px" }}>Income Breakdown</div>
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div className="cw" style={{ height: "100px", maxWidth: "100px", flexShrink: 0 }}><canvas id="ch-pie" ref={chartPieRef}></canvas></div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}><div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#22d3ee" }}></div><span style={{ color: "var(--t2)" }}>Trading</span></div><span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>$4,286 <span style={{ color: "var(--t2)", fontSize: "10px" }}>52%</span></span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}><div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#34d399" }}></div><span style={{ color: "var(--t2)" }}>Level</span></div><span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>$1,841 <span style={{ color: "var(--t2)", fontSize: "10px" }}>22%</span></span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}><div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#a78bfa" }}></div><span style={{ color: "var(--t2)" }}>Affiliate</span></div><span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>$841 <span style={{ color: "var(--t2)", fontSize: "10px" }}>16%</span></span></div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11.5px" }}><div style={{ display: "flex", alignItems: "center", gap: "5px" }}><div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "#fbbf24" }}></div><span style={{ color: "var(--t2)" }}>Compound</span></div><span style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>$1,274 <span style={{ color: "var(--t2)", fontSize: "10px" }}>10%</span></span></div>
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="sh"><div className="st" style={{ fontWeight: 'bold' }}>Portfolio Value · 30d</div><span className="tag tc" style={{ background: 'rgba(6,182,212,0.1)', padding: '2px 6px', borderRadius: '4px', fontSize: '10px' }}>+24.8%</span></div>
          <div className="cw" style={{ height: "190px" }}><canvas id="ch-port" ref={chartPortRef}></canvas></div>
        </div>
      </div>


    </div>
  );
}