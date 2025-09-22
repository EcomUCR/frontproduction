import { useState, useEffect } from "react";
import perfil from "../../img/perfil.png";
import PencilIcon from "../../img/editIcon.png";
import { Collapsible, CollapsibleContent } from "./collapsible";
import { Checkbox } from "./checkbox";
import ButtonComponent from "./ButtonComponent";

import type { MeResponse } from "../types/User";

function UserProfile() {
  // password fields
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // user data
  const [data, setData] = useState<MeResponse | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

    //Load user profile
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("api/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((r) => r.json())
      .then((d: MeResponse) => {
        setData(d);
        if (d.client) {
          setFirstName(d.client.first_name || "");
          setLastName(d.client.last_name || "");
          setUsername(d.client.username || "");
        }
      })
      .catch(() => setData(null));
  }, []);

  // 🔹 Handle file selection
  const onPickFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // 🔹 Save changes
    // 🔹 Save changes (perfil + contraseña)
  const handleSave = async () => {
    if (!data?.client) return;
    const token = localStorage.getItem("token");

    try {
      // 1️⃣ Actualizar perfil
      const res = await fetch(`api/clients/${data.client.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          username: username,
          email: data.user?.email, // requerido para validación
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error al actualizar perfil");

      // actualizar estado local
      setData((prev) =>
        prev
          ? {
              ...prev,
              client: {
                ...prev.client!,
                first_name: firstName,
                last_name: lastName,
                username: username,
              },
            }
          : prev
      );

      // 2️⃣ Cambiar contraseña (si aplica)
      if (open) {
        if (!oldPassword || !newPassword || !confirmPassword) {
          alert("Debes completar todos los campos de contraseña ❌");
          return;
        }
        if (newPassword !== confirmPassword) {
          alert("Las contraseñas no coinciden ❌");
          return;
        }

        const resPass = await fetch("api/change-password", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: JSON.stringify({
            old_password: oldPassword,
            new_password: newPassword,
            new_password_confirmation: confirmPassword,
          }),
        });

        const passJson = await resPass.json();
        if (!resPass.ok) throw new Error(passJson.message || "Error al cambiar contraseña");
      }

      alert("Cambios guardados correctamente ✅");
      // limpiar campos de contraseña
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setOpen(false);

    } catch (error: any) {
      console.error(error);
      alert(error.message || "Error al guardar cambios ❌");
    }
  };

  return (
    <div className="flex w-full flex-col gap-6 p-10 bg-white min-h-screen h-full font-quicksand">
      <div>
        <h2 className="text-2xl mb-6">Información de la cuenta</h2>

        {/* Profile Picture */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <img
              src={previewUrl || data?.client?.avatar || perfil}
              alt="Profile"
              className="rounded-full object-cover max-w-[250px] max-h-[250px]"
            />
            <label className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md cursor-pointer">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onPickFile}
              />
              <img src={PencilIcon} alt="Edit" className="w-5 h-5" />
            </label>
          </div>
        </div>

        {/* Avatar actions */}
        <div className="flex justify-center gap-3 mb-8">
          <button
            disabled={!avatarFile}
            className="px-4 py-2 bg-purple-main text-white rounded-md disabled:opacity-50"
          >
            Subir
          </button>

          {data?.client?.avatar && (
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              Eliminar
            </button>
          )}
        </div>

        {/* User Info Fields */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label htmlFor="fullname">
              Nombre completo <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullname"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white-main p-2"
            />
          </div>
          <div>
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={data?.user?.email || ""}
              className="mt-1 block w-full rounded-md bg-white-main p-2"
              disabled
            />
          </div>
          <div>
            <label htmlFor="username">
              Nombre de usuario <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md bg-white-main p-2"
            />
          </div>
        </div>

        {/* Change Password */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          <Collapsible open={open} onOpenChange={setOpen}>
            <div className="flex items-center space-x-2 rounded-sm">
              <Checkbox
                id="changePassword"
                className="w-4 h-4 bg-white-main border border-purple-main rounded-sm text-gray-main"
                checked={open}
                onCheckedChange={(checked) => setOpen(!!checked)}
              />
              <label htmlFor="changePassword">Cambiar contraseña</label>
            </div>
            <CollapsibleContent className="mt-8 space-y-2">
              <form
                className="space-y-2 rounded-lg"
                onSubmit={(e) => e.preventDefault()}
              >
                <div>
                  <label htmlFor="old">
                    Contraseña actual<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="old"
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-white-main p-2"
                  />
                </div>
                <div>
                  <label htmlFor="new">
                    Nueva contraseña<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="new"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-white-main p-2"
                  />
                </div>
                <div>
                  <label htmlFor="confirm">
                    Confirmar contraseña<span className="text-red-500">*</span>
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mt-1 block w-full rounded-md bg-white-main p-2"
                  />
                </div>
              </form>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Save Button */}
        <div className="grid grid-cols-2 gap-6 mt-10">
          <ButtonComponent
            style="w-full p-2 bg-purple-main text-white rounded-md"
            text="Guardar"
            onClick={handleSave}
          />
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
