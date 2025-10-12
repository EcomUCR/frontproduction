import { useEffect, useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import audifonos from "../../../img/resources/audifonos.jpg";
import FormShopping from "../../../components/forms/FormShopping";
import StarRatingComponent from "../../../components/ui/StarRatingComponent";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import FeaturedProductsSlider from "../../../components/data-display/FeaturedProductsSlider";
import {
  IconArrowBackUp,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandWhatsapp,
  IconBrandX,
  IconChevronRight,
  IconHeart,
  IconLink,
  IconShare,
} from "@tabler/icons-react";
import { Link, useParams } from "react-router-dom";
import type { Product } from "../infrastructure/useProducts";
import { useProducts } from "../infrastructure/useProducts";
import {
  SkeletonProductPageMain,
  SkeletonFeaturedSlider,
  SkeletonSimilarProducts,
  SkeletonFeatured,
} from "../../../components/ui/AllSkeletons";
import ProductCard from "../../../components/data-display/ProductCard";

type BorderColors = {
  description: string;
  reviews: string;
  details: string;
};

const borderColors: BorderColors = {
  description: "border-main",
  reviews: "border-contrast-main",
  details: "border-contrast-secondary",
};


export default function ProductPage() {
  const { id } = useParams();
  const { getProductById, getProductsByCategory, getProductsByStore } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [prodStore, setProdStore] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<keyof BorderColors>("description");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        // 1️⃣ Obtener el producto principal
        const prod = await getProductById(Number(id));
        setProduct(prod);

        // 2️⃣ Si tiene store_id válido, traer productos de la misma tienda
        if (prod?.store_id) {
          const storeProducts = await getProductsByStore(prod.store_id);
          setProdStore(
            storeProducts
              .filter((p) => p.id !== prod.id) // excluir el mismo producto
              .slice(0, 10)
          );
        } else {
          setProdStore([]);
        }
      } catch (err) {
        console.error("Error al cargar producto o tienda:", err);
      } finally {
        setTimeout(() => setLoading(false), 600);
      }
    })();
  }, [id]);


  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!product) return;

    (async () => {
      try {
        // 1️⃣ Obtener IDs de categorías del producto actual
        const categoryIds = product.categories?.map((c: any) => c.id) || [];

        if (categoryIds.length === 0) {
          setSimilarProducts([]);
          return;
        }

        // 2️⃣ Obtener productos por categoría (acumulando sin duplicar)
        const allRelated: Product[] = [];
        for (const catId of categoryIds) {
          const products = await getProductsByCategory(catId);
          allRelated.push(...products);
        }

        // 3️⃣ Filtrar duplicados y el producto actual
        const unique = allRelated.filter(
          (p, i, arr) =>
            p.id !== product.id &&
            arr.findIndex((x) => x.id === p.id) === i
        );

        // 4️⃣ Limitar a máximo 5
        setSimilarProducts(unique.slice(0, 10));

      } catch (err) {
        console.error("Error al cargar productos similares:", err);
      }
    })();
  }, [product]);


  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="mx-auto max-w-[80rem] w-full">
        {/* 🔹 Botón volver */}
        <section className="flex px-10 pt-10 font-quicksand">
          <ButtonComponent
            icon={<IconArrowBackUp />}
            text="Volver"
            style="flex text-sm px-2 items-center gap-2 rounded-full cursor-pointer hover:scale-105 transition-all duration-300"
            onClick={() => window.history.back()}
          />
        </section>

        {/* ==============================
            🔸 SKELETONS (Mientras carga)
           ============================== */}
        {loading ? (
          <>
            <SkeletonProductPageMain show={loading} />
            <section className="my-10 px-10">
              <h2 className="text-2xl font-semibold font-quicksand">
                Más de la tienda
              </h2>
              <SkeletonFeaturedSlider show={loading} />
            </section>
            <section className="my-10 px-10">
              <h2 className="text-2xl font-semibold font-quicksand">
                Productos similares
              </h2>
              <SkeletonSimilarProducts show={loading} />
            </section>
          </>
        ) : (
          <>
            {/* ==============================
                🔸 CONTENIDO REAL DEL PRODUCTO
               ============================== */}
            {product && (
              <>
                <section className="flex px-10 pt-5 font-quicksand">
                  {/* 🔹 Columna Izquierda - Imagen */}
                  <div className="w-3/12 pt-10">
                    <div className="flex items-center justify-center overflow-hidden rounded-2xl aspect-square mb-10">
                      <img
                        src={product.image_1_url}
                        alt={product.name}
                        className="w-full h-full object-cover object-center rounded-2xl"
                      />
                    </div>


                    {/* 🔹 Botones de acción */}
                    <div className="border-t-2 border-main pt-10">
                      <div className="flex relative border border-contrast-secondary rounded-full px-3 py-2">
                        <ButtonComponent
                          icon={<IconHeart />}
                          text="Agregar a la lista de deseos"
                          style="flex text-sm px-2 gap-2 items-center hover:font-semibold"
                          iconStyle="text-contrast-secondary"
                        />
                        <ButtonComponent
                          icon={<IconShare />}
                          text="Compartir"
                          style="flex text-sm px-2 items-center gap-2 hover:font-semibold rounded-full"
                          iconStyle="text-contrast-secondary"
                          onClick={() => setIsModalOpen((prev) => !prev)}
                        />

                        {/* 🔹 Menú desplegable de redes */}
                        <div className="absolute left-15 top-30">
                          <ul className="flex gap-3">
                            <li
                              className={`relative bottom-10 left-27 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-0 ${isModalOpen ? "scale-100" : "scale-0"
                                }`}
                            >
                              <IconLink />
                            </li>
                            <li
                              className={`relative bottom-0 left-24 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-25 ${isModalOpen ? "scale-100" : "scale-0"
                                }`}
                            >
                              <IconBrandWhatsapp />
                            </li>
                            <li
                              className={`relative -bottom-1 left-24 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-50 ${isModalOpen ? "scale-100" : "scale-0"
                                }`}
                            >
                              <IconBrandFacebook />
                            </li>
                            <li
                              className={`relative bottom-5 left-23 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-75 ${isModalOpen ? "scale-100" : "scale-0"
                                }`}
                            >
                              <IconBrandInstagram />
                            </li>
                            <li
                              className={`relative bottom-17 left-15 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-100 ${isModalOpen ? "scale-100" : "scale-0"
                                }`}
                            >
                              <IconBrandTiktok />
                            </li>
                            <li
                              className={`relative bottom-30 -left-1 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-125 ${isModalOpen ? "scale-100" : "scale-0"
                                }`}
                            >
                              <IconBrandX />
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 🔹 Columna Central */}
                  <div className="w-6/12 px-20 border-r-2 border-main mr-5">
                    <div className="flex flex-col gap-5">
                      <h2 className="text-xl font-bold">{product.name}</h2>
                      <Link
                        to={`/store/${product.store_id}`}
                        className="text-xs font-bold"
                      >
                        Visitar la tienda {product.store?.name || ""}
                      </Link>
                      <div className="flex gap-2">
                        <StarRatingComponent value={4} size={12} />
                        <p className="text-xs">(20)</p>
                      </div>

                      <div className="font-comme">
                        {product.discount_price &&
                          product.discount_price > 0 ? (
                          <>
                            <p className="text-xs line-through">
                              ₡{product.price}
                            </p>
                            <p className="text-2xl font-bold text-main">
                              ₡{product.discount_price}
                            </p>
                          </>
                        ) : (
                          <p className="text-2xl font-bold text-main">
                            ₡{product.price}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 🔹 Tabs */}
                    <div
                      className={`rounded-full border text-sm flex justify-between my-10 ${borderColors[activeTab]}`}
                    >
                      <ButtonComponent
                        text="Descripción"
                        onClick={() => setActiveTab("description")}
                        style={
                          activeTab === "description"
                            ? "bg-main p-4 m-1 rounded-full text-white font-bold"
                            : "pl-6 text-main-dark/50 hover:text-main hover:font-semibold"
                        }
                      />
                      <ButtonComponent
                        text="Calificaciones"
                        onClick={() => setActiveTab("reviews")}
                        style={
                          activeTab === "reviews"
                            ? "bg-contrast-main p-4 m-1 rounded-full text-white font-bold"
                            : "text-main-dark/50 hover:text-main hover:font-semibold"
                        }
                      />
                      <ButtonComponent
                        text="Detalles"
                        onClick={() => setActiveTab("details")}
                        style={
                          activeTab === "details"
                            ? "bg-contrast-secondary p-4 m-1 rounded-full text-white font-bold"
                            : "pr-6 text-main-dark/50 hover:text-main hover:font-semibold"
                        }
                      />
                    </div>

                    {/* 🔹 Contenido Tabs */}
                    <div>
                      {activeTab === "description" && (
                        <p className="whitespace-pre-line overflow-y-auto p-5 relative h-80">{product.description || "Sin descripción."}</p>
                      )}
                      {activeTab === "reviews" && (
                        <p className="whitespace-pre-line overflow-y-auto p-6 relative h-80">Este producto aún no tiene calificaciones.</p>
                      )}
                      {activeTab === "details" && (
                        <p className="whitespace-pre-line overflow-y-auto p-6 relative h-80">
                          No se han agregado detalles adicionales para este
                          producto.
                        </p>
                      )}
                    </div>
                  </div>

                  {/* 🔹 Formulario de compra */}
                  <div className="w-3/12">
                    <FormShopping />
                  </div>
                </section>

                {/* 🔹 Más productos de la tienda */}
                <section className="my-10 px-10">
                  <h2 className="text-2xl font-semibold font-quicksand">
                    Más de {product.store?.name || "la tienda"}
                  </h2>
                  {loading ? (
                    <div className="transition-opacity duration-500 opacity-100">
                      <SkeletonFeatured count={2} />
                    </div>
                  ) : prodStore.length > 0 ? (
                    <div
                      className={`transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"
                        }`}
                    >
                      <FeaturedProductsSlider
                        products={prodStore.map((prod) => ({
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
                    <p className="text-gray-500 my-5">La tienda no tiene más productos.</p>
                  )}
                </section>

                {/* 🔹 Productos similares */}
                <section className="my-10 px-10">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold font-quicksand">
                      Productos similares
                    </h2>
                    <div>
                      <a href="/search?mode=explore" className="font-semibold cursor-pointer">
                        Ver todo
                      </a>
                      <IconChevronRight className="inline" />
                    </div>
                  </div>
                  <div className="grid grid-cols-5 my-10 gap-5">
                    {similarProducts.length > 0 ? (
                      similarProducts.slice(0, 10).map((prod) => (
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
                      ))
                    ) : (
                      <p className="col-span-5 text-center text-sm text-gray-500 font-quicksand">
                        No hay productos similares.
                      </p>
                    )}
                  </div>
                </section>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
