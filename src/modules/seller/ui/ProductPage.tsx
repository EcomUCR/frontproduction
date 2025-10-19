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
import { useAuth } from "../../../hooks/context/AuthContext";
import axios from "axios";
import { useAlert } from "../../../hooks/context/AlertContext";
import { useNavigate } from "react-router-dom";
import AnimatedHeartButton from "../../../components/data-display/AnimatedHeartButton";
import { AnimatePresence, motion } from "framer-motion";

type BorderColors = {
  description: string;
  reviews: string;
  details: string;
};

export default function ProductPage() {
  const { id } = useParams();
  const { getProductById, getProductsByCategory, getProductsByStore } = useProducts();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [prodStore, setProdStore] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<keyof BorderColors>("description");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { token, setCart } = useAuth();
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  // Función para compartir en redes o copiar enlace
  const handleShare = async (platform: string) => {
    const wishlistUrl = window.location.href;
    const encodedUrl = encodeURIComponent(wishlistUrl);

    try {
      switch (platform) {
        case "link":
          await navigator.clipboard.writeText(wishlistUrl);
          showAlert({
            title: "Enlace copiado",
            message: "El enlace del producto fue copiado al portapapeles.",
            type: "success",
          });
          return;

        case "whatsapp":
          window.open(`https://wa.me/?text=${encodedUrl}`, "_blank");
          return;

        case "facebook":
          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, "_blank");
          return;

        case "x":
          window.open(
            `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(
              "Mira este producto en TukiShop!"
            )}`,
            "_blank"
          );
          return;

        case "instagram":
          showAlert({
            title: "Enlace copiado",
            message: "El enlace del producto fue copiado al portapapeles.",
            type: "success",
          });
          await navigator.clipboard.writeText(wishlistUrl);
          return;

        case "tiktok":
          showAlert({
            title: "Enlace copiado",
            message: "El enlace del producto fue copiado al portapapeles.",
            type: "success",
          });
          await navigator.clipboard.writeText(wishlistUrl);
          return;

        default:
          return;
      }
    } catch (err) {
      console.error("Error al compartir:", err);
      showAlert({
        title: "Error",
        message: "No se pudo compartir el enlace.",
        type: "error",
      });
    }
  };

  useEffect(() => {
    if (!id) return;

    (async () => {
      setLoading(true);
      try {
        const prod = await getProductById(Number(id));
        setProduct(prod);

        if (prod?.store_id) {
          const storeProducts = await getProductsByStore(prod.store_id);
          setProdStore(storeProducts.filter((p) => p.id !== prod.id).slice(0, 10));
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
        const categoryIds = product.categories?.map((c: any) => c.id) || [];

        if (categoryIds.length === 0) {
          setSimilarProducts([]);
          return;
        }

        const allRelated: Product[] = [];
        for (const catId of categoryIds) {
          const products = await getProductsByCategory(catId);
          allRelated.push(...products);
        }

        const unique = allRelated.filter(
          (p, i, arr) =>
            p.id !== product.id &&
            arr.findIndex((x) => x.id === p.id) === i
        );

        setSimilarProducts(unique.slice(0, 10));
      } catch (err) {
        console.error("Error al cargar productos similares:", err);
      }
    })();
  }, [product]);

  const handleAddToCart = async (productId: number) => {
    if (!token) {
      showAlert({
        title: "Inicia sesión",
        message: "Debes iniciar sesión para agregar productos al carrito",
        confirmText: "Ir al login",
        cancelText: "Cancelar",
        onConfirm: () => {
          navigate("/loginRegister");
          window.scrollTo({ top: 0, behavior: "smooth" });
        },
      });
      return;
    }

    try {
      const { data } = await axios.post(
        "/cart/add",
        { product_id: productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(data.cart);
      showAlert({
        title: "Producto añadido",
        message: "El producto fue añadido al carrito correctamente ",
        type: "success",
      });

      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(error);
      showAlert({
        title: "Error al añadir",
        message: "Hubo un problema al añadir el producto al carrito ",
        type: "error",
      });
    }
  };

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

        {loading ? (
          <>
            <SkeletonProductPageMain show={loading} />
            <section className="my-10 px-10">
              <h2 className="text-2xl font-semibold font-quicksand">Más de la tienda</h2>
              <SkeletonFeaturedSlider show={loading} />
            </section>
            <section className="my-10 px-10">
              <h2 className="text-2xl font-semibold font-quicksand">Productos similares</h2>
              <SkeletonSimilarProducts show={loading} />
            </section>
          </>
        ) : (
          <>
            {product && (
              <>
                <section className="flex px-10 pt-5 font-quicksand">
                  <div className="w-3/12 pt-10">
                    <div className="flex flex-col items-center">
                      {/*Imagen principal */}
                      <div className="w-full flex justify-center mb-5 pb-4">
                        <div className="relative w-[18rem] h-[18rem] overflow-hidden rounded-2xl">
                          <img
                            src={selectedImage || product.image_1_url || "https://via.placeholder.com/400"}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-contain transition-all duration-300 rounded-2xl"
                          />
                        </div>
                      </div>

                      {/*Miniaturas */}
                      <div className="flex gap-3 justify-center flex-wrap pb-5">
                        {[product.image_1_url, product.image_2_url, product.image_3_url]
                          .filter(Boolean)
                          .map((img, index) => (
                            <button
                              key={index}
                              onClick={() => setSelectedImage(img!)}
                              className={`w-20 h-20 rounded-xl overflow-hidden border-1 transition-all duration-300 ${selectedImage === img
                                  ? "border-main scale-105"
                                  : "border-transparent hover:scale-105"
                                }`}
                            >
                              <img
                                src={img!}
                                alt={`Miniatura ${index + 1}`}
                                className="w-full h-full object-cover object-center"
                              />
                            </button>
                          ))}
                      </div>

                    </div>

                    {/* 🔹 Botones de acción */}
                    <div className="border-t-2 border-main pt-10">
                      <div className="flex relative items-center justify-between border border-contrast-secondary rounded-full px-3 py-2">
                        <div className="flex items-center gap-2">
                          <AnimatedHeartButton
                            productId={product.id!}
                            label="Agregar a la lista de deseos"
                            variant="inline"
                          />
                        </div>

                        <div className="relative">
                          <ButtonComponent
                            icon={<IconShare />}
                            text="Compartir"
                            style="flex text-sm px-2 items-center gap-2 hover:font-semibold rounded-full"
                            iconStyle="text-contrast-secondary"
                            onClick={() => setIsModalOpen((prev) => !prev)}
                          />

                          {/* Menú desplegable */}
                          <div className="absolute right-23 top-25">
                            <ul className="flex gap-3">
                              <li
                                className={`relative bottom-10 left-27 bg-main hover:bg-sky-500 p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-0 ${isModalOpen ? "scale-100" : "scale-0"}`}
                                onClick={() => handleShare("link")}
                              >
                                <IconLink />
                              </li>
                              <li
                                className={`relative bottom-10 left-27 bg-main hover:bg-green-600 p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-50 ${isModalOpen ? "scale-100" : "scale-0"}`}
                                onClick={() => handleShare("whatsapp")}
                              >
                                <IconBrandWhatsapp />
                              </li>
                              <li
                                className={`relative bottom-10 left-27 bg-main hover:bg-blue-600 p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-100 ${isModalOpen ? "scale-100" : "scale-0"}`}
                                onClick={() => handleShare("facebook")}
                              >
                                <IconBrandFacebook />
                              </li>
                              <li
                                className={`relative bottom-10 left-27 bg-main hover:bg-orange-500 p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-150 ${isModalOpen ? "scale-100" : "scale-0"}`}
                                onClick={() => handleShare("instagram")}
                              >
                                <IconBrandInstagram />
                              </li>
                              <li
                                className={`relative bottom-10 left-27 bg-main hover:bg-rose-500 p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-200 ${isModalOpen ? "scale-100" : "scale-0"}`}
                                onClick={() => handleShare("tiktok")}
                              >
                                <IconBrandTiktok />
                              </li>
                              <li
                                className={`relative bottom-10 left-27 bg-main hover:bg-black p-2 rounded-full text-white transform transition-all duration-300 shadow-md delay-250 ${isModalOpen ? "scale-100" : "scale-0"}`}
                                onClick={() => handleShare("x")}
                              >
                                <IconBrandX />
                              </li>
                            </ul>
                          </div>
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
                        {product.discount_price && product.discount_price > 0 ? (
                          <>
                            <p className="text-xs line-through">₡{product.price}</p>
                            <p className="text-2xl font-bold text-main">
                              ₡{product.discount_price}
                            </p>
                          </>
                        ) : (
                          <p className="text-2xl font-bold text-main">₡{product.price}</p>
                        )}
                      </div>
                    </div>

                    {/* Tabs */}
                    <div
                      className={`relative flex justify-between items-center my-10 p-2 rounded-full overflow-hidden text-sm font-quicksand transition-colors duration-500 z-0 ${activeTab === "description"
                        ? "border-1 border-main"
                        : activeTab === "reviews"
                          ? "border-1 border-contrast-secondary"
                          : "border-1 border-contrast-main"
                        }`}
                    >
                      <div
                        className={`absolute top-[4px] left-[4px] h-[calc(100%-8px)] w-1/3 rounded-full shadow-md transition-all duration-500 ease-in-out z-0 ${activeTab === "description"
                          ? "bg-main"
                          : activeTab === "reviews"
                            ? "bg-contrast-secondary"
                            : "bg-contrast-main"
                          }`}
                        style={{
                          transform:
                            activeTab === "description"
                              ? "translateX(0%)"
                              : activeTab === "reviews"
                                ? "translateX(100%)"
                                : "translateX(200%)",
                        }}
                      />

                      <ButtonComponent
                        text="Descripción"
                        onClick={() => setActiveTab("description")}
                        style={`relative z-10 flex-1 py-3 rounded-full transition-all ${activeTab === "description"
                          ? "text-white font-bold"
                          : "text-main-dark/50 hover:text-main"
                          }`}
                      />

                      <ButtonComponent
                        text="Calificaciones"
                        onClick={() => setActiveTab("reviews")}
                        style={`relative z-10 flex-1 py-3 rounded-full transition-all ${activeTab === "reviews"
                          ? "text-white font-bold"
                          : "text-main-dark/50 hover:text-main"
                          }`}
                      />

                      <ButtonComponent
                        text="Detalles"
                        onClick={() => setActiveTab("details")}
                        style={`relative z-10 flex-1 py-3 rounded-full transition-all ${activeTab === "details"
                          ? "text-white font-bold"
                          : "text-main-dark/50 hover:text-main"
                          }`}
                      />
                    </div>

                    {/*Contenido Tabs */}

                    <div className="relative overflow-hidden h-80">
                      <AnimatePresence mode="wait">
                        {activeTab === "description" && (
                          <motion.p
                            key="description"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute inset-0 whitespace-pre-line overflow-y-auto p-5"
                          >
                            {product.description || "Sin descripción."}
                          </motion.p>
                        )}

                        {activeTab === "reviews" && (
                          <motion.p
                            key="reviews"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute inset-0 whitespace-pre-line overflow-y-auto p-6"
                          >
                            Este producto aún no tiene calificaciones.
                          </motion.p>
                        )}

                        {activeTab === "details" && (
                          <motion.p
                            key="details"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute inset-0 whitespace-pre-line overflow-y-auto p-6"
                          >
                            No se han agregado detalles adicionales para este producto.
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                  </div>

                  {/* Formulario de compra */}
                  <div className="w-3/12">
                    <FormShopping
                      variant="product"
                      onAddToCart={() => handleAddToCart(product.id!)}
                    />
                  </div>
                </section>

                {/* Más productos de la tienda */}
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

                {/* Productos similares */}
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
