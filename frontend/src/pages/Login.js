import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, rolePanelPath } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { Eye, EyeClosed, UserRound } from "lucide-react";
import DatabaseErrorHandler from "../components/DatabaseErrorHandler";
import "./Login.css";
import { siteConfig, isDemoMode } from "../config/siteConfig";
import { demoAccounts } from "../demo/demoData";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [passvisibility, setPassvisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errorObject, setErrorObject] = useState(null);

  const navigate = useNavigate();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");
    setErrorObject(null);

    try {
      const session = await api.login({
        username: phone,
        password: pass,
      });

      // ذخیره session + بروزرسانی AuthContext
      login(session);

      // انتقال مستقیم به پنل رول خودش
      navigate(rolePanelPath(session.user.role), {
        replace: true,
      });
    } catch (err) {
      setErrorObject(err);
      setError(err.message || "ورود ناموفق بود.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-root" dir="rtl">

      <div className="login-bg">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      <div className="login-inner">

        <div className="login-card">

          <div className="login-brand">

            <div className="brand-icon">
              🎯
            </div>

            <div className="brand-content">

              <h1>
                {siteConfig.instituteName}
              </h1>

              <p className="subtitle">
                {siteConfig.instituteNameEn}
              </p>

              <p className="tagline">
                {siteConfig.tagline}
              </p>

            </div>

          </div>

          {isDemoMode && demoAccounts && (
            <div className="login-demo-hint">
              <div className="login-demo-title">حساب‌های آزمایشی نسخه دمو (کلیک برای درج)</div>
              <table className="login-demo-table">
                <tbody>
                  {Object.values(demoAccounts).map((acc) => (
                    <tr key={acc.username}>
                      <td className="login-demo-role">{acc.label}</td>
                      <td dir="ltr" className="login-demo-code">{acc.username}</td>
                      <td dir="ltr" className="login-demo-code">{acc.password}</td>
                      <td>
                        <button
                          type="button"
                          className="login-demo-fill-btn"
                          onClick={() => {
                            setPhone(acc.username);
                            setPass(acc.password);
                          }}
                        >
                          انتخاب
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >

            <div className="field">

              <label htmlFor="phone">
                نام کاربری
              </label>

              <div className="input-wrap">

                <span className="input-password-toggle">
                  <UserRound />
                </span>

                <input
                  id="phone"
                  type="text"
                  placeholder="شماره تلفن همراه"
                  value={phone}
                  onChange={(e) =>
                    setPhone(e.target.value)
                  }
                  dir="ltr"
                  required
                />

              </div>

            </div>

            <div className="field">

              <label htmlFor="pass">
                رمز عبور
              </label>

              <div className="input-wrap">

                <input
                  id="pass"
                  type={
                    passvisibility
                      ? "text"
                      : "password"
                  }
                  placeholder="رمز عبور خود را وارد کنید"
                  value={pass}
                  onChange={(e) =>
                    setPass(e.target.value)
                  }
                  required
                />

                <button
                  type="button"
                  className="input-password-toggle"
                  onClick={() =>
                    setPassvisibility(
                      (prev) => !prev
                    )
                  }
                  aria-label={
                    passvisibility
                      ? "مخفی کردن رمز عبور"
                      : "نمایش رمز عبور"
                  }
                >
                  {passvisibility ? (
                    <EyeClosed size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>

              </div>

            </div>

            {errorObject ? (
              <DatabaseErrorHandler
                error={errorObject}
                onClose={() => {
                  setErrorObject(null);
                  setError("");
                }}
              />
            ) : (
              error && (
                <p className="login-error">
                  {error}
                </p>
              )
            )}

            <button
              type="submit"
              className={`btn-submit ${
                loading ? "loading" : ""
              }`}
              disabled={loading}
            >
              {loading ? (
                <span className="spinner" />
              ) : (
                "ورود به پنل"
              )}
            </button>

          </form>

          <p className="login-footer">
            <a href="/contact">
              در صورت فراموشی رمز برای گرفتن پسوورد
              به منشی مراجعه کنید.
            </a>
          </p>

        </div>

      </div>

    </div>
  );
}
