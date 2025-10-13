import { Link, useNavigate } from "react-router-dom";
import {
  IconHeart,
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

  let displayName;
  if (user) {
    if (user.first_name || user.last_name) {
      displayName =
        `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim() || user.email;
    } else {
      displayName = user.store?.name;
    }
  }

  const handleLogout = async () => {
    await logout();
    navigate("/loginRegister", { replace: true });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="bg-main px-3 sm:px-10 pt-2 lg:px-35 relative z-50">
      {/* 🔹 Parte superior del navbar */}
      <div className="flex justify-between items-center relative">
        {/* 🧭 Logo */}
        <div className="flex items-center w-1/3">
          <Link
            to="/"
            className="text-white font-fugaz text-3xl flex items-center gap-3 p-2"
          >
            <img
              src={logo}
              alt="Logo"
              className="h-10 w-auto ml-0 sm:ml-0" // pegado al borde
            />
            <span className="hidden sm:inline">TukiShop</span>
          </Link>
        </div>

        {/* 🔍 Barra de búsqueda centrada */}
        <div
          className="
            absolute left-1/2 transform -translate-x-1/2
            flex items-center bg-white rounded-full px-0.5
            w-[65%] sm:w-[60%] md:w-1/3
            transition-all duration-300
          "
        >
          <input
            type="text"
            className="
              w-full text-sm rounded-full focus:outline-none
              h-[2.25rem] sm:h-10 p-2 sm:p-4
            "
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <ButtonComponent
            style="
              bg-gradient-to-br from-contrast-main to-contrast-secondary
              rounded-full w-9 h-[2rem] sm:w-12 sm:h-9
              flex items-center justify-center
            "
            icon={<IconSearch className="text-white h-4 sm:h-5 w-auto stroke-3" />}
            onClick={handleSearch}
          />
        </div>

        {/* 👤 Usuario y carrito (solo escritorio) */}
        <div className="w-1/3 flex justify-end">
          <ul className="hidden md:flex gap-5 p-2 text-white font-medium">
            <div className="flex space-x-2">
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
                    <Link
                      className="flex items-center gap-1"
                      to="/loginRegister"
                    >
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
                <a href="#">
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

          {/* 🍔 Botón menú móvil */}
          <button
            className="md:hidden text-white mr-0 sm:mr-0"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <IconX className="h-8 w-8" />
            ) : (
              <IconMenu2 className="h-8 w-8" />
            )}
          </button>
        </div>
      </div>

      {/* 🔽 Menú móvil */}
      <div
        className={`${
          menuOpen ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
        } overflow-hidden transition-all duration-500 bg-main text-white rounded-b-2xl shadow-md md:hidden`}
      >
        <ul className="flex flex-col gap-3 mt-5 px-6 text-white text-sm font-light">
          <li>
            <CategoryDropdown categories={categories} navigate={navigate} />
          </li>
          <li onClick={() => { navigate("/search?mode=explore"); setMenuOpen(false); }}>Explorar</li>
          <li onClick={() => { navigate("/search?mode=offers"); setMenuOpen(false); }}>Ofertas</li>
          <li onClick={() => { navigate("/search?mode=best-sellers"); setMenuOpen(false); }}>Lo más vendido</li>
          <li onClick={() => { navigate("/search/stores"); setMenuOpen(false); }}>Tiendas</li>
          <li onClick={() => setMenuOpen(false)}><Link to="/beSellerPage">Vender</Link></li>
          <li onClick={() => setMenuOpen(false)}><a href="/about">Conócenos</a></li>
        </ul>

        {/* Perfil y carrito */}
        <div className="flex justify-between items-center mt-6 px-6 pb-4 border-t border-white/20">
          <div className="flex flex-col gap-2">
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <span className="flex items-center gap-2">
                    <IconUser className="h-5 w-5" /> {displayName}
                  </span>
                </Link>
                <button
                  onClick={() => { handleLogout(); setMenuOpen(false); }}
                  className="text-white text-sm underline"
                >
                  Salir
                </button>
              </>
            ) : (
              <Link
                to="/loginRegister"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <IconUser className="h-5 w-5" /> Iniciar sesión
              </Link>
            )}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/shoppingCart" onClick={() => setMenuOpen(false)}>
              <IconShoppingBag className="h-6 w-6" />
            </Link>
            <IconHeart className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* 🔹 Menú inferior (solo escritorio) */}
      <div className="hidden md:block">
        <ul className="flex justify-center gap-10 p-3 text-white text-sm font-light">
          <li className="flex relative z-20 items-center transform transition-all duration-300">
            <CategoryDropdown categories={categories} navigate={navigate} />
          </li>
          <li onClick={() => navigate("/search?mode=explore")} className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer">Explorar</li>
          <li onClick={() => navigate("/search?mode=offers")} className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer">Ofertas</li>
          <li onClick={() => navigate("/search?mode=best-sellers")} className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer">Lo más vendido</li>
          <li onClick={() => navigate("/search/stores")} className="hover:-translate-y-1 transform transition-all duration-300 hover:cursor-pointer">Tiendas</li>
          <li className="hover:-translate-y-1 transform transition-all duration-300"><Link to="/beSellerPage">Vender</Link></li>
          <li className="hover:-translate-y-1 transform transition-all duration-300"><a href="/about">Conócenos</a></li>
        </ul>
      </div>
    </nav>
  );
}
