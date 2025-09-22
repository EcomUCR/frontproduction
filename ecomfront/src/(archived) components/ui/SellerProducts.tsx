import { Button } from "./button";
import product1 from "../../img/sombras.png";
import product2 from "../../img/sombrasClaro.png";
import product3 from "../../img/figuras.png";
import product4 from "../../img/dinosaurio.png";
import product5 from "../../img/slayOscuro.png";
import product6 from "../../img/slayClaro.png";
import product7 from "../../img/unicornio.png";
import product8 from "../../img/productos.png";
import ProductCard from "./ProductCard";



const sellerProducts = [
  { name: "Criaturas de las Sombras -Juego de mesa", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product1 },
  { name: "Criaturas de las Sombras - Expansión roca fundida", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product2 },
  { name: "Figuras coleccionables Happy Little Dinosaurs", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product3 },
  { name: "Happy Litter Dinosaurs - Juego de mesa", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product4 },
  { name: "Here to Slay - Juego de mesa", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product5 },
  { name: "Here to Slay- Expansión Berserkers y Nigromantes", brand: "Unstable Games", oldPrice: "30.900", price: "₡26.950 ", img: product6 },
  { name: "Unstable Unicorns for Kids - Juego de mesa", brand: "Unstable Games", oldPrice: "30.900", price: "₡26.950 ", img: product7 },
  { name: "Unstable Unicorns - Set 6 expansiones", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product8 },
];

export default function SellerProducts() {
  return (
    <section className="my-10 px-4 lg:px-20">
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-10 mb-6 justify-items-center">
        {sellerProducts.slice(0, 9).map((p, i) => (
          <ProductCard key={i} name={p.name} imageSrc={p.img} brand={p.brand} price={p.price} discountPrice={p.price} />
        ))}
      </div>
      <div className="flex justify-center">
        <button className="bg-yellow-main text-white px-28 py-2 rounded-lg font-bold hover:opacity-90 transition">
          Ver más
        </button>
      </div>
    </section>
  );
}
