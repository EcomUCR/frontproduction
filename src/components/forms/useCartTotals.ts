import { useState, useEffect } from "react";
import axios from "axios";

export function useCartTotals() {
  const [totals, setTotals] = useState({
    subtotal: 0,
    taxes: 0,
    shipping: 0,
    total: 0,
    currency: "CRC",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 🔹 Cargar totales del backend
  const getTotals = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem("access_token");

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/totals`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTotals(res.data);
    } catch (err) {
      console.error("❌ Error al obtener totales:", err);
      setError("Error al obtener totales del carrito");
    } finally {
      setLoading(false);
    }
  };

  // 👇 Se ejecuta al montar y cada vez que se emite el evento “cartUpdated”
  useEffect(() => {
    getTotals(); // primera carga
    const reload = () => getTotals();
    window.addEventListener("cartUpdated", reload);
    return () => window.removeEventListener("cartUpdated", reload);
  }, []);

  return { totals, getTotals, loading, error };
}
