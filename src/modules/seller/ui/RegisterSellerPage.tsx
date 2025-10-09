import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/context/AuthContext";
import useRegister from "../../auth/infrastructure/useRegister";
import NavBar from "../../../components/layout/NavBar";
import Footer from "../../../components/layout/Footer";
import logo from "../../../img/logoT.png";

export default function RegisterSellerPage() {
  const { register, loading: registering, error } = useRegister();
  const { login } = useAuth();
  const navigate = useNavigate();

  // Estados para los campos del form (usa username)
  const [form, setForm] = useState({
    username: "",
    phone_number: "",
    email: "",
    password: "",
    password_confirmation: "",
    // Agrega otros campos si el backend los espera (first_name etc)
  });
  const [registerError, setRegisterError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError(null);
    try {
      await register({
        username: form.username, // nombre de usuario/tienda (requerido en backend)
        email: form.email,
        password: form.password,
        phone_number: form.phone_number,
        role: "SELLER", // campo que define el rol en backend
      });

      // Loguea y redirige:
      const loginSuccess = await login(form.email, form.password);
      if (loginSuccess) {
        navigate("/"); // Cambia la ruta a la deseada tras registro
      }
    } catch (err: any) {
      setRegisterError(
        err.response?.data?.message || "Error al registrar usuario"
      );
    }
  };

  return (
    <div>
      <NavBar />
      <section className="flex justify-center items-center">
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] gap-4">
          <p className="text-contrast-secondary bg-white font-semibold py-2 px-4 rounded-full transition">
            Registrar tienda
          </p>
        </div>
        {/* Panel derecha/formulario */}
        <div className="flex flex-col items-center justify-center h-[90vh] w-[65%]">
          {/* Logo y Marca */}
          <img className="h-20" src={logo} alt="TucaShop" />
          <p className="font-fugaz text-2xl mb-4">TucaShop</p>
          <div className="flex flex-col w-full items-center space-y-5 mt-10 px-30">
            <form
              className="flex flex-col items-center w-full space-y-5"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-center gap-5 w-full">
                <input
                  name="username"
                  className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                  placeholder="Nombre de usuario o tienda"
                  type="text"
                  value={form.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
                <input
                  name="phone_number"
                  className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                  placeholder="Teléfono"
                  type="tel"
                  value={form.phone_number}
                  onChange={(e) => {
                    // Elimina todo excepto números
                    let value = e.target.value.replace(/\D/g, "");

                    // Limita a 8 dígitos (puedes ajustar según país)
                    if (value.length > 8) value = value.slice(0, 8);

                    // Formato tipo Costa Rica: 8888 8888
                    let formatted = value;
                    if (value.length > 4) {
                      formatted = `${value.slice(0, 4)} ${value.slice(4)}`;
                    }

                    setForm({ ...form, phone_number: formatted });
                  }}
                  maxLength={9} // incluye el espacio
                  required
                  autoComplete="tel"
                />


              </div>
              <div className="flex flex-col space-y-5 w-full items-center">
                <input
                  name="email"
                  className="border-2 border-main text-main rounded-full px-4 py-3 w-[93%] font-quicksand"
                  placeholder="Correo electrónico"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div className="flex justify-center gap-5 w-full">
                <input
                  name="password"
                  className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                  placeholder="Contraseña"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
                <input
                  name="password_confirmation"
                  className="border-2 border-main text-main rounded-full px-4 py-3 w-[45%] font-quicksand"
                  placeholder="Confirmar contraseña"
                  type="password"
                  value={form.password_confirmation}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>
              {/* Mensajes de error */}
              {(registerError || error) && (
                <div className="text-red-500 text-sm text-center">
                  {registerError || error}
                </div>
              )}
              <button
                type="submit"
                disabled={registering}
                className={`bg-main text-white rounded-full py-3 px-4 w-[50%] font-quicksand ${registering ? "opacity-60" : ""
                  }`}
              >
                {registering ? "Creando cuenta..." : "Crear cuenta"}
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
