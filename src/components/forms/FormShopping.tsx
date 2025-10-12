import { useState } from "react";
import visa from "../../img/resources/logo_visa.png";
import mastercard from "../../img/resources/logo_mastercard.png";
import paypal from "../../img/resources/logo_paypal.png";
import american_express from "../../img/resources/american_express_logo.png";
import { IconMapPin } from "@tabler/icons-react";
import { useVisa } from "../../modules/payments/useVisa";
import { useCheckout } from "../../modules/payments/useCheckout"; // 👈 importar aquí
import CreditCardForm from "../../components/ui/CreditCardFields";

export default function FormShopping() {
  const { getForexRate, rate, loading, error } = useVisa();
  const { processCheckout } = useCheckout(); // 👈 usar el hook

  const [fromCurrency] = useState("CRC");
  const [toCurrency] = useState("USD");
  const [subtotal] = useState(13000);
  const [total] = useState(8500);

  // 🚀 Cuando el usuario envía el formulario de tarjeta
  const handleCardSubmit = async (formData: any) => {
    console.log("💳 Datos de tarjeta:", formData);

    // 1️⃣ Simular tipo de cambio (opcional)
    await getForexRate(fromCurrency, toCurrency);

    // 2️⃣ Enviar pago al backend
    await processCheckout(formData);
  };
  return (
    <div className="font-quicksand">
      <h2 className="text-xl font-bold">Detalles de la compra</h2>

      {/* 💰 Totales */}
      <div className="flex flex-col gap-6 pt-10">
        <div className="border-t pt-5 flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Subtotal de la compra:</p>
            <p className="text-main">₡{subtotal.toLocaleString()}</p>
          </div>
        </div>
        <div className="border-t pt-5">
          <div className="flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-main">₡{total.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* 📍 Dirección */}
      <div className="pt-10 flex gap-2 text-contrast-main">
        <IconMapPin />
        <p>Enviar a Andrés Sequeira</p>
      </div>

      {/* 💳 Formulario de tarjeta */}
      <div className="pt-10">
        <CreditCardForm onSubmit={handleCardSubmit} loading={loading} />
      </div>

      {/* 💳 Logos */}
      <div className="pt-10">
        <h3 className="font-semibold mb-3">Métodos de pago</h3>
        <div className="flex gap-4">
          <img className="h-10 w-auto" src={visa} alt="Visa" />
          <img className="h-10 w-auto" src={mastercard} alt="Mastercard" />
          <img className="h-10 w-auto" src={paypal} alt="PayPal" />
          <img
            className="h-10 w-auto"
            src={american_express}
            alt="American Express"
          />
        </div>
      </div>

      {/* 🔍 Resultado del mock */}
      {rate && (
        <div className="mt-6 p-4 bg-green-50 border border-green-300 rounded-xl text-sm">
          <p>
            💰 <strong>Tipo de cambio:</strong> {rate.sourceCurrencyCode} →{" "}
            {rate.destinationCurrencyCode} = {rate.rate}
          </p>
          <p>🧪 Mock activo: {rate.mock ? "Sí" : "No"}</p>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
    </div>
  );
}
