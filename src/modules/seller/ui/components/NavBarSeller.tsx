import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { Store } from "../../../users/infrastructure/useUser";
import { getStore } from "../../infrastructure/storeService";
import { Skeleton } from "../../../../components/ui/skeleton";
import { useNavigate, useLocation } from "react-router-dom";

interface NavBarSellerProps {
  setView: (view: "home" | "offers" | "contact" | "reviews") => void;
  currentView: "home" | "offers" | "contact" | "reviews";
  id?: string | undefined;
}

export default function NavBarSeller({
  setView,
  currentView,
  id,
}: NavBarSellerProps) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 Detectar si estamos en /search

  useEffect(() => {
    if (!id) return;

    const fetchStore = async () => {
      try {
        const data = await getStore(Number(id));
        setStore(data);
      } catch (err) {
        console.error("Error al cargar la tienda:", err);
      } finally {
        setTimeout(() => setLoading(false), 400);
      }
    };

    fetchStore();
  }, [id]);

  // 🔍 Manejar búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim() || !id) return;
    navigate(`/store/${id}/search?q=${encodeURIComponent(searchTerm)}`);
  };

  // 🧭 Cambiar vista o navegar si estamos en /search
  const handleViewChange = (view: "home" | "offers" | "contact" | "reviews") => {
    setView(view);

    // Si estamos en /search, navegar de vuelta a /store/:id
    if (location.pathname.includes("/search") && id) {
      navigate(`/store/${id}`);
    }
  };

  // 🦴 Skeleton de carga
  if (loading) {
    return (
      <nav className="w-full bg-main-dark/10 text-main-dark px-10 h-20 flex justify-between items-center rounded-xl font-quicksand animate-pulse">
        <div className="w-1/3">
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>

        <div className="flex justify-center items-center w-1/3">
          <ul className="flex gap-10 p-3">
            <li><Skeleton className="h-4 w-12 rounded-full" /></li>
            <li><Skeleton className="h-4 w-12 rounded-full" /></li>
            <li><Skeleton className="h-4 w-12 rounded-full" /></li>
            <li><Skeleton className="h-4 w-12 rounded-full" /></li>
          </ul>
        </div>

        <div className="flex items-center bg-white/50 rounded-full h-10 px-0.5 w-1/3 ml-15">
          <Skeleton className="h-6 w-full rounded-full" />
        </div>
      </nav>
    );
  }

  // 🌟 NavBar con datos reales
  if (!store) return null;

  return (
    <nav className="w-full h-20 bg-main-dark/20 text-main-dark px-10 flex justify-between items-center rounded-xl font-quicksand">
      {/* Logo */}
      <div className="w-1/3">
        <img
          src={store.image || ""}
          alt={store.name}
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* Tabs */}
      <div className="flex justify-center items-center w-1/3">
        <ul className="flex gap-10 p-3 text-white text-sm font-medium">
          <li>
            <button
              onClick={() => handleViewChange("home")}
              className={`text-main-dark hover:-translate-y-1 transform transition-all cursor-pointer duration-300 hover:text-contrast-secondary ${
                currentView === "home" ? "font-bold" : ""
              }`}
            >
              Tienda
            </button>
          </li>
          <li>
            <button
              onClick={() => handleViewChange("offers")}
              className={`text-main-dark hover:-translate-y-1 transform cursor-pointer transition-all duration-300 hover:text-contrast-secondary ${
                currentView === "offers" ? "font-bold" : ""
              }`}
            >
              Ofertas
            </button>
          </li>
          <li>
            <button
              onClick={() => handleViewChange("contact")}
              className={`text-main-dark hover:-translate-y-1 transform cursor-pointer transition-all duration-300 hover:text-contrast-secondary ${
                currentView === "contact" ? "font-bold" : ""
              }`}
            >
              Contacto
            </button>
          </li>
          <li>
            <button
              onClick={() => handleViewChange("reviews")}
              className={`text-main-dark hover:-translate-y-1 transform cursor-pointer transition-all duration-300 hover:text-contrast-secondary ${
                currentView === "reviews" ? "font-bold" : ""
              }`}
            >
              Opiniones
            </button>
          </li>
        </ul>
      </div>

      {/* 🔎 Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center bg-white rounded-full h-10 px-2 w-1/3 ml-15"
      >
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-6 p-2 text-sm focus:outline-none"
          placeholder={`Buscar en ${store.name || "la tienda"}`}
        />
        <button
          type="submit"
          className="bg-gradient-to-br from-contrast-main to-contrast-secondary rounded-full w-10 h-9 flex items-center justify-center"
        >
          <IconSearch className="text-white h-5 w-auto" />
        </button>
      </form>
    </nav>
  );
}
