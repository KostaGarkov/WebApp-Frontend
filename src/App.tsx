import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./components/Dashboard";
import UserList from "./components/UserList";
import ProtectedLayout from "./components/ProtectedLayout";
import RoleList from "./roles/RoleList";
import RoleCreate from "./roles/RoleCreate";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Всичко защитено влиза тук */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings/users" element={<UserList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/roles/create" element={<RoleCreate />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;