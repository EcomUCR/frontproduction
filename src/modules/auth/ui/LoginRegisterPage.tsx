import { useState } from "react";
import Footer from "../../../components/layout/Footer";
import NavBar from "../../../components/layout/NavBar";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";

export default function LoginRegisterPage() {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <div className="min-h-screen flex flex-col font-quicksand">
      <NavBar />

      {/* SECCIÓN PRINCIPAL */}
      <section className="flex flex-grow justify-center items-center relative">
        {/* 🌈 PANEL IZQUIERDO (solo visible en escritorio) */}
        <div className="hidden md:flex justify-end items-center bg-gradient-to-br from-contrast-main via-contrast-secondary to-main h-[90vh] w-[35%] relative">
          {/* Lista de botones pegada al borde derecho del gradiente */}
          <ul className="flex flex-col items-end pr-10 gap-20 relative">
            {/* Fondo animado del selector */}
            <div
              className={`bg-white absolute right-0 z-0 h-30 w-55 rounded-l-full transform transition-all duration-300 ${
                view === "login" ? "-top-6" : "translate-y-30"
              }`}
            >
              <div className="-rotate-90 absolute w-10 h-10 -top-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]" />
              </div>
              <div className="-rotate-180 absolute w-10 h-10 -bottom-6 -right-4 bg-transparent flex items-center justify-center rounded-2xl">
                <div className="absolute w-full h-full border-l-[1rem] border-b-[1rem] border-white rounded-bl-[6rem]" />
              </div>
            </div>

            {/* Botones */}
            <li className="relative flex items-center">
              <button
                className={`z-10 text-xl font-semibold py-5 rounded-full transition ${
                  view === "login"
                    ? "text-contrast-secondary"
                    : "text-white hover:text-gray-200"
                }`}
                onClick={() => setView("login")}
              >
                Iniciar sesión
              </button>
            </li>

            <li className="relative flex items-center">
              <button
                className={`z-10 text-xl font-semibold py-5 rounded-full transition ${
                  view === "register"
                    ? "text-contrast-secondary"
                    : "text-white hover:text-gray-200"
                }`}
                onClick={() => setView("register")}
              >
                Registrarse
              </button>
            </li>
          </ul>
        </div>

        {/* 📱 PANEL MÓVIL (fondo gradiente) */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-br from-contrast-main via-contrast-secondary to-main" />

        {/* PANEL DERECHO / FORMULARIO */}
        <div
          className={`
            flex flex-col items-center justify-center 
            h-[90vh] w-full md:w-[65%] px-6 sm:px-16 md:px-40 
            bg-white md:bg-white relative
          `}
        >
          {/* 📱 Contenedor glass para móvil */}
          <div className="md:hidden w-[90%] max-w-md rounded-3xl backdrop-blur-lg bg-white/10 border border-white/30 shadow-lg p-6 flex flex-col items-center">
            {/* 🔶 Botones de cambio (más visibles) */}
            <div className="flex justify-center gap-5 mb-8">
              <button
                onClick={() => setView("login")}
                className={`px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 ${
                  view === "login"
                    ? "bg-contrast-main shadow-lg"
                    : "bg-contrast-main/60 hover:bg-contrast-main"
                }`}
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => setView("register")}
                className={`px-5 py-2 rounded-full text-sm font-semibold text-white transition-all duration-300 ${
                  view === "register"
                    ? "bg-contrast-main shadow-lg"
                    : "bg-contrast-main/60 hover:bg-contrast-main"
                }`}
              >
                Registrarse
              </button>
            </div>

            {/* Formularios móviles */}
            <div className="w-full">
              {view === "login" ? (
                <LoginForm />
              ) : (
                <RegisterForm onRegisterSuccess={() => setView("login")} />
              )}
            </div>
          </div>

          {/* 💻 Formularios escritorio (idénticos al diseño original) */}
          <div className="hidden md:flex flex-col items-center justify-center w-full h-full">
            {view === "login" ? (
              <LoginForm />
            ) : (
              <RegisterForm onRegisterSuccess={() => setView("login")} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
