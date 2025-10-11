
import audifonos from '../../../../img/resources/audifonos.jpg';
import ProductCard from '../../../../components/data-display/ProductCard';
import { useProducts } from "../../infrastructure/useProducts";
import type { Product } from "../../infrastructure/useProducts";
import { SkeletonProduct } from "../../../../components/ui/AllSkeletons";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export default function SellerOffersPage() {

    const { id } = useParams();
    const { getProductsByStore } = useProducts();

    const [offers, setOffers] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const fetchData = async () => {
            try {
                const storeId = Number(id);
                const allProducts = await getProductsByStore(storeId);
                setOffers(
                    allProducts.filter(
                        (p) => p.discount_price && Number(p.discount_price) > 0
                    )
                );
            } catch (err) {
                console.error("Error al cargar productos del vendedor:", err);
            } finally {
                // 🔹 Pequeño delay para transición más suave del skeleton
                setTimeout(() => setLoading(false), 600);
            }
        };

        fetchData();
    }, [id]);

    return (
        <section className="mx-10 my-5">
            <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>

                {loading ? (
                    <div className="transition-opacity duration-500 opacity-100">
                        <SkeletonProduct count={5} />
                    </div>
                ) : offers.length > 0 ? (
                    <div
                        className={`grid grid-cols-5 my-10 gap-5 transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"
                            }`}
                    >
                        {offers.slice(0, 5).map((prod) => (
                            <ProductCard
                                key={prod.id}
                                id={prod.id!}
                                shop={prod.store?.name || "Tienda"}
                                title={prod.name}
                                price={prod.price.toLocaleString("es-CRC")}
                                discountPrice={prod.discount_price?.toLocaleString("es-CRC")}
                                img={prod.image_1_url || audifonos}
                                edit={false}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 my-5">No hay productos en oferta.</p>
                )}
        </section>

    );
}