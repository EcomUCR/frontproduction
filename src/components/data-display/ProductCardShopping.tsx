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
    if (newQuantity < 1) return; // evita cantidades menores a 1
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

  // 🔹 Eliminar producto (popup nativo)
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
    <figure className="flex border border-main rounded-xl my-5 w-full justify-between p-5 transition-all duration-300 hover:shadow-lg">
      {/* Imagen */}
      <div className="1/6 flex items-center justify-center pr-5">
        <img
          className="p-5 rounded-xl w-28 h-28 object-cover"
          src={product.image_1_url}
          alt={product.name}
        />
      </div>

      {/* Información */}
      <div className="font-quicksand w-4/6 flex flex-col justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="font-bold">{product.name}</p>
            <p className="text-xs text-green-600">
              {product.stock > 0 ? "Disponible" : "Agotado"}
            </p>
          </div>
          <p className="text-xs text-gray-500">Tienda: {product.name ?? "—"}</p>
          <StarRatingComponent value={4} size={10} />
        </div>

        {/* Cantidad */}
        <div className="flex justify-between">
          <div className="flex justify-between items-center border border-contrast-secondary rounded-full p-1">
            <p className="text-sm px-4">Cantidad</p>
            <div className="flex gap-8 border border-contrast-secondary rounded-full px-4">
              <button
                onClick={() => updateQuantity(item.quantity - 1)}
                className="hover:text-contrast-secondary"
              >
                -
              </button>
              <p className="font-bold">{item.quantity}</p>
              <button
                onClick={() => updateQuantity(item.quantity + 1)}
                className="hover:text-contrast-secondary"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Precio y acciones */}
      <div className="flex flex-col w-1/6 justify-between items-end">
        <div>
          {product.discount_price && product.discount_price > 0 ? (
            <>
              <p className="text-xs line-through text-gray-400">
                ₡{product.price}
              </p>
              <p className="font-bold text-main text-2xl">
                ₡{product.discount_price}
              </p>
            </>
          ) : (
            <p className="font-bold text-main text-2xl">₡{product.price}</p>
          )}
        </div>
        <div className="flex gap-2 text-main">
          <IconHeart />
          <IconTrash
            className="cursor-pointer hover:text-contrast-secondary transition-colors"
            onClick={handleDelete}
          />
        </div>
      </div>
    </figure>
  );
}
