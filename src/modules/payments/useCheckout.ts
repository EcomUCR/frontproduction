import axios from "axios";
import { useAuth } from "../../hooks/context/AuthContext";
import { useAlert } from "../../hooks/context/AlertContext";
import { useCart } from "../../hooks/context/CartContext";
import { useCartTotals } from "../../components/forms/useCartTotals";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useCheckout() {
  const { token, user } = useAuth();
  const { showAlert } = useAlert();
  const { cart, clearCart, refreshCart } = useCart();
  const { clearCart: clearTotals } = useCartTotals();

  /**
   * 💳 Procesa todo el checkout luego del pago exitoso.
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
      // 🔄 Asegurar que el carrito esté actualizado
      await refreshCart();

      if (!cart || cart.items.length === 0) {
        showAlert({
          title: "Carrito vacío",
          message: "No hay productos para procesar el pago 🛒",
          type: "warning",
        });
        return;
      }

      // 1️⃣ Crear orden inicial
      const initRes = await axios.post(
        "/checkout/init",
        {
          subtotal: totals?.subtotal || 0,
          shipping: totals?.shipping || 0,
          taxes: totals?.taxes || 0,
          total: totals?.total || 0,
          city: "Puntarenas",
          country: "Costa Rica",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const orderId = initRes.data.order?.id;
      console.log("🧾 Orden inicial creada:", orderId);

      // 2️⃣ Agregar items del carrito
      const items = cart.items.map((item) => {
        const basePrice = Number(item.product.price);
        const discountPrice =
          item.product.discount_price !== null
            ? Number(item.product.discount_price)
            : null;

        return {
          product_id: item.product.id,
          store_id: item.product.store?.id || null,
          quantity: Number(item.quantity),
          unit_price: discountPrice ?? basePrice,
          discount_pct:
            discountPrice && basePrice > 0
              ? Math.round(((basePrice - discountPrice) / basePrice) * 100)
              : 0,
        };
      });

      await axios.post(
        "/checkout/items",
        {
          order_id: orderId,
          items,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("📦 Items añadidos correctamente");

      // 3️⃣ Confirmar pago
      const confirmRes = await axios.post(
        "/checkout/confirm",
        {
          order_id: orderId,
          status: paymentIntent?.status === "succeeded" ? "PAID" : "FAILED",
          payment_id: paymentIntent?.id || "N/A",
          payment_method:
            paymentIntent?.payment_method_types?.[0]?.toUpperCase() || "CARD",
          currency: paymentIntent?.currency?.toUpperCase() || "CRC",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("✅ Pago confirmado:", confirmRes.data);

      // 🧹 Limpiar carrito tras pago exitoso
      if (paymentIntent?.status === "succeeded") {
        try {
          await clearCart();
          await clearTotals();
          console.log("🧹 Carrito vaciado correctamente tras pago.");
        } catch (cartErr) {
          console.warn("⚠️ No se pudo limpiar el carrito:", cartErr);
        }
      }

      // 🎉 Mostrar alerta de éxito
      showAlert({
        title: "Pago exitoso 💳",
        message: "Tu orden fue procesada correctamente 🧾",
        type: "success",
      });

      return confirmRes.data;
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
