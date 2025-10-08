
import type { Store } from "./useUser";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export async function getStoreByUser(userId: number): Promise<Store | null> {
  try {
    const token = localStorage.getItem("access_token");
    const { data } = await axios.get(`/users/${userId}/store`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data || null;
  } catch (error) {
    console.error("Error al obtener tienda:", error);
    return null;
  }
}