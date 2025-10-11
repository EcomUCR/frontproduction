import ButtonComponent from "../../../components/ui/ButtonComponent";

export default function StoreBannerStatic() {
  const store = {
    name: "Ustable Games",
    image:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760051585/marketplace/products/dstpqhl1jtuyjpqqxerl.png",
    banner:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760040322/marketplace/products/zmqb0vdwyzzdf5n95ujd.png",
  };

  return (
    <section
      className="group relative w-full h-56 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: `url(${store.banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 Capa dinámica de blur y oscurecimiento al hover */}
      <div className="absolute inset-0 transition-all duration-500 group-hover:backdrop-blur-sm group-hover:bg-black/40" />

      {/* Contenido principal */}
      <div className="relative z-10 flex w-full max-w-5xl items-center justify-between px-10 text-white transition-all duration-500">
        {/* 🧊 Bloque glass (logo + nombre) */}
        <div className="flex items-center gap-4 bg-white/20 backdrop-blur-lg group-hover:bg-white/25 px-6 py-3 rounded-2xl shadow-lg border border-white/30 transition-all duration-500">
          <img
            src={store.image}
            alt={store.name}
            className="h-16 w-16 object-cover rounded-full border-2 border-white/80 shadow-lg transition-transform duration-500 group-hover:scale-105"
          />
          <h2 className="text-2xl font-semibold tracking-wide drop-shadow-md transition-all duration-500">
            {store.name}
          </h2>
        </div>

        {/* 🔘 Botón con animación hacia el centro */}
        <div className="transition-all duration-500 transform group-hover:translate-x-[-2rem] group-hover:scale-110">
          <ButtonComponent
            text="Visitar Tienda"
            style="bg-gradient-to-br from-contrast-main to-contrast-secondary text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
            onClick={() => alert(`Visitando ${store.name}`)}
          />
        </div>
      </div>
    </section>
  );
}
