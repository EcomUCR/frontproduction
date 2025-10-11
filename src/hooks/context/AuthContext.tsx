import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// ============================
// 🧩 Tipos de datos
// ============================

type StoreType = {
  id: number;
  user_id?: number;
  name: string;
  slug?: string;
  description?: string | null;
  image?: string | null;
  banner?: string | null;
  category_id?: number | null;
  business_name?: string | null;
  tax_id?: string | null;
  legal_type?: string | null;
  registered_address?: string | null;
  support_email?: string | null;
  support_phone?: string | null;
  is_verified?: boolean | null;
  verification_date?: string | null;
  status?: "ACTIVE" | "SUSPENDED" | "CLOSED" | null | string;
};

type UserType = {
  image: string;
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  store?: StoreType | null;
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
};

// ============================
// ⚙️ Creación del contexto
// ============================

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("access_token")
  );
  const [loading, setLoading] = useState<boolean>(false);

  // ============================
  // 🔄 Cargar usuario autenticado
  // ============================
  useEffect(() => {
    if (!token) {
      setUser(null);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setLoading(true);
    axios
      .get("/me")
      .then((res) => {
        const data = res.data.user ?? res.data;
        setUser(data);
      })
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, [token]);

  // ============================
  // 🔐 Login
  // ============================
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/login", { email, password });
      const accessToken = data.token;
      if (!accessToken) throw new Error("Token no recibido");

      // Guardar token y usuario
      setToken(accessToken);
      localStorage.setItem("access_token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      setUser(data.user);

      setLoading(false);
      return true;
    } catch {
      setUser(null);
      setToken(null);
      localStorage.removeItem("access_token");
      delete axios.defaults.headers.common["Authorization"];
      setLoading(false);
      return false;
    }
  };

  // ============================
  // 🚪 Logout
  // ============================
  const logout = async () => {
    try {
      await axios.post("/logout");
    } catch {}
    setUser(null);
    setToken(null);
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  // ============================
  // 🌎 Provider
  // ============================
  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// ============================
// 🔍 Hook personalizado
// ============================
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}
