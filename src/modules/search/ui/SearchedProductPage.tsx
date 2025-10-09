import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import ProductCard from "../../../components/data-display/ProductCard";
import { useProducts } from "../../seller/infrastructure/useProducts";
import type { Product } from "../../seller/infrastructure/useProducts";

export default function SearchedProductPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { getProductsByCategory } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) return;

    (async () => {
      setLoading(true);
      const data = await getProductsByCategory(Number(categoryId));
      setProducts(data);
      setLoading(false);
    })();
  }, [categoryId]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <div className="mx-auto max-w-[80rem] px-5 py-10 w-full">
        <h1 className="text-3xl font-bold font-quicksand mb-8 text-center">
          {loading
            ? "Cargando productos..."
            : products.length > 0
            ? `Productos de la categoría #${categoryId}`
            : "No hay productos en esta categoría"}
        </h1>

        {!loading && products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {products.map((prod) => (
              <ProductCard
                key={prod.id}
                id={prod.id!}
                shop={prod.store?.name || "Sin tienda"}
                title={prod.name}
                price={prod.price.toLocaleString("es-CRC")}
                discountPrice={
                  prod.discount_price
                    ? prod.discount_price.toLocaleString("es-CRC")
                    : undefined
                }
                img={prod.image_1_url || "https://via.placeholder.com/200"}
                edit={false}
              />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
