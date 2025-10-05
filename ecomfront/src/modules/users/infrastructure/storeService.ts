// src/services/storeService.ts
import api from "../../../lib/axios";
import type { Store } from "./useUser";

export async function getStoreByUser(userId: number): Promise<Store | null> {
  try {
    const token = localStorage.getItem("token");
    const { data } = await api.get(`/stores?user_id=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.length > 0 ? data[0] : null;
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    return null;
  }
}
