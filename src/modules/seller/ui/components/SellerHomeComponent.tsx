import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconChevronRight } from "@tabler/icons-react";
import ProductCard from "../../../../components/data-display/ProductCard";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import FeaturedProductsSlider from "../../../../components/data-display/FeaturedProductsSlider";
import audifonos from "../../../../img/resources/audifonos.jpg";
import { useProducts } from "../../infrastructure/useProducts";
import type { Product } from "../../infrastructure/useProducts";
import {
  SkeletonProduct,
  SkeletonFeatured,
} from "../../../../components/ui/AllSkeletons";

export default function HomeSeller() {
  const { id } = useParams();
  const { getProductsByStore, getFeaturedProductsByStore } = useProducts();

  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [offers, setOffers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const storeId = Number(id);
        const allProducts = await getProductsByStore(storeId);
        const featured = await getFeaturedProductsByStore(storeId);

        setProducts(allProducts);
        setFeaturedProducts(featured);
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
    <div>
      {/* 🟣 Ofertas */}
      <section className="mx-10 my-5">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>
          <div>
            <a href="#" className="font-semibold">
              Ver todo
            </a>
            <IconChevronRight className="inline" />
          </div>
        </div>

        {loading ? (
          <div className="transition-opacity duration-500 opacity-100">
            <SkeletonProduct count={5} />
          </div>
        ) : offers.length > 0 ? (
          <div
            className={`grid grid-cols-5 my-10 gap-5 transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
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

      {/* ⭐ Productos destacados */}
      <section className="mx-10 my-5">
        <h2 className="text-2xl font-semibold font-quicksand">
          Productos destacados
        </h2>

        {loading ? (
          <div className="transition-opacity duration-500 opacity-100">
            <SkeletonFeatured count={2} />
          </div>
        ) : featuredProducts.length > 0 ? (
          <div
            className={`transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            <FeaturedProductsSlider
              products={featuredProducts.map((prod) => ({
                id: prod.id!,
                shop: prod.store?.name || "Tienda",
                title: prod.name,
                price: prod.price.toLocaleString("es-CRC"),
                discountPrice: prod.discount_price
                  ? prod.discount_price.toLocaleString("es-CRC")
                  : "",
                rating: 0,
                img: prod.image_1_url || audifonos,
              }))}
            />
          </div>
        ) : (
          <p className="text-gray-500 my-5">No hay productos destacados.</p>
        )}
      </section>

      {/* 🧩 Todos los productos */}
      <section className="mx-10 my-5">
        <h2 className="text-2xl font-semibold font-quicksand">
          Todos los productos
        </h2>

        {loading ? (
          <div className="transition-opacity duration-500 opacity-100">
            <SkeletonProduct count={10} />
          </div>
        ) : products.length > 0 ? (
          <div
            className={`grid grid-cols-5 my-10 gap-5 transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
          >
            {products.slice(0, 10).map((prod) => (
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
          <p className="text-gray-500">No hay productos disponibles.</p>
        )}

        {!loading && (
          <div className="flex flex-col justify-center items-center w-full">
            <ButtonComponent
              text="Ver más"
              style="bg-contrast-secondary text-white px-5 py-2 rounded-full hover:bg-contrast-main transition-all duration-300 ease-in-out cursor-pointer w-[30%]"
            />
          </div>
        )}
      </section>
    </div>
  );
}
