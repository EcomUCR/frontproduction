import { useEffect, useState } from "react";
import { Button } from "./button";

// Assets
import bannerImage from "../../img/banner.png";
import logo from "../../img/unstable-games-logo.png";
import pencilIcon from "../../img/editIcon.png";
import insta from "../../img/InstaIcon.png";
import face from "../../img/FacebookIcon.png";
import xIcon from "../../img/XIcon.png";
import linkIcon from "../../img/linkIcon.png";

const ProfileSellerForm = () => {
  const [vendor, setVendor] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  // 🔹 Traer datos del vendor
  useEffect(() => {
    const token = localStorage.getItem("token");
    const vendorId = localStorage.getItem("vendorId");

    if (!vendorId) {
      console.error("No se encontró vendorId en localStorage");
      setLoading(false);
      return;
    }

    fetch(`api/vendors/${vendorId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Error al cargar vendor");
        return res.json();
      })
      .then((data) => {
        setVendor(data);

        // 🔹 Mapear redes sociales por tipo
        const socials: any = {};
        data.social_media?.forEach((sm: any) => {
          socials[sm.type.toLowerCase()] = sm.url;
        });

        setForm({
          name: data?.name || "",
          email: data?.user?.email || "",
          address: data?.address || "",
          description: data?.description || "",
          phone: data?.phone_number || "",
          social: {
            instagram: socials.instagram || "",
            facebook: socials.facebook || "",
            x: socials.x || "",
            linkedin: socials.linkedin || "",
          },
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || !form) {
    return <div className="p-6">Cargando...</div>;
  }

  // 🔹 Manejo de inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    if (name.startsWith("social.")) {
      const key = name.split(".")[1];
      setForm((prev: any) => ({
        ...prev,
        social: { ...prev.social, [key]: value },
      }));
    } else {
      setForm((prev: any) => ({ ...prev, [name]: value }));
    }
  };

  // 🔹 Guardar cambios
  const handleSave = async () => {
    try {
      setSaving(true);
      const token = localStorage.getItem("token");

      const res = await fetch(
        `api/vendors/${vendor.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            address: form.address,
            description: form.description,
            phone_number: form.phone,
            // ⚠️ redes sociales deberían manejarse en otro endpoint
          }),
        }
      );

      if (!res.ok) throw new Error("Error al guardar cambios");

      const updated = await res.json();
      setVendor(updated);
      alert("✅ Datos guardados correctamente");
    } catch (err) {
      console.error(err);
      alert("❌ Ocurrió un error al guardar");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="p-6 flex-1">
      <h2 className="text-xl font-bold mb-6 text-gray-800">
        Información de la cuenta
      </h2>

      {/* Fotos */}
      <div className="flex justify-between mb-6">
        <div className="flex flex-col items-center">
          <h3 className="text-gray-600 font-semibold mb-2">Foto de perfil</h3>
          <img
            src={vendor?.logo || logo}
            alt="Logo"
            className="w-40 h-auto object-contain"
          />
          <div className="w-full flex justify-end mt-1">
            <img
              src={pencilIcon}
              alt="Editar logo"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col items-center">
          <h3 className="text-gray-600 font-semibold mb-2">Banner del perfil</h3>
          <img
            src={vendor?.banner_image || bannerImage}
            alt="Banner"
            className="w-64 h-auto object-contain"
          />
          <div className="w-full flex justify-end mt-1">
            <img
              src={pencilIcon}
              alt="Editar banner"
              className="w-5 h-5 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-200 text-black rounded-md border-none"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Correo
          </label>
          <input
            type="email"
            className="w-full p-2 bg-gray-200 text-black rounded-md border-none"
            name="email"
            value={form.email}
            readOnly
          />
        </div>

        <div>
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Dirección
          </label>
          <input
            type="text"
            className="w-full p-2 h-20 bg-gray-200 text-black rounded-md border-none"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="block text-gray-500 text-sm font-bold mb-2">
            Descripción
          </label>
          <textarea
            className="w-full p-2 h-20 bg-gray-200 text-black rounded-md border-none"
            name="description"
            value={form.description}
            onChange={handleChange}
          ></textarea>
        </div>

        {/* Redes sociales */}
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Social Media
          </label>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-center bg-gray-200 rounded-md px-2 h-12">
              <img src={insta} alt="Instagram" className="w-5 h-5 mr-5" />
              <input
                type="text"
                className="flex-1 bg-gray-200 text-black border-none focus:outline-none text-center px-2"
                name="social.instagram"
                value={form.social.instagram}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center bg-gray-200 rounded-md px-2 h-12">
              <img src={face} alt="Facebook" className="w-5 h-5 mr-5" />
              <input
                type="text"
                className="flex-1 bg-gray-200 text-black border-none focus:outline-none text-center px-2"
                name="social.facebook"
                value={form.social.facebook}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center bg-gray-200 rounded-md px-2 h-12">
              <img src={xIcon} alt="X" className="w-5 h-5 mr-5" />
              <input
                type="text"
                className="flex-1 bg-gray-200 text-black border-none focus:outline-none text-center px-2"
                name="social.x"
                value={form.social.x}
                onChange={handleChange}
              />
            </div>

            <div className="flex items-center bg-gray-200 rounded-md px-2 h-12">
              <img src={linkIcon} alt="LinkedIn" className="w-5 h-5 mr-5" />
              <input
                type="text"
                className="flex-1 bg-gray-200 text-black border-none focus:outline-none text-center px-2"
                name="social.linkedin"
                value={form.social.linkedin}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Teléfono
          </label>
          <input
            type="text"
            className="w-full p-2 bg-gray-200 text-black rounded-md border-none"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Botón Guardar */}
      <div className="mt-10 flex justify-start">
        <Button
          className="px-10 py-2 bg-purple-main text-white rounded-lg"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? "Guardando..." : "Guardar"}
        </Button>
      </div>
    </div>
  );
};

export default ProfileSellerForm;
