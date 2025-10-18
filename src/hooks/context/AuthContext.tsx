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
  is_verified?: boolean | string | null;
  verification_date?: string | null;
  status?: "ACTIVE" | "SUSPENDED" | "CLOSED" | null | string;
};

type UserType = {
  name: string;
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

export type CartItemType = {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    image_1_url: string;
    price: number;
    discount_price?: number | null;
    stock: number;
    store: {
      id: number;
      name: string;
    };
  };
};


type CartType = {
  id: number;
  user_id: number;
  total?: number;
  items: CartItemType[];
};

type AuthContextType = {
  user: UserType | null;
  token: string | null;
  loading: boolean;
  cart: CartType | null;
  setCart: React.Dispatch<React.SetStateAction<CartType | null>>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
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
  const [cart, setCart] = useState<CartType | null>(null);

  // ============================
  // 🔄 Cargar usuario y carrito
  // ============================
  useEffect(() => {
    if (!token) {
      setUser(null);
      setCart(null);
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    setLoading(true);
    axios
      .get("/me")
      .then(async (res) => {
        const data = res.data.user ?? res.data;
        setUser(data);

        // Cargar carrito asociado al usuario
        try {
          const cartRes = await axios.get("/cart/me");
          setCart(cartRes.data);
        } catch {
          setCart(null);
        }
      })
      .catch(() => {
        setUser(null);
        setCart(null);
      })
      .finally(() => setLoading(false));
  }, [token]);

  const refreshUser = async () => {
  if (!token) return;
  try {
    const res = await axios.get("/me");
    const data = res.data.user ?? res.data;
    setUser(data);
  } catch (error) {
    console.error("Error al refrescar usuario:", error);
  }
};


  // ============================
  // 🔐 Login
  // ============================
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/login", { email, password });
      const accessToken = data.token;
      if (!accessToken) throw new Error("Token no recibido");

      // Guardar token
      setToken(accessToken);
      localStorage.setItem("access_token", accessToken);
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Guardar usuario
      setUser(data.user);

      // Cargar carrito (si el backend no lo devuelve, lo crea)
      try {
        const cartRes = await axios.get("/cart/me");
        setCart(cartRes.data);
      } catch {
        setCart(null);
      }

      setLoading(false);
      return true;
    } catch {
      setUser(null);
      setCart(null);
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
    setCart(null);
    setToken(null);
    localStorage.removeItem("access_token");
    delete axios.defaults.headers.common["Authorization"];
  };

  // ============================
  // 🌎 Provider
  // ============================
  return (
    <AuthContext.Provider
      value={{ user, token, loading, cart, setCart, login, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ============================
// 🔍 Hook personalizado
// ============================
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
