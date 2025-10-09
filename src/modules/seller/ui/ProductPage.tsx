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
} from "../../../components/ui/AllSkeletons";

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

// 🔹 Ejemplo temporal de productos destacados
const featuredProducts = [
  {
    id: 1,
    shop: "Razer",
    title: "Audífonos Razer x Pokémon | Edición Gengar",
    price: "100.000",
    discountPrice: "50.000",
    rating: 4.5,
    img: audifonos,
  },
  {
    id: 2,
    shop: "Razer",
    title: "Audífonos Razer Kraken",
    price: "80.000",
    discountPrice: "55.000",
    rating: 4.2,
    img: audifonos,
  },
  {
    id: 3,
    shop: "Razer",
    title: "Mouse Razer Basilisk V3",
    price: "60.000",
    discountPrice: "49.000",
    rating: 4.8,
    img: audifonos,
  },
];

export default function ProductPage() {
  const { id } = useParams();
  const { getProductById } = useProducts();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<keyof BorderColors>("description");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 🔹 Cargar producto desde backend
  useEffect(() => {
    if (id) {
      (async () => {
        setLoading(true);
        const prod = await getProductById(Number(id));
        setProduct(prod);
        setTimeout(() => setLoading(false), 600); // leve retraso visual para el fade
      })();
    }
  }, [id]);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="mx-auto max-w-[80rem] w-full">
        {/* 🔹 Botón volver */}
        <section className="flex px-10 pt-5 font-quicksand">
          <ButtonComponent
            icon={<IconArrowBackUp />}
            text="Volver"
            style="flex text-sm px-2 items-center gap-2 rounded-full"
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
                <section className="flex px-10 pt-10 font-quicksand">
                  {/* 🔹 Columna Izquierda - Imagen */}
                  <div className="w-3/12">
                    <div className="flex flex-col items-center">
                      <img
                        className="rounded-2xl"
                        src={product.image_1_url}
                        alt={product.name}
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
                              className={`relative bottom-10 left-27 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-0 ${
                                isModalOpen ? "scale-100" : "scale-0"
                              }`}
                            >
                              <IconLink />
                            </li>
                            <li
                              className={`relative bottom-0 left-24 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-25 ${
                                isModalOpen ? "scale-100" : "scale-0"
                              }`}
                            >
                              <IconBrandWhatsapp />
                            </li>
                            <li
                              className={`relative -bottom-1 left-24 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-50 ${
                                isModalOpen ? "scale-100" : "scale-0"
                              }`}
                            >
                              <IconBrandFacebook />
                            </li>
                            <li
                              className={`relative bottom-5 left-23 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-75 ${
                                isModalOpen ? "scale-100" : "scale-0"
                              }`}
                            >
                              <IconBrandInstagram />
                            </li>
                            <li
                              className={`relative bottom-17 left-15 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-100 ${
                                isModalOpen ? "scale-100" : "scale-0"
                              }`}
                            >
                              <IconBrandTiktok />
                            </li>
                            <li
                              className={`relative bottom-30 -left-1 bg-main hover:bg-contrast-secondary p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-125 ${
                                isModalOpen ? "scale-100" : "scale-0"
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
                        <p>{product.description || "Sin descripción."}</p>
                      )}
                      {activeTab === "reviews" && (
                        <p>Este producto aún no tiene calificaciones.</p>
                      )}
                      {activeTab === "details" && (
                        <p>
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
                  <FeaturedProductsSlider products={featuredProducts} />
                </section>

                {/* 🔹 Productos similares */}
                <section className="my-10 px-10">
                  <h2 className="text-2xl font-semibold font-quicksand">
                    Productos similares
                  </h2>
                  <div className="grid grid-cols-5 my-10 gap-5">
                    {/* Acá iría ProductCard con productos reales similares */}
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
