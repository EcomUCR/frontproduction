// src/pages/profile/ui/UserProfile.tsx
import { useEffect, useState } from "react";
import type { User, Store } from "../infrastructure/useUser";
import { getStoreByUser } from "../infrastructure/storeService";

interface Props {
  type: "SELLER" | "CUSTOMER";
  user: User;
}

export default function UserProfile({ type, user }: Props) {
  const [store, setStore] = useState<Store | null>(null);
  const [loading, setLoading] = useState(type === "SELLER");

  useEffect(() => {
    if (type === "SELLER") {
      (async () => {
        const storeData = await getStoreByUser(user.id);
        setStore(storeData);
        setLoading(false);
      })();
    }
  }, [type, user.id]);

  if (loading) return <p>Cargando tienda...</p>;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Perfil de usuario</h2>
      <p><strong>Nombre:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.role}</p>

      {type === "SELLER" && store && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Información de la tienda</h3>
          <p><strong>Nombre tienda:</strong> {store.name}</p>
          <p><strong>Slug:</strong> {store.slug}</p>
          <p><strong>Descripción:</strong> {store.description || "Sin descripción"}</p>
          <p><strong>Correo soporte:</strong> {store.support_email || "No definido"}</p>
          <p><strong>Teléfono soporte:</strong> {store.support_phone || "No definido"}</p>
          <p><strong>Estado:</strong> {store.status}</p>
        </div>
      )}
    </div>
  );
}
