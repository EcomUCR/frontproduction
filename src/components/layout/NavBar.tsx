// ============================================================
// 🛍️ NavBar - TukiShop (Responsive)
// ============================================================

import { Link, useNavigate } from "react-router-dom";
import {
  IconBuildingStore,
  IconHeart,
  IconLogout2,
  IconSearch,
  IconShoppingBag,
  IconUser,
  IconMenu2,
  IconX,
} from "@tabler/icons-react";
import logo from "../../img/TukiLogo.png";
import ButtonComponent from "../ui/ButtonComponent";
import { useAuth } from "../../hooks/context/AuthContext";
import { useProducts } from "../../modules/seller/infrastructure/useProducts";
import { useEffect, useState } from "react";
import CategoryDropdown from "../data-display/CategoryDropdown";
import NotificationDropdown from "../data-display/NotificationDropDown";
import { motion, AnimatePresence } from "framer-motion";

type Category = { id: number; name: string };

export default function NavBar() {
  const { user, logout } = useAuth();
  const { getCategories } = useProducts();
  const navigate = useNavigate();

  const [categories, setCategories] = useState<Category[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error al cargar categorías", err);
      }
    };
    fetchCategories();
  }, []);

  const displayName = user
    ? `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() ||
    user.email ||
    user.store?.name
    : "";

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/loginRegister", { replace: true });
  };

  // cerrar menú al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".user-dropdown")) setShowUserMenu(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <nav className="bg-main px-4 sm:px-6 py-2 font-quicksand relative z-50">
      {/* 🔹 Topbar */}
      <div className="flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-white font-fugaz text-2xl flex items-center gap-2 p-1"
        >
          <img src={logo} alt="Logo" className="h-9 w-auto" />
          <span className="sm:block">TukiShop</span>
        </Link>

        {/* 🔍 Search bar (hidden on mobile) */}
        <div className="hidden md:flex items-center bg-white rounded-full px-0.5 w-1/3">
          <input
            type="text"
            className="w-full h-9 p-3 rounded-full focus:outline-none"
            placeholder="Buscar productos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <ButtonComponent
            style="bg-gradient-to-br cursor-pointer from-contrast-main to-contrast-secondary rounded-full w-10 h-9 flex items-center justify-center"
            icon={<IconSearch className="text-white h-5 w-auto stroke-3" />}
            onClick={handleSearch}
          />
        </div>

        {/* 🔸 Desktop Icons */}
        <div className="hidden md:flex gap-5 text-white items-center">
          {/* Usuario */}
          <div className="relative user-dropdown">
            {user ? (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => setShowUserMenu((prev) => !prev)}
              >
                <IconUser className="h-5 w-5" />
                <span>{displayName}</span>

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
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                        >
                          <IconUser className="h-5 w-5 mr-2" /> Ver perfil
                        </li>
                        {user.role === "SELLER" && (
                          <li
                            onClick={() => {
                              navigate("/store/" + user.store?.id);
                              setShowUserMenu(false);
                            }}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          >
                            <IconBuildingStore className="h-5 w-5 mr-2" /> Mi
                            tienda
                          </li>
                        )}
                        <li
                          onClick={() => {
                            handleLogout();
                            setShowUserMenu(false);
                          }}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center text-contrast-secondary"
                        >
                          <IconLogout2 className="h-5 w-5 mr-2" /> Cerrar sesión
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/loginRegister?mode=login">Iniciar sesión</Link>
                <span>|</span>
                <Link to="/loginRegister?mode=register">Regístrate</Link>
              </div>
            )}
          </div>

          <NotificationDropdown />
          <Link to="/wishlist">
            <IconHeart className="h-6 w-6" />
          </Link>
          <Link to="/shoppingCart">
            <IconShoppingBag className="h-6 w-6" />
          </Link>
        </div>

        {/* 🔹 Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <IconX size={26} /> : <IconMenu2 size={26} />}
        </button>
      </div>

      {/* 🔻 Desktop Bottom Menu */}
      <div className="hidden md:block">
        <ul className="flex justify-center gap-10 p-3 text-white text-sm">
          <li>
            <CategoryDropdown categories={categories} navigate={navigate} />
          </li>
          <li
            onClick={() => navigate("/search?mode=explore")}
            className="hover:-translate-y-1 transition-all cursor-pointer"
          >
            Explorar
          </li>
          <li
            onClick={() => navigate("/search?mode=offers")}
            className="hover:-translate-y-1 transition-all cursor-pointer"
          >
            Ofertas
          </li>
          <li
            onClick={() => navigate("/search?mode=best-sellers")}
            className="hover:-translate-y-1 transition-all cursor-pointer"
          >
            Lo más vendido
          </li>
          <li
            onClick={() => navigate("/search/stores")}
            className="hover:-translate-y-1 transition-all cursor-pointer"
          >
            Tiendas
          </li>
          <li>
            <Link to="/beSellerPage">Vender</Link>
          </li>
          <li>
            <Link to="/about">Conócenos</Link>
          </li>
        </ul>
      </div>

      {/* 📱 Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-white text-main-dark rounded-2xl shadow-xl mt-3 p-4 space-y-3 font-medium"
          >
            {/* Search */}
            <div className="flex bg-gray-100 rounded-full px-2 py-1">
              <input
                type="text"
                className="flex-grow bg-transparent px-2 focus:outline-none text-sm"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <IconSearch
                onClick={handleSearch}
                className="h-5 w-5 cursor-pointer text-contrast-main"
              />
            </div>

            {/* Links */}
            <div className="flex flex-col gap-2 text-sm">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Inicio
              </Link>
              <Link to="/search?mode=explore" onClick={() => setMenuOpen(false)}>
                Explorar
              </Link>
              <Link to="/search?mode=offers" onClick={() => setMenuOpen(false)}>
                Ofertas
              </Link>
              <Link
                to="/search?mode=best-sellers"
                onClick={() => setMenuOpen(false)}
              >
                Lo más vendido
              </Link>
              <Link to="/search/stores" onClick={() => setMenuOpen(false)}>
                Tiendas
              </Link>
              <Link to="/beSellerPage" onClick={() => setMenuOpen(false)}>
                Vender
              </Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                Conócenos
              </Link>
            </div>

            {/* Usuario */}
            <div className="border-t pt-2 mt-2">
              {user ? (
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-sm">
                    {displayName || "Usuario"}
                  </p>
                  <Link to="/profile" onClick={() => setMenuOpen(false)}>
                    Ver perfil
                  </Link>
                  {user.role === "SELLER" && (
                    <Link
                      to={`/store/${user.store?.id}`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Mi tienda
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="text-contrast-secondary font-semibold text-left"
                  >
                    Cerrar sesión
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-1 text-sm">
                  <Link to="/loginRegister?mode=login" onClick={() => setMenuOpen(false)}>
                    Iniciar sesión
                  </Link>
                  <Link to="/loginRegister?mode=register" onClick={() => setMenuOpen(false)}>
                    Regístrate
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
