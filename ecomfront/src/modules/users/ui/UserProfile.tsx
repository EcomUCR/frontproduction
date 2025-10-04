import { useState } from "react";
import ButtonComponent from "../../../components/ui/ButtonComponent";
import foto from "../../../img/perfil.png";
import logo from "../../../img/unstable-games-logo.png";
import banner from "../../../img/banner.png";
import type { UserData } from "../../../hooks/useUser";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
  IconEdit,
  IconLink,
  IconPhone,
  IconSquareRoundedPlus,
} from "@tabler/icons-react";

// type es sólo de layout, el backend usa roles reales
interface UserProfileProps {
  type: "SELLER" | "CUSTOMER";
  user: UserData;
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

export default function UserProfile({ type, user }: UserProfileProps) {
  const [cambiarPassword, setCambiarPassword] = useState(false);

  // Social links sólo de ejemplo;
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [adding, setAdding] = useState(false);
  const [newType, setNewType] = useState<SocialLink["type"]>("instagram");
  const [newText, setNewText] = useState("");

  const addSocialLink = () => {
    if (newText.trim() === "") return;
    setSocialLinks([...socialLinks, { type: newType, text: newText }]);
    setNewText("");
    setNewType("instagram");
    setAdding(false);
  };

  return (
    <div className="mx-10 border-l-2 border-main-dark/20 pl-4">
      <div className="flex flex-col pl-10">
        <h1 className="text-2xl font-quicksand font-semibold">
          Información de la cuenta
        </h1>
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
                  value={user.first_name || ""} // Mostramos el nombre real, o vacío si no hay
                  placeholder="Nombre"
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                  readOnly // puedes hacerlo editable si quieres permitir edición
                />
                <input
                  type="text"
                  value={user.email}
                  placeholder="Correo"
                  className="bg-main-dark/20 rounded-xl px-3 py-2 w-full"
                  readOnly // obligatorio para no editar el correo
                  disabled
                />
              </div>

              <input
                type="text"
                value={user.username || ""} // Usuario real
                placeholder="Nombre de usuario"
                className="bg-main-dark/20 rounded-xl px-3 py-2 w-[50%]"
                readOnly // si no se permite editar el username
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
              <ButtonComponent
                text="Cancelar"
                style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10"
              />
              <ButtonComponent
                text="Guardar cambios"
                style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10"
              />
            </div>
          </div>
        </div>
      )}
      {type === "SELLER" && (
        // Aquí layout para SELLERS
        <div className="flex w-full flex-col justify-center gap-4 mt-10 font-quicksand">
          <div className="flex justify-center gap-10 px-10">
            <figure className="flex flex-col gap-10 w-1/3">
              <div className="flex items-center gap-2">
                <p>Logo de tienda</p>
                <ButtonComponent
                  icon={<IconEdit />}
                  iconStyle="text-contrast-secondary"
                />
              </div>
              <img src={logo} alt="" className="w-2/3 h-auto" />
            </figure>
            <figure className="flex flex-col gap-10 w-2/3">
              <div className="flex items-center gap-2">
                <p>Banner de la tienda</p>
                <ButtonComponent
                  icon={<IconEdit />}
                  iconStyle="text-contrast-secondary"
                />
              </div>
              <img src={banner} alt="" className="w-auto h-auto rounded-xl" />
            </figure>
          </div>

          <div className="w-full px-10">
            <form className="flex flex-col gap-5 pt-10">
              <section className="flex flex-col gap-10">
                <div className="flex gap-10">
                  <label htmlFor="" className="flex flex-col w-full">
                    Nombre de la tienda
                    <textarea
                      rows={2}
                      placeholder="Nombre de la tienda"
                      className="bg-main-dark/10 rounded-xl px-3 py-2 w-full font-semibold"
                    />
                  </label>
                  <label htmlFor="" className="flex flex-col w-full">
                    Correo electrónico
                    <input
                      type="text"
                      placeholder="Correo"
                      className="bg-main-dark/10 rounded-xl px-3 py-2 w-full"
                      disabled
                    />
                  </label>
                </div>
                <div className="flex gap-10">
                  <label htmlFor="" className="flex flex-col w-full">
                    Descripción de la tienda
                    <textarea
                      placeholder="Descripción de la tienda"
                      rows={4}
                      className="bg-main-dark/10 rounded-xl px-3 py-2"
                    />
                  </label>
                  <label htmlFor="" className="flex flex-col w-full">
                    Dirección de la tienda
                    <textarea
                      placeholder="Dirección de la tienda"
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
                    <button type="button" onClick={() => setAdding(true)}>
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
                      <div className="flex gap-1 items-center bg-main-dark/10 py-3 px-2 rounded-xl">
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
                          className="bg-transparent outline-none w-full"
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
                  <label
                    htmlFor=""
                    className="bg-main-dark/10 rounded-xl px-3 flex items-center gap-2"
                  >
                    <IconPhone className="text-contrast-secondary" />
                    <input
                      type="text"
                      placeholder="+506 8888-8888"
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
              <ButtonComponent
                text="Cancelar"
                style="w-full p-3 rounded-full text-white bg-main gap-2 flex items-center justify-center mt-10"
              />
              <ButtonComponent
                text="Guardar cambios"
                style="w-full p-3 rounded-full text-white bg-contrast-secondary gap-2 flex items-center justify-center mt-10"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
