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
  const [visibleCount, setVisibleCount] = useState(10);

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
        setTimeout(() => setLoading(false), 600);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      {/* 🟠 Ofertas */}
      <section className="mx-4 sm:mx-10 my-5">
        {!loading && offers.length > 0 && (
          <>
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h2 className="text-2xl font-semibold font-quicksand">
                Ofertas
              </h2>
              <div className="flex items-center text-sm sm:text-base">
                <a
                  href="#"
                  className="font-semibold hover:text-contrast-main transition-colors"
                >
                  Ver todo
                </a>
                <IconChevronRight className="inline ml-1" />
              </div>
            </div>

            <div
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 my-10 gap-4 sm:gap-5 transition-opacity duration-500 ${
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
          </>
        )}
      </section>

      {/* 🟢 Productos destacados */}
      <section className="mx-4 sm:mx-10 my-5">
        {!loading && featuredProducts.length > 0 && (
          <>
            <h2 className="text-2xl font-semibold font-quicksand mb-3">
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
          </>
        )}
      </section>

      {/* 🔵 Todos los productos */}
      <section className="mx-4 sm:mx-10 my-5">
        <h2 className="text-2xl font-semibold font-quicksand">
          Todos los productos
        </h2>

        {loading ? (
          <div className="transition-opacity duration-500 opacity-100">
            <SkeletonProduct count={10} />
          </div>
        ) : products.length > 0 ? (
          <>
            <div
              className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 my-10 gap-4 sm:gap-5 transition-opacity duration-500 ${
                loading ? "opacity-0" : "opacity-100"
              }`}
            >
              {products.slice(0, visibleCount).map((prod) => (
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

            {visibleCount < products.length && (
              <div className="flex flex-col justify-center items-center w-full">
                <ButtonComponent
                  text="Ver más"
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  style="bg-contrast-secondary text-white px-5 py-2 rounded-full hover:bg-contrast-main transition-all duration-300 ease-in-out cursor-pointer w-1/2 sm:w-[30%]"
                />
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500">No hay productos disponibles.</p>
        )}
      </section>
    </div>
  );
}
