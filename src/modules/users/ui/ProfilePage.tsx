import { useEffect, useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import SellerProductsList from "../../seller/ui/components/SellerProductsList";
import SideBar from "../../../components/navigation/SideBar";
import TransactionHistory from "./TransactionHistory";
import UserProfile from "./UserProfile";
import { useAuth } from "../../../hooks/context/AuthContext";
import OrderStatus from "./OrderStatus";
import { AnimatePresence, motion } from "framer-motion";
import AdminUsersTable from "../../admin/ui/components/AdminUsersTable";
import CrudBanners from "../../admin/ui/components/CrudBanners";
import AdminCoupons from "../../admin/ui/components/AdminCoupons";
import OrdersList from "./OrdersList";

export default function UserPage() {
  const [selected, setSelected] = useState("profile");
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user?.role === "ADMIN") {
      setSelected("users");
    } else {
      setSelected("profile");
    }
  }, [user]);

  // Si está cargando, muestra loader
  if (loading) return <div>Cargando...</div>;

  // Si no hay usuario autenticado o su rol no es válido
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER" && user.role !== "ADMIN")) {
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
          <AnimatePresence mode="wait">
            <motion.div
              key={selected}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="w-[75%]"
            >
              {selected === "profile" && (<UserProfile type={user.role} />)}
              {selected === "transactions" && <TransactionHistory />}
              {selected === "orders" && <OrdersList />}
              {selected === "products" && user.role === "SELLER" && (<SellerProductsList />)}
              {selected === "orderStatus" && user.role === "SELLER" && (<OrderStatus />)}
              {selected === "users" && user.role === "ADMIN" && (<AdminUsersTable />)}
              {selected === "coupons" && user.role === "ADMIN" && (<AdminCoupons />)}
              {selected === "banners" && user.role === "ADMIN" && (<CrudBanners />)}
            </motion.div>
          </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
}