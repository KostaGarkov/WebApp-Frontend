import { Link, useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLang } from "../i18n/LanguageContext";
import { useState, useRef, useEffect } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const { t } = useLang();

  const [showAdmin, setShowAdmin] = useState(false);

  const adminRef = useRef<HTMLSpanElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      if (
        showAdmin &&
        menuRef.current &&
        adminRef.current &&
        !menuRef.current.contains(target) &&
        !adminRef.current.contains(target)
      ) {
        setShowAdmin(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showAdmin]);

  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px",
      background: "#f5f5f5"
    },
    left: {
      display: "flex",
      gap: "20px",
      alignItems: "center"
    },
    link: {
      textDecoration: "none",
      color: "#333",
      cursor: "pointer"
    },
    dropdownItem: {
      display: "block",
      padding: "8px 12px",
      textDecoration: "none",
      color: "#333",
      borderRadius: "4px"
    }
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/dashboard" style={styles.link}>{t("home")}</Link>

        <div style={{ position: "relative" }}>
          <span
            ref={adminRef}
            style={styles.link}
            onClick={() => setShowAdmin(prev => !prev)}
          >
            {t("administration")} ▾
          </span>

          {showAdmin && (
            <div
              ref={menuRef}
              style={{
                position: "absolute",
                top: "28px",
                left: "0",
                background: "white",
                border: "1px solid #ddd",
                padding: "10px",
                borderRadius: "6px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                minWidth: "160px",
                zIndex: 10
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: "-8px",
                  left: "12px",
                  width: "0",
                  height: "0",
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: "8px solid white"
                }}
              />

              <Link
                to="/settings/users"
                style={styles.dropdownItem}
                onClick={() => setShowAdmin(false)}
              >
                {t("users")}
              </Link>

              <Link
                to="/roles"
                style={styles.dropdownItem}
                onClick={() => setShowAdmin(false)}
              >
                {t("roles")}
              </Link>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <LanguageSwitcher />
        <span style={styles.link} onClick={handleLogout}>{t("logout")}</span>
      </div>
    </nav>
  );
}
