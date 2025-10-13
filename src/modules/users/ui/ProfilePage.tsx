import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import SellerProductsList from "../../seller/ui/components/SellerProductsList";
import SideBar from "../../../components/navigation/SideBar";
import TransactionHistory from "./TransactionHistory";
import UserProfile from "./UserProfile";
import { useAuth } from "../../../hooks/context/AuthContext";
import OrderStatus from "./OrderStatus";

export default function UserPage() {
  const [selected, setSelected] = useState("profile");
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center py-20">Cargando...</div>;
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER")) {
    return (
      <div className="text-center text-red-500 font-semibold py-20">
        No autorizado 🚫
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-quicksand">
      <NavBar />

      <section className="flex flex-col md:flex-row px-5 md:px-10 py-10 mx-auto max-w-[80rem] w-full flex-grow">
        {/* 🧭 SIDEBAR (escritorio) */}
        <aside className="hidden md:block w-[25%] border-r border-gray-200 pr-6">
          <SideBar
            type={user.role}
            onSelect={setSelected}
            selected={selected}
          />
        </aside>

        {/* 📱 Menú móvil (tabs arriba) */}
        <div className="md:hidden mb-6 flex justify-around bg-main/10 rounded-full p-2 backdrop-blur-md">
          <button
            onClick={() => setSelected("profile")}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              selected === "profile"
                ? "bg-main text-white shadow-md"
                : "text-main hover:bg-main/20"
            }`}
          >
            Perfil
          </button>

          <button
            onClick={() => setSelected("transactions")}
            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
              selected === "transactions"
                ? "bg-main text-white shadow-md"
                : "text-main hover:bg-main/20"
            }`}
          >
            Historial
          </button>

          {user.role === "SELLER" && (
            <>
              <button
                onClick={() => setSelected("products")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selected === "products"
                    ? "bg-main text-white shadow-md"
                    : "text-main hover:bg-main/20"
                }`}
              >
                Productos
              </button>

              <button
                onClick={() => setSelected("orderStatus")}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${
                  selected === "orderStatus"
                    ? "bg-main text-white shadow-md"
                    : "text-main hover:bg-main/20"
                }`}
              >
                Pedidos
              </button>
            </>
          )}
        </div>

        {/* 🧩 CONTENIDO PRINCIPAL */}
        <main className="flex-1 w-full md:w-[75%] transition-all duration-300">
          {selected === "profile" && <UserProfile type={user.role} />}
          {selected === "transactions" && <TransactionHistory />}
          {selected === "products" && user.role === "SELLER" && (
            <SellerProductsList />
          )}
          {selected === "orderStatus" && user.role === "SELLER" && (
            <OrderStatus />
          )}
        </main>
      </section>

      <Footer />
    </div>
  );
}
