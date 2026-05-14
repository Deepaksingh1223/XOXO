'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
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
               XOXO<span>FX </span>
              </span>
            </div>
          </div>

          <div className="dcp-body">
            {!submitted ? (
              <>
                <p className="dcp-greeting">
                  Forgot <span>Password?</span>
                </p>
                <p className="dcp-sub">Enter your registered email address to reset your password</p>

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
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <button className="dcp-btn-primary" onClick={handleSubmit} disabled={!email || loading}>
                  {loading ? (
                    <>
                      <span className="dcp-ring" style={{ borderColor: "rgba(255,255,255,0.3)", borderTopColor: "#fff" }} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Link
                      <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>

                <div className="dcp-divider">or</div>

                <p className="dcp-signup">
                  Remember your password?
                  <Link href="/login"> Back to Login</Link>
                </p>
              </>
            ) : (
              <div style={{ textAlign: "center" }}>
                <div style={{ marginBottom: "24px" }}>
                  <svg width="64" height="64" fill="none" viewBox="0 0 24 24" stroke="#00b894" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="dcp-greeting" style={{ fontSize: "1.5rem" }}>
                  Check Your <span>Email</span>
                </p>
                <p className="dcp-sub" style={{ marginBottom: "24px" }}>
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
                <button 
                  className="dcp-btn-primary" 
                  onClick={() => setSubmitted(false)}
                  style={{ background: "transparent", border: "1.5px solid #00b894", color: "#00b894", marginTop: "8px" }}
                >
                  Send to another email
                </button>
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
    </>
  );
}