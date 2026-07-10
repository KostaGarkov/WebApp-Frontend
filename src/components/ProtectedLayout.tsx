import Navbar from "./Navbar";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedLayout() {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
