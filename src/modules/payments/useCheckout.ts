import axios from "axios";
import { useAuth } from "../../hooks/context/AuthContext";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export function useCheckout() {
    const { token } = useAuth();

    // 🧾 Llamado al endpoint /api/checkout
    const processCheckout = async (formData: any) => {
        if (!token) {
            alert("Debes iniciar sesión antes de pagar 🧾");
            return;
        }

        try {
            // 🔹 Adaptar datos a lo que Laravel espera exactamente
            const payload = {
                payment_method: "VISA",
                currency: "CRC",
                street: "Dirección de ejemplo",
                city: "Puntarenas",
                state: "Puntarenas",
                zip_code: "60101",
                country: "Costa Rica",
                card: {
                    name: formData.name,
                    number: formData.cardNumber, // ✅ corregido
                    exp_month: formData.expMonth, // ✅ corregido
                    exp_year: formData.expYear,   // ✅ corregido
                    cvv: formData.cvv,
                },
            };

            const { data } = await axios.post("/checkout", payload, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log("✅ Checkout exitoso:", data);
            alert("Pago realizado con éxito ✅");
            return data;
        } catch (err: any) {
            console.error("❌ Error en checkout:", err.response?.data || err);
            alert(
                JSON.stringify(err.response?.data?.errors || err.response?.data?.message || "Error en la validación del pago ❌")
            );
            throw err;
        }
    };


    return { processCheckout };
}
