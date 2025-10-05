import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import SellerProductsList from "../../seller/ui/components/SellerProductsList";
import SideBar from "../../../components/navigation/SideBar";
import TransactionHistory from "./TransactionHistory";
import UserProfile from "./UserProfile";
import { useAuth } from "../../../hooks/context/AuthContext";

export default function UserPage() {
  const [selected, setSelected] = useState("profile");
  const { user, loading } = useAuth();

  // Si está cargando, muestra loader
  if (loading) return <div>Cargando...</div>;

  // Si no hay usuario autenticado o su rol no es válido
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER")) {
    return <div>No autorizado</div>;
  }

  // Ahora TS ya sabe que `user` no es null y su rol es correcto
  return (
    <div>
      <NavBar />
      <section className="flex px-10 py-10 mx-auto max-w-[80rem]">
        <div className="w-[25%]">
          <SideBar
            type={user.role}
            onSelect={setSelected}
            selected={selected}
          />
        </div>
        <div className="w-[75%]">
          {selected === "profile" && (
            <UserProfile
              type={user.role}
            />
          )}
          {selected === "transactions" && <TransactionHistory />}
          {selected === "products" && user.role === "SELLER" && (
            <SellerProductsList />
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}