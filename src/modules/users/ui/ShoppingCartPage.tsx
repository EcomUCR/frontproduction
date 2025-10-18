import Footer from "../../../components/layout/Footer";
import FormShopping from "../../../components/forms/FormShopping";
import NavBar from "../../../components/layout/NavBar";
import ProductCardShopping from "../../../components/data-display/ProductCardShopping";
import banner2 from "../../../img/resources/SmallBanner2.png";
import { useAuth } from "../../../hooks/context/AuthContext";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { useEffect } from "react";
import axios from "axios";

export default function ShoppingCartPage() {
  const { cart, loading, token, setCart } = useAuth();

  // 🔹 Función para recargar carrito desde el backend
  const getCartItems = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/cart/me`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCart(data);
    } catch (error) {
      console.error("❌ Error al obtener carrito:", error);
    }
  };

  // 🔹 Escuchar evento global "cartUpdated"
  useEffect(() => {
    getCartItems();
    const reload = () => getCartItems();
    window.addEventListener("cartUpdated", reload);
    return () => window.removeEventListener("cartUpdated", reload);
  }, []);

  if (loading) return <p className="text-center py-10">Cargando carrito...</p>;

  const hasItems = cart && cart.items && cart.items.length > 0;

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-[80rem]">
        <section className="mx-10 flex">
          {/* 🛍️ Lista de productos */}
          <div className="my-5 w-2/3 border-r-2 pr-5 border-main flex flex-col">
            {hasItems ? (
              cart.items.map((item) => (
                <ProductCardShopping key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center font-semibold text-main text-lg py-10">
                Tu carrito está vacío
              </p>
            )}

            {/* 📞 Sección de ayuda */}
            <section className="flex flex-col items-center justify-center text-center py-10 font-quicksand">
              <h2 className="text-lg font-semibold mb-2">¿Necesitas ayuda?</h2>
              <p className="text-sm text-gray-700">
                Contáctanos de Lunes a Viernes de 8am a 6pm.
                <br />
                Sábado de 8am a 3pm.
              </p>
              <div className="flex gap-4 mt-6">
                <a
                  href="https://wa.me/50687355629"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-2 border border-[#ff7e47] rounded-full text-[#ff7e47] hover:bg-[#ff7e47] hover:text-white transition-all duration-300"
                >
                  <IconBrandWhatsapp size={20} />
                  WhatsApp
                </a>
              </div>
            </section>
          </div>

          {/* 💳 Formulario de pago */}
          <div className="my-10 pl-10 w-1/3">
            <FormShopping />
          </div>
        </section>

        {/* 🖼️ Banners */}
        <section>
          <div className="flex justify-between px-10 py-5">
            <img className="w-auto h-auto" src={banner2} alt="banner" />
            <img className="w-auto h-auto" src={banner2} alt="banner" />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
