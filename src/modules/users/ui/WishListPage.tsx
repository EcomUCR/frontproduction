import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import banner2 from "../../../img/resources/SmallBanner2.png";
import { useAuth } from "../../../hooks/context/AuthContext";
import ProductCardWishList from "../../../components/data-display/ProductCardWishList";
import { IconShare } from "@tabler/icons-react";
import { useState } from "react";

export default function WishListPage() {
    const { loading } = useAuth();
    const [copied, setCopied] = useState(false);

    if (loading) return <p className="text-center py-10">Cargando wishlist...</p>;

    const handleShareWishlist = async () => {
        const wishlistUrl = window.location.href;

        try {
            if (navigator.share) {
                // 📱 Para móviles y navegadores compatibles
                await navigator.share({
                    title: "Mi Wishlist en TukiShop 💜",
                    text: "Mira mi lista de deseos en TukiShop y agrega lo que te guste:",
                    url: wishlistUrl,
                });
            } else {
                // 💻 Copia el enlace al portapapeles
                await navigator.clipboard.writeText(wishlistUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            }
        } catch (err) {
            console.error("Error al compartir:", err);
        }
    };

    return (
        <div>
            <NavBar />
            <div className="mx-auto max-w-[80rem]">
                {/* Encabezado con botón */}
                <div className="flex items-center justify-between px-10 pt-10">
                    <h2 className="font-quicksand font-semibold text-3xl">
                        Lista de deseos
                    </h2>
                </div>

                {/* Lista de productos */}
                <section className="mx-10 mt-6 flex flex-col gap-4">
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
                <section className="flex flex-col items-center justify-center text-center py-10 font-quicksand">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                        ¡Compartí tu wishlist con tus amigos!
                    </h3>
                    <p className="text-gray-500 text-sm mb-5 max-w-md">
                        Envía tu lista de deseos para que otros puedan ver tus productos favoritos y agregarlos a su carrito.
                    </p>
                    <div className="flex gap-4 mt-2">
                        <button
                            onClick={handleShareWishlist}
                            className="flex items-center gap-2 bg-main text-white font-quicksand font-semibold px-4 py-2 rounded-full shadow-md hover:bg-contrast-secondary hover:scale-105 transition-all duration-300"
                        >
                            <IconShare size={18} />
                            {copied ? "¡Enlace copiado!" : "Compartir wishlist"}
                        </button>
                    </div>
                </section>


                {/* Banners */}
                <section>
                    <div className="flex justify-between px-10 py-10">
                        <img className="w-auto h-auto" src={banner2} alt="banner" />
                        <img className="w-auto h-auto" src={banner2} alt="banner" />
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}
