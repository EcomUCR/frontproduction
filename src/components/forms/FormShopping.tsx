import { useEffect, useState } from "react";
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
const stripePromise = loadStripe(
  "pk_test_51SJQBqLl2yLxOyLIFdLhdGoXjNKpBn2WFxWjMhInw72TUbRe7DVmYLa17tBOfswYlYqe0E3J3bqYWFyuJaEFYMLI00aJOZAoJY"
);

interface FormShoppingProps {
  variant?: "checkout" | "product";
  onAddToCart?: () => void; // solo se usa cuando variant === "product"
}

export default function FormShopping({
  variant = "checkout",
  onAddToCart,
}: FormShoppingProps) {
  const { getForexRate, rate, /*loading: loadingVisa*/ error: errorVisa } = useVisa();
  const { processCheckout } = useCheckout();
  const { totals, getTotals, loading, error } = useCartTotals();
  const [direcciones, setDirecciones] = useState([1]); // lista de formularios de dirección

  useEffect(() => {
    getTotals();
  }, []);

  const format = (n: number) => (n ?? 0).toLocaleString("es-CR");

  // función para agregar otro formulario
  const agregarDireccion = () => {
    setDirecciones((prev) => [...prev, prev.length + 1]);
  };

  return (
    <div className="font-quicksand">
      <h2 className="text-xl font-bold mb-4">
        {variant === "product" ? "Detalles del producto" : "Detalles de la compra"}
      </h2>

      {/* Totales */}
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



      {/*  Checkout Mode */}
      {variant === "checkout" && (
        <>

          {/* Dirección */}
          <div className="pt-10 flex flex-col gap-6 w-full">
            <div className="flex items-center gap-2"></div>

            {direcciones.map((num) => (
              <div key={num} className="flex flex-col gap-4 bg-main-dark/5 p-4 rounded-xl">
                <span className="font-medium flex items-center gap-2 text-black">
                  <IconMapPin className="text-yellow-400" />
                  Dirección de entrega
                </span>

                <textarea
                  rows={4}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 resize-y w-full focus:outline-none focus:ring-2 focus:ring-main-dark/40"
                  placeholder="Escribe la dirección aquí..."
                />

               
                <div className="flex gap-3">
                  <button className="flex-1 bg-contrast-secondary hover:bg-main text-white rounded-full py-2 text-sm transition">
                    Guardar dirección
                  </button>
                  <button
                    onClick={agregarDireccion}
                    className="flex-1 bg-contrast-secondary hover:bg-main text-white rounded-full py-2 text-sm transition"
                  >
                    Guardar otra dirección
                  </button>
                </div>
              </div>
            ))}
          </div>


          {/* Formulario con Stripe */}
          <div className="pt-10">
            <Elements stripe={stripePromise}>
              <StripePaymentForm
                total={totals?.total || 0}
                onPaymentSuccess={async (paymentIntent) => {
                  console.log(" Pago exitoso:", paymentIntent);
                  await getForexRate("CRC", "USD");
                  await processCheckout(paymentIntent, totals); // ✅ registra orden + limpia carrito
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
              <p> Mock activo: {rate.mock ? "Sí" : "No"}</p>
            </div>
          )}

          {/* Error Visa */}
          {errorVisa && (
            <p className="text-red-500 text-sm mt-4">{errorVisa}</p>
          )}
        </>
      )}

      {/*  Product Mode */}
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
