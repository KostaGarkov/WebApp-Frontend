import LoginForm from "../components/Login/LoginForm";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#e9eef3",
        flexDirection: "column"
      }}
    >
      <LoginForm />
    </div>
  );
}
