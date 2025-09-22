import SellerBaner from "../ui/SellerBaner";
import Footer from "../ui/Footer";
import NavBarSeller from "../ui/NavBarSeller";
import SellerProducts from "../ui/SellerProducts";
import NavBar from "../ui/NavBar";


export default function SellerOffersPage() {
    return (
        <div className="bg-white">
            <NavBar />
            <div className="  mx-auto max-w-[90rem]">
                <SellerBaner />
                <NavBarSeller />
                <section className="">
                    <div className="flex items-center my-10 w-full px-10 lg:mr-4 ">
                        <h2 className="text-xl lg:text-4xl font-quicksand mr-4">Ofertas</h2>
                        <div className="flex-1 lg:h-1 h-0.5 bg-yellow-main rounded"></div>
                    </div>
                    <SellerProducts />
                </section>
            </div>
            <Footer />
        </div>
    );
}