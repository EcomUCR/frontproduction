// ============================================================
// 🛍️ NavBar - TukiShop
// ============================================================

import { Link, useNavigate } from "react-router-dom";
import {
  IconHeart,
  IconLogout2,
  IconSearch,
  IconShoppingBag,
  IconUser,
} from "@tabler/icons-react";
import logo from "../../img/TukiLogo.png";
import ButtonComponent from "../ui/ButtonComponent";
import { useAuth } from "../../hooks/context/AuthContext";
import { useProducts } from "../../modules/seller/infrastructure/useProducts";
import { useEffect, useState } from "react";
import CategoryDropdown from "../data-display/CategoryDropdown";
import NotificationDropdown from "../data-display/NotificationDropDown";
import { motion, AnimatePresence } from "framer-motion";

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
  const [showUserMenu, setShowUserMenu] = useState(false);

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

  // Nombre del usuario a mostrar
  let displayName;
  if (user) {
    if (user.first_name || user.last_name) {
      displayName =
        `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.email;
    } else {
      displayName = user.store?.name;
    }
  }

  // Función para realizar búsqueda
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
        await logout();
        navigate("/loginRegister", { replace: true });
    };

  // Cerrar dropdown si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-dropdown")) setShowUserMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-main px-10 pt-2 lg:px-35 font-quicksand relative z-50">
      {/* Parte superior del navbar */}
      <div className="flex justify-between items-center">
        {/* Logo */}
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
            style="bg-gradient-to-br cursor-pointer from-contrast-main to-contrast-secondary rounded-full w-15 h-9 flex items-center justify-center"
            icon={<IconSearch className="text-white h-6 w-auto stroke-3" />}
            onClick={handleSearch}
          />
        </div>

        {/* Sección derecha */}
        <div className="w-1/3 flex justify-end relative">
          <ul className="flex gap-5 p-2 text-white font-medium items-center">
            <div className="flex space-x-2 items-center relative">
              {/* Usuario */}
              <li className="relative">
                {user ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer select-none user-dropdown relative"
                    onClick={() => setShowUserMenu((prev) => !prev)}
                  >
                    <IconUser className="h-5 w-5" />
                    <span>{displayName}</span>

                    {/* Mini Dropdown */}
                    <AnimatePresence>
                      {showUserMenu && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute -right-4 top-8 bg-white text-main-dark rounded-lg shadow-lg w-44 overflow-hidden"
                        >
                          <ul className="flex flex-col text-sm">
                            <li
                              onClick={() => {
                                navigate("/profile");
                                setShowUserMenu(false);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer items-center"
                            >
                              <IconUser className="h-5 w-5 inline-block mr-2" /> Ver perfil
                            </li>
                            <li
                              onClick={() => {
                                handleLogout();
                                setShowUserMenu(false);
                              }}
                              className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-contrast-secondary"
                            >
                              <IconLogout2 className="h-5 w-5 inline-block mr-2" /> Cerrar sesión
                            </li>
                          </ul>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      to="/loginRegister?mode=login"
                      className="flex items-center gap-1 hover:font-semibold"
                    >
                      <IconUser className="h-5 w-5" />
                      Iniciar sesión
                    </Link>
                    <span>|</span>
                    <Link
                      to="/loginRegister?mode=register"
                      className="hover:font-semibold"
                    >
                      Regístrate
                    </Link>
                  </div>
                )}
              </li>

              {/* Notificaciones */}
              <li>
                <NotificationDropdown />
              </li>

              {/* Lista de deseos */}
              <li>
                <Link to="/wishlist">
                  <IconHeart className="h-6 w-6" />
                </Link>
              </li>

              {/* Carrito */}
              <li>
                <Link to="/shoppingCart">
                  <IconShoppingBag className="h-6 w-6" />
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </div>

      {/* Parte inferior del navbar */}
      <div>
        <ul className="flex justify-center gap-10 p-3 text-white text-sm font-light">
          <li className="flex relative z-20 items-center transform transition-all duration-300">
            <CategoryDropdown categories={categories} navigate={navigate} />
          </li>
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
            onClick={() => navigate("/search/stores")}
          >
            Tiendas
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <Link to="/beSellerPage">Vender</Link>
          </li>
          <li className="hover:-translate-y-1 transform transition-all duration-300">
            <Link to="/about">Conócenos</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
