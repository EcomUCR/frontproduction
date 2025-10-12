import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from "@tabler/icons-react";
import { getStore } from "../../infrastructure/storeService";
import type { Store } from "../../../users/infrastructure/useUser";
import logoFallback from "../../../../img/resources/Group 50.png";

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

  if (loading || !store) {
    return (
      <div className="flex justify-center items-center py-20 text-gray-400 font-quicksand">
        Cargando información de la tienda...
      </div>
    );
  }

  return (
    <div className="flex flex-col mx-10 my-5 font-quicksand">
      {/* 🔹 Logo + Descripción */}
      <div className="flex items-center justify-center">
        {/* Logo */}
        <div className="flex items-center w-[40%] justify-center">
          <img
            src={store.image || logoFallback}
            alt={store.name}
            className="max-h-[180px] object-contain rounded-xl"
          />
        </div>

        {/* Descripción */}
        <div className="flex flex-col text-center w-[60%] gap-5">
          <h2 className="text-3xl font-bold">{store.name}</h2>
          <p className="text-main-dark leading-relaxed whitespace-pre-line pt-2">
            {store.description ||
              "Esta tienda aún no ha agregado una descripción."}
          </p>
        </div>
      </div>

      {/* 🔹 Contacto / Dirección / Redes */}
      <div className="grid grid-cols-3 justify-items-center mt-20">
        {/* Contacto */}
        <div className="flex flex-col gap-2 w-2/3">
          <h3 className="text-2xl font-bold">Contacto:</h3>
          <p>{store.support_phone || "+506 0000-0000"}</p>
          <p>{store.support_email || "unstablegames@gmail.com"}</p>
        </div>

        {/* Dirección */}
        <div className="flex flex-col gap-2 w-2/3">
          <h3 className="text-2xl font-bold">Dirección:</h3>
          <p>
            {store.address ||
              store.registered_address ||
              "Calle Principal, Ciudad, País"}
          </p>
        </div>

        {/* Páginas y redes */}
        <div className="flex flex-col gap-2 pb-10 w-2/3">
          <h3 className="text-2xl font-bold">Páginas y Redes:</h3>
          <p>{store.business_name || "unstable.com"}</p>

          <ul className="flex gap-5">
            {/* Instagram */}
            {store.store_socials?.some((s: { platform: string; }) => s.platform === "instagram") ? (
              <li>
                <a
                  href={
                    store.store_socials.find((s: { platform: string; }) => s.platform === "instagram")
                      ?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
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
            {store.store_socials?.some((s: { platform: string; }) => s.platform === "facebook") ? (
              <li>
                <a
                  href={
                    store.store_socials.find((s: { platform: string; }) => s.platform === "facebook")
                      ?.url
                  }
                  target="_blank"
                  rel="noopener noreferrer"
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
            {store.store_socials?.some((s: { platform: string; }) => s.platform === "x") ? (
              <li>
                <a
                  href={store.store_socials.find((s: { platform: string; }) => s.platform === "x")?.url}
                  target="_blank"
                  rel="noopener noreferrer"
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
