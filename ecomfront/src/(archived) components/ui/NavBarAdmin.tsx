import { IconMenu2 } from "@tabler/icons-react";
import logo from "../../img/tucaShopLogo.png";

function LandingHeader() {
  return (
    <header className="flex justify-between items-center px- shadow-md bg-blue-main px-5 py-5 lg:px-20 lg:py-6">

      <div className="flex items-center space-x-2">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-auto"
        />
        <span className="text-white pt-1 font-fugaz text-xl lg:text-3xl ">TucaShop</span>
      </div>
      <nav className="hidden lg:flex space-x-10 text-xl items-center">
        <a href="/" className="font-light text-white font-quicksand">Inicio</a>
        <a href="/" className="font-light text-white font-quicksand">Productos</a>
        <a href="/login" className="font-light text-white font-quicksand">Iniciar Sesión</a>
        <a href="/register" className="font-light text-white font-quicksand bg-yellow-main px-4 py-2 rounded-lg shadow-[1px_2px_3px_rgba(0,0,0,0.3)]">Crear cuenta</a>
      </nav>
      <nav className="lg:hidden space-x-10 text-xl">
        <IconMenu2 className="text-white" />
      </nav>

    </header>
  );
}

export default LandingHeader;

