import { useState } from "react";
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

  const getTotals = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token"); // 👈 usa el token guardado
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/totals`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTotals(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Error al obtener totales del carrito");
    } finally {
      setLoading(false);
    }
  };

  return { totals, getTotals, loading, error };
}
