import axios from "axios";
import { useAuth } from "../../hooks/context/AuthContext";
import { useAlert } from "../../hooks/context/AlertContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useCheckout() {
  const { token, user } = useAuth();
  const { showAlert } = useAlert();

  /**
   * Procesa el checkout luego de un pago exitoso con Stripe.
   * Recibe el paymentIntent retornado por stripe.confirmCardPayment()
   */
  const processCheckout = async (paymentIntent: any, totals: any) => {
    if (!token || !user) {
      showAlert({
        title: "Inicia sesión",
        message: "Debes iniciar sesión antes de realizar el pago 🧾",
        type: "warning",
      });
      return;
    }

    try {
      const payload = {
        user_id: user.id, // ✅ tomado del contexto
        status: paymentIntent?.status === "succeeded" ? "PAID" : "FAILED",
        subtotal: totals?.subtotal || 0,
        shipping: totals?.shipping || 0,
        taxes: totals?.taxes || 0,
        total: totals?.total || 0,
        payment_method: paymentIntent?.payment_method_types?.[0] || "card",
        payment_id: paymentIntent?.id || "N/A",
        currency: paymentIntent?.currency?.toUpperCase() || "CRC",
        street: "Dirección de ejemplo",
        city: "Puntarenas",
        state: "Puntarenas",
        zip_code: "60101",
        country: "Costa Rica",
      };

      console.log("📦 Enviando checkout:", payload);

      const { data } = await axios.post("/checkout", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Checkout registrado:", data);

      showAlert({
        title: "Pago exitoso 🎉",
        message: "Tu orden fue procesada correctamente 🛍️",
        type: "success",
      });

      return data;
    } catch (err: any) {
      console.error("❌ Error en checkout:", err.response?.data || err);

      showAlert({
        title: "Error del servidor",
        message:
          err.response?.data?.message ||
          "No se pudo registrar la orden. Revisa los datos del pago.",
        type: "error",
      });

      throw err;
    }
  };

  return { processCheckout };
}
