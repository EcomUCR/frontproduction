import Footer from "../../../components/layout/Footer";
import FormShopping from "../../../components/forms/FormShopping";
import NavBar from "../../../components/layout/NavBar";
import ProductCardShopping from "../../../components/data-display/ProductCardShopping";;
import banner2 from '../../../img/resources/SmallBanner2.png';

export default function ShoppingCartPage() {
    return (
        <div>
            <NavBar />
            <section className="mx-10 flex">
                <div className=" my-5 w-2/3 border-r-2 pr-5 border-main">
                
                    <ProductCardShopping />
                    <ProductCardShopping />
                    <ProductCardShopping />
                
                </div>
                <div className=" my-10 pl-10 w-1/3">
                    <FormShopping />
                </div>
            </section>
            <section>
                <div className="flex justify-between px-10 py-5">
                    <img className="w-auto h-auto" src={banner2} alt="" />
                    <img className="w-auto h-auto" src={banner2} alt="" />
                </div>

            </section>
            <Footer />
        </div>
    );

}