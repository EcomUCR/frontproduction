import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import { useAuth } from "../../../hooks/context/AuthContext";
import { useBanner } from "../../admin/infrastructure/useBanner";
import ProductCardWishList from "../../../components/data-display/ProductCardWishList";
import ShareBubbles from "../../../components/data-display/ShareBubbles";
import BannerComponent from "../../../components/data-display/BannerComponent";
import { useEffect } from "react";

export default function WishListPage() {
    const { loading } = useAuth();
    const { banners, fetchBanners, loading: loadingBanners } = useBanner();

    // Cargar banners al montar
    useEffect(() => {
        fetchBanners();
    }, []);

    if (loading) return <p className="text-center py-10">Cargando wishlist...</p>;

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
                    <h3 className="text-lg sm:text-xl font-semibold text-main-dark mb-3">
                        ¡Compartí tu wishlist con tus amigos!
                    </h3>
                    <p className="text-main-dark/50 text-sm mb-5 max-w-md">
                        Envía tu lista de deseos para que otros puedan ver tus productos favoritos y agregarlos a su carrito.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 mt-2 w-full sm:w-auto items-center justify-center border-contrast-secondary border-2 py-2 px-10 sm:py-3 rounded-full">
                        <ShareBubbles positionClass="absolute right-3 top-25" />
                    </div>
                </section>

                {/* Banners dinámicos */}
                <section className="mx-4 sm:mx-10 sm:my-10 my-6 pt-5">
                    {loadingBanners ? (
                        <p className="text-main-dark/50 text-center">Cargando banners...</p>
                    ) : banners.length > 0 ? (
                        (() => {
                            const activeBanners = banners.filter(
                                (b) => b.type === "SHORT" && b.is_active
                            );

                            if (activeBanners.length === 1) {
                                // Solo 1 → centrado
                                const b = activeBanners[0];
                                return (
                                    <div className="flex justify-center items-center">
                                        <div className="transition-transform duration-300">
                                            <BannerComponent
                                                {...b}
                                                image={
                                                    typeof b.image === "string"
                                                        ? b.image
                                                        : URL.createObjectURL(b.image)
                                                }
                                                character={
                                                    b.character
                                                        ? typeof b.character === "string"
                                                            ? b.character
                                                            : URL.createObjectURL(b.character)
                                                        : undefined
                                                }
                                            />
                                        </div>
                                    </div>
                                );
                            }

                            // 2 o más banners → grid
                            return (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-10 justify-center items-end">
                                    {activeBanners.map((b) => (
                                        <div
                                            key={b.id}
                                            className="transition-transform duration-300 flex justify-center"
                                        >
                                            <BannerComponent
                                                {...b}
                                                image={
                                                    typeof b.image === "string"
                                                        ? b.image
                                                        : URL.createObjectURL(b.image)
                                                }
                                                character={
                                                    b.character
                                                        ? typeof b.character === "string"
                                                            ? b.character
                                                            : URL.createObjectURL(b.character)
                                                        : undefined
                                                }
                                            />
                                        </div>
                                    ))}
                                </div>
                            );
                        })()
                    ) : (
                        <p className="text-main-dark/50 text-center">No hay banners activos</p>
                    )}
                </section>
            </div>
            <Footer />
        </div>
    );
}
