import { useState, useEffect } from "react";
import axios from "axios";
import ButtonComponent from "../../../../components/ui/ButtonComponent";
import {
  IconEdit,
  IconPhone,
  IconSquareRoundedPlus,
  IconX,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX as IconTwitter,
  IconLink,
  IconBrandWhatsapp,
  IconExclamationCircle,
} from "@tabler/icons-react";
import { uploadImage } from "../../infrastructure/imageService";
import { updateStore } from "../../../seller/infrastructure/storeService";
import { useAuth } from "../../../../hooks/context/AuthContext";

interface SellerProfileProps {
  alert: any;
  setAlert: React.Dispatch<React.SetStateAction<any>>;
}

interface Store {
  id: number;
  name: string;
  description?: string | null;
  banner?: string | null;
  image?: string | null;
  support_phone?: string | null;
  support_email?: string | null;
  registered_address?: string | null;
  is_verified?: boolean | string | null;
}


interface SocialLink {
  type: "instagram" | "x" | "facebook" | "link";
  text: string;
}

const iconMap = {
  instagram: <IconBrandInstagram />,
  x: <IconTwitter />,
  facebook: <IconBrandFacebook />,
  link: <IconLink />,
};

export default function SellerProfile({ setAlert }: SellerProfileProps) {
  const { user, refreshUser } = useAuth();
  const [editableStore, setEditableStore] = useState<Store | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<SocialLink["type"]>("instagram");
  const [newText, setNewText] = useState("");
  const [newLogoFile, setNewLogoFile] = useState<File | null>(null);
  const [newBannerFile, setNewBannerFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.store) {
      setEditableStore({ ...user.store });
    }
  }, [user]);

  useEffect(() => {
    if (user?.store) {
      const storeData = {
        ...user.store,
        is_verified:
          user.store.is_verified === true ||
            user.store.is_verified === "true"
            ? true
            : false,
      };
      setEditableStore(storeData);

      console.log(
        "%c[TukiShop Debug]",
        "color:#ff7e47; font-weight:bold;",
        "Valor de is_verified:",
        storeData.is_verified,
        "| Tipo de dato:",
        typeof storeData.is_verified
      );
    }
  }, [user]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableStore((prev) => (prev ? { ...prev, [name]: value } : prev));
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

  const handleCancel = () => {
    if (user?.store) setEditableStore({ ...user.store });
    setNewBannerFile(null);
    setNewLogoFile(null);
    setSocialLinks([]);
    setAdding(false);
  };

  const addSocialLink = () => {
    if (newText.trim() === "") return;
    setSocialLinks((prev) => [...prev, { type: newType, text: newText }]);
    setNewText("");
    setAdding(false);
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

      if (newLogoFile) {
        const logoUrl = await uploadImage(newLogoFile);
        updatedFields.image = logoUrl;
        if (user) await axios.patch(`/users/${user.id}`, { image: logoUrl });
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
    } catch {
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

  if (!editableStore) return null;



  return (
    <div className="flex flex-col justify-center gap-4 mt-10 font-quicksand">
      {editableStore.is_verified === false && (
        <div className="flex flex-col gap-6 justify-center items-center bg-white rounded-2xl py-10 px-12 ml-10 shadow-lg border border-main/20">
          <div className="flex items-center justify-center w-14 h-14 bg-contrast-secondary/20 rounded-full">
            <IconExclamationCircle size={30} className="text-contrast-secondary" />
          </div>

          <p className="text-xl font-semibold text-main">
            Tu tienda está en verificación
          </p>
          <p className="text-center text-main-dark/70 max-w-md">
            El equipo de TukiShop se pondrá en contacto contigo para verificar tu tienda. Si tienes dudas, contacta con soporte.
          </p>
          <a
            href="https://wa.me/50687355629"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2 bg-contrast-secondary text-white rounded-full hover:scale-105 transition-all duration-300 shadow-sm"
          >
            <IconBrandWhatsapp size={20} />
            Contactar soporte
          </a>
        </div>
      )}
      {editableStore.is_verified === true && (
        <>
          {/* Logo / Banner */}
          <form onSubmit={(e) => e.preventDefault()} className="flex justify-center gap-10 px-10">
            <figure className="flex flex-col gap-10 w-1/3">
              <div className="flex items-center gap-2">
                <p>Logo de tienda</p>
                <label className="bg-contrast-secondary/80 hover:bg-main/80 text-white p-2 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center">
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                  <IconEdit size={22} />
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
                <label className="bg-contrast-secondary/80 hover:bg-main/80 text-white p-2 rounded-full cursor-pointer transition-all duration-200 flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBannerChange}
                    className="hidden"
                  />
                  <IconEdit size={22} />
                </label>

              </div>
              <img
                src={
                  editableStore.banner ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                alt="Banner"
                className="rounded-xl object-cover"
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
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    Correo electrónico
                    <input
                      type="text"
                      placeholder={user?.email || "Correo de la tienda"}
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                      disabled
                    />
                  </label>
                </div>

                <section className="flex gap-10">
                  <div className="w-full">
                    Número telefónico
                    <label className="bg-main-dark/20 rounded-xl px-3 flex items-center gap-2 w-full">
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
                      name="support_email"
                      value={editableStore.support_email || ""}
                      onChange={handleChange}
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                    />
                  </label>
                </section>

                {/* Redes */}
                <section>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 items-center">
                      <h2>Links/Redes sociales</h2>
                      {!adding ? (
                        <button type="button" onClick={() => setAdding(true)}>
                          <IconSquareRoundedPlus className="text-contrast-secondary cursor-pointer" />
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
                          style="text-main-dark flex gap-2 bg-main-dark/20 py-3 px-2 rounded-xl font-semibold"
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
                      className="bg-main-dark/20 rounded-xl px-3 py-2"
                    />
                  </label>
                  <label className="flex flex-col w-full">
                    Dirección de la tienda
                    <textarea
                      name="registered_address"
                      value={editableStore.registered_address || ""}
                      onChange={handleChange}
                      rows={4}
                      className="bg-main-dark/20 rounded-xl px-3 py-2"
                    />
                  </label>
                </div>
              </section>
            </form>

            <div className="flex w-full justify-between">
              <ButtonComponent
                text="Cancelar"
                onClick={handleCancel}
                style="w-[48%] p-3 rounded-full text-white bg-main mt-10 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
              />
              <ButtonComponent
                text={saving ? "Guardando..." : "Guardar cambios"}
                onClick={handleSave}
                style="w-[48%] p-3 rounded-full text-white bg-contrast-secondary mt-10 cursor-pointer hover:scale-105 hover:shadow-lg transition-all duration-300"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
