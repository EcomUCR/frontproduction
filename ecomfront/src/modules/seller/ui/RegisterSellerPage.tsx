import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import logo from '../../../img/tucaShopLogo.png';

export default function RegisterSellerPage() {
    return (
        <div>
            <NavBar />
            <section className='flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] gap-4'>
                    {/*Botón de inicio de sesión */}
                    <p className="text-contrast-secondary bg-white font-semibold py-2 px-4 rounded-full transition">Registrar tienda</p>
                </div>
                <div className="flex flex-col items-center justify-center h-[90vh] w-[65%]">
                    <img className='h-20' src={logo} alt="" />
                    <p className='font-fugaz text-2xl'>TucaShop</p>
                    <div className='flex flex-col w-full items-center space-y-5 mt-10 px-30'>
                        <form className="flex flex-col items-center w-full space-y-5" action="">
                            <div className='flex justify-center gap-5 w-full'>
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Nombre de la tienda' type="text" />
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Telefono' type="text" />
                            </div>
                            <div className='flex justify-center items-center flex-col space-y-5 w-full'>
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand' placeholder='Correo electrónico' type="email" />
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand' placeholder='Tipo de tienda' type="text" />
                            </div>
                            <div className='flex justify-center gap-5 w-full'>
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Contraseña' type="password" />
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Confirmar contraseña' type="password" />
                            </div>
                        </form>
                        <button className='bg-main text-white rounded-full py-3 px-4 w-[50%] font-quicksand'>Crear cuenta</button>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}