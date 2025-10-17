import { useEffect } from "react";
import { useCartTotals } from "./useCartTotals";
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
    getTotals(); 
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
      ) : totals?.items_count === 0 ? (
        <p className="text-gray-500 mt-5">Tu carrito está vacío 🛒</p>
      ) : (
        <div className="flex flex-col gap-6 pt-10">
          {/* Subtotal */}
          <div className="border-t pt-5 flex justify-between">
            <p>Subtotal de la compra:</p>
            <p className="text-main">
              ₡{(totals?.subtotal ?? 0).toLocaleString("es-CR")}
            </p>
          </div>

          {/* Impuestos */}
          <div className="border-t pt-5 flex justify-between">
            <p>Impuestos (13%):</p>
            <p>₡{(totals?.taxes ?? 0).toLocaleString("es-CR")}</p>
          </div>

          {/* Envío */}
          <div className="border-t pt-5 flex justify-between">
            <p>Envío:</p>
            <p>₡{(totals?.shipping ?? 0).toLocaleString("es-CR")}</p>
          </div>

          {/* Total */}
          <div className="border-t pt-5 flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-main">
              ₡{(totals?.total ?? 0).toLocaleString("es-CR")}
            </p>
          </div>
        </div>
      )}

      {/* Dirección */}
      <div className="pt-10 flex gap-2 text-contrast-main">
        <IconMapPin />
        <p>Enviar a Andrés</p>
      </div>

      {/* Formulario */}
      <div className="pt-10">
        <CreditCardForm onSubmit={handleCardSubmit} loading={loadingVisa} />
      </div>

      {/* Métodos de pago */}
      <div className="pt-10">
        <h3 className="font-semibold mb-3">Métodos de pago</h3>
        <div className="flex gap-4">
          <img className="h-10" src={visa} alt="Visa" />
          <img className="h-10" src={mastercard} alt="Mastercard" />
          <img className="h-10" src={paypal} alt="PayPal" />
          <img className="h-10" src={american_express} alt="American Express" />
        </div>
      </div>

      {/* Resultado del tipo de cambio */}
      {rate && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-xl text-sm">
          <p>
            💰 <strong>Tipo de cambio:</strong> {rate.sourceCurrencyCode} →{" "}
            {rate.destinationCurrencyCode} = {rate.rate}
          </p>
          <p>🧪 Mock activo: {rate.mock ? "Sí" : "No"}</p>
        </div>
      )}

      {/* Error Visa */}
      {errorVisa && <p className="text-red-500 text-sm mt-4">{errorVisa}</p>}
    </div>
  );
}
