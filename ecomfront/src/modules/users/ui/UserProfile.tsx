import { useEffect, useState, type JSX } from "react";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import { useAuth } from "../../../hooks/context/AuthContext";
import { getStoreByUser } from "../infrastructure/storeService";

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
  slug: string;
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

export default function UserProfile({ type }: UserProfileProps) {
  const { user, loading } = useAuth();

  const [store, setStore] = useState<Store | null>(null);
  const [editableStore, setEditableStore] = useState<Store | null>(null);
  const [cambiarPassword, setCambiarPassword] = useState(false);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [originalSocialLinks, setOriginalSocialLinks] = useState<SocialLink[]>([]);
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<SocialLink["type"]>("instagram");
  const [newText, setNewText] = useState("");

  useEffect(() => {
    const fetchStore = async () => {
      try {
        if (user?.id) {
          const storeData = await getStoreByUser(user.id);
          setStore(storeData);
          setEditableStore(storeData);
          const linksFromApi: SocialLink[] = [];
          setSocialLinks(linksFromApi);
          setOriginalSocialLinks(linksFromApi);
        }
      } catch (error) {
        console.error("Error al cargar la tienda:", error);
      }
    };
    fetchStore();
  }, [user]);

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

  /*const removeSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };*/

  const handleCancel = () => {
    setEditableStore(store);
    setSocialLinks(originalSocialLinks);
    setCambiarPassword(false);
    setAdding(false);
    setNewText("");
    setNewType("instagram");
  };

  const handleSave = () => {
    console.log("Store a guardar:", editableStore);
    console.log("Social links a guardar:", socialLinks);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setEditableStore((prev) => (prev ? { ...prev, image: previewURL } : prev));
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const previewURL = URL.createObjectURL(file);
    setEditableStore((prev) => (prev ? { ...prev, banner: previewURL } : prev));
  };

  if (loading) return <div>Cargando...</div>;
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER"))
    return <div>No autorizado</div>;

  return (
    <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
      <div className="flex flex-col pl-10">
        <h1 className="text-xl font-quicksand">Información de la cuenta</h1>
      </div>

      {type === "SELLER" && editableStore && (
        <div className="flex w-full flex-col justify-center gap-4 mt-10 font-quicksand">
          <div className="flex justify-center gap-10 px-10">
            {/* Logo */}
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
                src={editableStore.image || ""}
                alt=""
                className="w-2/3 h-auto rounded-xl object-cover"
              />
            </figure>

            {/* Banner */}
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
                src={editableStore.banner || ""}
                alt=""
                className="w-auto h-auto rounded-xl object-cover"
              />
            </figure>
          </div>

          {/* Formulario */}
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
                    {/*Hay que hacer un cambio en el botón para que al volver a clickearlo se muestre de nuevo el formulario y se pueda editar la información en caso de ser necesario */}
                    {socialLinks.map((link, index) => (
                      <ButtonComponent
                        key={index}
                        text={link.text}
                        icon={iconMap[link.type]}
                        style="text-main-dark flex gap-2 bg-main-dark/10 py-3 px-2 rounded-xl font-semibold"
                        iconStyle="text-contrast-secondary" />))}

                    {adding && (
                      <div className="flex gap-2 items-center bg-main-dark/10 py-3 px-2 rounded-xl">
                        <select value={newType} onChange={(e) => setNewType(e.target.value as SocialLink["type"])} className="bg-transparent outline-none" >
                          <option value="instagram">Instagram</option>
                          <option value="x">X</option>
                          <option value="facebook">Facebook</option>
                          <option value="link">Link</option>
                        </select>
                        <input type="text" placeholder="Usuario o link" value={newText} onChange={(e) => setNewText(e.target.value)} className="bg-transparent outline-none flex-1" />
                        <button type="button" onClick={addSocialLink} className="text-contrast-secondary font-semibold" >
                          Guardar
                        </button>
                      </div>)}
                  </div>
                </div>
              </section>

              {/* Teléfono */}
              <section>
                <div className="w-1/2">
                  Número telefónico
                  <label className="bg-main-dark/10 rounded-xl px-3 flex items-center gap-2">
                    <IconPhone className="text-contrast-secondary" />
                    <input
                      name="support_phone"
                      type="text"
                      value={editableStore.support_phone || ""}
                      onChange={handleChange}
                      placeholder="Número telefónico"
                      className="w-full h-full py-2 focus:outline-none"
                    />
                  </label>
                </div>
              </section>

              {/* Contraseña */}
              <label className="flex items-center gap-2 pt-2">
                Cambiar contraseña
                <input
                  type="checkbox"
                  checked={cambiarPassword}
                  onChange={() => setCambiarPassword(!cambiarPassword)}
                />
              </label>

              {cambiarPassword && (<div className="flex flex-col gap-5">
                <input type="password" placeholder="Contraseña actual" className="bg-main-dark/20 rounded-xl px-3 py-2 w-[50%]" />
                <div className="flex gap-2">
                  <input type="password" placeholder="Nueva contraseña" className="bg-main-dark/20 rounded-xl px-3 py-2 w-full" />
                  <input type="password" placeholder="Confirmar contraseña" className="bg-main-dark/20 rounded-xl px-3 py-2 w-full" />
                </div>
              </div>)}
            </form>

            {/* Botones finales */}
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
    </div>
  );
}
