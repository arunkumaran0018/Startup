"use client";

import { useState } from "react";

interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({ onSwitch }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Enter a valid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";
    return e;
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="lf-success">
        <div className="success-check">✓</div>
        <h2>Welcome back!</h2>
        <p>Redirecting you to your dashboard…</p>
        <style>{successStyles}</style>
      </div>
    );
  }

  return (
    <div className="lf-wrap">
      <h2 className="form-title">Welcome back</h2>
      <p className="form-sub">Sign in to continue to your account</p>

      <div className="social-btns">
        <button className="social-btn">
          <span className="google-g">G</span>
          <span>Google</span>
        </button>
        <button className="social-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
          <span>Github</span>
        </button>
        <button className="social-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2.1v-2.9h2.1V9.4c0-2.1 1.3-3.3 3.2-3.3.9 0 1.8.16 1.8.16v2h-1c-1 0-1.3.62-1.3 1.25v1.5h2.3l-.37 2.9h-1.93v7A10 10 0 0 0 22 12z" />
          </svg>
          <span>Facebook</span>
        </button>
        <button className="social-btn">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
            <path d="M18.244 2H21l-6.27 7.17L22 22h-5.7l-4.47-6.4L6.24 22H3.48l6.7-7.66L2 2h5.85l4.04 5.78L18.24 2z" />
          </svg>
          <span>Twitter</span>
        </button>
      </div>

      <div className="divider">
        <span>or continue with email</span>
      </div>

      <div className={`field ${errors.email ? "has-error" : ""}`}>
        <label>Email address</label>
        <div className="input-wrap">
          <span className="input-icon">✉</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setErrors((x) => ({ ...x, email: undefined }))}
          />
        </div>
        {errors.email && <p className="field-error">{errors.email}</p>}
      </div>

      <div className={`field ${errors.password ? "has-error" : ""}`}>
        <label>Password</label>
        <div className="input-wrap">
          <span className="input-icon">🔒</span>
          <input
            type={showPw ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setErrors((x) => ({ ...x, password: undefined }))}
          />
          <button className="pw-toggle" onClick={() => setShowPw((v) => !v)}>
            {showPw ? "" : "👁"}
          </button>
        </div>
        {errors.password && <p className="field-error">{errors.password}</p>}
      </div>

      <div className="form-options">
        <label className="remember">
          <input type="checkbox" />
          <span>Remember me</span>
        </label>
        <a href="#" className="forgot-link">
          Forgot password?
        </a>
      </div>

      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <span className="spinner" /> : "Sign In"}
      </button>

      <p className="switch-prompt">
        Don&apos;t have an account?{" "}
        <button className="switch-link" onClick={onSwitch}>
          Create one
        </button>
      </p>

      <style>{formStyles}</style>
    </div>
  );
}

const formStyles = `
.lf-wrap { display: flex; flex-direction: column; gap: 0; }
.form-title { font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
.form-sub { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem; margin-bottom: 1.5rem; }

.social-btns { display: flex; gap: 10px; }
.social-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 0.6rem 0; border: 1px solid rgba(255,255,255,0.12);
  border-radius: 10px; background: rgba(255,255,255,0.05);
  color: rgba(255,255,255,0.8); font-family: 'Outfit',sans-serif;
  font-size: 0.85rem; cursor: pointer; transition: all 0.2s;
}
.social-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.2); transform: translateY(-1px); }
.google-g { font-size: 1rem; font-weight: 700; }

.divider {
  display: flex; align-items: center; gap: 12px;
  margin: 1.25rem 0; color: rgba(255,255,255,0.3); font-size: 0.8rem;
}
.divider::before, .divider::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.1); }

.field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 1rem; }
.field label { font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.7); }
.input-wrap { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 12px; font-size: 0.9rem; opacity: 0.5; pointer-events: none; }
.input-wrap input {
  width: 100%; padding: 0.65rem 2.5rem;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; color: #fff; font-family: 'Outfit',sans-serif;
  font-size: 0.9rem; outline: none; transition: all 0.2s;
}
.input-wrap input::placeholder { color: rgba(255,255,255,0.25); }
.input-wrap input:focus { border-color: #3b82f6; background: rgba(59,130,246,0.08); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
.has-error .input-wrap input { border-color: #f87171; background: rgba(248,113,113,0.08); }
.field-error { font-size: 0.78rem; color: #f87171; margin-top: -2px; }
.pw-toggle { position: absolute; right: 10px; background: none; border: none; cursor: pointer; font-size: 0.9rem; opacity: 0.5; transition: opacity 0.2s; }
.pw-toggle:hover { opacity: 1; }

.form-options { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; }
.remember { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: rgba(255,255,255,0.6); cursor: pointer; }
.remember input[type=checkbox] { width: 15px; height: 15px; accent-color: #3b82f6; }
.forgot-link { font-size: 0.82rem; color: #60a5fa; text-decoration: none; transition: color 0.2s; }
.forgot-link:hover { color: #93c5fd; }

.submit-btn {
  width: 100%; padding: 0.8rem; border: none; border-radius: 12px;
  background: linear-gradient(135deg, #2563eb, #1d4ed8);
  color: #fff; font-family: 'Outfit',sans-serif; font-size: 1rem; font-weight: 600;
  cursor: pointer; transition: all 0.2s;
  box-shadow: 0 8px 24px rgba(37,99,235,0.4);
  display: flex; align-items: center; justify-content: center; min-height: 48px;
}
.submit-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.5); }
.submit-btn:active:not(:disabled) { transform: translateY(0); }
.submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

.spinner {
  width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3);
  border-top-color: white; border-radius: 50%;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

.switch-prompt { text-align: center; font-size: 0.83rem; color: rgba(255,255,255,0.45); margin-top: 1.25rem; }
.switch-link { background: none; border: none; color: #60a5fa; cursor: pointer; font-family: 'Outfit',sans-serif; font-size: 0.83rem; font-weight: 500; transition: color 0.2s; }
.switch-link:hover { color: #93c5fd; }
`;

const successStyles = `
.lf-success { display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px; padding: 2rem 0; animation: fadeIn 0.5s both; }
@keyframes fadeIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
.success-check { width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,#22c55e,#16a34a); display:flex;align-items:center;justify-content:center; font-size:1.75rem;color:white; box-shadow:0 8px 24px rgba(34,197,94,0.4); }
.lf-success h2 { font-size:1.4rem;font-weight:700;color:#fff; }
.lf-success p { color:rgba(255,255,255,0.5);font-size:0.9rem; }
`;
