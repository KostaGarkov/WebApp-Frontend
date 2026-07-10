import { useLang } from "../i18n/LanguageContext";

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <button
        onClick={() => setLang("bg")}
        disabled={lang === "bg"}
        style={styles.btn}
      >
        <img src="https://flagcdn.com/w20/bg.png" alt="BG" />
      </button>

      <button
        onClick={() => setLang("en")}
        disabled={lang === "en"}
        style={styles.btn}
      >
        <img src="https://flagcdn.com/w20/gb.png" alt="EN" />
      </button>
    </div>
  );
}

const styles = {
  btn: {
    background: "transparent",
    border: "none",
    cursor: "pointer",
    padding: "0",
    opacity: 1
  }
};
