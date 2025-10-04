import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import SellerProductsList from "../../seller/ui/components/SellerProductsList";
import SideBar from "../../../components/navigation/SideBar";
import TransactionHistory from "./TransactionHistory";
import UserProfile from "./UserProfile";
import useUser from "../../../hooks/useUser";
import type { UserRole } from "../../../hooks/useUser";
import SellerOrderStatus from "../../seller/ui/components/SellerOrderStatus";

// Convierte el role backend (o usa directo) para type UI
function toComponentType(role: UserRole | null): "SELLER" | "CUSTOMER" {
  return role === "SELLER" ? "SELLER" : "CUSTOMER";
}

export default function ProfilePage() {
  const [selected, setSelected] = useState("profile");
  const { user, role, loading } = useUser();

  if (loading) return <div>Cargando...</div>;
  if (!user) return <div>No se ha podido cargar el usuario.</div>;

  return (
    <div>
      <NavBar />
      <section className="flex px-10 py-10 mx-auto max-w-[80rem]">
        <div className="w-[25%]">
          {/* SideBar espera type = "SELLER" | "CUSTOMER" */}
          <SideBar
            type={toComponentType(role)}
            onSelect={setSelected}
            selected={selected}
          />
        </div>
        <div className="w-[75%]">
          {role === "SELLER" && (
            <>
              {selected === "profile" && <UserProfile type="SELLER" user={user} />}
              {selected === "transactions" && <TransactionHistory />}
              {selected === "products" && <SellerProductsList />}
              {selected === "orderStatus" && <SellerOrderStatus />}
            </>
          )}
          {role === "CUSTOMER" && (
            <>
              {selected === "profile" && <UserProfile type="CUSTOMER" user={user}/>}
              {selected === "transactions" && <TransactionHistory />}
            </>
          )}
          {role === "ADMIN" && (
            <div>
              <h2>Zona Administrador. Pronto aquí tu panel.</h2>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
}