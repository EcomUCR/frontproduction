import { useState, useEffect } from "react";
import axios from "axios";

export type UserRole = "seller" | "client" | "admin";

export interface BackendMeResponse {
  user: any;
  client: any;
  vendor: any;
  staff: any;
}

export function getUserRole(data: BackendMeResponse): UserRole {
  if (data.vendor) return "seller";
  if (data.client) return "client";
  if (data.staff) return "admin";
  return "client"; // DEFAULT fallback, ajústalo si tienes otra lógica
}

export default function useUser() {
  const [me, setMe] = useState<BackendMeResponse | null>(null);
  const [role, setRole] = useState<UserRole>("client");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/me")
      .then(res => {
        setMe(res.data);
        setRole(getUserRole(res.data));
      })
      .catch(() => {
        setMe(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { me, role, loading };
}