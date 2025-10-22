import { useEffect, useState } from "react";
import axios from "axios";

export type Notification = {
    id: number;
    title: string;
    message: string;
    is_read: boolean;
    created_at: string;
    priority?: "LOW" | "NORMAL" | "HIGH";
};

export function useNotifications() {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const BASE_URL = import.meta.env.VITE_API_URL || "/api";

    // 📦 Cargar notificaciones del usuario autenticado
    const fetchNotifications = async () => {
        setLoading(true);
        setError(null);
        try {
            const token = localStorage.getItem("access_token"); // o sessionStorage según tu flujo
            const { data } = await axios.get(`${BASE_URL}/notifications`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setNotifications(data);
        } catch (err: any) {
            console.error("Error cargando notificaciones:", err);
            setError("No se pudieron cargar las notificaciones");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNotifications();

        const interval = setInterval(() => {
            fetchNotifications();
        }, 30000);

        return () => clearInterval(interval);
    }, []);


    return { notifications, loading, error, fetchNotifications };
}
