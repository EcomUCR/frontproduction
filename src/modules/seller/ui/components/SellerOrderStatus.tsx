import { useEffect, useState } from "react";
import { useAuth } from "../../../../hooks/context/AuthContext";
import OrderCard from "../../../users/ui/components/OrderCard";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export default function SellerOrderStatus() {
  const { token, user } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStoreOrders = async () => {
      if (!token || !user?.store?.id) return;

      try {
        const res = await axios.get(`/stores/${user.store.id}/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(res.data);
      } catch (err) {
        console.error("Error al obtener pedidos de la tienda:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStoreOrders();
  }, [token, user]);

  return (
    <div className="mx-10 border-l-2 border-main-dark/20 pl-6">
      {/* Encabezado */}
      <section className="flex flex-col mb-6">
        <h1 className="text-2xl font-quicksand font-semibold text-main-dark mb-1">
          Lista de pedidos
        </h1>
        <p className="text-sm text-gray-500 font-quicksand">
          Visualiza todos los pedidos recibidos en tu tienda.
        </p>
      </section>

      {/* Contenido */}
      <section className="flex flex-col gap-6">
        {loading ? (
          <p className="text-gray-500 text-sm">Cargando pedidos...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-10">
            No hay pedidos registrados en tu tienda 🛍️
          </p>
        ) : (
          orders.map((order) => <OrderCard key={order.id} order={order} />)
        )}
      </section>
    </div>
  );
}
