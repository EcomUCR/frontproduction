import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import SellerProductsList from "../../seller/ui/components/SellerProductsList";
import SideBar from "../../../components/navigation/SideBar";
import TransactionHistory from "./TransactionHistory";
import UserProfile from "./UserProfile";

export default function UserPage() {
    const [selected, setSelected] = useState("profile"); // por defecto profile
    {/*El valor de "User o Seller debe entrar por parámetros para que se cargue la vista correcta" */}

    return (
        <div>
            <NavBar />
            <section className="flex px-10 py-10 mx-auto max-w-[80rem]">
                <div className="w-[25%]">
                    <SideBar type="SELLER" onSelect={setSelected} selected={selected} />
                </div>
                <div className="w-[75%]">
                    {selected === "profile" && <UserProfile type="SELLER" user={undefined} />}
                    {selected === "transactions" && <TransactionHistory />}
                    {selected === "products" && <SellerProductsList />}
                </div>
            </section>
            <Footer />
        </div>
    );
}
