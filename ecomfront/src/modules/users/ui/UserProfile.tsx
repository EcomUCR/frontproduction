import { useEffect, useState } from "react";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import { useAuth } from "../../../hooks/context/AuthContext";
import { getStoreByUser } from "../infrastructure/storeService";

import foto from "../../../img/perfil.png";

import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconEdit,
  IconLink,
  IconPhone,
  IconSquareRoundedPlus
} from "@tabler/icons-react";

interface UserProfileProps {
  type: "CUSTOMER" | "SELLER" | "ADMIN" | null | undefined; // tipo de usuario
}

interface SocialLink {
  type: "instagram" | "x" | "facebook" | "link";
  text: string;
}

const iconMap = {
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
  const [cambiarPassword, setCambiarPassword] = useState(false);
  const { user, loading } = useAuth();
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        if (user?.id) {
          const storeData = await getStoreByUser(user.id);
          console.log("Tienda obtenida:", storeData);
          setStore(storeData);
        }
      } catch (error) {
        console.error("Error al cargar la tienda:", error);
      }
    };
    fetchStore();
  }, [user]);


  // Si está cargando, muestra loader
  if (loading) return <div>Cargando...</div>;

  // Si no hay usuario autenticado o su rol no es válido
  if (!user || (user.role !== "SELLER" && user.role !== "CUSTOMER")) {
    return <div>No autorizado</div>;
  }

  // Estado para redes sociales dinámicas
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    //Esto debe llenarse con los datos de la base de datos
  ]);
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<SocialLink["type"]>("instagram");
  const [newText, setNewText] = useState("");

  const addSocialLink = () => {
    if (newText.trim() === "") return; // Esto es para que no pueda ser vacío
    setSocialLinks([...socialLinks, { type: newType, text: newText }]);
    setNewText("");
    setNewType("instagram");
    setAdding(false);
  };

  return (
    <div className="mx-10  border-l-2 border-main-dark/20 pl-4">
      <div className="flex flex-col pl-10">
        <h1 className="text-xl font-quicksand">Información de la cuenta</h1>
      </div>

      {type === "CUSTOMER" && (
        <div className="flex w-full flex-col justify-center gap-4 mt-10">
          <div className="flex justify-center">
            <img src={foto} alt="" className="w-auto h-80 rounded-full" />
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
                    placeholder="Contraseña actual"
                    className="bg-main-dark/20 rounded-xl px-3 py-2 w-[50%]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar contraseña"
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                    />
                  </div>
                </div>
              )}
            </form>
            <div className="flex justify-between gap-2">
              <ButtonComponent text="Cancelar" style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10" />
              <ButtonComponent text="Guardar cambios" style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10" />
            </div>
          </div>
        </div>
      )}

      {type === "SELLER" && (
        <div className="flex w-full flex-col justify-center gap-4 mt-10 font-quicksand">
          <div className="flex justify-center gap-10 px-10">
            <figure className="flex flex-col gap-10 w-1/3">
              <div className="flex items-center gap-2">
                <p>Logo de tienda</p>

                <ButtonComponent icon={<IconEdit />} iconStyle="text-contrast-secondary" />

              </div>
              <img src={store?.image || ""} alt="" className="w-2/3 h-auto" />
            </figure>
            <figure className="flex flex-col gap-10 w-2/3">
              <div className="flex items-center gap-2">
                <p>Banner de la tienda</p>
                <ButtonComponent icon={<IconEdit />} iconStyle="text-contrast-secondary" />
              </div>
              <img src={store?.banner || ""} alt="" className="w-auto h-auto rounded-xl" />
            </figure>
          </div>
          <div className="w-full px-10">
            <form className="flex flex-col gap-5 pt-10">
              <section className="flex flex-col gap-10">
                <div className="flex gap-10">
                  <label htmlFor="" className="flex flex-col w-full">
                    Nombre de la tienda
                    <textarea
                      onChange={(e) => setStoreName(e.target.value)}
                      value={store?.name || ""}
                      rows={2}
                      placeholder={store?.name || "Nombre de la tienda"}
                      className="bg-main-dark/10 rounded-xl px-3 py-2 w-full "
                    />
                  </label>
                  <label htmlFor="" className="flex flex-col w-full">
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
                  <label htmlFor="" className="flex flex-col w-full">
                    Descripción de la tienda
                    <textarea
                      placeholder={store?.description || "Descripción de la tienda"}
                      rows={4}
                      className="bg-main-dark/10 rounded-xl px-3 py-2"
                    />
                  </label>
                  <label htmlFor="" className="flex flex-col w-full">
                    Dirección de la tienda
                    <textarea
                      placeholder={ /*store?.address ||*/ "Dirección no en el BACKEND aún"} //TODO: Agregar la dirección de la tienda----------------
                      rows={4}
                      className="bg-main-dark/10 rounded-xl px-3 py-2"
                    />
                  </label>
                </div>
              </section>

              <section>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2 items-center">
                    <h2>Links/Redes sociales</h2>
                    <button
                      type="button"
                      onClick={() => setAdding(true)}
                    >
                      <IconSquareRoundedPlus className="text-contrast-secondary" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                    {/*Hay que hacer un cambio en el botón para que al volver a clickearlo se muestre de nuevo el
                                        formulario y se pueda editar la información en caso de ser necesario */}
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
                          onChange={(e) => setNewType(e.target.value as SocialLink["type"])}
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

              <section>
                <div className="w-1/2">
                  Número telefónico
                  <label htmlFor="" className="bg-main-dark/10 rounded-xl px-3 flex items-center gap-2">
                    <IconPhone className="text-contrast-secondary" />
                    <input
                      type="text"
                      placeholder={store?.support_phone || "Número telefónico"}
                      className="w-full h-full py-2 focus:outline-none"
                    />
                  </label>
                </div>
              </section>

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
                    placeholder="Contraseña actual"
                    className="bg-main-dark/20 rounded-xl px-3 py-2 w-[50%]"
                  />
                  <div className="flex gap-2">
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar contraseña"
                      className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                    />
                  </div>
                </div>
              )}
            </form>

            <div className="flex justify-between gap-2">
              <ButtonComponent text="Cancelar" style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10" />
              <ButtonComponent text="Guardar cambios" style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
