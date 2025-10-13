import { IconEdit, IconHeart } from "@tabler/icons-react";
import ButtonComponent from "../ui/ButtonComponent";
import RaitingComponent from "../ui/StarRatingComponent";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/context/AuthContext";
import axios from "axios";
import { useAlert } from "../../hooks/context/AlertContext";

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
  const { token, setCart } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!token) {
      showAlert({
        title: "Inicia sesión",
        message: "Debes iniciar sesión para agregar productos al carrito",
        confirmText: "Ir al login",
        cancelText: "Cancelar",
        onConfirm: () => {
          navigate("/loginRegister");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "/cart/add",
        { product_id: props.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data.cart);
      showAlert({
        title: "Producto añadido",
        message: "El producto fue añadido al carrito correctamente",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Error al añadir",
        message: "Hubo un problema al añadir el producto al carrito",
        type: "error",
      });
    }
  };

  return (
    <figure
      className={`relative w-full max-w-lg p-4 bg-light-gray rounded-2xl shadow-md overflow-hidden flex font-quicksand transition-all duration-300
        ${
          props.edit ? "" : "hover:scale-105"
        } flex-col sm:flex-row items-center sm:items-stretch`}
    >
      {/* ✏️ Botón editar */}
      {props.edit && (
        <div className="absolute top-3 right-3 w-9 h-9 bg-contrast-main/70 rounded-full flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400">
          <IconEdit />
        </div>
      )}

      {/* 🖼️ Imagen */}
      <Link
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full sm:w-1/2 h-56 sm:h-60 flex items-center justify-center mb-4 sm:mb-0"
      >
        <img
          className="w-[80%] sm:w-auto h-full object-contain rounded-2xl"
          src={props.img}
          alt={props.title}
        />
      </Link>

      {/* 📄 Información */}
      <div className="flex flex-col justify-between w-full sm:w-1/2 sm:pl-6 py-1 text-center sm:text-left">
        <p className="font-light font-poiret text-sm sm:text-base">
          {props.shop}
        </p>

        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <h3 className="font-semibold text-md sm:text-lg">{props.title}</h3>
        </Link>

        <div className="flex justify-center sm:justify-start">
          <RaitingComponent value={props.rating} size={12} />
        </div>

        <div className="my-2 sm:my-0">
          {Number(props.discountPrice) > 0 ? (
            <>
              <p className="line-through font-comme text-xs text-black/30">
                ₡ {props.price}
              </p>
              <p className="font-comme text-base sm:text-md">
                ₡ {props.discountPrice}
              </p>
            </>
          ) : (
            <p className="font-comme text-base sm:text-md">₡ {props.price}</p>
          )}
        </div>

        {/* 🛒 Botones */}
        {!props.edit && (
          <div className="flex flex-col sm:flex-row gap-2 w-full text-white mt-2 sm:mt-0">
            <ButtonComponent
              style="bg-contrast-secondary w-full sm:w-auto rounded-full text-base hover:bg-gradient-to-br from-contrast-main via-contrast-secondary to-main transition-all duration-400 py-2 px-4 shadow-md"
              text={"Añadir al carrito"}
              onClick={handleAddToCart}
            />
            <ButtonComponent
              style="bg-contrast-main rounded-full h-auto w-full sm:w-auto p-2 flex items-center justify-center hover:bg-contrast-secondary transition-all duration-400 shadow-md"
              icon={<IconHeart />}
            />
          </div>
        )}
      </div>
    </figure>
  );
}
