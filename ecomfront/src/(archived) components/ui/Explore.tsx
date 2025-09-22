import explore1Img from "../../img/au.png";
import explore2Img from "../../img/guantes.png";
import explore3Img from "../../img/grapas.png";
import explore4Img from "../../img/manga.png";
import ProductCard from "./ProductCard";
import ButtonComponent from "./ButtonComponent";

const exploreProducts = [
  { name: "Parlante bluetooth JBL dssadasda dasdasda dawed", brand: "JBL", discountPrice: "₡20.000", price: "₡24.500", img: explore4Img },
    { name: "Audífonos Gamer Razer", brand: "Razer", price: "₡26.950", img: explore1Img },
    { name: "Parlante bluetooth JBL", brand: "JBL", price: "₡24.500", img: explore2Img },
    { name: "Chocolate amargo OKKO 200mg", brand: "OKKO", price: "₡44.950", img: explore3Img },
    { name: "Set cuchillos Telstar", brand: "Telstar", price: "₡15.750", img: explore1Img },
];

export default function Explore() {
  return (
    <section className="my-10 px-4 lg:px-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1  gap-10 mb-6 justify-items-center">
            {exploreProducts.slice(0, 9).map((p, i) => (
              <ProductCard key={i} name={p.name} imageSrc={p.img} brand={p.brand} price={p.price} discountPrice={p.discountPrice} />
            ))}
          </div>
          <div className="flex justify-center ">
            <ButtonComponent 
                    style="bg-yellow-main font-quicksand px-25 py-3 rounded-lg font-bold text-lg text-white shadow-[1px_2px_5px_rgba(0,0,0,0.2)] hover:bg-blue-main transition cursor-pointer duration-500"
                    text="Ver más"/>
          </div>
    </section>
  );
}
