import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandX,
} from "@tabler/icons-react";
import logo from "../../img/TukiLogo.png";
import useContactForm from "../../hooks/useContactForm";

export default function Footer() {
  const { fields, handleChange, handleSubmit, loading, sent, error } =
    useContactForm();

  return (
    <footer className="bg-main text-white font-quicksand px-6 sm:px-10 py-10 flex flex-col items-center space-y-10">
      {/* 🔹 Contenido principal (3 columnas en escritorio, vertical en móvil) */}
      <div className="flex flex-col sm:flex-row sm:justify-between w-full max-w-[90rem] gap-10">
        {/* 🔸 Enlaces rápidos */}
        <div className="flex flex-col sm:w-1/3 items-center sm:items-start space-y-6">
          <div className="flex flex-wrap justify-center sm:justify-start gap-10 text-sm font-light">
            <ul className="space-y-3 text-center sm:text-left">
              <li><a href="/search?mode=offers" className="hover:text-contrast-main transition-colors">Ofertas</a></li>
              <li><a href="/search/stores" className="hover:text-contrast-main transition-colors">Tiendas</a></li>
              <li><a href="/search?mode=explore" className="hover:text-contrast-main transition-colors">Explorar</a></li>
            </ul>
            <ul className="space-y-3 text-center sm:text-left">
              <li><a href="/about" className="hover:text-contrast-main transition-colors">Conócenos</a></li>
              <li><a href="/beSellerPage" className="hover:text-contrast-main transition-colors">Vender</a></li>
              <li><a href="/search?mode=best-sellers" className="hover:text-contrast-main transition-colors">Lo más vendido</a></li>
            </ul>
            <ul className="space-y-3 text-center sm:text-left">
              <li><a href="/help" className="hover:text-contrast-main transition-colors">Ayuda</a></li>
              <li><a href="#" className="opacity-60">Privacidad</a></li>
              <li><a href="#" className="opacity-60">Términos</a></li>
            </ul>
          </div>

          {/* 🔹 Redes sociales */}
          <div className="flex flex-col gap-3 items-center sm:items-start mt-6">
            <p className="font-semibold text-lg">Síguenos en</p>
            <div className="flex gap-4 text-xl">
              <a href="https://www.facebook.com/share/17QLNhZePP/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors"><IconBrandFacebook /></a>
              <a href="https://www.instagram.com/tukishop_cr" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors"><IconBrandInstagram /></a>
              <a href="https://www.tiktok.com/@tukishopcr" target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 transition-colors"><IconBrandTiktok /></a>
              <a href="https://x.com/TukiShopCR" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors"><IconBrandX /></a>
            </div>
          </div>
        </div>

        {/* 🔸 Logo central */}
        <div className="flex flex-col items-center justify-center sm:w-1/3 space-y-3">
          <img src={logo} alt="TukiShop" className="h-14 w-auto" />
          <a href="/" className="text-3xl font-fugaz font-bold tracking-wide">TukiShop</a>
        </div>

        {/* 🔸 Formulario de contacto */}
        <div className="flex flex-col items-center sm:items-center gap-3 sm:w-1/3 text-xs">
          <p className="font-semibold text-xl">Contáctanos</p>
          <form className="flex flex-col gap-4 w-full sm:w-[80%]" onSubmit={handleSubmit}>
            <label className="flex flex-col gap-1">
              <p className="pl-3 font-semibold">Nombre</p>
              <input
                type="text"
                name="name"
                value={fields.name}
                onChange={handleChange}
                placeholder="Ingresa tu nombre"
                className="rounded-full p-2 bg-transparent text-white border border-white w-full placeholder-white/70"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <p className="pl-3 font-semibold">Asunto</p>
              <input
                type="text"
                name="subject"
                onChange={handleChange}
                placeholder="Escribe el asunto"
                className="rounded-full p-2 bg-transparent text-white border border-white w-full placeholder-white/70"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <p className="pl-3 font-semibold">Email</p>
              <input
                type="email"
                name="email"
                value={fields.email}
                onChange={handleChange}
                placeholder="Ingresa tu email"
                className="rounded-full p-2 bg-transparent text-white border border-white w-full placeholder-white/70"
                required
              />
            </label>
            <label className="flex flex-col gap-1">
              <p className="pl-3 font-semibold">Mensaje</p>
              <textarea
                name="message"
                value={fields.message}
                onChange={handleChange}
                placeholder="Tu mensaje..."
                className="rounded-2xl p-2 bg-transparent text-white border border-white w-full h-20 placeholder-white/70"
                required
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className={`bg-contrast-secondary p-2 rounded-full hover:bg-contrast-main transition-all duration-300 font-semibold ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Enviando..." : "Enviar"}
            </button>
            {sent && <p className="text-green-400 text-center text-sm">¡Mensaje enviado correctamente!</p>}
            {error && <p className="text-red-400 text-center text-sm">{error}</p>}
          </form>
        </div>
      </div>

      {/* 🔹 Línea inferior */}
      <p className="text-xs text-center opacity-80 max-w-[80%]">
        © 2025 Ecom. Todos los derechos reservados. Todas las marcas son propiedad de sus respectivos dueños.
      </p>
    </footer>
  );
}
