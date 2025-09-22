import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingHeader from '../ui/NavBarAdmin';

const ChangePasswordPage = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  if (!userId) {
    // Si no hay usuario logueado, redirige a login
    navigate("/login");
    return null;
  }

  const handleUpdatePassword = async () => {
    setMessage("");

    if (password !== passwordConfirm) {
      setMessage("Las contraseñas no coinciden");
      return;
    }

    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Contraseña actualizada ✅");
        // Opcional: limpiar inputs
        navigate("/profile");
        setPassword("");
        setPasswordConfirm("");
      } else {
        setMessage("Error: " + (data.message || "No se pudo actualizar"));
      }
    } catch (err) {
      setMessage("Error de conexión");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#2AC0E5] animate-fade-in">
      <LandingHeader />
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="bg-[#4A90E2] w-full max-w-lg p-10 rounded-[2rem] text-center shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">Actualizar Contraseña</h2>
          <p className="text-white mb-8">Escribe tu nueva contraseña</p>

          <div className="mb-6">
            <input
              className="w-full px-4 py-3 bg-transparent border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-opacity-75 transition-colors"
              type="password"
              placeholder="Nueva Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-8">
            <input
              className="w-full px-4 py-3 bg-transparent border-b-2 border-white text-white placeholder-white focus:outline-none focus:border-opacity-75 transition-colors"
              type="password"
              placeholder="Confirmar Contraseña"
              value={passwordConfirm}
              onChange={e => setPasswordConfirm(e.target.value)}
            />
          </div>

          {message && <p className="mb-6 text-white">{message}</p>}

          <div className="flex justify-center space-x-4">
            <button
              onClick={() => navigate("/profile")}
              className="bg-white text-gray-800 font-bold py-3 px-8 rounded-full shadow-md hover:bg-gray-200 transition"
            >
              Cancelar
            </button>

            <button
              onClick={handleUpdatePassword}
              className="bg-[#5C2E92] text-white font-bold py-3 px-8 rounded-full shadow-md hover:bg-purple-800 transition"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;
