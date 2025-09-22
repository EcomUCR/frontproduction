import { Link, useNavigate } from "react-router-dom";
import LandingHeader from "../ui/NavBarAdmin";
import logo from "../../img/logoT.png"; 
import { useState } from 'react';

export default function RegisterPage({
  onCreated,
}: {
  onCreated?: () => void;
}) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validations
    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          first_name: form.firstName,
          last_name: form.lastName,
          username: form.lastName,
          email: form.email,
          password: form.password,
          type: "client",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Cliente creado", data);

        // Reset form
        setForm({
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
        });

        if (onCreated) onCreated();
        navigate("/");
      } else {
        let data = {};
        try {
          data = await res.json();
        } catch {}
        setError((data as any).error || "Error al crear cliente");
      }
    } catch (err) {
      setError("Error de conexión con el backend");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <LandingHeader />
      <div className="flex flex-1">
        {/* Left panel */}
        <div className="hidden lg:flex w-1/3 bg-[#5C2E92] items-center justify-center p-8 relative rounded-r-[5rem]">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center">
            <Link to="/login">
              <button className="text-xl font-bold text-white mb-8">
                Iniciar Sesión
              </button>
            </Link>
            <button className="text-xl font-bold text-[#5C2E92] bg-white rounded-full py-2 px-8 shadow-lg">
              Registrarse
            </button>
          </div>
        </div>

        {/* Right panel */}
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
              <div>
                <label
                  className="block text-blue-main mb-2"
                  htmlFor="firstName"
                >
                  Nombre
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-blue-main focus:outline-none focus:border-[#5C2E92]"
                  id="firstName"
                  type="text"
                  value={form.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-blue-main mb-2" htmlFor="lastName">
                  Apellido
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                  id="lastName"
                  type="text"
                  value={form.lastName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-blue-main mb-2" htmlFor="username">
                  Nombre de usuario
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                  id="username"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-600 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-gray-600 mb-2" htmlFor="password">
                  Contraseña
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                  id="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  className="block text-gray-600 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirmar contraseña
                </label>
                <input
                  className="w-full px-3 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-[#5C2E92]"
                  id="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {error && <p className="text-red-500 mt-4">{error}</p>}

            {/* Seller option */}
            <div className="flex items-center justify-center mt-6">
              <Link
                to="/register-seller"
                className="text-blue-main font-semibold hover:underline"
              >
                ¿Quieres ser vendedor?
              </Link>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-center mt-6">
              <button
                className="w-full md:w-1/2 bg-[#5C2E92] text-white font-bold py-3 px-4 rounded-full shadow-md"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear cliente"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
