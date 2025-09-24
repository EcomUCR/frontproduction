import { Link } from "react-router-dom";
import Footer from "../../../components/layout/Footer";;
import NavBar from "../../../components/layout/NavBar";
import logo from '../../../img/resources/Banner2.png';
import ButtonComponent from "../../../components/ui/ButtonComponent";

export default function BeSellerPage() {
    return (
        <div >
            <NavBar />
            <section className="relative flex justify-center items-center w-full my-10 px-10">
                <img className='w-full' src={logo} alt="Banner TucaShop" />
                <Link to="/registerSeller">
                    <ButtonComponent
                        text="Registrarse"
                        style="bg-contrast-secondary text-white rounded-full py-4 px-4 w-[30%] left-25 bottom-15 font-quicksand absolute hover:bg-gradient-to-br from-contrast-main via-contrast-secondary to-main transition-all duration-400"
                    />
                </Link>
            </section>
            <section className="flex flex-col justify-center items-center text-center w-2/4 mx-auto my-10 font-quicksand">
                <p>
                    ¿Que esperas para tener la oportunidad de tener tu tienda virtual y así llegar lo más de 5.000.000 de ticos y ofrecerles tus productos, tener tu propia tienda virtual y comenzar a vener en todo el territorio costarricense.?
                </p>
            </section>

            <Footer />
        </div>
    );
}