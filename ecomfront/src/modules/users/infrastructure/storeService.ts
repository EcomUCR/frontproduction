import api from "../../../lib/axios";
import type { Store } from "./useUser";

export async function getStoreByUser(userId: number): Promise<Store | null> {
  try {
    const token = localStorage.getItem("access_token");
    const { data } = await api.get(`/users/${userId}/store`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data || null;
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    return null;
  }
}