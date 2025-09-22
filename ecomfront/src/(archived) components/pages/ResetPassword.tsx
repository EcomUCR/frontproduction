import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ButtonComponent from "../ui/ButtonComponent";
import logo from "../../img/tucaShopLogo.png";
import left from "../../img/leftR.png";
import right from "../../img/rightR.png";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (password !== passwordConfirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          email,
          password,
          password_confirmation: passwordConfirm,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message || "Contraseña actualizada correctamente");
        if (data.redirect) {
          window.location.href = data.redirect; // redirige al login
        }
      } else {
        const data = await res.json();
        alert(data.message || "Error al actualizar la contraseña");
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <img
        src={left}
        alt="Left background"
        className="absolute top-0 left-0 h-full w-auto"
      />
      <img
        src={right}
        alt="Right background"
        className="absolute top-0 right-0 h-full w-auto"
      />

      <div className="relative z-10 flex flex-col items-center p-8 w-full max-w-md bg-transparent">
        <img src={logo} alt="TucaShop Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-3xl font-bold mb-8">TucaShop</h1>

        <div className="mb-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nueva contraseña
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-3 bg-gray-300 w-full"
          />
        </div>

        <div className="mb-4 w-full">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Confirmar contraseña
          </label>
          <input
            type="password"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            className="px-4 py-3 bg-gray-300 w-full"
          />
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <div className="w-full">
          <ButtonComponent
            text="Actualizar contraseña"
            onClick={handleSubmit}
            style="w-full bg-blue-main text-black py-3 px-6 font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
