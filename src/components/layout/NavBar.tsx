// Comentarios agregados por Raul
import { Link, useNavigate } from "react-router-dom";
import {
  IconHeart,
  IconMenu2,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import logo from "../../img/TukiLogo.png";
import ButtonComponent from "../ui/ButtonComponent";
import { useAuth } from "../../hooks/context/AuthContext";
import { useProducts } from "../../modules/seller/infrastructure/useProducts";
import { useEffect, useState } from "react";

type Category = {
  id: number;
  name: string;
};

export default function NavBar() {
  const { user, logout } = useAuth();
  const { getCategories } = useProducts();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        console.log("Categorías recibidas:", data);
        setCategories(data);
      } catch (err) {
        console.error("Error al cargar categorías", err);
      }
    };
    fetchCategories();
  }, []);

  // Nombre a mostrar del usuario
  let displayName;
  if (user) {
    if (user.first_name || user.last_name) {
      displayName =
        `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.email;
    } else {
      displayName = user.store?.name;
    }
  }

  //Función para manejar el logout y navegar al homepage
  const handleLogout = async () => {
    await logout();
    navigate("/loginRegister", { replace: true });
  };

  //Función para realizar búsqueda
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <nav className="bg-main px-10 pt-2 lg:px-35 ">
      {/*Parte superior del navbar*/}
      <div className="flex justify-between items-center ">
        <div className="w-1/3">
          <Link
            to="/"
            className="text-white font-fugaz text-3xl flex items-center gap-3 p-2"
          >
            <img src={logo} alt="Logo" className="h-10 w-auto" />
            TukiShop
          </Link>
        </div>

        {/* Barra de búsqueda */}
        <div className="flex items-center bg-white rounded-full px-0.5 w-1/3">
          <input
            type="text"
            className="w-full h-10 p-4 rounded-full focus:outline-none"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <ButtonComponent
            style="bg-gradient-to-br from-contrast-main to-contrast-secondary rounded-full w-15 h-9 flex items-center justify-center"
            icon={<IconSearch className="text-white h-6 w-auto stroke-3" />}
            onClick={handleSearch}
          />
        </div>

        {/* Sección derecha (usuario y carrito) */}
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
                    <Link className="flex items-center gap-1" to="/loginRegister">
                      <IconUser className="h-5 w-5" />
                      Iniciar sesión
                    </Link>
                    <span>|</span>
                    <Link to="/loginRegister">Regístrate</Link>
                  </>
                )}
              </li>
            </div>
            <div className="flex space-x-2 items-center">
              <li>
                <a href="#" className="">
                  <IconHeart className="h-6 w-6" />
                </a>
              </li>
              <li>
                <Link to="/shoppingCart">
                  <IconShoppingBag className="h-6 w-6" />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>

      {/*Parte inferior del navbar*/}
      <div>
        <ul className="flex justify-center gap-10 p-3 text-white text-sm font-light">
          <li className="flex items-center hover:-translate-y-1 transform transition-all duration-300">
            <IconMenu2 className="h-5 w-5" />
            <select
              defaultValue=""
              className="bg-transparent border-white focus:outline-none hover:cursor-pointer"
              onChange={(e) => {
                if (e.target.value) navigate(`/search/${e.target.value}`);
              }}
            >
              <option value="" disabled hidden>
                Categorías
              </option>
              {categories?.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                  className="text-black flex justify-center"
                >
                  {category.name}
                </option>
              ))}
            </select>
          </li>

          {/* Enlaces inferiores */}
          <li
            className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer"
            onClick={() => navigate("/search?mode=explore")}
          >
            Explorar
          </li>
          <li
            className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer"
            onClick={() => navigate("/search?mode=offers")}
          >
            Ofertas
          </li>
          <li
            className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer"
            onClick={() => navigate("/search?mode=best-sellers")}
          >
            Lo más vendido
          </li>
          <li
            className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer"
            onClick={() => navigate("/search?mode=stores")}
          >
            Tiendas
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <Link to="/beSellerPage">Vender</Link>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <a href="#">Conócenos</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
