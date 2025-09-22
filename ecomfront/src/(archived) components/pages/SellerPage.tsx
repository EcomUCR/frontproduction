import NavBar from "../ui/NavBar"
import SellerBaner from "../ui/SellerBaner";
import Footer from "../ui/Footer";
import NavBarSeller from "../ui/NavBarSeller";
import SellerProducts from "../ui/SellerProducts";
import SellerOfers from "../ui/SellerOfers";



export default function SellerPage() {
  return (
    <div className="bg-white">
      <NavBar />
      <div className="  mx-auto max-w-[90rem]">
        <section>
        <SellerBaner />
        <NavBarSeller />
        </section>
        <section className="">
          <div className="flex items-center my-10 w-full px-10 lg:mr-4 ">
            <h2 className="text-xl lg:text-4xl font-quicksand mr-4">Tienda</h2>
            <div className="flex-1 lg:h-1 h-0.5 bg-yellow-main rounded"></div>
          </div>
          <SellerProducts />
        </section>
      </div>
      <Footer />
    </div>
  );
}