import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";

export default function HomePage() {
  // Simulamos 30 productos
  const products = Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    name: `Producto ${i + 1}`,
    price: (Math.random() * 10000 + 5000).toFixed(2),
    image: "asd",
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <div className="mx-auto max-w-[80rem] px-5 py-10 w-full">
        <h1 className="text-3xl font-bold font-quicksand mb-8 text-center">
          Lista de productos
        </h1>

        {/* GRID RESPONSIVE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col items-center bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-md"
              />
              <h2 className="mt-3 text-lg font-semibold text-gray-800">
                {product.name}
              </h2>
              <p className="text-main font-bold mt-1">₡{product.price}</p>
              <button className="mt-3 bg-main text-white font-medium px-5 py-2 rounded-full hover:bg-contrast-secondary transition">
                Ver producto
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}
