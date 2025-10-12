import { IconEdit, IconHeart } from "@tabler/icons-react";
import ButtonComponent from "../ui/ButtonComponent";
import RaitingComponent from "../ui/StarRatingComponent";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/context/AuthContext"; // 👈 Importante
import axios from "axios";

interface FeaturedProductCardProps {
  id: number;
  shop: string;
  img?: string;
  title: string;
  price: string;
  discountPrice?: string;
  rating: number;
  edit: boolean;
}
export default function FeaturedProductCard(props: FeaturedProductCardProps) {

  const { token, setCart } = useAuth(); // 👈 traemos el carrito global y el token

   // 👇 Maneja añadir al carrito
  const handleAddToCart = async () => {
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito 🛒");
      return;
    }

    try {
      const { data } = await axios.post(
        "/cart/add",
        { product_id: props.id, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Actualiza el carrito global con la respuesta del backend
      setCart(data.cart);
      alert("Producto añadido al carrito ✅");
    } catch (error) {
      console.error(error);
      alert("Error al añadir el producto al carrito ❌");
    }
  };

  return (
    <figure  className={`relative w-full max-w-lg p-4 bg-light-gray rounded-2xl shadow-md overflow-hidden flex font-quicksand transition-all duration-300 ${
    props.edit ? "" : "hover:scale-105"
  }`}>
      {props.edit && (
        <div className="absolute top-3 right-3 w-9 h-9 bg-contrast-main/70 rounded-full flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400">
          <IconEdit />
        </div>
      )}
      <Link
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-1/2 h-full flex items-center"
      >
        <img
          className="flex items-center w-auto h-60 object-contain rounded-2xl"
          src={props.img}
          alt={props.title}
        />
      </Link>
      <div className="flex flex-col justify-between w-1/2 pl-6 py-1">
        <p className="font-light font-poiret">{props.shop}</p>
        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <h3 className="font-semibold text-md">{props.title}</h3>
        </Link>
        <RaitingComponent value={props.rating} size={12} />
        <div>
          {Number(props.discountPrice) > 0 ? (
            <>
              <p className="line-through font-comme text-xs text-black/30">
                ₡ {props.price}
              </p>
              <p className="font-comme">₡ {props.discountPrice}</p>
            </>
          ) : (
            <p className="font-comme">₡ {props.price}</p>
          )}
        </div>
        {!props.edit && (
          <div className="flex gap-2 w-full text-white">
            <ButtonComponent
              style="bg-contrast-secondary w-full rounded-full text-base hover:bg-gradient-to-br from-contrast-main via-contrast-secondary to-main transition-all duration-400 py-2 shadow-md"
              text={"Añadir al carrito"}
              onClick={handleAddToCart} // 👈 evento
            />
            <ButtonComponent
              style="bg-contrast-main rounded-full h-auto w-auto p-2 flex items-center justify-center hover:bg-contrast-secondary transition-all duration-400 shadow-md"
              icon={<IconHeart />}
              iconStyle=""
            />
          </div>
        )}
      </div>
    </figure>
  );
}
