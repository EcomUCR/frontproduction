import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../hooks/context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useOrder() {
  const { token } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


 // Obtener todas las órdenes del usuario autenticado (comprador)
  const fetchOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formatted = response.data.map((order: any) => ({
        ...order,
        products: order.items?.map((item: any) => ({
          id: item.product.id,
          name: item.product.name,
          image_url: item.product.image_1_url,
          store_id: item.product.store_id,
          quantity: item.quantity,
          unit_price: item.unit_price,
        })),
      }));

      setOrders(formatted);
    } catch (error) {
      console.error("Error al obtener órdenes:", error);
    } finally {
      setLoading(false);
    }
  };

  
   // Obtener una orden específica por ID
  const getOrderById = async (orderId: number) => {
    try {
      const response = await axios.get(`/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener orden:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return {
    orders,
    loading,
    fetchOrders,
    getOrderById,
  };
}
