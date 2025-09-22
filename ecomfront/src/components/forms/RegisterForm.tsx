import logo from '../../img/tucaShopLogo.png';
export default function RegisterForm() {
    return (
        <div className="flex flex-col items-center w-full justify-center">
            <img className='h-20' src={logo} alt="" />
            <p className='font-fugaz text-2xl'>TucaShop</p>
            <div className='flex flex-col w-full items-center space-y-5 mt-10 px-30'>
                <form className="flex flex-col items-center w-full space-y-5" action="">
                    <div className='flex justify-center gap-5 w-full'>
                        <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Nombre' type="text" />
                        <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Apellido' type="text" />
                    </div>
                    <div className='flex justify-center items-center flex-col space-y-5 w-full'>
                        <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand' placeholder='Correo electrónico' type="email" />
                        <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[92%] font-quicksand' placeholder='Nombre de usuario' type="text" />
                    </div>
                    <div className='flex justify-center gap-5 w-full'>
                        <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Contraseña' type="password" />
                        <input className='border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Confirmar contraseña' type="password" />
                    </div>
                </form>
                <button className='bg-main text-white rounded-full py-3 px-4 w-[50%] font-quicksand'>Crear cuenta</button>
            </div>

        </div>
    );
}