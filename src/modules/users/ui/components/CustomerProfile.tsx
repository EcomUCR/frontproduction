import { useState } from "react";
import { useAuth } from "../../../../hooks/context/AuthContext";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import foto from "../../../../img/perfil.png";
import axios from "axios";
import { uploadImage } from "../../infrastructure/imageService";
import {IconEdit} from "@tabler/icons-react";

interface CustomerProfileProps {
  alert: any;
  setAlert: React.Dispatch<React.SetStateAction<any>>;
}

export default function CustomerProfile({ setAlert }: CustomerProfileProps) {
  const { user, refreshUser } = useAuth();
  const [newProfileFile, setNewProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);
  const [cambiarPassword, setCambiarPassword] = useState(false);
  const [saving, setSaving] = useState(false);

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
        const body: Record<string, any> = {};
        if (newProfileFile) {
          const imageUrl = await uploadImage(newProfileFile);
          body.image = imageUrl;
        }

        if (Object.keys(body).length > 0) {
          await axios.patch(`/users/${user.id}`, body);
          await refreshUser();
        }

        setAlert({
          show: true,
          title: "Perfil actualizado",
          message: "Tu foto de perfil se actualizó correctamente.",
          type: "success",
        });
      }
    } catch {
      setAlert({
        show: true,
        title: "Error al guardar",
        message: "Ocurrió un problema al actualizar el perfil.",
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
  };

  return (
    <div className="flex relative w-full flex-col justify-center gap-4 mt-10">
      <div className="flex justify-center relative">
        <img
          src={profilePreview || user?.image || foto}
          alt="profile_image"
          className="w-48 h-48 rounded-full object-cover border-4 border-white shadow"
        />
              <label className="absolute bottom-2 right-[calc(50%-5rem)] bg-contrast-secondary/80 hover:bg-main/80 text-white p-2 rounded-full cursor-pointer">
              <IconEdit size={22} />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleProfileFileChange}
              />
            </label>
      </div>

      <div className="w-[70%] mx-auto">
        <form className="flex flex-col gap-5 pt-10">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={user?.first_name}
              className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
            />
            <input
              type="text"
              placeholder={user?.email || "correo"}
              className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
              disabled
            />
          </div>

          <input
            type="text"
            placeholder={user?.username || "Nombre de usuario"}
            className="bg-main-dark/20 rounded-xl px-3 py-2 w-[50%]"
          />

          <label className="flex items-center gap-2 pt-5">
            Cambiar contraseña
            <input
              type="checkbox"
              checked={cambiarPassword}
              onChange={() => setCambiarPassword(!cambiarPassword)}
            />
          </label>

          {cambiarPassword && (
            <div className="flex flex-col gap-5">
              <input
                type="password"
                placeholder="Contraseña actual"
                className="bg-main-dark/20 rounded-xl px-3 py-2 w-[50%]"
              />
              <div className="flex gap-2">
                <input
                  type="password"
                  placeholder="Nueva contraseña"
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                />
                <input
                  type="password"
                  placeholder="Confirmar contraseña"
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                />
              </div>
            </div>
          )}
        </form>

        <div className="w-[70%] mx-auto">
          <div className="flex justify-between gap-2">
            <ButtonComponent
              text="Cancelar"
              onClick={handleCancel}
              style="w-full p-3 rounded-full text-white bg-main mt-10"
            />
            <ButtonComponent
              text={saving ? "Guardando..." : "Guardar cambios"}
              onClick={handleSave}
              style="w-full p-3 rounded-full text-white bg-contrast-secondary mt-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
