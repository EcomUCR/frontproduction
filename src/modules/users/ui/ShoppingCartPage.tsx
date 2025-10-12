import Footer from "../../../components/layout/Footer";
import FormShopping from "../../../components/forms/FormShopping";
import NavBar from "../../../components/layout/NavBar";
import ProductCardShopping from "../../../components/data-display/ProductCardShopping";
import banner2 from "../../../img/resources/SmallBanner2.png";
import { useAuth } from "../../../hooks/context/AuthContext"; // 👈 importa el contexto

export default function ShoppingCartPage() {
  const { cart, loading } = useAuth();

  if (loading) return <p className="text-center py-10">Cargando carrito...</p>;

  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-[80rem]">
        <section className="mx-10 flex">
          {/* 🛒 Lista de productos */}
          <div className="my-5 w-2/3 border-r-2 pr-5 border-main flex flex-col items-center justify-center">
            {cart && cart.items.length > 0 ? (
              cart.items.map((item) => (
                <ProductCardShopping key={item.id} item={item} />
              ))
            ) : (
              <p className="text-center font-semibold text-purple-700 text-lg py-10">
                No hay productos que mostrar 🛒
              </p>
            )}
          </div>

          {/* 🧾 Formulario de pago */}
          <div className="my-10 pl-10 w-1/3">
            <FormShopping />
          </div>
        </section>

        {/* 🔹 Banners */}
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
