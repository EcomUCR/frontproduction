import { useEffect } from "react";
import { useCartTotals } from "./useCartTotals";
import { useVisa } from "../../modules/payments/useVisa";
import { useCheckout } from "../../modules/payments/useCheckout";
import visa from "../../img/resources/logo_visa.png";
import mastercard from "../../img/resources/logo_mastercard.png";
import paypal from "../../img/resources/logo_paypal.png";
import american_express from "../../img/resources/american_express_logo.png";
import { IconMapPin } from "@tabler/icons-react";
import { Button } from "../ui/button";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePaymentForm from "../../components/ui/StripePaymentForm";

// ⚙️ Crea la instancia de Stripe una sola vez FUERA del componente
// Sustituye tu clave de prueba aquí directamente
const stripePromise = loadStripe("pk_test_51SJQBqLl2yLxOyLIFdLhdGoXjNKpBn2WFxWjMhInw72TUbRe7DVmYLa17tBOfswYlYqe0E3J3bqYWFyuJaEFYMLI00aJOZAoJY");

interface FormShoppingProps {
  variant?: "checkout" | "product";
  onAddToCart?: () => void; // solo se usa cuando variant === "product"
}

export default function FormShopping({
  variant = "checkout",
  onAddToCart,
}: FormShoppingProps) {
  const { getForexRate, rate, loading: loadingVisa, error: errorVisa } = useVisa();
  const { processCheckout } = useCheckout();
  const { totals, getTotals, loading, error } = useCartTotals();

  useEffect(() => {
    getTotals();
  }, []);

  const format = (n: number) => (n ?? 0).toLocaleString("es-CR");

  return (
    <div className="font-quicksand">
      <h2 className="text-xl font-bold mb-4">
        {variant === "product" ? "Detalles del producto" : "Detalles de la compra"}
      </h2>

      {/* 💰 Totales */}
      {loading ? (
        <p className="text-gray-500 mt-5">Cargando totales...</p>
      ) : error ? (
        <p className="text-red-500 mt-5">{error}</p>
      ) : (
        <div className="flex flex-col gap-6 pt-6">
          {/* Subtotal */}
          <div className="border-t pt-5 flex justify-between">
            <p>Subtotal:</p>
            <p className="text-main">₡{format(totals?.subtotal)}</p>
          </div>

          {/* Impuestos */}
          <div className="border-t pt-5 flex justify-between">
            <p>Impuestos (13%):</p>
            <p>₡{format(totals?.taxes)}</p>
          </div>

          {/* Envío */}
          {variant === "checkout" && (
            <div className="border-t pt-5 flex justify-between">
              <p>Envío:</p>
              <p>₡{format(totals?.shipping)}</p>
            </div>
          )}

          {/* Total */}
          <div className="border-t pt-5 flex justify-between">
            <p className="font-bold">Total:</p>
            <p className="font-bold text-main">₡{format(totals?.total)}</p>
          </div>
        </div>
      )}

      {/* 🔹 Checkout Mode */}
      {variant === "checkout" && (
        <>
          {/* Dirección */}
          <div className="pt-10 flex gap-2 text-contrast-main">
            <IconMapPin />
            <p>Enviar a Andrés</p>
          </div>

          {/* Formulario con Stripe */}
          <div className="pt-10">
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                total={totals?.total || 0}
                onPaymentSuccess={async (paymentIntent) => {
                  console.log("✅ Pago exitoso:", paymentIntent);
                  await getForexRate("CRC", "USD"); // mantiene tu conversión
                  await processCheckout(paymentIntent); // registra orden en Laravel
                }}
              />
            </Elements>
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
                💰 <strong>Tipo de cambio:</strong>{" "}
                {rate.sourceCurrencyCode} → {rate.destinationCurrencyCode} ={" "}
                {rate.rate}
              </p>
              <p>🧪 Mock activo: {rate.mock ? "Sí" : "No"}</p>
            </div>
          )}

          {/* Error Visa */}
          {errorVisa && (
            <p className="text-red-500 text-sm mt-4">{errorVisa}</p>
          )}
        </>
      )}

      {/* 🔹 Product Mode */}
      {variant === "product" && (
        <div className="pt-10">
          <Button
            onClick={onAddToCart}
            className="w-full bg-contrast-secondary hover:bg-main text-white"
          >
            Añadir al carrito
          </Button>
        </div>
      )}
    </div>
  );
}
