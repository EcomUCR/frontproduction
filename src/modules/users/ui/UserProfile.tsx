import { useEffect, useState, type JSX } from "react";
import axios from "axios";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import { useAuth } from "../../../hooks/context/AuthContext";
import foto from "../../../img/perfil.png";
import { uploadImage } from "../infrastructure/imageService";
import { updateStore } from "../../seller/infrastructure/storeService";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconEdit,
  IconLink,
  IconPhone,
  IconSquareRoundedPlus,
  IconX,
} from "@tabler/icons-react";
import AlertComponent from "../../../components/data-display/AlertComponent";

// ========================
// Interfaces y tipos
// ========================

interface UserProfileProps {
  type: "CUSTOMER" | "SELLER" | "ADMIN" | null | undefined;
}

interface SocialLink {
  type: "instagram" | "x" | "facebook" | "link";
  text: string;
}

const iconMap: Record<SocialLink["type"], JSX.Element> = {
  instagram: <IconBrandInstagram />,
  x: <IconBrandX />,
  facebook: <IconBrandFacebook />,
  link: <IconLink />,
};

interface Store {
  id: number;
  user_id?: number;
  name: string;
  slug?: string;
  description?: string | null;
  image?: string | null;
  banner?: string | null;
  category_id?: number | null;
  business_name?: string | null;
  tax_id?: string | null;
  legal_type?: string | null;
  registered_address?: string | null;
  support_email?: string | null;
  support_phone?: string | null;
  is_verified?: boolean | null;
  verification_date?: string | null;
  status?: "ACTIVE" | "SUSPENDED" | "CLOSED" | null | string;
}

// ========================
// Componente principal
// ========================

export default function UserProfile({ type }: UserProfileProps): JSX.Element {
  const { user, loading, refreshUser } = useAuth();

  // Estados generales
  const [saving, setSaving] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    title: "",
    message: "",
    type: "info" as "info" | "success" | "warning" | "error",
  });

  // Estados para STORE
  const [store, setStore] = useState<Store | null>(null);
  const [editableStore, setEditableStore] = useState<Store | null>(null);
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);

  // Estados para CUSTOMER
  const [newProfileFile, setNewProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [originalSocialLinks, setOriginalSocialLinks] = useState<SocialLink[]>(
    []
  );
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<SocialLink["type"]>("instagram");
  const [newText, setNewText] = useState("");

  // ========================
  // Cargar datos de tienda
  // ========================

  useEffect(() => {
    if (user?.store) {
      const storeData: Store = { ...user.store, slug: user.store.slug || "" };
      setStore(storeData);
      setEditableStore(storeData);
    }

    setSocialLinks([]);
    setOriginalSocialLinks([]);
  }, [user]);

  // ========================
  // Handlers
  // ========================

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditableStore((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewProfileFile(file);
    setProfilePreview(URL.createObjectURL(file)); // preview inmediato
  };

  const addSocialLink = () => {
    if (newText.trim() === "") return;
    setSocialLinks((prev) => [...prev, { type: newType, text: newText }]);
    setNewText("");
    setNewType("instagram");
    setAdding(false);
  };

  const handleCancel = () => {
    setEditableStore(store);
    setSocialLinks(originalSocialLinks);
    setAdding(false);
    setNewText("");
    setNewType("instagram");
    setNewLogoFile(null);
    setNewBannerFile(null);
    setNewProfileFile(null);
    setProfilePreview(null);
  };

  // ========================
  // Guardar cambios
  // ========================

  const handleSave = async () => {
    setSaving(true);
    try {
      // 🔹 Caso SELLER
      if (type === "SELLER" && editableStore) {
        const updatedFields: Record<string, any> = {
          name: editableStore.name ?? "",
          description: editableStore.description ?? "",
          registered_address: editableStore.registered_address ?? "",
          support_phone: editableStore.support_phone ?? "",
          support_email: editableStore.support_email ?? "",
        };

        Object.keys(updatedFields).forEach((key) => {
          if (updatedFields[key] === "") delete updatedFields[key];
        });

        if (newLogoFile) {
          const logoUrl = await uploadImage(newLogoFile);
          updatedFields.image = logoUrl;
        }
        if (newBannerFile) {
          const bannerUrl = await uploadImage(newBannerFile);
          updatedFields.banner = bannerUrl;
        }

        await updateStore(editableStore.id, updatedFields);
        await refreshUser();

        setAlert({
          show: true,
          title: "Cambios guardados",
          message: "La tienda se actualizó correctamente.",
          type: "success",
        });
      }

      // 🔹 Caso CUSTOMER
      if (type === "CUSTOMER" && user) {
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
    } catch (err) {
      console.error("Error al guardar:", err);
      setAlert({
        show: true,
        title: "Error al guardar",
        message: "Ocurrió un problema al actualizar los datos.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewLogoFile(file);
    const previewURL = URL.createObjectURL(file);
    setEditableStore((prev) => (prev ? { ...prev, image: previewURL } : prev));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setNewBannerFile(file);
    const previewURL = URL.createObjectURL(file);
    setEditableStore((prev) => (prev ? { ...prev, banner: previewURL } : prev));
  };

  // ========================
  // Renderizado
  // ========================

  if (loading) return <div>Cargando...</div>;
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER"))
    return <div>No autorizado</div>;

  return (
    <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
      <div className="flex flex-col pl-10">
        <h1 className="text-xl font-quicksand">Información de la cuenta</h1>
      </div>

      {/* ============ PERFIL CLIENTE ============ */}
      {type === "CUSTOMER" && (
        <div className="flex relative w-full flex-col justify-center gap-4 mt-10">
          <div className="flex justify-center relative">
            <img
              src={profilePreview || user.image || foto}
              alt="profile_image"
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow"
            />
            <label className="absolute bottom-2 right-[calc(50%-5rem)] bg-main-dark/80 hover:bg-main-dark text-white p-2 rounded-full cursor-pointer">
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
            <div className="flex justify-between gap-2">
              <ButtonComponent
                text="Cancelar"
                onClick={handleCancel}
                style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10"
              />
              <ButtonComponent
                text={saving ? "Guardando..." : "Guardar cambios"}
                onClick={handleSave}
                style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10"
              />
            </div>
          </div>
        </div>
      )}

      {/* ============ PERFIL VENDEDOR ============ */}
      {type === "SELLER" && editableStore && (
        <div className="flex w-full flex-col justify-center gap-4 mt-10 font-quicksand">
          {/* Logo y banner */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex justify-center gap-10 px-10"
          >
            <figure className="flex flex-col gap-10 w-1/3">
              <div className="flex items-center gap-2">
                <p>Logo de tienda</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <ButtonComponent
                    icon={<IconEdit />}
                    iconStyle="text-contrast-secondary"
                  />
                </label>
              </div>
              <img
                src={
                  editableStore.image ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="Logo"
                className="w-2/3 h-auto rounded-xl object-cover"
              />
            </figure>

            <figure className="flex flex-col gap-10 w-2/3">
              <div className="flex items-center gap-2">
                <p>Banner de la tienda</p>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                  />
                  <ButtonComponent
                    icon={<IconEdit />}
                    iconStyle="text-contrast-secondary"
                  />
                </label>
              </div>
              <img
                src={
                  editableStore.banner ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="Banner"
                className={
                  editableStore.banner
                    ? "w-auto h-auto rounded-xl object-cover"
                    : "w-auto h-30 rounded-xl object-cover"
                }
              />
            </figure>
          </form>

          {/* Formulario principal */}
          <div className="w-full px-10">
            <form className="flex flex-col gap-8 pt-10">
              <section className="flex flex-col gap-10">
                <div className="flex gap-10">
                  <label className="flex flex-col w-full">
                    Nombre de la tienda
                    <textarea
                      name="name"
                      value={editableStore.name || ""}
                      onChange={handleChange}
                      rows={2}
                      className="bg-main-dark/10 rounded-xl px-3 py-2 w-full"
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    Correo electrónico
                    <input
                      type="text"
                      placeholder={user.email || "Correo de la tienda"}
                      className="bg-main-dark/10 rounded-xl px-3 py-2 w-full"
                      disabled
                    />
                  </label>
                </div>

                {/* Teléfono */}
                <section className="flex gap-10 ">
                  <div className="w-full">
                    Número telefónico
                    <label className="bg-main-dark/10 rounded-xl px-3 flex items-center gap-2 w-full">
                      <IconPhone className="text-contrast-secondary" />
                      <input
                        name="support_phone"
                        type="text"
                        value={editableStore.support_phone || ""}
                        onChange={handleChange}
                        placeholder="Número telefónico"
                        className="w-full py-2 focus:outline-none"
                      />
                    </label>
                  </div>
                  <label className="flex flex-col w-full">
                    Correo de la tienda
                    <input
                      type="email"
                      placeholder={"Correo de la tienda"}
                      className="bg-main-dark/10 rounded-xl px-3 py-2 w-full"
                      name="support_email"
                      onChange={handleChange}
                      value={editableStore.support_email || ""}
                    />
                  </label>
                </section>

                {/* Redes sociales */}
                <section>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <h2>Links/Redes sociales</h2>
                      {!adding ? (
                        <button type="button" onClick={() => setAdding(true)}>
                          <IconSquareRoundedPlus className="text-contrast-secondary" />
                        </button>
                      ) : (
                        <button type="button" onClick={() => setAdding(false)}>
                          <IconX className="text-contrast-secondary size-4" />
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                      {socialLinks.map((link, index) => (
                        <ButtonComponent
                          key={index}
                          text={link.text}
                          icon={iconMap[link.type]}
                          style="text-main-dark flex gap-2 bg-main-dark/10 py-3 px-2 rounded-xl font-semibold"
                          iconStyle="text-contrast-secondary"
                        />
                      ))}

                      {adding && (
                        <div className="flex gap-2 items-center bg-main-dark/10 py-3 px-2 rounded-xl">
                          <select
                            value={newType}
                            onChange={(e) =>
                              setNewType(e.target.value as SocialLink["type"])
                            }
                            className="bg-transparent outline-none"
                          >
                            <option value="instagram">Instagram</option>
                            <option value="x">X</option>
                            <option value="facebook">Facebook</option>
                            <option value="link">Link</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Usuario o link"
                            value={newText}
                            onChange={(e) => setNewText(e.target.value)}
                            className="bg-transparent outline-none flex-1"
                          />
                          <button
                            type="button"
                            onClick={addSocialLink}
                            className="text-contrast-secondary font-semibold"
                          >
                            Guardar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </section>

                <div className="flex gap-10">
                  <label className="flex flex-col w-full">
                    Descripción de la tienda
                    <textarea
                      name="description"
                      value={editableStore.description || ""}
                      onChange={handleChange}
                      rows={4}
                      className="bg-main-dark/10 rounded-xl px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    Dirección de la tienda
                    <textarea
                      name="registered_address"
                      value={editableStore.registered_address || ""}
                      onChange={handleChange}
                      rows={4}
                      className="bg-main-dark/10 rounded-xl px-3 py-2"
                    />
                  </label>
                </div>
              </section>
            </form>

            {/* Botones finales */}
            <div className="flex justify-between gap-2">
              <ButtonComponent
                text="Cancelar"
                onClick={handleCancel}
                style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10"
              />
              <ButtonComponent
                text={saving ? "Guardando..." : "Guardar cambios"}
                onClick={async () => {
                  setSaving(true);
                  try {
                    const updatedFields: Record<string, any> = {
                      name: editableStore.name ?? "",
                      description: editableStore.description ?? "",
                      registered_address:
                        editableStore.registered_address ?? "",
                      support_phone: editableStore.support_phone ?? "",
                      support_email: editableStore.support_email ?? "",
                    };

                    Object.keys(updatedFields).forEach((key) => {
                      if (updatedFields[key] === "") delete updatedFields[key];
                    });

                    // 🔹 Subir y actualizar logo
                    if (newLogoFile) {
                      const logoUrl = await uploadImage(newLogoFile);
                      updatedFields.image = logoUrl;

                      // 🧩 También actualizar el usuario con la misma imagen
                      if (user) {
                        await axios.patch(`/users/${user.id}`, {
                          image: logoUrl,
                        });
                      }
                    }

                    // 🔹 Subir y actualizar banner
                    if (newBannerFile) {
                      const bannerUrl = await uploadImage(newBannerFile);
                      updatedFields.banner = bannerUrl;
                    }

                    // 🔹 Actualizar tienda
                    await updateStore(editableStore.id, updatedFields);
                    await refreshUser();

                    setAlert({
                      show: true,
                      title: "Cambios guardados",
                      message:
                        "La tienda y la foto de perfil se actualizaron correctamente.",
                      type: "success",
                    });
                  } catch (err) {
                    console.error("Error al guardar:", err);
                    setAlert({
                      show: true,
                      title: "Error al guardar",
                      message: "Ocurrió un problema al actualizar los datos.",
                      type: "error",
                    });
                  } finally {
                    setSaving(false);
                  }
                }}
                style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10"
              />
            </div>
          </div>
        </div>
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
