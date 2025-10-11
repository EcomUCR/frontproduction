import { IconHeart, IconTrash } from "@tabler/icons-react";
import StarRatingComponent from "../ui/StarRatingComponent";
import { useCart, type CartItem } from "../../hooks/context/CartContext";
import { Link } from "react-router-dom";

interface ProductCardShoppingProps {
  item: CartItem;
}

export default function ProductCardShopping({ item }: ProductCardShoppingProps) {
  const { updateQuantity, removeItem } = useCart();
  const { product } = item;

  // 🔹 Disminuir cantidad
  const handleDecrease = () => {
    if (item.quantity > 1) updateQuantity(item.id, item.quantity - 1);
  };

  // 🔹 Aumentar cantidad
  const handleIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  // 🔹 Eliminar producto
  const handleDelete = () => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar "${product.name}" del carrito?`
    );
    if (confirmed) removeItem(item.id);
  };

  return (
    <figure className="relative flex items-center justify-between w-full rounded-2xl p-5 shadow-md border border-gray-100 hover:border-contrast-secondary/40 transition-all duration-500 overflow-hidden">
      {/* 🖼️ Imagen */}
      <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 rounded-2xl overflow-hidden bg-white shadow-inner">
        <Link to={`/product/${product.id}`}>
          <img
            src={
              product.image_1_url ||
              "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"
            }
            alt={product.name}
            className="object-contain w-full h-full transition-transform duration-500"
          />
        </Link>
      </div>

      {/* 🧾 Información principal */}
      <div className="flex flex-col justify-between flex-grow px-6 py-2 font-quicksand">
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Link to={`/product/${product.id}`}>
              <h3 className="font-bold text-lg text-gray-800">{product.name}</h3>
            </Link>
            <span
              className={`text-xs ${product.stock && product.stock > 0
                  ? "text-green-600"
                  : "text-red-500 font-semibold"
                }`}
            >
              {product.stock && product.stock > 0 ? "Disponible" : "Agotado"}
            </span>
          </div>

          <p className="text-xs text-gray-500">
            Tienda:{" "}
            <span className="font-medium">
              {product.store?.name ?? "Desconocida"}
            </span>
          </p>

          <StarRatingComponent value={4} size={12} />
        </div>

        {/* 🔢 Controles de cantidad */}
        <div className="mt-3 flex items-center justify-start gap-3">
          <div className="flex items-center bg-white border border-contrast-secondary/60 rounded-full shadow-sm">
            <button
              onClick={handleDecrease}
              className="px-3 py-1 text-lg font-semibold text-contrast-main hover:text-contrast-secondary transition-colors"
            >
              −
            </button>
            <span className="px-3 text-base font-semibold text-gray-800">
              {item.quantity}
            </span>
            <button
              onClick={handleIncrease}
              className="px-3 py-1 text-lg font-semibold text-contrast-main hover:text-contrast-secondary transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* 💰 Precio y acciones */}
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

        {/* ❤️🗑️ Botones */}
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

      {/* 💡 Efecto visual */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none bg-gradient-to-br from-contrast-main/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-700" />
    </figure>
  );
}
