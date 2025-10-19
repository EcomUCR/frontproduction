import { useState, useEffect } from "react";

/**
 * Clase para guardar y recuperar los datos del carrito antes de borrarse.
 * Se almacena todo localmente en localStorage.
 */
export class OrderDataSaver {
  private static key = "lastOrderData";

  /**
   * Guarda la información del carrito antes de borrarse.
   * @param cartData Datos del carrito (productos, totales, etc.)
   */
  static saveOrderData(cartData: any) {
    try {
      localStorage.setItem(this.key, JSON.stringify(cartData));
      console.log("🧾 Carrito guardado antes de eliminarse:", cartData);
    } catch (error) {
      console.error("❌ Error al guardar orderData:", error);
    }
  }

  /**
   * Obtiene la última orden guardada (si existe).
   */
  static getSavedOrderData() {
    try {
      const data = localStorage.getItem(this.key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("❌ Error al obtener orderData:", error);
      return null;
    }
  }

  /**
   * Limpia la orden guardada manualmente (opcional)
   */
  static clearSavedOrderData() {
    localStorage.removeItem(this.key);
    console.log("🧹 Última orden eliminada del almacenamiento local.");
  }
}

/**
 * 🧩 Componente React para visualizar la última orden guardada.
 * Puedes montarlo en cualquier página del panel o dashboard.
 */
export function OrderDataViewer() {
  const [lastOrder, setLastOrder] = useState<any>(null);

  useEffect(() => {
    const data = OrderDataSaver.getSavedOrderData();
    setLastOrder(data);
  }, []);

  if (!lastOrder) {
    return (
      <div className="p-5 border rounded-xl bg-gray-50 text-center">
        <p className="text-gray-500">No hay órdenes guardadas todavía.</p>
      </div>
    );
  }

  return (
    <div className="p-5 border rounded-xl shadow-md bg-white font-quicksand">
      <h2 className="text-lg font-bold mb-3 text-main">🧾 Última orden guardada</h2>

      <p>
        <strong>Fecha:</strong>{" "}
        {new Date(lastOrder.date).toLocaleString("es-CR")}
      </p>
      <p>
        <strong>Total:</strong>{" "}
        ₡{lastOrder.totals?.total?.toLocaleString("es-CR")}
      </p>
      <p>
        <strong>Estado del pago:</strong>{" "}
        {lastOrder.paymentIntent?.status || "Desconocido"}
      </p>

      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-contrast-secondary font-semibold">
          Ver detalles completos
        </summary>
        <pre className="mt-2 text-xs bg-gray-100 p-3 rounded overflow-x-auto">
          {JSON.stringify(lastOrder, null, 2)}
        </pre>
      </details>

      <button
        onClick={() => {
          OrderDataSaver.clearSavedOrderData();
          setLastOrder(null);
        }}
        className="mt-5 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-all"
      >
        Borrar orden guardada
      </button>
    </div>
  );
}
