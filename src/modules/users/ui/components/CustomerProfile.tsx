import { useState } from "react";
import { useAuth } from "../../../../hooks/context/AuthContext";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import axios from "axios";
import { uploadImage } from "../../infrastructure/imageService";
import { IconEdit } from "@tabler/icons-react";

interface CustomerProfileProps {
  alert: any;
  setAlert: React.Dispatch<React.SetStateAction<any>>;
}

export default function CustomerProfile({ setAlert }: CustomerProfileProps) {
  const { user, refreshUser, token } = useAuth();
  const [newProfileFile, setNewProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [cambiarPassword, setCambiarPassword] = useState(false);
  const [saving, setSaving] = useState(false);

  // campos de contraseña
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProfileFile(file);
    setProfilePreview(URL.createObjectURL(file));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      if (user) {
        // 🖼️ Imagen de perfil
        const body: Record<string, any> = {};
        if (newProfileFile) {
          const imageUrl = await uploadImage(newProfileFile);
          body.image = imageUrl;
        }

        // 📩 Actualizar foto si aplica
        if (Object.keys(body).length > 0) {
          await axios.patch(`/users/${user.id}`, body, {
            headers: { Authorization: `Bearer ${token}` },
          });
          await refreshUser?.();
        }

        // 🔐 Cambiar contraseña
        if (cambiarPassword) {
          if (!currentPassword || !newPassword || !confirmPassword) {
            setAlert({
              show: true,
              title: "Campos incompletos",
              message: "Debes llenar todos los campos de contraseña.",
              type: "warning",
            });
            setSaving(false);
            return;
          }

          if (newPassword !== confirmPassword) {
            setAlert({
              show: true,
              title: "Error de confirmación",
              message: "Las contraseñas no coinciden.",
              type: "error",
            });
            setSaving(false);
            return;
          }

          await axios.put(
            "/change-password",
            {
              current_password: currentPassword,
              new_password: newPassword,
              new_password_confirmation: confirmPassword,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
        }

        setAlert({
          show: true,
          title: "Cambios guardados",
          message: cambiarPassword
            ? "Tu contraseña y perfil se actualizaron correctamente."
            : "Tu foto de perfil se actualizó correctamente.",
          type: "success",
        });

        // Reset campos
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setCambiarPassword(false);
        setProfilePreview(null);
        setNewProfileFile(null);
      }
    } catch (err: any) {
      setAlert({
        show: true,
        title: "Error al guardar",
        message:
          err.response?.data?.error ||
          "Ocurrió un problema al actualizar el perfil.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfilePreview(null);
    setNewProfileFile(null);
    setCambiarPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6 mt-10 font-quicksand px-4 sm:px-10">
      {/*Imagen de perfil */}
      <div className="relative flex justify-center">
        {profilePreview || user?.image ? (
          <img
            src={profilePreview || user?.image}
            alt="profile_image"
            className="w-36 h-36 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white shadow"
          />
        ) : (
          <div className="w-36 h-36 sm:w-48 sm:h-48 rounded-full bg-gradient-to-br from-contrast-main to-contrast-secondary flex items-center justify-center border-4 border-white shadow">
            <p className="uppercase text-white font-bold text-5xl relative top-[-2px]">
              {user?.username?.[0] || "?"}
            </p>
          </div>
        )}

        <label className="absolute bottom-2 right-[calc(50%-4.5rem)] sm:right-[calc(50%-5rem)] bg-contrast-secondary/80 hover:bg-main/80 text-white p-2 rounded-full cursor-pointer transition-all duration-300">
          <IconEdit size={20} />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleProfileFileChange}
          />
        </label>
      </div>


      {/* 🧾 Formulario */}
      <div className="w-full sm:w-[70%]">
        <form className="flex flex-col gap-5 pt-6 sm:pt-10">
          {/* Nombre y correo */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
            <input
              type="text"
              placeholder={user?.first_name || "Nombre"}
              className="bg-main-dark/20 rounded-xl px-3 py-2 w-full text-sm sm:text-base"
            />
            <input
              type="text"
              placeholder={user?.email || "Correo electrónico"}
              className="bg-main-dark/20 rounded-xl px-3 py-2 w-full text-sm sm:text-base"
              disabled
            />
          </div>

          {/* Username */}
          <input
            type="text"
            placeholder={user?.username || "Nombre de usuario"}
            className="bg-main-dark/20 rounded-xl px-3 py-2 w-full sm:w-[50%] text-sm sm:text-base"
          />

          {/* Cambiar contraseña */}
          <label className="flex items-center gap-2 pt-5 text-sm sm:text-base">
            Cambiar contraseña
            <input
              type="checkbox"
              checked={cambiarPassword}
              onChange={() => setCambiarPassword(!cambiarPassword)}
            />
          </label>

          {cambiarPassword && (
            <div className="flex flex-col gap-5 mt-2">
              <input
                type="password"
                placeholder="Contraseña actual"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="bg-main-dark/20 rounded-xl px-3 py-2 w-full sm:w-[50%] text-sm sm:text-base"
              />
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full text-sm sm:text-base"
                />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full text-sm sm:text-base"
                />
              </div>
            </div>
          )}

        </form>

        {/* 🧩 Botones */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-6 mt-10 w-full">
          <ButtonComponent
            text="Cancelar"
            onClick={handleCancel}
            style="w-full sm:w-[48%] p-3 rounded-full text-white bg-main cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
          />
          <ButtonComponent
            text={saving ? 'Guardando...' : 'Guardar cambios'}
            onClick={handleSave}
            style="w-full sm:w-[48%] p-3 rounded-full text-white bg-contrast-secondary cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
}
