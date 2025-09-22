import { Link, useNavigate } from "react-router-dom";
import LandingHeader from "../ui/NavBarAdmin";
import logo from "../../img/logoT.png";
import { useState } from "react";

export default function RegisterSellerPage({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    name: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.email || !form.password || !form.name || !form.phoneNumber) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          name: form.name,
          phone_number: form.phoneNumber,
          type: "vendor",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Vendedor creado", data);

        setForm({ email: "", password: "", name: "", phoneNumber: "" });
        if (onCreated) onCreated();
        navigate("/");
      } else {
        let data: { error?: string } = {};
        try {
          data = await res.json();
        } catch {}
        setError(data.error ?? "Error al crear vendedor");
        console.error("Error al crear vendedor", data);
      }
    } catch (err) {
      setError("Error de conexión con el backend");
      console.error("Error de conexión", err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <LandingHeader />
      <div className="flex flex-1">
        <div className="hidden lg:flex w-1/3 bg-purple-main items-center justify-center p-8 relative rounded-r-[5rem]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <Link to="/login">
              <button className="text-xl font-bold text-white mb-8">
                Iniciar Sesión
              </button>
            </Link>
            <button className="text-xl font-bold text-purple-main bg-white rounded-full py-2 px-8 ">
              Registrarse
            </button>
          </div>
        </div>

        <div className="w-full lg:w-2/3 bg-white flex flex-col items-center justify-center p-8">
          <div className="flex flex-col items-center mb-12">
            <img
              src={logo}
              alt="Logo"
              className="w-40 h-40 object-contain mb-4"
            />
            <h1 className="text-4xl font-bold">TucaShop</h1>
          </div>

          <form className="w-full max-w-2xl" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="md:col-span-2">
                <label className="block text-blue-main mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-blue-main focus:outline-none "
                  id="email"
                  name="email"
                  type="email"
                  placeholder=" "
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-blue-main mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-blue-main focus:outline-none"
                  id="password"
                  name="password"
                  type="password"
                  placeholder=" "
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-blue-main mb-2" htmlFor="name">
                  Nombre
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-blue-main focus:outline-none"
                  id="name"
                  name="name"
                  type="text"
                  placeholder=" "
                  value={form.name}
                  onChange={handleChange}
                />
              </div>
              <div className="md:col-span-2">
                <label
                  className="block text-blue-main mb-2"
                  htmlFor="phoneNumber"
                >
                  Número de teléfono
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-blue-main "
                  id="phoneNumber"
                  name="phoneNumber"
                  type="text"
                  placeholder=" "
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            <div className="flex items-center justify-center mt-12">
              <button
                className="w-full md:w-1/2 bg-[#5C2E92] text-white font-bold py-3 px-4 rounded-full "
                type="submit"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear vendedor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
