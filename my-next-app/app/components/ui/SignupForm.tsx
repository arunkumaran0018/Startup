"use client";

import { useState } from "react";

interface SignupFormProps {
  onSwitch: () => void;
}

interface Fields {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

export default function SignupForm({ onSwitch }: SignupFormProps) {
  const [fields, setFields] = useState<Fields>({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<Fields>>({});
  const [success, setSuccess] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const strength = (() => {
    const p = fields.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();

  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
  const strengthColor = ["", "#f87171", "#fb923c", "#facc15", "#4ade80"][
    strength
  ];

  const validate = () => {
    const e: Partial<Fields> = {};
    if (!fields.name.trim()) e.name = "Name is required";
    if (!fields.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(fields.email))
      e.email = "Enter a valid email";
    if (!fields.password) e.password = "Password is required";
    else if (fields.password.length < 8)
      e.password = "At least 8 characters required";
    if (!fields.confirm) e.confirm = "Please confirm your password";
    else if (fields.confirm !== fields.password)
      e.confirm = "Passwords do not match";
    return e;
  };

  const set =
    (key: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((f) => ({ ...f, [key]: e.target.value }));
      setErrors((err) => ({ ...err, [key]: undefined }));
    };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    if (!agreed) {
      alert("Please agree to the terms.");
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1600));
    setLoading(false);
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="sf-success">
        <div className="success-check">✓</div>
        <h2>Account created!</h2>
        <p>Check your inbox to verify your email.</p>
        <button className="back-btn" onClick={onSwitch}>
          Sign in now →
        </button>
        <style>{successStyles}</style>
      </div>
    );
  }

  return (
    <div className="sf-wrap">
      <h2 className="form-title">Create account</h2>

      <div className={`field ${errors.name ? "has-error" : ""}`}>
        <label>Full name</label>
        <div className="input-wrap">
          <span className="input-icon">👤</span>
          <input
            type="text"
            placeholder="Jane Smith"
            value={fields.name}
            onChange={set("name")}
          />
        </div>
        {errors.name && <p className="field-error">{errors.name}</p>}
      </div>

      <div className={`field ${errors.email ? "has-error" : ""}`}>
        <label>Email address</label>
        <div className="input-wrap">
          <span className="input-icon">✉</span>
          <input
            type="email"
            placeholder="you@example.com"
            value={fields.email}
            onChange={set("email")}
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
            placeholder="Min. 8 characters"
            value={fields.password}
            onChange={set("password")}
          />
          <button className="pw-toggle" onClick={() => setShowPw((v) => !v)}>
            {showPw ? "🙈" : "👁"}
          </button>
        </div>
        {fields.password && (
          <div className="strength-row">
            <div className="strength-bars">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="strength-bar"
                  style={{
                    background:
                      i <= strength ? strengthColor : "rgba(255,255,255,0.1)",
                    transition: "background 0.3s",
                  }}
                />
              ))}
            </div>
            <span className="strength-label" style={{ color: strengthColor }}>
              {strengthLabel}
            </span>
          </div>
        )}
        {errors.password && <p className="field-error">{errors.password}</p>}
      </div>

      <div className={`field ${errors.confirm ? "has-error" : ""}`}>
        <label>Confirm password</label>
        <div className="input-wrap">
          <span className="input-icon">🔒</span>
          <input
            type={showPw ? "text" : "password"}
            placeholder="Re-enter your password"
            value={fields.confirm}
            onChange={set("confirm")}
          />
          {fields.confirm && fields.confirm === fields.password && (
            <span className="match-check">✓</span>
          )}
        </div>
        {errors.confirm && <p className="field-error">{errors.confirm}</p>}
      </div>

      <label className="agree-label">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <span>
          I agree to the{" "}
          <a href="#" className="link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="link">
            Privacy Policy
          </a>
        </span>
      </label>

      <button className="submit-btn" onClick={handleSubmit} disabled={loading}>
        {loading ? <span className="spinner" /> : "Create Account"}
      </button>

      <p className="switch-prompt">
        Already have an account?{" "}
        <button className="switch-link" onClick={onSwitch}>
          Sign in
        </button>
      </p>

      <style>{formStyles}</style>
    </div>
  );
}

const formStyles = `
.sf-wrap { display: flex; flex-direction: column; }
.form-title { font-size: 1.5rem; font-weight: 700; color: #fff; letter-spacing: -0.3px; }
.form-sub { font-size: 0.85rem; color: rgba(255,255,255,0.5); margin-top: 0.25rem; margin-bottom: 1.25rem; }

.field { display: flex; flex-direction: column; gap: 5px; margin-bottom: 0.85rem; }
.field label { font-size: 0.82rem; font-weight: 500; color: rgba(255,255,255,0.7); }
.input-wrap { position: relative; display: flex; align-items: center; }
.input-icon { position: absolute; left: 12px; font-size: 0.9rem; opacity: 0.5; pointer-events: none; }
.input-wrap input {
  width: 100%; padding: 0.62rem 2.5rem;
  background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px; color: #fff; font-family: 'Outfit',sans-serif;
  font-size: 0.9rem; outline: none; transition: all 0.2s;
}
.input-wrap input::placeholder { color: rgba(255,255,255,0.25); }
.input-wrap input:focus { border-color: #3b82f6; background: rgba(59,130,246,0.08); box-shadow: 0 0 0 3px rgba(59,130,246,0.15); }
.has-error .input-wrap input { border-color: #f87171; background: rgba(248,113,113,0.06); }
.field-error { font-size: 0.78rem; color: #f87171; }
.pw-toggle { position: absolute; right: 10px; background: none; border: none; cursor: pointer; font-size: 0.9rem; opacity: 0.5; transition: opacity 0.2s; }
.pw-toggle:hover { opacity: 1; }
.match-check { position: absolute; right: 10px; color: #4ade80; font-size: 0.9rem; }

.strength-row { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
.strength-bars { display: flex; gap: 4px; flex: 1; }
.strength-bar { height: 3px; flex: 1; border-radius: 2px; }
.strength-label { font-size: 0.75rem; font-weight: 500; min-width: 40px; }

.agree-label { display: flex; align-items: flex-start; gap: 8px; font-size: 0.8rem; color: rgba(255,255,255,0.55); cursor: pointer; margin-bottom: 1.1rem; line-height: 1.5; }
.agree-label input[type=checkbox] { margin-top: 2px; accent-color: #3b82f6; flex-shrink: 0; }
.link { color: #60a5fa; text-decoration: none; }
.link:hover { color: #93c5fd; }

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

.spinner { width:20px; height:20px; border:2px solid rgba(255,255,255,0.3); border-top-color:white; border-radius:50%; animation:spin 0.7s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.switch-prompt { text-align:center; font-size:0.83rem; color:rgba(255,255,255,0.45); margin-top:1rem; }
.switch-link { background:none; border:none; color:#60a5fa; cursor:pointer; font-family:'Outfit',sans-serif; font-size:0.83rem; font-weight:500; transition:color 0.2s; }
.switch-link:hover { color:#93c5fd; }
`;

const successStyles = `
.sf-success { display:flex; flex-direction:column; align-items:center; text-align:center; gap:12px; padding:2rem 0; animation:fadeIn 0.5s both; }
@keyframes fadeIn { from{opacity:0;transform:scale(0.9)} to{opacity:1;transform:scale(1)} }
.success-check { width:64px; height:64px; border-radius:50%; background:linear-gradient(135deg,#22c55e,#16a34a); display:flex; align-items:center; justify-content:center; font-size:1.75rem; color:white; box-shadow:0 8px 24px rgba(34,197,94,0.4); }
.sf-success h2 { font-size:1.4rem; font-weight:700; color:#fff; }
.sf-success p { color:rgba(255,255,255,0.5); font-size:0.9rem; }
.back-btn { margin-top:8px; background:linear-gradient(135deg,#2563eb,#1d4ed8); border:none; border-radius:10px; color:white; font-family:'Outfit',sans-serif; font-size:0.9rem; font-weight:600; padding:0.6rem 1.5rem; cursor:pointer; transition:all 0.2s; box-shadow:0 6px 16px rgba(37,99,235,0.4); }
.back-btn:hover { transform:translateY(-1px); }
`;
