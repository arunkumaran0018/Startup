"use client";

import { useState } from "react";
import LoginForm from "../components/ui/LoginForm";
import SignupForm from "../components/ui/SignupForm";
// Removed lucide-react import to avoid module/type errors; using simple emojis/icons instead where needed

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="auth-root">
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="auth-container">
        <div className="brand-panel">
          <div className="brand-inner">
            <div className="logo-mark">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeOpacity="0.4"
                />
                <circle
                  cx="24"
                  cy="24"
                  r="13"
                  fill="white"
                  fillOpacity="0.15"
                />
                <path
                  d="M16 24 L24 14 L32 24 L24 34 Z"
                  fill="white"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <h1 className="brand-name">Loki&Co</h1>
            <p className="brand-tagline">Secure. Fast. Yours.</p>

            <ul className="brand-features">
              {[
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  ),
                  text: "Secured Bussiness-Grade Encryption",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                    </svg>
                  ),
                  text: "Customer Friendly Support",
                },
                {
                  icon: (
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  ),
                  text: "99.99% service guaranteed",
                },
              ].map((f) => (
                <li key={f.text} className="brand-feature-item">
                  <span className="feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            {/* <div className="social-proof">
              <div className="avatars">
                {["A", "B", "C", "D"].map((l, i) => (
                  <div key={l} className="avatar" style={{ zIndex: 4 - i }}>
                    {l}
                  </div>
                ))}
              </div>
              <p className="social-text">
                Trusted by <strong>40,000+</strong> professionals
              </p>
            </div> */}
          </div>
        </div>

        <div className="form-panel">
          <div className="tab-switcher">
            <button
              className={`tab-btn ${mode === "login" ? "active" : ""}`}
              onClick={() => setMode("login")}
            >
              Sign In
            </button>
            <button
              className={`tab-btn ${mode === "signup" ? "active" : ""}`}
              onClick={() => setMode("signup")}
            >
              Create Account
            </button>
            <div
              className={`tab-indicator ${mode === "signup" ? "right" : ""}`}
            />
          </div>

          <div className="form-area">
            {mode === "login" ? (
              <LoginForm onSwitch={() => setMode("signup")} />
            ) : (
              <SignupForm onSwitch={() => setMode("login")} />
            )}
          </div>
        </div>
      </div>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .auth-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #040e24;
          font-family: 'Outfit', sans-serif;
          overflow: hidden;
          position: relative;
          padding: 1.5rem;
        }

        .bg-blobs { position: fixed; inset: 0; pointer-events: none; }
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.25;
          animation: drift 18s ease-in-out infinite alternate;
        }
        .blob-1 { width: 600px; height: 600px; background: #2563eb; top: -200px; left: -150px; animation-delay: 0s; }
        .blob-2 { width: 500px; height: 500px; background: #1d4ed8; bottom: -150px; right: -100px; animation-delay: -6s; }
        .blob-3 { width: 350px; height: 350px; background: #60a5fa; top: 40%; left: 55%; animation-delay: -12s; }
        @keyframes drift {
          from { transform: translate(0, 0) scale(1); }
          to   { transform: translate(40px, 30px) scale(1.08); }
        }

        .auth-container {
          display: flex;
          width: 100%;
          max-width: 920px;
          min-height: 580px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          backdrop-filter: blur(24px);
          overflow: hidden;
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08);
          animation: slideUp 0.6s cubic-bezier(.22,1,.36,1) both;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .brand-panel {
          flex: 0 0 42%;
          background: linear-gradient(145deg, #1d4ed8 0%, #1e40af 40%, #1e3a8a 100%);
          padding: 3rem 2.5rem;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
        }
        .brand-panel::before {
          content: '';
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          top: -80px; right: -80px;
        }
        .brand-panel::after {
          content: '';
          position: absolute;
          width: 200px; height: 200px;
          border-radius: 50%;
          background: rgba(255,255,255,0.04);
          bottom: -50px; left: -40px;
        }
        .brand-inner { position: relative; z-index: 1; }

        .logo-mark {
          width: 52px; height: 52px;
          margin-bottom: 1rem;
          animation: spinIn 0.8s cubic-bezier(.22,1,.36,1) 0.3s both;
        }
        @keyframes spinIn {
          from { opacity: 0; transform: rotate(-20deg) scale(0.6); }
          to   { opacity: 1; transform: rotate(0) scale(1); }
        }
        .logo-mark svg { width: 100%; height: 100%; }

        .brand-name {
          font-size: 2rem; font-weight: 700; color: #fff;
          letter-spacing: -0.5px;
          animation: fadeSlide 0.6s 0.4s both;
        }
        .brand-tagline {
          font-size: 0.95rem; color: rgba(255,255,255,0.65);
          margin-top: 0.25rem; margin-bottom: 2.5rem;
          animation: fadeSlide 0.6s 0.5s both;
        }
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateX(-12px); }
          to   { opacity: 1; transform: translateX(0); }
        }

        .brand-features { list-style: none; display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
        .brand-feature-item {
          display: flex; align-items: center; gap: 0.75rem;
          font-size: 0.875rem; color: rgba(255,255,255,0.85);
          animation: fadeSlide 0.6s both;
        }
        .brand-feature-item:nth-child(1) { animation-delay: 0.55s; }
        .brand-feature-item:nth-child(2) { animation-delay: 0.65s; }
        .brand-feature-item:nth-child(3) { animation-delay: 0.75s; }
        .feature-icon {
          font-size: 1.1rem; width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.12); border-radius: 8px; flex-shrink: 0;
        }

        .social-proof { display: flex; align-items: center; gap: 0.75rem; animation: fadeSlide 0.6s 0.85s both; }
        .avatars { display: flex; }
        .avatar {
          width: 30px; height: 30px; border-radius: 50%;
          background: linear-gradient(135deg, #60a5fa, #3b82f6);
          border: 2px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem; font-weight: 600; color: white;
          margin-left: -8px;
        }
        .avatar:first-child { margin-left: 0; }
        .social-text { font-size: 0.8rem; color: rgba(255,255,255,0.7); }
        .social-text strong { color: white; }

        .form-panel {
          flex: 1; padding: 2.5rem 2.5rem 2rem;
          display: flex; flex-direction: column;
        }

        .tab-switcher {
          display: flex; background: rgba(255,255,255,0.06);
          border-radius: 12px; padding: 4px;
          position: relative; margin-bottom: 2rem;
        }
        .tab-btn {
          flex: 1; padding: 0.55rem 0; border: none;
          background: transparent; color: rgba(255,255,255,0.5);
          font-family: 'Outfit', sans-serif; font-size: 0.9rem; font-weight: 500;
          cursor: pointer; border-radius: 9px; position: relative; z-index: 1;
          transition: color 0.25s;
        }
        .tab-btn.active { color: #fff; }
        .tab-indicator {
          position: absolute; top: 4px; left: 4px;
          width: calc(50% - 4px); height: calc(100% - 8px);
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border-radius: 9px;
          transition: transform 0.3s cubic-bezier(.22,1,.36,1);
          box-shadow: 0 4px 12px rgba(37,99,235,0.5);
        }
        .tab-indicator.right { transform: translateX(calc(100% + 8px)); }

        .form-area { flex: 1; display: flex; flex-direction: column; justify-content: center; }

        @media (max-width: 680px) {
          .auth-container { flex-direction: column; }
          .brand-panel { flex: none; padding: 2rem 1.75rem; }
          .brand-features { display: none; }
          .form-panel { padding: 1.75rem 1.5rem 1.5rem; }
        }
      `}</style>
    </div>
  );
}
