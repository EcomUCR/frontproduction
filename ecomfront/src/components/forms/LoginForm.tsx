import { Link } from 'react-router-dom';
import logo from '../../img/tucaShopLogo.png';
export default function LoginForm() {
    return (
        <div className="flex flex-col items-center w-full justify-center">
            <img className='h-20' src={logo} alt="" />
            <p className='font-fugaz text-2xl'>TucaShop</p>
            <div className='flex flex-col w-full items-center space-y-5 mt-10'>
                <form className="flex flex-col items-center w-full space-y-5" action="">
                    <input className='border-2 border-contrast-secondary text-contrast-secondary rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Nombre de usuario' type="text" />
                    <input className='border-2 border-contrast-secondary text-contrast-secondary rounded-full px-4 py-3 w-[45%] font-quicksand' placeholder='Contraseña' type="password" />
                    <button className='bg-contrast-secondary text-white rounded-full py-3 px-4 w-[30%] font-quicksand'>Iniciar sesión</button>
                </form>
                <Link to="/forgotPassword">
                    <a className='text-main font-quicksand' href="">¿Olvidaste tu contraseña?</a>
                </Link>
            </div>
        </div>
    );
}