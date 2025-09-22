import product1 from "../../img/sombras.png";
import product2 from "../../img/sombrasClaro.png";
import product3 from "../../img/figuras.png";
import product4 from "../../img/dinosaurio.png";



const sellerOfers = [
  { name: "Criaturas de las Sombras -Juego de mesa", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product1 },
  { name: "Criaturas de las Sombras - Expansión roca fundida", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product2 },
  { name: "Figuras coleccionables Happy Little Dinosaurs", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product3 },
  { name: "Happy Litter Dinosaurs - Juego de mesa", brand: "Unstable Games", oldPrice: "₡30.900", price: "₡26.950 ", img: product4 },
  ];

export default function SellerOfers() {
  return (
    <section className="my-10 px-4 lg:px-20">

      
        <div className="flex items-center my-6">
        <h2 className="text-xl lg:text-4xl font-quicksand mr-4">Ofertas</h2>
        <div className="flex-1 lg:h-1 h-0.5 bg-yellow-main rounded"></div>
      </div>

      
      <div className="grid lg:grid-cols-4 grid-cols-2 gap-6 mb-6">
        {sellerOfers.slice(0,4).map((p, i) => (
          <div key={i} className="flex flex-col items-center text-center rounded-xl shadow-[1px_2px_5px_rgba(0,0,0,0.2)] p-2 lg:p-3">
            <div className="w-full h-60 mb-2 flex items-center justify-center rounded-xl overflow-hidden shadow-[1px_1px_4px_rgba(0,0,0,0.1)]">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover rounded-2xl" />
            </div>
            <h3 className="text-xs lg:text-sm font-medium">{p.name}</h3>
            <p className="text-gray-400 text-xs">{p.brand}</p>
            <p className="text-gray-200 text-xs line-through">{p.oldPrice}</p>
            <p className="text-purple-600 font-bold text-lg">{p.price}</p>
          </div>
        ))}
      </div>


    </section>
  );
}
