import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import NavBarSeller from "./components/NavBarSeller";
import HomeSeller from "./components/SellerHomeComponent";
import SellerOffers from "./components/SellerOffersComponent";
import SellerContactComponent from "./components/SellerContactComponent";
import SellerReviewsComponent from "./components/SellerReviewsComponent";
import { getStore } from "../infrastructure/storeService";
import type { Store } from "../../users/infrastructure/useUser";
import { SkeletonStoreHeader } from "../../../components/ui/AllSkeletons";

export default function SellerPage() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [view, setView] = useState<"home" | "offers" | "contact" | "reviews">("home");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchStore = async () => {
      try {
        const data = await getStore(Number(id));
        setStore(data);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [id]);

  return (
    <div className="flex flex-col w-full">
      <NavBar />
      <div className="mx-auto max-w-[80rem] w-full">
        <header className="flex flex-col justify-center w-full px-5 py-5 gap-3 ">
          {/* 🦴 Mostrar esqueleto o banner */}
          {loading ? (
            <SkeletonStoreHeader />
          ) : (
            <img
              src={store?.banner || ""}
              alt="Banner Store"
              className="w-full h-[15rem] object-cover rounded-2xl"
            />
          )}

          <NavBarSeller setView={setView} currentView={view} id={id} />
        </header>

        {/* 🔹 Mientras carga, renderiza las mismas secciones pero en modo loading */}
        <div>
          {view === "home" && <HomeSeller/>}
          {view === "offers" && <SellerOffers />}
          {view === "contact" && <SellerContactComponent/>}
          {view === "reviews" && <SellerReviewsComponent  />}
        </div>
      </div>
      <Footer />
    </div>
  );
}
