import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLang } from "../../i18n/LanguageContext";
import LanguageSwitcher from "../LanguageSwitcher";
import "./Login.css";

export default function LoginForm() {
  const navigate = useNavigate();
  const { t, lang } = useLang();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) {
      setError(t("enterEmail"));
      return;
    }

    if (!password.trim()) {
      setError(t("enterPassword"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setError(t("invalidEmail"));
      return;
    }

    try {
      const response = await fetch("https://localhost:7137/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept-Language": lang
        },
        body: JSON.stringify({ email, password })
      });


      if (!response.ok) {
        setError(t("invalidEmailPassword"));
        return;
      }

      const data = await response.json();

      localStorage.setItem("token", data.token);
      navigate("/dashboard");
    } catch (err) {
      setError(t("errorConnectingServer"));
    }
  }

  return (
    <form className="login-box" onSubmit={handleSubmit}>
      <div className="login-lang">
        <LanguageSwitcher />
      </div>

      <h2 className="login-title">{t("login")}</h2>

      {/* Имейл поле */}
      <div className="input-wrapper">
        <span className="input-icon">📧</span>
        <input
          type="text"
          placeholder={t("email")}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
        />
      </div>

      {/* Парола поле */}
      <div className="input-wrapper">
        <span className="input-icon">🔒</span>

        <input
          type={showPassword ? "text" : "password"}
          placeholder={t("password")}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
        />

        <button
          type="button"
          className="show-password-btn"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? "🙈" : "👁️"}
        </button>
      </div>

      <button
        type="submit"
        className="login-button"
        disabled={!email.trim() || !password.trim()}
      >
        {t("login")}
      </button>

      {error && (
        <div className="login-error">
          {error}
        </div>
      )}
    </form>
  );
}
