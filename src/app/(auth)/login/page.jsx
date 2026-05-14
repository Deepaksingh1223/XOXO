"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

// Country list for dropdown
const COUNTRIES = [
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
  { code: "DE", name: "Germany" },
  { code: "FR", name: "France" },
  { code: "JP", name: "Japan" },
  { code: "SG", name: "Singapore" },
  { code: "IN", name: "India" },
  { code: "BR", name: "Brazil" },
  { code: "MX", name: "Mexico" },
  { code: "ZA", name: "South Africa" },
];

export default function Register() {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(null);
  const [mmVisible, setMmVisible] = useState(false);
  const [mmState, setMmState] = useState("idle");

  const router = useRouter();

  // NEW: wallet sub-screen state — "main" | "get-wallet" | "qr"
  const [walletScreen, setWalletScreen] = useState("main");
  // NEW: which wallet is showing QR
  const [qrWallet, setQrWallet] = useState(null);
  // NEW: clipboard copy state
  const [copied, setCopied] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Form state
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [referralCode, setReferralCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const validateUsername = (value) => {
    const regex = /^[a-zA-Z0-9]+$/;
    if (value.length < 5) {
      setUsernameError("Username must be at least 5 characters");
      return false;
    } else if (!regex.test(value)) {
      setUsernameError("Letters and numbers only");
      return false;
    } else {
      setUsernameError("");
      return true;
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    validateUsername(value);
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (password && value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (confirmPassword && value !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const sendVerificationCode = () => {
    if (!email) { alert("Please enter your email first"); return; }
    if (!email.includes("@") || !email.includes(".")) { alert("Please enter a valid email address"); return; }
    setIsCodeSent(true);
    setCountdown(60);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) { clearInterval(timer); setIsCodeSent(false); return 0; }
        return prev - 1;
      });
    }, 1000);
    alert(`Verification code sent to ${email}`);
  };

  const handleLogin = () => {
    setLoginError("");
    
    if (!loginEmail) {
      setLoginError("Please enter your email");
      return;
    }
    if (!loginEmail.includes("@") || !loginEmail.includes(".")) {
      setLoginError("Please enter a valid email address");
      return;
    }
    if (!loginPassword) {
      setLoginError("Please enter your password");
      return;
    }
    if (loginPassword.length < 6) {
      setLoginError("Password must be at least 6 characters");
      return;
    }
    
    setIsRegistering(true);
    setTimeout(() => { 
      setIsRegistering(false); 
      alert("Login successful! Welcome back to DexChainPro!");
      router.push('/dashboard');
    }, 2000);
  };

  const handleRegister = () => {
    if (!username || usernameError) { alert("Please enter a valid username (min 5 chars, letters/numbers only)"); return; }
    if (!selectedCountry) { alert("Please select your country"); return; }
    if (!email || !email.includes("@") || !email.includes(".")) { alert("Please enter a valid email address"); return; }
    if (!verificationCode) { alert("Please enter the verification code"); return; }
    if (!password) { alert("Please enter a password"); return; }
    if (password !== confirmPassword) { alert("Passwords do not match"); return; }
    if (password.length < 6) { alert("Password must be at least 6 characters"); return; }
    setIsRegistering(true);
    setTimeout(() => { setIsRegistering(false); alert("Registration successful! Welcome to DexChainPro!"); setActiveTab("login"); }, 2000);
  };

  const handleWallet = (id) => {
    if (id === "metamask") {
      setMmVisible(true);
      setMmState("idle");
      return;
    }
    if (id === "walletconnect") {
      setQrWallet(WALLETS.find((w) => w.id === "walletconnect"));
      setWalletScreen("qr");
      return;
    }
    if (connectingWallet === id) return;
    setConnectingWallet(id);
    setTimeout(() => setConnectingWallet(null), 2500);
  };

  const doConnect = () => {
    setMmState("connecting");
    setTimeout(() => setMmState("connected"), 2200);
  };

  const closeMM = () => {
    setMmVisible(false);
    setMmState("idle");
  };

  const handleCopyClipboard = () => {
    const fakeUri = "wc:a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6@2?relay-protocol=irn&symKey=abc123";
    navigator.clipboard.writeText(fakeUri).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
    setWalletScreen("main");
  };

  return (
    <>
    <link rel="stylesheet" href="/assets/css/login.css" />
      <div className="dcp-scene">
        <div className="dcp-modal">
          <div className="dcp-modal-glow" />

          {/* Header */}
          <div className="dcp-modal-header">
            <div className="dcp-brand">
              <span className="dcp-brand-name">
                DexChain<span>Pro</span>
              </span>
            </div>
          </div>

          {/* Tabs */}
          <div className="dcp-tabs">
            <button
              className={`dcp-tab ${activeTab === "login" ? "dcp-tab-active" : "dcp-tab-inactive"}`}
              onClick={() => handleTabSwitch("login")}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Email Login
            </button>
            <button
              className={`dcp-tab ${activeTab === "register" ? "dcp-tab-active" : "dcp-tab-inactive"}`}
              onClick={() => handleTabSwitch("register")}
            >
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              Register
            </button>
          </div>

          <div className="dcp-body">
            {/* LOGIN PANEL */}
            {activeTab === "login" && (
              <div>
                <p className="dcp-greeting">
                  Welcome <span>Back</span>
                </p>
                <p className="dcp-sub">Login to your DexChainPro account</p>

                {/* Email Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Email Address</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="dcp-field-input"
                      placeholder="Enter your email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Password</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="dcp-field-input"
                      placeholder="Enter your password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                    />
                    <button className="dcp-eye-btn" onClick={() => setShowPassword(!showPassword)} type="button">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

             
                 <a href="/forgot" className="dcp-signup text-white">Forget Passwrod</a>
 

                <button className="dcp-btn-primary" onClick={handleLogin} disabled={isRegistering}>
                  {isRegistering ? (
                    <>
                      <span className="dcp-ring" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                      Logging in...
                    </>
                  ) : (
                    <>
                      Login
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="dcp-divider">or</div>

                <p className="dcp-signup">
                  Don't have an account?
                  <button onClick={() => handleTabSwitch("register")} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontWeight: "600" }}>Sign up</button>
                </p>
              </div>
            )}

            {/* REGISTER PANEL */}
            {activeTab === "register" && (
              <div>
                <p className="dcp-greeting">
                  Create <span>Account</span>
                </p>
                <p className="dcp-sub">Join DexChainPro to start trading</p>

                {/* Username Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Username</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className={`dcp-field-input ${usernameError ? "dcp-field-input-error" : ""}`}
                      placeholder="Min 5 chars, letters and numbers only"
                      value={username}
                      onChange={handleUsernameChange}
                    />
                  </div>
                  {usernameError && <div className="dcp-error-text">{usernameError}</div>}
                </div>

                {/* Country Select */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Country</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    <select
                      className="dcp-select-input"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map((country) => (
                        <option key={country.code} value={country.name}>{country.name}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Email Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Email</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <input
                      type="email"
                      className="dcp-field-input"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Verification Code */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Verification Code</label>
                  <div className="dcp-code-row">
                    <div className="dcp-field-wrap">
                      <span className="dcp-field-icon">
                        <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </span>
                      <input
                        type="text"
                        className="dcp-field-input"
                        placeholder="Enter verification code"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                    </div>
                    <button
                      className="dcp-get-code-btn"
                      onClick={sendVerificationCode}
                      disabled={isCodeSent && countdown > 0}
                    >
                      {isCodeSent && countdown > 0 ? `${countdown}s` : "Get Code"}
                    </button>
                  </div>
                </div>

                {/* Password Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Password</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="dcp-field-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <button className="dcp-eye-btn" onClick={() => setShowPassword(!showPassword)} type="button">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Confirm Password</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className={`dcp-field-input ${confirmPasswordError ? "dcp-field-input-error" : ""}`}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <button className="dcp-eye-btn" onClick={() => setShowConfirmPassword(!showConfirmPassword)} type="button">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>
                  {confirmPasswordError && <div className="dcp-error-text">{confirmPasswordError}</div>}
                </div>

                {/* Referral Code Field */}
                <div className="dcp-field">
                  <label className="dcp-field-label">Referral Code (Optional)</label>
                  <div className="dcp-field-wrap">
                    <span className="dcp-field-icon">
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      className="dcp-field-input"
                      placeholder="Enter referral code (optional)"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                    />
                  </div>
                </div>

                <button className="dcp-btn-primary" onClick={handleRegister} disabled={isRegistering}>
                  {isRegistering ? (
                    <>
                      <span className="dcp-ring" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Register
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="dcp-divider">or</div>

                <p className="dcp-signup">
                  Already have an account?
                  <button onClick={() => handleTabSwitch("login")} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontWeight: "600" }}>Login</button>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="dcp-modal-footer">
            <span className="dcp-footer-item">
              <svg width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              SSL Encrypted
            </span>
            <span className="dcp-fdot" />
            <span className="dcp-footer-item">Non-Custodial</span>
            <span className="dcp-fdot" />
            <span className="dcp-footer-item">FinCEN MSB</span>
          </div>
        </div>
      </div>

      {/* MetaMask Popup */}
      {mmVisible && (
        <div
          className="dcp-mm-overlay"
          onClick={(e) => { if (e.target === e.currentTarget) closeMM(); }}
        >
          <div className="dcp-mm-popup">
            <div className="dcp-mm-header">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="dcp-mm-logo"
                src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg"
                alt="MetaMask"
              />
              <div className="dcp-mm-title">MetaMask wants to connect</div>
              <span className="dcp-mm-url">dex-chain-pro.vercel.app</span>
            </div>

            {mmState === "idle" && (
              <div className="dcp-mm-body">
                <div className="dcp-mm-info-row">
                  <div className="dcp-mm-info-icon">
                    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="dcp-mm-info-text">
                    <strong>DexChainPro is requesting access</strong>
                    This site wants to connect to your MetaMask wallet and view your account address.
                  </div>
                </div>
                <div className="dcp-mm-perms">
                  <div className="dcp-mm-perms-title">Permissions requested</div>
                  {["View your wallet address", "View account balance & activity", "Request transaction approval"].map((perm) => (
                    <div className="dcp-mm-perm-row" key={perm}>
                      <span className="dcp-mm-check">
                        <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                          <path d="M1.5 5l2.5 2.5 5-5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {perm}
                    </div>
                  ))}
                </div>
                <div className="dcp-mm-btns">
                  <button className="dcp-mm-btn-cancel" onClick={closeMM}>Cancel</button>
                  <button className="dcp-mm-btn-connect" onClick={doConnect}>Connect</button>
                </div>
              </div>
            )}

            {mmState === "connecting" && (
              <div className="dcp-mm-status">
                <div className="dcp-mm-status-ring" />
                <div className="dcp-mm-status-text">Connecting to MetaMask...</div>
                <div className="dcp-mm-status-sub">Please approve in your MetaMask extension</div>
              </div>
            )}

            {mmState === "connected" && (
              <div className="dcp-mm-connected">
                <div className="dcp-mm-connected-check">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="dcp-mm-connected-text">Wallet Connected!</div>
                <div className="dcp-mm-connected-addr">0x742d...4a2F</div>
                <div className="dcp-mm-connected-net">MetaMask · Ethereum Mainnet</div>
                <button className="dcp-mm-connected-btn" onClick={closeMM}>
                  Continue to Dashboard →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}