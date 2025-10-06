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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    (async () => {
      const prods = await getProducts();
      setOfferProducts(prods.slice(0, 10));
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const prods = await getFeaturedProducts();
      setFeaturedProducts(prods); // O un slice si quieres limitarlo
    })();
  }, []);

  return (
    <div>
      <NavBar />
      {/* Header con slider */}
      <div className="mx-auto max-w-[80rem]">
        <header>
          <HeaderSlider />
        </header>
        {/* Section productos destacados */}
        <section className="mx-10">
          <h2 className="text-2xl font-semibold font-quicksand">
            Productos destacados
          </h2>
          <div>
            <FeaturedProductsSlider
              products={featuredProducts.map((prod) => ({
                id: prod.id!,
                shop: prod.store?.name || "Sin tienda", // Cambia aquí por prod.shop si tienes ese campo
                title: prod.name,
                price: prod.price.toLocaleString("es-CRC"),
                discountPrice: prod.discount_price
                  ? prod.discount_price.toLocaleString("es-CRC")
                  : "",
                rating: 0, // O ajusta si no tienes rating!
                img: prod.image_url || audifonos,
              }))}
            />{" "}
          </div>
        </section>
        {/* Section Categorías */}
        <section className="mx-10 my-10">
          <h2 className="text-2xl font-semibold font-quicksand">Categorías</h2>
          <CategorySlider />
        </section>
        {/*Section de ofertas */}
        <section className="mx-10 my-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold font-quicksand">Ofertas</h2>
            <div>
              <a href="#" className="font-semibold">
                {" "}
                Ver todo
              </a>
              <IconChevronRight className="inline" />
            </div>
          </div>
          {/*Aquí debe de ir un arreglo de productos cards que se van a mostrar */}
          <div className="grid grid-cols-5 my-10 space-y-5">
            {/*<ProductCard
              shop="Razer"
              title="Audifonos Razer x Pokemon | Edición Gengar"
              price="100.000"
              discountPrice="50.000"
              img={audifonos}
              edit={false}
            />
            <ProductCard
              shop="Razer"
              title="Audifonos Razer x Pokemon | Edición Gengar"
              price="100.000"
              discountPrice="50.000"
              img={audifonos}
              edit={false}
            />
            <ProductCard
              shop="Razer"
              title="Audifonos Razer x Pokemon | Edición Gengar"
              price="100.000"
              discountPrice="50.000"
              img={audifonos}
              edit={false}
            />
            <ProductCard
              shop="Razer"
              title="Audifonos Razer x Pokemon | Edición Gengar"
              price="100.000"
              discountPrice="50.000"
              img={audifonos}
              edit={false}
            />
            <ProductCard
              shop="Razer"
              title="Audifonos Razer x Pokemon | Edición Gengar"
              price="100.000"
              discountPrice="50.000"
              img={audifonos}
              edit={false}
            />*/}
          </div>
        </section>
        {/*Section para imágenes*/}
        <section className="flex justify-center gap-10 items-end mx-10 my-10">
          <img className="w-full h-full" src={smallBanner1} alt="Banner 1" />
          <img className="w-full h-full" src={smallBanner2} alt="Banner 2" />
        </section>
        {/*Section de explorar */}
        <section className="mx-10 my-10">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold font-quicksand">Explorar</h2>
            <div>
              <a href="#" className="font-semibold cursor-pointer">
                {" "}
                Ver todo
              </a>
              <IconChevronRight className="inline" />
            </div>
          </div>
          {/*Aquí debe de ir un arreglo de productos cards que se van a mostrar */}
          <div className="grid grid-cols-5 my-10 space-y-5">
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
                img={prod.image_url ? prod.image_url : audifonos}
                edit={false}
              />
            ))}
          </div>
        </section>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
