// Comentarios agregados por Raul
import { Link, useNavigate } from "react-router-dom";
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import logo from "../../img/tucaShopLogo.png";
import ButtonComponent from "../ui/ButtonComponent";
import { useAuth } from "../../hooks/context/AuthContext";

export default function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Nombre a mostrar del usuario
  let displayName;
  if (user) {
    if (user.client && user.client.first_name) {
      displayName = `${user.client.first_name} ${user.client.last_name}`;
    } else if (user.vendor && user.vendor.name) {
      displayName = user.vendor.name;
    } else {
      displayName = user.email;
    }
  }

  //Función para manejar el logout y navegar al homepage
  const handleLogout = async () => {
    await logout();
    navigate("/loginRegister", { replace: true });
  };

  return (
    <nav className="bg-main px-10 pt-2 2xl:px-80 ">
      {/*Esta es la parte superior del navbar*/}
      <div className="flex justify-between items-center ">
        <div className="w-1/3">
          <Link to="/">
            <a
              href="*"
              className="text-white font-fugaz text-3xl flex items-center gap-3 p-2"
            >
              <img src={logo} alt="" className="h-8 w-auto" />
              TucaShop
            </a>
          </Link>
        </div>
        <div className="flex items-center bg-white rounded-full px-0.5 w-1/3">
          <input
            type="text"
            className="w-full h-10 p-4 rounded-full focus:outline-none"
            placeholder="Buscar"
          />
          <ButtonComponent
            style="bg-gradient-to-br from-contrast-main to-contrast-secondary rounded-full w-15 h-9 flex items-center justify-center"
            icon={<IconSearch className="text-white h-6 w-auto stroke-3" />}
          />
        </div>
        <div className="w-1/3 flex justify-end">
          <ul className="flex gap-5 p-2 text-white font-medium">
            <div className="flex space-x-2 ">
              <li className="flex items-center gap-1">
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-1">
                      <IconUser className="h-5 w-5" />
                      <span>{displayName}</span>
                    </Link>
                    <span>|</span>
                    <button
                      onClick={handleLogout}
                      className="text-white hover:underline ml-2"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/profile">
                      <IconUser className="h-5 w-5" />
                    </Link>
                    <Link to="/loginRegister">Iniciar sesión</Link>
                    <span>|</span>
                    <Link to="/loginRegister">Regístrate</Link>
                  </>
                )}
              </li>
            </div>
            <div className="flex space-x-2 items-center">
              <li>
                <a href="#" className="">
                  <IconHeart className="h-5 w-5" />
                </a>
              </li>
              <li>
                <Link to="/shoppingCart">
                  <IconShoppingBag className="h-5 w-5" />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>
      {/*Aquí termina la parte superior del navbar*/}
      {/*Aquí empieza la parte inferior del navbar*/}
      <div>
        <ul className="flex justify-center gap-10 p-3 text-white text-sm font-light">
          <li className="flex items-center  hover:-translate-y-1 transform transition-all duration-300">
            {/*ItemList para desplegar las categorías*/}
            <IconMenu2 className="h-5 w-5" />
            <select className="bg-transparent border-white focus:outline-none hover:cursor-pointer">
              <option disabled value="" selected hidden>
                Categorías
              </option>
              <option className="text-main-dark" value="#">
                Categoría 1
              </option>
              <option className="text-main-dark" value="#">
                Categoría 2
              </option>
              <option className="text-main-dark" value="#">
                Categoría 3
              </option>
            </select>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <a href="#">Explorar</a>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <a href="#">Ofertas</a>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <a href="#">Lo más vendido</a>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <a href="#">Tiendas</a>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <Link to="/beSellerPage">Vender</Link>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <a href="#">Conócenos</a>
          </li>
          <li></li>
        </ul>
      </div>
      {/*Aquí termina la parte inferior del navbar*/}
    </nav>
  );
}
