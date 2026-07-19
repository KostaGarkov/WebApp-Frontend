import Navbar from "./Navbar";
import { Outlet, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useLang } from "../i18n/LanguageContext";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");
  const { t } = useLang();

  // Приемаме string, защото Navbar подава string
  const [menuTitle, setMenuTitle] = useState<string>("home");

  useEffect(() => {
    // Валидираме ключа – ако не е познат, връщаме "home"
    const allowedKeys = ["home", "administration", "users", "roles"] as const;

    const key = allowedKeys.includes(menuTitle as any)
      ? (menuTitle as typeof allowedKeys[number])
      : "home";

    document.title = t(key);
  }, [menuTitle, t]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar onMenuChange={setMenuTitle} />
      <Outlet />
    </>
  );
}
