import axios from "axios";
import { useAuth } from "../../hooks/context/AuthContext";
import { useAlert } from "../../hooks/context/AlertContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useCheckout() {
  const { token } = useAuth();
  const { showAlert } = useAlert();

  /**
   * Procesa el checkout luego de un pago con Stripe.
   * Recibe el paymentIntent retornado por stripe.confirmCardPayment()
   */
  const processCheckout = async (paymentIntent: any) => {
    if (!token) {
      showAlert({
        title: "Inicia sesión",
        message: "Debes iniciar sesión antes de realizar el pago 🧾",
        type: "warning",
      });
      return;
    }

    try {
      // 🔹 Adaptar los datos a lo que Laravel espera exactamente
      const payload = {
        payment_id: paymentIntent.id || "unknown_id",
        payment_method: paymentIntent.payment_method_types?.[0] || "card",
        currency: (paymentIntent.currency || "usd").toUpperCase(),
        amount: paymentIntent.amount ? paymentIntent.amount / 100 : 0,
        status: paymentIntent.status || "failed",
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

      // ✅ Manejar diferentes resultados del pago
      if (paymentIntent.status === "succeeded") {
        showAlert({
          title: "Pago exitoso 🎉",
          message: "Tu orden fue procesada correctamente 🛍️",
          type: "success",
        });
      } else if (paymentIntent.status === "requires_payment_method") {
        showAlert({
          title: "Error en el pago",
          message:
            "Tu método de pago no es válido o fue rechazado. Intenta con otra tarjeta.",
          type: "error",
        });
      } else if (paymentIntent.status === "requires_action") {
        showAlert({
          title: "Acción requerida",
          message:
            "Tu banco requiere autenticación adicional (3D Secure). Intenta nuevamente.",
          type: "warning",
        });
      } else {
        showAlert({
          title: "Pago fallido",
          message:
            "No se pudo procesar tu pago. Verifica los datos de tu tarjeta o intenta más tarde.",
          type: "error",
        });
      }

      console.log("✅ Checkout registrado en backend:", data);
      return data;
    } catch (err: any) {
      console.error("❌ Error en checkout:", err.response?.data || err);

      showAlert({
        title: "Error del servidor",
        message:
          err.response?.data?.message ||
          "Ocurrió un error al registrar el pago en el sistema.",
        type: "error",
      });

      throw err;
    }
  };

  return { processCheckout };
}
