import HeaderSlider from "../../../components/navigation/HeaderSlider";
import NavBar from "../../../components/layout/NavBar";

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

useEffect(() => {
(async () => {
const prods = await getProducts();

  // Solo productos con descuento (discount_price > 0)
  const discounted = prods.filter(
    (p) => (p.discount_price ?? 0) > 0
  );

  setOfferProducts(discounted.slice(0, 5));

  // Si quieres también “Explorar” con productos generales:
  setExploreProducts(prods.slice(0, 10));
})();
}, []);

useEffect(() => {
(async () => {
const prods = await getFeaturedProducts();
setFeaturedProducts(prods);
})();
}, []);

return (
<div>
<NavBar />
<div className="mx-auto max-w-[80rem]">
<header>
<HeaderSlider />
</header>

    <section className="mx-10">
      <h2 className="text-2xl font-semibold font-quicksand">
        Productos destacados
      </h2>
      <div>
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
      </div>
    </section>

    <section className="mx-10 my-10">
      <h2 className="text-2xl font-semibold font-quicksand">Categorías</h2>
      <CategorySlider />
    </section>

    {/* Ofertas: solo productos con descuento */}
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

      <div className="grid grid-cols-5 my-10 gap-5">
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
    </section>

    <section className="flex justify-center gap-10 items-end mx-10 my-10">
      <img className="w-full h-full" src={smallBanner1} alt="Banner 1" />
      <img className="w-full h-full" src={smallBanner2} alt="Banner 2" />
    </section>

    {/* Explorar: productos generales (opcional) */}
    <section className="mx-10 my-10">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold font-quicksand">Explorar</h2>
        <div>
          <a href="#" className="font-semibold cursor-pointer">
            Ver todo
          </a>
          <IconChevronRight className="inline" />
        </div>
      </div>

      <div className="grid grid-cols-5 my-10 gap-5">
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
    </section>
  </div>
  <Footer />
</div>
);
}