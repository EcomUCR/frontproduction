import { Link, useNavigate } from "react-router-dom";
import { IconEdit, IconShoppingBag } from "@tabler/icons-react";
import ButtonComponent from "../ui/ButtonComponent";
import { useAuth } from "../../hooks/context/AuthContext";
import { useAlert } from "../../hooks/context/AlertContext";
import AnimatedHeartButton from "./AnimatedHeartButton";
import { useCart } from "../../hooks/context/CartContext"; // 👈 nuevo import

interface ProductCardProps {
  id: number;
  shop: string;
  title: string;
  price: number;
  discountPrice?: number;
  img?: string;
  edit: boolean;
}

export default function ProductCard(props: ProductCardProps) {
  const { token } = useAuth();
  const { addToCart } = useCart(); // 👈 usar lógica centralizada del carrito
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  const formatPrice = (value?: number) => {
    const num = Number(value) || 0;
    return num.toLocaleString("es-CR").replace(/\s/g, ".");
  };

  // 🛒 Añadir producto al carrito
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
      await addToCart(props.id, 1); // 👈 usa el CartContext
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
    <figure className="relative flex flex-col w-44 sm:w-55 h-70 sm:h-90 p-3 bg-light-gray rounded-2xl shadow-md font-quicksand group transition-all duration-300">
      {/* ✏️ Botón editar (modo admin/tienda) */}
      {props.edit && (
        <Link
          to={`/editProduct/${props.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ButtonComponent
            style="absolute top-3 right-3 w-8 h-8 sm:w-9 sm:h-9 bg-contrast-main rounded-xl flex items-center justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400"
            icon={<IconEdit />}
          />
        </Link>
      )}

      {/* ❤️ Favorito (solo visible en hover escritorio y fijo en móvil) */}
      {!props.edit && (
        <>
          {/* Escritorio */}
          <div className="hidden sm:block group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
            <div className="absolute top-3 right-3">
              <AnimatedHeartButton productId={props.id} variant="filled" />
            </div>
          </div>

          {/* Móvil (visible siempre) */}
          <div className="sm:hidden absolute top-3 right-3">
            <AnimatedHeartButton productId={props.id} variant="filled" />
          </div>
        </>
      )}

      {/* 🛍️ Botón carrito (solo visible en mobile) */}
      {!props.edit && (
        <button
          onClick={handleAddToCart}
          className="sm:hidden absolute bottom-3 right-3 bg-gradient-to-br from-contrast-main to-contrast-secondary text-white p-2 rounded-xl hover:bg-gradient-to-br transition-all duration-300 active:scale-95"
        >
          <IconShoppingBag size={18} className="stroke-[2.5]" />
        </button>
      )}

      {/* 🖼️ Imagen del producto */}
      <Link
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full h-[55%] mb-2"
      >
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={
            props.img ||
            "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"
          }
          alt={props.title}
        />
      </Link>

      {/* 📄 Detalles del producto */}
      <div className="flex flex-col gap-2 sm:gap-3 h-[45%]">
        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="h-[33%]"
        >
          <p className="font-semibold text-center text-xs sm:text-sm line-clamp-2">
            {props.title}
          </p>
        </Link>

        {/* Vista usuario */}
        {!props.edit && (
          <div className="relative w-full flex pt-2 h-[66%]">
            <div className="text-center flex flex-col relative w-full gap-2 sm:gap-3 sm:group-hover:-translate-x-14 transition-all duration-300 ease-in-out">
              <p className="font-poiret text-xs sm:text-sm">{props.shop}</p>
              <div className="flex flex-col">
                {Number(props.discountPrice) > 0 ? (
                  <>
                    <p className="line-through font-comme text-[10px] sm:text-xs text-black/30">
                      ₡ {formatPrice(props.price)}
                    </p>
                    <p className="font-comme text-sm sm:text-base">
                      ₡ {formatPrice(props.discountPrice)}
                    </p>
                  </>
                ) : (
                  <p className="font-comme pt-2 text-sm sm:text-base">
                    ₡ {formatPrice(props.price)}
                  </p>
                )}
              </div>
            </div>

            {/* Hover botón añadir carrito (solo escritorio) */}
            <div
              className="hidden sm:flex absolute flex-col h-17 justify-between transform translate-x-23 opacity-0 group-hover:opacity-100 bg-contrast-main text-white font-semibold p-2 rounded-xl hover:bg-gradient-to-br from-contrast-main to-contrast-secondary items-center transition-all duration-300 cursor-pointer"
              onClick={handleAddToCart}
            >
              <IconShoppingBag className="w-5 h-5" />
              <button className="w-full text-xs cursor-pointer">
                Añadir al carrito
              </button>

            </div>
          </div>
        )}

        {/* Vista edición */}
        {props.edit && (
          <div className="text-center flex flex-col relative w-full gap-2 sm:gap-3">
            <p className="font-poiret text-xs sm:text-sm">{props.shop}</p>
            <div className="flex flex-col">
              {Number(props.discountPrice) > 0 ? (
                <>
                  <p className="line-through font-comme text-[10px] sm:text-xs text-black/30">
                    ₡ {formatPrice(props.price)}
                  </p>
                  <p className="font-comme text-sm sm:text-base">
                    ₡ {formatPrice(props.discountPrice)}
                  </p>
                </>
              ) : (
                <p className="font-comme pt-2 text-sm sm:text-base">
                  ₡ {formatPrice(props.price)}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
