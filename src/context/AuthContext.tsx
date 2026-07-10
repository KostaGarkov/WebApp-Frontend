import { createContext, useContext, useState } from "react";

interface AuthContextType {
    token: string | null;
    login: (token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    token: null,
    login: () => {},
    logout: () => {}
});

export function AuthProvider({ children }: any) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );

    const login = (jwt: string) => {
        setToken(jwt);
        localStorage.setItem("token", jwt);
    };

    const logout = () => {
        setToken(null);
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
