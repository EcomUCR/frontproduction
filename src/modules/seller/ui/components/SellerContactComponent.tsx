import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandX,
} from "@tabler/icons-react";
import { getStore } from "../../infrastructure/storeService";
import type { Store } from "../../../users/infrastructure/useUser";
import logoFallback from "../../../../img/resources/Group 50.png";
import { SkeletonSellerContact } from "../../../../components/ui/AllSkeletons";

export default function SellerContactComponent() {
  const { id } = useParams();
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchStore = async () => {
      const data = await getStore(Number(id));
      setStore(data);
      setLoading(false);
    };
    fetchStore();
  }, [id]);

  if (loading) return <SkeletonSellerContact show />;

  if (!store)
    return (
      <div className="flex justify-center items-center py-20 text-gray-400 font-quicksand">
        No se encontró la tienda.
      </div>
    );

  return (
    <div className="flex flex-col mx-4 sm:mx-10 my-5 font-quicksand">
      {/* 🔹 Logo + Descripción */}
      <div className="flex flex-col sm:flex-row items-center justify-center text-center sm:text-left gap-6 sm:gap-10">
        {/* Logo */}
        <div className="flex justify-center sm:justify-end w-full sm:w-[40%]">
          <img
            src={store.image || logoFallback}
            alt={store.name}
            className="max-h-[160px] sm:max-h-[180px] object-contain rounded-xl"
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-col w-full sm:w-[60%] gap-4 sm:gap-5">
          <h2 className="text-2xl sm:text-3xl font-bold">{store.name}</h2>
          <p className="text-main-dark leading-relaxed whitespace-pre-line">
            {store.description ||
              "Esta tienda aún no ha agregado una descripción."}
          </p>
        </div>
      </div>

      {/* 🔹 Contacto / Dirección / Redes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 justify-items-center mt-10 sm:mt-20 gap-8 sm:gap-0 text-center sm:text-left">
        {/* Contacto */}
        <div className="flex flex-col gap-2 w-[80%] sm:w-2/3">
          <h3 className="text-xl sm:text-2xl font-bold">Contacto:</h3>
          <p>{store.support_phone || "Teléfono no disponible"}</p>
          <p>{store.support_email || "Email no disponible"}</p>
        </div>

        {/* Dirección */}
        <div className="flex flex-col gap-2 w-[80%] sm:w-2/3">
          <h3 className="text-xl sm:text-2xl font-bold">Dirección:</h3>
          <p>
            {store.address ||
              store.registered_address ||
              "Calle Principal, Ciudad, País"}
          </p>
        </div>

        {/* Páginas y redes */}
        <div className="flex flex-col gap-3 pb-5 w-[80%] sm:w-2/3">
          <h3 className="text-xl sm:text-2xl font-bold">Páginas y Redes:</h3>
          <p className="truncate">{store.business_name || "unstable.com"}</p>

          <ul className="flex justify-center sm:justify-start gap-6 text-2xl sm:text-xl">
            {/* Instagram */}
            {store.store_socials?.some(
              (s: { platform: string }) => s.platform === "instagram"
            ) ? (
              <li>
                <a
                  href={
                    store.store_socials.find(
                      (s: { platform: string }) => s.platform === "instagram"
                    )?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-500 transition-colors"
                >
                  <IconBrandInstagram />
                </a>
              </li>
            ) : (
              <li className="opacity-50">
                <IconBrandInstagram />
              </li>
            )}

            {/* Facebook */}
            {store.store_socials?.some(
              (s: { platform: string }) => s.platform === "facebook"
            ) ? (
              <li>
                <a
                  href={
                    store.store_socials.find(
                      (s: { platform: string }) => s.platform === "facebook"
                    )?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-600 transition-colors"
                >
                  <IconBrandFacebook />
                </a>
              </li>
            ) : (
              <li className="opacity-50">
                <IconBrandFacebook />
              </li>
            )}

            {/* X / Twitter */}
            {store.store_socials?.some(
              (s: { platform: string }) => s.platform === "x"
            ) ? (
              <li>
                <a
                  href={
                    store.store_socials.find(
                      (s: { platform: string }) => s.platform === "x"
                    )?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gray-700 transition-colors"
                >
                  <IconBrandX />
                </a>
              </li>
            ) : (
              <li className="opacity-50">
                <IconBrandX />
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
