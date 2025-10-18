import axios from "axios";
import { useAuth } from "../../hooks/context/AuthContext";
import { useAlert } from "../../hooks/context/AlertContext";
import { useCartTotals } from "../../components/forms/useCartTotals"; // ajusta el path según tu estructura

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useCheckout() {
  const { token, user } = useAuth();
  const { showAlert } = useAlert();
  const { clearCart } = useCartTotals(); // 🧹 función que limpia el carrito

  /**
   * Procesa el checkout luego de un pago exitoso con Stripe.
   * @param paymentIntent objeto retornado por stripe.confirmCardPayment()
   * @param totals datos calculados del carrito
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
        user_id: user.id,
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

      console.log(" Enviando checkout:", payload);

      // 🔹 Enviar orden al backend
      const { data } = await axios.post("/checkout", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Checkout registrado:", data);

      // 🧹 Vaciar carrito tras pago exitoso
      if (paymentIntent?.status === "succeeded") {
        try {
          await clearCart(); // Limpia el carrito (backend + local)
          console.log(" Carrito vaciado correctamente tras pago.");
        } catch (cartErr) {
          console.warn(" No se pudo limpiar el carrito:", cartErr);
        }
      }

      // 🟢 Mostrar alerta de éxito
      showAlert({
        title: "Pago exitoso ",
        message: "Tu orden fue procesada correctamente ",
        type: "success",
      });

      return data;
    } catch (err: any) {
      console.error("❌ Error en checkout:", err.response?.data || err);

      // 🔴 Mostrar alerta de error
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
