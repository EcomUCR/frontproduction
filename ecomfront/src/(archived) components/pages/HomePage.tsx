import NavBar from "../ui/NavBar"
import HeroBanner from "../ui/HeroBanner";
import Categories from "../ui/Categories";
import Explore from "../ui/Explore";
import Footer from "../ui/Footer";
import ProductsSlider from "../ui/ProductsSlider";

export default function HomePage() {
  return (
    <section>
      <NavBar />
      <div className="bg-white mx-auto max-w-[90rem]">
        <section className="">
          <HeroBanner />
        </section>
        <section className="my-10 px-10 lg:mr-4 flex flex-col ">
          <div className=" flex items-center justify-start mb-6">
            <h2 className="text-xl lg:text-4xl font-quicksand mr-4">Productos destacados</h2>
            <div className="flex-1 lg:h-1 h-0.5 bg-yellow-main rounded"></div>
          </div>
          <ProductsSlider />
        </section>
        <section className="my-10 w-full lg:mr-4">
          <div className="flex items-center justify-start px-10 mb-6">
            <h2 className="text-xl lg:text-4xl font-quicksand mr-4">Categorías</h2>
            <div className="flex-1 lg:h-1 h-0.5 bg-yellow-main rounded"></div>
          </div>
          <Categories />
        </section>
        <section className="my-10 w-full lg:mr-4 ">
          <div className="flex items-center justify-start mb-6 px-10">
            <h2 className="text-xl lg:text-4xl font-quicksand mr-4">Explorar</h2>
            <div className="flex-1 lg:h-1 h-0.5 bg-yellow-main rounded"></div>
          </div>
          <Explore />
        </section>
        <Footer />
      </div>
    </section>
  );
}
