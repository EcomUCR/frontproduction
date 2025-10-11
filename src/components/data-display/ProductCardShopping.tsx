import { IconHeart, IconTrash } from "@tabler/icons-react";
import StarRatingComponent from "../ui/StarRatingComponent";
import type { CartItemType } from "../../hooks/context/AuthContext";
import { useAuth } from "../../hooks/context/AuthContext";
import axios from "axios";

interface Props {
  item: CartItemType;
}

export default function ProductCardShopping({ item }: Props) {
  const { product } = item;
  const { token, setCart } = useAuth();

  // 🔹 Actualizar cantidad (+/-)
  const updateQuantity = async (newQuantity: number) => {
    if (newQuantity < 1) return;
    try {
      const { data } = await axios.patch(
        `/cart/item/${item.id}`,
        { quantity: newQuantity },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(data.cart);
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
      alert("No se pudo actualizar la cantidad ❌");
    }
  };

  // 🔹 Eliminar producto
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.name}" del carrito?`
    );
    if (!confirmed) return;

    try {
      const { data } = await axios.delete(`/cart/item/${item.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCart(data.cart);
      alert("Producto eliminado del carrito ✅");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      alert("No se pudo eliminar el producto ❌");
    }
  };

  return (
    <figure
      className="relative flex items-center justify-between w-full bg-gradient-to-br from-white to-gray-50 rounded-2xl p-5 shadow-md border border-gray-100 
                 hover:shadow-xl hover:border-contrast-secondary/40 transition-all duration-500 overflow-hidden hover:scale-[1.01]"
    >
      {/* Imagen */}
      <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-inner">
        <img
          src={
            product.image_1_url ||
            "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"
          }
          alt={product.name}
          className="object-contain w-full h-full transition-transform duration-500 hover:scale-110"
        />
      </div>

      {/* Información principal */}
      <div className="flex flex-col justify-between flex-grow px-6 py-2 font-quicksand">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
            <span
              className={`text-xs ${
                product.stock > 0
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
              className="px-3 py-1 text-lg font-semibold text-contrast-main hover:text-contrast-secondary transition-colors"
            >
              −
            </button>
            <span className="px-3 text-base font-semibold text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.quantity + 1)}
              className="px-3 py-1 text-lg font-semibold text-contrast-main hover:text-contrast-secondary transition-colors"
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
                ₡{product.price}
              </p>
              <p className="text-xl font-bold bg-gradient-to-r from-contrast-main to-contrast-secondary bg-clip-text text-transparent">
                ₡{product.discount_price}
              </p>
            </>
          ) : (
            <p className="text-xl font-bold text-contrast-main">
              ₡{product.price}
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

      {/* Efecto de iluminación suave */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-contrast-main/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
    </figure>
  );
}
