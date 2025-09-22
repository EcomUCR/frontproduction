import { useState } from "react";
import ButtonComponent from "../ui/ButtonComponent";
import logo from "../../img/tucaShopLogo.png";
import left from "../../img/leftF.png";
import right from "../../img/rightF.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setMessage("");

    if (!email) {
      setError("Por favor ingresa un correo electrónico");
      return;
    }

    try {
      const res = await fetch("/api/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessage(data.message || "Correo de recuperación enviado");
      } else {
        const data = await res.json();
        setError(data.error || "No se pudo enviar el correo");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      <img src={left} alt="Left background" className="absolute top-0 left-0 h-full w-auto" />
      <img src={right} alt="Right background" className="absolute top-0 right-0 h-full w-auto" />

      <div className="relative z-10 flex flex-col items-center p-8 w-full max-w-md bg-transparent">
        <img src={logo} alt="TucaShop Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-3xl font-bold mb-8">TucaShop</h1>

        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Correo electrónico
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-3 bg-gray-300 w-full"
          />
        </div>

        <div className="text-center text-yellow-main text-sm mb-6">
          Ingresa un correo válido para recibir el enlace de recuperación.
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <div className="w-full">
          <ButtonComponent
            text="Enviar correo de recuperación"
            onClick={handleSubmit}
            style="w-full bg-blue-main text-black py-3 px-6 font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
