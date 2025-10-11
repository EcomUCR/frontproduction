import { Link } from "react-router-dom";
import ButtonComponent from "../../../components/ui/ButtonComponent";

export default function StoreBannerStatic() {
  const store = {
    name: "Ustable Games",
    image:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760051585/marketplace/products/dstpqhl1jtuyjpqqxerl.png",
    banner:
      "https://res.cloudinary.com/dpbghs8ep/image/upload/v1760040322/marketplace/products/zmqb0vdwyzzdf5n95ujd.png",
    id: 2,
  };

  return (
    <>
      <section
        className="relative w-full h-56 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500"
        style={{
          backgroundImage: `url(${store.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

        <div className="relative z-10 flex flex-col items-center justify-center group/store transition-all duration-500">
          <div className="flex items-center justify-center bg-white/20 backdrop-blur-lg w-72 h-50 rounded-2xl shadow-lg border border-white/30 transition-all duration-500 group-hover/store:w-120">
            <div className="flex flex-col justify-center items-center">

              <img
                src={store.image}
                alt={store.name}
                className="h-20 w-20 object-contain rounded-full border-2 border-white/80 shadow-lg transition-transform duration-500  group-hover/store:translate-x-[-7rem]"
              />
              <h2 className="font-poiret text-2xl font-semibold tracking-wide drop-shadow-md text-white mt-3  group-hover/store:translate-x-[-7rem] transition-all duration-500">
                {store.name}
              </h2>
            </div>

            <div className="opacity-0 absolute translate-x-[7rem] translate-y-3 group-hover/store:opacity-100 group-hover/store:translate-y-0 transition-all duration-500 mt-4">
              <Link to={`/store/${store.id}`}>
                <ButtonComponent
                  text="Visitar Tienda"
                  style="font-quicksand bg-gradient-to-br from-contrast-main to-contrast-secondary text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
