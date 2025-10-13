import { Link } from "react-router-dom";
import { IconEdit, IconHeart, IconShoppingBag } from "@tabler/icons-react";
import ButtonComponent from "../ui/ButtonComponent";
import axios from "axios";
import { useAuth } from "../../hooks/context/AuthContext";
import { useAlert } from "../../hooks/context/AlertContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: number;
  shop: string;
  title: string;
  price: string;
  discountPrice?: string;
  img?: string;
  edit: boolean;
}

export default function ProductCard(props: ProductCardProps) {
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
        message: "El producto fue añadido al carrito correctamente ",
        type: "success",
      });
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Error al añadir",
        message: "Hubo un problema al añadir el producto al carrito ",
        type: "error",
      });
    }
  };

  return (
    <figure
      className="
        relative flex flex-col 
        h-90 w-55 p-3 bg-light-gray rounded-2xl shadow-md font-quicksand group
        transition-all duration-300 ease-in-out
        sm:w-55 sm:h-90   /* 💻 PC: igual que siempre */
        w-full h-auto     /* 📱 móvil: ocupa todo el ancho */
      "
    >
      {/* 🛠️ Botón editar */}
      {props.edit && (
        <Link to="/crudProduct">
          <ButtonComponent
            style="absolute top-4 right-4 w-9 h-9 bg-contrast-main rounded-xl flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400"
            icon={<IconEdit />}
          />
        </Link>
      )}

      {/* ❤️ Favorito */}
      {!props.edit && (
        <div className="group-hover:opacity-100 opacity-0 transition-all duration-300 ease-in-out">
          <ButtonComponent
            icon={<IconHeart />}
            iconStyle="text-white"
            style="absolute top-3 right-3 w-9 h-9 bg-contrast-main rounded-xl flex items-center cursor-pointer justify-center hover:bg-contrast-secondary hover:text-white transition-all duration-400"
          />
        </div>
      )}

      {/* 🖼️ Imagen */}
      <Link
        to={`/product/${props.id}`}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="w-full h-[55%] sm:h-[55%] xs:h-[65vw] mb-2" // 📱 solo móvil más alto
      >
        <img
          className="w-full h-full object-cover rounded-2xl"
          src={props.img}
          alt={props.title}
        />
      </Link>

      {/* 📦 Info producto */}
      <div className="flex flex-col justify-center items-center gap-3 h-auto pt-5">
        <Link
          to={`/product/${props.id}`}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <p className="font-semibold text-center text-sm sm:text-base line-clamp-2">
            {props.title}
          </p>
        </Link>

        {!props.edit && (
          <div className="relative w-full flex flex-col items-center">
            {/* 💻 Animación original (no tocamos en PC) */}
            <div className="text-center flex flex-col relative w-full gap-3 sm:group-hover:-translate-x-14 transition-all duration-300 ease-in-out">
              <p className="font-poiret text-sm">{props.shop}</p>
              <div className="flex flex-col">
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
            </div>

            {/* 🛒 Botón carrito */}
            <div
              className="
                sm:absolute sm:opacity-0 sm:group-hover:opacity-100 sm:translate-x-23 
                flex flex-col justify-between items-center 
                bg-contrast-main text-white font-semibold p-2 rounded-xl
                hover:bg-gradient-to-br from-contrast-main to-contrast-secondary 
                transition-all duration-300 cursor-pointer 
                mt-2 sm:mt-0 w-full sm:w-auto
              "
              onClick={handleAddToCart}
            >
              <IconShoppingBag />
              <ButtonComponent style="w-full text-xs" text="Añadir al carrito" />
            </div>
          </div>
        )}

        {props.edit && (
          <div className="text-center flex flex-col relative w-full gap-3">
            <p className="font-poiret text-sm">{props.shop}</p>
            <div className="flex flex-col">
              {(props.discountPrice && (
                <p className="line-through font-comme text-xs text-black/30">
                  ₡ {props.price}
                </p>
              )) || <p>₡ {props.price}</p>}
              {props.discountPrice && (
                <p className="font-comme">₡ {props.discountPrice}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </figure>
  );
}
