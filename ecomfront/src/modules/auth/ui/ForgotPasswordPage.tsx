import logo from "../../../img/tucaShopLogo.png";
export default function ForgotPasswordPage() {
    return (
        <div>
            <section className='flex justify-center items-center'>
                <div className='flex flex-col justify-center items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[100vh] w-[35%] gap-4'>
                    <p className="text-white font-semibold py-2 px-4 rounded-full">Recuperación de contraseña</p>
                </div>
                <div className='flex flex-col items-center justify-center h-[100vh] w-[65%]'>
                    <div className="flex flex-col items-center w-full justify-center">
                        <img className='h-20' src={logo} alt="" />
                        <p className='font-fugaz text-2xl'>TucaShop</p>
                        <div className='flex flex-col w-full items-center space-y-5 mt-10'>
                            <form className="flex flex-col items-center w-full space-y-5" action="">
                                <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Correo Electrónico' type="text" />
                                <button className='bg-main text-white rounded-full py-3 px-4 w-[40%] font-quicksand'>Enviar correo de recuperación</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}