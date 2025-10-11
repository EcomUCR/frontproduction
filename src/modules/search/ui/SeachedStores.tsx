// 📄 src/modules/stores/pages/SearchedStores.tsx
import { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import StoreBannerDynamic from "./StoreInfoCard";

export default function SearchedStores() {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const { data } = await axios.get("/stores");
        setStores(data);
      } catch (error) {
        console.error("Error al obtener tiendas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  return (
    <div>
      <NavBar />

      <div className="max-w-6xl mx-auto my-10 flex flex-col gap-8 px-6">
        {loading ? (
          <p className="text-center text-gray-500">Cargando tiendas...</p>
        ) : stores.length > 0 ? (
          stores.map((store) => <StoreBannerDynamic key={store.id} store={store} />)
        ) : (
          <p className="text-center text-gray-500">No hay tiendas disponibles 🏪</p>
        )}
      </div>

      <Footer />
    </div>
  );
}
