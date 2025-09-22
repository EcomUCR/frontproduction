import { useEffect, useState } from "react";
import { Button } from "./button";
import StatusSwitch from "./StatusSwitch";
import UserInfoPanel from "./UserInfoPanel";
import UserPurchasePanel from "./UserPurchasePanel";
import ModalButton from "./ModalButton";
import backArrowIcon from "../../img/backArrow.png";
import type { FullUser } from "../types/User";

interface UserConfigModalProps {
  userId: number; // 🔹 ID of the user to fetch
  onCancel?: () => void;
  onSave?: () => void;
}

const UserConfigModal: React.FC<UserConfigModalProps> = ({
  userId,
  onCancel,
  onSave,
}) => {
  const [user, setUser] = useState<FullUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setLoading(true);
    fetch(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch user");
        return res.json();
      })
      .then((data: FullUser) => setUser(data))
      .catch((err) => console.error("Error fetching user", err))
      .finally(() => setLoading(false));
  }, [userId]);

  return (
    <div
      className="fixed inset-0 bg-gray-600/50 flex items-center justify-center p-4 z-50"
      onClick={onCancel} // 🔹 close if you click outside
    >
      <div
        className="bg-white rounded-3xl shadow-lg w-full max-w-4xl max-h-[80vh] overflow-y-auto p-8 flex flex-col"
        onClick={(e) => e.stopPropagation()} // 🔹 prevent close when clicking inside
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6 relative">
          <Button
            onClick={onCancel}
            className="flex items-center bg-white border px-3 py-2 rounded-md shadow-sm text-black"
          >
            <img src={backArrowIcon} alt="Volver" className="w-4 h-4 mr-2" />
            <span className="text-black">Volver</span>
          </Button>
          <h2 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold">
            Modificar Usuario
          </h2>
        </div>

        {/* Content */}
        {loading ? (
          <p>Cargando usuario...</p>
        ) : user ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-y-4 mb-6 text-sm items-center">
              <div>
                <p className="text-purple-main font-bold mb-1">UUID</p>
                <p className="text-gray-800 font-medium">{user.id}</p>
              </div>
              <div>
                <p className="text-purple-main font-bold mb-1">Tipo</p>
                <p className="text-gray-800 font-medium flex items-center gap-1">
                  {user.client ? "User" : user.vendor ? "Seller" : "Staff"}
                </p>
              </div>
              <div>
                <p className="text-purple-main font-bold mb-1">
                  Última conexión
                </p>
                <p className="text-gray-800 font-medium">
                  {user.last_login_at
                    ? new Date(user.last_login_at).toLocaleString()
                    : "Never"}
                </p>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-purple-main font-bold mb-1">Status</p>
                <StatusSwitch initial={true} />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {user && <UserInfoPanel user={user} />}
              <UserPurchasePanel />
            </div>
          </>
        ) : (
          <p>No se pudo cargar el usuario ❌</p>
        )}

        {/* Footer */}
        <ModalButton onCancel={onCancel} onSave={onSave} />
      </div>
    </div>
  );
};

export default UserConfigModal;
