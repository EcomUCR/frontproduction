import { Button } from "./button";
import editIcon from "../../img/editIcon.png";
import perfil from "../../img/perfil.png";
import type { FullUser } from "../types/User";

interface UserInfoPanelProps {
  user: FullUser;
  profileImageSrc?: string;
  onDeleted?: () => void; // optional callback after deletion
}

const UserInfoPanel: React.FC<UserInfoPanelProps> = ({ user, profileImageSrc = perfil, onDeleted }) => {
  const fullName =
    user.client
      ? `${user.client.first_name} ${user.client.last_name}`
      : user.staff
      ? `${user.staff.first_name} ${user.staff.last_name}`
      : user.vendor
      ? user.vendor.name
      : "N/A";

  const username = user.client ? user.client.username : "N/A";

  const handleDelete = async () => {
    const confirm = window.confirm("¿Estás seguro de eliminar esta cuenta?");
    if (!confirm) return;

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token found");

      const res = await fetch(`/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete user");

      alert("Usuario eliminado correctamente ✅");
      if (onDeleted) onDeleted(); // optional callback to refresh table
    } catch (err) {
      console.error(err);
      alert("Error eliminando el usuario ❌");
    }
  };

  return (
    <div className="w-full md:w-1/2 p-6 rounded-lg border border-blue-main flex flex-col">
      {/* Profile image */}
      <div className="w-full flex justify-center mb-8">
        <img
          src={user.client?.avatar || profileImageSrc}
          alt="User Profile"
          className="w-full max-h-80 object-contain rounded-lg"
        />
      </div>

      {/* User info */}
      <div className="space-y-4 flex-grow">
        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Fullname</label>
          <div className="flex items-center gap-2">
            <p className="text-gray-800 font-medium">{fullName}</p>
            <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Username</label>
          <div className="flex items-center gap-2">
            <p className="text-gray-800 font-medium">@{username}</p>
            <img src={editIcon} alt="Edit" className="w-4 h-4 cursor-pointer" />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-gray-500 text-sm">Correo</label>
          <p className="text-gray-400 font-medium">{user.email}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 mt-8">
        <Button
          variant="default"
          className="bg-yellow-main hover:bg-[#f0c341]/90 text-white rounded-md py-2 px-4"
        >
          Cambiar contraseña
        </Button>
        <Button
          variant="destructive"
          className="bg-red-800 hover:bg-[#fe5143]/90 text-white rounded-md py-2 px-4"
          onClick={handleDelete}
        >
          Eliminar Cuenta
        </Button>
      </div>
    </div>
  );
};

export default UserInfoPanel;
