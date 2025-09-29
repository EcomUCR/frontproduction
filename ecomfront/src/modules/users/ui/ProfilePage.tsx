import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import SellerProductsList from "../../seller/ui/components/SellerProductsList";
import SideBar from "../../../components/navigation/SideBar";
import TransactionHistory from "./TransactionHistory";
import UserProfile from "./UserProfile";
import useUser from "../../../hooks/useUser";

export default function ProfilePage() {
    const [selected, setSelected] = useState("profile");
    const { me, role, loading } = useUser();

    if (loading) return <div>Cargando...</div>;
    if (!me) return <div>No se ha podido cargar el usuario.</div>;
function getSideBarType(role: "seller" | "client" | "admin") {
  if (role === "seller") return "seller";
  return "user";
}

    return (
        <div>
            <NavBar />
            <section className="flex px-10 py-10 mx-auto max-w-[80rem]">
                <div className="w-[25%]">
                    {/* Asegúrate que SideBar recibe type/rol correcto */}
<SideBar type={getSideBarType(role)} onSelect={setSelected} selected={selected} />                </div>
                <div className="w-[75%]">
                    {role === "seller" && (
                      <>
                        {selected === "profile" && <UserProfile type="seller" />}
                        {selected === "transactions" && <TransactionHistory />}
                        {selected === "products" && <SellerProductsList />}
                      </>
                    )}
                    {role === "client" && (
                      <>
                        {selected === "profile" && <UserProfile type={getSideBarType(role)} />}
                        {selected === "transactions" && <TransactionHistory />}
                      </>
                    )}
                    {role === "admin" && (
                      <div>
                        {/* Placeholder admin */}
                        <h2>Zona Administrador. Pronto aquí tu panel.</h2>
                      </div>
                    )}
                </div>
            </section>
            <Footer />
        </div>
    );
}