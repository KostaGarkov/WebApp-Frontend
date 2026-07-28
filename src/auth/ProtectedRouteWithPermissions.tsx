import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    permissions?: string[];
}

export const ProtectedRouteWithPermissions = ({ children, permissions }: Props) => {
    const auth = useAuth();

    // 1) Ако не е логнат → redirect
    if (!auth.isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // 2) Ако е администратор → винаги има достъп
    if (auth.roles.includes("Администратор")) {
        return <>{children}</>;
    }

    // 3) Ако няма permissions → няма достъп
    if (permissions && !permissions.every(p => auth.permissions.includes(p))) {
        return <Navigate to="/no-access" replace />;
    }

    return <>{children}</>;
};