import  { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// Crea el tipado de tu valor de contexto:
type UserType = {
  id: number;
  email: string;
  client?: {
    first_name: string;
    last_name: string;
    // otros campos...
  };
  vendor?: {
    name: string;
    // otros campos...
  };
  // staff?: { ... };
  // etc.
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      try {
        if (token) {
          const { data } = await axios.get("/me");
          setUser({
            ...data.user,
            client: data.client,
            vendor: data.vendor,
            // staff: data.staff,
          });
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
        setToken(null);
        localStorage.removeItem("access_token");
      }
      setLoading(false);
    }
    fetchUser();
    // eslint-disable-next-line
  }, [token]);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/login", { email, password });
      setToken(data.access_token);
      localStorage.setItem("access_token", data.access_token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.access_token}`;

      // Haz un GET /me para cargar el usuario expandido del backend
      const { data: meData } = await axios.get("/me");
      setUser({
        ...meData.user,
        client: meData.client,
        vendor: meData.vendor,
        staff: meData.staff,
      });

      setLoading(false);
      return true;
    } catch {
      setUser(null);
      setToken(null);
      setLoading(false);
      return false;
    }
  };

  const logout = async () => {
    try {
      await axios.post("/logout");
    } catch {}
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook de acceso tipado
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
