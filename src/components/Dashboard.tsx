import { useLang } from "../i18n/LanguageContext";

export default function Dashboard() {
  const { t } = useLang();

  return (
    <>
      <div style={styles.container}>
        <h1 style={styles.title}>{t("welcomeToTheSystem")}</h1>

        <img
          src="/welcome.png"
          alt={t("welcome")}
          style={styles.image}
        />
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "40px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  title: {
    fontSize: "32px",
    marginBottom: "20px"
  },
  image: {
    width: "350px"
  }
};
