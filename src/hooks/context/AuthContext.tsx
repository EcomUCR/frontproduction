import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

type UserType = {
  image: string;
  id: number;
  username: string;
  email: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  role: "ADMIN" | "SELLER" | "CUSTOMER";
  store?: {
    id: number;
    name: string;
    description?: string;
    image?: string;
    
  } | null;
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
  const [loading, setLoading] = useState<boolean>(false);

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
      const data = res.data.user ?? res.data; // <-- maneja ambos casos
      setUser(data);
    })
    .catch(() => setUser(null))
    .finally(() => setLoading(false));
}, [token]);


  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // Tu backend retorna: { user, token }
      const { data } = await axios.post("/login", { email, password });
      console.log("Respuesta del login:", data);
      console.log(email, password);
      const accessToken = data.token; // <-- clave correcta
      if (!accessToken) throw new Error("Token no recibido");

      setToken(accessToken);
      localStorage.setItem("access_token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Usa el usuario que ya viene en la respuesta del backend
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

  const logout = async () => {
    try {
      await axios.post("/logout"); // si no existe en backend, puedes omitir el await
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

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
