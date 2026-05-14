/* ═══════════════════════════════════════════════════════════
   CORE UTILITIES
═══════════════════════════════════════════════════════════ */
const R = () => Math.random();
const ri = (a, b) => Math.floor(a + R() * (b - a + 1));
const rf = (a, b, d = 2) => +(a + R() * (b - a)).toFixed(d);

const pairs = ['SOL/USDC', 'ETH/USDT', 'BNB/BUSD', 'BTC/USDT', 'MATIC/USDC', 'ARB/USDT', 'AVAX/USDC', 'LINK/USDT'];
const dexes = ['Jupiter', 'Orca', 'Raydium', 'Uniswap v3', 'Curve', 'SushiSwap', 'PancakeSwap', 'Balancer'];
const strats = ['MEV', 'Cross-DEX', 'Flash Loan', 'Triangular'];

const CHS = [
  { k: 'sol', lbl: 'SOL', cls: 'sol', scan: 'https://solscan.io/tx/', name: 'Solscan' },
  { k: 'eth', lbl: 'ETH', cls: 'eth', scan: 'https://etherscan.io/tx/', name: 'Etherscan' },
  { k: 'bsc', lbl: 'BSC', cls: 'bsc', scan: 'https://bscscan.com/tx/', name: 'BscScan' }
];

const h16 = () => '0x' + [...Array(16)].map(() => '0123456789abcdef'[ri(0, 15)]).join('');
const tNow = () => new Date().toTimeString().slice(0, 8);

let charts = {};

/* ═══════════════════════════════════════════════════════════
   AUTH
═══════════════════════════════════════════════════════════ */
function swAuth(t, b) {
  const emailPane = document.getElementById('emailPane');
  const walletPane = document.getElementById('walletPane');
  if (emailPane) emailPane.style.display = t === 'email' ? 'block' : 'none';
  if (walletPane) walletPane.style.display = t === 'wallet' ? 'flex' : 'none';
  document.querySelectorAll('#authTabs .tab').forEach(x => x.classList.remove('on'));
  if (b) b.classList.add('on');
}

function signOut() {
  const appShell = document.getElementById('appShell');
  const authScreen = document.getElementById('authScreen');
  if (appShell) appShell.style.display = 'none';
  if (authScreen) authScreen.style.display = 'flex';
  showToast('Signed out', 'See you next time!');
}

/* ═══════════════════════════════════════════════════════════
   NAVIGATION
═══════════════════════════════════════════════════════════ */
const ptitles = {
  dashboard: 'System Overview',
  engine: 'Arbitrage Engine',
  analytics: 'Performance Analytics',
  simulate: 'Backtest Simulator',
  wallet: 'Asset Management',
  community: 'XOXO Network',
  profile: 'Profile Settings'
};

function nav(id, el) {
  if (!id) {
    const path = window.location.pathname;
    id = path.split("/").pop().replace(".html", "") || 'dashboard';
    if (id === 'index') id = 'dashboard';
  }

  const pages = document.querySelectorAll('.page');
  const navItems = document.querySelectorAll('.ni');
  const titleEl = document.getElementById('tbTitle');
  const scroller = document.getElementById('mainScroll');

  if (pages) pages.forEach(p => p.classList.remove('on'));
  if (navItems) navItems.forEach(n => n.classList.remove('on'));

  const pg = document.getElementById('p-' + id);
  if (pg) pg.classList.add('on');

  if (el) {
    el.classList.add('on');
  } else {
    document.querySelectorAll('.ni').forEach(n => {
      const href = n.getAttribute('href') || '';
      if (href.includes(id + '.html') || (id === 'dashboard' && href.includes('index.html'))) {
        n.classList.add('on');
      }
    });
  }

  if (titleEl) {
    titleEl.innerHTML = ptitles[id] || id;
  }

  if (id === 'analytics' && typeof initAnalytics === 'function' && (!charts || !charts.pnl)) initAnalytics();
  if (id === 'wallet' && typeof initWalletChart === 'function' && (!charts || !charts.wal)) initWalletChart();
  if (id === 'simulate' && typeof reSim === 'function') reSim();
  if (id === 'community' && typeof fillCommunity === 'function') fillCommunity();

  if (scroller) scroller.scrollTop = 0;
}

/* ═══════════════════════════════════════════════════════════
   POPUPS
═══════════════════════════════════════════════════════════ */
function openBot() { 
  const botOv = document.getElementById('botOv');
  if (botOv) botOv.classList.add('show');
}
function closeBot() { 
  const botOv = document.getElementById('botOv');
  if (botOv) botOv.classList.remove('show');
}
function openRef() { 
  const refOv = document.getElementById('refOv');
  if (refOv) refOv.classList.add('show');
}
function closeRef() { 
  const refOv = document.getElementById('refOv');
  if (refOv) refOv.classList.remove('show');
}

let botSec = 0, botInt = null, botActive = false;

function activateBot() {
  if (botActive) return;
  botActive = true;
  closeBot();
  
  const botActArea = document.getElementById('botActArea');
  const timerBox = document.getElementById('timerBox');
  const botNotif = document.getElementById('botNotif');
  const wsBotPill = document.getElementById('wsBotPill');
  const sbBotLbl = document.getElementById('sbBotLbl');
  
  if (botActArea) botActArea.style.display = 'none';
  if (timerBox) timerBox.style.display = 'flex';
  if (botNotif) botNotif.style.display = 'flex';
  if (wsBotPill) wsBotPill.textContent = 'ACTIVE';
  if (sbBotLbl) sbBotLbl.textContent = 'ENGINE LIVE';
  
  showToast('⚡ Bot Activated!', 'XOXO Engine scanning 142+ opps/min across 3 chains');
  
  if (botInt) clearInterval(botInt);
  botInt = setInterval(() => {
    botSec++;
    const hh = String(Math.floor(botSec / 3600)).padStart(2, '0');
    const mm = String(Math.floor((botSec % 3600) / 60)).padStart(2, '0');
    const ss = String(botSec % 60).padStart(2, '0');
    const timerNum = document.getElementById('timerNum');
    if (timerNum) timerNum.textContent = hh + ':' + mm + ':' + ss;
  }, 1000);
}

function togBot(l) {
  const botChk = document.getElementById('botChk');
  const on = botChk ? !botChk.checked : false;
  const lbl = document.getElementById('sbBotLbl');
  const dot = document.querySelector('.sb-bot .pulse');
  setTimeout(() => {
    if (lbl) {
      lbl.textContent = on ? 'ENGINE LIVE' : 'BOT STOPPED';
      lbl.style.color = on ? 'var(--t2)' : 'var(--r)';
    }
    if (dot) {
      dot.style.background = on ? 'var(--t2)' : 'var(--r)';
      dot.style.boxShadow = on ? '0 0 6px var(--t2)' : '0 0 6px var(--r)';
    }
  }, 60);
}

function pickS(el) {
  document.querySelectorAll('.sc').forEach(s => s.classList.remove('sel'));
  if (el) el.classList.add('sel');
}

function wTab(t, b) {
  const wD = document.getElementById('wD');
  const wW = document.getElementById('wW');
  const wH = document.getElementById('wH');
  
  if (wD) wD.style.display = t === 'd' ? 'block' : 'none';
  if (wW) wW.style.display = t === 'w' ? 'block' : 'none';
  if (wH) wH.style.display = t === 'h' ? 'block' : 'none';
  
  document.querySelectorAll('#wTabs .tab').forEach(x => x.classList.remove('on'));
  if (b) b.classList.add('on');
}

/* ═══════════════════════════════════════════════════════════
   REFERRAL
═══════════════════════════════════════════════════════════ */
function copyRef() {
  const b = document.getElementById('copyRefBtn');
  if (b) {
    b.textContent = '✅ Copied!';
    setTimeout(() => b.textContent = '📋 Copy Referral Link', 2500);
  }
  showToast('Link Copied!', 'Share and earn 8% commission on every trade');
}

function copyRef2() {
  const b = document.getElementById('copyRefBtn2');
  if (b) {
    b.textContent = '✅ Copied!';
    setTimeout(() => b.textContent = '📋 Copy Link', 2500);
  }
  showToast('Referral Link Copied!', 'Share your link to start earning');
}

function shareOn(p) {
  showToast('Sharing on ' + p, 'Opening share dialog...');
  closeRef();
}

/* ═══════════════════════════════════════════════════════════
   TOAST
═══════════════════════════════════════════════════════════ */
let toastTm = null;
function showToast(t, m) {
  const toastT = document.getElementById('toastT');
  const toastM = document.getElementById('toastM');
  const toast = document.getElementById('toast');
  
  if (toastT) toastT.textContent = t;
  if (toastM) toastM.textContent = m;
  if (toast) {
    toast.classList.add('show');
    if (toastTm) clearTimeout(toastTm);
    toastTm = setTimeout(() => toast.classList.remove('show'), 4500);
  }
}

/* ═══════════════════════════════════════════════════════════
   EXPLORER LINKS
═══════════════════════════════════════════════════════════ */
function explorerUrl(chainKey, hash) {
  const ch = CHS.find(c => c.k === chainKey) || CHS[1];
  return ch.scan + hash;
}

function openExplorer(chainKey, hash) {
  const ch = CHS.find(c => c.k === chainKey) || CHS[1];
  window.open(explorerUrl(chainKey, hash), '_blank', 'noopener');
  showToast('Opening ' + ch.name, 'Viewing transaction on ' + ch.name);
}

/* ═══════════════════════════════════════════════════════════
   CHART HELPERS
═══════════════════════════════════════════════════════════ */
function mkGrad(ctx, c1, c2, h = 200) {
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, c1);
  g.addColorStop(1, c2);
  return g;
}

const baseChartOpts = (extraTooltip) => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: {
      backgroundColor: '#0b0b22',
      borderColor: 'rgba(120,80,255,.3)',
      borderWidth: 1,
      titleColor: '#f0ecff',
      bodyColor: '#8b87c0',
      ...extraTooltip
    }
  }
});

/* ═══════════════════════════════════════════════════════════
   CHARTS
═══════════════════════════════════════════════════════════ */
function initPortfolio() {
  const el = document.getElementById('ch-port');
  if (!el || charts.port) return;
  
  const data = [38000];
  for (let i = 1; i < 30; i++) data.push(data[i - 1] + rf(80, 600, 0));
  
  const ctx = el.getContext('2d');
  charts.port = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.map((_, i) => 'D' + (i + 1)),
      datasets: [{
        data,
        borderColor: '#a78bfa',
        borderWidth: 2,
        fill: true,
        backgroundColor: mkGrad(ctx, 'rgba(167,139,250,.22)', 'rgba(167,139,250,.01)'),
        tension: .4,
        pointRadius: 0,
        pointHoverRadius: 4
      }]
    },
    options: {
      ...baseChartOpts({ callbacks: { label: c => '$' + Math.round(c.raw).toLocaleString() } }),
      scales: {
        x: { display: false },
        y: {
          grid: { color: 'rgba(120,80,255,.06)' },
          ticks: { color: '#3a375e', font: { size: 10 }, callback: v => '$' + (v / 1000).toFixed(0) + 'k' }
        }
      }
    }
  });
}

function initEarnChart() {
  const el = document.getElementById('ch-earn');
  if (!el) return;
  
  const earned = [0];
  for (let i = 1; i < 30; i++) earned.push(Math.min(earned[i - 1] + rf(80, 400, 0), 12000));
  const limit = Array(30).fill(12000);
  
  const ctx = el.getContext('2d');
  charts.earn = new Chart(ctx, {
    type: 'line',
    data: {
      labels: earned.map((_, i) => 'D' + (i + 1)),
      datasets: [
        {
          label: 'Earned',
          data: earned,
          borderColor: '#a78bfa',
          borderWidth: 2,
          fill: true,
          backgroundColor: mkGrad(ctx, 'rgba(167,139,250,.22)', 'rgba(167,139,250,.01)'),
          tension: .4,
          pointRadius: 0
        },
        {
          label: 'Limit',
          data: limit,
          borderColor: 'rgba(239,68,68,.4)',
          borderWidth: 1.5,
          borderDash: [5, 4],
          fill: false,
          tension: 0,
          pointRadius: 0
        }
      ]
    },
    options: {
      ...baseChartOpts({ callbacks: { label: c => (c.datasetIndex === 0 ? 'Earned: ' : 'Limit: ') + '$' + Math.round(c.raw).toLocaleString() } }),
      interaction: { mode: 'index', intersect: false },
      scales: {
        x: { display: false },
        y: {
          grid: { color: 'rgba(120,80,255,.06)' },
          ticks: { color: '#3a375e', font: { size: 9 }, callback: v => '$' + (v / 1000).toFixed(0) + 'k' }
        }
      }
    }
  });
}

function initPieChart() {
  const el = document.getElementById('ch-pie');
  if (!el) return;
  
  new Chart(el.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Trading', 'Level', 'Affiliate', 'Compound'],
      datasets: [{
        data: [52, 22, 16, 10],
        backgroundColor: ['#22d3ee', '#34d399', '#a78bfa', '#fbbf24'],
        borderWidth: 0,
        hoverOffset: 6
      }]
    },
    options: {
      ...baseChartOpts({ callbacks: { label: c => c.label + ': ' + c.raw + '%' } }),
      cutout: '65%'
    }
  });
}

function initAnalytics() {
  const p = [0];
  for (let i = 1; i < 90; i++) p.push(p[i - 1] + rf(20, 140, 0));
  
  const c1 = document.getElementById('ch-pnl');
  if (!c1) return;
  
  const ctx1 = c1.getContext('2d');
  charts.pnl = new Chart(ctx1, {
    type: 'line',
    data: {
      labels: p.map((_, i) => i),
      datasets: [{
        data: p,
        borderColor: '#10b981',
        borderWidth: 2,
        fill: true,
        backgroundColor: mkGrad(ctx1, 'rgba(16,185,129,.18)', 'rgba(16,185,129,.01)', 210),
        tension: .4,
        pointRadius: 0
      }]
    },
    options: {
      ...baseChartOpts({ callbacks: { label: c => '$' + Math.round(c.raw) } }),
      scales: {
        x: { display: false },
        y: {
          grid: { color: 'rgba(16,185,129,.06)' },
          ticks: { color: '#3a375e', font: { size: 10 }, callback: v => '$' + Math.round(v) }
        }
      }
    }
  });
  
  const dd = Array.from({ length: 30 }, () => ri(60, 340));
  const c2 = document.getElementById('ch-daily');
  if (c2) {
    charts.daily = new Chart(c2.getContext('2d'), {
      type: 'bar',
      data: {
        labels: dd.map((_, i) => i % 6 === 0 ? 'D' + (i + 1) : ''),
        datasets: [{
          data: dd,
          backgroundColor: dd.map(v => v > 200 ? 'rgba(167,139,250,.75)' : 'rgba(120,80,255,.4)'),
          borderRadius: 3,
          borderWidth: 0
        }]
      },
      options: {
        ...baseChartOpts({ callbacks: { label: c => '$' + c.raw } }),
        scales: {
          x: { ticks: { color: '#3a375e', font: { size: 9 } } },
          y: {
            grid: { color: 'rgba(120,80,255,.06)' },
            ticks: { color: '#3a375e', font: { size: 10 }, callback: v => '$' + v }
          }
        }
      }
    });
  }
  
  const c3 = document.getElementById('ch-chain');
  if (c3) {
    new Chart(c3.getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['SOL', 'ETH', 'BSC'],
        datasets: [{
          data: [52, 31, 17],
          backgroundColor: ['#9945ff', '#627eea', '#f3ba2f'],
          borderWidth: 0,
          hoverOffset: 4
        }]
      },
      options: { ...baseChartOpts(), cutout: '72%' }
    });
  }
  
  fillHistTbl();
}

function initWalletChart() {
  const el = document.getElementById('ch-wal');
  if (!el || charts.wal) return;
  
  charts.wal = new Chart(el.getContext('2d'), {
    type: 'doughnut',
    data: {
      labels: ['Compound', 'Trading', 'Commission'],
      datasets: [{
        data: [57, 39, 4],
        backgroundColor: ['#7c3aed', '#06b6d4', '#f59e0b'],
        borderWidth: 0,
        hoverOffset: 4
      }]
    },
    options: { ...baseChartOpts(), cutout: '70%' }
  });
  fillWalletHist();
}

function reSim() {
  const simCap = document.getElementById('simCap');
  const simPer = document.getElementById('simPer');
  const cap = simCap ? parseFloat(simCap.value || 5000) : 5000;
  const days = simPer ? parseInt(simPer.value || 30) : 30;
  const data = [cap];
  for (let i = 1; i <= days; i++) data.push(data[i - 1] + rf(20, 120, 0));
  
  if (charts.bt) {
    charts.bt.data.labels = data.map((_, i) => 'D' + i);
    charts.bt.data.datasets[0].data = data;
    charts.bt.update();
  } else {
    const el = document.getElementById('ch-bt');
    if (!el) return;
    const ctx = el.getContext('2d');
    charts.bt = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.map((_, i) => 'D' + i),
        datasets: [{
          data,
          borderColor: '#06b6d4',
          borderWidth: 2,
          fill: true,
          backgroundColor: mkGrad(ctx, 'rgba(6,182,212,.18)', 'rgba(6,182,212,.01)', 250),
          tension: .4,
          pointRadius: 0
        }]
      },
      options: {
        ...baseChartOpts({ callbacks: { label: c => '$' + Math.round(c.raw).toLocaleString() } }),
        scales: {
          x: { ticks: { color: '#3a375e', font: { size: 9 }, maxTicksLimit: 8 } },
          y: {
            grid: { color: 'rgba(6,182,212,.06)' },
            ticks: { color: '#3a375e', font: { size: 10 }, callback: v => '$' + Math.round(v).toLocaleString() }
          }
        }
      }
    });
    
    const el2 = document.getElementById('ch-dist');
    if (el2) {
      const dd = Array.from({ length: 20 }, (_, i) => ri(5, i < 5 ? 80 : i < 10 ? 140 : i < 15 ? 60 : 20));
      new Chart(el2.getContext('2d'), {
        type: 'bar',
        data: {
          labels: dd.map(() => ''),
          datasets: [{
            data: dd,
            backgroundColor: 'rgba(124,58,237,.45)',
            borderRadius: 2,
            borderWidth: 0
          }]
        },
        options: { ...baseChartOpts(), scales: { x: { display: false }, y: { display: false } } }
      });
    }
  }
}

function runSim() {
  const simCap = document.getElementById('simCap');
  const cap = simCap ? parseFloat(simCap.value || 5000) : 5000;
  const ret = rf(18, 52, 1);
  
  const sRet = document.getElementById('sRet');
  const sPro = document.getElementById('sPro');
  const sNet = document.getElementById('sNet');
  const simRes = document.getElementById('simRes');
  
  if (sRet) sRet.textContent = '+' + ret + '%';
  const net = Math.round(cap * ret / 100);
  if (sPro) sPro.textContent = '+$' + net.toLocaleString();
  if (sNet) sNet.textContent = '+$' + Math.round(net * .8).toLocaleString();
  if (simRes) simRes.style.display = 'block';
  reSim();
}

/* ═══════════════════════════════════════════════════════════
   SCANNER CHART
═══════════════════════════════════════════════════════════ */
let scanCh = null;
function initScanner() {
  const el = document.getElementById('ch-scan');
  if (!el || scanCh) return;
  const data = Array.from({ length: 60 }, () => ri(40, 180));
  scanCh = new Chart(el.getContext('2d'), {
    type: 'bar',
    data: {
      labels: data.map(() => ''),
      datasets: [{
        data,
        backgroundColor: 'rgba(124,58,237,.45)',
        borderWidth: 0,
        barPercentage: .75
      }]
    },
    options: { ...baseChartOpts(), scales: { x: { display: false }, y: { display: false } }, animation: { duration: 0 } }
  });
  charts.scan = scanCh;
}

/* ═══════════════════════════════════════════════════════════
   DATA FILLS
═══════════════════════════════════════════════════════════ */
function fillOpp() {
  const el = document.getElementById('oppL');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < 5; i++) {
    const pair = pairs[ri(0, pairs.length - 1)];
    const ch = CHS[ri(0, 2)];
    const sp = rf(0.18, 1.4);
    const pr = rf(4, 42);
    el.innerHTML += `<div class="opp"><span class="tag ${ch.cls}">${ch.lbl}</span><span style="font-size:12px;font-weight:700;color:var(--t1)">${pair}</span><span style="font-size:10px;color:var(--t2);flex:1;overflow:hidden;text-overflow:ellipsis;margin:0 4px">${dexes[ri(0, dexes.length - 1)]}→${dexes[ri(0, dexes.length - 1)]}</span><span class="opp-sp">+${sp.toFixed(2)}%</span><span class="tag tg" style="margin-left:4px">$${pr.toFixed(2)}</span></div>`;
  }
}

function fillExecGrid() {
  const el = document.getElementById('execGrid');
  if (!el) return;
  el.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const ch = CHS[ri(0, 2)];
    const pair = pairs[ri(0, pairs.length - 1)];
    const sp = rf(0.18, 1.2);
    const pr = rf(2, 75);
    const won = R() > 0.1;
    const hash = h16();
    const shortHash = hash.slice(0, 12) + '…';
    el.innerHTML += `<div class="exec-card">
      <div style="display:flex;align-items:center;gap:6px;margin-bottom:7px">
        <span class="tag ${ch.cls}">${ch.lbl}</span>
        <span class="ec-pair">${pair}</span>
        <span class="tag tp" style="margin-left:auto">${strats[ri(0, 3)]}</span>
      </div>
      <div class="ec-row"><span class="ec-lbl">TXID</span><button class="tx-link ec-val" onclick="openExplorer('${ch.k}','${hash}')" title="View on ${ch.name}">${shortHash} 🔗</button></div>
      <div class="ec-row"><span class="ec-lbl">Route</span><span class="ec-val" style="color:var(--t2);font-size:10px">${dexes[ri(0, dexes.length - 1)]}→${dexes[ri(0, dexes.length - 1)]}</span></div>
      <div class="ec-row"><span class="ec-lbl">Spread</span><span class="ec-val" style="color:var(--a)">${sp.toFixed(3)}%</span></div>
      <div class="ec-profit" style="color:${won ? 'var(--t2)' : 'var(--r)'}">${won ? '+' : '−'}$${pr.toFixed(2)}</div>
      <div class="ec-time">${tNow()} · <span class="tag ${won ? 'tg' : 'tr'}" style="font-size:9px">${won ? 'WIN' : 'LOSS'}</span></div>
    </div>`;
  }
}

function addTx() {
  const el = document.getElementById('txEl');
  if (!el) return;
  const ch = CHS[ri(0, 2)];
  const hash = h16();
  const pr = rf(1.5, 50);
  const e = document.createElement('div');
  e.className = 'tx-entry';
  e.innerHTML = `<span class="tx-t">${tNow()}</span><span class="tag ${ch.cls}" style="font-size:9px">${ch.lbl}</span><button class="tx-h tx-link" onclick="openExplorer('${ch.k}','${hash}')" title="Open on ${ch.name}">${hash.slice(0, 14)}… 🔗</button><span class="tx-p">+$${pr.toFixed(2)}</span>`;
  el.insertBefore(e, el.firstChild);
  if (el.children.length > 14) el.removeChild(el.lastChild);
}

function fillHistTbl() {
  const tb = document.getElementById('histTbl');
  if (!tb) return;
  tb.innerHTML = '';
  for (let i = 0; i < 10; i++) {
    const ch = CHS[ri(0, 2)];
    const pair = pairs[ri(0, pairs.length - 1)];
    const hash = h16();
    tb.innerHTML += `<tr>
      <td>${new Date(Date.now() - ri(0, 86400000 * 3)).toLocaleDateString()}</td>
      <td><button class="tx-link" onclick="openExplorer('${ch.k}','${hash}')" title="${ch.name}">${hash.slice(0, 10)}…</button></td>
      <td style="color:var(--t1);font-weight:700">${pair}</td>
      <td><span class="tag ${ch.cls}">${ch.lbl}</span></td>
      <td><button class="tx-link" style="font-size:10.5px" onclick="openExplorer('${ch.k}','${hash}')">🔗 ${ch.name}</button></td>
      <td>$${ri(200, 3000).toLocaleString()}</td>
      <td style="color:var(--t2)">+$${rf(0.5, 60)}</td>
      <td><span class="tag tp">${strats[ri(0, 3)]}</span></td>
    </tr>`;
  }
}

function fillWalletHist() {
  const tb = document.getElementById('whTbl');
  if (!tb) return;
  tb.innerHTML = '';
  const types = [['Deposit', 'tg'], ['Withdraw', 'tr'], ['Profit', 'tc'], ['Fee', 'ta']];
  const netMap = ['bsc', 'eth', 'bsc', 'sol'];
  const nets = ['TRC20', 'ERC20', 'BEP20', 'Solana'];
  for (let i = 0; i < 8; i++) {
    const [lbl, cls] = types[ri(0, 3)];
    const ni = ri(0, 3);
    const hash = h16();
    const ch = CHS.find(c => c.k === netMap[ni]) || CHS[1];
    tb.innerHTML += `<tr>
      <td>${new Date(Date.now() - ri(0, 864000000)).toLocaleDateString()}</td>
      <td><span class="tag ${cls}">${lbl}</span></td>
      <td style="color:var(--t1)">$${rf(20, 2000)}</td>
      <td>${nets[ni]}</td>
      <td><button class="tx-link" onclick="openExplorer('${ch.k}','${hash}')">${hash.slice(0, 10)}…</button></td>
      <td><button class="tx-link" style="font-size:10px" onclick="openExplorer('${ch.k}','${hash}')">🔗 ${ch.name}</button></td>
      <td><span class="tag tg">Confirmed</span></td>
    </tr>`;
  }
}

function buildHeatmap() {
  const el = document.getElementById('heatmap');
  if (!el) return;
  el.innerHTML = '';
  Array.from({ length: 28 }, () => ri(0, 340)).forEach((v) => {
    const c = document.createElement('div');
    c.className = 'hm-cell';
    const t = v / 340;
    c.style.background = `rgba(${Math.round(124 + t * 43)},${Math.round(58 + t * 97)},${Math.round(237 - t * 110)},${(0.1 + t * .85).toFixed(2)})`;
    c.setAttribute('data-tip', '$' + v + ' profit');
    el.appendChild(c);
  });
}

function fillCommunity() {
  const el = document.getElementById('cTree');
  if (!el || el.children.length > 0) return;
  const mems = [
    { n: 'trader_mike', v: '$12,400', c: '$992', l: 'L1', col: '#10b981' },
    { n: 'crypto_emma', v: '$8,200', c: '$656', l: 'L1', col: '#10b981' },
    { n: 'solana_king', v: '$6,100', c: '$305', l: 'L2', col: '#06b6d4' },
    { n: 'eth_maxi', v: '$4,800', c: '$240', l: 'L2', col: '#06b6d4' },
    { n: 'bnb_whale', v: '$3,200', c: '$96', l: 'L3', col: '#a78bfa' },
    { n: 'arb_hunter', v: '$2,900', c: '$87', l: 'L3', col: '#a78bfa' }
  ];
  mems.forEach(m => {
    const d = document.createElement('div');
    d.className = 'mem';
    const lc = m.l === 'L1' ? 'tg' : m.l === 'L2' ? 'tc' : 'tp';
    d.innerHTML = `<div class="mem-av" style="background:${m.col}22;color:${m.col}">${m.n[0].toUpperCase()}</div><div style="flex:1;min-width:0"><div style="font-size:13px;font-weight:700;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${m.n}</div><div style="font-size:10.5px;color:var(--t2)">Vol: ${m.v}</div></div><span class="tag ${lc}">${m.l}</span><span style="font-family:var(--mono);font-size:13px;font-weight:900;color:var(--t2);flex-shrink:0">${m.c}</span>`;
    el.appendChild(d);
  });
}

/* ═══════════════════════════════════════════════════════════
   FOOTER USERS
═══════════════════════════════════════════════════════════ */
const USERS = [
  { flag: '🇺🇸', uid: 'ARB-7x2k9', name: 'James Wilson', country: 'United States', t: '2m', col: '#a78bfa' },
  { flag: '🇩🇪', uid: 'ARB-4p8n3', name: 'Klaus Mueller', country: 'Germany', t: '4m', col: '#22d3ee' },
  { flag: '🇮🇳', uid: 'ARB-9q1r7', name: 'Priya Sharma', country: 'India', t: '6m', col: '#34d399' },
  { flag: '🇬🇧', uid: 'ARB-2m5t1', name: 'Oliver Smith', country: 'United Kingdom', t: '8m', col: '#fbbf24' },
  { flag: '🇸🇬', uid: 'ARB-6k3y8', name: 'Wei Liang', country: 'Singapore', t: '11m', col: '#f87171' },
  { flag: '🇧🇷', uid: 'ARB-1n7p4', name: 'Lucas Silva', country: 'Brazil', t: '13m', col: '#a78bfa' },
  { flag: '🇯🇵', uid: 'ARB-8v2w6', name: 'Yuki Tanaka', country: 'Japan', t: '16m', col: '#22d3ee' },
  { flag: '🇫🇷', uid: 'ARB-5x9m2', name: 'Sophie Martin', country: 'France', t: '19m', col: '#34d399' },
  { flag: '🇦🇺', uid: 'ARB-3b8c5', name: 'Liam Johnson', country: 'Australia', t: '22m', col: '#fbbf24' },
  { flag: '🇰🇷', uid: 'ARB-7a4d9', name: 'Min Jun Park', country: 'South Korea', t: '25m', col: '#f87171' },
  { flag: '🇨🇦', uid: 'ARB-2r6f1', name: 'Emma Thompson', country: 'Canada', t: '28m', col: '#a78bfa' },
  { flag: '🇳🇱', uid: 'ARB-9z3h7', name: 'Lars Bakker', country: 'Netherlands', t: '31m', col: '#22d3ee' },
  { flag: '🇦🇪', uid: 'ARB-4w8j3', name: 'Ahmed Al-Rashid', country: 'UAE', t: '34m', col: '#34d399' },
  { flag: '🇿🇦', uid: 'ARB-6u1q8', name: 'Thabo Nkosi', country: 'South Africa', t: '37m', col: '#fbbf24' },
  { flag: '🇲🇽', uid: 'ARB-8t5k2', name: 'Carlos Reyes', country: 'Mexico', t: '40m', col: '#f87171' },
];

function buildFooter() {
  const el = document.getElementById('fuTrack');
  if (!el) return;
  const all = [...USERS, ...USERS];
  el.innerHTML = all.map(u => `<div class="fu-item">
    <div class="fu-dot"></div>
    <div class="fu-flag">${u.flag}</div>
    <div class="fu-av-s" style="background:${u.col}22;color:${u.col}">${u.name[0]}</div>
    <div>
      <div class="fu-name">${u.name}</div>
      <div class="fu-uid">${u.uid}</div>
      <div class="fu-time">${u.country} · joined ${u.t} ago</div>
    </div>
  </div>`).join('');
}

/* ═══════════════════════════════════════════════════════════
   LIVE UPDATES
═══════════════════════════════════════════════════════════ */
let upSec = 14 * 3600 + 32 * 60 + 7;

function startLive() {
  setInterval(() => {
    upSec++;
    const h = Math.floor(upSec / 3600);
    const m = Math.floor((upSec % 3600) / 60);
    const s = upSec % 60;
    
    const upEl = document.getElementById('upEl');
    if (upEl) upEl.textContent = `↑ ${h}h ${m}m ${String(s).padStart(2, '0')}s`;
    
    const wsUp = document.getElementById('wsUp');
    if (wsUp) wsUp.textContent = h + 'h ' + m + 'm';
    
    const wsPnl = document.getElementById('wsPnl');
    if (wsPnl) wsPnl.textContent = '+$' + (341.20 + R() * .4).toFixed(2);
    
    const gasP = document.getElementById('gasP');
    if (gasP && upSec % 7 === 0) gasP.textContent = '⛽ ' + ri(18, 52) + ' gwei';
  }, 1000);

  setInterval(fillOpp, 3000);
  setInterval(addTx, 1100);

  setInterval(() => {
    if (charts.scan) {
      charts.scan.data.datasets[0].data.shift();
      charts.scan.data.datasets[0].data.push(ri(40, 190));
      charts.scan.update('none');
    }
  }, 450);

  setInterval(() => {
    const exc = document.getElementById('exc');
    if (exc) {
      const v = parseInt(exc.textContent.replace(/,/g, ''));
      exc.textContent = (v + ri(1, 4)).toLocaleString();
    }
    const opm = document.getElementById('opm');
    if (opm) opm.textContent = ri(110, 175);
  }, 1600);

  setInterval(() => {
    if (document.getElementById('execGrid')) fillExecGrid();
  }, 8000);
}

/* ═══════════════════════════════════════════════════════════
   INIT ALL
═══════════════════════════════════════════════════════════ */
function initAll() {
  const h = new Date().getHours();
  const greetEl = document.getElementById('greetEl');
  if (greetEl) {
    greetEl.textContent = (h < 12 ? 'Good morning ' : h < 18 ? 'Good afternoon ' : 'Good evening ') + 'arbion123 ' + (h < 12 ? '☀️' : h < 18 ? '🌤️' : '🌙');
  }

  initPortfolio();
  initEarnChart();
  initPieChart();

  fillOpp();
  for (let i = 0; i < 8; i++) addTx();
  fillExecGrid();
  buildHeatmap();
  buildFooter();
  initScanner();

  startLive();
  
  if (document.getElementById('ch-daily')) {
    initAnalytics();
  }
  if (document.getElementById('ch-bt')) {
    reSim();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    initAll();
  }, 200);
});