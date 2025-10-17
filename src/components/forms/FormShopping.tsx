import { useEffect } from "react";
import { useCartTotals } from "./useCartTotals"; // 👈 misma carpeta
import { useVisa } from "../../modules/payments/useVisa";
import { useCheckout } from "../../modules/payments/useCheckout";
import CreditCardForm from "../../components/ui/CreditCardFields";
import visa from "../../img/resources/logo_visa.png";
import mastercard from "../../img/resources/logo_mastercard.png";
import paypal from "../../img/resources/logo_paypal.png";
import american_express from "../../img/resources/american_express_logo.png";
import { IconMapPin } from "@tabler/icons-react";

export default function FormShopping() {
  const { getForexRate, rate, loading: loadingVisa, error: errorVisa } = useVisa();
  const { processCheckout } = useCheckout();
  const { totals, getTotals, loading, error } = useCartTotals();

  useEffect(() => {
    getTotals(); // 🔥 carga los totales desde el backend
  }, []);

  const handleCardSubmit = async (formData: any) => {
    await getForexRate("CRC", "USD");
    await processCheckout(formData);
  };

  return (
    <div className="font-quicksand">
      <h2 className="text-xl font-bold">Detalles de la compra</h2>

      {/* 💰 Totales */}
      {loading ? (
        <p className="text-gray-500 mt-5">Cargando totales...</p>
      ) : error ? (
        <p className="text-red-500 mt-5">{error}</p>
      ) : (
        <div className="flex flex-col gap-6 pt-10">
          <div className="border-t pt-5 flex flex-col gap-2">
            <div className="flex justify-between">
              <p>Subtotal de la compra:</p>
              <p className="text-main">₡{totals.subtotal.toLocaleString("es-CR")}</p>
            </div>
          </div>

          <div className="border-t pt-5 flex justify-between">
            <p>Impuestos (13%):</p>
            <p>₡{totals.taxes.toLocaleString("es-CR")}</p>
          </div>

          <div className="border-t pt-5 flex justify-between">
            <p>Envío:</p>
            <p>₡{totals.shipping.toLocaleString("es-CR")}</p>
          </div>

          <div className="border-t pt-5">
            <div className="flex justify-between">
              <p className="font-bold">Total:</p>
              <p className="font-bold text-main">
                ₡{totals.total.toLocaleString("es-CR")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Dirección */}
      <div className="pt-10 flex gap-2 text-contrast-main">
        <IconMapPin />
        <p>Enviar a Andrés</p> {/* Aquí iría la dirección real del usuario */}
      </div>

      {/* Formulario */}
      <div className="pt-10">
        <CreditCardForm onSubmit={handleCardSubmit} loading={loadingVisa} />
      </div>

      {/* Logos */}
      <div className="pt-10">
        <h3 className="font-semibold mb-3">Métodos de pago</h3>
        <div className="flex gap-4">
          <img className="h-10" src={visa} alt="Visa" />
          <img className="h-10" src={mastercard} alt="Mastercard" />
          <img className="h-10" src={paypal} alt="PayPal" />
          <img className="h-10" src={american_express} alt="American Express" />
        </div>
      </div>
    </div>
  );
}
