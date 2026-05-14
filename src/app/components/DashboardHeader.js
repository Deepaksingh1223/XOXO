"use client";

import Link from "next/link";
import Image from "next/image";

export default function DashboardHeader() {
  return (
    <aside className="sidebar">
      <div className="logo-area">
        <Image
          src="/white.png"
          alt="Logo"
          width={200}
          height={60}
          priority
        /> 
      </div>
      <div className="nb">
        <div className="nlbl">Platform</div>
        <Link href="/dashboard" className="ni on">
          <span className="ic">⬡</span>
          <span>Dashboard</span>
        </Link>
        <Link href="/dashboard/engine" className="ni">
          <span className="ic">⚡</span>
          <span>Arb Engine</span>
          <span className="npip pg"></span>
        </Link>
        <Link href="/dashboard/analytics" className="ni">
          <span className="ic">📊</span>
          <span>Analytics</span>
        </Link>
        <Link href="/dashboard/simulate" className="ni">
          <span className="ic">🧪</span>
          <span>Simulate</span>
          <span className="nbadge">BETA</span>
        </Link>
        <Link href="/dashboard/auto-trade" className="ni">
          <span className="ic">🔄</span>
          <span>Auto-Trade</span>
          <span className="npip py"></span>
        </Link>
      </div>
      <div className="nb">
        <div className="nlbl">Finance</div>
        <Link href="/dashboard/wallet" className="ni">
          <span className="ic">◈</span>
          <span>Wallet</span>
        </Link>
        <Link href="/dashboard/community" className="ni">
          <span className="ic">◉</span>
          <span>Community</span>
        </Link>
        <Link href="/dashboard/reports" className="ni">
          <span className="ic">📋</span>
          <span>Reports</span>
        </Link>
      </div>
      <div className="nb">
        <div className="nlbl">Account</div>
        <Link href="/dashboard/profile" className="ni">
          <span className="ic">◎</span>
          <span>Profile</span>
        </Link>
        <Link href="/dashboard/settings" className="ni">
          <span className="ic">⚙</span>
          <span>Settings</span>
        </Link>
      </div>
      <div className="sb-bot">
        <div className="urow">
          <div className="uava">A</div>
          <div className="uinfo">
            <div className="uname">arbion123</div>
            <div className="ulvl">★ PRO TRADER · LV.12</div>
          </div>
          <div className="uarr">›</div>
        </div>
        <div className="chs">
          <div className="cp eth">ETH</div>
          <div className="cp sol">SOL</div>
          <div className="cp bsc">BSC</div>
        </div>
      </div>
    </aside>
  );
}