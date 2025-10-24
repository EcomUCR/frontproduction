import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import banner2 from "../../../img/resources/SmallBanner2.png";
import { useAuth } from "../../../hooks/context/AuthContext";
import ProductCardWishList from "../../../components/data-display/ProductCardWishList";
import ShareBubbles from "../../../components/data-display/ShareBubbles";

export default function WishListPage() {
    const { loading } = useAuth();

    if (loading)
        return <p className="text-center py-10">Cargando wishlist...</p>;
    return (
        <div>
            <NavBar />
            <div className="mx-auto max-w-[80rem] px-4 sm:px-10">
                {/* Encabezado */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-10">
                    <h1 className="text-xl sm:text-3xl font-quicksand font-bold border-b-4 border-main pb-2 w-fit">
                        Lista de deseos
                    </h1>
                </div>

                {/* Lista de productos */}
                <section className="mt-6 flex flex-col gap-4">
                    <ProductCardWishList
                        product={{
                            id: 12,
                            name: "Cámara Nikon D3500",
                            price: 350000,
                            discount_price: 299000,
                            stock: 5,
                            image_1_url: "https://cdn.tukishop.com/camara.png",
                            store_name: "Fototienda CR",
                            rating: 4.5,
                        }}
                        onDelete={(id) => console.log("Eliminar producto:", id)}
                        onAddToCart={(p) => console.log("Agregar al carrito:", p)}
                    />
                </section>

                {/* Compartir */}
                <section className="flex flex-col items-center justify-center text-center py-10 font-quicksand px-4 sm:px-0">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3">
                        ¡Compartí tu wishlist con tus amigos!
                    </h3>
                    <p className="text-gray-500 text-sm mb-5 max-w-md">
                        Envía tu lista de deseos para que otros puedan ver tus productos favoritos y agregarlos a su carrito.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto items-center justify-center border-contrast-secondary border-2 py-2 px-30 sm:py-3 rounded-full">
                        <ShareBubbles  />
                    </div>

                </section>

                {/* Banners */}
                <section className="flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-4 px-0 sm:px-10 py-10">
                    <img
                        className="w-[90%] sm:w-auto h-auto rounded-xl"
                        src={banner2}
                        alt="banner"
                    />
                    <img
                        className="w-[90%] sm:w-auto h-auto rounded-xl"
                        src={banner2}
                        alt="banner"
                    />
                </section>
            </div>
            <Footer />
        </div>
    );
}
