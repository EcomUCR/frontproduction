import { IconHeart, IconTrash } from "@tabler/icons-react";
import StarRatingComponent from "../ui/StarRatingComponent";
import type { CartItemType } from "../../hooks/context/AuthContext";
import { useAuth } from "../../hooks/context/AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAlert } from "../../hooks/context/AlertContext";
import { useState } from "react";

interface Props {
  item: CartItemType;
}

export default function ProductCardShopping({ item }: Props) {
  const { product } = item;
  const { token, setCart } = useAuth();
  const { showAlert } = useAlert();
  const [updating, setUpdating] = useState(false); // evita spam en botones

  // 🔹 Actualizar cantidad (+/-)
  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1 || updating) return;
    setUpdating(true);

    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/item/${item.id}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data.cart);
      window.dispatchEvent(new Event("cartUpdated")); // 🔁 notifica actualización global
    } catch (error) {
      console.error(" Error al actualizar cantidad:", error);
      showAlert({
        title: "Ups ",
        message: "Ocurrió un error al actualizar la cantidad.",
        confirmText: "Ok",
        type: "error",
      });
    } finally {
      setUpdating(false);
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async () => {
    const confirmed = await showAlert({
    title: "Eliminar producto",
    message: "¿Deseas eliminar el producto del carrito?",
    confirmText: "Eliminar",
    cancelText: "Cancelar",
    type: "warning",
  });

    if (!confirmed) return;

    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_API_URL}/cart/item/${item.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data.cart);

      // Si el carrito quedó vacío → notificar y limpiar visualmente
      if (!data.cart.items || data.cart.items.length === 0) {
        console.log(" Carrito vacío tras eliminar último producto");
      }

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(" Error al eliminar producto:", error);
      showAlert({
        title: "Error al eliminar",
        message:
          "No se pudo eliminar el producto, inténtalo nuevamente más tarde.",
        confirmText: "Ok",
        type: "error",
      });
    }
  };

  // 🔹 Formato de precios en colones
  const formatCRC = (n: number) =>
    n?.toLocaleString("es-CR", { style: "currency", currency: "CRC" });

  return (
    <figure
      className="relative flex items-center justify-between w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md border border-gray-100 
                hover:border-contrast-secondary/40 transition-all duration-500 overflow-hidden mb-5 font-quicksand"
    >
      {/* Imagen */}
      <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-inner">
        <Link to={`/product/${product.id}`}>
          <img
            src={
              product.image_1_url ||
              "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"
            }
            alt={product.name}
            className="object-contain w-full h-full transition-transform duration-500 cursor-pointer hover:scale-105"
          />
        </Link>
      </div>

      {/* Información principal */}
      <div className="flex flex-col justify-between flex-grow px-6 py-2">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-bold text-lg text-gray-800 cursor-pointer hover:text-main transition-colors">
                {product.name}
              </h3>
            </Link>
            <span
              className={`text-xs ${product.stock > 0
                  ? "text-green-600"
                  : "text-red-500 font-semibold"
                }`}
            >
              {product.stock > 0 ? "Disponible" : "Agotado"}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            Tienda: <span className="font-medium">Desconocida</span>
          </p>
          <StarRatingComponent value={4} size={12} />
        </div>

        {/* Cantidad */}
        <div className="mt-3 flex items-center justify-start gap-3">
          <div className="flex items-center bg-white border border-contrast-secondary/60 rounded-full shadow-sm">
            <button
              onClick={() => updateQuantity(item.quantity - 1)}
              disabled={updating}
              className="px-3 py-1 text-lg font-semibold text-contrast-main hover:text-contrast-secondary disabled:opacity-50 transition-colors"
            >
              −
            </button>
            <span className="px-3 text-base font-semibold text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.quantity + 1)}
              disabled={updating}
              className="px-3 py-1 text-lg font-semibold text-contrast-main hover:text-contrast-secondary disabled:opacity-50 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Precio y acciones */}
      <div className="flex flex-col items-end justify-between h-full gap-3 pr-2">
        <div className="text-right">
          {product.discount_price && product.discount_price > 0 ? (
            <>
              <p className="text-xs line-through text-gray-400">
                {formatCRC(product.price)}
              </p>
              <p className="text-xl font-bold text-main bg-clip-text">
                {formatCRC(product.discount_price)}
              </p>
            </>
          ) : (
            <p className="text-xl font-bold text-main">
              {formatCRC(product.price)}
            </p>
          )}
        </div>

        {/* Acciones */}
        <div className="flex gap-3 text-main">
          <button className="p-2 rounded-full bg-gradient-to-br from-contrast-main to-contrast-secondary text-white hover:scale-110 shadow-md transition-transform duration-300">
            <IconHeart size={18} />
          </button>
          <button
            onClick={handleDelete}
            className="p-2 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white transition-all duration-300 shadow-sm hover:scale-110"
          >
            <IconTrash size={18} />
          </button>
        </div>
      </div>
    </figure>
  );
}
