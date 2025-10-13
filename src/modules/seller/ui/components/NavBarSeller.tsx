import { IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import type { Store } from "../../../users/infrastructure/useUser";
import { getStore } from "../../infrastructure/storeService";
import { Skeleton } from "../../../../components/ui/skeleton";

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

  // 🦴 Skeleton
  if (loading) {
    return (
      <nav className="w-full bg-main-dark/10 text-main-dark px-5 sm:px-10 h-20 flex justify-between items-center rounded-xl font-quicksand animate-pulse">
        <div className="w-1/3">
          <Skeleton className="h-8 w-28 rounded-md" />
        </div>
        <div className="hidden sm:flex justify-center items-center w-1/3">
          <ul className="flex gap-10 p-3">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <li key={i}>
                  <Skeleton className="h-4 w-12 rounded-full" />
                </li>
              ))}
          </ul>
        </div>
        <div className="flex items-center bg-white/50 rounded-full h-10 px-0.5 w-1/2 sm:w-1/3 ml-0 sm:ml-15">
          <Skeleton className="h-6 w-full rounded-full" />
        </div>
      </nav>
    );
  }

  if (!store) return null;

  return (
    <nav
      className="
        w-full h-auto sm:h-20 bg-main-dark/10 text-main-dark
        px-5 sm:px-10 py-3 sm:py-0
        flex flex-col sm:flex-row sm:justify-between sm:items-center
        gap-3 sm:gap-0
        rounded-xl font-quicksand
      "
    >
      {/* 🏪 Logo */}
      <div className="flex justify-center sm:justify-start w-full sm:w-1/3">
        <img
          src={store.image || ""}
          alt={store.name}
          className="h-14 w-auto object-contain"
        />
      </div>

      {/* 📂 Tabs */}
      <div className="flex justify-center items-center w-full sm:w-1/3 order-3 sm:order-none">
        <ul className="flex flex-wrap sm:flex-nowrap justify-center gap-5 sm:gap-10 p-2 text-white text-sm font-medium">
          {[
            { key: "home", label: "Tienda" },
            { key: "offers", label: "Ofertas" },
            { key: "contact", label: "Contacto" },
            { key: "reviews", label: "Opiniones" },
          ].map((tab) => (
            <li key={tab.key}>
              <button
                onClick={() => setView(tab.key as any)}
                className={`text-main-dark transition-all duration-300 hover:text-contrast-secondary ${
                  currentView === tab.key ? "font-bold" : ""
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* 🔍 Search bar */}
      <div className="flex justify-center sm:justify-end w-full sm:w-1/3">
        <div className="flex items-center bg-white rounded-full h-9 sm:h-10 px-1 w-full sm:w-4/5 max-w-[20rem]">
          <input
            type="text"
            className="w-full text-sm px-3 py-1 focus:outline-none"
            placeholder={`Buscar en ${store.name || "la tienda"}`}
          />
          <button className="bg-gradient-to-br from-contrast-main to-contrast-secondary rounded-full w-10 h-8 sm:w-15 sm:h-9 flex items-center justify-center">
            <IconSearch className="text-white h-5 w-5 sm:h-6 sm:w-6 stroke-3" />
          </button>
        </div>
      </div>
    </nav>
  );
}
