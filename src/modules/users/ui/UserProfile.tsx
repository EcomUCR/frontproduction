import { useEffect, useState, type JSX } from "react";
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
  slug?: string; // opcional para evitar errores
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
  const { user, loading } = useAuth();

  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const [store, setStore] = useState<Store | null>(null);
  const [editableStore, setEditableStore] = useState<Store | null>(null);
  const [cambiarPassword, setCambiarPassword] = useState(false);

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
      const storeData: Store = {
        ...user.store,
        slug: user.store.slug || "", // evita error TS
      };
      setStore(storeData);
      setEditableStore(storeData);
    }

    const linksFromApi: SocialLink[] = [];
    setSocialLinks(linksFromApi);
    setOriginalSocialLinks(linksFromApi);
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
    setCambiarPassword(false);
    setAdding(false);
    setNewText("");
    setNewType("instagram");
    setNewLogoFile(null);
    setNewBannerFile(null);
  };

  const handleSave = async () => {
  if (!editableStore) return;
  setSaving(true);

  try {
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
    alert("Tienda actualizada correctamente");
  } catch (err) {
    console.error("Error al guardar la tienda:", err);
    alert("Ocurrió un error al guardar la tienda");
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

  function handleEdit(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
      <div className="flex flex-col pl-10">
        <h1 className="text-xl font-quicksand">Información de la cuenta</h1>
      </div>

      {/* ============ PERFIL CLIENTE ============ */}
      {type === "CUSTOMER" && (
        <div className="flex relative w-full flex-col justify-center gap-4 mt-10">
          <div className="flex justify-center">
            <img
              src={user.image || foto}
              alt="profile_image"
              className="w-auto h-80 rounded-full"
            />
            <ButtonComponent
              onClick={handleEdit}
              style="cursor-pointer absolute top-70 right-55 bg-main-dark/20 hover:bg-main-dark/90 p-2 rounded-full"
              icon={<IconEdit size={30} className="text-contrast-secondary" />}
            />
          </div>

          <div className="w-[70%] mx-auto">
            <form className="flex flex-col gap-5 pt-10">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder={user.first_name}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                />
                <input
                  type="text"
                  placeholder={user.email || "correo"}
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                  disabled
                />
              </div>

              <input
                type="text"
                placeholder={user.username || "Nombre de usuario"}
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

            <div className="flex justify-between gap-2">
              <ButtonComponent
                text="Cancelar"
                onClick={handleCancel}
                style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10"
              />
              <ButtonComponent
                text="Guardar cambios"
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
                className={editableStore.banner ? "w-auto h-auto rounded-xl object-cover" : "w-auto h-30 rounded-xl object-cover"}
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
                onClick={handleSave}
                style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
function refreshUser() {
  throw new Error("Function not implemented.");
}

