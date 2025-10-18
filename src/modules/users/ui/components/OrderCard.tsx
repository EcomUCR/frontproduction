import { useState } from "react";
import {
  IconMapPin,
  IconCreditCard,
  IconTruck,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { motion, AnimatePresence } from "framer-motion";
import ButtonComponent from "../../../../components/ui/ButtonComponent";

interface OrderCardProps {
  order: {
    id: number;
    status: string;
    subtotal: number;
    shipping: number;
    taxes: number;
    total: number;
    address_id: number;
    street: string;
    city: string;
    state: string;
    zip_code: string;
    country: string;
    payment_method: string;
    payment_id: string;
    created_at?: string;
    products?: {
      id: number;
      name: string;
      image_url?: string | null;
    }[];
  };
  onViewOrder?: (order: any) => void;
}

export default function OrderCard({ order, onViewOrder }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatCurrency = (num: number) =>
    num.toLocaleString("es-CR", { style: "currency", currency: "CRC" });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  // 🧩 Mock temporal (puedes quitarlo cuando tengas order_items)
  const products = order.products ?? [
    {
      id: 1,
      name: "Camiseta negra oversize",
      image_url:
        "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=400",
    },
    {
      id: 2,
      name: "Gorra deportiva",
      image_url:
        "https://images.unsplash.com/photo-1621381070502-661b2d3c1a11?w=400",
    },
    {
      id: 3,
      name: "Zapatos blancos",
      image_url:
        "https://images.unsplash.com/photo-1606813902919-0b9f9b4b3c5a?w=400",
    },
  ];

  const mainProduct = products[0];
  const secondProduct = products[1];
  const extraCount = products.length - 1;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 font-quicksand mb-6">
      {/* 🔹 Header */}
      <div className="flex justify-between items-center mb-5">
        <h2 className="font-bold text-lg text-main">Pedido #{order.id}</h2>
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor(
            order.status
          )}`}
        >
          {order.status.toUpperCase()}
        </span>
      </div>

      {/* 🔹 Vista previa de productos */}
      <div className="flex items-center gap-3 mb-4">
        {/* Imagen principal */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 flex items-center justify-center relative">
          <img
            src={
              mainProduct?.image_url ||
              "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"
            }
            alt={mainProduct?.name || "Producto"}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Imagen secundaria con blur y overlay */}
        {extraCount > 0 && secondProduct && (
          <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 relative flex items-center justify-center">
            <img
              src={
                secondProduct.image_url ||
                "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"
              }
              alt="Más productos"
              className="object-cover w-full h-full blur-xs brightness-75"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
              <span className="text-white text-sm font-semibold">+{extraCount}</span>
            </div>
          </div>
        )}

        {/* Texto descriptivo */}
        <div className="flex flex-col justify-center ml-2">
          <p className="text-sm text-gray-700 font-medium">
            {products.length} producto{products.length > 1 ? "s" : ""}
          </p>
          <p className="text-xs text-gray-500 line-clamp-1">
            {mainProduct?.name}
          </p>
        </div>
      </div>

      {/* 🔹 Detalles colapsables */}
      <div
        className="flex items-center justify-between cursor-pointer mt-2 select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-semibold text-main">
          {isOpen ? "Ocultar detalles" : "Ver detalles"}
        </span>
        {isOpen ? (
          <IconChevronUp size={18} className="text-main" />
        ) : (
          <IconChevronDown size={18} className="text-main" />
        )}
      </div>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="details"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="bg-gray-50 p-4 rounded-xl text-sm mt-3 space-y-3">
              {/* Dirección */}
              <div className="flex items-start gap-2 text-gray-700">
                <IconMapPin size={18} className="text-main mt-[2px]" />
                <div>
                  <p>{order.street}</p>
                  <p>
                    {order.city}, {order.state}, {order.zip_code}
                  </p>
                  <p>{order.country}</p>
                </div>
              </div>

              {/* Método de pago */}
              <div className="flex items-center gap-2 text-gray-700">
                <IconCreditCard size={18} className="text-main" />
                <span>
                  {order.payment_method.toUpperCase()} • {order.payment_id}
                </span>
              </div>

              {/* Envío */}
              <div className="flex items-center gap-2 text-gray-700">
                <IconTruck size={18} className="text-main" />
                <span>Envío estándar</span>
              </div>

              {/* Totales */}
              <div className="bg-white p-4 rounded-xl border border-gray-200 text-sm mt-3">
                <div className="flex justify-between mb-1">
                  <span>Subtotal:</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Envío:</span>
                  <span>{formatCurrency(order.shipping)}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Impuestos:</span>
                  <span>{formatCurrency(order.taxes)}</span>
                </div>
                <div className="flex justify-between font-semibold text-main mt-2 border-t border-gray-300 pt-2">
                  <span>Total:</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Footer */}
      <div className="flex justify-between items-center mt-5">
        {order.created_at && (
          <p className="text-xs text-gray-500">
            Fecha: {new Date(order.created_at).toLocaleDateString("es-CR")}
          </p>
        )}
        <ButtonComponent
          text="Ver pedido"
          style="bg-main text-white rounded-full text-xs px-4 py-2 hover:bg-contrast-main transition-all"
          onClick={() => onViewOrder?.(order)}
        />
      </div>
    </div>
  );
}
