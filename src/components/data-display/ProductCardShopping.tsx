import { IconHeart, IconTrash } from "@tabler/icons-react";
import StarRatingComponent from "../ui/StarRatingComponent";
import type { CartItemType } from "../../hooks/context/AuthContext"; // 👈 importa el tipo

interface Props {
  item: CartItemType;
}

export default function ProductCardShopping({ item }: Props) {
  const { product } = item;

  return (
    <figure className="flex border border-main rounded-xl my-5 w-full justify-between p-5">
      {/* Imagen del producto */}
      <div className="1/6 flex items-center justify-center pr-5">
        <img
          className="p-5 rounded-xl w-28 h-28 object-cover"
          src={product.image_1_url}
          alt={product.name}
        />
      </div>

      {/* Información del producto */}
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
              <button>-</button>
              <p className="font-bold">{item.quantity}</p>
              <button>+</button>
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
          <IconTrash className="cursor-pointer" />
        </div>
      </div>
    </figure>
  );
}
