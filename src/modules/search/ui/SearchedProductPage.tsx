import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import ProductCard from "../../../components/data-display/ProductCard";
import { useProducts } from "../../seller/infrastructure/useProducts";
import type { Product } from "../../seller/infrastructure/useProducts";
import { SkeletonProduct } from "../../../components/ui/AllSkeletons";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../../../components/ui/pagination";




export default function SearchedProductPage() {
  const { categoryId } = useParams<{ categoryId: string }>();
  const location = useLocation();
  const { getProductsByCategory, getProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 30;

  const categories: Record<number | string, string> = {
    1: "Arte",
    2: "Automotriz",
    3: "Belleza",
    4: "Comida",
    5: "Decoración",
    6: "Deportes",
    7: "Gaming",
    8: "Herramientas",
    9: "Hogar",
    10: "Jardinería",
    11: "Juegos",
    12: "Juguetes",
    13: "Libros",
    14: "Limpieza",
    15: "Mascotas",
    16: "Música",
    17: "Oficina",
    18: "Ropa",
    19: "Salud",
    20: "Tecnología",
    21: "Otros",
  };

  // Detectar modo de búsqueda
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q"); // texto buscado
  const mode = searchParams.get("mode"); // explore, offers, best-sellers, etc.

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: Product[] = [];

      try {
        if (categoryId) {
          // 🔹 Filtrar por categoría
          data = await getProductsByCategory(Number(categoryId));
        } else if (mode === "explore" || mode === "best-sellers") {
          // 🔹 Explorar o más vendidos (por ahora igual)
          data = await getProducts();
        } else if (mode === "offers") {
          const all = await getProducts();
          data = all
            .filter((p) => {
              const discount = Number(p.discount_price ?? 0);
              return discount > 0 && discount < p.price;
            })
            .sort((a, b) => {
              const discountA = a.price - Number(a.discount_price ?? a.price);
              const discountB = b.price - Number(b.discount_price ?? b.price);
              return discountB - discountA;
            });
        } else if (query) {
          // 🔹 Búsqueda por texto
          const all = await getProducts();
          data = all.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase())
          );
        }
      } catch (err) {
        console.error("Error al cargar productos:", err);
      }

      setProducts(data);
      setLoading(false);
      setPage(1);
    };

    fetchData();
  }, [categoryId, query, mode]);

  const paginated = products.slice((page - 1) * limit, page * limit);

  // 🔹 Título dinámico
  const getTitle = () => {
    if (loading) return "Cargando productos...";
    if (categoryId) return `Resultados de "${categories[categoryId]}"`;
    if (mode === "explore") return "Explorar productos";
    if (mode === "offers") return "Ofertas especiales";
    if (mode === "best-sellers") return "Lo más vendido";
    if (query) return `Resultados para: "${query}"`;
    return "Productos";
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <NavBar />

      <div className="mx-auto max-w-[80rem] px-5 py-10 w-full">
        <h1 className="text-3xl font-bold font-quicksand mb-8">
          {getTitle()}
        </h1>

        {/* Estado de carga */}
        {loading ? (
          <SkeletonProduct count={30} />
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {paginated.map((prod) => (
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

            {products.length > limit && (
              <Pagination className="mt-10">
                <PaginationContent className="flex items-center justify-center gap-1 font-quicksand">
                  {/* Prev */}
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={() => setPage(page - 1)}
                      className={`${page === 1
                        ? "opacity-50 pointer-events-none bg-gray-200 text-gray-500"
                        : "hover:bg-main-dark/10 hover:text-main-dark cursor-pointer"
                        } rounded-full px-3 py-2 transition-all duration-300`}
                    />
                  </PaginationItem>

                  {/* Números */}
                  {Array.from({ length: Math.ceil(products.length / limit) }).map((_, index) => {
                    const current = index + 1;
                    const isActive = current === page;
                    return (
                      <PaginationItem key={current}>
                        <PaginationLink
                          onClick={() => {
                            setPage(current);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                          isActive={isActive}
                          className={`rounded-full w-9 h-9 flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isActive
                            ? "bg-contrast-secondary text-white shadow-md scale-105 cursor-pointer"
                            : "bg-main-dark/10 text-main-dark hover:bg-main-dark/20 cursor-pointer"
                            }`}
                        >
                          {current}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}

                  {/* Next */}
                  <PaginationItem>
                    <PaginationNext
                      onClick={() => setPage(page + 1)}
                      className={`${page >= Math.ceil(products.length / limit)
                        ? "opacity-50 pointer-events-none bg-gray-200 text-gray-500"
                        : "hover:bg-main-dark/10 hover:text-main-dark cursor-pointer"
                        } rounded-full px-3 py-2 transition-all duration-300`}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}



          </>
        ) : (
          <p className="text-center text-gray-500">
            No hay productos disponibles.
          </p>
        )}
      </div>

      <Footer />
    </div>
  );
}
