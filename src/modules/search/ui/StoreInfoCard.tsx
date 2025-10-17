// 📄 src/modules/stores/components/StoreBannerDynamic.tsx
import { Link } from "react-router-dom";
import ButtonComponent from "../../../components/ui/ButtonComponent";

interface StoreProps {
  store: {
    id: number;
    name: string;
    image?: string;
    banner?: string;
  };
}

export default function StoreInfoCard({ store }: StoreProps) {
  return (
    <section
      className="relative w-full h-56 rounded-2xl overflow-hidden flex items-center justify-center transition-all duration-500"
      style={{
        backgroundImage: `url(${store.banner || "https://via.placeholder.com/800x300"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      <div className="relative z-10 flex flex-col items-center justify-center group/store transition-all duration-500">
        <div className="flex items-center justify-center bg-gradient-to-br from-contrast-main/50 via-contrast-secondary/50 to-main/50 backdrop-blur-lg w-72 h-50 rounded-2xl shadow-lg border border-white/30 transition-all duration-500 group-hover/store:w-120">
          <div className="flex flex-col justify-center items-center">
            <img
              src={store.image || "https://electrogenpro.com/wp-content/themes/estore/images/placeholder-shop.jpg"}
              alt={store.name}
              className="h-20 w-20 object-contain rounded-full border-2 border-white/80 shadow-lg transition-transform duration-500 group-hover/store:translate-x-[-7rem]"
            />
            <h2 className="font-poiret text-2xl font-semibold tracking-wide drop-shadow-md text-white mt-3 group-hover/store:translate-x-[-7rem] transition-all duration-500">
              {store.name}
            </h2>
          </div>

          <div className="opacity-0 absolute translate-x-[7rem] translate-y-3 group-hover/store:opacity-100 group-hover/store:translate-y-0 transition-all duration-500 mt-4">
            <Link to={`/store/${store.id}`}>
              <ButtonComponent
                text="Visitar Tienda"
                style="font-quicksand cursor-pointer bg-gradient-to-br from-contrast-main to-contrast-secondary text-white font-medium px-6 py-2.5 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
