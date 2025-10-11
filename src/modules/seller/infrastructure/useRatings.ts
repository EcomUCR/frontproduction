import { useCallback, useEffect, useState } from "react";
import axios from "axios";

export interface SummaryData {
  average: number;
  total: number;
  distribution: Record<number, number>;
}

export interface CreateReviewPayload {
  store_id: number;
  user_id: number;
  rating: number;
  comment: string;
  like?: boolean;
  dislike?: boolean;
}

const BASE_URL = "https://ecomapi-kruj.onrender.com/api";

// Axios instance con header Authorization automático
const api = axios.create({ baseURL: BASE_URL });
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export function useRatings(storeId?: number) {
  const [summary, setSummary] = useState<SummaryData>({
    average: 0,
    total: 0,
    distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSummary = useCallback(async () => {
    if (!storeId) return;
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(`/stores/${storeId}/reviews/summary`);
      setSummary({
        average: res.data?.average ?? 0,
        total: res.data?.total ?? 0,
        distribution: res.data?.distribution ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      });
    } catch (e: any) {
      setError(e?.response?.data?.message || "Error al cargar el resumen de reseñas");
      // Mantener el estado previo del summary si falla
    } finally {
      setLoading(false);
    }
  }, [storeId]);

  const createReview = useCallback(async (payload: CreateReviewPayload) => {
    await api.post(`/store-reviews`, payload);
  }, []);

  useEffect(() => {
    if (storeId) refreshSummary();
  }, [storeId, refreshSummary]);

  return { summary, loading, error, refreshSummary, createReview };
}
