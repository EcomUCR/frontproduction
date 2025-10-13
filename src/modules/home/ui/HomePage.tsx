import HeaderSlider from "../../../components/navigation/HeaderSlider";
import NavBar from "../../../components/layout/NavBar";
import {
  SkeletonProduct,
  SkeletonFeatured,
  SkeletonCategory,
} from "../../../components/ui/AllSkeletons";

import audifonos from "../../../img/resources/audifonos.jpg";
import smallBanner1 from "../../../img/resources/SmallBanner1.png";
import smallBanner2 from "../../../img/resources/SmallBanner2.png";
import FeaturedProductsSlider from "../../../components/data-display/FeaturedProductsSlider";
import { useEffect, useState } from "react";
import { useProducts } from "../../seller/infrastructure/useProducts";
import type { Product } from "../../seller/infrastructure/useProducts";
import CategorySlider from "../../../components/data-display/CategorySlider";
import ProductCard from "../../../components/data-display/ProductCard";
import { IconChevronRight } from "@tabler/icons-react";
import Footer from "../../../components/layout/Footer";

export default function HomePage() {
  const { getProducts, getFeaturedProducts } = useProducts();
  const [offerProducts, setOfferProducts] = useState<Product[]>([]);
  const [exploreProducts, setExploreProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loadingOffers, setLoadingOffers] = useState(true);
  const [loadingFeatured, setLoadingFeatured] = useState(true);
  const [loadingExplore, setLoadingExplore] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    (async () => {
      const prods = await getProducts();
      const discounted = prods.filter((p) => (p.discount_price ?? 0) > 0);
      setOfferProducts(discounted.slice(0, 5));
      setExploreProducts(prods.slice(0, 10));
      setLoadingOffers(false);
      setLoadingExplore(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const prods = await getFeaturedProducts();
      setFeaturedProducts(prods);
      setLoadingFeatured(false);
    })();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="mx-auto max-w-[80rem]">
        <header>
          <HeaderSlider />
        </header>

        {/* 🔹 PRODUCTOS DESTACADOS */}
        <section className="mx-10">
          <h2 className="text-2xl font-semibold font-quicksand">
            Productos destacados
          </h2>
          <div>
            {loadingFeatured ? (
              <SkeletonFeatured count={2} />
            ) : (
              <FeaturedProductsSlider
                products={featuredProducts.map((prod) => ({
                  id: prod.id!,
                  shop: prod.store?.name || "Sin tienda",
                  title: prod.name,
                  price: prod.price.toLocaleString("es-CRC"),
                  discountPrice: prod.discount_price
                    ? prod.discount_price.toLocaleString("es-CRC")
                    : "",
                  rating: 0,
                  img: prod.image_1_url || audifonos,
                }))}
              />
            )}
          </div>
        </section>

        {/* 🔹 CATEGORÍAS */}
        <section className="mx-10 my-10">
          <h2 className="text-2xl font-semibold font-quicksand">Categorías</h2>

          {loadingCategories && <SkeletonCategory count={4} />}

          <div
            className={`${
              loadingCategories ? "opacity-0" : "opacity-100"
            } transition-opacity duration-500`}
          >
            <CategorySlider onLoaded={() => setLoadingCategories(false)} />
          </div>
        </section>

        {/* 🔹 OFERTAS */}
        <section className="mx-10 my-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>
            <div>
              <a href="#" className="font-semibold">
                Ver todo
              </a>
              <IconChevronRight className="inline" />
            </div>
          </div>

          {loadingOffers ? (
            <SkeletonProduct count={5} />
          ) : (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-10 gap-5">
              {offerProducts.map((prod) => (
                <ProductCard
                  key={prod.id}
                  id={prod.id!}
                  shop={prod.store?.name || "No hay tienda"}
                  title={prod.name}
                  price={prod.price.toLocaleString("es-CRC")}
                  discountPrice={
                    prod.discount_price != null && prod.discount_price !== 0
                      ? prod.discount_price.toLocaleString("es-CRC")
                      : undefined
                  }
                  img={prod.image_1_url ? prod.image_1_url : audifonos}
                  edit={false}
                />
              ))}
            </div>
          )}
        </section>

       {/* 🔹 BANNERS (solo se muestra el primero en móvil) */}
<section className="flex justify-center gap-10 items-end mx-10 my-10">
  {/* 🟢 Banner 1 siempre visible */}
  <img
    className="w-full h-full rounded-2xl object-cover"
    src={smallBanner1}
    alt="Banner principal"
  />
  
  {/* 🔴 Banner 2: oculto en móvil */}
  <img
    className="w-full h-full rounded-2xl object-cover hidden sm:block"
    src={smallBanner2}
    alt="Banner secundario"
  />
</section>

{/* 🔹 EXPLORAR */}
<section className="mx-10 my-10">
  <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
    <h2 className="text-2xl sm:text-3xl font-bold font-quicksand text-main-dark">
      Explorar
    </h2>
    <a
      href="/search?mode=explore"
      className="flex items-center gap-1 text-sm sm:text-base font-semibold text-main-dark hover:text-contrast-main transition-colors"
    >
      Ver todo
      <IconChevronRight className="inline w-5 h-5" />
    </a>
  </div>

  {loadingExplore ? (
    <SkeletonProduct count={10} />
  ) : (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-6 gap-5">
      {exploreProducts.map((prod) => (
        <ProductCard
          key={prod.id}
          id={prod.id!}
          shop={prod.store?.name || "No hay tienda"}
          title={prod.name}
          price={prod.price.toLocaleString("es-CRC")}
          discountPrice={
            prod.discount_price != null && prod.discount_price !== 0
              ? prod.discount_price.toLocaleString("es-CRC")
              : undefined
          }
          img={prod.image_1_url ? prod.image_1_url : audifonos}
          edit={false}
        />
      ))}
    </div>
  )}
</section>

      </div>

      <Footer />
    </div>
  );
}
