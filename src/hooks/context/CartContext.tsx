import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext"; // 👈 para obtener el token del usuario

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

// ============================
// 🧾 Tipos del carrito
// ============================

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    name: string;
    price: number;
    discount_price?: number | null;
    image_1_url?: string;
    stock?: number;
    store?: {
      id: number;
      name: string;
    };
  };
}

export interface Cart {
  id: number;
  items: CartItem[];
  total: number;
}

interface CartContextType {
  cart: Cart | null;
  loading: boolean;
  addToCart: (productId: number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: number, quantity: number) => Promise<void>;
  removeItem: (itemId: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
}

// ============================
// ⚙️ Creación del contexto
// ============================

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const { token } = useAuth();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // ============================
  // 🔄 Cargar carrito al iniciar sesión o cambiar token
  // ============================
  useEffect(() => {
    if (token) refreshCart();
    else setCart(null);
  }, [token]);

  // ============================
  // 🧠 Obtener carrito del backend
  // ============================
  const refreshCart = async () => {
    if (!token) return;
    try {
      const { data } = await axios.get("/cart/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // El backend devuelve el carrito directamente o dentro de data.cart
      setCart(data.cart ?? data);
    } catch (err) {
      console.error("Error al cargar carrito:", err);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // 🛒 Agregar producto al carrito
  // ============================
  const addToCart = async (productId: number, quantity: number = 1) => {
    if (!token) {
       console.log("Debes iniciar sesión para agregar productos al carrito. ¿Ir al login?");
      return;
    }

    try {
      const { data } = await axios.post(
        "/cart/add",
        { product_id: productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data.cart ?? data);

    } catch (err) {
      console.error("Error al añadir producto al carrito:", err);

    }
  };

  // ============================
  // 🔢 Actualizar cantidad de un producto
  // ============================
  const updateQuantity = async (itemId: number, quantity: number) => {
    try {
      const { data } = await axios.patch(
        `/cart/item/${itemId}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(data.cart ?? data);
    } catch (err) {
      console.error("Error al actualizar cantidad:", err);
    }
  };

  // ============================
  // 🗑️ Eliminar producto del carrito
  // ============================
  const removeItem = async (itemId: number) => {
    try {
      const { data } = await axios.delete(`/cart/item/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data.cart ?? data);
    } catch (err) {
      console.error("Error al eliminar producto:", err);
    }
  };

  // ============================
  // 🧹 Vaciar carrito completamente
  // ============================
  const clearCart = async () => {
    try {
      await axios.delete("/cart/clear", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart({ id: 0, items: [], total: 0 });
      console.log("Carrito vaciado 🧹");
    } catch (err) {
      console.error("Error al vaciar carrito:", err);
      console.log("No se pudo vaciar el carrito ❌");
    }
  };

  // ============================
  // 🌎 Provider
  // ============================
  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// ============================
// 🔍 Hook personalizado
// ============================
export function useCart() {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("useCart debe usarse dentro de un CartProvider");
  return context;
}
