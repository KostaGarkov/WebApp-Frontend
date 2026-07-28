import React, { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
    sub: string;
    username: string;
    email: string;
    roles: string[];
    permissions: string[];
    exp: number;
}

interface AuthState {
    token: string | null;
    username: string | null;
    email: string | null;
    roles: string[];
    permissions: string[];
    isAuthenticated: boolean;
}

interface AuthContextType extends AuthState {
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [auth, setAuth] = useState<AuthState>({
        token: null,
        username: null,
        email: null,
        roles: [],
        permissions: [],
        isAuthenticated: false
    });

    const login = (token: string) => {
        const decoded = jwtDecode<DecodedToken>(token);

        setAuth({
            token,
            username: decoded.username,
            email: decoded.email,
            roles: decoded.roles || [],
            permissions: decoded.permissions || [],
            isAuthenticated: true
        });

        localStorage.setItem("token", token);
    };

    const logout = () => {
        setAuth({
            token: null,
            username: null,
            email: null,
            roles: [],
            permissions: [],
            isAuthenticated: false
        });

        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ ...auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};