import { useState, type JSX } from "react";
import { useAuth } from "../../../hooks/context/AuthContext";
import AlertComponent from "../../../components/data-display/AlertComponent";
import SellerProfile from "./components/SellerProfile";
import CustomerProfile from "./components/CustomerProfile";

interface UserProfileProps {
  type: "CUSTOMER" | "SELLER" | "ADMIN" | null | undefined;
}

export default function UserProfile({ type }: UserProfileProps): JSX.Element {
  const { user, loading } = useAuth();
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  if (loading) return <div>Cargando...</div>;
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER"))
    return <div>No autorizado</div>;

  return (
    <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
      <div className="flex flex-col pl-10">
        <h1 className="text-xl font-quicksand">Información de la cuenta</h1>
      </div>

      {type === "CUSTOMER" && (
        <CustomerProfile alert={alert} setAlert={setAlert} />
      )}
      {type === "SELLER" && (
        <SellerProfile alert={alert} setAlert={setAlert} />
      )}

      <AlertComponent
        show={alert.show}
        title={alert.title}
        message={alert.message}
        type={alert.type}
        confirmText="Aceptar"
        cancelText="Cerrar"
        onConfirm={() => setAlert((prev) => ({ ...prev, show: false }))}
        onCancel={() => setAlert((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
